'use client';

import { useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, RenderTexture } from '@react-three/drei';
import { useEffect, useState } from 'react';

interface FrostedGlassProps {
  children: React.ReactNode;
}

export default function FrostedGlass({ children }: FrostedGlassProps) {
  const { viewport } = useThree();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Enhanced grain and contrast for both modes
  const glassProps = {
    samples: isDark ? 1 : 2,
    thickness: 0.15,
    chromaticAberration: 0.02,
    anisotropy: isDark ? 2 : 2,
    roughness: isDark ? 0.9 : 0.8, // Higher roughness in dark mode for more grain texture
    transparent: true,
    opacity: isDark ? 0.55 : 0.55, // Less transparent in dark mode for stronger contrast
    distortion: 0.9,
    distortionScale: 0.5, // Stronger scaling in dark mode for pronounced grain
    temporalDistortion: 0.08,
  };

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <MeshTransmissionMaterial {...glassProps}>
        <RenderTexture width={256} height={256} attach='buffer'>
          {children}
        </RenderTexture>
      </MeshTransmissionMaterial>
    </mesh>
  );
}
