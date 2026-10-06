import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import SvgFolder from './SvgFolder';
import { type Project } from '../data/projects';

interface SvgProjectCardProps {
    project: Project;
    index?: number;
    isCylinderCard?: boolean;
    isFront?: boolean;
    onSelectImage?: (src: string, alt: string) => void;
    className?: string;
}

export default function SvgProjectCard({
    project,
    index = 0,
    isCylinderCard = false,
    isFront = true,
    onSelectImage,
    className = '',
}: SvgProjectCardProps) {
    const [folderOpen, setFolderOpen] = useState(false);

    const buildNumber = String(index + 1).padStart(2, '0');

    return (
        <div
            className={`w-full rounded-2xl border-2 border-[var(--ink-black)] bg-[var(--card-bg)] transition-all duration-300 flex flex-col overflow-hidden ${
                isCylinderCard
                    ? isFront
                        ? 'shadow-[10px_10px_0px_0px_var(--shadow-color)]'
                        : 'shadow-[5px_5px_0px_0px_var(--shadow-color)] hover:shadow-[7px_7px_0px_0px_var(--shadow-color)]'
                    : 'shadow-[6px_6px_0px_0px_var(--shadow-color)] hover:shadow-[10px_10px_0px_0px_var(--shadow-color)] hover:-translate-y-1'
            } ${className}`}
            style={{
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'geometricPrecision',
            }}
        >
            {/* ─── Window Title Bar ─── */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--card-bg)] border-b-2 border-[var(--ink-black)]/15 select-none">
                {/* Traffic Light Dots */}
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] border border-[#1aab29] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]" />
                </div>

                {/* Build / Spec Label */}
                <span className="text-[10px] font-bold tracking-widest uppercase text-ink/60 font-clean">
                    BUILD // {buildNumber}
                </span>

                {/* Live Status Pill with Pulsing Dot */}
                <div className="flex items-center gap-1">
                    <span
                        className="inline-flex items-center gap-1 text-[8.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md font-clean border"
                        style={{
                            color: project.color,
                            borderColor: project.color + '40',
                            background: project.color + '18',
                        }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ background: project.color }}
                        />
                        {project.status}
                    </span>
                </div>
            </div>

            {/* ─── Interactive SVG Folder Stage (Spacious to prevent paper clip) ─── */}
            <div className="pt-6 pb-3 px-3 min-h-[195px] flex flex-col items-center justify-center bg-[var(--bg-paper)] border-b-2 border-[var(--ink-black)]/12 relative overflow-hidden">
                <SvgFolder
                    project={project}
                    index={index}
                    color={project.color}
                    isOpen={folderOpen}
                    onToggleOpen={() => setFolderOpen((prev) => !prev)}
                    onSelectImage={onSelectImage}
                />
            </div>

            {/* ─── Card Info & Actions Strip ─── */}
            <div className="p-4 flex flex-col justify-between text-center bg-[var(--card-bg)] flex-1">
                <div>
                    <div className="text-[10px] font-bold text-ink/40 mb-1 uppercase tracking-widest font-sketch">
                        {project.category} · {project.year}
                    </div>
                    <h3 className="text-lg font-bold text-ink mb-1.5 font-clean tracking-tight">
                        {project.title}
                    </h3>
                    <p className="text-ink/75 text-xs line-clamp-2 mb-3.5 leading-relaxed font-clean px-1">
                        {project.tagline || project.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                        {project.tech.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-0.5 text-[9.5px] font-bold font-clean border border-[var(--ink-black)]/25 rounded-full text-ink/75 hover:bg-[var(--ink-black)] hover:text-[var(--bg-paper)] transition-colors cursor-default"
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
                <div className="flex items-center justify-center gap-2 pt-2.5 border-t border-[var(--ink-black)]/10">
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
                            className="inline-flex items-center justify-center p-1.5 font-bold rounded-full border-2 border-[var(--ink-black)]/25 text-ink hover:border-[var(--ink-black)] hover:bg-[var(--ink-black)] hover:text-[var(--bg-paper)] transition-all duration-300"
                            title="Visit Live Site"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ExternalLink size={13} />
                        </a>
                    )}

                    {project.repo && (
                        <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-1.5 font-bold rounded-full border-2 border-[var(--ink-black)]/25 text-ink hover:border-[var(--ink-black)] hover:bg-[var(--ink-black)] hover:text-[var(--bg-paper)] transition-all duration-300"
                            title="View Source Repository"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Github size={13} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
