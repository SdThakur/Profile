import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import SkillsCube from './components/SkillsCube';
import FeaturedProjects from './components/FeaturedProjects';
import ThreeDCarousel from './components/ThreeDCarousel';
import Projects from './components/Projects';
import Experience from './components/Experience';
import AiAssistant from './components/AiAssistant';
import Contact from './components/Contact';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Terminal, Sparkles } from 'lucide-react';
import { personalInfo } from './data';

function PortfolioApp() {
  const [activeSection, setActiveSection] = useState('about');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  // Scrollspy logic to automatically highlight nav items on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['about', 'skills', 'projects', 'experience', 'chatbot', 'contact'];
      const scrollPosition = window.scrollY + 180; // Offset for header & margin

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setActiveSection('about');
  };

  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] antialiased selection:bg-gold selection:text-black">
      {/* Floating Header Navigation */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content Wrapper */}
      <main className="relative">
        <Hero onNavigate={navigateToSection} />
        <Skills />
        <SkillsCube />
        <FeaturedProjects />
        <ThreeDCarousel />
        <Projects />
        <Experience />
        <AiAssistant />
        <Contact />
      </main>

      {/* Custom Global Footer */}
      <footer className="bg-zinc-950 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gold font-serif font-bold text-sm">
              S
            </div>
            <span className="font-serif font-bold text-base tracking-tight text-[#EDEDED]">
              {personalInfo.name} Portfolio
            </span>
          </div>

          <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed font-sans">
            Designed with desktop-first precision, fluid responsiveness, and Framer Motion transitions. 
            Powered by a server-side Express runtime.
          </p>

          <div className="text-[10px] font-mono text-zinc-600 flex justify-center items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-gold" />
            <span>© 2026 {personalInfo.name}. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Animated Scroll to Top Floating Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="scroll-to-top-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded bg-gold text-black shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center border border-gold/40"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
