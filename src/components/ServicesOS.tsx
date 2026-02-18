import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Code, TrendingUp, Zap, Terminal, Search, Layout, Box, Gamepad2 } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import BlurText from './BlurText';

// --- Types ---
type ServiceId = 'web' | 'marketing' | 'automation' | 'terminal';

interface Service {
    id: ServiceId;
    title: string;
    icon: any;
    description: string;
    features: string[];
    color: string;
}

const services: Service[] = [
    {
        id: 'web',
        title: 'Web Dev.app',
        icon: Code,
        description: 'Custom sites and applications built with architectural precision.',
        features: ['Responsive design', 'Progressive web apps', 'E-commerce platforms', 'Custom applications'],
        color: '#FF3B30', // Mac red-ish generic
    },
    {
        id: 'marketing',
        title: 'Growth.exe',
        icon: TrendingUp,
        description: 'Data-driven strategies drafted for measurable growth.',
        features: ['SEO optimization', 'Content strategy', 'Social media marketing', 'Performance analytics'],
        color: '#4CD964', // Mac green-ish generic
    },
    {
        id: 'automation',
        title: 'AutoBot_v2',
        icon: Zap,
        description: 'Streamlined operations with intelligent workflow design.',
        features: ['Process automation', 'AI integration', 'Workflow optimization', 'Custom API development'],
        color: '#007AFF', // Mac blue-ish generic
    },
    {
        id: 'terminal',
        title: 'Terminal',
        icon: Terminal,
        description: 'System Command Line Interface',
        features: [],
        color: '#8E8E93',
    }
];

