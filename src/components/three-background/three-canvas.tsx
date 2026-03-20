'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import FrostedGlass from './frosted-glass';
import Sphere from './sphere';
import Ambience from './ambience';

interface ThreeCanvasProps {
  onReady?: () => void;
  isDark?: boolean;
}

export default function ThreeCanvas({ onReady, isDark = true }: ThreeCanvasProps) {
  return (
    <div className='fixed inset-0 -z-10'>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 100], zoom: 100 }}
        gl={{
          alpha: true, //make bg transparent
          antialias: true, //smooth edges
          powerPreference: 'default',
        }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          console.log('Three.js Canvas created successfully');
          gl.setClearColor(0x000000, 0); // Transparent background
          // Call onReady after the canvas is created and first frame is ready
          if (onReady) {
            requestAnimationFrame(() => {
              requestAnimationFrame(onReady); // Wait for two frames to ensure rendering is stable
            });
          }
        }}
        onError={(error) => {
          console.error('Three.js Canvas error:', error);
        }}
      >
        <Suspense fallback={null}>
          <FrostedGlass isDark={isDark}>
            <Sphere isDark={isDark} />
            <Ambience />
          </FrostedGlass>
        </Suspense>
      </Canvas>
    </div>
  );
}
