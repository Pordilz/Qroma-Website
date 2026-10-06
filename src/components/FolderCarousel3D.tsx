import React, { memo, useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate, type PanInfo } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    X,
    ZoomIn,
} from 'lucide-react';
import SvgProjectCard from './SvgProjectCard';
import { type Project } from '../data/projects';

// ─── Responsive Media Query Hook ─────────────────────────────────────────────
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function useMediaQuery(query: string, defaultValue = false): boolean {
    const [matches, setMatches] = useState<boolean>(() => {
        if (typeof window === 'undefined') return defaultValue;
        return window.matchMedia ? window.matchMedia(query).matches : defaultValue;
    });

    useIsomorphicLayoutEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;
        const mediaQuery = window.matchMedia(query);
        const onChange = () => setMatches(mediaQuery.matches);
        setMatches(mediaQuery.matches);
        mediaQuery.addEventListener('change', onChange);
        return () => mediaQuery.removeEventListener('change', onChange);
    }, [query]);

    return matches;
}

// ─── 3D Cylinder Card Face ───────────────────────────────────────────────────
interface CylinderCardProps {
    project: Project;
    index: number;
    cardAngle: number;
    radius: number;
    cardWidth: number;
    rotation: ReturnType<typeof useMotionValue<number>>;
    isDragging?: boolean;
    onSelectImage: (src: string, alt: string) => void;
    onSnapTo: (index: number) => void;
}

const CylinderCard = memo(function CylinderCard({
    project,
    index,
    cardAngle,
    radius,
    cardWidth,
    rotation,
    isDragging: _isDragging,
    onSelectImage,
    onSnapTo,
}: CylinderCardProps) {
    // Dynamic angle culling: keep front & flanking cards fully visible, hide only back faces
    const opacity = useTransform(rotation, (r: number) => {
        const net = ((cardAngle + r) % 360 + 360) % 360;
        const dist = net > 180 ? 360 - net : net; // 0 deg is front, 180 deg is back
        if (dist > 85) return 0; // completely hide cards on the back half
        if (dist > 52) return ((85 - dist) / 33) * 0.85; // smooth fade from 0.85 to 0
        return 1;
    });

    // Disable pointer interaction on cards not in front
    const pointerEvents = useTransform(rotation, (r: number) => {
        const net = ((cardAngle + r) % 360 + 360) % 360;
        const dist = net > 180 ? 360 - net : net;
        return dist > 65 ? 'none' : 'auto';
    });

    // Detect front face for highlight styling
    const [isFront, setIsFront] = useState(false);
    useEffect(() => {
        const unsubscribe = rotation.on('change', (r: number) => {
            const net = ((cardAngle + r) % 360 + 360) % 360;
            const dist = net > 180 ? 360 - net : net;
            setIsFront(dist < 22.5);
        });
        return () => unsubscribe();
    }, [cardAngle, rotation]);

    return (
        <div
            className="absolute flex flex-col items-center select-none"
            style={{
                width: `${cardWidth}px`,
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
                // Avoid backfaceVisibility: 'hidden' as it triggers low-DPI bitmap caching in Chromium
            }}
        >
            <motion.div
                style={{
                    opacity,
                    pointerEvents,
                }}
                className="w-full transition-shadow duration-300"
                onClick={() => {
                    if (!isFront) {
                        onSnapTo(index);
                    }
                }}
            >
                <SvgProjectCard
                    project={project}
                    index={index}
                    isCylinderCard={true}
                    isFront={isFront}
                    onSelectImage={onSelectImage}
                />
            </motion.div>
        </div>
    );
});

// ─── Main Folder Carousel 3D Component ───────────────────────────────────────
interface FolderCarousel3DProps {
    projects: Project[];
}

export type ZoomPreset = 'standard' | 'wide' | 'panoramic';

