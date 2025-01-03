'use client';

import { Switch } from '@nextui-org/react';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import ThemeContext from '@/context/theme-context';
import { useContext } from 'react';

export default function ToggleTheme({ className }: { className?: string }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Switch
      className={className}
      isSelected={theme === 'light'}
      size="lg"
      color="primary"
      onClick={toggleTheme}
      thumbIcon={theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    ></Switch>
  );
}
