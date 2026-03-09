import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import SEO from '../components/SEO';
import { posts } from '../data/blogs';

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const post = posts.find((p) => p.slug === slug);

    useEffect(() => {
        if (!post && slug) {
            navigate('/blog', { replace: true });
        }
    }, [post, slug, navigate]);

    if (!post) return null;

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-[var(--bg-paper)] pt-28 pb-16 px-4 md:px-8">
            <SEO
                title={post.title}
                description={post.excerpt}
                canonical={`https://www.qroma.digital/blog/${post.slug}`}
            />

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
                <div className="prose-custom text-ink/80 font-clean text-[17px] md:text-lg leading-relaxed whitespace-pre-line pb-16">
                    {post.content.split('\\n\\n').map((paragraph, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.05 }}
                            className="mb-8"
                            dangerouslySetInnerHTML={{
                                __html: paragraph
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-bold">$1</strong>')
                                    .replace(/• /g, '<span class="inline-block mr-2 text-ink/50">•</span>')
                            }}
                        />
                    ))}
                </div>

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
