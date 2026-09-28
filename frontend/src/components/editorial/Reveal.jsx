import { useInViewOnce } from '@/hooks/useInViewOnce';
import { cn } from '@/lib/utils';

// Fades and lifts its content by 12 px once, when 20% of it is in view. Content stays visible
// without JavaScript and under reduced motion (see .reveal in index.css).
export const Reveal = ({ as: Tag = 'div', className, children, delay = 0, ...rest }) => {
  const [ref, inView] = useInViewOnce({ threshold: 0.2 });
  return (
    <Tag ref={ref} className={cn('reveal', inView && 'is-in', className)} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  );
};
