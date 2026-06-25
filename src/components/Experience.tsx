import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, Award, ArrowRight, Sparkles } from 'lucide-react';
import { experienceData, certificationsData } from '../data';

export default function Experience() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section
      id="experience"
      className="py-24 bg-[#0A0A0A] relative border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-widest text-zinc-400 mb-3"
          >
            <Briefcase className="w-3.5 h-3.5 text-gold" />
            Professional Milestones
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight"
          >
            Work & Virtual Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed font-sans"
          >
            Bridging structured database accuracy, remote data architectures, and 
            RESTful microservice design.
          </motion.p>
        </div>

        {/* Experience Timeline Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative"
        >
          {/* Timeline Center line (visible only on large screens) */}
          <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-zinc-900 hidden lg:block -translate-x-1/2 pointer-events-none" />

          {/* Left Side: Work Experience */}
          <motion.div id="work-experience-timeline" variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="w-8 h-8 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-center text-gold font-serif font-bold text-sm">
                W
              </span>
              <h3 className="font-serif font-bold text-lg text-[#EDEDED]">
                Industry Experience
              </h3>
            </div>

            {experienceData.map((exp) => (
              <div
                key={exp.id}
                id={`exp-card-${exp.id}`}
                className="glass-card p-6 relative group"
              >
                {/* Timeline Connector node */}
                <div className="absolute right-[-24px] top-10 w-3 h-3 rounded-full bg-gold border-2 border-[#0A0A0A] hidden lg:block translate-x-1/2 z-20 group-hover:scale-125 transition-transform" />

                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#EDEDED] leading-tight">
                      {exp.role}
                    </h4>
                    <p className="text-xs font-semibold text-gold mt-1 uppercase tracking-wider">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right text-[10px] font-mono text-zinc-500 uppercase tracking-wider space-y-1">
                    <div className="flex items-center gap-1.5 justify-end">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-2.5 text-xs text-zinc-400 leading-relaxed font-sans">
                      <ArrowRight className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-1" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Right Side: Certifications & Virtual Experience */}
          <motion.div id="virtual-experience-timeline" variants={rightVariants} className="space-y-6 lg:mt-0">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="w-8 h-8 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-center text-gold font-serif font-bold text-sm">
                C
              </span>
              <h3 className="font-serif font-bold text-lg text-[#EDEDED]">
                Certifications & Badges
              </h3>
            </div>

            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
              {certificationsData.map((cert) => (
                <div
                  key={cert.id}
                  id={`cert-card-${cert.id}`}
                  className="glass-card p-5 relative group transition-all duration-300 hover:border-gold/40 hover:shadow-[0_4px_20px_rgba(212,175,55,0.05)]"
                >
                  {/* Timeline Connector node */}
                  <div className="absolute left-[-24px] top-8 w-3 h-3 rounded-full bg-gold border-2 border-[#0A0A0A] hidden lg:block -translate-x-1/2 z-20 group-hover:scale-125 transition-transform" />

                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#EDEDED] leading-tight group-hover:text-gold transition-colors duration-200">
                        {cert.title}
                      </h4>
                      <p className="text-xs font-semibold text-zinc-400 mt-1 uppercase tracking-wider">
                        {cert.company}
                      </p>
                    </div>
                    <div className="text-right text-[10px] font-mono text-zinc-500 uppercase tracking-wider space-y-1">
                      <div className="flex items-center gap-1.5 justify-end">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        {cert.date}
                      </div>
                      {cert.credentialId && (
                        <span className="inline-block px-1.5 py-0.5 bg-zinc-900/60 text-[8px] text-zinc-500 border border-zinc-850 font-mono mt-1">
                          ID: {cert.credentialId}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-3">
                    {cert.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-2 text-[11px] text-zinc-400 leading-relaxed font-sans">
                        <ArrowRight className="w-3 h-3 text-gold flex-shrink-0 mt-1" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills badges */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="pt-2.5 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                      <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase font-bold mr-1">
                        Skills:
                      </span>
                      {cert.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 text-[9px] border border-zinc-900 font-sans">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Academic Highlight Card */}
            <div className="p-6 bg-zinc-900/40 border border-white/5 rounded flex items-center gap-4">
              <Award className="w-8 h-8 text-gold flex-shrink-0" />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#EDEDED] flex items-center gap-1.5">
                  Academic Focus & GPA
                  <Sparkles className="w-4 h-4 text-gold" />
                </h4>
                <p className="text-xs text-zinc-400 mt-1 leading-normal font-sans">
                  Completed complex systems coursework at UMBC, achieving a cumulative GPA of 3.34/4.00,
                  covering core multithreading concepts, OS structures, and DB optimizations.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
