import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, ChevronDown, Zap, Globe, Shield } from 'lucide-react';
import { useState } from 'react';

const faqCategories = [
    {
        title: 'General',
        icon: HelpCircle,
        color: '#3b82f6',
        questions: [
            {
                q: 'What services does Qroma offer?',
                a: 'We specialize in three core areas:\n\n• **Web Development:** Custom high-performance websites and e-commerce stores.\n• **Automation:** Streamlining business processes with custom workflows and integrations.\n• **Digital Marketing:** Strategic growth campaigns and content creation to boost your online presence.'
            },
            {
                q: 'Where are you based?',
                a: 'We are proudly based in **Durban, South Africa**, but we work with clients globally. Our digital-first approach means we can collaborate effectively regardless of location.'
            },
            {
                q: 'Do you offer support after launch?',
                a: 'Absolutely. We offer a "Peace of Mind" maintenance plan (R300/mo) which includes reliable hosting, weekly security updates, automated backups, and tech support so you never have to worry about your site going down.'
            }
        ]
    },
    {
        title: 'Web Development',
        icon: Globe,
        color: '#10b981',
        questions: [
            {
                q: 'How long does it take to build a website?',
                a: 'Timelines vary based on complexity:\n\n• **Starter Sites:** Typically 5-7 days\n• **Small Business Sites:** 2-3 weeks\n• **E-Commerce Stores:** 3-4 weeks\n\nNote: Timelines strictly begin once we have received all your content (text, images, branding).'
            },
            {
                q: 'Will my website work on mobile phones?',
                a: 'Yes! Every site we build is **fully responsive** and optimized for all devices—from large desktop monitors to tablets and smartphones.'
            },
            {
                q: 'Can I update the website myself?',
                a: 'We build custom-coded sites for maximum performance and design flexibility, which means updates are handled directly in the code. For small text or image changes, simply send us a message and we handle it for you—often within 24 hours. For larger feature updates, we\'ll discuss the requirements and implement them for you.'
            }
        ]
    },
    {
        title: 'Automation & Marketing',
        icon: Zap,
        color: '#f59e0b',
        questions: [
            {
                q: 'What is business automation?',
                a: 'Automation involves using software to handle repetitive tasks—like sending follow-up emails, syncing leads to a spreadsheet, or generating invoices. We build custom workflows that save you hours of manual work every week.'
            },
            {
                q: 'How does the WhatsApp integration work?',
                a: 'We can integrate WhatsApp directly into your site or sales process, allowing customers to book appointments, ask questions, or receive updates instantly on the platform they use most.'
            }
        ]
    },
    {
        title: 'Pricing & Payments',
        icon: Shield,
        color: '#ef4444',
        questions: [
            {
                q: 'What are your payment terms?',
                a: 'We typically require a **50% deposit** to commence work, with the remaining 50% due upon completion and before the site goes live. For verified ongoing clients, we may offer milestone-based payment plans.'
            },
            {
                q: 'Are there any hidden costs?',
                a: 'No. We are transparent about all costs upfront. The only recurring cost is for hosting/maintenance (if you choose our plan) and any third-party software subscriptions (like tailored premium plugins) which we will discuss with you beforehand.'
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
                            Everything you need to know about our services, process, and pricing. Can't find the answer? <a href="mailto:Qromatech@gmail.com" className="underline hover:text-ink font-bold transition-colors">Email us</a>.
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
