import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Folder, FileText, Search, LayoutGrid, List, ChevronRight,
    Clock, Tag, ArrowLeft, X, Eye, Calendar, User, Zap, Globe,
    Megaphone, Palette, Terminal
} from 'lucide-react';

// ─── Blog Post Data ───
interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    date: string;
    readTime: string;
    author: string;
    icon: typeof FileText;
    color: string;
}

const posts: BlogPost[] = [
    {
        id: 'automation-future',
        title: 'Why Automation Is the Future of Marketing',
        excerpt: 'Discover how intelligent automation is reshaping the marketing landscape and why early adopters are seeing 3x ROI.',
        content: `The marketing landscape is undergoing a seismic shift. Gone are the days of manually scheduling posts, hand-crafting every email campaign, and spending hours on repetitive tasks that add little strategic value.\n\nAt Qroma, we've seen firsthand how automation transforms businesses. Our clients who embrace marketing automation consistently report:\n\n• 3x higher ROI on marketing spend\n• 67% reduction in manual task overhead\n• 2x faster lead conversion rates\n\nThe key isn't replacing human creativity — it's amplifying it. When you automate the repetitive, you free your team to focus on strategy, storytelling, and innovation.\n\nFrom automated email sequences that nurture leads while you sleep, to AI-powered content scheduling that optimizes for engagement, the tools available today are more accessible than ever.\n\nThe question isn't whether to automate — it's how fast you can start.`,
        category: 'Automation',
        date: '2026-02-10',
        readTime: '5 min',
        author: 'Qroma Team',
        icon: Zap,
        color: '#f59e0b',
    },
    {
        id: 'scalable-web-apps',
        title: 'Building Scalable Web Apps in 2026',
        excerpt: 'A deep dive into the modern tech stack that powers performant, scalable web applications.',
        content: `The web development landscape in 2026 looks dramatically different from just a few years ago. Edge computing, server components, and AI-assisted development have fundamentally changed how we build.\n\nHere's what we're using at Qroma to build blazing-fast web applications:\n\n1. **React Server Components** — Reduced client-side JavaScript by up to 40%\n2. **Edge-first architecture** — Deploy globally, run locally\n3. **Type-safe APIs** — End-to-end type safety from database to UI\n4. **AI pair programming** — Accelerating development cycles by 2x\n\nThe biggest shift? Moving from "build and deploy" to "build and observe." Modern observability tools let us understand exactly how users interact with our applications in real-time.\n\nScalability isn't just about handling more users — it's about maintaining developer velocity as your codebase grows.`,
        category: 'Tech',
        date: '2026-02-05',
        readTime: '7 min',
        author: 'Qroma Team',
        icon: Globe,
        color: '#3b82f6',
    },
    {
        id: 'brand-psychology',
        title: 'The Psychology of Brand Identity',
        excerpt: 'Why the best brands don\'t just look good — they feel right. Understanding the neuroscience of visual identity.',
        content: `Every color choice, every curve of a letterform, every pixel of whitespace communicates something to your audience's subconscious mind.\n\nAt Qroma, we approach brand identity through the lens of cognitive psychology:\n\n**Color Theory in Practice**\nRed doesn't just mean "danger" — it triggers urgency and appetite. Blue doesn't just mean "trust" — it reduces heart rate and creates calm. Understanding these physiological responses is key to strategic color selection.\n\n**The Von Restorff Effect**\nPeople remember things that stand out. Your brand doesn't need to be the loudest — it needs to be the most distinctive in its category.\n\n**Cognitive Fluency**\nSimpler designs are perceived as more trustworthy. This doesn't mean minimal — it means intentional. Every element should earn its place.\n\nThe best brand identities aren't designed in a vacuum. They're engineered responses to specific business challenges.`,
        category: 'Design',
        date: '2026-01-28',
        readTime: '6 min',
        author: 'Qroma Team',
        icon: Palette,
        color: '#a855f7',
    },
    {
        id: 'seo-strategies',
        title: 'SEO Strategies That Actually Work',
        excerpt: 'Cut through the noise. Here are the SEO strategies delivering real results in 2026.',
        content: `The SEO industry is full of snake oil. Let's cut through it and talk about what actually moves the needle.\n\n**1. Topical Authority > Individual Keywords**\nGoogle's algorithms now understand topics holistically. Instead of targeting individual keywords, build comprehensive content clusters around your core expertise.\n\n**2. Core Web Vitals Are Non-Negotiable**\nPage speed, interactivity, and visual stability directly impact rankings. If your site loads in more than 2.5 seconds, you're leaving rankings on the table.\n\n**3. E-E-A-T Is Everything**\nExperience, Expertise, Authoritativeness, and Trustworthiness. Google wants to rank content from people who actually know what they're talking about.\n\n**4. AI Content Needs a Human Touch**\nAI-generated content can rank — but only when edited, fact-checked, and enriched with genuine expertise and original insights.\n\nThe bottom line: there are no shortcuts. But there are strategies that compound over time.`,
        category: 'Marketing',
        date: '2026-01-20',
        readTime: '8 min',
        author: 'Qroma Team',
        icon: Megaphone,
        color: '#ef4444',
    },
    {
        id: 'idea-to-mvp',
        title: 'From Idea to MVP: A Founder\'s Playbook',
        excerpt: 'The lean, battle-tested framework we use to take ideas from napkin sketch to launched product.',
        content: `Every great product starts as a messy idea. The challenge isn't having ideas — it's knowing which ones to pursue and how to validate them quickly.\n\nHere's the framework we use at Qroma:\n\n**Week 1: Problem Validation**\nTalk to 20 potential users. Not about your solution — about their problem. If you can't find 20 people who have the problem, stop here.\n\n**Week 2: Solution Design**\nSketch the simplest possible solution. Not the best solution, not the complete solution — the simplest one that solves the core problem.\n\n**Week 3-4: Build the MVP**\nUse no-code tools, existing APIs, and manual processes to fake what you can't build yet. The goal is to test the value proposition, not the technology.\n\n**Week 5: Launch and Learn**\nPut it in front of real users. Measure what matters: are people using it? Are they willing to pay? Would they recommend it?\n\nThe biggest mistake founders make? Building too much before validating.`,
        category: 'Tech',
        date: '2026-01-15',
        readTime: '6 min',
        author: 'Qroma Team',
        icon: Terminal,
        color: '#10b981',
    },
    {
        id: 'digital-transformation-sa',
        title: 'Digital Transformation in South Africa',
        excerpt: 'How SA businesses are leapfrogging legacy systems and embracing digital-first operations.',
        content: `South Africa's digital landscape is at an inflection point. While much of the world incrementally upgraded legacy systems, many SA businesses have the unique advantage of building digital-first from the ground up.\n\n**The Opportunity**\nMobile-first internet usage, growing fintech adoption, and a young, tech-savvy population create the perfect conditions for rapid digital transformation.\n\n**What We're Seeing**\n- SMEs adopting cloud-first operations are outpacing competitors by 40%\n- WhatsApp Business API integrations are becoming the primary customer service channel\n- Automated invoicing and payment systems are reducing cash flow delays by 60%\n\n**The Challenges**\nLoad shedding, connectivity gaps, and skills shortages remain real obstacles. But businesses that plan for these constraints — offline-capable apps, progressive enhancement, team upskilling — are thriving.\n\nAt Qroma, we build with the South African context in mind. Because solutions that work here can work anywhere.`,
        category: 'Automation',
        date: '2026-01-08',
        readTime: '5 min',
        author: 'Qroma Team',
        icon: Zap,
        color: '#f59e0b',
    },
];

