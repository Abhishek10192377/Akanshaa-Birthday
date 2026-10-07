import { useEffect, useState } from 'react';

// Replacement for jQuery's fadeIn / fadeOut: fades its element with `show`
// and takes it out of the page once it is fully faded out.
export default function Fade({ show, ms = 600, as: Tag = 'div', keepTransition = '', style, children, ...rest }) {
  const [mounted, setMounted] = useState(show);
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setMounted(true);
      // Wait for the element to be painted at opacity 0 before fading in
      let inner;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    setVisible(false);
    const t = setTimeout(() => setMounted(false), ms);
    return () => clearTimeout(t);
  }, [show, ms]);

  if (!mounted) return null;

  const fadeStyle = {
    ...style,
    opacity: visible ? (style && style.opacity != null ? style.opacity : 1) : 0,
    transition: `opacity ${ms}ms ease${keepTransition ? ', ' + keepTransition : ''}`,
    pointerEvents: show ? undefined : 'none',
  };

  return (
    <Tag style={fadeStyle} {...rest}>
      {children}
    </Tag>
  );
}
