import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[var(--bg-paper)] flex flex-col items-center justify-center p-6 text-center">
            <SEO
                title="Page Not Found | Qroma Digital"
                description="The page you are looking for doesn't exist. Return to Qroma Digital's homepage."
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md"
            >
                <h1 className="text-8xl md:text-9xl font-bold font-clean tracking-tighter text-[var(--ink-black)] mb-6">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold font-clean text-[var(--ink-black)] mb-4">
                    Page Not Found
                </h2>
                <p className="text-[var(--ink-black)]/60 font-sketch mb-10 leading-relaxed">
                    Oops! It seems we can't find the page you're looking for. It might have been moved or deleted.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--ink-black)] text-[var(--bg-paper)] rounded-xl font-bold tracking-wide hover:bg-transparent hover:text-[var(--ink-black)] border-2 border-[var(--ink-black)] transition-all duration-300 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Homepage
                </Link>
            </motion.div>
        </div>
    );
}
