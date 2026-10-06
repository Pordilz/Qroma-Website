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

// ─── 3D Cylinder Carousel Card Face ──────────────────────────────────────────
interface CylinderCardProps {
    project: Project;
    index: number;
    faceWidth: number;
    angle: number;
    radius: number;
    isFront: boolean;
    onSelectImage: (src: string, alt: string) => void;
    onSnapTo: (index: number) => void;
}

const CylinderCard = memo(function CylinderCard({
    project,
    index,
    faceWidth,
    angle,
    radius,
    isFront,
    onSelectImage,
    onSnapTo,
}: CylinderCardProps) {
    const Icon = project.icon;

    // Papers inside the folder: screenshots, stack sheet, status sheet
    const buildFolderItems = () => {
        const papers: React.ReactNode[] = [];

        (project.images ?? []).slice(0, 3).forEach((image) => {
            papers.push(
                <div
                    key={image.src}
                    className="w-full h-full bg-white border-2 border-[var(--ink-black)] overflow-hidden relative cursor-pointer group/paper"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelectImage(image.src, image.alt);
                    }}
                >
                    <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white opacity-0 group-hover/paper:opacity-100 transition-opacity">
                        <span className="text-[9px] font-bold uppercase tracking-wider font-clean flex items-center gap-1">
                            <Maximize2 size={10} /> {image.label}
                        </span>
                    </div>
                </div>
            );
        });

        if (papers.length < 3) {
            papers.push(
                <div
                    key="stack"
                    className="w-full h-full bg-[var(--card-bg)] flex flex-col items-center justify-center p-2 border-2 border-[var(--ink-black)]"
                >
                    <div className="text-center leading-tight">
                        {project.tech.slice(0, 4).map((tech) => (
                            <div key={tech} className="text-[8px] font-bold text-ink/80 font-clean">{tech}</div>
                        ))}
                    </div>
                </div>
            );
        }

        if (papers.length < 3) {
            papers.push(
                <div
                    key="cta"
                    className="w-full h-full bg-[var(--card-bg)] flex flex-col items-center justify-center p-2 border-2 border-[var(--ink-black)]"
                >
                    <Icon size={18} color={project.color} strokeWidth={2} />
                    <span className="text-[8px] font-bold text-ink mt-1 font-clean">{project.status}</span>
                </div>
            );
        }

        return papers;
    };

    return (
        <motion.div
            className="absolute top-0 flex flex-col items-center justify-between select-none"
            style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
            }}
            onClick={() => {
                if (!isFront) {
                    onSnapTo(index);
                }
            }}
        >
            {/* Dossier Card Container */}
            <div
                className={`w-full rounded-2xl border-2 border-[var(--ink-black)] bg-[var(--card-bg)] transition-all duration-300 flex flex-col overflow-hidden ${
                    isFront
                        ? 'shadow-[8px_8px_0px_0px_var(--shadow-color)] ring-2 ring-[var(--ink-black)]/10 scale-100 opacity-100'
                        : 'shadow-[4px_4px_0px_0px_var(--shadow-color)] opacity-70 hover:opacity-90 scale-95 cursor-pointer'
                }`}
            >
                {/* Dossier Window Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--card-bg)] border-b-2 border-[var(--ink-black)]/10">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] border border-[#1aab29]" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-ink/40 font-clean">
                        BUILD // 0{(index % 4) + 1}
                    </span>
                    <span
                        className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md font-clean"
                        style={{ color: project.color, background: project.color + '18' }}
                    >
                        {project.status}
                    </span>
                </div>

                {/* Folder Stage */}
                <div className="py-6 px-4 flex flex-col items-center justify-center bg-[var(--bg-paper)]/50 border-b-2 border-[var(--ink-black)]/10 relative overflow-hidden">
                    {/* Subtle sketch pattern in background */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                    <Folder
                        color={project.color}
                        size={2.1}
                        items={buildFolderItems()}
                        className="relative z-10"
                    />

                    <span className="text-[10px] font-sketch text-ink/40 mt-3 flex items-center gap-1">
                        <Sparkles size={11} className="text-ink/30" />
                        Click tab to peek inside
                    </span>
                </div>

                {/* Dossier Details Panel */}
                <div className="p-5 flex flex-col flex-1 justify-between text-center bg-[var(--card-bg)]">
                    <div>
                        <div className="text-[10px] font-bold text-ink/40 mb-1 uppercase tracking-widest font-sketch">
                            {project.category}
                        </div>
                        <h3 className="text-xl font-bold text-ink mb-2 font-clean tracking-tight">
                            {project.title}
                        </h3>
                        <p className="text-ink/65 text-xs line-clamp-2 mb-4 leading-relaxed font-clean">
                            {project.description}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                            {project.tech.slice(0, 3).map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2.5 py-0.5 text-[10px] font-bold font-clean border border-[var(--ink-black)]/20 rounded-full text-ink/70 hover:bg-[var(--ink-black)] hover:text-[var(--bg-paper)] transition-colors cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.tech.length > 3 && (
                                <span className="px-2 py-0.5 text-[9px] font-bold font-clean text-ink/40">
                                    +{project.tech.length - 3}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-center gap-2 pt-2 border-t border-[var(--ink-black)]/10">
                        <Link
                            to={`/work/${project.slug}`}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[var(--ink-black)] text-[var(--bg-paper)] font-bold font-clean tracking-tight text-xs rounded-full hover:bg-transparent hover:text-[var(--ink-black)] border-2 border-[var(--ink-black)] transition-all duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Read Build <ArrowRight size={13} />
                        </Link>
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center p-2 font-bold rounded-full border-2 border-[var(--ink-black)]/20 text-ink hover:border-[var(--ink-black)] transition-all duration-300"
                                title="Visit Live Site"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={14} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

// ─── Main Folder Carousel 3D Component ───────────────────────────────────────
interface FolderCarousel3DProps {
    projects: Project[];
}

export default function FolderCarousel3D({ projects }: FolderCarousel3DProps) {
    const isScreenSm = useMediaQuery('(max-width: 640px)');
    const isScreenMd = useMediaQuery('(max-width: 1024px)');

    // 8 cylinder faces (duplicate the 4 folder projects across 8 faces for dense 360° circularity)
    const cards = projects.length === 4 ? [...projects, ...projects] : projects;
    const faceCount = cards.length;
    const angleStep = 360 / faceCount;

    // Dynamic cylinder sizing
    const cylinderWidth = isScreenSm ? 1800 : isScreenMd ? 2300 : 2700;
    const faceWidth = isScreenSm ? 220 : isScreenMd ? 275 : 320;
    const radius = Math.round(cylinderWidth / (2 * Math.PI));

    const rotation = useMotionValue(0);
    const transform = useTransform(rotation, (val: number) => `rotate3d(0, 1, 0, ${val}deg)`);

    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedLightbox, setSelectedLightbox] = useState<{ src: string; alt: string } | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const dragStartRotation = useRef(0);
    const carouselContainerRef = useRef<HTMLDivElement>(null);

    // Calculate which project is currently front-facing
    const updateActiveIndex = useCallback((currentRotation: number) => {
        // Normalizing angle: each card at angle i * angleStep
        // To be in front, card i needs (currentRotation + i * angleStep) % 360 == 0
        // i.e. i = round(-currentRotation / angleStep)
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

    // Snap smoothly to a specific target angle
    const snapToAngle = useCallback((targetAngle: number) => {
        animate(rotation, targetAngle, {
            type: 'spring',
            stiffness: 120,
            damping: 24,
            mass: 0.8,
        });
    }, [rotation]);

    // Snap to card index
    const snapToCard = useCallback((cardIndex: number) => {
        const currentRot = rotation.get();
        // find nearest multiple of angleStep that brings cardIndex to front
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

    return (
        <div className="relative w-full max-w-7xl mx-auto py-12 select-none">
            {/* Header / Instructions Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 px-4">
                <div className="flex items-center gap-2 text-xs font-bold font-clean uppercase tracking-widest text-ink/50 bg-[var(--card-bg)] px-4 py-2 rounded-full border-2 border-[var(--ink-black)]/10 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    3D Interactive Folder Dossier
                </div>

                <div className="flex items-center gap-2 text-xs text-ink/40 font-sketch">
                    <span>Drag horizontally or use arrows to spin</span>
                </div>
            </div>

            {/* ─── 3D Viewport ─── */}
            <div
                ref={carouselContainerRef}
                className="relative h-[530px] md:h-[560px] w-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
                style={{
                    perspective: '1200px',
                    perspectiveOrigin: '50% 50%',
                }}
            >
                {/* 3D Cylinder Rotor */}
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
                        // Proportional rotation: moving across the cylinder spins it naturally
                        const deltaAngle = (info.offset.x / cylinderWidth) * 360 * 1.4;
                        rotation.set(dragStartRotation.current + deltaAngle);
                    }}
                    onDragEnd={(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                        setIsDragging(false);
                        const current = rotation.get();
                        // Add inertia from flick velocity
                        const projected = current + info.velocity.x * 0.12;
                        const nearestSnap = Math.round(projected / angleStep) * angleStep;
                        snapToAngle(nearestSnap);
                    }}
                    style={{
                        transform,
                        transformStyle: 'preserve-3d',
                        width: cylinderWidth,
                        height: '100%',
                    }}
                    className="relative flex items-center justify-center origin-center"
                >
                    {cards.map((project, i) => {
                        const cardAngle = i * angleStep;
                        // Determine if this face is roughly facing front (within 22.5 deg)
                        const relativeAngle = ((rotation.get() + cardAngle) % 360 + 360) % 360;
                        const isFacingFront = relativeAngle < 25 || relativeAngle > 335;

                        return (
                            <CylinderCard
                                key={`cylinder-card-${project.id}-${i}`}
                                project={project}
                                index={i}
                                faceWidth={faceWidth}
                                angle={cardAngle}
                                radius={radius}
                                isFront={isFacingFront && !isDragging}
                                onSelectImage={(src, alt) => setSelectedLightbox({ src, alt })}
                                onSnapTo={(idx) => snapToCard(idx)}
                            />
                        );
                    })}
                </motion.div>

                {/* Left navigation arrow */}
                <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous Folder"
                    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border-2 border-[var(--ink-black)] bg-[var(--bg-paper)] shadow-[3px_3px_0px_0px_var(--shadow-color)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center text-ink cursor-pointer active:scale-95"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Right navigation arrow */}
                <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next Folder"
                    className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border-2 border-[var(--ink-black)] bg-[var(--bg-paper)] shadow-[3px_3px_0px_0px_var(--shadow-color)] hover:shadow-none hover:-translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center text-ink cursor-pointer active:scale-95"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* ─── Bottom Folder Selector Controls ─── */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 px-4">
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
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: project.color }}
                            />
                            <span>{project.title}</span>
                            <span className="text-[10px] opacity-60 font-mono">0{idx + 1}</span>
                        </button>
                    );
                })}
            </div>

            {/* ─── Lightbox Fullscreen Modal ─── */}
            <AnimatePresence>
                {selectedLightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
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
                            <div className="p-2 bg-black flex items-center justify-center">
                                <img
                                    src={selectedLightbox.src}
                                    alt={selectedLightbox.alt}
                                    className="max-h-[80vh] w-auto object-contain rounded"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
