import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, ShoppingBag, Heart, ChevronDown, Star, MessageSquareQuote, FolderOpen } from 'lucide-react';
import Folder from './Folder';
import BlurText from './BlurText';

const projects = [
  {
    id: 1,
    title: 'SummitSea',
    category: 'E-Commerce',
    description: 'New Zealand\'s premier online marketplace featuring curated lifestyle, tech, and pet products with a modern Shopify-plus aesthetic.',
    url: 'https://summitsea.shop/',
    icon: ShoppingBag,
    color: '#60A5FA', // Blue ocean theme
    tech: ['Shopify', 'React', 'Tailwind CSS'],
    logo: '/summitsea-hero.png',
  },
  {
    id: 2,
    title: 'The FixSir',
    category: 'Healthcare',
    description: 'Professional recovery therapy platform specializing in sports massage and Hijama cupping therapy for athletes in Durban.',
    url: 'https://www.thefixsir.co.za/',
    icon: Heart,
    color: '#DC2626', // Medical red
    tech: ['Next.js', 'WhatsApp API', 'Framer Motion'],
    logo: '/fixsir-hero.png',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Mo Hoosain',
    role: 'Founder, The FixSir',
    quote: 'Qroma completely transformed our online presence. The website perfectly captures our brand, and the WhatsApp integration alone has doubled our bookings. Incredible team to work with.',
    rating: 5,
    project: 'The FixSir',
    color: '#DC2626',
  },
  {
    id: 2,
    name: 'Barry Ally',
    role: 'Owner, SummitSea',
    quote: 'From concept to launch, Qroma delivered a stunning e-commerce store that our customers love. The attention to detail and the speed of delivery blew us away. Sales have been growing every month since launch.',
    rating: 5,
    project: 'SummitSea',
    color: '#60A5FA',
  },
];

