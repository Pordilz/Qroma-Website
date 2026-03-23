import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
    {
        q: 'How much does web design cost in Durban?',
        a: 'Qroma Digital\'s web design packages range from R3,500 to R18,000 depending on project scope. A starter business website starts from R3,500. Custom multi-page sites start from R7,500. eCommerce stores from R12,000.'
    },
    {
        q: 'Does Qroma Digital offer business automation in Durban?',
        a: 'Yes. Qroma Digital is one of the only agencies in KZN offering full business automation including CRM setup, WhatsApp automation, Zapier integrations and workflow design for SMEs.'
    },

    {
        q: 'What areas in KZN do you serve?',
        a: 'We\'re headquartered in Durban and serve all of KZN including Umhlanga, Hillcrest, Westville, Pinetown, Ballito, Pietermaritzburg, and nationally across South Africa.'
    },
    {
        q: 'What services does Qroma provide?',
        a: 'We specialize in custom web development, digital marketing strategies, and business automation software tailored for South African businesses.'
    },
    {
        q: 'How long does a website take to build?',
        a: 'A standard business website takes 5–14 days. eCommerce stores typically take 14–30 days. Rush turnaround is available — contact us.'
    },
    {
        q: 'What is WhatsApp business automation?',
        a: 'WhatsApp automation uses software to automatically reply to customer enquiries, send quotes, confirm appointments, and follow up with leads — without manual effort. Qroma Digital sets this up for Durban and South African businesses.'
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
                        Everything you need to know about our services, process, and pricing.
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
