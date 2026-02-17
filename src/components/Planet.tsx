import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Outlines } from '@react-three/drei';
import * as THREE from 'three';

export default function Planet() {
  const planetRef = useRef<THREE.Mesh>(null);
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002;
      planetRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  const clayColor = isDark ? '#2a2a2a' : '#f0f0f0';
  const lineColor = isDark ? '#d4d0ca' : '#1a1a1a';

  return (
    <group>
      {/* Main Clay Planet */}
      <Sphere ref={planetRef} args={[2.5, 64, 64]}>
        <MeshDistortMaterial
          color={clayColor}
          roughness={0.9}
          metalness={0.1}
          distort={0.4}
          speed={0.5}
        />
        {/* Sketch Outline */}
        <Outlines thickness={0.05} color={lineColor} />
      </Sphere>

      {/* Orbital Ring 1 */}
      <mesh rotation={[1.2, 0, 0]}>
        <torusGeometry args={[3.8, 0.02, 16, 100]} />
        <meshBasicMaterial color={lineColor} />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh rotation={[1.2, 0.5, 0]}>
        <torusGeometry args={[4.2, 0.02, 16, 100]} />
        <meshBasicMaterial color={lineColor} />
      </mesh>
    </group>
  );
}
