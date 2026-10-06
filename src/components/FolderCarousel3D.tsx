import React, { memo, useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate, type PanInfo } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    ExternalLink,
    Maximize2,
    X,
    Sparkles,
    ZoomIn,
} from 'lucide-react';
import Folder from './Folder';
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
    // Dynamically calculate opacity: fade out cards as they curve toward the sides / back
    const opacity = useTransform(rotation, (r: number) => {
        const net = ((cardAngle + r) % 360 + 360) % 360;
        const dist = net > 180 ? 360 - net : net; // 0 deg is front, 180 deg is back
        if (dist > 82) return 0; // completely hide any card facing backwards/sideways
        if (dist > 45) return ((82 - dist) / 37) * 0.72; // smooth fade from 0.72 to 0
        if (dist > 18) return 0.72 + ((45 - dist) / 27) * 0.28; // fade from 1 to 0.72
        return 1;
    });

    // Subtle scale perspective for flanking cards
    const scale = useTransform(rotation, (r: number) => {
        const net = ((cardAngle + r) % 360 + 360) % 360;
        const dist = net > 180 ? 360 - net : net;
        if (dist > 82) return 0.75;
        return 1 - (dist / 90) * 0.14;
    });


    // Disable pointer interaction on cards not in front
    const pointerEvents = useTransform(rotation, (r: number) => {
        const net = ((cardAngle + r) % 360 + 360) % 360;
        const dist = net > 180 ? 360 - net : net;
        return dist > 70 ? 'none' : 'auto';
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

    // Build papers for folder
    const buildFolderItems = () => {
        const papers: React.ReactNode[] = [];

        // Paper 1: Screenshot preview
        if (project.images && project.images.length > 0) {
            const img = project.images[0];
            papers.push(
                <div
                    key="screenshot-paper"
                    className="w-full h-full bg-white border-2 border-[var(--ink-black)] overflow-hidden relative cursor-pointer group/paper"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelectImage(img.src, img.alt);
                    }}
                >
                    <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/paper:opacity-100 transition-opacity flex items-center justify-center text-white text-[9px] font-bold font-clean gap-1">
                        <Maximize2 size={10} /> Expand
                    </div>
                </div>
            );
        } else {
            papers.push(
                <div
                    key="fallback-paper"
                    className="w-full h-full bg-[#faf7f2] border-2 border-[var(--ink-black)] flex flex-col items-center justify-center p-2 text-center"
                >
                    <project.icon size={18} style={{ color: project.color }} />
                    <span className="text-[8px] font-bold font-clean text-ink mt-1">Dossier</span>
                </div>
            );
        }

        // Paper 2: Tech Specs Blueprint
        papers.push(
            <div
                key="specs-paper"
                className="w-full h-full bg-[#fdfbf7] border-2 border-[var(--ink-black)] p-2 flex flex-col justify-between select-none"
            >
                <div className="flex items-center justify-between border-b border-[var(--ink-black)]/15 pb-0.5">
                    <span className="text-[7px] font-bold uppercase tracking-wider text-ink/40 font-clean">Specs</span>
                    <span className="text-[7px] font-bold font-clean" style={{ color: project.color }}>{project.year}</span>
                </div>
                <div className="space-y-0.5 my-auto">
                    {project.tech.slice(0, 3).map((t) => (
                        <div key={t} className="text-[7.5px] font-semibold text-ink/80 font-clean truncate">
                            • {t}
                        </div>
                    ))}
                </div>
                <div className="text-[6.5px] text-ink/40 uppercase tracking-widest font-sketch text-right">
                    QROMA
                </div>
            </div>
        );

        // Paper 3: Verification Badge
        papers.push(
            <div
                key="status-paper"
                className="w-full h-full bg-[var(--bg-paper)] border-2 border-[var(--ink-black)] p-2 flex flex-col items-center justify-center text-center select-none"
            >
                <div
                    className="w-5 h-5 rounded-full flex items-center justify-center mb-1 border"
                    style={{ borderColor: project.color + '60', background: project.color + '15' }}
                >
                    <project.icon size={11} style={{ color: project.color }} />
                </div>
                <span className="text-[8px] font-bold text-ink font-clean leading-tight truncate w-full">{project.title}</span>
                <span
                    className="mt-0.5 px-1 py-0.2 rounded text-[7px] font-bold uppercase tracking-wider font-clean"
                    style={{ color: project.color, background: project.color + '20' }}
                >
                    {project.status}
                </span>
            </div>
        );

        return papers;
    };

    return (
        <div
            className="absolute flex flex-col items-center select-none"
            style={{
                width: `${cardWidth}px`,
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
            }}
        >
            <motion.div
                style={{
                    opacity,
                    scale,
                    pointerEvents,
                }}
                className="w-full transition-shadow duration-300"
                onClick={() => {
                    if (!isFront) {
                        onSnapTo(index);
                    }
                }}
            >
                {/* ─── Solid Opaque Dossier Card ─── */}
                <div
                    className={`w-full rounded-2xl border-2 border-[var(--ink-black)] bg-[var(--card-bg)] transition-all duration-300 flex flex-col ${
                        isFront
                            ? 'shadow-[10px_10px_0px_0px_var(--shadow-color)] ring-2 ring-[var(--ink-black)]/10'
                            : 'shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:shadow-[6px_6px_0px_0px_var(--shadow-color)] cursor-pointer'
                    }`}
                >
                    {/* Window Header */}
                    <div className="flex items-center justify-between px-3.5 py-2 bg-[var(--card-bg)] border-b-2 border-[var(--ink-black)]/15 rounded-t-2xl">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] border border-[#1aab29]" />
                        </div>
                        <span className="text-[9.5px] font-bold tracking-widest uppercase text-ink/50 font-clean">
                            BUILD // 0{(index % 4) + 1}
                        </span>
                        <div className="flex items-center gap-1">
                            {isFront && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            )}
                            <span
                                className="text-[8.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md font-clean"
                                style={{ color: project.color, background: project.color + '18' }}
                            >
                                {project.status}
                            </span>
                        </div>
                    </div>

                    {/* Folder Showcase Stage */}
                    <div className="py-3 px-3 flex flex-col items-center justify-center bg-[var(--bg-paper)] border-b-2 border-[var(--ink-black)]/10 relative">
                        <Folder
                            color={project.color}
                            size={1.15}
                            items={buildFolderItems()}
                            className="relative z-10"
                        />

                        <span className="text-[9.5px] font-sketch text-ink/45 mt-2 flex items-center gap-1">
                            <Sparkles size={10} className="text-ink/30" />
                            Click folder to inspect
                        </span>
                    </div>

                    {/* Card Content & Action Strip */}
                    <div className="p-4 flex flex-col justify-between text-center bg-[var(--card-bg)] flex-1 rounded-b-2xl">
                        <div>
                            <div className="text-[9.5px] font-bold text-ink/40 mb-0.5 uppercase tracking-widest font-sketch">
                                {project.category}
                            </div>
                            <h3 className="text-lg font-bold text-ink mb-1.5 font-clean tracking-tight">
                                {project.title}
                            </h3>
                            <p className="text-ink/70 text-xs line-clamp-2 mb-3 leading-relaxed font-clean px-1">
                                {project.tagline || project.description}
                            </p>

                            {/* Tech Stack Pills */}
                            <div className="flex flex-wrap gap-1 justify-center mb-3.5">
                                {project.tech.slice(0, 3).map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-0.5 text-[9.5px] font-bold font-clean border border-[var(--ink-black)]/20 rounded-full text-ink/70 hover:bg-[var(--ink-black)] hover:text-[var(--bg-paper)] transition-colors cursor-default"
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {project.tech.length > 3 && (
                                    <span className="px-1.5 py-0.5 text-[9px] font-bold font-clean text-ink/40">
                                        +{project.tech.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-center gap-2 pt-2 border-t border-[var(--ink-black)]/10">
                            <Link
                                to={`/work/${project.slug}`}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[var(--ink-black)] text-[var(--bg-paper)] font-bold font-clean tracking-tight text-xs rounded-full hover:bg-transparent hover:text-[var(--ink-black)] border-2 border-[var(--ink-black)] transition-all duration-300"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Read Build <ArrowRight size={12} />
                            </Link>
                            {project.url && (
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center p-1.5 font-bold rounded-full border-2 border-[var(--ink-black)]/20 text-ink hover:border-[var(--ink-black)] transition-all duration-300"
                                    title="Visit Live Site"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink size={13} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
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

    // Default to 'wide' for an immediately zoomed-out, spacious view!
    const [zoom, setZoom] = useState<ZoomPreset>('wide');

    // 8 cylinder faces (duplicate the 4 folder projects across 8 faces for dense 360° circularity)
    const cards = projects.length === 4 ? [...projects, ...projects] : projects;
    const faceCount = cards.length;
    const angleStep = 360 / faceCount;

    // Card width tuned for clean aspect ratio
    const cardWidth = isScreenSm ? 260 : isScreenMd ? 285 : 310;

    // Radius tuned so cards curve cleanly with natural 3D depth
    const radius = isScreenSm ? 420 : isScreenMd ? 480 : 540;

    // Zoom level scale factors (addressing "more and more zoomed out")
    const zoomScale = zoom === 'panoramic' ? 0.72 : zoom === 'wide' ? 0.85 : 1.0;

    const rotation = useMotionValue(0);
    const transform = useTransform(rotation, (val: number) => `rotate3d(0, 1, 0, ${val}deg)`);

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

                {/* Zoom Level Switcher ("more and more zoomed out") */}
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
                className="relative h-[700px] md:h-[750px] w-full overflow-visible flex items-center justify-center cursor-grab active:cursor-grabbing"
                style={{
                    perspective: isScreenSm ? '1500px' : '2000px',
                    perspectiveOrigin: '50% 50%',
                }}
            >
                {/* Ambient ground reflection shadow beneath the cylinder */}
                <div
                    className="absolute bottom-6 w-[600px] md:w-[850px] h-20 rounded-[100%] pointer-events-none opacity-40 blur-xl"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)',
                    }}
                />



                {/* 3D Cylinder Rotor with Smooth Zoom Scaling */}
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0}
                    dragMomentum={false}
                    animate={{ scale: zoomScale }}
                    transition={{ type: 'spring', stiffness: 180, damping: 25 }}
                    onDragStart={() => {
                        setIsDragging(true);
                        dragStartRotation.current = rotation.get();
                    }}
                    onDrag={(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                        // Proportional rotation: moving across the viewport rotates smoothly
                        const deltaAngle = (info.offset.x / (radius * 2)) * 120;
                        rotation.set(dragStartRotation.current + deltaAngle);
                    }}
                    onDragEnd={(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                        setIsDragging(false);
                        const current = rotation.get();
                        // Inertia from drag velocity
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
                                index={i}
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
