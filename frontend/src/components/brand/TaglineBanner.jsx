import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BRAND_LINE } from '@/content/home';

const FINAL_TEXT = `"Records, Records... VeriCase" - ${BRAND_LINE}`;

const SEQUENCE = [
  { text: '"Records"', duration: 1800 },
  { text: '"Records, Records"', duration: 3200 },
  { text: '"Records, Records... VeriCase"', duration: 2400 },
  { text: FINAL_TEXT, duration: null },
];

export const TaglineBanner = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [currentText, setCurrentText] = useState(reducedMotion ? FINAL_TEXT : SEQUENCE[0].text);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (reducedMotion) {
      setCurrentText(FINAL_TEXT);
      return undefined;
    }

    let currentIndex = 0;
    let timer;

    const advance = () => {
      if (currentIndex < SEQUENCE.length - 1) {
        timer = setTimeout(() => {
          setFade(false);
          setTimeout(() => {
            currentIndex += 1;
            setCurrentText(SEQUENCE[currentIndex].text);
            setFade(true);
            advance();
          }, 180);
        }, SEQUENCE[currentIndex].duration);
      }
    };

    advance();
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <div
      className="relative w-full border-b border-[#143020] bg-[#041A0F] py-2 text-center sm:py-2.5 md:py-3"
      data-testid="tagline-banner"
    >
      <div className="container flex items-center justify-center px-4">
        <span
          role="status"
          aria-live="polite"
          className={`font-display italic text-[#E8DCC8] transition-opacity duration-300 ease-out text-sm sm:text-base md:text-lg lg:text-xl ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ letterSpacing: '0.04em' }}
        >
          {currentText}
        </span>
      </div>
    </div>
  );
};
