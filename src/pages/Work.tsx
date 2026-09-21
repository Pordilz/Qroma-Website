import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Folder, Search, LayoutGrid, List, ChevronRight, ArrowLeft,
    Briefcase, Package, Smartphone, Database, Server, Sunrise,
    FlaskConical, ExternalLink, Github, Tag,
} from 'lucide-react';

import { projects, labItems, kindLabels, type ProjectKind } from '../data/projects';

type Filter = 'All' | 'Client' | 'Product' | 'Mobile' | 'Data' | 'Infrastructure' | 'Internal' | 'Lab';

const filters: Filter[] = ['All', 'Client', 'Product', 'Mobile', 'Data', 'Infrastructure', 'Internal', 'Lab'];

const filterIcons: Record<Filter, typeof Folder> = {
    All: Folder,
    Client: Briefcase,
    Product: Package,
    Mobile: Smartphone,
    Data: Database,
    Infrastructure: Server,
    Internal: Sunrise,
    Lab: FlaskConical,
};

const kindForFilter: Record<Exclude<Filter, 'All' | 'Lab'>, ProjectKind> = {
    Client: 'client',
    Product: 'product',
    Mobile: 'mobile',
    Data: 'data',
    Infrastructure: 'infrastructure',
    Internal: 'internal',
};

