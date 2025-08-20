'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export const WaveForm = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

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

      // Set line style based on theme - using same colors as text
      ctx.strokeStyle = theme === 'dark' ? 'hsl(0 0% 98%)' : 'hsl(0 0% 10%)';
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      // Draw waveform bars
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
  }, [isHovered, theme]);

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
