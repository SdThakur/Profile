import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { personalInfo } from '../data';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'chatbot', label: 'AI Resume Assistant' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of floating header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-sophisticated-bg/95 backdrop-blur-md shadow-lg border-b border-white/5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Branding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => handleNavClick('about')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-md bg-gold flex items-center justify-center text-black font-serif font-extrabold text-lg shadow-md group-hover:scale-105 transition-all">
              S
            </div>
            <div>
              <span className="font-serif font-bold text-lg tracking-tight text-[#EDEDED] flex items-center gap-0.5">
                SATYA<span className="text-gold">.</span>THAKUR
              </span>
              <span className="block text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
                Software Engineer
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all relative ${
                  activeSection === item.id
                    ? 'text-gold'
                    : 'text-zinc-400 hover:text-[#EDEDED] hover:bg-white/5'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

            {/* Desktop Theme Toggle */}
            <motion.button
              id="theme-toggle-desktop"
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="ml-4 p-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[#EDEDED] transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-gold" /> : <Sun className="w-4 h-4 text-gold" />}
            </motion.button>
          </nav>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center md:hidden space-x-2">
            {/* Mobile Theme Toggle */}
            <motion.button
              id="theme-toggle-mobile"
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded bg-zinc-900 border border-zinc-800 text-[#EDEDED] transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-gold" /> : <Sun className="w-4 h-4 text-gold" />}
            </motion.button>

            {/* Hamburger Button */}
            <button
              id="mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded text-zinc-400 hover:text-[#EDEDED] hover:bg-zinc-900"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-b border-white/5 bg-sophisticated-bg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-mobile-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded text-sm font-semibold uppercase tracking-wider transition-all ${
                    activeSection === item.id
                      ? 'bg-zinc-900 text-gold font-bold border-l-2 border-gold'
                      : 'text-zinc-400 hover:bg-zinc-900/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
