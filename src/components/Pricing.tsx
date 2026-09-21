import { motion } from 'framer-motion';
import { Check, Hammer, Handshake, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';

const engagements = [
    {
        name: 'Build',
        icon: Hammer,
        summary: 'A defined thing, scoped and shipped.',
        description:
            'You know what you need built. We scope it, agree a fixed shape, and deliver it — site, app, platform or integration.',
        features: [
            'Fixed scope, fixed timeline',
            'Design and engineering together',
            'Handover you can actually run',
            'Quoted per project',
        ],
        highlight: false,
    },
    {
        name: 'Partner',
        icon: Handshake,
        summary: 'An ongoing seat at your table.',
        description:
            'For teams shipping continuously. We work as your product and engineering bench — roadmap, build, iterate, repeat.',
        features: [
            'Monthly retainer, reserved capacity',
            'Continuous design and development',
            'Automation and infrastructure ownership',
            'Direct line, no account manager',
        ],
        highlight: true,
    },
    {
        name: 'Lab',
        icon: FlaskConical,
        summary: 'We build it with you, not just for you.',
        description:
            'For ideas that should be products. We take a stake in getting it off the ground — shared risk, shared upside, joint build.',
        features: [
            'Concept to first version',
            'Product strategy and validation',
            'Equity or hybrid arrangements',
            'Selective — a few at a time',
        ],
        highlight: false,
    },
];

export default function Pricing() {
    return (
        <section className="py-24 px-6 md:px-8 bg-[var(--bg-paper)] relative overflow-hidden" id="engagements">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold font-clean tracking-tighter text-[var(--ink-black)] mb-6">
                        Three Ways to Work With Us
                    </h2>
                    <p className="text-xl text-[var(--ink-black)]/60 font-clean max-w-2xl mx-auto">
                        We stopped selling packages off a shelf. Every build is scoped to the problem in front of it —
                        so pick the shape of the relationship, and we will quote the work.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {engagements.map((engagement, index) => {
                        const Icon = engagement.icon;
                        return (
                            <motion.div
                                key={engagement.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`flex flex-col p-8 rounded-3xl border-2 transition-transform duration-300 hover:-translate-y-2 ${engagement.highlight
                                    ? 'bg-[var(--ink-black)] text-[var(--bg-paper)] border-[var(--ink-black)] shadow-[8px_8px_0px_0px_var(--shadow-color)]'
                                    : 'bg-[var(--bg-paper)] text-[var(--ink-black)] border-[var(--ink-black)]/20 hover:border-[var(--ink-black)]'
                                    }`}
                            >
                                <div className="mb-8">
                                    <div
                                        className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center mb-6 ${engagement.highlight
                                            ? 'border-[var(--bg-paper)]/30 bg-[var(--bg-paper)]/10'
                                            : 'border-[var(--ink-black)]/20 bg-[var(--ink-black)]/5'
                                            }`}
                                    >
                                        <Icon className="w-6 h-6" />
                                    </div>

                                    <h3 className={`text-3xl font-bold font-clean tracking-tighter mb-3 ${engagement.highlight ? 'text-white' : ''}`}>
                                        {engagement.name}
                                    </h3>
                                    <p className={`text-base font-bold font-sketch mb-4 ${engagement.highlight ? 'text-white/70' : 'text-[var(--ink-black)]/50'}`}>
                                        {engagement.summary}
                                    </p>
                                    <p className={`text-sm leading-relaxed ${engagement.highlight ? 'text-white/70' : 'text-[var(--ink-black)]/60'}`}>
                                        {engagement.description}
                                    </p>
                                </div>

                                <div className="flex-1 space-y-4 mb-8">
                                    {engagement.features.map((feature) => (
                                        <div key={feature} className="flex items-start gap-3">
                                            <Check className={`w-5 h-5 shrink-0 ${engagement.highlight ? 'text-white' : 'text-[var(--ink-black)]'}`} />
                                            <span className={`text-sm font-medium ${engagement.highlight ? 'text-white/90' : 'text-[var(--ink-black)]/80'}`}>
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href="#contact"
                                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold font-clean tracking-tighter border-2 transition-all duration-300 ${engagement.highlight
                                        ? 'bg-[var(--bg-paper)] text-[var(--ink-black)] border-[var(--bg-paper)] hover:bg-transparent hover:text-[var(--bg-paper)]'
                                        : 'bg-[var(--ink-black)] text-[var(--bg-paper)] border-[var(--ink-black)] hover:bg-transparent hover:text-[var(--ink-black)]'
                                        }`}
                                >
                                    Talk to Us
                                </a>
                            </motion.div>
                        );
                    })}
                </div>

                <p className="text-center text-sm text-[var(--ink-black)]/40 font-clean mt-10">
                    Not sure which one fits?{' '}
                    <Link to="/work" className="underline underline-offset-4 hover:text-[var(--ink-black)] transition-colors">
                        Look at what we have built
                    </Link>{' '}
                    and start there.
                </p>
            </div>
        </section>
    );
}