export default function FolderCarousel3D({ projects }: FolderCarousel3DProps) {
    const isScreenSm = useMediaQuery('(max-width: 640px)');
    const isScreenMd = useMediaQuery('(max-width: 1024px)');

    // Default to 'wide' for spacious overview
    const [zoom, setZoom] = useState<ZoomPreset>('wide');

    // 8 cylinder faces (duplicate the 4 folder projects across 8 faces for dense 360° circularity)
    const cards = projects.length === 4 ? [...projects, ...projects] : projects;
    const faceCount = cards.length;
    const angleStep = 360 / faceCount;

    // Card width tuned for crisp proportion
    const cardWidth = isScreenSm ? 270 : isScreenMd ? 300 : 330;

    // Radius tuned so cards curve cleanly with natural 3D depth
    const radius = isScreenSm ? 430 : isScreenMd ? 500 : 560;

    // Camera Z displacement: zoom out by moving the camera in 3D rather than scaling 2D (prevents texture blur!)
    const cameraTranslateZ = zoom === 'panoramic' ? -180 : zoom === 'wide' ? -80 : 0;

    const rotation = useMotionValue(0);
    const transform = useTransform(rotation, (val: number) => `translateZ(${cameraTranslateZ}px) rotate3d(0, 1, 0, ${val}deg)`);

    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedLightbox, setSelectedLightbox] = useState<{ src: string; alt: string } | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const dragStartRotation = useRef(0);
    const carouselContainerRef = useRef<HTMLDivElement>(null);

    // Calculate which project is currently front-facing
    const updateActiveIndex = useCallback((currentRotation: number) => {
        const rawIndex = Math.round(-currentRotation / angleStep);
        const normalized = ((rawIndex % faceCount) + faceCount) % faceCount;
        setActiveIndex(normalized % (projects.length || 1));
    }, [angleStep, faceCount, projects.length]);

    // Keep activeIndex synchronized as rotation changes
    useEffect(() => {
        const unsubscribe = rotation.on('change', (val: number) => {
            updateActiveIndex(val);
        });
        return () => unsubscribe();
    }, [rotation, updateActiveIndex]);

    // Snap smoothly to target angle
    const snapToAngle = useCallback((targetAngle: number) => {
        animate(rotation, targetAngle, {
            type: 'spring',
            stiffness: 110,
            damping: 22,
            mass: 0.75,
        });
    }, [rotation]);

    // Snap to card index
    const snapToCard = useCallback((cardIndex: number) => {
        const currentRot = rotation.get();
        const currentCardRaw = -currentRot / angleStep;
        const offset = ((cardIndex - Math.round(currentCardRaw)) % faceCount + faceCount + faceCount / 2) % faceCount - faceCount / 2;
        const targetRot = (Math.round(currentCardRaw) + offset) * -angleStep;
        snapToAngle(targetRot);
    }, [angleStep, faceCount, rotation, snapToAngle]);

    // Next & Previous Handlers
    const handleNext = () => {
        const current = rotation.get();
        const nextTarget = Math.round((current - angleStep) / angleStep) * angleStep;
        snapToAngle(nextTarget);
    };

    const handlePrev = () => {
        const current = rotation.get();
        const prevTarget = Math.round((current + angleStep) / angleStep) * angleStep;
        snapToAngle(prevTarget);
    };

    // Keyboard navigation (Arrow keys)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <div className="relative w-full max-w-7xl mx-auto py-8 select-none">
            {/* ─── Top Control Strip: Status Badge & Zoom Controls ─── */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-4">
                {/* Mode Indicator */}
                <div className="flex items-center gap-2.5 text-xs font-bold font-clean uppercase tracking-widest text-ink/60 bg-[var(--card-bg)] px-4 py-2 rounded-full border-2 border-[var(--ink-black)]/10 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>3D Dossier Carousel</span>
                    <span className="text-[10px] text-ink/30 px-1.5 py-0.5 rounded bg-[var(--ink-black)]/5">
                        {activeIndex + 1} / {projects.length}
                    </span>
                </div>

                {/* Zoom Level Switcher */}
                <div className="flex items-center gap-1.5 bg-[var(--card-bg)] border-2 border-[var(--ink-black)]/15 rounded-full p-1 shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50 pl-2.5 pr-1 font-clean flex items-center gap-1">
                        <ZoomIn size={12} /> View:
                    </span>
                    <button
                        type="button"
                        onClick={() => setZoom('standard')}
                        className={`px-3 py-1 rounded-full text-xs font-bold font-clean transition-all cursor-pointer ${
                            zoom === 'standard'
                                ? 'bg-[var(--ink-black)] text-[var(--bg-paper)] shadow-sm'
                                : 'text-ink/60 hover:text-ink'
                        }`}
                        title="Close-up focus view"
                    >
                        Standard
                    </button>
                    <button
                        type="button"
                        onClick={() => setZoom('wide')}
                        className={`px-3 py-1 rounded-full text-xs font-bold font-clean transition-all cursor-pointer ${
                            zoom === 'wide'
                                ? 'bg-[var(--ink-black)] text-[var(--bg-paper)] shadow-sm'
                                : 'text-ink/60 hover:text-ink'
                        }`}
                        title="Zoomed out view (Default)"
                    >
                        Zoomed Out
                    </button>
                    <button
                        type="button"
                        onClick={() => setZoom('panoramic')}
                        className={`px-3 py-1 rounded-full text-xs font-bold font-clean transition-all cursor-pointer ${
                            zoom === 'panoramic'
                                ? 'bg-[var(--ink-black)] text-[var(--bg-paper)] shadow-sm'
                                : 'text-ink/60 hover:text-ink'
                        }`}
                        title="Ultra wide panoramic overview"
                    >
                        Panoramic
                    </button>
                </div>
            </div>

            {/* ─── 3D Viewport Stage ─── */}
            <div
                ref={carouselContainerRef}
                className="relative h-[720px] md:h-[780px] w-full overflow-visible flex items-center justify-center cursor-grab active:cursor-grabbing"
                style={{
                    perspective: isScreenSm ? '1600px' : '2200px',
                    perspectiveOrigin: '50% 50%',
                }}
            >
                {/* Ambient ground reflection shadow beneath the cylinder */}
                <div
                    className="absolute bottom-4 w-[600px] md:w-[850px] h-20 rounded-[100%] pointer-events-none opacity-40 blur-xl"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)',
                    }}
                />

                {/* 3D Cylinder Rotor with Smooth Native 3D Rotation */}
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragStart={() => {
                        setIsDragging(true);
                        dragStartRotation.current = rotation.get();
                    }}
                    onDrag={(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                        const deltaAngle = (info.offset.x / (radius * 2)) * 120;
                        rotation.set(dragStartRotation.current + deltaAngle);
                    }}
                    onDragEnd={(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                        setIsDragging(false);
                        const current = rotation.get();
                        const projected = current + info.velocity.x * 0.12;
                        const nearestSnap = Math.round(projected / angleStep) * angleStep;
                        snapToAngle(nearestSnap);
                    }}
                    style={{
                        transform,
                        transformStyle: 'preserve-3d',
                        width: '100%',
                        height: '100%',
                    }}
                    className="relative flex items-center justify-center origin-center"
                >
                    {cards.map((project, i) => {
                        const cardAngle = i * angleStep;

                        return (
                            <CylinderCard
                                key={`cylinder-card-${project.id}-${i}`}
                                project={project}
                                index={i % (projects.length || 1)}
                                cardAngle={cardAngle}
                                radius={radius}
                                cardWidth={cardWidth}
                                rotation={rotation}
                                isDragging={isDragging}
                                onSelectImage={(src, alt) => setSelectedLightbox({ src, alt })}
                                onSnapTo={(idx) => snapToCard(idx)}
                            />
                        );
                    })}
                </motion.div>

                {/* Floating Left Navigation Arrow */}
                <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous Folder"
                    className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-2 border-[var(--ink-black)] bg-[var(--bg-paper)] shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center text-ink cursor-pointer active:scale-95"
                >
                    <ChevronLeft size={22} />
                </button>

                {/* Floating Right Navigation Arrow */}
                <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next Folder"
                    className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-2 border-[var(--ink-black)] bg-[var(--bg-paper)] shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:shadow-none hover:-translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center text-ink cursor-pointer active:scale-95"
                >
                    <ChevronRight size={22} />
                </button>
            </div>

            {/* ─── Bottom Navigation Pill Selectors ─── */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 px-4">
                {projects.map((project, idx) => {
                    const isCurrent = activeIndex === idx;
                    return (
                        <button
                            key={project.id}
                            type="button"
                            onClick={() => snapToCard(idx)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-xs font-bold font-clean transition-all duration-300 cursor-pointer ${
                                isCurrent
                                    ? 'bg-[var(--ink-black)] text-[var(--bg-paper)] border-[var(--ink-black)] shadow-[4px_4px_0px_0px_var(--shadow-color)] -translate-y-0.5'
                                    : 'bg-[var(--card-bg)] text-ink/70 border-[var(--ink-black)]/20 hover:border-[var(--ink-black)] hover:text-ink'
                            }`}
                        >
                            <span
                                className="w-2.5 h-2.5 rounded-full border border-black/20"
                                style={{ backgroundColor: project.color }}
                            />
                            <span>{project.title}</span>
                            <span className={`text-[10px] font-mono ${isCurrent ? 'text-white/60' : 'text-ink/40'}`}>
                                0{idx + 1}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Hint */}
            <div className="text-center mt-3 text-xs text-ink/40 font-sketch">
                <span>Drag to spin cylinder • Arrow keys or buttons to navigate</span>
            </div>

            {/* ─── Lightbox Modal for Enlarged Dossier Paper ─── */}
            <AnimatePresence>
                {selectedLightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedLightbox(null)}
                        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 md:p-8 cursor-pointer backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="relative max-w-5xl max-h-[90vh] bg-[var(--card-bg)] rounded-2xl border-2 border-[var(--ink-black)] shadow-[8px_8px_0px_0px_var(--shadow-color)] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between px-5 py-3 border-b-2 border-[var(--ink-black)]/10 bg-[var(--card-bg)]">
                                <span className="text-xs font-bold tracking-wider uppercase text-ink/70 font-clean">
                                    {selectedLightbox.alt}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setSelectedLightbox(null)}
                                    className="p-1 rounded-full hover:bg-[var(--ink-black)]/10 text-ink transition-colors cursor-pointer"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="p-4 flex items-center justify-center max-h-[calc(90vh-60px)] overflow-auto bg-[var(--bg-paper)]">
                                <img
                                    src={selectedLightbox.src}
                                    alt={selectedLightbox.alt}
                                    className="max-w-full max-h-[75vh] object-contain rounded-lg border border-[var(--ink-black)]/20 shadow-md"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
