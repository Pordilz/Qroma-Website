import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, FileText } from 'lucide-react';

const sections = [
    {
        title: '1. Introduction',
        content:
            'Qromatech ("we," "us," or "our")—your "Digital Growth Partners"—is committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information when you engage with our web development, automation, and marketing services.',
    },
    {
        title: '2. Information We Collect',
        content:
            'We collect information necessary to deliver our tailored business solutions, including:\n\n• Client Information: Name, business name, email address (used for weekly reports), and contact details.\n• Project Assets: Text, images, branding assets, and other content you provide for your website or marketing materials.\n• Business Data: Information required for automation services, such as invoicing details, lead management data, and CRM credentials.',
    },
    {
        title: '3. How We Use Your Information',
        content:
            'We use your data to:\n\n• Provide Services: Design websites, manage hosting, and create visual content.\n• Automate Workflows: Build custom systems that connect your apps (email, CRM, spreadsheets) to save you time.\n• Communication: Send weekly progress reports every Friday and coordinate milestone reviews.\n• Maintenance: Perform weekly automated backups and software updates to keep your site secure.',
    },
    {
        title: '4. Data Sharing and Operators',
        content:
            'To fulfill our "Integration Support" and automation services, we may integrate your data with third-party platforms you utilize, such as:\n\n• Social media platforms (Meta, Google, TikTok) for platform-optimized content.\n• Payment processors for e-commerce functionality.\n• External hosting providers to ensure fast loading speeds and uptime.',
    },
    {
        title: '5. Data Security',
        content:
            'We implement "Standard Care" protocols to protect your digital foundation. This includes:\n\n• Weekly Automated Backups: Ensuring your data is safe and recoverable.\n• Security Updates: Keeping software and plugins updated against threats.',
    },
    {
        title: '6. Contact Us',
        content:
            'For privacy-related inquiries, please contact us at:\n\nEmail: Qromatech@gmail.com',
    },
];

export default function PrivacyPolicy() {
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
                        <Shield className="w-4 h-4 text-ink/40" />
                        <span className="text-sm font-bold tracking-wider uppercase text-ink/60 font-clean">
                            Privacy Policy
                        </span>
                    </div>
                    <div className="w-16" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 lg:p-14">
                    <div className="max-w-2xl mx-auto">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-14 rounded-lg flex items-center justify-center border-2 border-blue-500/30 bg-blue-500/10">
                                <FileText className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-clean tracking-tighter text-ink mb-2 leading-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-sm text-ink/40 font-clean mb-2">
                            Qromatech (Pty) Ltd
                        </p>
                        <p className="text-sm text-ink/40 font-clean mb-8">
                            Effective Date: 17 February 2026
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
