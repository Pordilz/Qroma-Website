import { useRef, useEffect, useCallback, useState } from 'react';

interface ClickSparkProps {
    sparkColor?: string;
    sparkSize?: number;
    sparkRadius?: number;
    sparkCount?: number;
    duration?: number;
    easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
    extraScale?: number;
    children: React.ReactNode;
}

interface Spark {
    x: number;
    y: number;
    angle: number;
    startTime: number;
}

const ClickSpark: React.FC<ClickSparkProps> = ({
    sparkColor = '#121212',
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 400,
    easing = 'ease-out',
    extraScale = 1.0,
    children,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sparksRef = useRef<Spark[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;


        const resizeCanvas = () => {
            const { width, height } = parent.getBoundingClientRect();
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
        };
        const handleResize = () => {
            resizeCanvas();
        };

        const ro = new ResizeObserver(handleResize);
        ro.observe(parent);
        resizeCanvas();

        return () => {
            ro.disconnect();
        };
    }, []);

    const easeFunc = useCallback(
        (t: number): number => {
            switch (easing) {
                case 'linear':
                    return t;
                case 'ease-in':
                    return t * t;
                case 'ease-in-out':
                    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                default:
                    return t * (2 - t);
            }
        },
        [easing],
    );

    const [resolvedColor, setResolvedColor] = useState(sparkColor);

    // Resolve CSS variable colors for canvas rendering
    useEffect(() => {
        const resolve = () => {
            if (sparkColor.startsWith('var(')) {
                const varName = sparkColor.slice(4, -1);
                const computed = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
                setResolvedColor(computed || '#121212');
            } else {
                setResolvedColor(sparkColor);
            }
        };
        resolve();
        // Re-resolve when .dark class changes
        const observer = new MutationObserver(resolve);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, [sparkColor]);

    const animationIdRef = useRef<number | null>(null);
    const isAnimatingRef = useRef(false);

    const draw = useCallback((timestamp: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        sparksRef.current = sparksRef.current.filter((spark) => {
            const elapsed = timestamp - spark.startTime;
            if (elapsed >= duration) return false;

            const progress = elapsed / duration;
            const eased = easeFunc(progress);
            const distance = eased * sparkRadius * extraScale;
            const lineLength = sparkSize * (1 - eased);

            const x1 = spark.x + distance * Math.cos(spark.angle);
            const y1 = spark.y + distance * Math.sin(spark.angle);
            const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
            const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

            ctx.strokeStyle = resolvedColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            return true;
        });

        // Only continue the loop if there are still active sparks
        if (sparksRef.current.length > 0) {
            animationIdRef.current = requestAnimationFrame(draw);
        } else {
            isAnimatingRef.current = false;
            animationIdRef.current = null;
        }
    }, [sparkSize, sparkRadius, duration, easeFunc, extraScale, resolvedColor]);

    const startAnimation = useCallback(() => {
        if (!isAnimatingRef.current) {
            isAnimatingRef.current = true;
            animationIdRef.current = requestAnimationFrame(draw);
        }
    }, [draw]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        };
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Force update canvas size to ensure it covers the clickable area
        // This is crucial if the click itself triggered a layout change
        const parent = canvas.parentElement;
        if (parent) {
            const { width, height } = parent.getBoundingClientRect();
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
        }

        const rect = canvas.getBoundingClientRect();
        // Use page coordinates relative to screen, then adjusted for canvas position
        // simple clientX/Y - rect.left/top is usually robust for absolute positioning
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const now = performance.now();
        const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
            x,
            y,
            angle: (2 * Math.PI * i) / sparkCount,
            startTime: now,
        }));

        sparksRef.current.push(...newSparks);
        startAnimation();
    };

    return (
        <div
            style={{ position: 'relative', width: '100%', height: '100%' }}
            onClick={handleClick}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    userSelect: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 9998,
                }}
            />
            {children}
        </div>
    );
};

export default ClickSpark;
