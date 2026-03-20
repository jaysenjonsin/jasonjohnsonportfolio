'use client';

import { OrthographicCamera } from '@react-three/drei';

interface SphereProps {
  isDark?: boolean;
}

export default function Sphere({ isDark = true }: SphereProps) {
  const sphereColor = isDark ? '#111' : '#f0f0f0';

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={95} />
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial
          color={sphereColor}
          metalness={isDark ? 1 : 0.8}
          roughness={0.2}
        />
      </mesh>
    </>
  );
}
