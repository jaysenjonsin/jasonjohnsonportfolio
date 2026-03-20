'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export const WaveForm = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isHovered, setIsHovered] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  // Store theme values in refs so the animation loop always reads the latest
  // value without needing to be restarted on every theme change
  const themeRef = useRef(theme);
  const resolvedThemeRef = useRef(resolvedTheme);

  useEffect(() => {
    themeRef.current = theme;
    resolvedThemeRef.current = resolvedTheme;
  }, [theme, resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 60;
    const height = 30;
    canvas.width = width;
    canvas.height = height;

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Read theme from ref — always current without re-running the effect
      const currentTheme = resolvedThemeRef.current || themeRef.current;
      ctx.strokeStyle = currentTheme === 'dark' ? 'hsl(0 0% 98%)' : 'hsl(0 0% 10%)';
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      const bars = 8;
      const barWidth = 2;
      const spacing = (width - bars * barWidth) / (bars - 1);

      for (let i = 0; i < bars; i++) {
        const x = i * (barWidth + spacing);
        const amplitude = isHovered ? 0.8 : 0.4;
        const frequency = 0.02 + i * 0.005;
        const barHeight =
          Math.abs(Math.sin(time * frequency + i * 0.5)) * height * amplitude +
          2;

        ctx.beginPath();
        ctx.moveTo(x + barWidth / 2, height / 2 - barHeight / 2);
        ctx.lineTo(x + barWidth / 2, height / 2 + barHeight / 2);
        ctx.stroke();
      }

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]); // theme/resolvedTheme removed — read per-frame via refs instead

  return (
    <Link
      href='/'
      className='cursor-pointer'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className='block'
        style={{ width: '60px', height: '30px' }}
      />
    </Link>
  );
};
