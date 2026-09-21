import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, ChevronDown, Handshake, Globe, Shield } from 'lucide-react';
import { useState } from 'react';

const faqCategories = [
    {
        title: 'The Studio',
        icon: HelpCircle,
        color: '#3b82f6',
        questions: [
            {
                q: 'What does Qroma actually do?',
                a: 'We are a development and creative studio. We work across three disciplines:\n\n• **Product:** web applications, platforms, sites and native mobile builds.\n• **Studio:** brand, interface, motion and the design layer on top.\n• **Systems:** automation, APIs, data pipelines and infrastructure as code.\n\nMost projects touch all three, which is why we do not sell them separately.'
            },
            {
                q: 'Are you an agency or a product company?',
                a: 'Both, on purpose. We build and run our own products — **Halaq** (Shariah equity screening), **The Ledger** (an IFRS teaching tool) and **VidMetrics** (YouTube competitive intelligence) — and we take on a small number of client builds each year.\n\nOwning products keeps us honest. We make the same architecture, cost and scope decisions on our own money before we make them on yours.'
            },
            {
                q: 'Where are you based?',
                a: 'We are based in **Durban, KwaZulu-Natal**, and work with clients across South Africa and internationally. Most of our work is remote by default.'
            },
            {
                q: 'How big is the team?',
                a: 'Small and deliberately so. Qroma was founded by **Yahya Paruk** and **Ubaid Desai**, and we bring in specialists when a project genuinely needs them. You talk to the people building your thing — there is no account manager in the middle.'
            }
        ]
    },
    {
        title: 'Working Together',
        icon: Handshake,
        color: '#10b981',
        questions: [
            {
                q: 'What are the three engagement models?',
                a: '• **Build** — a defined project with fixed scope and timeline. You know what you need; we scope, quote and ship it.\n• **Partner** — a monthly retainer with reserved capacity, for teams shipping continuously.\n• **Lab** — we co-build a product with you, structured around shared risk and shared upside. Selective, a few at a time.'
            },
            {
                q: 'Why did you drop fixed packages?',
                a: 'Because packages price **pages**, not outcomes. A five-page site that has to take payments, sync a CRM and rank locally is not the same job as a five-page brochure, and pretending otherwise meant either underquoting the hard work or overcharging the simple version.\n\nWe scope the actual problem and quote that instead.'
            },
            {
                q: 'How long does a build take?',
                a: 'Depends on what it is:\n\n• **Focused marketing site:** 2–4 weeks\n• **Web application with real functionality:** 6–12 weeks\n• **Product with integrations, payments or data pipelines:** longer, scoped case by case\n\nTimelines start once we have your content and branding. We work in shipped increments, so something is running and reviewable from week one.'
            },
            {
                q: 'Do you still build standard business websites?',
                a: 'Yes, and we build plenty of them. A well-built marketing site is still one of the highest-return assets a business can own.\n\nThe difference is that we treat it as a product with a job to do, not as a number of pages on a price list.'
            }
        ]
    },
    {
        title: 'Technical',
        icon: Globe,
        color: '#f59e0b',
        questions: [
            {
                q: 'What do you build with?',
                a: 'Mostly **React, Next.js and TypeScript** on the front end, **Node** or **Python** on the back, **PostgreSQL** or **Supabase** for data, and **Terraform** where infrastructure needs to be reproducible. Native mobile is **Kotlin** on Android.\n\nWe pick the stack for the problem, not the other way round — but we do not chase novelty on a client\'s budget.'
            },
            {
                q: 'Who owns the code?',
                a: 'You do. On client builds, ownership transfers on final payment, into a repository you control. We will not hold your codebase, domain or hosting hostage.\n\nLab engagements work differently and are agreed in writing up front.'
            },
            {
                q: 'Can I update the site myself?',
                a: 'It depends on what we build. For content-heavy sites we wire up a CMS so you can edit without touching code. For custom applications, structural changes go through us — but small copy and image updates are usually handled within 24 hours.\n\nWe will tell you which model fits before we start, not after.'
            },
            {
                q: 'Do you offer support after launch?',
                a: 'Yes. Ongoing maintenance — hosting, security updates, backups and support — is available as a monthly retainer, quoted against what your build actually needs to stay healthy.'
            }
        ]
    },
    {
        title: 'Money',
        icon: Shield,
        color: '#ef4444',
        questions: [
            {
                q: 'What does a project cost?',
                a: 'Every project is quoted against its scope. Small focused builds start low; products with integrations, payments and data infrastructure cost considerably more.\n\nThe fastest way to a real number is to tell us what you are trying to do. We will come back with a scope and a price, not a brochure.'
            },
            {
                q: 'What are your payment terms?',
                a: 'We typically require a **50% deposit** to commence work, with the balance due on completion and before go-live. For retainer clients and longer builds we work to milestone-based schedules.'
            },
            {
                q: 'Are there any hidden costs?',
                a: 'No. We are transparent about all costs upfront. The only recurring costs are hosting and maintenance (if you take a retainer) and any third-party subscriptions — payment gateways, APIs, premium services — which we flag and discuss before committing you to them.'
            }
        ]
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggleAccordion = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

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

            {/* FAQ Window */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-4xl mx-auto rounded-2xl border-2 border-[var(--ink-black)] shadow-[8px_8px_0px_0px_var(--shadow-color)] overflow-hidden bg-[var(--card-bg)]"
            >
                {/* Title Bar */}
                <div className="flex items-center justify-between px-5 py-3 bg-[var(--card-bg)] border-b-2 border-[var(--ink-black)]/10">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
                    </div>
                    <div className="flex items-center gap-2 opacity-50">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span className="text-xs font-bold tracking-wider uppercase font-clean">
                            Help Center
                        </span>
                    </div>
                    <div className="w-16" />
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold font-clean tracking-tighter text-ink mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-ink/60 text-lg font-clean max-w-lg mx-auto leading-relaxed">
                            What we build, how we work, what we build it with, and what it costs. Can't find the answer? <a href="mailto:Qromatech@gmail.com" className="underline hover:text-ink font-bold transition-colors">Email us</a>.
                        </p>
                    </div>

                    <div className="grid gap-16">
                        {faqCategories.map((category, catIndex) => (
                            <div key={catIndex}>
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[var(--ink-black)]/5">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-[var(--ink-black)]/10 shadow-sm"
                                        style={{ backgroundColor: category.color + '10', color: category.color }}
                                    >
                                        <category.icon className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-2xl font-bold font-clean text-ink tracking-tight">
                                        {category.title}
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    {category.questions.map((question, qIndex) => {
                                        const id = `${catIndex}-${qIndex}`;
                                        const isOpen = openIndex === id;

                                        return (
                                            <motion.div
                                                key={qIndex}
                                                layout
                                                initial={false}
                                                className={`group rounded-xl border-2 transition-all duration-300 overflow-hidden ${isOpen
                                                    ? 'border-[var(--ink-black)] bg-[var(--bg-paper)] shadow-[4px_4px_0px_0px_var(--shadow-color)] -translate-y-1'
                                                    : 'border-[var(--ink-black)]/10 bg-[var(--bg-paper)] hover:border-[var(--ink-black)]/30 hover:bg-white'
                                                    }`}
                                            >
                                                <button
                                                    onClick={() => toggleAccordion(id)}
                                                    className="flex items-start justify-between w-full p-5 text-left"
                                                >
                                                    <span className={`text-lg font-bold font-clean pr-8 transition-colors ${isOpen ? 'text-ink' : 'text-ink/80 group-hover:text-ink'
                                                        }`}>
                                                        {question.q}
                                                    </span>
                                                    <motion.span
                                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className={`flex-shrink-0 transition-colors ${isOpen ? 'text-ink' : 'text-ink/30 group-hover:text-ink/60'
                                                            }`}
                                                    >
                                                        <ChevronDown className="w-6 h-6" />
                                                    </motion.span>
                                                </button>

                                                <AnimatePresence initial={false}>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                        >
                                                            <div className="px-5 pb-6 pt-0">
                                                                <div className="h-[2px] w-8 bg-[var(--ink-black)]/10 mb-4" />
                                                                <div className="text-base text-ink/70 font-clean leading-relaxed space-y-2">
                                                                    {question.a.split('\n').map((line, i) => (
                                                                        <p key={i}>
                                                                            {line.includes('•') ? (
                                                                                <span className="flex gap-2">
                                                                                    <span className="text-ink/40">•</span>
                                                                                    <span className="flex-1" dangerouslySetInnerHTML={{
                                                                                        __html: line.replace('• ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-bold">$1</strong>')
                                                                                    }} />
                                                                                </span>
                                                                            ) : (
                                                                                <span dangerouslySetInnerHTML={{
                                                                                    __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-bold">$1</strong>')
                                                                                }} />
                                                                            )}
                                                                        </p>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
