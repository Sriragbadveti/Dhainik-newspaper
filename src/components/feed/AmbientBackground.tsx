import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

function ParticleDust() {
  const count = 120;
  const pointsRef = useRef<THREE.Points>(null!);
  const { activePostIndex, language } = useAppStore();

  // Create initial random positions and subtle size variations
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    // Warm editorial tones: gold dust, soft paper white, muted crimson tint
    const colorChoices = [
      new THREE.Color('#d97706'),
      new THREE.Color('#991b1b'),
      new THREE.Color('#a1a1aa'),
      new THREE.Color('#d4d4d8'),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const chosenColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime() * 0.15;
    
    // Subtle rotational motion influenced by scroll index
    pointsRef.current.rotation.y = time * 0.3 + activePostIndex * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { activePostIndex } = useAppStore();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.2;
    meshRef.current.position.y = Math.sin(time) * 0.3 - activePostIndex * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -4]}>
      <planeGeometry args={[16, 16]} />
      <meshBasicMaterial
        color="#f4f1ea"
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export const AmbientBackground: React.FC = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-paper-50 via-paper-100 to-paper-200/50" />
    );
  }

  return (
    <div id="ambient-canvas-container" className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <FloatingMesh />
        <ParticleDust />
      </Canvas>
    </div>
  );
};
