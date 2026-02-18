import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import HeroScene from './components/HeroScene';

import Services from './components/ServicesOS';
import Process from './components/Process';
import CaseStudies from './components/CaseStudies';
import InteractiveContact from './components/InteractiveContact';
import ClickSpark from './components/ClickSpark';
import Magnet from './components/Magnet';
import ScrollVelocity from './components/ScrollVelocity';
import ThemeToggle from './components/ThemeToggle';
import Vault from './components/Vault';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import FAQ from './components/FAQ';
import About from './components/About';
import { Menu, X } from 'lucide-react';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const words = ["AUTOMATE", "ACCELERATE", "DOMINATE", "INNOVATE", "CREATE"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Scroll to top and close menu on route change, but respect hash
  useEffect(() => {
    const handleScroll = () => {
      if (location.hash) {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "auto", block: "start" });
        }
      } else {
        window.scrollTo(0, 0);
      }
      setIsMenuOpen(false);
    };

    handleScroll();
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollPosition / (windowHeight * 0.4), 1);

      setScrollProgress(progress);

      if (progress > 0.1) {
        setShowScrollHint(false);
      }
    };

    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(wordInterval);
    };
  }, []);

  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  // Programmatic scroll-to-section that works from any page
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    if (isHome) {
      // Already on home — just scroll
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home first, then scroll after render
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const menuItems = [
    { label: 'Services', section: 'services' },
    { label: 'Process', section: 'process' },
    { label: 'Work', section: 'work' },
    { label: 'About', section: null, route: '/about' },
    { label: 'Blog', section: null, route: '/vault' },
    { label: 'Contact', section: 'contact' },
  ];

  return (
    <ClickSpark sparkColor="var(--ink-black)" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <div className="relative min-h-screen overflow-x-hidden selection:bg-black selection:text-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-[100] p-6 flex justify-between items-center text-ink">
          <Magnet padding={60} magnetStrength={3}>
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="text-2xl font-bold tracking-tighter cursor-pointer hover:bg-[var(--ink-black)] hover:text-[var(--bg-paper)] px-3 py-1 rounded-full transition-all duration-300"
            >
              QROMA
            </Link>
          </Magnet>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Magnet padding={60} magnetStrength={3}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 z-50 bg-[var(--ink-black)] text-[var(--bg-paper)] border-2 border-[var(--ink-black)] rounded-full hover:bg-transparent hover:text-[var(--ink-black)] transition-all duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </Magnet>
          </div>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-4 z-40 bg-[var(--bg-paper)] border-2 border-[var(--ink-black)] rounded-[2rem] flex flex-col items-center justify-center shadow-[8px_8px_0px_0px_var(--shadow-color)]"
            >
              {/* Overlay Texture */}
              <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,...')] pointer-events-none" />

              <div className="flex flex-col gap-4 text-center relative z-10">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {item.section ? (
                      <button
                        onClick={() => scrollToSection(item.section!)}
                        className="block w-full text-4xl md:text-6xl font-bold tracking-tighter font-clean px-8 py-3 rounded-xl bg-[var(--ink-black)] text-[var(--bg-paper)] border-2 border-[var(--ink-black)] hover:bg-transparent hover:text-[var(--ink-black)] transition-all duration-300"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        to={item.route!}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-4xl md:text-6xl font-bold tracking-tighter font-clean px-8 py-3 rounded-xl bg-[var(--ink-black)] text-[var(--bg-paper)] border-2 border-[var(--ink-black)] hover:bg-transparent hover:text-[var(--ink-black)] transition-all duration-300"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section with 3D Planet */}
              <div className="relative h-screen w-full">
                <div className="absolute inset-0 z-0">
                  <HeroScene scrollProgress={scrollProgress} />
                </div>

                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                  <div className="h-[12vw] flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.h1
                        key={words[currentWordIndex]}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-[12vw] leading-none font-bold text-ink tracking-tighter mix-blend-overlay text-center absolute"
                      >
                        {words[currentWordIndex]}
                      </motion.h1>
                    </AnimatePresence>
                  </div>
                </div>

                <AnimatePresence>
                  {showScrollHint && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-12 left-1/2 -translate-x-1/2 text-sm font-sketch tracking-widest"
                    >
                      <Magnet padding={100} magnetStrength={2}>
                        SCROLL TO EXPLORE
                      </Magnet>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative z-10 bg-paper">
                <Services />
                <Process />
                <CaseStudies />

                {/* ScrollVelocity Marquee between CaseStudies and Contact */}
                <ScrollVelocity
                  texts={['QROMA DIGITAL ✦ ', 'Design · Develop · Dominate · ']}
                  velocity={80}
                  scrollerClassNames={['velocity-scroller', 'velocity-scroller velocity-scroller-sketch']}
                />

                <InteractiveContact />
              </div>
            </>
          } />

          <Route path="/vault" element={<Vault />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </ClickSpark>
  );
}

export default App;
