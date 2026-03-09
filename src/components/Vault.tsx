import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Folder, Search, LayoutGrid, List, ChevronRight,
    Clock, Tag, ArrowLeft, Calendar,
    Globe, Megaphone, Palette, Zap
} from 'lucide-react';

import { posts, categories } from '../data/blogs';

const categoryIcons: Record<string, typeof Folder> = {
    All: Folder,
    Tech: Globe,
    Marketing: Megaphone,
    Automation: Zap,
    Design: Palette,
};

// ─── Component ───
export default function Vault() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);

    const filteredPosts = posts.filter((post) => {
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
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
                <div className="flex items-center justify-between px-5 py-3 bg-[var(--card-bg)] border-b-2 border-[var(--ink-black)]/10">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                        <Folder className="w-4 h-4 text-ink/40" />
                        <span className="text-sm font-bold tracking-wider uppercase text-ink/60 font-clean">
                            Blog
                        </span>
                    </div>
                    <div className="w-16" /> {/* spacer */}
                </div>

                {/* ─── Main Content Area ─── */}
                <div className="flex flex-col lg:flex-row min-h-[70vh]">
                    {/* ─── Sidebar ─── */}
                    <div className="lg:w-56 border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--ink-black)]/10 p-4 flex-shrink-0">
                        <p className="text-[10px] font-bold text-ink/30 uppercase tracking-[0.15em] mb-3 px-2 font-clean">
                            Categories
                        </p>
                        <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                            {categories.map((cat) => {
                                const Icon = categoryIcons[cat];
                                const isActive = activeCategory === cat;
                                const count = cat === 'All'
                                    ? posts.length
                                    : posts.filter((p) => p.category === cat).length;
                                return (
                                    <motion.button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        whileTap={{ scale: 0.97 }}
                                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 font-clean ${isActive
                                            ? 'bg-[var(--ink-black)] text-[var(--bg-paper)] shadow-md'
                                            : 'text-ink/60 hover:bg-[var(--ink-black)]/5'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4 flex-shrink-0" />
                                        <span>{cat}</span>
                                        <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[var(--bg-paper)]/20' : 'bg-[var(--ink-black)]/5'
                                            }`}>
                                            {count}
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
                            {/* Breadcrumb path */}
                            <div className="flex items-center gap-1.5 text-sm text-ink/40 font-clean">
                                <span className="text-ink/60 font-medium">Blog</span>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-ink font-semibold">{activeCategory}</span>
                                <span className="ml-2 text-[10px] text-ink/30">
                                    — {filteredPosts.length} {filteredPosts.length === 1 ? 'file' : 'files'}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Search */}
                                <div className="relative flex-1 sm:flex-none">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink/30" />
                                    <input
                                        ref={searchRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search..."
                                        className="w-full sm:w-48 pl-8 pr-3 py-1.5 text-sm bg-[var(--bg-paper)] border-2 border-[var(--ink-black)]/10 rounded-lg outline-none focus:border-[var(--ink-black)]/30 transition-colors text-ink placeholder-ink/20 font-clean"
                                    />
                                </div>

                                {/* View toggle */}
                                <div className="flex border-2 border-[var(--ink-black)]/10 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-1.5 transition-colors ${viewMode === 'grid'
                                            ? 'bg-[var(--ink-black)] text-[var(--bg-paper)]'
                                            : 'text-ink/40 hover:bg-[var(--ink-black)]/5'
                                            }`}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
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

                        {/* ─── File Grid / List ─── */}
                        <div className="flex-1 p-5">
                            <AnimatePresence mode="wait">
                                {filteredPosts.length === 0 ? (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center py-20 text-ink/30"
                                    >
                                        <Search className="w-10 h-10 mb-4" />
                                        <p className="text-lg font-clean font-bold">No files found</p>
                                        <p className="text-sm font-sketch mt-1">Try a different search or category</p>
                                    </motion.div>
                                ) : viewMode === 'grid' ? (
                                    <motion.div
                                        key="grid"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                                    >
                                        {filteredPosts.map((post, index) => {
                                            const Icon = post.icon;
                                            return (
                                                <Link
                                                    key={post.id}
                                                    to={`/blog/${post.slug}`}
                                                    className="group text-left p-5 rounded-xl border-2 border-[var(--ink-black)]/10 hover:border-[var(--ink-black)]/30 bg-[var(--bg-paper)] hover:shadow-[4px_4px_0px_0px_var(--shadow-color)] transition-all duration-300 cursor-pointer block"
                                                >
                                                    {/* File icon */}
                                                    <div
                                                        className="w-12 h-14 rounded-lg flex items-center justify-center mb-4 border-2 relative overflow-hidden"
                                                        style={{
                                                            borderColor: post.color + '40',
                                                            background: post.color + '10',
                                                        }}
                                                    >
                                                        <Icon className="w-6 h-6" style={{ color: post.color }} />
                                                        {/* Doc corner fold */}
                                                        <div
                                                            className="absolute top-0 right-0 w-4 h-4"
                                                            style={{
                                                                background: `linear-gradient(135deg, ${post.color}20 50%, ${post.color}40 50%)`,
                                                            }}
                                                        />
                                                    </div>

                                                    <h3 className="text-sm font-bold font-clean text-ink leading-snug mb-2 group-hover:text-ink transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-xs text-ink/40 font-sketch leading-relaxed mb-4 line-clamp-2">
                                                        {post.excerpt}
                                                    </p>

                                                    <div className="flex items-center gap-3 text-[10px] text-ink/30 font-clean">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {formatDate(post.date)}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {post.readTime}
                                                        </span>
                                                    </div>

                                                    <div className="mt-3">
                                                        <span
                                                            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md"
                                                            style={{
                                                                color: post.color,
                                                                background: post.color + '15',
                                                            }}
                                                        >
                                                            <Tag className="w-2.5 h-2.5" />
                                                            {post.category}
                                                        </span>
                                                    </div>
                                                </Link>
                                            );
                                        })}
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
                                        {/* List header */}
                                        <div className="grid grid-cols-[1fr_120px_80px_100px] gap-4 px-4 py-2 text-[10px] font-bold text-ink/30 uppercase tracking-[0.15em] font-clean border-b border-[var(--ink-black)]/10">
                                            <span>Name</span>
                                            <span>Date Modified</span>
                                            <span>Size</span>
                                            <span>Kind</span>
                                        </div>
                                        {filteredPosts.map((post, index) => {
                                            const Icon = post.icon;
                                            return (
                                                <Link
                                                    key={post.id}
                                                    to={`/blog/${post.slug}`}
                                                    className="w-full grid grid-cols-[1fr_120px_80px_100px] gap-4 items-center px-4 py-3 rounded-lg text-left hover:bg-[var(--ink-black)]/5 transition-colors cursor-pointer group"
                                                >
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div
                                                            className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                                                            style={{ background: post.color + '15' }}
                                                        >
                                                            <Icon className="w-4 h-4" style={{ color: post.color }} />
                                                        </div>
                                                        <span className="text-sm font-medium text-ink font-clean truncate group-hover:text-ink/80">
                                                            {post.title}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-ink/40 font-clean">
                                                        {formatDate(post.date)}
                                                    </span>
                                                    <span className="text-xs text-ink/40 font-clean">
                                                        {post.readTime}
                                                    </span>
                                                    <span
                                                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md text-center"
                                                        style={{
                                                            color: post.color,
                                                            background: post.color + '15',
                                                        }}
                                                    >
                                                        {post.category}
                                                    </span>
                                                </Link>
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
