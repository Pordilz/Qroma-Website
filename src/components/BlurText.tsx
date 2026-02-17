import { useRef, useEffect, useState, memo } from 'react';
import { motion, useInView } from 'framer-motion';

interface BlurTextProps {
    text: string;
    delay?: number;
    className?: string;
    animateBy?: 'words' | 'letters';
    direction?: 'top' | 'bottom';
}

const BlurText: React.FC<BlurTextProps> = memo(({
    text = '',
    delay = 50,
    className = '',
    animateBy = 'words',
    direction = 'bottom',
}) => {
    const ref = useRef<HTMLHeadingElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [elements, setElements] = useState<string[]>([]);

    useEffect(() => {
        if (animateBy === 'words') {
            setElements(text.split(' '));
        } else {
            setElements(text.split(''));
        }
    }, [text, animateBy]);

    const yOffset = direction === 'top' ? -20 : 20;

    return (
        <h2
            ref={ref}
            className={className}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
            {elements.map((el, i) => (
                <motion.span
                    key={`${el}-${i}`}
                    initial={{
                        filter: 'blur(10px)',
                        opacity: 0,
                        y: yOffset,
                    }}
                    animate={isInView ? {
                        filter: 'blur(0px)',
                        opacity: 1,
                        y: 0,
                    } : {}}
                    transition={{
                        duration: 0.5,
                        delay: (i * delay) / 1000,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    style={{
                        display: 'inline-block',
                        willChange: 'transform, filter, opacity',
                    }}
                >
                    {el === ' ' ? '\u00A0' : el}
                    {animateBy === 'words' && i < elements.length - 1 && '\u00A0'}
                </motion.span>
            ))}
        </h2>
    );
});

BlurText.displayName = 'BlurText';

export default BlurText;
