import { useEffect, useState } from 'react';

const storageKey = 'expense-tracker-theme';

const getInitialTheme = () => {
  const storedTheme = window.localStorage.getItem(storageKey);

  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useThemeMode = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(storageKey, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return {
    isDarkMode: theme === 'dark',
    theme,
    toggleTheme,
  };
};