export default function Work() {
    const [activeFilter, setActiveFilter] = useState<Filter>('All');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');

    const query = searchQuery.toLowerCase();

    const matchesSearch = (haystack: string[]) =>
        !query || haystack.some((value) => value.toLowerCase().includes(query));

    const visibleProjects = projects.filter((project) => {
        if (activeFilter === 'Lab') return false;
        const matchesFilter = activeFilter === 'All' || project.kind === kindForFilter[activeFilter];
        return matchesFilter && matchesSearch([project.title, project.tagline, project.description, ...project.tech]);
    });

    const visibleLab = labItems.filter((item) => {
        if (activeFilter !== 'All' && activeFilter !== 'Lab') return false;
        return matchesSearch([item.title, item.blurb, ...item.tech]);
    });

    const totalCount = visibleProjects.length + visibleLab.length;

    const countFor = (filter: Filter) => {
        if (filter === 'All') return projects.length + labItems.length;
        if (filter === 'Lab') return labItems.length;
        return projects.filter((p) => p.kind === kindForFilter[filter]).length;
    };

    return (
        <div className="min-h-screen bg-[var(--bg-paper)] pt-24 pb-16 px-4 md:px-8">
            {/* Back to home breadcrumb */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-7xl mx-auto mb-6"
            >
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-ink/40 hover:text-ink transition-colors font-clean group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
            </motion.div>

            {/* ===== Finder Window ===== */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-7xl mx-auto rounded-2xl border-2 border-[var(--ink-black)] shadow-[8px_8px_0px_0px_var(--shadow-color)] overflow-hidden bg-[var(--card-bg)]"
            >
                {/* ─── Title Bar ─── */}
                <div className="relative flex items-center justify-between px-5 py-3 bg-[var(--card-bg)] border-b-2 border-[var(--ink-black)]/10">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                        <Folder className="w-4 h-4 text-ink/40" />
                        <span className="text-sm font-bold tracking-wider uppercase text-ink/60 font-clean">
                            Work
                        </span>
                    </div>
                    <div className="w-16" />
                </div>

                {/* ─── Main Content Area ─── */}
                <div className="flex flex-col lg:flex-row min-h-[70vh]">
                    {/* ─── Sidebar ─── */}
                    <div className="lg:w-56 border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--ink-black)]/10 p-4 flex-shrink-0">
                        <p className="text-[10px] font-bold text-ink/30 uppercase tracking-[0.15em] mb-3 px-2 font-clean">
                            Categories
                        </p>
                        <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                            {filters.map((filter) => {
                                const Icon = filterIcons[filter];
                                const isActive = activeFilter === filter;
                                return (
                                    <motion.button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        whileTap={{ scale: 0.97 }}
                                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 font-clean ${isActive
                                            ? 'bg-[var(--ink-black)] text-[var(--bg-paper)] shadow-md'
                                            : 'text-ink/60 hover:bg-[var(--ink-black)]/5'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4 flex-shrink-0" />
                                        <span>{filter}</span>
                                        <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[var(--bg-paper)]/20' : 'bg-[var(--ink-black)]/5'
                                            }`}>
                                            {countFor(filter)}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ─── Content Panel ─── */}
                    <div className="flex-1 flex flex-col">
                        {/* ─── Toolbar ─── */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-5 py-3 border-b-2 border-[var(--ink-black)]/10">
                            <div className="flex items-center gap-1.5 text-sm text-ink/40 font-clean">
                                <span className="text-ink/60 font-medium">Work</span>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-ink font-semibold">{activeFilter}</span>
                                <span className="ml-2 text-[10px] text-ink/30">
                                    — {totalCount} {totalCount === 1 ? 'item' : 'items'}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="relative flex-1 sm:flex-none">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink/30" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search..."
                                        aria-label="Search projects"
                                        className="w-full sm:w-48 pl-8 pr-3 py-1.5 text-sm bg-[var(--bg-paper)] border-2 border-[var(--ink-black)]/10 rounded-lg outline-none focus:border-[var(--ink-black)]/30 transition-colors text-ink placeholder-ink/20 font-clean"
                                    />
                                </div>

                                <div className="flex border-2 border-[var(--ink-black)]/10 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        aria-label="Grid view"
                                        className={`p-1.5 transition-colors ${viewMode === 'grid'
                                            ? 'bg-[var(--ink-black)] text-[var(--bg-paper)]'
                                            : 'text-ink/40 hover:bg-[var(--ink-black)]/5'
                                            }`}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        aria-label="List view"
                                        className={`p-1.5 transition-colors ${viewMode === 'list'
                                            ? 'bg-[var(--ink-black)] text-[var(--bg-paper)]'
                                            : 'text-ink/40 hover:bg-[var(--ink-black)]/5'
                                            }`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ─── Results ─── */}
                        <div className="flex-1 p-5">
                            <AnimatePresence mode="wait">
                                {totalCount === 0 ? (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center py-20 text-ink/30"
                                    >
                                        <Search className="w-10 h-10 mb-4" />
                                        <p className="text-lg font-clean font-bold">Nothing here</p>
                                        <p className="text-sm font-sketch mt-1">Try a different search or category</p>
                                    </motion.div>
                                ) : viewMode === 'grid' ? (
                                    <motion.div
                                        key="grid"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-8"
                                    >
                                        {visibleProjects.length > 0 && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                                {visibleProjects.map((project) => {
                                                    const Icon = project.icon;
                                                    return (
                                                        <Link
                                                            key={project.id}
                                                            to={`/work/${project.slug}`}
                                                            className="group text-left rounded-xl border-2 border-[var(--ink-black)]/10 hover:border-[var(--ink-black)]/30 bg-[var(--bg-paper)] hover:shadow-[4px_4px_0px_0px_var(--shadow-color)] transition-all duration-300 cursor-pointer block overflow-hidden"
                                                        >
                                                            {project.images?.[0] ? (
                                                                <div className="h-32 border-b-2 border-[var(--ink-black)]/10 overflow-hidden bg-white">
                                                                    <img
                                                                        src={project.images[0].src}
                                                                        alt={project.images[0].alt}
                                                                        className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                                                                        loading="lazy"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className="h-32 border-b-2 border-[var(--ink-black)]/10 flex items-center justify-center"
                                                                    style={{ background: project.color + '0E' }}
                                                                >
                                                                    <Icon className="w-10 h-10" style={{ color: project.color }} />
                                                                </div>
                                                            )}

                                                            <div className="p-5">
                                                                <div className="flex items-center justify-between gap-2 mb-2">
                                                                    <span className="text-[10px] font-bold text-ink/40 uppercase tracking-[0.15em] font-clean">
                                                                        {project.category}
                                                                    </span>
                                                                    <span
                                                                        className="text-[10px] font-bold font-clean uppercase tracking-wider px-2 py-0.5 rounded-md"
                                                                        style={{ color: project.color, background: project.color + '15' }}
                                                                    >
                                                                        {project.status}
                                                                    </span>
                                                                </div>
                                                                <h3 className="text-sm font-bold font-clean text-ink leading-snug mb-2">
                                                                    {project.title}
                                                                </h3>
                                                                <p className="text-xs text-ink/40 font-sketch leading-relaxed mb-4">
                                                                    {project.tagline}
                                                                </p>
                                                                <div className="flex flex-wrap gap-1.5">
                                                                    {project.tech.slice(0, 3).map((tech) => (
                                                                        <span
                                                                            key={tech}
                                                                            className="px-2 py-0.5 text-[9px] font-bold font-clean border border-[var(--ink-black)]/15 rounded-full text-ink/50"
                                                                        >
                                                                            {tech}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {visibleLab.length > 0 && (
                                            <div>
                                                {visibleProjects.length > 0 && (
                                                    <div className="flex items-center gap-2 mb-4 pt-2">
                                                        <FlaskConical className="w-4 h-4 text-ink/30" />
                                                        <span className="text-[10px] font-bold text-ink/30 uppercase tracking-[0.15em] font-clean">
                                                            The Lab
                                                        </span>
                                                        <div className="flex-1 h-[2px] bg-[var(--ink-black)]/5" />
                                                    </div>
                                                )}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                                    {visibleLab.map((item) => {
                                                        const Icon = item.icon;
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                className="group p-5 rounded-xl border-2 border-[var(--ink-black)]/10 hover:border-[var(--ink-black)]/30 bg-[var(--bg-paper)] hover:shadow-[4px_4px_0px_0px_var(--shadow-color)] transition-all duration-300 flex flex-col"
                                                            >
                                                                <div className="flex items-center gap-3 mb-3">
                                                                    <div
                                                                        className="w-9 h-9 rounded-lg flex items-center justify-center border-2 flex-shrink-0"
                                                                        style={{ borderColor: item.color + '40', background: item.color + '12' }}
                                                                    >
                                                                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                                                                    </div>
                                                                    <h4 className="text-sm font-bold font-clean text-ink tracking-tighter flex-1">
                                                                        {item.title}
                                                                    </h4>
                                                                    <span className="inline-flex items-center gap-1 text-[9px] font-bold font-clean uppercase tracking-wider text-ink/30">
                                                                        <Tag className="w-2.5 h-2.5" />
                                                                        {item.tag}
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-ink/55 font-clean leading-relaxed mb-4 flex-1">
                                                                    {item.blurb}
                                                                </p>
                                                                <div className="flex flex-wrap gap-1.5 mb-4">
                                                                    {item.tech.map((tech) => (
                                                                        <span
                                                                            key={tech}
                                                                            className="px-2 py-0.5 text-[9px] font-bold font-clean border border-[var(--ink-black)]/15 rounded-full text-ink/50"
                                                                        >
                                                                            {tech}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    {item.url && (
                                                                        <a
                                                                            href={item.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="inline-flex items-center gap-1.5 text-xs font-bold font-clean text-ink hover:text-ink/60 transition-colors"
                                                                        >
                                                                            Try it <ExternalLink className="w-3 h-3" />
                                                                        </a>
                                                                    )}
                                                                    {item.repo && (
                                                                        <a
                                                                            href={item.repo}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="inline-flex items-center gap-1.5 text-xs font-bold font-clean text-ink/50 hover:text-ink transition-colors"
                                                                        >
                                                                            Source <Github className="w-3 h-3" />
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ) : (
                                    /* ─── List View ─── */
                                    <motion.div
                                        key="list"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-1"
                                    >
                                        <div className="grid grid-cols-[1fr_110px_90px_110px] gap-4 px-4 py-2 text-[10px] font-bold text-ink/30 uppercase tracking-[0.15em] font-clean border-b border-[var(--ink-black)]/10">
                                            <span>Name</span>
                                            <span>Year</span>
                                            <span>Status</span>
                                            <span>Kind</span>
                                        </div>

                                        {visibleProjects.map((project) => {
                                            const Icon = project.icon;
                                            return (
                                                <Link
                                                    key={project.id}
                                                    to={`/work/${project.slug}`}
                                                    className="w-full grid grid-cols-[1fr_110px_90px_110px] gap-4 items-center px-4 py-3 rounded-lg text-left hover:bg-[var(--ink-black)]/5 transition-colors cursor-pointer group"
                                                >
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div
                                                            className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                                                            style={{ background: project.color + '15' }}
                                                        >
                                                            <Icon className="w-4 h-4" style={{ color: project.color }} />
                                                        </div>
                                                        <span className="text-sm font-medium text-ink font-clean truncate group-hover:text-ink/80">
                                                            {project.title}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-ink/40 font-clean">{project.year}</span>
                                                    <span className="text-xs text-ink/40 font-clean truncate">{project.status}</span>
                                                    <span
                                                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md text-center"
                                                        style={{ color: project.color, background: project.color + '15' }}
                                                    >
                                                        {kindLabels[project.kind]}
                                                    </span>
                                                </Link>
                                            );
                                        })}

                                        {visibleLab.map((item) => {
                                            const Icon = item.icon;
                                            const href = item.url ?? item.repo;
                                            return (
                                                <a
                                                    key={item.id}
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full grid grid-cols-[1fr_110px_90px_110px] gap-4 items-center px-4 py-3 rounded-lg text-left hover:bg-[var(--ink-black)]/5 transition-colors cursor-pointer group"
                                                >
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div
                                                            className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                                                            style={{ background: item.color + '15' }}
                                                        >
                                                            <Icon className="w-4 h-4" style={{ color: item.color }} />
                                                        </div>
                                                        <span className="text-sm font-medium text-ink font-clean truncate group-hover:text-ink/80">
                                                            {item.title}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-ink/40 font-clean">—</span>
                                                    <span className="text-xs text-ink/40 font-clean">{item.url ? 'Live' : 'Source'}</span>
                                                    <span
                                                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md text-center"
                                                        style={{ color: item.color, background: item.color + '15' }}
                                                    >
                                                        {item.tag}
                                                    </span>
                                                </a>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
