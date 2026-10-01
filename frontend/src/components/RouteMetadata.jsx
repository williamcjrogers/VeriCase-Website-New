import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { metadataForPath } from '@/lib/pageMetadata';

export const RouteMetadata = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = metadataForPath(pathname);
    document.title = meta.title;
    const set = (selector, attributes) => {
      let el = document.head.querySelector(selector);
      if (!el) { el = document.createElement(selector.startsWith('link') ? 'link' : 'meta'); document.head.append(el); }
      for (const [key, value] of Object.entries(attributes)) el.setAttribute(key, value);
    };
    set('meta[name="description"]', { name: 'description', content: meta.description });
    for (const [key, value] of [['title', meta.title], ['description', meta.description]]) {
      set(`meta[property="og:${key}"]`, { property: `og:${key}`, content: value });
      set(`meta[name="twitter:${key}"]`, { name: `twitter:${key}`, content: value });
    }
    if (meta.url) {
      set('link[rel="canonical"]', { rel: 'canonical', href: meta.url });
      set('meta[property="og:url"]', { property: 'og:url', content: meta.url });
      document.head.querySelector('meta[name="robots"]')?.remove();
    } else {
      document.head.querySelector('link[rel="canonical"]')?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
      set('meta[name="robots"]', { name: 'robots', content: 'noindex' });
    }
  }, [pathname]);
  return null;
};
