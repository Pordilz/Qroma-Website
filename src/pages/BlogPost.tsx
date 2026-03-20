import { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import SEO from '../components/SEO';
import { posts } from '../data/blogs';

// Parse a single line of content into HTML
function parseLine(line: string): string {
    return line
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-bold">$1</strong>')
        // Links [text](url)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-ink underline underline-offset-4 hover:opacity-70 transition-opacity">$1</a>')
        // Bullet points (• style)
        .replace(/^• (.+)/, '<span class="inline-block mr-2 text-ink/50">•</span>$1');
}

// Render the content string into structured React elements
function renderContent(content: string) {
    const paragraphs = content.split('\n\n');
    const elements: React.ReactNode[] = [];
    let faqStarted = false;
    let faqItems: { q: string; a: string }[] = [];
    let currentFaqQ = '';

    for (let i = 0; i < paragraphs.length; i++) {
        const p = paragraphs[i].trim();
        if (!p) continue;

        // FAQ divider
        if (p === '---') {
            faqStarted = true;
            continue;
        }

        // FAQ Q: / A: lines
        if (faqStarted) {
            const faqLines = p.split('\n');
            for (const line of faqLines) {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith('Q: ')) {
                    currentFaqQ = trimmedLine.substring(3);
                } else if (trimmedLine.startsWith('A: ') && currentFaqQ) {
                    faqItems.push({ q: currentFaqQ, a: trimmedLine.substring(3) });
                    currentFaqQ = '';
                }
            }
            continue;
        }

        // H2 heading
        if (p.startsWith('## ') && !p.startsWith('### ')) {
            elements.push(
                <motion.h2
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.05 }}
                    className="text-2xl md:text-3xl font-bold font-clean tracking-tight text-ink mt-12 mb-4"
                >
                    {p.substring(3)}
                </motion.h2>
            );
            continue;
        }

        // H3 heading
        if (p.startsWith('### ')) {
            elements.push(
                <motion.h3
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.05 }}
                    className="text-xl md:text-2xl font-bold font-clean tracking-tight text-ink mt-8 mb-3"
                >
                    {p.substring(4)}
                </motion.h3>
            );
            continue;
        }

        // Check if this paragraph is a list block (lines starting with -)
        const lines = p.split('\n');
        const isListBlock = lines.every(l => l.trim().startsWith('- '));

        if (isListBlock) {
            elements.push(
                <motion.ul
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.05 }}
                    className="mb-8 space-y-2 pl-1"
                >
                    {lines.map((line, j) => (
                        <li
                            key={j}
                            className="flex items-start gap-3 text-ink/80 font-clean text-[17px] md:text-lg leading-relaxed"
                        >
                            <span className="text-ink/30 mt-2 flex-shrink-0">●</span>
                            <span dangerouslySetInnerHTML={{ __html: parseLine(line.trim().substring(2)) }} />
                        </li>
                    ))}
                </motion.ul>
            );
            continue;
        }

        // Regular paragraph
        elements.push(
            <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.05 }}
                className="mb-8"
                dangerouslySetInnerHTML={{ __html: parseLine(p.replace(/\n/g, '<br />')) }}
            />
        );
    }

    return { elements, faqItems };
}

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const post = posts.find((p) => p.slug === slug);

    useEffect(() => {
        if (!post && slug) {
            navigate('/blog', { replace: true });
        }
    }, [post, slug, navigate]);

    const { elements: contentElements, faqItems } = useMemo(
        () => (post ? renderContent(post.content) : { elements: [], faqItems: [] }),
        [post]
    );

    if (!post) return null;

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Build FAQPage JSON-LD if FAQs exist
    const faqSchema = faqItems.length > 0 ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a,
            },
        })),
    }) : null;

    return (
        <div className="min-h-screen bg-[var(--bg-paper)] pt-28 pb-16 px-4 md:px-8">
            <SEO
                title={post.title}
                description={post.excerpt}
                canonical={`https://www.qroma.digital/blog/${post.slug}`}
            />

            {/* FAQPage Schema */}
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: faqSchema }}
                />
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
            >
                {/* Back to Blog */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-sm text-ink/40 hover:text-ink transition-colors font-clean group mb-8"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg"
                        style={{
                            color: post.color,
                            background: post.color + '15',
                        }}
                    >
                        <Tag className="w-3 h-3" />
                        {post.category}
                    </span>
                    <span className="text-xs text-ink/40 flex items-center gap-1 font-clean">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.date)}
                    </span>
                    <span className="text-xs text-ink/40 flex items-center gap-1 font-clean">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                    </span>
                    <span className="text-xs text-ink/40 flex items-center gap-1 font-clean">
                        <User className="w-3 h-3" />
                        {post.author}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-clean tracking-tighter text-ink mb-8 leading-tight">
                    {post.title}
                </h1>

                {/* Divider */}
                <div className="h-[2px] bg-[var(--ink-black)]/10 mb-10" />

                {/* Content */}
                <div className="prose-custom text-ink/80 font-clean text-[17px] md:text-lg leading-relaxed pb-16">
                    {contentElements}
                </div>

                {/* FAQ Section */}
                {faqItems.length > 0 && (
                    <div className="border-t-2 border-[var(--ink-black)]/10 pt-10 mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold font-clean tracking-tight text-ink mb-8">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-6">
                            {faqItems.map((faq, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-30px" }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="p-5 rounded-xl border-2 border-[var(--ink-black)]/10 bg-[var(--card-bg,var(--bg-paper))]"
                                >
                                    <h3 className="text-lg font-bold font-clean text-ink mb-2">
                                        {faq.q}
                                    </h3>
                                    <p className="text-ink/70 font-clean text-[15px] md:text-base leading-relaxed">
                                        {faq.a}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer Read Next / CTA */}
                <div className="border-t-2 border-[var(--ink-black)]/10 pt-10 mt-10">
                    <h3 className="text-2xl font-bold font-clean text-ink mb-4 tracking-tighter">Ready to scale your business?</h3>
                    <p className="text-ink/60 font-clean mb-6">If you enjoyed this read and are looking for expert web development and automation in South Africa, get in touch with Qroma Digital today.</p>
                    <Link
                        to="/#contact"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--ink-black)] text-[var(--bg-paper)] rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-transparent hover:text-[var(--ink-black)] border-2 border-[var(--ink-black)] transition-all duration-300"
                    >
                        Work with Us
                    </Link>
                </div>

            </motion.div>
        </div>
    );
}
