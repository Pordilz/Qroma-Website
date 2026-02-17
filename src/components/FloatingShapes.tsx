import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, Float, MeshDistortMaterial, Outlines, Environment } from '@react-three/drei';
import { Group } from 'three';

function useIsDark() {
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
    return isDark;
}

function FloatingItem({
    position,
    rotation = [0, 0, 0],
    scale = 1,
    color = "white",
    type = "sphere",
    speed = 1,
    outlineColor = '#121212'
}: {
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    color?: string;
    type?: "sphere" | "box" | "torus";
    speed?: number;
    outlineColor?: string;
}) {
    const meshRef = useRef<Group>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        // Rotate constantly
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.2 + rotation[0];
        meshRef.current.rotation.y += 0.01 * speed;

        // Float vertically based on scroll roughly (simulated here as we are in fixed canvas)
        // Actually, since this is a FIXED canvas behind everything, we need to move the camera or the objects based on scroll.
        // However, simplest way for "interactive background" is just to have them move slowly on their own, 
        // but positioned such that they are NOT in the top view (y > 0ish).
    });

    return (
        <Float
            speed={2 * speed}
            rotationIntensity={1}
            floatIntensity={1}
            position={position}
        >
            <group ref={meshRef} scale={scale} rotation={rotation as any}>
                {type === 'sphere' && (
                    <Sphere args={[1, 32, 32]}>
                        <MeshDistortMaterial color={color} speed={2} distort={0.4} roughness={0.8} />
                        <Outlines thickness={0.05} color={outlineColor} />
                    </Sphere>
                )}
                {type === 'box' && (
                    <Box args={[1.5, 1.5, 1.5]}>
                        <MeshDistortMaterial color={color} speed={2} distort={0.2} roughness={0.8} />
                        <Outlines thickness={0.05} color={outlineColor} />
                    </Box>
                )}
                {type === 'torus' && (
                    <Torus args={[1, 0.4, 16, 32]}>
                        <MeshDistortMaterial color={color} speed={2} distort={0.3} roughness={0.8} />
                        <Outlines thickness={0.05} color={outlineColor} />
                    </Torus>
                )}
            </group>
        </Float>
    );
}

export default function FloatingShapes() {
    const isDark = useIsDark();
    const outlineColor = isDark ? '#d4d0ca' : '#121212';
    // We want shapes to appear generally "behind" the other sections, but NOT the hero.
    // The hero is roughly at Y=0 to Y=-5 in 3D space if we were scrolling.
    // Since this is a fixed canvas, we can just position them lower down or to the far sides.
    // The user asked to remove them from the "header section" (Hero).

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
                <Environment preset="studio" />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 5]} intensity={1} />

                {/* 
           Positions:
           X: Left (-10) to Right (10)
           Y: Top (5) to Bottom (-10)
           
           Hero is center. Let's push shapes to the edges or lower down.
        */}

                {/* Services Section Area (approx) */}
                <FloatingItem position={[-8, -6, -2]} scale={1.5} type="torus" speed={0.8} outlineColor={outlineColor} />
                <FloatingItem position={[9, -4, -5]} scale={2} type="box" speed={0.5} outlineColor={outlineColor} />

                {/* Process Section Area */}
                <FloatingItem position={[-6, -12, -8]} scale={1.2} type="sphere" color="#f0f0f0" speed={0.7} outlineColor={outlineColor} />
                <FloatingItem position={[7, -10, -4]} scale={1.8} type="torus" speed={0.9} outlineColor={outlineColor} />

                {/* Contact/Work Area */}
                <FloatingItem position={[0, -15, -10]} scale={3} type="sphere" speed={0.3} outlineColor={outlineColor} />
            </Canvas>
        </div>
    );
}
