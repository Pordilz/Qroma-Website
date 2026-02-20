import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, Check, Mail, Instagram, ArrowUpRight, ChevronDown, Globe, Megaphone, Zap, Palette, Wrench, Minimize2, Download } from 'lucide-react';
import BlurText from './BlurText';

export default function InteractiveContact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const serviceOptions = [
        { value: 'web', label: 'Web Development', icon: Globe },
        { value: 'marketing', label: 'Digital Marketing', icon: Megaphone },
        { value: 'automation', label: 'Business Automation', icon: Zap },
        { value: 'branding', label: 'Brand Identity', icon: Palette },
        { value: 'other', label: 'Custom Solution', icon: Wrench },
    ];

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close expanded view on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsExpanded(false);
        };
        if (isExpanded) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isExpanded]);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [formData.message]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_KEY,
                    subject: `New Contact: ${formData.subject || 'General Inquiry'}`,
                    from_name: formData.name,
                    name: formData.name,
                    email: formData.email,
                    service: formData.subject,
                    message: formData.message,
                }),
            });
            const data = await response.json();
            if (data.success) {
                setIsSuccess(true);
            } else {
                console.error('Form submission failed:', data);
                alert('Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error('Form submission error:', err);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactDetails = [
        {
            label: 'Email',
            value: 'Qromatech@gmail.com',
            href: 'mailto:Qromatech@gmail.com',
            icon: Mail,
        },
        {
            label: 'Instagram',
            value: '@qromadigital',
            href: 'https://www.instagram.com/qromadigital/?utm_source=ig_web_button_share_sheet',
            icon: Instagram,
            external: true,
        },
    ];

    return (
        <section id="contact" className="relative min-h-screen py-24 md:py-32 px-4 md:px-6 bg-paper overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20">
                    <BlurText
                        text="Let's Get in Touch"
                        className="text-5xl md:text-7xl font-bold font-clean tracking-tighter text-ink mb-6"
                        delay={80}
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg md:text-xl text-ink/50 max-w-xl mx-auto font-sketch"
                    >
                        Don't be afraid to say hello!
                    </motion.p>
                </div>

                {/* Fullscreen backdrop */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsExpanded(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105]"
                        />
                    )}
                </AnimatePresence>

                {/* ===== Split Card ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`grid grid-cols-1 lg:grid-cols-2 rounded-3xl border-2 border-[var(--ink-black)] shadow-[8px_8px_0px_0px_var(--shadow-color)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded
                        ? 'fixed top-24 bottom-4 left-4 right-4 md:inset-8 lg:inset-12 z-[110] max-w-none overflow-auto no-scrollbar'
                        : 'relative z-10 overflow-hidden'
                        }`}>
                    {/* ---- Left: Info Panel ---- */}
                    <div className="bg-[var(--card-bg)] p-8 md:p-12 lg:p-14 flex flex-col justify-between relative">
                        {/* Expand/Collapse button in corner */}
                        <motion.button
                            type="button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full border-2 border-[var(--ink-black)]/20 flex items-center justify-center text-ink/40 bg-[var(--card-bg)] hover:bg-[var(--ink-black)] hover:text-[var(--bg-paper)] transition-all duration-300 cursor-pointer z-10"
                            title={isExpanded ? 'Collapse' : 'Expand'}
                        >
                            <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                            </motion.div>
                        </motion.button>

                        <div>
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl md:text-4xl lg:text-5xl font-bold font-clean tracking-tighter text-ink mb-4 leading-tight"
                            >
                                Let's work
                                <br />
                                together<span className="text-ink/30">.</span>
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="text-ink/50 font-sketch text-base md:text-lg mb-10 max-w-sm leading-relaxed"
                            >
                                We're excited to hear from you and learn about your project. Let's create something extraordinary.
                            </motion.p>

                            {/* Horizontal divider */}
                            <div className="hidden lg:flex items-center gap-3 mb-10">
                                <div className="flex-1 h-[2px] bg-[var(--ink-black)]/10" />
                            </div>

                            {/* Contact Details */}
                            <div className="space-y-6">
                                {contactDetails.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.a
                                            key={item.label}
                                            href={item.href}
                                            target={item.external ? '_blank' : undefined}
                                            rel={item.external ? 'noopener noreferrer' : undefined}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                            whileHover={{ x: 4 }}
                                            className="flex items-center gap-4 group"
                                        >
                                            <div className="w-10 h-10 rounded-full border-2 border-[var(--ink-black)]/20 flex items-center justify-center text-ink/50 group-hover:bg-[var(--ink-black)] group-hover:text-[var(--bg-paper)] transition-all duration-300">
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-ink/30 font-bold uppercase tracking-[0.15em] mb-0.5">
                                                    {item.label}
                                                </div>
                                                <div className="text-sm font-bold text-ink group-hover:underline underline-offset-2 transition-colors">
                                                    {item.value}
                                                </div>
                                            </div>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Bottom Quote */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            className="hidden lg:block text-ink/20 font-sketch text-xs mt-12 italic"
                        >
                            "Design is how it works." — Steve Jobs
                        </motion.p>
                    </div>

                    {/* ---- Right: Form Panel (Dark) ---- */}
                    <div className="bg-[#121212] p-8 md:p-12 lg:p-14 relative">
                        <AnimatePresence mode="wait">
                            {!isSuccess ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleSubmit}
                                    className="h-full flex flex-col"
                                >
                                    <motion.h4
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                        className="text-lg font-bold text-white uppercase tracking-[0.2em] mb-10 font-clean"
                                    >
                                        Contact
                                    </motion.h4>

                                    <div className="flex-1 space-y-0">
                                        {/* Row 1: Name & Email */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                                            <div className="py-5 border-b border-white/10 group">
                                                <label className="block text-[10px] font-bold text-white/70 uppercase tracking-[0.15em] mb-2">
                                                    Name <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Your full name"
                                                    required
                                                    className="w-full bg-transparent text-white placeholder-white/30 outline-none text-base font-medium caret-white"
                                                />
                                            </div>
                                            <div className="py-5 border-b border-white/10 group">
                                                <label className="block text-[10px] font-bold text-white/70 uppercase tracking-[0.15em] mb-2">
                                                    Email <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="your@email.com"
                                                    required
                                                    className="w-full bg-transparent text-white placeholder-white/30 outline-none text-base font-medium caret-white"
                                                />
                                            </div>
                                        </div>

                                        {/* Row 2: Subject */}
                                        <div className="grid grid-cols-1 gap-x-8">
                                            <div className="py-5 border-b border-white/10 relative" ref={dropdownRef}>
                                                <label className="block text-[10px] font-bold text-white/70 uppercase tracking-[0.15em] mb-2">
                                                    Subject
                                                </label>
                                                {/* Custom Dropdown Trigger */}
                                                <button
                                                    type="button"
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                    className="w-full flex items-center justify-between text-left bg-transparent outline-none text-base font-medium cursor-pointer group"
                                                >
                                                    <span className={formData.subject ? 'text-white' : 'text-white/50'}>
                                                        {formData.subject
                                                            ? serviceOptions.find(o => o.value === formData.subject)?.label
                                                            : 'Select a service'}
                                                    </span>
                                                    <motion.div
                                                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                                                    >
                                                        <ChevronDown className="w-4 h-4 text-white/70" />
                                                    </motion.div>
                                                </button>

                                                {/* Animated Dropdown Menu */}
                                                <AnimatePresence>
                                                    {isDropdownOpen && (
                                                        <motion.ul
                                                            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                                                            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                                                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                                            className="absolute left-0 right-0 top-full mt-2 z-50 bg-[var(--bg-paper)] rounded-xl border-2 border-[var(--ink-black)]/10 shadow-[4px_4px_0px_0px_var(--shadow-color)] overflow-hidden origin-top"
                                                        >
                                                            {serviceOptions.map((option, index) => {
                                                                const Icon = option.icon;
                                                                const isSelected = formData.subject === option.value;
                                                                return (
                                                                    <motion.li
                                                                        key={option.value}
                                                                        initial={{ opacity: 0, x: -10 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ delay: index * 0.04 }}
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setFormData(prev => ({ ...prev, subject: option.value }));
                                                                                setIsDropdownOpen(false);
                                                                            }}
                                                                            className={`w-full flex items-center gap-3 px-5 py-3.5 text-left text-sm font-medium transition-all duration-200 ${isSelected
                                                                                ? 'bg-[var(--ink-black)] text-[var(--bg-paper)]'
                                                                                : 'text-[var(--ink-black)] hover:bg-[var(--ink-black)]/5'
                                                                                }`}
                                                                        >
                                                                            <Icon className="w-4 h-4 flex-shrink-0" />
                                                                            <span>{option.label}</span>
                                                                            {isSelected && (
                                                                                <motion.div
                                                                                    initial={{ scale: 0 }}
                                                                                    animate={{ scale: 1 }}
                                                                                    className="ml-auto"
                                                                                >
                                                                                    <Check className="w-4 h-4" />
                                                                                </motion.div>
                                                                            )}
                                                                        </button>
                                                                    </motion.li>
                                                                );
                                                            })}
                                                        </motion.ul>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        {/* Row 3: Message */}
                                        <div className="py-5 border-b border-white/10">
                                            <label className="block text-[10px] font-bold text-white/70 uppercase tracking-[0.15em] mb-2">
                                                Message <span className="text-red-400">*</span>
                                            </label>
                                            <textarea
                                                ref={textareaRef}
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                placeholder="Tell us about your project..."
                                                required
                                                rows={3}
                                                className="w-full bg-transparent text-white placeholder-white/30 outline-none text-base font-medium resize-none caret-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full mt-10 px-8 py-5 bg-white text-[#121212] font-bold tracking-widest uppercase text-sm rounded-xl border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            <>
                                                <span>Send to Us</span>
                                                <Send className="w-4 h-4" />
                                            </>
                                        )}
                                    </motion.button>
                                </motion.form>
                            ) : (
                                /* ===== Success State ===== */
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex flex-col items-center justify-center text-center py-16 min-h-[450px]"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                        className="w-20 h-20 rounded-full bg-white text-[#121212] flex items-center justify-center mb-8"
                                    >
                                        <Check className="w-10 h-10" />
                                    </motion.div>
                                    <h3 className="text-3xl md:text-4xl font-bold font-clean tracking-tighter text-white mb-4">
                                        Message Sent!
                                    </h3>
                                    <p className="text-base text-white/40 font-sketch max-w-sm mx-auto mb-10 leading-relaxed">
                                        Thanks {formData.name}! We'll get back to you at{' '}
                                        <span className="text-white/70 font-bold">{formData.email}</span> shortly.
                                    </p>
                                    <motion.button
                                        onClick={() => {
                                            setIsSuccess(false);
                                            setFormData({ name: '', email: '', subject: '', message: '' });
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3 rounded-xl border-2 border-white/20 text-white font-bold hover:bg-white hover:text-[#121212] transition-all duration-300"
                                    >
                                        Send Another
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div >

            {/* ===== Footer ===== */}
            < div className="text-center mt-32 pb-8 border-t-2 border-ink-black/5 pt-8 max-w-7xl mx-auto" >
                <div className="text-3xl font-bold text-ink mb-4 tracking-tighter">QROMA</div>
                <div className="flex flex-wrap justify-center gap-3 text-sm font-medium">
                    <Link to="/privacy" className="bg-[var(--ink-black)] text-[var(--bg-paper)] px-4 py-1.5 rounded-full border-2 border-[var(--ink-black)] hover:bg-transparent hover:text-[var(--ink-black)] transition-all duration-300">
                        Privacy Policy
                    </Link>
                    <Link to="/terms" className="bg-[var(--ink-black)] text-[var(--bg-paper)] px-4 py-1.5 rounded-full border-2 border-[var(--ink-black)] hover:bg-transparent hover:text-[var(--ink-black)] transition-all duration-300">
                        Terms of Service
                    </Link>
                    <a
                        href="/proposal.pdf"
                        download="Qroma_Proposal.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[var(--ink-black)] text-[var(--bg-paper)] px-4 py-1.5 rounded-full border-2 border-[var(--ink-black)] hover:bg-transparent hover:text-[var(--ink-black)] transition-all duration-300 flex items-center gap-2"
                    >
                        <Download size={14} />
                        Service Proposal
                    </a>
                    <Link to="/faq" className="bg-[var(--ink-black)] text-[var(--bg-paper)] px-4 py-1.5 rounded-full border-2 border-[var(--ink-black)] hover:bg-transparent hover:text-[var(--ink-black)] transition-all duration-300">
                        Help Center
                    </Link>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <a
                        href="https://www.instagram.com/qromadigital/?utm_source=ig_web_button_share_sheet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border-2 border-[var(--ink-black)] flex items-center justify-center bg-[var(--ink-black)] text-[var(--bg-paper)] hover:bg-transparent hover:text-[var(--ink-black)] transition-all duration-300"
                    >
                        <Instagram className="w-5 h-5" />
                    </a>
                </div>

                <div className="mt-8 text-ink/40 text-xs">© 2026 Qroma. All rights reserved.</div>
            </div >
        </section >
    );
}
