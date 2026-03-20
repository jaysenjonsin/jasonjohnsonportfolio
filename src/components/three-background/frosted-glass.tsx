'use client';

import { useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, RenderTexture } from '@react-three/drei';

interface FrostedGlassProps {
  children: React.ReactNode;
  isDark?: boolean;
}

//the "filter" that makes the background look frosted. takes everything inside it (the sphere + lighting) and applies frosted glass effect
export default function FrostedGlass({ children, isDark = true }: FrostedGlassProps) {
  const { viewport } = useThree();

  // Enhanced grain and contrast for both modes
  const glassProps = {
    samples: isDark ? 1 : 2,
    thickness: 0.15,
    chromaticAberration: 0.02,
    anisotropy: 2,
    roughness: 0.6,
    transparent: true,
    opacity: 0.55,
    distortion: 0.9,
    distortionScale: 0.5, // Stronger scaling in dark mode for pronounced grain
    temporalDistortion: 0.08,
  };

  return (
    //mesh = 2D plane that covers the entire screen. scale = size of the plane.
    //analogy: glass window = frame + glass pane + window treatment
    //mesh = frame, planeGeometry = glass pane, MeshTransmissionMaterial = window treatment(frosted effect). without planeGemoetry, there'd be no "canvas" for frosted effect to exist on
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
