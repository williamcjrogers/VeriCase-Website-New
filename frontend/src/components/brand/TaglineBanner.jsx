import { BRAND_LINE } from '@/content/home';

export const TaglineBanner = () => (
  <div className="relative w-full border-b border-[#323A4A] bg-[#151A24] py-2 text-center sm:py-2.5 md:py-3" data-testid="tagline-banner">
    <div className="container flex items-center justify-center px-4">
      <span className="font-display italic text-[#E6E8EC] text-sm sm:text-base md:text-lg lg:text-xl">
        “Records, Records... VeriCase”. {BRAND_LINE}
      </span>
    </div>
  </div>
);
