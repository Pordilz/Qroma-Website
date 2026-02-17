import { useRef, useLayoutEffect, useState } from 'react';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from 'framer-motion';

function useElementWidth(ref: React.RefObject<HTMLElement | null>) {
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        function updateWidth() {
            if (ref.current) {
                setWidth(ref.current.offsetWidth);
            }
        }
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [ref]);

    return width;
}

interface VelocityTextProps {
    children: React.ReactNode;
    baseVelocity: number;
    className?: string;
    damping?: number;
    stiffness?: number;
    numCopies?: number;
    scrollerClassName?: string;
}

function VelocityText({
    children,
    baseVelocity = 100,
    className = '',
    damping = 50,
    stiffness = 400,
    numCopies = 6,
    scrollerClassName = 'velocity-scroller',
}: VelocityTextProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness });
    const velocityFactor = useTransform(
        smoothVelocity,
        [0, 1000],
        [0, 5],
        { clamp: false },
    );

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min: number, max: number, v: number) {
        const range = max - min;
        const mod = (((v - min) % range) + range) % range;
        return mod + min;
    }

    const x = useTransform(baseX, (v) => {
        if (copyWidth === 0) return '0px';
        return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef(1);
    useAnimationFrame((_t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }
        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < numCopies; i++) {
        spans.push(
            <span className={className} key={i} ref={i === 0 ? copyRef : null}>
                {children}
            </span>,
        );
    }

    return (
        <div className="velocity-parallax">
            <motion.div className={scrollerClassName} style={{ x }}>
                {spans}
            </motion.div>
        </div>
    );
}

interface ScrollVelocityProps {
    texts?: string[];
    velocity?: number;
    className?: string;
    damping?: number;
    stiffness?: number;
    numCopies?: number;
    scrollerClassNames?: string[];
}

const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
    texts = [],
    velocity = 80,
    className = '',
    damping = 50,
    stiffness = 400,
    numCopies = 6,
    scrollerClassNames,
}) => {
    return (
        <section className="scroll-velocity-section">
            {texts.map((text, index) => (
                <VelocityText
                    key={index}
                    className={className}
                    baseVelocity={index % 2 !== 0 ? -velocity : velocity}
                    damping={damping}
                    stiffness={stiffness}
                    numCopies={numCopies}
                    scrollerClassName={scrollerClassNames?.[index] || 'velocity-scroller'}
                >
                    {text}&nbsp;
                </VelocityText>
            ))}
        </section>
    );
};

export default ScrollVelocity;
