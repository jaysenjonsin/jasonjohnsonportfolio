'use client';

import { OrthographicCamera } from '@react-three/drei';
import { useEffect, useState } from 'react';

export default function Sphere() {
  const [isDark, setIsDark] = useState(true); // Default to dark

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Use dark color in dark mode, light color in light mode
  const sphereColor = isDark ? '#111' : '#f0f0f0';

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={95} />
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial
          color={sphereColor}
          metalness={isDark ? 2 : 0.8} // Full metallic in dark mode for bright reflections
          roughness={0.2}
        />
      </mesh>
    </>
  );
}
