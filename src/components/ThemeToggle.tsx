import { useEffect, useState } from 'react';

const THEME_EVENT = 'portfolio-theme-change';

function applyTheme(isDark: boolean) {
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  window.localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: { isDark } }));
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('portfolio-theme');
    const initialIsDark = storedTheme === 'dark';
    setIsDark(initialIsDark);
    document.documentElement.dataset.theme = initialIsDark ? 'dark' : 'light';

    const syncTheme = (event: Event) => {
      const nextIsDark = (event as CustomEvent<{ isDark: boolean }>).detail?.isDark ?? false;
      setIsDark(nextIsDark);
    };

    window.addEventListener(THEME_EVENT, syncTheme);
    return () => window.removeEventListener(THEME_EVENT, syncTheme);
  }, []);

  return (
    <label className="nuda-tswitch" aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <input
        type="checkbox"
        checked={isDark}
        onChange={(event) => {
          const nextIsDark = event.currentTarget.checked;
          setIsDark(nextIsDark);
          applyTheme(nextIsDark);
        }}
      />
      <span className="nuda-tswitch__track">
        <span className="nuda-tswitch__thumb">
          <svg className="nuda-tswitch__sun" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="12" cy="12" r="5" />
          </svg>
          <svg className="nuda-tswitch__moon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M21 13 A 9 9 0 1 1 11 3 A 7 7 0 0 0 21 13 Z" />
          </svg>
        </span>
        <span className="nuda-tswitch__star nuda-tswitch__star--a" />
        <span className="nuda-tswitch__star nuda-tswitch__star--b" />
      </span>
    </label>
  );
}
