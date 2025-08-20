'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  //prevent hydration mismatch - server and client may have diff themes before initial render, so we wait until mounted to show the toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className='w-4 h-4' />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='font-mono text-sm hover:underline'
      aria-label='Toggle theme'
    >
      {theme === 'dark' ? (
        <Sun className='w-4 h-4' />
      ) : (
        <Moon className='w-4 h-4' />
      )}
    </button>
  );
}
