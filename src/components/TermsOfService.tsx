import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, FileText } from 'lucide-react';

const sections = [
    {
        title: '1. Acceptance of Terms',
        content:
            'By engaging Qromatech for services—including Web Development, Maintenance, Digital Marketing, or Automation—you agree to these Terms of Service.',
    },
    {
        title: '2. Services and Scope',
        content:
            '• Web Development: Packages include Starter Sites (R3,500), Small Business Sites (R8,500), and E-Commerce Stores (R18,000).\n• Maintenance: Monthly hosting, security updates, and backups are provided under our "Peace of Mind" maintenance plan (R300/mo).\n• Marketing: Visual Content Packs include 10 custom-designed images per month (R1,000/mo).\n• Automation: Custom workflow solutions are quoted based on complexity.',
    },
    {
        title: '3. Client Obligations',
        content:
            '• Content Delivery: You acknowledge that "Project timelines strictly begin after receipt of all client content" (text, images, branding assets).\n• Domain Registration: You are responsible for registering your own domain name; this is handled separately from our packages.\n• Approvals: You agree to participate in milestone reviews to approve major phases of the project.',
    },
    {
        title: '4. Payment and Pricing',
        content:
            '• Fees: Services are billed according to the agreed package.\n• Subscriptions: Monthly services are billed on a recurring basis.\n• Discounts: An annual discount of 20% applies if 12 months of maintenance are paid upfront (Total Annual Saving: R600).\n• Refunds: Deposits are non-refundable once work has commenced.',
    },
    {
        title: '5. Intellectual Property',
        content:
            '• Client Content: You retain ownership of all branding assets and content you provide.\n• Deliverables: Upon full payment, you obtain rights to the final website design and custom images produced for your brand.',
    },
    {
        title: '6. Timelines and Delays',
        content:
            '• Estimated turnaround times (e.g., 5 days for Starter Sites, 3–4 weeks for E-Commerce) depend on your timely cooperation.\n• We provide transparency through weekly reports every Friday to track progress and identify roadblocks.',
    },
    {
        title: '7. Limitation of Liability',
        content:
            'While we provide "Reliable & Secure Hosting" and backups, Qromatech is not liable for data loss or downtime caused by third-party service providers or unforeseen circumstances beyond our reasonable control.',
    },
    {
        title: '8. Contact',
        content:
            'To book a consultation or discuss these terms, contact us at:\n\nEmail: Qromatech@gmail.com',
    },
];

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-[var(--bg-paper)] pt-24 pb-16 px-4 md:px-8">
            {/* Back to home */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-4xl mx-auto mb-6"
            >
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-ink/40 hover:text-ink transition-colors font-clean group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
            </motion.div>

            {/* Document Window */}
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
                    <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-ink/40" />
                        <span className="text-sm font-bold tracking-wider uppercase text-ink/60 font-clean">
                            Terms of Service
                        </span>
                    </div>
                    <div className="w-16" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 lg:p-14">
                    <div className="max-w-2xl mx-auto">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-14 rounded-lg flex items-center justify-center border-2 border-amber-500/30 bg-amber-500/10">
                                <FileText className="w-6 h-6 text-amber-500" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-clean tracking-tighter text-ink mb-2 leading-tight">
                            Terms of Service
                        </h1>
                        <p className="text-sm text-ink/40 font-clean mb-2">
                            Qromatech (Pty) Ltd
                        </p>
                        <p className="text-sm text-ink/40 font-clean mb-8">
                            Last Updated: 17 February 2026
                        </p>

                        <div className="h-[2px] bg-[var(--ink-black)]/10 mb-8" />

                        {/* Sections */}
                        {sections.map((section, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="mb-8"
                            >
                                <h2 className="text-lg md:text-xl font-bold font-clean text-ink mb-3">
                                    {section.title}
                                </h2>
                                <div className="text-ink/70 font-clean text-base leading-relaxed whitespace-pre-line">
                                    {section.content.split('\n\n').map((para, j) => (
                                        <p
                                            key={j}
                                            className="mb-4"
                                            dangerouslySetInnerHTML={{
                                                __html: para.replace(
                                                    /• /g,
                                                    '<span class="inline-block mr-2">•</span>'
                                                ),
                                            }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
