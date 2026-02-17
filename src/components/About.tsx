import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Gamepad2, Rocket, BrainCircuit, Github } from 'lucide-react';
import BlurText from './BlurText';

export default function About() {
    return (
        <div className="min-h-screen bg-[var(--bg-paper)] pt-32 pb-16 px-6 md:px-8">
            {/* Back to home */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-4xl mx-auto mb-8"
            >
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-ink/40 hover:text-ink transition-colors font-clean group font-bold tracking-tight"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
            </motion.div>

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <BlurText
                        text="The Story of Qroma"
                        className="text-5xl md:text-6xl font-bold font-clean tracking-tighter text-ink mb-6"
                        delay={80}
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-xl text-ink/70 max-w-2xl mx-auto font-sketch"
                    >
                        From late-night boredom to digital domination.
                    </motion.p>
                </div>

                {/* The Origin Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl border-2 border-[var(--ink-black)] shadow-[8px_8px_0px_0px_var(--shadow-color)] overflow-hidden bg-[var(--card-bg)] mb-16"
                >
                    {/* Title Bar */}
                    <div className="flex items-center justify-between px-5 py-3 bg-[var(--card-bg)] border-b-2 border-[var(--ink-black)]/10">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                            <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
                        </div>
                        <span className="text-sm font-bold tracking-wider uppercase text-ink/60 font-clean">
                            origin.txt
                        </span>
                        <div className="w-16" />
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">
                        <h2 className="text-3xl font-bold font-clean text-ink mb-6 tracking-tight">
                            It Started With Boredom
                        </h2>
                        <div className="space-y-6 text-lg text-ink/70 font-clean leading-relaxed">
                            <p>
                                QromaDigital wasn't born in a boardroom. It was created by <strong className="text-ink">Yahya Paruk (Pordilz)</strong> and <strong className="text-ink">Ubaid Desai (Bumz)</strong> in Durban, South Africa, after one too many nights of just staring at screens and wasting time.
                            </p>
                            <p>
                                We realized we were sitting on a goldmine of skills. We had access to powerful AI tools, a knack for technology, and a drive to do something more than just exist. We realized we could leverage these tools not just to help ourselves find purpose and employment, but to help others digitize and expand in this new digital world.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Founders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Yahya */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="group relative rounded-2xl border-2 border-[var(--ink-black)] bg-[var(--bg-paper)] p-6 hover:shadow-[8px_8px_0px_0px_var(--shadow-color)] transition-all duration-300"
                    >
                        <div className="absolute top-4 right-4 text-ink/10 group-hover:text-ink/20 transition-colors">
                            <User size={64} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-xl bg-blue-500/10 text-blue-500 border-2 border-blue-500/20 flex items-center justify-center mb-6">
                                <span className="text-2xl font-bold font-clean">YP</span>
                            </div>
                            <h3 className="text-2xl font-bold font-clean text-ink mb-1">Yahya Paruk</h3>
                            <p className="text-sm font-bold text-ink/40 uppercase tracking-widest mb-4">Pordilz</p>
                            <p className="text-ink/60 font-clean leading-relaxed">
                                The visionary who saw the potential to turn "wasting time" into building a digital empire. Focused on leveraging AI to create smarter, faster solutions.
                            </p>
                        </div>
                    </motion.div>

                    {/* Ubaid */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="group relative rounded-2xl border-2 border-[var(--ink-black)] bg-[var(--bg-paper)] p-6 hover:shadow-[8px_8px_0px_0px_var(--shadow-color)] transition-all duration-300"
                    >
                        <div className="absolute top-4 right-4 text-ink/10 group-hover:text-ink/20 transition-colors">
                            <Gamepad2 size={64} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-xl bg-red-500/10 text-red-500 border-2 border-red-500/20 flex items-center justify-center mb-6">
                                <span className="text-2xl font-bold font-clean">UD</span>
                            </div>
                            <h3 className="text-2xl font-bold font-clean text-ink mb-1">Ubaid Desai</h3>
                            <p className="text-sm font-bold text-ink/40 uppercase tracking-widest mb-4">Bumz</p>
                            <p className="text-ink/60 font-clean leading-relaxed">
                                Siege Champ and tech enthusiast. Proving that the dedication required to master a game is the same dedication needed to master business.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Mission / Culture */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl border-2 border-[var(--ink-black)] overflow-hidden bg-[var(--ink-black)] text-[var(--bg-paper)]"
                >
                    <div className="p-8 md:p-12 text-center">
                        <div className="flex justify-center gap-4 mb-6">
                            <BrainCircuit className="w-8 h-8 opacity-80" />
                            <Rocket className="w-8 h-8 opacity-80" />
                        </div>
                        <h2 className="text-3xl font-bold font-clean mb-6 tracking-tight">
                            We Play Hard, We Work Harder.
                        </h2>
                        <p className="text-lg opacity-80 font-clean leading-relaxed max-w-2xl mx-auto mb-8">
                            We take a keen interest in this field because it's where we live. Qroma is our way of establishing ourselves and proving that you don't need a corporate background to build elite digital products. You just need the skills, the tools, and the drive.
                        </p>
                        <a
                            href="https://github.com/Pordilz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--bg-paper)] text-[var(--ink-black)] font-bold font-clean rounded-full hover:scale-105 transition-transform duration-300"
                        >
                            <Github className="w-5 h-5" />
                            View Our Code
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
