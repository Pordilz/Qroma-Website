import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface Laptop3DProps {
  scrollProgress: number;
  onFullyOpen: boolean;
}

export default function Laptop3D({ scrollProgress, onFullyOpen }: Laptop3DProps) {
  const laptopRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Mesh>(null);

  const openProgress = Math.min(scrollProgress * 2.5, 1);
  const lidAngle = openProgress * (Math.PI * 0.55);
  const cameraZ = 8 - openProgress * 3.5;
  const floatOffset = Math.sin(Date.now() * 0.0005) * 0.05;

  useFrame(({ camera }) => {
    if (!onFullyOpen) {
      camera.position.z = cameraZ;
      camera.position.y = 0.5 - openProgress * 0.3;
      camera.lookAt(0, 0, 0);
    }

    if (laptopRef.current && !onFullyOpen) {
      laptopRef.current.position.y = floatOffset;
      laptopRef.current.rotation.y = Math.sin(Date.now() * 0.0003) * 0.05;
    }

    if (lidRef.current) {
      lidRef.current.rotation.x = -lidAngle;
    }
  });

  return (
    <group ref={laptopRef} position={[0, 0, 0]}>
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.1, 2.8]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[0, -0.05, 1.42]}>
        <boxGeometry args={[4, 0.12, 0.06]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <group ref={lidRef} position={[0, -0.05, 1.42]}>
        <mesh position={[0, 1.4, -1.42]} castShadow>
          <boxGeometry args={[4, 2.8, 0.08]} />
          <meshStandardMaterial
            color="#1f1f1f"
            metalness={0.9}
            roughness={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0, 1.38, -1.38]}>
          <planeGeometry args={[3.7, 2.4]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#ffffff"
            emissiveIntensity={openProgress * 0.3}
          />

          {openProgress > 0.7 && (
            <Html
              transform
              distanceFactor={1.5}
              position={[0, 0, 0.01]}
              style={{
                width: '740px',
                height: '480px',
                transition: 'opacity 0.5s',
                opacity: (openProgress - 0.7) / 0.3,
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                <div className="text-center px-8 animate-fade-in">
                  <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
                    Qroma
                  </h1>
                  <p className="text-xl text-slate-300 mb-8 max-w-xl mx-auto">
                    Automate. Accelerate. Dominate.
                  </p>
                  <button className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition-all hover:scale-105 shadow-2xl">
                    Explore Services
                  </button>
                </div>
              </div>
            </Html>
          )}
        </mesh>
      </group>

      <pointLight
        position={[0, 2, 2]}
        intensity={openProgress * 2}
        color="#4a9eff"
      />
    </group>
  );
}
