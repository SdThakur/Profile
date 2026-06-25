import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, FileText, Sparkles, Github, Linkedin, ArrowRight, MessageSquare, GraduationCap, X, Download, Printer, Check, Copy } from 'lucide-react';
import { personalInfo, education } from '../data';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const bubbleVariants = {
    animate1: {
      y: [0, -20, 0],
      x: [0, 15, 0],
      scale: [1, 1.05, 1],
      transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
    },
    animate2: {
      y: [0, 25, 0],
      x: [0, -20, 0],
      scale: [1, 1.1, 1],
      transition: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 },
    },
  };

  const handlePrintResume = () => {
    setIsResumeOpen(true);
  };

  const triggerDirectPrint = () => {
    window.print();
  };

  const downloadHtmlResume = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${personalInfo.name} - Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono&display=swap');
    body {
      font-family: 'Inter', sans-serif;
      background-color: #ffffff;
      color: #111111;
    }
    .serif {
      font-family: 'Playfair Display', Georgia, serif;
    }
    .mono {
      font-family: 'JetBrains Mono', monospace;
    }
    @media print {
      body {
        background-color: white !important;
        color: black !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body class="bg-white text-zinc-900 p-8 sm:p-12 max-w-4xl mx-auto">
  <!-- Header Block -->
  <div class="border-b-2 border-zinc-950 pb-6 mb-6 text-center">
    <h1 class="serif text-4.5xl font-bold tracking-tight text-zinc-950">${personalInfo.name}</h1>
    <p class="serif text-lg italic text-zinc-600 mt-1">${personalInfo.title}</p>
    <div class="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs text-zinc-500 mt-3 font-mono">
      <span>${personalInfo.location} (${personalInfo.citizenship})</span>
      <span>•</span>
      <a href="mailto:${personalInfo.email}" class="hover:underline">${personalInfo.email}</a>
      <span>•</span>
      <a href="${personalInfo.github}" class="hover:underline">github.com/SdThakur</a>
      <span>•</span>
      <a href="${personalInfo.linkedin}" class="hover:underline">linkedin.com/in/satya-thakur</a>
    </div>
  </div>

  <!-- Main Grid -->
  <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
    <!-- Left Column: Education & Skills -->
    <div class="md:col-span-4 space-y-6">
      <div>
        <h2 class="serif text-sm font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-3">Education</h2>
        <h3 class="font-bold text-xs text-zinc-950">${education.school}</h3>
        <p class="text-[11px] text-zinc-600">${education.degree}</p>
        <p class="text-[10px] text-zinc-500 mt-0.5">GPA: ${education.gpa.split(' ')[0]} · Graduating Dec 2026</p>
        <p class="text-[10px] text-zinc-600 mt-2 font-semibold">Coursework:</p>
        <p class="text-[10px] text-zinc-500 leading-relaxed">${education.coursework.join(', ')}</p>
      </div>

      <div>
        <h2 class="serif text-sm font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-3">Technical Skills</h2>
        <div class="space-y-2">
          <div>
            <span class="block text-[10px] font-bold text-zinc-800">Languages:</span>
            <span class="text-[10px] text-zinc-600">Python, C, C++, SQL, HTML/CSS</span>
          </div>
          <div>
            <span class="block text-[10px] font-bold text-zinc-800">Frameworks:</span>
            <span class="text-[10px] text-zinc-600">React, FastAPI, Node.js, Express.js, TailwindCSS</span>
          </div>
          <div>
            <span class="block text-[10px] font-bold text-zinc-800">Databases:</span>
            <span class="text-[10px] text-zinc-600">PostgreSQL, MongoDB</span>
          </div>
          <div>
            <span class="block text-[10px] font-bold text-zinc-800">Tools:</span>
            <span class="text-[10px] text-zinc-600">Docker, Git, Unix CLI</span>
          </div>
        </div>
      </div>

      <div>
        <h2 class="serif text-sm font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-3">Certifications</h2>
        <ul class="space-y-1.5 text-[10px] text-zinc-600">
          <li>• AWS Academy Cloud Foundations</li>
          <li>• JP Morgan Software Engineering</li>
          <li>• Postman API Fundamentals</li>
        </ul>
      </div>
    </div>

    <!-- Right Column: Experience & Projects -->
    <div class="md:col-span-8 space-y-6">
      <div>
        <h2 class="serif text-sm font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-3">Professional Experience</h2>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between items-start">
              <h3 class="font-bold text-xs text-zinc-950">UPS Intern</h3>
              <span class="text-[9px] text-zinc-500 font-mono">06/2022 - 08/2022</span>
            </div>
            <p class="text-[10px] italic text-zinc-600">Remote Data Entry Specialist</p>
            <ul class="list-disc list-inside mt-1.5 text-[10px] text-zinc-500 space-y-1">
              <li>Executed precise remote verification of high-priority shipment routing files.</li>
              <li>Maintained an exceptional 99% accuracy rate across 5,000+ logistics entries.</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 class="serif text-sm font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-3">Key Projects</h2>
        <div class="space-y-4">
          <div>
            <h3 class="font-bold text-xs text-zinc-950">RAG Document Parsing AI Pipeline</h3>
            <p class="text-[9px] text-zinc-500 font-mono">Python, FastAPI, ChromaDB, Google GenAI</p>
            <ul class="list-disc list-inside mt-1 text-[10px] text-zinc-500 space-y-1">
              <li>Engineered a custom backend context parser chunking 10,000+ files for semantic searching.</li>
              <li>Bypassed performance constraints, achieving an 80% reduction in query lookup latencies.</li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold text-xs text-zinc-950">Multithreaded Priority Task Scheduler</h3>
            <p class="text-[9px] text-zinc-500 font-mono">C, Concurrency & Systems Optimization, Mutexes/Semaphores</p>
            <ul class="list-disc list-inside mt-1 text-[10px] text-zinc-500 space-y-1">
              <li>Developed a 3-tier multithreaded priority queue scheduler under concurrent multi-client workloads.</li>
              <li>Engineered custom starvation-prevention and deadlock-avoidance models with clean thread-safety.</li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold text-xs text-zinc-955">Linux Character Driver & Connect Four Module</h3>
            <p class="text-[9px] text-zinc-500 font-mono">C, Kernel Programming, System Calls, ioctl</p>
            <ul class="list-disc list-inside mt-1 text-[10px] text-zinc-500 space-y-1">
              <li>Developed a safe Linux character driver handling real-time gaming state synchronization in kernel space.</li>
              <li>Utilized atomic locks and custom ioctl system calls to ensure memory stability.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="no-print mt-10 border-t border-zinc-200 pt-6 text-center">
    <button onclick="window.print()" class="px-5 py-2.5 bg-zinc-950 text-white font-semibold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all rounded shadow">
      Print / Save as PDF
    </button>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = personalInfo.name.replace(/\s+/g, '_') + '_Resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="about"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background Decorative Gold Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft gold/amber blobs */}
        <motion.div
          variants={bubbleVariants}
          animate="animate1"
          className="absolute top-[15%] right-[8%] w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full bg-gold/5 blur-3xl"
        />
        <motion.div
          variants={bubbleVariants}
          animate="animate2"
          className="absolute bottom-[20%] left-[8%] w-80 h-80 sm:w-[400px] sm:h-[400px] rounded-full bg-amber-500/5 blur-3xl"
        />
        {/* Soft elegant grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <motion.div
            id="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center space-y-7 text-left"
          >
            {/* Status Pill Badge */}
            <motion.div variants={itemVariants} className="self-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-widest text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                Available for internships, co-ops & full-time roles
              </span>
            </motion.div>

            {/* Display Typography Title */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tight text-[#EDEDED] leading-[1.1] font-light">
                Hi, I'm <br />
                <span className="font-bold text-gold not-italic">Satya Thakur.</span>
              </h1>
              <p className="font-serif text-xl sm:text-2xl italic text-zinc-400 font-normal">
                {personalInfo.title}
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl font-sans"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Location & Contact Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-y-3 gap-x-4 text-xs font-medium text-zinc-500 font-mono tracking-wider uppercase"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                {personalInfo.location}
              </div>
              <div className="flex items-center gap-1.5 border-l border-zinc-800 pl-4 hidden sm:flex">
                <GraduationCap className="w-3.5 h-3.5 text-gold" />
                UMBC CS Graduate (Dec 2026)
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                id="hero-view-projects"
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-gold hover:bg-gold-hover text-black font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md shadow-gold/5"
              >
                View Works
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="hero-chat-bot"
                onClick={() => onNavigate('chatbot')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[#EDEDED] font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-gold" />
                Ask AI Resume Agent
              </button>

              <button
                id="hero-download-resume"
                onClick={handlePrintResume}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded bg-zinc-950 border border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-[#EDEDED] font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer"
                title="Saves/Prints the complete stylized portfolio resume directly"
              >
                <FileText className="w-3.5 h-3.5" />
                Print Resume
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-4">
              <a
                id="social-github"
                href="https://github.com/SdThakur"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-gold hover:border-gold/35 transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                id="social-linkedin"
                href="https://www.linkedin.com/in/satya-thakur-415706343"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-gold hover:border-gold/35 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Right Interactive Bento Card */}
          <motion.div
            id="hero-bento-visual"
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.3 }}
            className="lg:col-span-5 relative w-full flex justify-center"
          >
            {/* The Bento Container */}
            <div className="relative w-full max-w-sm rounded p-6 bg-sophisticated-surface border border-white/5 shadow-2xl">
              <div className="absolute top-4 right-4 flex space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-zinc-800" />
                <span className="w-2 h-2 rounded-full bg-zinc-700" />
                <span className="w-2 h-2 rounded-full bg-gold/50" />
              </div>

              {/* Education section */}
              <div className="border-b border-white/5 pb-4 mb-4">
                <span className="text-[9px] font-mono tracking-widest text-gold uppercase font-bold block mb-1">
                  Academic Credentials
                </span>
                <h3 className="font-serif font-bold text-[#EDEDED] text-base">
                  {education.school}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {education.degree}
                </p>
                <div className="flex justify-between items-center mt-3 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  <span>Graduation Dec 2026</span>
                  <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-gold font-semibold">
                    GPA: {education.gpa.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Quick statistics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded bg-zinc-950 border border-white/5">
                  <span className="block text-lg font-bold text-gold font-serif">
                    4+
                  </span>
                  <span className="block text-[9px] text-zinc-500 uppercase font-mono mt-0.5 tracking-wider">
                    Core Systems Projects
                  </span>
                </div>
                <div className="p-3 rounded bg-zinc-950 border border-white/5">
                  <span className="block text-lg font-bold text-gold font-serif">
                    10K+
                  </span>
                  <span className="block text-[9px] text-zinc-500 uppercase font-mono mt-0.5 tracking-wider">
                    Parsed Docs Chunks
                  </span>
                </div>
              </div>

              {/* Featured Coursework Chips */}
              <div>
                <span className="text-[9px] font-mono tracking-widest text-gold uppercase font-bold block mb-2">
                  Specialization Focus
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {education.coursework.slice(0, 4).map((course, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-zinc-900 text-zinc-400 text-[10px] border border-zinc-800"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clean Academic Reference Footer */}
              <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[9px] text-zinc-500 flex justify-between uppercase tracking-widest">
                <span>UMBC Computer Science</span>
                <span className="text-gold font-semibold">HONORS SELECT</span>
              </div>
            </div>

            {/* Glowing Decorative Ring */}
            <div className="absolute -inset-1 rounded bg-gradient-to-tr from-gold/5 to-transparent blur-md pointer-events-none -z-10" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsResumeOpen(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[999] flex items-center justify-center p-4 overflow-y-auto no-print"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-zinc-950 border border-zinc-800 rounded-lg max-w-4xl w-full my-8 flex flex-col max-h-[90vh] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Controls Bar */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gold" />
                  <span className="font-serif font-bold text-sm text-[#EDEDED]">Satya Thakur - Dynamic Resume Hub</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={downloadHtmlResume}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-gold hover:bg-gold-hover text-black text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer"
                    title="Downloads an offline-friendly, beautiful, fully styled HTML resume page"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download HTML
                  </button>
                  <button
                    onClick={triggerDirectPrint}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer"
                    title="Opens browser printing window"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print
                  </button>
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="p-1.5 rounded bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Document Area */}
              <div className="overflow-y-auto p-6 sm:p-10 bg-zinc-950 text-zinc-200">
                {/* Print Notification Info */}
                <div className="mb-6 p-4 rounded bg-zinc-900/50 border border-zinc-800/80 text-xs text-zinc-400 leading-relaxed flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-200 block mb-1">Print & Download Optimizations</span>
                    Iframe environments often block direct printing. Use <strong className="text-gold font-semibold">Download HTML</strong> to get a self-contained, fully-styled resume file that formats perfectly on a single page, or click <strong className="text-zinc-200 font-semibold">Print</strong> to print this styled layout directly.
                  </div>
                </div>

                {/* Styled Resume Preview (ID used by print stylesheet) */}
                <div
                  id="printable-resume-area"
                  className="bg-zinc-900 border border-zinc-800 rounded p-8 sm:p-12 text-zinc-100 font-sans shadow-lg text-left"
                >
                  {/* Header Block */}
                  <div className="border-b-2 border-zinc-800 pb-5 mb-6 text-center">
                    <h2 className="font-serif text-3xl font-bold tracking-tight text-[#EDEDED]">{personalInfo.name}</h2>
                    <p className="font-serif text-base italic text-gold mt-1">{personalInfo.title}</p>
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[11px] text-zinc-400 mt-3 font-mono">
                      <span>{personalInfo.location} ({personalInfo.citizenship})</span>
                      <span>•</span>
                      <a href={`mailto:${personalInfo.email}`} className="hover:underline text-gold">{personalInfo.email}</a>
                      <span>•</span>
                      <a href="https://github.com/SdThakur" target="_blank" rel="noreferrer" className="hover:underline text-gold">github.com/SdThakur</a>
                    </div>
                  </div>

                  {/* Body Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs leading-relaxed">
                    {/* Column 1: Edu & Skills (4 cols) */}
                    <div className="md:col-span-4 space-y-6">
                      <div>
                        <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#EDEDED] border-b border-zinc-800 pb-1 mb-3">Education</h3>
                        <h4 className="font-bold text-[#EDEDED]">{education.school}</h4>
                        <p className="text-zinc-400">{education.degree}</p>
                        <p className="text-zinc-500 mt-0.5">GPA: {education.gpa.split(' ')[0]} · Dec 2026</p>
                        <p className="text-zinc-400 mt-2 font-semibold">Coursework:</p>
                        <p className="text-zinc-500 leading-relaxed">{education.coursework.join(', ')}</p>
                      </div>

                      <div>
                        <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#EDEDED] border-b border-zinc-800 pb-1 mb-3">Technical Skills</h3>
                        <div className="space-y-2">
                          <div>
                            <span className="block font-bold text-zinc-300">Languages:</span>
                            <span className="text-zinc-400">Python, C, C++, SQL, HTML/CSS</span>
                          </div>
                          <div>
                            <span className="block font-bold text-zinc-300">Frameworks:</span>
                            <span className="text-zinc-400">React, FastAPI, Node.js, Express.js, TailwindCSS</span>
                          </div>
                          <div>
                            <span className="block font-bold text-zinc-300">Databases:</span>
                            <span className="text-zinc-400">PostgreSQL, MongoDB</span>
                          </div>
                          <div>
                            <span className="block font-bold text-zinc-300">Tools:</span>
                            <span className="text-zinc-400">Docker, Git, Unix CLI</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#EDEDED] border-b border-zinc-800 pb-1 mb-3">Certifications</h3>
                        <ul className="space-y-1.5 text-zinc-400">
                          <li>• AWS Academy Cloud Foundations</li>
                          <li>• JP Morgan Software Engineering</li>
                          <li>• Postman API Fundamentals</li>
                        </ul>
                      </div>
                    </div>

                    {/* Column 2: Exp & Projects (8 cols) */}
                    <div className="md:col-span-8 space-y-6">
                      <div>
                        <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#EDEDED] border-b border-zinc-800 pb-1 mb-3">Professional Experience</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-[#EDEDED]">UPS Intern</h4>
                              <span className="text-zinc-500 font-mono text-[10px]">06/2022 - 08/2022</span>
                            </div>
                            <p className="italic text-gold">Remote Data Entry Specialist</p>
                            <ul className="list-disc list-inside mt-1.5 text-zinc-400 space-y-1">
                              <li>Executed precise remote verification of high-priority shipment routing files.</li>
                              <li>Maintained an exceptional 99% accuracy rate across 5,000+ logistics entries.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#EDEDED] border-b border-zinc-800 pb-1 mb-3">Key Projects</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-bold text-[#EDEDED]">RAG Document Parsing AI Pipeline</h4>
                            <p className="text-gold font-mono text-[10px]">Python, FastAPI, ChromaDB, Google GenAI</p>
                            <ul className="list-disc list-inside mt-1 text-zinc-400 space-y-1">
                              <li>Engineered a custom backend context parser chunking 10,000+ files for semantic searching.</li>
                              <li>Bypassed performance constraints, achieving an 80% reduction in query lookup latencies.</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-bold text-[#EDEDED]">Multithreaded Priority Task Scheduler</h4>
                            <p className="text-gold font-mono text-[10px]">C, Concurrency & Systems Optimization, Mutexes/Semaphores</p>
                            <ul className="list-disc list-inside mt-1 text-zinc-400 space-y-1">
                              <li>Developed a 3-tier multithreaded priority queue scheduler under concurrent multi-client workloads.</li>
                              <li>Engineered custom starvation-prevention and deadlock-avoidance models with clean thread-safety.</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-bold text-[#EDEDED]">Linux Character Driver & Connect Four Module</h4>
                            <p className="text-gold font-mono text-[10px]">C, Kernel Programming, System Calls, ioctl</p>
                            <ul className="list-disc list-inside mt-1 text-zinc-400 space-y-1">
                              <li>Developed a safe Linux character driver handling real-time gaming state synchronization in kernel space.</li>
                              <li>Utilized atomic locks and custom ioctl system calls to ensure memory stability.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
