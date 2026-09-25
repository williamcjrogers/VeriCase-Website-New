import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The design system's named font sizes must not be mistaken for text colours when classes merge.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["masthead", "numeral", "display", "h2", "h3", "stat", "lead", "body", "small", "caption", "meta", "label"] },
      ],
    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
