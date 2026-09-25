// framer-motion features load on demand inside demonstration chunks, never in the first paint.
export const loadDomMax = () => import('framer-motion').then((m) => m.domMax);
export const loadDomAnimation = () => import('framer-motion').then((m) => m.domAnimation);

export const EASE_SETTLE = [0.2, 0, 0, 1];
export const EASE_GLIDE = [0.45, 0, 0.2, 1];
