import { useState } from 'react';

export default function ThemeToggle() {
  // Look at what the inline HTML script decided the theme is
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  );

  function toggle() {
    const next = !isDark;
    if (next) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
  }

  return (
    <button
      className="theme-toggle"
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      onClick={toggle}
    >
      {isDark ? '☀' : '☾'}
    </button>
  );
}
