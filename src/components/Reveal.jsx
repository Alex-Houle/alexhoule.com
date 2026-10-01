import { useEffect, useRef, useState } from 'react';

// Fades its children in the first time they scroll into view
export default function Reveal({ className = '', children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.08 });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} reveal${visible ? ' visible' : ''}`}>
      {children}
    </div>
  );
}
