import React from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Linkedin, ShieldCheck } from 'lucide-react';
import { personalInfo } from '../data';

function ThreeDGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      <div className="absolute -bottom-1/4 -left-1/4 w-[150%] h-[150%] origin-center" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(212, 175, 55, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 175, 55, 0.08) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
            transform: 'rotateX(72deg) rotateZ(-28deg)',
            transformStyle: 'preserve-3d'
          }}
          animate={{ backgroundPosition: ['0px 0px', '128px 128px'] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gold/5 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/5 blur-[150px]" />
    </div>
  );
}

export default function Contact() {
  const channels = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'https://www.linkedin.com/in/satya-thakur',
      href: personalInfo.linkedin,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A] relative border-t border-white/5 overflow-hidden">
      <ThreeDGridBackground />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-widest text-zinc-400 mb-3"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            Get in Touch
          </motion.div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight">
            Connect with Satya
          </h2>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed font-sans">
            Open to internships, co-ops, and full-time SWE roles starting Fall / Winter 2026.
          </p>
        </div>

        {/* Contact Coordinates Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {channels.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="glass-card p-6 flex flex-col items-center text-center gap-3.5 group hover:border-gold/20 transition-all">
              <div className="w-10 h-10 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-center text-gold flex-shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                  {label}
                </span>
                {href ? (
                  <a 
                    href={href} 
                    target={label === 'LinkedIn' ? '_blank' : undefined}
                    rel={label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                    className="text-zinc-200 text-xs font-semibold hover:text-gold transition-colors block break-all"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-zinc-200 text-xs font-semibold block">
                    {value}
                  </span>
                )}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
