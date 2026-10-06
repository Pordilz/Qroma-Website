import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink, ChevronDown, Star, MessageSquareQuote, FolderOpen,
  Github, FlaskConical, ArrowRight,
} from 'lucide-react';
import BlurText from './BlurText';
import FolderCarousel3D from './FolderCarousel3D';
import { featuredProjects, labItems, kindLabelsCompact } from '../data/projects';

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
];

// The four builds that carry their own imagery get the 3D rotating cylinder folder carousel treatment
const folderProjects = featuredProjects.filter((p) => p.images && p.images.length > 0);
const cardProjects = featuredProjects.filter((p) => !p.images || p.images.length === 0);

export default function CaseStudies() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [panelTab, setPanelTab] = useState<'projects' | 'lab' | 'testimonials'>('projects');

  return (
    <section id="work" className="relative min-h-screen py-32 px-4 md:px-6 bg-paper overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <BlurText
            text="Selected Work"
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
            Products we own, work we ship for clients, and infrastructure nobody sees. Drag the carousel and click the folders to open them.
          </motion.p>
        </div>

        {/* 3D Cylindrical Folder Carousel */}
        <div className="mb-24">
          <FolderCarousel3D projects={folderProjects} />
        </div>

        {/* Secondary builds — window cards for infrastructure, internal & data builds */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cardProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <Link
                to={`/work/${project.slug}`}
                className="group flex flex-col h-full rounded-2xl border-2 border-[var(--ink-black)] bg-[var(--card-bg)] overflow-hidden hover:shadow-[8px_8px_0px_0px_var(--shadow-color)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Mac Title Bar */}
                <div className="flex items-center justify-between px-5 py-3 bg-[var(--card-bg)] border-b-2 border-[var(--ink-black)]/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
                  </div>
                  <span className="text-xs font-bold tracking-wider uppercase text-[var(--ink-black)]/50 font-clean">
                    {kindLabelsCompact[project.kind]}
                  </span>
                  <div className="w-16" />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div
                    className="w-12 h-12 mb-5 rounded-xl border-2 flex items-center justify-center"
                    style={{ borderColor: project.color + '40', background: project.color + '12' }}
                  >
                    <project.icon size={22} style={{ color: project.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-ink font-clean tracking-tighter mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-ink/60 font-clean leading-relaxed mb-5 flex-1">
                    {project.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-bold font-clean border-2 border-[var(--ink-black)]/15 rounded-full text-ink/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-bold font-clean text-ink">
                    Read the Build
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--ink-black)] text-[var(--bg-paper)] font-bold font-clean tracking-tighter rounded-full hover:bg-transparent hover:text-[var(--ink-black)] border-2 border-[var(--ink-black)] transition-all duration-300 cursor-pointer"
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

          <Link
            to="/work"
            className="inline-flex items-center gap-2 px-8 py-4 font-bold font-clean tracking-tighter rounded-full border-2 border-[var(--ink-black)]/20 text-ink hover:border-[var(--ink-black)] transition-all duration-300"
          >
            Open the Archive <ArrowRight size={18} />
          </Link>
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
                    {([
                      { id: 'projects', label: 'Projects', Icon: FolderOpen },
                      { id: 'lab', label: 'Lab', Icon: FlaskConical },
                      { id: 'testimonials', label: 'Reviews', Icon: MessageSquareQuote },
                    ] as const).map(({ id, label, Icon }) => (
                      <button
                        key={id}
                        onClick={() => setPanelTab(id)}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold font-clean tracking-wider uppercase transition-all duration-200 cursor-pointer ${panelTab === id
                          ? 'bg-[var(--ink-black)] text-[var(--bg-paper)] shadow-sm'
                          : 'text-ink/40 hover:text-ink/60'
                          }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="hidden md:block w-16" />
                </div>

                {/* Tab Content */}
                <div className="p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    {panelTab === 'projects' && (
                      <motion.div
                        key="projects"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {featuredProjects.map((project, index) => {
                            const Icon = project.icon;
                            return (
                              <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
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
                                    {project.images?.[0] ? (
                                      <img
                                        src={project.images[0].src}
                                        alt={project.title}
                                        className="w-full h-full object-cover object-top"
                                        loading="lazy"
                                      />
                                    ) : (
                                      <Icon className="w-6 h-6" style={{ color: project.color }} />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[10px] font-bold text-ink/40 uppercase tracking-[0.15em] mb-1 font-clean">
                                      {project.category} · {project.year}
                                    </div>
                                    <h3 className="text-lg font-bold font-clean text-ink tracking-tighter">
                                      {project.title}
                                    </h3>
                                  </div>
                                  <span
                                    className="text-[10px] font-bold font-clean uppercase tracking-wider px-2 py-1 rounded-md whitespace-nowrap"
                                    style={{ color: project.color, background: project.color + '15' }}
                                  >
                                    {project.status}
                                  </span>
                                </div>

                                <p className="text-sm text-ink/60 font-clean leading-relaxed mb-5">
                                  {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-5">
                                  {project.tech.map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-2.5 py-1 text-[10px] font-bold font-clean border-2 border-[var(--ink-black)]/15 rounded-full text-ink/60"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                  <Link
                                    to={`/work/${project.slug}`}
                                    className="inline-flex items-center gap-2 text-sm font-bold font-clean text-ink hover:text-ink/60 transition-colors group/link"
                                  >
                                    Read the Build
                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                                  </Link>
                                  {project.url && (
                                    <a
                                      href={project.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-sm font-bold font-clean text-ink/50 hover:text-ink transition-colors"
                                    >
                                      Live <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                  )}
                                  {project.repo && (
                                    <a
                                      href={project.repo}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-sm font-bold font-clean text-ink/50 hover:text-ink transition-colors"
                                    >
                                      Source <Github className="w-3.5 h-3.5" />
                                    </a>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {panelTab === 'lab' && (
                      <motion.div
                        key="lab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-sm text-ink/50 font-clean leading-relaxed mb-6 max-w-2xl">
                          Smaller builds — games, solvers and tools. Some solve a problem, some exist because the problem looked fun. Nothing here is a product; everything here taught us something we now use.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {labItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03 }}
                                className="group p-5 rounded-xl border-2 border-[var(--ink-black)]/10 hover:border-[var(--ink-black)]/30 bg-[var(--bg-paper)] hover:shadow-[4px_4px_0px_0px_var(--shadow-color)] transition-all duration-300 flex flex-col"
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center border-2 flex-shrink-0"
                                    style={{ borderColor: item.color + '40', background: item.color + '12' }}
                                  >
                                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                                  </div>
                                  <h4 className="text-sm font-bold font-clean text-ink tracking-tighter flex-1">
                                    {item.title}
                                  </h4>
                                  <span className="text-[9px] font-bold font-clean uppercase tracking-wider text-ink/30">
                                    {item.tag}
                                  </span>
                                </div>
                                <p className="text-xs text-ink/55 font-clean leading-relaxed mb-4 flex-1">
                                  {item.blurb}
                                </p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                  {item.tech.map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-2 py-0.5 text-[9px] font-bold font-clean border border-[var(--ink-black)]/15 rounded-full text-ink/50"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center gap-3">
                                  {item.url && (
                                    <a
                                      href={item.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 text-xs font-bold font-clean text-ink hover:text-ink/60 transition-colors"
                                    >
                                      Try it <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                  {item.repo && (
                                    <a
                                      href={item.repo}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 text-xs font-bold font-clean text-ink/50 hover:text-ink transition-colors"
                                    >
                                      Source <Github className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {panelTab === 'testimonials' && (
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

      {/* Lightbox for secondary card images */}
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
