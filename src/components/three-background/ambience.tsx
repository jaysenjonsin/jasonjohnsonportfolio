'use client';

import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';

export default function Ambience() {
  // Smooth constant rotation around the sphere
  useFrame((state) => {
    const t = state.clock.elapsedTime / 3.0; // Slow, smooth rotation
    const radius = 15;
    state.camera.position.set(
      Math.sin(t) * radius, // Smooth circular motion
      Math.sin(t * 0.3) * 2, // Gentle vertical drift
      Math.cos(t) * radius // Circular motion
    );
    state.camera.lookAt(0, 0, 0);
  });

  // Render a custom environment map, this is what the sphere reflects
  return (
    <Environment preset='city' resolution={256}>
      <group rotation={[-Math.PI / 4, 0, 0]}>
        <Lightformer
          intensity={4}
          rotation-x={Math.PI / 2}
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
        />
        {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
          <Lightformer
            key={i}
            form='circle'
            intensity={2}
            rotation={[Math.PI / 2, 0, 0]}
            position={[x, 4, i * 4]}
            scale={[10, 1, 1]}
          />
        ))}
        <Lightformer
          intensity={2}
          rotation-y={Math.PI / 2}
          position={[-5, 1, -1]}
          scale={[100, 1, 1]}
        />
        <Lightformer
          intensity={1}
          rotation-y={Math.PI / 2}
          position={[-5, -1, -1]}
          scale={[100, 1, 1]}
        />
        <Lightformer
          intensity={5}
          rotation-y={-Math.PI / 2}
          position={[10, 1, 0]}
          scale={[100, 1, 1]}
        />
      </group>
    </Environment>
  );
}
