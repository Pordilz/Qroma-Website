import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Sparkles } from 'lucide-react';
import { type Project } from '../data/projects';

interface SvgFolderProps {
    project: Project;
    index?: number;
    color?: string;
    isOpen?: boolean;
    onToggleOpen?: () => void;
    onSelectImage?: (src: string, alt: string) => void;
    className?: string;
}

// Darken helper for folder back depth
const darkenColor = (hex: string, percent: number) => {
    let clean = hex.startsWith('#') ? hex.slice(1) : hex;
    if (clean.length === 3) {
        clean = clean.split('').map((c) => c + c).join('');
    }
    const num = parseInt(clean, 16);
    if (isNaN(num)) return '#222222';
    const r = Math.max(0, Math.min(255, Math.floor(((num >> 16) & 0xff) * (1 - percent))));
    const g = Math.max(0, Math.min(255, Math.floor(((num >> 8) & 0xff) * (1 - percent))));
    const b = Math.max(0, Math.min(255, Math.floor((num & 0xff) * (1 - percent))));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

export default function SvgFolder({
    project,
    index = 0,
    color = project.color || '#3b82f6',
    isOpen: controlledIsOpen,
    onToggleOpen,
    onSelectImage,
    className = '',
}: SvgFolderProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isControlled = controlledIsOpen !== undefined;
    const open = isControlled ? controlledIsOpen : internalOpen;

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onToggleOpen) {
            onToggleOpen();
        } else {
            setInternalOpen((prev) => !prev);
        }
    };

    const folderBackColor = darkenColor(color, 0.18);
    const folderTabColor = darkenColor(color, 0.09);
    const hasImage = project.images && project.images.length > 0;
    const firstImage = hasImage ? project.images![0] : null;

    const IconComponent = project.icon;
    const tabCode = `0${(index % 8) + 1} // ${project.kind.toUpperCase().slice(0, 5)}`;

    return (
        <div
            className={`relative flex flex-col items-center justify-center select-none cursor-pointer group ${className}`}
            onClick={handleToggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="button"
            tabIndex={0}
            aria-label={`Open folder for ${project.title}`}
        >
            <div className="relative w-[210px] h-[155px] flex items-center justify-center mt-3">
                {/* ─── Paper Sheet 3: Tech Specs Blueprint (Back Paper) ─── */}
                <motion.div
                    animate={
                        open
                            ? { x: -44, y: -38, rotate: -12, scale: 1 }
                            : isHovered
                            ? { x: -18, y: -14, rotate: -5, scale: 0.98 }
                            : { x: 0, y: 0, rotate: -2, scale: 0.95 }
                    }
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="absolute w-[140px] h-[95px] rounded-lg border-2 border-[var(--ink-black)] bg-[#f7f4ee] p-2 flex flex-col justify-between shadow-md overflow-hidden z-10"
                    style={{
                        transformOrigin: 'bottom center',
                    }}
                >
                    <div className="flex items-center justify-between border-b border-[var(--ink-black)]/15 pb-1">
                        <span className="text-[7.5px] font-bold uppercase tracking-wider text-ink/50 font-clean">
                            SPEC // {project.year}
                        </span>
                        <span
                            className="text-[7px] font-bold font-clean px-1 py-0.2 rounded"
                            style={{ background: color + '22', color }}
                        >
                            {project.category}
                        </span>
                    </div>

                    <div className="space-y-0.5 my-auto">
                        {project.tech.slice(0, 3).map((t) => (
                            <div key={t} className="text-[8px] font-semibold text-ink/80 font-clean flex items-center gap-1 truncate">
                                <span className="w-1 h-1 rounded-full" style={{ background: color }} />
                                {t}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-0.5 border-t border-[var(--ink-black)]/10 text-[6.5px] text-ink/40 font-sketch">
                        <span>QROMA-SYS</span>
                        <span className="uppercase font-mono">{project.id}</span>
                    </div>
                </motion.div>

                {/* ─── Paper Sheet 2: Status & Verification Seal (Middle Paper) ─── */}
                <motion.div
                    animate={
                        open
                            ? { x: 44, y: -38, rotate: 12, scale: 1 }
                            : isHovered
                            ? { x: 18, y: -14, rotate: 5, scale: 0.98 }
                            : { x: 0, y: 0, rotate: 2, scale: 0.95 }
                    }
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="absolute w-[135px] h-[95px] rounded-lg border-2 border-[var(--ink-black)] bg-[#ffffff] p-2 flex flex-col items-center justify-center text-center shadow-md overflow-hidden z-10"
                    style={{
                        transformOrigin: 'bottom center',
                    }}
                >
                    <div
                        className="w-7 h-7 rounded-full flex items-center justify-center mb-1 border-2"
                        style={{ borderColor: color + '50', background: color + '15' }}
                    >
                        <IconComponent size={14} style={{ color }} />
                    </div>
                    <span className="text-[8.5px] font-bold text-ink font-clean leading-tight truncate w-full px-1">
                        {project.title}
                    </span>
                    <div
                        className="mt-1 px-2 py-0.5 rounded-full text-[7.5px] font-bold uppercase tracking-wider font-clean border"
                        style={{
                            color,
                            borderColor: color + '40',
                            background: color + '15',
                        }}
                    >
                        {project.status}
                    </div>
                </motion.div>

                {/* ─── Paper Sheet 1: Main Preview / Dossier Front (Top Paper) ─── */}
                <motion.div
                    animate={
                        open
                            ? { x: 0, y: -48, rotate: 0, scale: 1.04 }
                            : isHovered
                            ? { x: 0, y: -18, rotate: 0, scale: 1 }
                            : { x: 0, y: 0, rotate: 0, scale: 0.96 }
                    }
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="absolute w-[150px] h-[100px] rounded-lg border-2 border-[var(--ink-black)] bg-white shadow-lg overflow-hidden z-15 group/topPaper"
                    style={{
                        transformOrigin: 'bottom center',
                    }}
                    onClick={(e) => {
                        if (hasImage && onSelectImage && open) {
                            e.stopPropagation();
                            onSelectImage(firstImage!.src, firstImage!.alt);
                        } else {
                            handleToggle(e);
                        }
                    }}
                >
                    {hasImage ? (
                        <div className="relative w-full h-full bg-[#f0eee9]">
                            <img
                                src={firstImage!.src}
                                alt={firstImage!.alt}
                                className="w-full h-full object-cover object-top"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/topPaper:opacity-100 transition-opacity flex items-center justify-center text-white text-[9px] font-bold font-clean gap-1">
                                <Maximize2 size={11} /> Expand Preview
                            </div>
                            <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[6.5px] font-bold uppercase font-clean">
                                Visual
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full bg-[#fbf9f4] p-2 flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-[var(--ink-black)]/10 pb-0.5">
                                <span className="text-[7px] font-mono uppercase text-ink/40">ARCHIVE // {project.slug}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            <div className="my-auto text-center px-1">
                                <div className="inline-flex p-1.5 rounded-lg border border-[var(--ink-black)]/15 mb-1" style={{ background: color + '15' }}>
                                    <IconComponent size={14} style={{ color }} />
                                </div>
                                <div className="text-[8px] font-bold text-ink font-clean truncate">{project.title}</div>
                                <div className="text-[6.5px] text-ink/50 font-sketch line-clamp-1">{project.tagline}</div>
                            </div>
                            <div className="flex items-center justify-between text-[6.5px] font-clean text-ink/40 border-t border-[var(--ink-black)]/10 pt-0.5">
                                <span>TYPE: {project.kind.toUpperCase()}</span>
                                <span style={{ color }}>{project.status}</span>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* ─── Ultra-Sharp SVG Folder Body (Back, Lip, & Front Flap) ─── */}
                <div className="relative w-[190px] h-[130px] z-20">
                    <svg
                        viewBox="0 0 200 145"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.12)]"
                        style={{
                            shapeRendering: 'geometricPrecision',
                        }}
                    >
                        {/* Definitions for Gradients */}
                        <defs>
                            <linearGradient id={`folderGradBack-${project.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={folderTabColor} />
                                <stop offset="100%" stopColor={folderBackColor} />
                            </linearGradient>

                            <linearGradient id={`folderGradFront-${project.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={color} />
                                <stop offset="100%" stopColor={folderBackColor} />
                            </linearGradient>

                            <linearGradient id={`folderLipGloss-${project.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
                                <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
                            </linearGradient>
                        </defs>

                        {/* 1. Folder Back Plate with Stepped Index Tab */}
                        <path
                            d="
                                M 14,24 
                                L 74,24 
                                Q 80,24 84,32 
                                L 90,40 
                                L 186,40 
                                Q 192,40 192,46 
                                L 192,136 
                                Q 192,142 186,142 
                                L 14,142 
                                Q 8,142 8,136 
                                L 8,30 
                                Q 8,24 14,24 
                                Z
                            "
                            fill={`url(#folderGradBack-${project.id})`}
                            stroke="var(--ink-black, #121212)"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                        />

                        {/* Stepped Tab Label in Crisp Vector Monospace */}
                        <text
                            x="18"
                            y="34.5"
                            fontSize="7.5"
                            fontWeight="800"
                            fill="#ffffff"
                            letterSpacing="0.6"
                            fontFamily="monospace"
                            className="select-none pointer-events-none"
                            opacity="0.95"
                        >
                            {tabCode}
                        </text>

                        {/* Subtle decorative dot on folder tab */}
                        <circle cx="70" cy="32" r="1.5" fill="#ffffff" opacity="0.8" />
                    </svg>

                    {/* 2. Interactive Front Flap (Rotates down when opened) */}
                    <motion.div
                        className="absolute inset-0 origin-bottom"
                        animate={
                            open
                                ? { rotateX: -42, y: 14 }
                                : isHovered
                                ? { rotateX: -14, y: 4 }
                                : { rotateX: 0, y: 0 }
                        }
                        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                        style={{
                            transformStyle: 'preserve-3d',
                            perspective: 800,
                        }}
                    >
                        <svg
                            viewBox="0 0 200 145"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full"
                            style={{
                                shapeRendering: 'geometricPrecision',
                            }}
                        >
                            {/* Front Flap Body */}
                            <path
                                d="
                                    M 8,50 
                                    Q 100,45 192,50 
                                    Q 193,52 193,56
                                    L 193,136 
                                    Q 193,142 186,142 
                                    L 14,142 
                                    Q 8,142 8,136 
                                    L 8,50 
                                    Z
                                "
                                fill={`url(#folderGradFront-${project.id})`}
                                stroke="var(--ink-black, #121212)"
                                strokeWidth="2.5"
                                strokeLinejoin="round"
                            />

                            {/* Top Edge Gloss Highlight */}
                            <path
                                d="
                                    M 10,51 
                                    Q 100,46 190,51 
                                    L 190,55 
                                    Q 100,50 10,55 
                                    Z
                                "
                                fill={`url(#folderLipGloss-${project.id})`}
                            />

                            {/* Debossed Center Plate with Project Emblem */}
                            <rect
                                x="72"
                                y="72"
                                width="56"
                                height="42"
                                rx="8"
                                fill="var(--ink-black, #121212)"
                                fillOpacity="0.12"
                                stroke="var(--ink-black, #121212)"
                                strokeWidth="1.2"
                                strokeDasharray="3 2"
                            />

                            {/* White Technical Label Sticker */}
                            <rect
                                x="20"
                                y="112"
                                width="58"
                                height="18"
                                rx="3"
                                fill="#ffffff"
                                stroke="var(--ink-black, #121212)"
                                strokeWidth="1.2"
                            />
                            {/* Barcode lines */}
                            <line x1="25" y1="116" x2="25" y2="126" stroke="#121212" strokeWidth="1.5" />
                            <line x1="28" y1="116" x2="28" y2="126" stroke="#121212" strokeWidth="0.8" />
                            <line x1="31" y1="116" x2="31" y2="126" stroke="#121212" strokeWidth="2" />
                            <line x1="35" y1="116" x2="35" y2="126" stroke="#121212" strokeWidth="1" />
                            <line x1="38" y1="116" x2="38" y2="126" stroke="#121212" strokeWidth="1.8" />
                            <line x1="42" y1="116" x2="42" y2="126" stroke="#121212" strokeWidth="0.8" />
                            <text
                                x="46"
                                y="125"
                                fontSize="6.5"
                                fontWeight="800"
                                fill="#121212"
                                fontFamily="monospace"
                            >
                                {project.year}
                            </text>

                            {/* Project Stamp on Flap Right */}
                            <circle
                                cx="160"
                                cy="95"
                                r="16"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                                strokeDasharray="4 2"
                                opacity="0.45"
                            />
                            <text
                                x="160"
                                y="93"
                                fontSize="5.5"
                                fontWeight="900"
                                fill="#ffffff"
                                textAnchor="middle"
                                fontFamily="sans-serif"
                                letterSpacing="0.8"
                                opacity="0.75"
                            >
                                QROMA
                            </text>
                            <text
                                x="160"
                                y="100"
                                fontSize="4.5"
                                fontWeight="800"
                                fill="#ffffff"
                                textAnchor="middle"
                                fontFamily="sans-serif"
                                opacity="0.65"
                            >
                                VERIFIED
                            </text>
                        </svg>

                        {/* Center Icon Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-4">
                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-[1px] border border-white/40 flex items-center justify-center shadow-inner">
                                <IconComponent size={16} className="text-white drop-shadow" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Micro Caption */}
            <div className="mt-2 text-[9.5px] font-sketch text-ink/50 flex items-center gap-1 group-hover:text-ink/80 transition-colors">
                <Sparkles size={10} className="text-ink/40 group-hover:text-amber-500 transition-colors" />
                <span>{open ? 'Click to close dossier' : 'Click folder to peek'}</span>
            </div>
        </div>
    );
}
