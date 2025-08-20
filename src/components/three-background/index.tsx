'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Canvas component to avoid SSR issues
const ThreeCanvas = dynamic(() => import('./three-canvas'), {
  ssr: false,
  loading: () => null,
});

function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!context) return false;

    // Additional check to ensure WebGL is actually working
    const renderer = context.getParameter(context.RENDERER);
    return renderer !== null;
  } catch (e) {
    return false;
  }
}

export default function ThreeBackground() {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    setIsClient(true);

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const webglSupport = hasWebGL();
      setWebGLSupported(webglSupport);

      // If WebGL is not supported, trigger content show after welcome screen
      if (!webglSupport) {
        setTimeout(() => {
          setShowWelcome(false);
          document.documentElement.classList.add('content-ready');
          console.log('Content ready triggered (WebGL not supported)');
        }, 500);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleCanvasReady = () => {
    // Wait for welcome screen duration, then hide it
    // Timing matches the pulse animation cycle
    setTimeout(() => {
      setShowWelcome(false);
      // Trigger content show globally
      document.documentElement.classList.add('content-ready');
    }, 500); // Half a second for faster loading
  };

  // Always render the same structure to avoid hydration mismatches
  return (
    <>
      {/* Only render canvas when client-side and WebGL is supported */}
      {isClient && webGLSupported && (
        <ThreeCanvas onReady={handleCanvasReady} />
      )}

      {/* Always render welcome overlay initially, hide it when ready */}
      {(!isClient || webGLSupported === null || showWelcome) && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-background'>
          <h1
            className={`text-4xl font-mono ${
              isClient && webGLSupported !== null
                ? 'welcome-pulse'
                : 'animate-pulse'
            }`}
          >
            Welcome
          </h1>
        </div>
      )}
    </>
  );
}
