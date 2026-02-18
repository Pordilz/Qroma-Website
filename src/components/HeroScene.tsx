import { Environment, ContactShadows, Float } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import Planet from './Planet';

interface HeroSceneProps {
    scrollProgress: number;
}

export default function HeroScene({ scrollProgress }: HeroSceneProps) {
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // We can use scrollProgress to rotate the planet faster or move it

    return (
        <div className="w-full h-full relative">
            <Canvas camera={{ position: [0, 0, isMobile ? 14 : 8], fov: 45 }}>
                <Suspense fallback={null}>
                    <Environment preset="studio" />

                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Planet />
                    </Float>

                    {/* Soft Shadow at the bottom to ground it in the "studio" */}
                    <ContactShadows
                        position={[0, -3.5, 0]}
                        opacity={0.4}
                        scale={10}
                        blur={2.5}
                        far={4}
                        color="#000000"
                    />

                    {/* Custom Lighting for Clay Texture */}
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
                </Suspense>
            </Canvas>
        </div>
    );
}
