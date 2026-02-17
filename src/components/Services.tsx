import { Code, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import BlurText from './BlurText';
import SpotlightCard from './SpotlightCard';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom sites and applications built with architectural precision.',
    features: [
      'Responsive design',
      'Progressive web apps',
      'E-commerce platforms',
      'Custom applications',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Data-driven strategies drafted for measurable growth.',
    features: [
      'SEO optimization',
      'Content strategy',
      'Social media marketing',
      'Performance analytics',
    ],
  },
  {
    icon: Zap,
    title: 'Business Automation',
    description: 'Streamlined operations with intelligent workflow design.',
    features: [
      'Process automation',
      'AI integration',
      'Workflow optimization',
      'Custom API development',
    ],
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative min-h-screen py-32 px-6 bg-paper">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <BlurText
            text="Our Services"
            className="text-5xl md:text-6xl font-bold font-clean tracking-tighter text-ink mb-6"
            delay={80}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-ink/70 max-w-2xl mx-auto font-sketch"
          >
            Three pillars of excellence designed to transform your digital presence
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative group"
              >
                <SpotlightCard className="relative bg-[var(--card-bg)] sketch-border p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_var(--shadow-color)] border-b-4 border-b-[var(--ink-black)]">

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 mb-6 rounded-full border-2 border-[var(--ink-black)] flex items-center justify-center transform transition-transform duration-500 ${hoveredIndex === index ? 'rotate-12 bg-[var(--ink-black)] text-[var(--bg-paper)]' : 'bg-transparent text-[var(--ink-black)]'
                        }`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-bold text-ink mb-4 font-sketch">
                      {service.title}
                    </h3>
                    <p className="text-ink/70 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * idx }}
                          className="flex items-center text-ink/80 text-sm font-medium"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-ink-black mr-3" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
