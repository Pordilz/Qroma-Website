import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
    {
        q: 'What kind of work does Qroma take on?',
        a: 'We build software — web applications, platforms, native mobile apps, data pipelines and the infrastructure under them. We also design the brand and interface that goes on top. If it needs to be designed and engineered as one thing, that is our shape of work.'
    },
    {
        q: 'Is Qroma an agency or a product studio?',
        a: 'Both, deliberately. We build and run our own products — Halaq, The Ledger, VidMetrics — and we take on a small number of client builds each year. Running our own products is what keeps the client work sharp: we make the same decisions on our own time and money first.'
    },
    {
        q: 'How do you price a project?',
        a: 'We scope the work and quote it. There are three ways to engage: Build for a defined project with a fixed scope and timeline, Partner for an ongoing monthly retainer with reserved capacity, and Lab where we co-build a product with shared risk and upside. We stopped selling fixed packages because they priced pages instead of outcomes.'
    },
    {
        q: 'How long does a build take?',
        a: 'A focused marketing site is typically 2–4 weeks. A web application with real functionality runs 6–12 weeks. Products with integrations, payments or data pipelines take longer. We work in shipped increments, so there is something running and reviewable from week one.'
    },
    {
        q: 'Who owns the code you write?',
        a: 'You do, on client builds — transferred on final payment, in a repository you control. We will not hold your codebase, domain or hosting hostage. Lab engagements are structured differently and agreed up front.'
    },
    {
        q: 'Do you still build standard business websites?',
        a: 'Yes. A well-built marketing site is still one of the highest-return things a business can own, and we build plenty of them. The difference is that we treat it as a product with a job to do rather than a number of pages on a price list.'
    },
    {
        q: 'Where are you based and who do you work with?',
        a: 'We are based in Durban, KwaZulu-Natal, and work with clients across South Africa and internationally. Software does not care where it is written — most of our work is remote by default.'
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a,
            },
        })),
    });

    return (
        <section className="py-24 px-6 md:px-8 bg-[var(--bg-paper)] relative">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: faqSchema }}
            />
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold font-clean tracking-tighter text-[var(--ink-black)] mb-6">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-[var(--ink-black)]/60 font-clean mb-8">
                        What we build, how we work, and what it costs to work with us.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div
                                key={index}
                                layout
                                initial={false}
                                className={`group rounded-xl border-2 transition-all duration-300 overflow-hidden ${isOpen
                                    ? 'border-[var(--ink-black)] bg-[var(--bg-paper)] shadow-[4px_4px_0px_0px_var(--shadow-color)]'
                                    : 'border-[var(--ink-black)]/10 bg-[var(--bg-paper)] hover:border-[var(--ink-black)]/30 hover:bg-white'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="flex items-start justify-between w-full p-6 text-left"
                                >
                                    <span className={`text-xl font-bold font-clean pr-8 transition-colors ${isOpen ? 'text-[var(--ink-black)]' : 'text-[var(--ink-black)]/80 group-hover:text-[var(--ink-black)]'}`}>
                                        {faq.q}
                                    </span>
                                    <motion.span
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex-shrink-0 transition-colors mt-1 ${isOpen ? 'text-[var(--ink-black)]' : 'text-[var(--ink-black)]/30 group-hover:text-[var(--ink-black)]/60'}`}
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
                                            <div className="px-6 pb-6 pt-0">
                                                <div className="text-lg text-[var(--ink-black)]/70 font-clean leading-relaxed">
                                                    {faq.a}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/faq" className="inline-flex items-center gap-2 text-[var(--ink-black)] font-bold tracking-tight hover:underline">
                        <HelpCircle className="w-5 h-5" />
                        View Full FAQ
                    </Link>
                </div>
            </div>
        </section>
    );
}
