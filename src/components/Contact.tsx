import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram } from 'lucide-react';
import { useState } from 'react';
import BlurText from './BlurText';

export default function Contact() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'Qromatech@gmail.com',
      href: 'mailto:Qromatech@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'South Africa',
      href: '#',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@qromadigital',
      href: 'https://www.instagram.com/qromadigital/?utm_source=ig_web_button_share_sheet',
    },
  ];

  return (
    <section id="contact" className="relative min-h-screen py-32 px-6 bg-paper">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <BlurText
            text="Let's Work Together"
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
            Ready to draft your future?
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8 mb-12">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-full border-2 border-[var(--ink-black)] flex items-center justify-center bg-[var(--card-bg)] group-hover:bg-[var(--ink-black)] group-hover:text-[var(--bg-paper)] transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-ink/50 mb-1 font-bold uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="text-lg font-bold text-ink hover:underline">
                        {item.value}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-lg border-2 border-[var(--ink-black)] bg-[var(--card-bg)] shadow-[4px_4px_0px_0px_var(--shadow-color)]"
            >
              <h3 className="text-2xl font-bold text-ink mb-4 font-sketch">
                Why Choose Qroma?
              </h3>
              <ul className="space-y-3">
                {[
                  'Expert architecture & design',
                  'Proven track record',
                  'Cutting-edge technology',
                  'Transparent process',
                  'Results-driven',
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center text-ink/80 font-medium"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--ink-black)] mr-3" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="space-y-6 bg-[var(--card-bg)] p-8 border-2 border-[var(--ink-black)] rounded-lg shadow-[8px_8px_0px_0px_var(--shadow-color)]">
              <div>
                <label className="block text-sm font-bold text-ink mb-2 uppercase tracking-wider">
                  Name
                </label>
                <motion.input
                  type="text"
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  animate={{
                    scale: focusedField === 'name' ? 1.01 : 1,
                  }}
                  className="w-full px-4 py-3 bg-paper border-2 border-ink-black/20 rounded focus:border-ink-black focus:outline-none transition-all placeholder-ink/30 text-ink"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-2 uppercase tracking-wider">
                  Email
                </label>
                <motion.input
                  type="email"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  animate={{
                    scale: focusedField === 'email' ? 1.01 : 1,
                  }}
                  className="w-full px-4 py-3 bg-paper border-2 border-ink-black/20 rounded focus:border-ink-black focus:outline-none transition-all placeholder-ink/30 text-ink"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-2 uppercase tracking-wider">
                  Service
                </label>
                <motion.select
                  onFocus={() => setFocusedField('service')}
                  onBlur={() => setFocusedField(null)}
                  animate={{
                    scale: focusedField === 'service' ? 1.01 : 1,
                  }}
                  className="w-full px-4 py-3 bg-paper border-2 border-ink-black/20 rounded focus:border-ink-black focus:outline-none transition-all text-ink appearance-none"
                >
                  <option value="">Select a service</option>
                  <option value="web">Web Development</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="automation">Business Automation</option>
                  <option value="all">All Services</option>
                </motion.select>
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-2 uppercase tracking-wider">
                  Message
                </label>
                <motion.textarea
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  animate={{
                    scale: focusedField === 'message' ? 1.01 : 1,
                  }}
                  rows={5}
                  className="w-full px-4 py-3 bg-paper border-2 border-ink-black/20 rounded focus:border-ink-black focus:outline-none transition-all resize-none placeholder-ink/30 text-ink"
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-[var(--ink-black)] text-[var(--bg-paper)] font-bold tracking-widest rounded hover:bg-transparent hover:text-[var(--ink-black)] border-2 border-[var(--ink-black)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>SEND MESSAGE</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-32 pb-8 border-t-2 border-ink-black/5 pt-8"
      >
        <div className="text-3xl font-bold text-ink mb-4 tracking-tighter">QROMA</div>
        <div className="flex justify-center gap-4 text-sm font-medium">
          <a href="#" className="bg-[var(--ink-black)] text-[var(--bg-paper)] px-4 py-1.5 rounded-full border-2 border-[var(--ink-black)] hover:bg-transparent hover:text-[var(--ink-black)] transition-all duration-300">
            Privacy Policy
          </a>
          <a href="#" className="bg-[var(--ink-black)] text-[var(--bg-paper)] px-4 py-1.5 rounded-full border-2 border-[var(--ink-black)] hover:bg-transparent hover:text-[var(--ink-black)] transition-all duration-300">
            Terms of Service
          </a>
          <a href="#" className="bg-[var(--ink-black)] text-[var(--bg-paper)] px-4 py-1.5 rounded-full border-2 border-[var(--ink-black)] hover:bg-transparent hover:text-[var(--ink-black)] transition-all duration-300">
            Careers
          </a>
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

        <div className="mt-8 text-ink/40 text-xs">
          © 2026 Qroma. All rights reserved.
        </div>
      </motion.div>
    </section>
  );
}
