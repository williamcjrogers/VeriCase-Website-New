import { useEffect, useState, useRef, useMemo } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Parses a display stat string into its constituent parts for animating.
 * Supports:
 *   - '2,264'       -> { prefix: '', target: 2264, decimals: 0, suffix: '', useGrouping: true }
 *   - '33.4%'       -> { prefix: '', target: 33.4, decimals: 1, suffix: '%', useGrouping: false }
 *   - '72%'         -> { prefix: '', target: 72, decimals: 0, suffix: '%', useGrouping: false }
 *   - '-42.8%'      -> { prefix: '-', target: 42.8, decimals: 1, suffix: '%', useGrouping: false }
 *   - '8 EXHIBITS'  -> { prefix: '', target: 8, decimals: 0, suffix: ' EXHIBITS', useGrouping: false }
 */
export function parseStat(raw) {
  if (typeof raw === 'number') {
    return {
      prefix: '',
      target: raw,
      decimals: 0,
      suffix: '',
      useGrouping: false,
      isValid: true,
    };
  }

  const str = String(raw).trim();
  const match = str.match(/^([^0-9]*?)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return {
      prefix: '',
      target: 0,
      decimals: 0,
      suffix: str,
      useGrouping: false,
      isValid: false,
    };
  }

  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];
  const hasComma = numStr.includes(',');
  const cleanNum = numStr.replace(/,/g, '');
  const decimalParts = cleanNum.split('.');
  const decimals = decimalParts.length > 1 ? decimalParts[1].length : 0;
  const target = parseFloat(cleanNum);

  return {
    prefix,
    target: Number.isFinite(target) ? target : 0,
    decimals,
    suffix,
    useGrouping: hasComma,
    isValid: true,
  };
}

/**
 * Formats a numeric value according to parsed stat rules.
 */
export function formatStat(current, { prefix = '', decimals = 0, suffix = '', useGrouping = false }) {
  let formattedNumber;
  if (decimals > 0) {
    const factor = Math.pow(10, decimals);
    const rounded = Math.round((current + Number.EPSILON) * factor) / factor;
    formattedNumber = rounded.toFixed(decimals);
  } else {
    formattedNumber = Math.round(current).toString();
  }

  if (useGrouping) {
    const [intPart, decPart] = formattedNumber.split('.');
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    formattedNumber = decPart ? `${withCommas}.${decPart}` : withCommas;
  }

  return `${prefix}${formattedNumber}${suffix}`;
}

// Ease-out cubic: rapid initial velocity, gentle, natural deceleration
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Hook to count a number/stat up smoothly from 0 to its target value.
 * Respects prefers-reduced-motion and waits for inView signal.
 */
export function useCountUp(targetRaw, { duration = 1600, inView = true, startValue = 0 } = {}) {
  const prefersReduced = usePrefersReducedMotion();
  const parsed = useMemo(() => parseStat(targetRaw), [targetRaw]);

  // Initial state is the raw string for SSR / prerender stability and fallback
  const [displayValue, setDisplayValue] = useState(() => String(targetRaw));
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // If invalid format or reduced motion, render target value immediately
    if (!parsed.isValid || prefersReduced) {
      setDisplayValue(String(targetRaw));
      return undefined;
    }

    // Wait until element is in view
    if (!inView) {
      return undefined;
    }

    // Only animate once
    if (hasAnimatedRef.current) {
      setDisplayValue(formatStat(parsed.target, parsed));
      return undefined;
    }

    hasAnimatedRef.current = true;
    let rafId;
    let startTime = null;
    const target = parsed.target;
    const start = startValue;

    const tick = (now) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = start + (target - start) * easedProgress;

      setDisplayValue(formatStat(current, parsed));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplayValue(formatStat(target, parsed));
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [targetRaw, parsed, inView, duration, prefersReduced, startValue]);

  return displayValue;
}
