import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const pricingTiers = [
    {
        name: 'Starter Website',
        price: 'R3,500',
        description: 'Perfect for new businesses needing a professional digital presence.',
        features: ['1-3 Pages', 'Mobile Responsive', 'Basic SEO Setup', 'Contact Form', 'WhatsApp Button'],
        highlight: false
    },
    {
        name: 'Business Website',
        price: 'R7,500',
        description: 'Comprehensive multi-page site built for lead generation.',
        features: ['Up to 10 Pages', 'Advanced SEO setup', 'CMS Integration', 'Custom Animations', 'Performance Optimized'],
        highlight: false
    },
    {
        name: 'eCommerce Store',
        price: 'R12,000',
        description: 'Fully functional online store to sell your products 24/7.',
        features: ['Payment Gateway (PayFast)', 'Product Management', 'Cart & Checkout', 'Inventory Sync', 'Mobile-First Shopping'],
        highlight: false
    },
    {
        name: 'The Qroma Bundle',
        price: 'R18,000',
        description: 'Web + SEO + Automation. The ultimate growth engine.',
        features: ['Custom Web App/Site', 'Local Google Maps SEO', 'WhatsApp Automation', 'CRM Setup', 'Lead Workflows'],
        highlight: true
    }
];

export default function Pricing() {
    return (
        <section className="py-24 px-6 md:px-8 bg-[var(--bg-paper)] relative overflow-hidden" id="pricing">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold font-clean tracking-tighter text-[var(--ink-black)] mb-6">
                        Transparent Pricing. No Hidden Fees.
                    </h2>
                    <p className="text-xl text-[var(--ink-black)]/60 font-clean max-w-2xl mx-auto">
                        High-converting digital systems built for Durban businesses.
                        Final pricing depends on project scope. Contact us for a free quote.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pricingTiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`flex flex-col p-8 rounded-3xl border-2 transition-transform duration-300 hover:-translate-y-2 ${tier.highlight
                                ? 'bg-[var(--ink-black)] text-[var(--bg-paper)] border-[var(--ink-black)] shadow-[8px_8px_0px_0px_var(--shadow-color)]'
                                : 'bg-[var(--bg-paper)] text-[var(--ink-black)] border-[var(--ink-black)]/20 hover:border-[var(--ink-black)]'
                                }`}
                        >
                            <div className="mb-8">
                                <h3 className={`text-2xl font-bold font-clean tracking-tight mb-4 ${tier.highlight ? 'text-white' : ''}`}>
                                    {tier.name}
                                </h3>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-sm font-bold opacity-60">from</span>
                                    <span className="text-5xl font-bold tracking-tighter">{tier.price}</span>
                                </div>
                                <p className={`text-sm ${tier.highlight ? 'text-white/70' : 'text-[var(--ink-black)]/60'}`}>
                                    {tier.description}
                                </p>
                            </div>

                            <div className="flex-1 space-y-4 mb-8">
                                {tier.features.map((feature, fIndex) => (
                                    <div key={fIndex} className="flex items-start gap-3">
                                        <Check className={`w-5 h-5 shrink-0 ${tier.highlight ? 'text-white' : 'text-[var(--ink-black)]'}`} />
                                        <span className={`text-sm font-medium ${tier.highlight ? 'text-white/90' : 'text-[var(--ink-black)]/80'}`}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
