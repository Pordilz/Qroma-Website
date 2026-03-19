import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const pricingTiers = [
    {
        name: 'Entry / Essential',
        price: 'R3,500',
        description: 'Budget-friendly tier for new businesses needing a professional digital presence.',
        features: ['Up to 3 Pages', 'Mobile Responsive', 'Basic SEO Setup', 'Contact Form', 'WhatsApp Button'],
        highlight: false
    },
    {
        name: 'Premium / Pro',
        price: 'R12,000',
        description: 'Comprehensive tier built for lead generation and e-commerce readiness.',
        features: ['Up to 10 Pages', 'Advanced SEO Setup', 'Payment Gateway (PayFast)', 'Custom Animations', 'Performance Optimized'],
        highlight: true
    },
    {
        name: 'Custom / Enterprise',
        price: 'Custom Pricing',
        description: 'Bespoke solutions based on specific requirements, available for local and international clients.',
        features: ['Custom Web App/Site', 'Tailored SEO & Automation', 'CRM Setup', 'Lead Workflows', 'Dedicated Support'],
        highlight: false
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