export default function CaseStudies() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [panelTab, setPanelTab] = useState<'projects' | 'testimonials'>('projects');

  return (
    <section id="work" className="relative min-h-screen py-32 px-6 bg-paper">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <BlurText
            text="Case Studies"
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
            Real projects, real impact. Click the folders to explore our work.
          </motion.p>
        </div>

        {/* Folder Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          {projects.map((project, index) => {
            let folderItems;

            if (project.title === 'The FixSir') {
              folderItems = [
                // Paper 1 (Left) - Testimonials
                <div
                  key="testimonials"
                  className="w-full h-full bg-white border-2 border-[var(--ink-black)] overflow-hidden relative cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage('/fixsir-testimonials.png');
                  }}
                >
                  <img
                    src="/fixsir-testimonials.png"
                    alt="Client Testimonials"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Fallback text if image missing (during dev) */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Client Reviews</span>
                  </div>
                </div>,
                // Paper 2 (Right) - Services
                <div
                  key="services"
                  className="w-full h-full bg-white border-2 border-[var(--ink-black)] overflow-hidden relative cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage('/fixsir-services.png');
                  }}
                >
                  <img
                    src="/fixsir-services.png"
                    alt="Services List"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Services List</span>
                  </div>
                </div>,
                // Paper 3 (Center/Top) - Hero
                <div
                  key="hero"
                  className="w-full h-full bg-[#DC2626] border-2 border-[var(--ink-black)] overflow-hidden relative cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage('/fixsir-hero.png');
                  }}
                >
                  <img
                    src="/fixsir-hero.png"
                    alt="The FixSir Welcome"
                    className="w-full h-full object-contain p-2"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold uppercase tracking-wider">The FixSir</span>
                  </div>
                </div>,
              ];
            } else if (project.title === 'SummitSea') {
              folderItems = [
                // Paper 1 (Left) - Storefront
                <div
                  key="storefront"
                  className="w-full h-full bg-white border-2 border-[var(--ink-black)] overflow-hidden relative cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage('/summitsea-storefront.png');
                  }}
                >
                  <img
                    src="/summitsea-storefront.png"
                    alt="Storefront"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Storefront</span>
                  </div>
                </div>,
                // Paper 2 (Right) - Collections
                <div
                  key="collections"
                  className="w-full h-full bg-white border-2 border-[var(--ink-black)] overflow-hidden relative cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage('/summitsea-collections.png');
                  }}
                >
                  <img
                    src="/summitsea-collections.png"
                    alt="Product Collections"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Best Sellers</span>
                  </div>
                </div>,
                // Paper 3 (Center/Top) - Hero
                <div
                  key="hero"
                  className="w-full h-full bg-[#60A5FA] border-2 border-[var(--ink-black)] overflow-hidden relative cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage('/summitsea-hero.png');
                  }}
                >
                  <img
                    src="/summitsea-hero.png"
                    alt="SummitSea"
                    className="w-full h-full object-contain p-2"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold uppercase tracking-wider">SummitSea</span>
                  </div>
                </div>,
              ];
            } else {
              folderItems = Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="w-full h-full">
                  {/* Paper 1 - Logo/Icon */}
                  {i === 0 && (
                    <div className="w-full h-full bg-[var(--card-bg)] flex flex-col items-center justify-center p-2 border-2 border-[var(--ink-black)]">
                      <project.icon size={32} color={project.color} strokeWidth={2} />
                      <span className="text-xs font-bold text-ink mt-2 font-clean tracking-tighter">{project.title}</span>
                    </div>
                  )}
                  {/* Paper 2 - Tech Stack */}
                  {i === 1 && (
                    <div className="w-full h-full bg-[var(--card-bg)] flex flex-col items-center justify-center p-2 border-2 border-[var(--ink-black)]">
                      <div className="text-center">
                        {project.tech.map((tech, t) => (
                          <div key={t} className="text-[8px] font-bold text-ink/80 font-clean">{tech}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Paper 3 - CTA */}
                  {i === 2 && (
                    <div className="w-full h-full bg-[var(--card-bg)] flex flex-col items-center justify-center p-2 border-2 border-[var(--ink-black)]">
                      <ExternalLink size={20} color="currentColor" strokeWidth={2} />
                      <span className="text-[8px] font-bold text-ink mt-1 font-clean">Visit Site</span>
                    </div>
                  )}
                </div>
              ));
            }

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {/* Folder */}
                <Folder
                  color={project.color}
                  size={2.5}
                  items={folderItems}
                  className="mb-8"
                />

                {/* Project Info */}
                <div className="text-center max-w-md">
                  <div className="text-xs font-bold text-ink/50 mb-2 uppercase tracking-wider font-sketch">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold text-ink mb-3 font-clean tracking-tighter">
                    {project.title}
                  </h3>
                  <p className="text-ink/70 mb-6 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-bold font-clean border-2 border-[var(--ink-black)] rounded-full hover:bg-[var(--ink-black)] hover:text-[var(--bg-paper)] transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Visit Button */}
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ink-black)] text-[var(--bg-paper)] font-bold font-clean tracking-tighter rounded-full hover:bg-transparent hover:text-[var(--ink-black)] border-2 border-[var(--ink-black)] transition-all duration-300"
                  >
                    Visit Project <ExternalLink size={16} />
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--ink-black)] text-[var(--bg-paper)] font-bold font-clean tracking-tighter rounded-full hover:bg-transparent hover:text-[var(--ink-black)] border-2 border-[var(--ink-black)] transition-all duration-300"
          >
            {showAll ? 'Collapse' : 'View All'}
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex"
            >
              <ChevronDown size={18} />
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Expanded All Projects Panel */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-16 rounded-2xl border-2 border-[var(--ink-black)] shadow-[8px_8px_0px_0px_var(--shadow-color)] overflow-hidden bg-[var(--card-bg)]">
                {/* Title Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between px-5 py-3 bg-[var(--card-bg)] border-b-2 border-[var(--ink-black)]/10 gap-4 md:gap-0">
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
                  </div>
                  {/* Tabs */}
                  <div className="flex items-center justify-center w-full md:w-auto gap-1 bg-[var(--bg-paper)] rounded-lg p-1 border border-[var(--ink-black)]/10">
                    <button
                      onClick={() => setPanelTab('projects')}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold font-clean tracking-wider uppercase transition-all duration-200 ${panelTab === 'projects'
                        ? 'bg-[var(--ink-black)] text-[var(--bg-paper)] shadow-sm'
                        : 'text-ink/40 hover:text-ink/60'
                        }`}
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      Projects
                    </button>
                    <button
                      onClick={() => setPanelTab('testimonials')}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold font-clean tracking-wider uppercase transition-all duration-200 ${panelTab === 'testimonials'
                        ? 'bg-[var(--ink-black)] text-[var(--bg-paper)] shadow-sm'
                        : 'text-ink/40 hover:text-ink/60'
                        }`}
                    >
                      <MessageSquareQuote className="w-3.5 h-3.5" />
                      Testimonials
                    </button>
                  </div>
                  <div className="hidden md:block w-16" />
                </div>

                {/* Tab Content */}
                <div className="p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    {panelTab === 'projects' ? (
                      <motion.div
                        key="projects"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {projects.map((project, index) => {
                            const Icon = project.icon;
                            return (
                              <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-6 rounded-xl border-2 border-[var(--ink-black)]/10 hover:border-[var(--ink-black)]/30 bg-[var(--bg-paper)] hover:shadow-[4px_4px_0px_0px_var(--shadow-color)] transition-all duration-300"
                              >
                                {/* Header */}
                                <div className="flex items-start gap-4 mb-4">
                                  <div
                                    className="w-12 h-14 rounded-lg flex items-center justify-center border-2 relative overflow-hidden flex-shrink-0"
                                    style={{
                                      borderColor: project.color + '40',
                                      background: project.color + '10',
                                    }}
                                  >
                                    {project.logo ? (
                                      <img
                                        src={project.logo}
                                        alt={project.title}
                                        className="w-full h-full object-contain p-1.5"
                                      />
                                    ) : (
                                      <>
                                        <Icon className="w-6 h-6" style={{ color: project.color }} />
                                        <div
                                          className="absolute top-0 right-0 w-4 h-4"
                                          style={{
                                            background: `linear-gradient(135deg, ${project.color}20 50%, ${project.color}40 50%)`,
                                          }}
                                        />
                                      </>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[10px] font-bold text-ink/40 uppercase tracking-[0.15em] mb-1 font-clean">
                                      {project.category}
                                    </div>
                                    <h3 className="text-lg font-bold font-clean text-ink tracking-tighter">
                                      {project.title}
                                    </h3>
                                  </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-ink/60 font-clean leading-relaxed mb-5">
                                  {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                  {project.tech.map((tech, i) => (
                                    <span
                                      key={i}
                                      className="px-2.5 py-1 text-[10px] font-bold font-clean border-2 border-[var(--ink-black)]/15 rounded-full text-ink/60"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>

                                {/* Visit Link */}
                                <a
                                  href={project.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm font-bold font-clean text-ink hover:text-ink/60 transition-colors group/link"
                                >
                                  Visit Project
                                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                </a>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="testimonials"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {testimonials.map((testimonial, index) => (
                            <motion.div
                              key={testimonial.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="group p-6 rounded-xl border-2 border-[var(--ink-black)]/10 hover:border-[var(--ink-black)]/30 bg-[var(--bg-paper)] hover:shadow-[4px_4px_0px_0px_var(--shadow-color)] transition-all duration-300"
                            >
                              {/* Stars */}
                              <div className="flex items-center gap-0.5 mb-4">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-4 h-4 fill-current"
                                    style={{ color: testimonial.color }}
                                  />
                                ))}
                              </div>

                              {/* Quote */}
                              <div className="relative mb-5">
                                <MessageSquareQuote className="w-5 h-5 text-ink/10 absolute -top-1 -left-1" />
                                <p className="text-sm text-ink/70 font-clean leading-relaxed pl-5">
                                  "{testimonial.quote}"
                                </p>
                              </div>

                              {/* Divider */}
                              <div className="h-[2px] bg-[var(--ink-black)]/5 mb-4" />

                              {/* Author */}
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-clean border-2"
                                  style={{
                                    borderColor: testimonial.color + '40',
                                    background: testimonial.color + '10',
                                    color: testimonial.color,
                                  }}
                                >
                                  {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="text-sm font-bold font-clean text-ink">
                                    {testimonial.name}
                                  </div>
                                  <div className="text-[10px] text-ink/40 font-clean">
                                    {testimonial.role}
                                  </div>
                                </div>
                                <span
                                  className="ml-auto text-[10px] font-bold font-clean uppercase tracking-wider px-2 py-1 rounded-md"
                                  style={{
                                    color: testimonial.color,
                                    background: testimonial.color + '15',
                                  }}
                                >
                                  {testimonial.project}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg border-2 border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