// --- Window Component ---
const Window = ({
    service,
    isOpen,
    onClose,
    onMinimize,
    isActive,
    onFocus,
    constraintsRef,
    position
}: {
    service: Service;
    isOpen: boolean;
    onClose: () => void;
    onMinimize: () => void;
    isActive: boolean;
    onFocus: () => void;
    constraintsRef: any;
    position: { x: number; y: number };
}) => {
    const controls = useDragControls();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    drag
                    dragListener={false}
                    dragControls={controls}
                    dragConstraints={constraintsRef}
                    dragElastic={0.1}
                    dragMomentum={false}
                    initial={{ scale: 0.8, opacity: 0, x: position.x, y: position.y }}
                    animate={{ scale: 1, opacity: 1, x: position.x, y: position.y }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onPointerDown={onFocus}
                    style={{ zIndex: isActive ? 50 : 10, position: 'absolute' }}
                    className={`w-[90vw] md:w-[520px] h-[450px] rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_var(--shadow-color)] border-2 border-[var(--ink-black)] bg-[var(--card-bg)] flex flex-col`}
                >
                    {/* Title Bar */}
                    <div
                        onPointerDown={(e) => {
                            controls.start(e);
                            onFocus();
                        }}
                        className="h-10 border-b-2 border-[var(--ink-black)] bg-[var(--bg-paper)] flex items-center justify-between px-3 cursor-grab active:cursor-grabbing select-none shrink-0"
                    >
                        <div className="flex items-center gap-2">
                            <div onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-3 h-3 rounded-full border border-[var(--ink-black)] bg-[#FF5F56] hover:bg-[#FF3B30] cursor-pointer" />
                            <div onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-3 h-3 rounded-full border border-[var(--ink-black)] bg-[#FFBD2E] hover:bg-[#FF9500] cursor-pointer" />
                            <div className="w-3 h-3 rounded-full border border-[var(--ink-black)] bg-[#27C93F] hover:bg-[#4CD964] cursor-pointer" />
                        </div>
                        <div className="font-clean text-xs font-bold tracking-widest uppercase text-[var(--ink-black)] opacity-50 absolute left-1/2 -translate-x-1/2">
                            {service.title}
                        </div>
                        <div />
                    </div>

                    {/* Content */}
                    <div className="p-8 h-full overflow-y-auto font-clean text-[var(--ink-black)]">
                        {service.id === 'terminal' ? (
                            <div className="font-mono text-sm space-y-2 text-[var(--ink-black)] dark:text-[var(--ink-black)]">
                                <p className="opacity-50">Last login: {new Date().toDateString()} on ttys001</p>

                                <div>
                                    <p>➜  ~  init_sequence --mood=creative</p>
                                    <p className="opacity-80 pl-4">▸ Loading caffeine_module... <span className="font-bold">[OK]</span></p>
                                    <p className="opacity-80 pl-4">▸ Calibrating pixel_perfection... <span className="font-bold">[OK]</span></p>
                                    <p className="opacity-80 pl-4">▸ Suppressing imposter_syndrome... <span className="font-bold">[SUCCESS]</span></p>
                                </div>

                                <div className="mt-4">
                                    <p>➜  ~  sudo make_website_pop</p>
                                    <p className="opacity-80">Access granted. Deploying visual_delight.sh...</p>
                                </div>

                                <div className="mt-4">
                                    <p>➜  ~  access_database --query="service_packages_&_pricing"</p>
                                    <p className="opacity-80 py-2">▸ Locating strategic_growth_assets... <span className="font-bold text-green-500">[FOUND]</span></p>
                                    <p className="opacity-80 pb-2">▸ Preparing secure download...</p>
                                    <a
                                        href="/proposal.pdf"
                                        download="Qroma_Proposal.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--ink-black)] text-[var(--bg-paper)] hover:bg-transparent hover:text-[var(--ink-black)] border border-[var(--ink-black)] transition-all text-xs font-bold uppercase tracking-wider"
                                    >
                                        [ DOWNLOAD_PROPOSAL.pdf ]
                                    </a>
                                </div>

                                <p className="mt-4">qroma-system: ~ user$ <span className="animate-pulse">_</span></p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-xl border-2 border-[var(--ink-black)] flex items-center justify-center bg-[var(--bg-paper)]">
                                        <service.icon size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tighter">{service.title}</h2>
                                        <p className="text-xs opacity-60 uppercase tracking-widest font-bold">Version 1.0.0</p>
                                    </div>
                                </div>

                                <p className="mb-8 text-lg leading-relaxed opacity-80 font-medium">
                                    {service.description}
                                </p>

                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4">Features</h3>
                                    {service.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--ink-black)] bg-[var(--bg-paper)] hover:translate-x-1 transition-transform">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--ink-black)] mr-3" />
                                            <span className="text-sm font-bold">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- Dock Component ---
const Dock = ({
    services,
    openWindows,
    toggleWindow
}: {
    services: Service[];
    openWindows: ServiceId[];
    toggleWindow: (id: ServiceId) => void;
}) => {
    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[60]">
            <motion.div
                className="flex items-end gap-4 p-4 rounded-2xl border-2 border-[var(--ink-black)] bg-[var(--bg-paper)]/80 backdrop-blur-md shadow-[4px_4px_0px_0px_var(--shadow-color)]"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, type: 'spring' }}
            >
                {services.map((service) => {
                    const isOpen = openWindows.includes(service.id);
                    return (
                        <motion.div
                            key={service.id}
                            onClick={() => toggleWindow(service.id)}
                            whileHover={{ y: -10, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative group cursor-pointer"
                        >
                            {/* App Icon */}
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl border-2 border-[var(--ink-black)] bg-[var(--card-bg)] flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:bg-[var(--ink-black)] group-hover:text-[var(--bg-paper)]">
                                <service.icon size={24} strokeWidth={2} />
                            </div>

                            {/* Label on Hover */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--ink-black)] text-[var(--bg-paper)] text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {service.title}
                            </div>

                            {/* Open Indicator */}
                            {isOpen && (
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--ink-black)]" />
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

// --- Main ServicesOS Component ---
export default function ServicesOS() {
    const [openWindows, setOpenWindows] = useState<ServiceId[]>(['web', 'marketing', 'automation']);
    const [activeWindow, setActiveWindow] = useState<ServiceId | null>('web');
    const [positions, setPositions] = useState<Record<ServiceId, { x: number; y: number }>>({
        web: { x: 50, y: 50 },
        marketing: { x: 400, y: 100 },
        automation: { x: 200, y: 250 },
        terminal: { x: 100, y: 100 }
    });
    const constraintsRef = useRef(null);

    // Time for top bar
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Dynamic Positioning Logic
    useEffect(() => {
        const calculatePositions = () => {
            const width = window.innerWidth;
            const windowWidth = 520;
            const gap = 40;
            const topMargin = 50;

            if (width >= 1600) {
                // 3-Column Layout (Side by Side)
                const totalContentWidth = (windowWidth * 3) + (gap * 2);
                const startX = Math.max(0, (width - totalContentWidth) / 2);
                setPositions({
                    web: { x: startX, y: topMargin },
                    marketing: { x: startX + windowWidth + gap, y: topMargin },
                    automation: { x: startX + (windowWidth * 2) + (gap * 2), y: topMargin },
                    terminal: { x: startX + 200, y: topMargin + 200 }
                });
            } else if (width >= 1100) {
                // 2-Column Layout (2 Top, 1 Bottom)
                const totalContentWidth = (windowWidth * 2) + gap;
                const startX = Math.max(0, (width - totalContentWidth) / 2);
                setPositions({
                    web: { x: startX, y: topMargin },
                    marketing: { x: startX + windowWidth + gap, y: topMargin },
                    automation: { x: (width - windowWidth) / 2, y: topMargin + 450 + gap },
                    terminal: { x: startX + 100, y: topMargin + 300 }
                });
            } else {
                // 1-Column Layout (Stacked Vertically)
                const startX = Math.max(0, (width - windowWidth) / 2);
                setPositions({
                    web: { x: startX, y: topMargin },
                    marketing: { x: startX, y: topMargin + 450 + gap },
                    automation: { x: startX, y: topMargin + (450 * 2) + (gap * 2) },
                    terminal: { x: startX + 50, y: topMargin + 100 }
                });
            }
        };

        calculatePositions();
        window.addEventListener('resize', calculatePositions);
        return () => window.removeEventListener('resize', calculatePositions);
    }, []);

    const toggleWindow = (id: ServiceId) => {
        if (openWindows.includes(id)) {
            if (activeWindow === id) {
                // Minimize if already active
                setOpenWindows(prev => prev.filter(w => w !== id));
            } else {
                // Bring to front
                setActiveWindow(id);
            }
        } else {
            // Open and bring to front
            setOpenWindows(prev => [...prev, id]);
            setActiveWindow(id);
        }
    };

    const closeWindow = (id: ServiceId) => {
        setOpenWindows(prev => prev.filter(w => w !== id));
        if (activeWindow === id) {
            setActiveWindow(null);
        }
    };

    const focusWindow = (id: ServiceId) => {
        setActiveWindow(id);
    };

    return (
        <section id="services" className="relative w-full bg-[var(--bg-paper)]">

            {/* --- Mobile View (Standard Grid) --- */}
            <div className="block md:hidden py-32 px-6">
                <div className="text-center mb-16">
                    <BlurText
                        text="Our Services"
                        className="text-4xl font-bold font-clean tracking-tighter text-[var(--ink-black)] mb-4"
                        delay={80}
                    />
                    <p className="text-[var(--ink-black)]/60 font-sketch">Digital tools for modern problems.</p>
                </div>
                <div className="grid grid-cols-1 gap-8">
                    {services.filter(s => s.id !== 'terminal').map((service) => (
                        <SpotlightCard key={service.id} className="relative bg-[var(--card-bg)] sketch-border p-8 h-full border-b-4 border-b-[var(--ink-black)]">
                            <div className="relative z-10">
                                <div className="w-16 h-16 mb-6 rounded-full border-2 border-[var(--ink-black)] flex items-center justify-center bg-[var(--bg-paper)] text-[var(--ink-black)]">
                                    <service.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--ink-black)] mb-4 font-sketch">{service.title}</h3>
                                <p className="text-[var(--ink-black)]/70 mb-6 leading-relaxed">{service.description}</p>
                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-[var(--ink-black)]/80 text-sm font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--ink-black)] mr-3" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>

            {/* --- Desktop View (Qroma OS) --- */}
            <div className="hidden md:flex flex-col h-screen relative overflow-hidden pt-20">

                {/* OS Top Bar */}
                <div className="h-8 w-full border-b-2 border-[var(--ink-black)] bg-[var(--bg-paper)] flex items-center justify-between px-4 text-xs font-bold tracking-widest uppercase select-none z-10">
                    <div className="flex items-center gap-4">
                        <span className="hover:bg-[var(--ink-black)] hover:text-[var(--bg-paper)] px-2 py-1 rounded cursor-pointer transition-colors">QROMA OS</span>
                        <span className="hidden md:inline hover:bg-[var(--ink-black)] hover:text-[var(--bg-paper)] px-2 py-1 rounded cursor-pointer transition-colors">File</span>
                        <span className="hidden md:inline hover:bg-[var(--ink-black)] hover:text-[var(--bg-paper)] px-2 py-1 rounded cursor-pointer transition-colors">Edit</span>
                        <span className="hidden md:inline hover:bg-[var(--ink-black)] hover:text-[var(--bg-paper)] px-2 py-1 rounded cursor-pointer transition-colors">View</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <Search size={14} />
                        <Layout size={14} />
                    </div>
                </div>

                {/* Desktop Area */}
                <div className="flex-1 relative p-4" ref={constraintsRef}>

                    {/* Desktop Icons (Background elements) */}
                    <div className="absolute top-8 left-8 flex flex-col gap-8 pointer-events-none opacity-50 z-0 select-none">
                        <div className="flex flex-col items-center gap-2 group cursor-pointer pointer-events-auto transition-opacity hover:opacity-100">
                            <div className="w-16 h-16 border-2 border-[var(--ink-black)] bg-[var(--bg-paper)] shadow-[4px_4px_0px_var(--shadow-color)] flex items-center justify-center -rotate-2 group-hover:rotate-0 transition-transform">
                                <Box size={32} className="text-[var(--ink-black)]" />
                            </div>
                            <span className="text-xs font-bold bg-[var(--bg-paper)] px-2 py-0.5 border border-[var(--ink-black)] text-[var(--ink-black)] shadow-[2px_2px_0px_var(--shadow-color)]">
                                Minecraft
                            </span>
                        </div>

                        <div className="flex flex-col items-center gap-2 group cursor-pointer pointer-events-auto transition-opacity hover:opacity-100">
                            <div className="w-16 h-16 border-2 border-[var(--ink-black)] bg-[var(--bg-paper)] shadow-[4px_4px_0px_var(--shadow-color)] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform relative">
                                <Gamepad2 size={32} className="text-[var(--ink-black)]" />
                            </div>
                            <span className="text-xs font-bold bg-[var(--bg-paper)] px-2 py-0.5 border border-[var(--ink-black)] text-[var(--ink-black)] shadow-[2px_2px_0px_var(--shadow-color)]">
                                Overwatch
                            </span>
                        </div>
                    </div>

                    {/* Windows */}
                    {services.map(service => (
                        <Window
                            key={service.id}
                            service={service}
                            isOpen={openWindows.includes(service.id)}
                            isActive={activeWindow === service.id}
                            onClose={() => closeWindow(service.id)}
                            onMinimize={() => closeWindow(service.id)} // Minimize effectively closes for now (or hides)
                            onFocus={() => focusWindow(service.id)}
                            constraintsRef={constraintsRef}
                            position={positions[service.id]}
                        />
                    ))}

                </div>

                {/* Dock */}
                <Dock
                    services={services}
                    openWindows={openWindows}
                    toggleWindow={toggleWindow}
                />
            </div>

        </section>
    );
}
