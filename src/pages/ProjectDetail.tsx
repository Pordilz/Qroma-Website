import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Calendar, Tag, Wrench } from 'lucide-react';
import SEO from '../components/SEO';
import { projects, getProjectBySlug, kindLabels } from '../data/projects';

export default function ProjectDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [lightbox, setLightbox] = useState<string | null>(null);

    const project = slug ? getProjectBySlug(slug) : undefined;

    if (!project) {
        return <Navigate to="/work" replace />;
    }

    const Icon = project.icon;
    const index = projects.findIndex((p) => p.id === project.id);
    const next = projects[(index + 1) % projects.length];

    return (
        <div className="min-h-screen bg-[var(--bg-paper)] pt-32 pb-16 px-6 md:px-8">
            <SEO
                title={`${project.title} — ${project.category} | Qroma`}
                description={project.tagline + ' ' + project.description}
                canonical={`https://www.qroma.digital/work/${project.slug}`}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                {/* Back */}
                <Link
                    to="/work"
                    className="inline-flex items-center gap-2 text-sm text-ink/40 hover:text-ink transition-colors font-clean group mb-8 font-bold tracking-tight"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Work
                </Link>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg"
                        style={{ color: project.color, background: project.color + '15' }}
                    >
                        <Tag className="w-3 h-3" />
                        {project.category}
                    </span>
                    <span className="text-xs text-ink/40 flex items-center gap-1 font-clean">
                        <Calendar className="w-3 h-3" />
                        {project.year}
                    </span>
                    <span className="text-xs text-ink/40 flex items-center gap-1 font-clean">
                        <Wrench className="w-3 h-3" />
                        {kindLabels[project.kind]} · {project.status}
                    </span>
                </div>

                {/* Title */}
                <div className="flex items-start gap-5 mb-6">
                    <div
                        className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 hidden sm:flex"
                        style={{ borderColor: project.color + '40', background: project.color + '12' }}
                    >
                        <Icon size={30} style={{ color: project.color }} />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-clean tracking-tighter text-ink leading-tight mb-3">
                            {project.title}
                        </h1>
                        <p className="text-xl text-ink/60 font-sketch">{project.tagline}</p>
                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap items-center gap-3 mb-10">
                    {project.url && (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ink-black)] text-[var(--bg-paper)] font-bold font-clean tracking-tighter rounded-full hover:bg-transparent hover:text-[var(--ink-black)] border-2 border-[var(--ink-black)] transition-all duration-300"
                        >
                            Visit Live <ExternalLink size={16} />
                        </a>
                    )}
                    {project.repo && (
                        <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 font-bold font-clean tracking-tighter rounded-full border-2 border-[var(--ink-black)]/20 text-ink hover:border-[var(--ink-black)] transition-all duration-300"
                        >
                            View Source <Github size={16} />
                        </a>
                    )}
                    {!project.url && !project.repo && (
                        <span className="text-sm text-ink/40 font-clean italic">
                            Internal build — not publicly available.
                        </span>
                    )}
                </div>

                {/* Hero screenshot in a window frame */}
                {project.images?.[0] && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="rounded-2xl border-2 border-[var(--ink-black)] shadow-[8px_8px_0px_0px_var(--shadow-color)] overflow-hidden bg-[var(--card-bg)] mb-12"
                    >
                        <div className="flex items-center justify-between px-5 py-3 border-b-2 border-[var(--ink-black)]/10">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                                <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
                            </div>
                            <span className="text-xs font-bold tracking-wider uppercase text-ink/50 font-clean">
                                {project.url ? project.url.replace(/^https?:\/\//, '') : project.title}
                            </span>
                            <div className="w-16" />
                        </div>
                        <button
                            type="button"
                            onClick={() => setLightbox(project.images![0].src)}
                            className="block w-full bg-white cursor-zoom-in"
                            aria-label={`Enlarge ${project.images[0].alt}`}
                        >
                            <img
                                src={project.images[0].src}
                                alt={project.images[0].alt}
                                className="w-full object-cover object-top"
                            />
                        </button>
                    </motion.div>
                )}

                {/* Highlights strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
                    {project.highlights.map((highlight, i) => (
                        <motion.div
                            key={highlight.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="p-5 rounded-xl border-2 border-[var(--ink-black)] bg-[var(--card-bg)] text-center"
                        >
                            <div className="text-[10px] font-bold text-ink/40 uppercase tracking-[0.15em] font-clean mb-2">
                                {highlight.label}
                            </div>
                            <div className="text-xl font-bold font-clean tracking-tighter text-ink">
                                {highlight.value}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* The problem */}
                <section className="mb-14">
                    <h2 className="text-2xl md:text-3xl font-bold font-clean tracking-tight text-ink mb-4">
                        The Problem
                    </h2>
                    <p className="text-ink/75 font-clean text-[17px] md:text-lg leading-relaxed">
                        {project.problem}
                    </p>
                </section>

                {/* What we built */}
                <section className="mb-14">
                    <h2 className="text-2xl md:text-3xl font-bold font-clean tracking-tight text-ink mb-4">
                        What We Built
                    </h2>
                    <p className="text-ink/75 font-clean text-[17px] md:text-lg leading-relaxed mb-8">
                        {project.description}
                    </p>

                    <h3 className="text-[10px] font-bold text-ink/40 uppercase tracking-[0.15em] font-clean mb-4">
                        Decisions that mattered
                    </h3>
                    <ul className="space-y-3">
                        {project.approach.map((point, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-4 p-4 rounded-lg border-2 border-[var(--ink-black)]/10 bg-[var(--card-bg)] hover:border-[var(--ink-black)]/30 hover:translate-x-1 transition-all duration-300"
                            >
                                <div
                                    className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0"
                                    style={{ background: project.color }}
                                />
                                <span className="text-ink/75 font-clean leading-relaxed">{point}</span>
                            </motion.li>
                        ))}
                    </ul>
                </section>

                {/* Extra imagery */}
                {project.images && project.images.length > 1 && (
                    <section className="mb-14">
                        <h2 className="text-2xl md:text-3xl font-bold font-clean tracking-tight text-ink mb-6">
                            Inside
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {project.images.slice(1).map((image) => (
                                <button
                                    key={image.src}
                                    type="button"
                                    onClick={() => setLightbox(image.src)}
                                    className="group rounded-xl border-2 border-[var(--ink-black)] overflow-hidden bg-white hover:shadow-[6px_6px_0px_0px_var(--shadow-color)] transition-all duration-300 cursor-zoom-in"
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-64 object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="px-4 py-2.5 bg-[var(--card-bg)] border-t-2 border-[var(--ink-black)] text-left">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50 font-clean">
                                            {image.label}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* Stack */}
                <section className="mb-14">
                    <h2 className="text-2xl md:text-3xl font-bold font-clean tracking-tight text-ink mb-6">
                        The Stack
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                            <span
                                key={tech}
                                className="px-4 py-2 text-sm font-bold font-clean border-2 border-[var(--ink-black)] rounded-full hover:bg-[var(--ink-black)] hover:text-[var(--bg-paper)] transition-all duration-300 cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Next project */}
                <div className="border-t-2 border-[var(--ink-black)]/10 pt-10">
                    <div className="text-[10px] font-bold text-ink/40 uppercase tracking-[0.15em] font-clean mb-3">
                        Next
                    </div>
                    <Link
                        to={`/work/${next.slug}`}
                        className="group flex items-center justify-between gap-4 p-6 rounded-xl border-2 border-[var(--ink-black)]/10 hover:border-[var(--ink-black)] bg-[var(--card-bg)] hover:shadow-[6px_6px_0px_0px_var(--shadow-color)] transition-all duration-300"
                    >
                        <div className="min-w-0">
                            <div className="text-2xl font-bold font-clean tracking-tighter text-ink mb-1">
                                {next.title}
                            </div>
                            <div className="text-sm text-ink/50 font-clean truncate">{next.tagline}</div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-ink flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* CTA */}
                <div className="border-t-2 border-[var(--ink-black)]/10 pt-10 mt-10">
                    <h3 className="text-2xl font-bold font-clean text-ink mb-4 tracking-tighter">
                        Got something like this in mind?
                    </h3>
                    <p className="text-ink/60 font-clean mb-6">
                        We take on a small number of builds at a time. If you have a product, a platform or a problem
                        that needs engineering, tell us about it.
                    </p>
                    <Link
                        to="/#contact"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--ink-black)] text-[var(--bg-paper)] rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-transparent hover:text-[var(--ink-black)] border-2 border-[var(--ink-black)] transition-all duration-300"
                    >
                        Start a Conversation
                    </Link>
                </div>
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4 cursor-pointer"
                    >
                        <motion.img
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            src={lightbox}
                            alt="Preview"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg border-2 border-white/20 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            onClick={() => setLightbox(null)}
                            aria-label="Close preview"
                            className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