const categories = ['All', 'Tech', 'Marketing', 'Automation', 'Design'];

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
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
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
                                                <motion.button
                                                    key={post.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    onClick={() => setSelectedPost(post)}
                                                    className="group text-left p-5 rounded-xl border-2 border-[var(--ink-black)]/10 hover:border-[var(--ink-black)]/30 bg-[var(--bg-paper)] hover:shadow-[4px_4px_0px_0px_var(--shadow-color)] transition-all duration-300 cursor-pointer"
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
                                                </motion.button>
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
                                                <motion.button
                                                    key={post.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.03 }}
                                                    onClick={() => setSelectedPost(post)}
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
                                                </motion.button>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ===== Quick Look Modal ===== */}
            <AnimatePresence>
                {selectedPost && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPost(null)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
                        />

                        {/* Quick Look Window */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed inset-4 md:inset-8 lg:inset-16 xl:inset-24 z-[201] bg-[var(--bg-paper)] rounded-2xl border-2 border-[var(--ink-black)] shadow-[8px_8px_0px_0px_var(--shadow-color)] flex flex-col overflow-hidden"
                        >
                            {/* Quick Look Title Bar */}
                            <div className="flex items-center justify-between px-5 py-3 border-b-2 border-[var(--ink-black)]/10 flex-shrink-0">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setSelectedPost(null)}
                                        className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] hover:brightness-90 transition-all cursor-pointer"
                                    />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                                    <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
                                </div>
                                <div className="flex items-center gap-2 text-sm text-ink/50 font-clean">
                                    <Eye className="w-4 h-4" />
                                    Quick Look — {selectedPost.title}
                                </div>
                                <button
                                    onClick={() => setSelectedPost(null)}
                                    className="p-1.5 rounded-lg hover:bg-[var(--ink-black)]/5 text-ink/40 hover:text-ink transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Article Content */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-14">
                                <div className="max-w-2xl mx-auto">
                                    {/* Category & meta */}
                                    <div className="flex flex-wrap items-center gap-3 mb-6">
                                        <span
                                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg"
                                            style={{
                                                color: selectedPost.color,
                                                background: selectedPost.color + '15',
                                            }}
                                        >
                                            <Tag className="w-3 h-3" />
                                            {selectedPost.category}
                                        </span>
                                        <span className="text-xs text-ink/30 flex items-center gap-1 font-clean">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(selectedPost.date)}
                                        </span>
                                        <span className="text-xs text-ink/30 flex items-center gap-1 font-clean">
                                            <Clock className="w-3 h-3" />
                                            {selectedPost.readTime}
                                        </span>
                                        <span className="text-xs text-ink/30 flex items-center gap-1 font-clean">
                                            <User className="w-3 h-3" />
                                            {selectedPost.author}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-clean tracking-tighter text-ink mb-6 leading-tight">
                                        {selectedPost.title}
                                    </h1>

                                    {/* Divider */}
                                    <div className="h-[2px] bg-[var(--ink-black)]/10 mb-8" />

                                    {/* Content */}
                                    <div className="prose-custom text-ink/70 font-clean text-base md:text-lg leading-relaxed whitespace-pre-line">
                                        {selectedPost.content.split('\n\n').map((paragraph, i) => (
                                            <motion.p
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="mb-6"
                                                dangerouslySetInnerHTML={{
                                                    __html: paragraph
                                                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-bold">$1</strong>')
                                                        .replace(/• /g, '<span class="inline-block mr-2">•</span>')
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
