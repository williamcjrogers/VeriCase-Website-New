import { useInViewOnce } from '@/hooks/useInViewOnce';
import { useCountUp } from '@/hooks/useCountUp';

/**
 * Editorial CountUp component.
 * Displays a number or statistic that counts up smoothly into place
 * when scrolled into the viewport.
 * Uses font tabular-nums to prevent layout jitter during animation.
 */
export const CountUp = ({
  value,
  duration = 1600,
  className = '',
  threshold = 0.2,
}) => {
  const [ref, inView] = useInViewOnce({ threshold });
  const display = useCountUp(value, { duration, inView });

  return (
    <span ref={ref} className={`inline-block tabular-nums ${className}`}>
      {display}
    </span>
  );
};
