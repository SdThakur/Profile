import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Layers, Cpu, Database, Terminal, CheckCircle2, Sparkles } from 'lucide-react';
import { skillsData } from '../data';
import InteractiveSkillsCube from './InteractiveSkillsCube';

// Helper to resolve icon from string
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Code':
      return <Code className="w-5 h-5 text-gold" />;
    case 'Layers':
      return <Layers className="w-5 h-5 text-gold" />;
    case 'Cpu':
      return <Cpu className="w-5 h-5 text-gold" />;
    case 'Database':
      return <Database className="w-5 h-5 text-gold" />;
    case 'Terminal':
      return <Terminal className="w-5 h-5 text-gold" />;
    default:
      return <Code className="w-5 h-5 text-gold" />;
  }
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35 },
    },
  };

  const normalizedSelection = selectedCategory.trim().toLowerCase();
  const displayedCategories =
    normalizedSelection === 'all'
      ? skillsData
      : skillsData.filter((cat) => cat.id.toLowerCase() === normalizedSelection);

  return (
    <section
      id="skills"
      className="py-24 bg-[#0A0A0A] relative border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Skills Cube */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-widest text-zinc-400 mb-3"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                Core Expertise
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight"
              >
                Technical Toolbelt & Skills
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed font-sans"
              >
                A multi-disciplinary stack optimized for high-performance systems engineering, 
                vector databases, and full-stack application development.
              </motion.p>
            </div>

            {/* Category Pill Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="skill-filter-all"
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-gold text-black font-bold'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                All Skills
              </button>
              {skillsData.map((category) => (
                <button
                  key={category.id}
                  id={`skill-filter-${category.id}`}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    selectedCategory === category.id
                      ? 'bg-gold text-black font-bold'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive 3D CSS rotating skills cube on the right */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <InteractiveSkillsCube />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          id="skills-bento-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayedCategories.length === 0 ? (
            <div className="col-span-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-8 text-center text-sm text-zinc-400">
              No skills match this filter. Please select a different category.
            </div>
          ) : (
            displayedCategories.map((category) => (
              <motion.div
                key={category.id}
                id={`skill-card-${category.id}`}
                variants={cardVariants}
                className="glass-card p-6 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-center">
                        {getIconComponent(category.icon)}
                      </div>
                      <h3 className="font-serif font-bold text-[#EDEDED] text-base">
                        {category.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                      {category.skills.length} Items
                    </span>
                  </div>

                  {/* Skills List as interactive chips */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-950 text-zinc-300 text-xs border border-zinc-900 cursor-default"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Nice visual decoration on card background */}
                <div className="absolute bottom-[-15px] right-[-15px] w-24 h-24 bg-gradient-to-tr from-gold/5 to-transparent rounded-full pointer-events-none" />
              </motion.div>
            )))}
        </motion.div>

        {/* Featured Technical Context Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded bg-zinc-900/50 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-950 border border-zinc-850 text-gold flex items-center justify-center flex-shrink-0 font-serif font-bold text-sm">
              CS
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#EDEDED] text-sm">
                Academic Specialization & Systems Concepts
              </h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl font-medium leading-relaxed font-sans">
                Pessimistic concurrency controls, systems multithreading, Linux character device drivers,
                ioctl communications, cosine similarity indexing for vector lookup, and database B-Tree index tuning.
              </p>
            </div>
          </div>
          <button
            id="skills-chat-cta"
            onClick={() => {
              const element = document.getElementById('chatbot');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded border border-zinc-850 bg-zinc-950 text-gold hover:text-white hover:border-gold/40 transition-all cursor-pointer whitespace-nowrap"
          >
            Ask AI about my concepts &rarr;
          </button>
        </motion.div>
      </div>
    </section>
  );
}
