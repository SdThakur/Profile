import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, MapPin, Send, CheckCircle2, AlertCircle, Database, 
  Lock, Eye, Calendar, User, Building, ExternalLink, Sparkles, 
  Terminal, ShieldCheck, MailOpen, Cpu, RefreshCw, Code, Copy, Check
} from 'lucide-react';
import { personalInfo } from '../data';
import { Lead } from '../types';

const CONTACT_OBJECTIVES = [
  {
    id: 'hire',
    label: 'Hire Satya (Graduate / Co-op)',
    defaultMessage: "Hi Satya, I came across your portfolio and would love to discuss potential Software Engineer roles (Internship, Co-op, or Graduate Full-Time) for Fall/Winter 2026. Let's schedule a call!",
    icon: Sparkles
  },
  {
    id: 'collab',
    label: 'AI / RAG Collaboration',
    defaultMessage: "Hi Satya, I saw your FastAPI & ChromaDB RAG Pipeline project. I'm working on something similar and would love to collaborate or share technical ideas on semantic indexing.",
    icon: Database
  },
  {
    id: 'systems',
    label: 'Systems & Graphics Consult',
    defaultMessage: "Hi Satya, I'm highly interested in your C/C++ work (Custom UNIX Shell, Power-of-Two Heap, DXT1 Compressor) and would love to review performance strategies or low-level techniques.",
    icon: Terminal
  },
  {
    id: 'general',
    label: 'General Networking',
    defaultMessage: "Hi Satya, I checked out your systems portfolio and wanted to reach out. Let's connect, talk tech, or grab virtual coffee!",
    icon: MailOpen
  }
];

function ThreeDCube({ size = 110, className = '', duration = 18, delay = 0 }) {
  return (
    <div className={`relative pointer-events-none select-none ${className}`} style={{ width: size, height: size, perspective: 800 }}>
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          rotateZ: [0, 180]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay
        }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 border border-gold/20 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center text-[9px] font-mono font-bold text-gold/30"
          style={{ transform: `translateZ(${size / 2}px)`, backfaceVisibility: 'hidden' }}
        >
          SYS_OS
        </div>
        {/* Back */}
        <div 
          className="absolute inset-0 border border-gold/20 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center text-[9px] font-mono font-bold text-gold/30"
          style={{ transform: `rotateY(180deg) translateZ(${size / 2}px)`, backfaceVisibility: 'hidden' }}
        >
          DB_SQL
        </div>
        {/* Left */}
        <div 
          className="absolute inset-0 border border-gold/20 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center text-[9px] font-mono font-bold text-gold/30"
          style={{ transform: `rotateY(-90deg) translateZ(${size / 2}px)`, backfaceVisibility: 'hidden' }}
        >
          I/O_DEV
        </div>
        {/* Right */}
        <div 
          className="absolute inset-0 border border-gold/20 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center text-[9px] font-mono font-bold text-gold/30"
          style={{ transform: `rotateY(90deg) translateZ(${size / 2}px)`, backfaceVisibility: 'hidden' }}
        >
          RAG_AI
        </div>
        {/* Top */}
        <div 
          className="absolute inset-0 border border-gold/20 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center text-[9px] font-mono font-bold text-gold/30"
          style={{ transform: `rotateX(90deg) translateZ(${size / 2}px)`, backfaceVisibility: 'hidden' }}
        >
          C_LANG
        </div>
        {/* Bottom */}
        <div 
          className="absolute inset-0 border border-gold/20 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center text-[9px] font-mono font-bold text-gold/30"
          style={{ transform: `rotateX(-90deg) translateZ(${size / 2}px)`, backfaceVisibility: 'hidden' }}
        >
          SHELL
        </div>
      </motion.div>
    </div>
  );
}

function ThreeDGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      {/* 3D Tilted Grid Gridlines */}
      <div 
        className="absolute -bottom-1/4 -left-1/4 w-[150%] h-[150%] origin-center"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(212, 175, 55, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(212, 175, 55, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            transform: 'rotateX(72deg) rotateZ(-28deg)',
            transformStyle: 'preserve-3d'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '128px 128px']
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      {/* Ambient cyber glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gold/5 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/5 blur-[150px]" />
    </div>
  );
}

export default function Contact() {
  const [selectedObjective, setSelectedObjective] = useState('hire');
  const [card1Tilt, setCard1Tilt] = useState({ x: 0, y: 0 });
  const [card2Tilt, setCard2Tilt] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (cardIdx: number, e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Calculate 3D rotation values (Max 7 degrees tilt)
    const rX = -(mouseY / (height / 2)) * 6;
    const rY = (mouseX / (width / 2)) * 6;
    
    if (cardIdx === 1) {
      setCard1Tilt({ x: rX, y: rY });
    } else {
      setCard2Tilt({ x: rX, y: rY });
    }
  };

  const handleCardMouseLeave = (cardIdx: number) => {
    if (cardIdx === 1) {
      setCard1Tilt({ x: 0, y: 0 });
    } else {
      setCard2Tilt({ x: 0, y: 0 });
    }
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleTab, setConsoleTab] = useState<'database' | 'integration'>('database');
  const [copied, setCopied] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [systemLogs, setSystemLogs] = useState<string[]>([
    'SYSTEM: SMTP router initialization complete.',
    'TARGET: Satya Thakur (US Citizen)',
    'HUB: Maryland'
  ]);

  // Set default message when objective changes, unless user modified it
  useEffect(() => {
    const obj = CONTACT_OBJECTIVES.find(o => o.id === selectedObjective);
    if (obj) {
      setFormData(prev => ({
        ...prev,
        message: obj.defaultMessage
      }));
      setSystemLogs(prev => [
        ...prev.slice(-4),
        `OBJECTIVE: Switched channel to [${obj.label}]`,
        `TEMPLATE: Preloaded standardized text prompt.`
      ]);
    }
  }, [selectedObjective]);

  // Fetch leads database to display in our live admin console
  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLeadsLoading(false);
    }
  };

  useEffect(() => {
    if (showConsole) {
      fetchLeads();
    }
  }, [showConsole]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Your name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Your contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please include a short message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSystemLogs(prev => [
      ...prev.slice(-3),
      `POST: Transmitting payload to /api/contact...`,
      `DATA: Inquirer=[${formData.name}] Email=[${formData.email}]`
    ]);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to record inquiry.');
      }

      setSystemLogs(prev => [
        ...prev.slice(-3),
        `STATUS: Registered secure lead in SQLite/JSON backup.`,
        `ROUTING: Compiling mailto scheme...`,
        `CLIENT: Triggering system default mail client...`
      ]);

      // Open user's business/personal email client with our email and message pre-filled
      const subject = `Inquiry: Connecting with Satya Thakur (${formData.name})`;
      const body = `Hi Satya,

${formData.message}

Best regards,
${formData.name}
${formData.company ? `Company: ${formData.company}\n` : ''}Email: ${formData.email}`;

      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Delay slightly for visual logging before initiating mailto redirect
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 800);

      setSubmitSuccess(true);
      // Keep form inputs visible in success screen or reset cleanly
      setErrors({});
      
      if (showConsole) {
        await fetchLeads();
      }
    } catch (err: any) {
      setErrors({ form: err.message || 'Unable to register connection right now.' });
      setSystemLogs(prev => [
        ...prev,
        `ERROR: ${err.message || 'Transmission failure.'}`
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitSuccess(false);
    setFormData({ name: '', email: '', company: '', message: '' });
    setSelectedObjective('hire');
  };

  return (
    <section
      id="contact"
      className="py-24 bg-[#0A0A0A] relative border-t border-white/5 overflow-hidden"
    >
      {/* 3D Moving Grid and Particle glow effects */}
      <ThreeDGridBackground />

      {/* Floating 3D Wireframe Cubes in background */}
      <motion.div
        className="absolute top-16 left-10 z-0 hidden lg:block opacity-60"
        animate={{
          y: [-12, 12, -12],
          rotate: [0, 8, 0]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ThreeDCube size={100} duration={22} />
      </motion.div>

      <motion.div
        className="absolute bottom-24 right-12 z-0 hidden lg:block opacity-65"
        animate={{
          y: [15, -15, 15],
          rotate: [0, -8, 0]
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ThreeDCube size={130} duration={26} delay={2} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-widest text-zinc-400 mb-3"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            Seamless Client Integration
          </motion.div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight">
            Connect & Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed font-sans">
            Choose your connection channel below. Your inquiry is securely saved to our database and instantly routed to your email app to send the message.
          </p>
        </div>

        {/* Unified "Get in Touch" Dashboard Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Systems Diagnostic Terminal & Direct Channels */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-between space-y-6 z-10"
            onMouseMove={(e) => handleCardMouseMove(1, e)}
            onMouseLeave={() => handleCardMouseLeave(1)}
            style={{
              transformStyle: 'preserve-3d',
              transform: `perspective(1000px) rotateX(${card1Tilt.x}deg) rotateY(${card1Tilt.y}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="glass-card p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-850 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-gold/80 animate-ping" />
                    <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-zinc-300">
                      SYS_DIAG_CONSOLE v3.5
                    </span>
                  </div>
                  <Cpu className="w-4 h-4 text-zinc-500" />
                </div>

                {/* Simulated Terminal Diagnostics */}
                <div className="bg-[#050505] p-4 border border-zinc-900 rounded font-mono text-[11px] leading-relaxed text-zinc-400 space-y-2 mb-6 h-48 overflow-y-auto">
                  <div className="text-zinc-600">--- PORT 3000 CONNECTION DIAGNOSTICS ---</div>
                  {systemLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-gold/60">&gt;</span>
                      <span className={log.startsWith('ERROR') ? 'text-red-400' : log.startsWith('STATUS') ? 'text-emerald-400' : ''}>
                        {log}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quick Channel Cards embedded for elegance */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest font-mono text-zinc-500 font-bold mb-3">
                    Direct System Coordinates
                  </h4>
                  
                  <div className="p-3 bg-zinc-950 border border-zinc-900 rounded flex items-center justify-between group hover:border-gold/30 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-850 text-gold flex items-center justify-center">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono text-zinc-500 uppercase font-bold">Email Secure Link</span>
                        <a href={`mailto:${personalInfo.email}`} className="text-[#EDEDED] font-serif font-bold text-xs hover:text-gold transition-colors">
                          {personalInfo.email}
                        </a>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-gold transition-all" />
                  </div>

                  <div className="p-3 bg-zinc-950 border border-zinc-900 rounded flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-850 text-gold flex items-center justify-center">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-zinc-500 uppercase font-bold">Geographic Target</span>
                      <span className="text-zinc-300 font-sans text-xs">
                        {personalInfo.location} ({personalInfo.citizenship})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
 
          {/* Right Column: Interactive connection portal form */}
          <motion.div 
            className="lg:col-span-7 z-10"
            onMouseMove={(e) => handleCardMouseMove(2, e)}
            onMouseLeave={() => handleCardMouseLeave(2)}
            style={{
              transformStyle: 'preserve-3d',
              transform: `perspective(1000px) rotateX(${card2Tilt.x}deg) rotateY(${card2Tilt.y}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="glass-card p-8 h-full flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-8 rounded bg-zinc-900/40 border border-zinc-800 text-center space-y-6 my-auto"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto text-gold animate-pulse">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-gold text-lg">
                        Inquiry Initiated Successfully!
                      </h4>
                      <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto leading-relaxed font-sans">
                        Your connection request has been logged in the local portfolio database.
                      </p>
                      <p className="text-xs text-zinc-300 mt-2 max-w-md mx-auto leading-relaxed font-sans font-bold">
                        Your device's default email client is now pre-composing a secure message to {personalInfo.email}. Please review and hit send!
                      </p>
                    </div>
                    
                    <div className="pt-2">
                      <button
                        onClick={handleReset}
                        className="accent-button px-6 py-2.5 text-[10px] font-bold transition-all cursor-pointer uppercase tracking-wider"
                      >
                        Initiate Another Connection
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Connection Objective Selector */}
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono mb-3">
                        1. Select Connection Objective
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {CONTACT_OBJECTIVES.map((obj) => {
                          const IconComponent = obj.icon;
                          const isSelected = selectedObjective === obj.id;
                          return (
                            <button
                              key={obj.id}
                              type="button"
                              onClick={() => setSelectedObjective(obj.id)}
                              className={`p-3 text-left border rounded transition-all cursor-pointer ${
                                isSelected 
                                  ? 'bg-zinc-900/80 border-gold/40 text-gold shadow-md shadow-gold/5' 
                                  : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-850 hover:bg-zinc-900/30'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <IconComponent className={`w-4 h-4 ${isSelected ? 'text-gold' : 'text-zinc-500'}`} />
                                <span className="font-serif font-bold text-[11px] truncate">
                                  {obj.label.split(' ')[0]} {obj.label.split(' ').slice(1).join(' ')}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Metadata Details */}
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono mb-3">
                        2. Enterprise Coordinates
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <input
                            type="text"
                            placeholder="Full Name *"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full contact-input text-xs ${
                              errors.name ? 'border-red-900 focus:border-red-500' : ''
                            }`}
                          />
                          {errors.name && (
                            <span className="text-[10px] font-mono text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.name}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <input
                            type="email"
                            placeholder="Professional Email *"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full contact-input text-xs ${
                              errors.email ? 'border-red-900 focus:border-red-500' : ''
                            }`}
                          />
                          {errors.email && (
                            <span className="text-[10px] font-mono text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.email}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3">
                        <input
                          type="text"
                          placeholder="Company / Organization (Optional)"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full contact-input text-xs"
                        />
                      </div>
                    </div>

                    {/* Inquiry Prompt Text Area */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono mb-2">
                        3. Pre-Compiled Message Body
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Type or modify your secure message here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full contact-input text-xs font-sans leading-relaxed ${
                          errors.message ? 'border-red-900 focus:border-red-500' : ''
                        }`}
                      />
                      {errors.message && (
                        <span className="text-[10px] font-mono text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {errors.form && (
                      <div className="p-3 rounded bg-zinc-950 text-red-400 border border-red-900/40 flex items-center gap-2 text-xs font-mono">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errors.form}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="accent-button w-full py-3.5 mt-2 font-bold cursor-pointer transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 group border border-gold/40 hover:bg-gold hover:text-black"
                    >
                      {submitting ? 'Redirecting...' : 'Get in Touch (Open Mail App)'}
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Live Leads & HTML Integration Hub (Interactive Developer Console) */}
        <div className="mt-12">
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              id="toggle-leads-explorer-btn"
              onClick={() => {
                if (showConsole && consoleTab === 'database') {
                  setShowConsole(false);
                } else {
                  setConsoleTab('database');
                  setShowConsole(true);
                }
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold border transition-all cursor-pointer shadow-sm ${
                showConsole && consoleTab === 'database'
                  ? 'bg-gold text-black border-gold font-bold scale-[1.02]'
                  : 'bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border-zinc-900'
              }`}
              title="Reveal real collected inquiries instantly"
            >
              <Database className="w-3.5 h-3.5" />
              Inspect Inquiries Database
            </button>

            <button
              id="toggle-integration-btn"
              onClick={() => {
                if (showConsole && consoleTab === 'integration') {
                  setShowConsole(false);
                } else {
                  setConsoleTab('integration');
                  setShowConsole(true);
                }
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold border transition-all cursor-pointer shadow-sm ${
                showConsole && consoleTab === 'integration'
                  ? 'bg-gold text-black border-gold font-bold scale-[1.02]'
                  : 'bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border-zinc-900'
              }`}
              title="Get HTML Embed Integration Code"
            >
              <Code className="w-3.5 h-3.5" />
              HTML Integration Embed Code
            </button>
          </div>

          <AnimatePresence>
            {showConsole && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="mt-6 border border-zinc-850 rounded overflow-hidden bg-[#0D0D0D] shadow-2xl shadow-black/80"
              >
                {/* Panel Header */}
                <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-850 flex justify-between items-center">
                  <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 font-bold uppercase tracking-wider">
                    {consoleTab === 'database' ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-gold" />
                        <span>Inquiries Sandbox Database Logs</span>
                      </>
                    ) : (
                      <>
                        <Code className="w-3.5 h-3.5 text-gold" />
                        <span>HTML Embeddable Widget Generator</span>
                      </>
                    )}
                  </div>
                  {consoleTab === 'database' && (
                    <button
                      id="refresh-leads-btn"
                      onClick={fetchLeads}
                      className="text-[10px] font-mono text-gold hover:text-white underline cursor-pointer flex items-center gap-1"
                    >
                      <RefreshCw className="w-2.5 h-2.5 animate-spin-slow" />
                      Force Refresh
                    </button>
                  )}
                </div>

                {/* Panel Body */}
                <div className="p-6 bg-[#050505]">
                  {consoleTab === 'database' ? (
                    leadsLoading ? (
                      <div className="text-center py-6 font-mono text-xs text-zinc-500">
                        Querying local leads table...
                      </div>
                    ) : leads.length === 0 ? (
                      <div className="text-center py-8 text-sm text-zinc-500 font-mono">
                        No inquiries submitted in this session yet. Complete the 'Get in Touch' portal above to test it!
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs font-mono">
                          <thead>
                            <tr className="border-b border-zinc-850 text-zinc-500 uppercase text-[9px] tracking-widest font-bold">
                              <th className="py-3 px-4 font-bold">Inquirer</th>
                              <th className="py-3 px-4 font-bold">Contact Email</th>
                              <th className="py-3 px-4 font-bold">Company</th>
                              <th className="py-3 px-4 font-bold">Inquiry Message</th>
                              <th className="py-3 px-4 font-bold">Dispatched Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-900 text-zinc-300">
                            {leads.map((lead) => (
                              <tr key={lead.id} id={`lead-row-${lead.id}`} className="hover:bg-zinc-900/20">
                                <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-1.5">
                                  <User className="w-3 h-3 text-zinc-500" />
                                  {lead.name}
                                </td>
                                <td className="py-3.5 px-4">{lead.email}</td>
                                <td className="py-3.5 px-4">
                                  {lead.company ? (
                                    <span className="inline-flex items-center gap-1">
                                      <Building className="w-3 h-3 text-zinc-500" />
                                      {lead.company}
                                    </span>
                                  ) : (
                                    <span className="text-zinc-500">-</span>
                                  )}
                                </td>
                                <td className="py-3.5 px-4 max-w-xs truncate" title={lead.message}>
                                  {lead.message}
                                </td>
                                <td className="py-3.5 px-4 text-zinc-500">
                                  {new Date(lead.createdAt).toLocaleString([], { hour12: false })}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                  ) : (
                    /* HTML Integration Section */
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                      {/* Left: Code Box and Description */}
                      <div className="space-y-4">
                        <div className="text-zinc-400 font-sans text-xs leading-relaxed">
                          <p className="font-bold text-zinc-200 mb-1">Combine Everything Into Any Website</p>
                          Want to integrate Satya's contact interface on your own static web pages or external systems? 
                          This pure HTML template includes custom CSS, inputs, validation logic, and native mail client dispatching in a single code block. No backend required!
                        </div>

                        <div className="relative">
                          {/* Copy code button */}
                          <button
                            onClick={() => {
                              const embedCode = `<!-- Satya Thakur Contact Widget Integration -->
<div class="satya-contact-widget" style="font-family: 'Inter', system-ui, sans-serif; background: #0c0c0c; border: 1px solid #1c1c1c; padding: 24px; border-radius: 8px; max-width: 480px; color: #ededed; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
  <h3 style="margin-top: 0; font-family: serif; font-size: 20px; color: #ffffff; border-bottom: 1px solid #222; padding-bottom: 12px; font-weight: bold;">Contact Satya Thakur</h3>
  <form id="satyaContactEmbed" onsubmit="handleSatyaRedirect(event)">
    <div style="margin-bottom: 14px;">
      <label style="display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px; color: #a1a1aa; letter-spacing: 0.05em;">Full Name</label>
      <input type="text" id="embedName" required placeholder="Jane Doe" style="width: 100%; padding: 10px 12px; background: #141414; border: 1px solid #27272a; border-radius: 4px; color: #ffffff; font-size: 13px; box-sizing: border-box; transition: border-color 0.2s;" />
    </div>
    <div style="margin-bottom: 14px;">
      <label style="display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px; color: #a1a1aa; letter-spacing: 0.05em;">Professional Email</label>
      <input type="email" id="embedEmail" required placeholder="jane@company.com" style="width: 100%; padding: 10px 12px; background: #141414; border: 1px solid #27272a; border-radius: 4px; color: #ffffff; font-size: 13px; box-sizing: border-box;" />
    </div>
    <div style="margin-bottom: 18px;">
      <label style="display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px; color: #a1a1aa; letter-spacing: 0.05em;">Message Body</label>
      <textarea id="embedMessage" required rows="4" placeholder="Type message here..." style="width: 100%; padding: 10px 12px; background: #141414; border: 1px solid #27272a; border-radius: 4px; color: #ffffff; font-size: 13px; box-sizing: border-box; resize: vertical; min-height: 80px;"></textarea>
    </div>
    <button type="submit" style="width: 100%; padding: 12px; background: #D4AF37; border: none; border-radius: 4px; color: #000000; font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; transition: all 0.2s;">
      Get in Touch
    </button>
  </form>
  <script>
    function handleSatyaRedirect(e) {
      e.preventDefault();
      const name = document.getElementById('embedName').value;
      const email = document.getElementById('embedEmail').value;
      const msg = document.getElementById('embedMessage').value;
      const subject = "Inquiry: Connection from " + name;
      const body = "Hi Satya,\\n\\n" + msg + "\\n\\nBest regards,\\n" + name + "\\nEmail: " + email;
      window.location.href = "mailto:${personalInfo.email}?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    }
  </script>
</div>`;
                              navigator.clipboard.writeText(embedCode);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }}
                            className="absolute top-3 right-3 z-10 p-2 rounded bg-zinc-900 border border-zinc-800 hover:border-gold text-zinc-400 hover:text-gold transition-all cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold"
                          >
                            {copied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-[10px] text-emerald-400">Copied Code!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span className="text-[10px]">Copy Code</span>
                              </>
                            )}
                          </button>

                          <pre className="p-4 bg-zinc-950 rounded border border-zinc-900 overflow-x-auto text-[11px] font-mono leading-relaxed text-zinc-300 max-h-96">
{`<!-- Satya Thakur Contact Widget Integration -->
<div class="satya-contact-widget" style="font-family: 'Inter', sans-serif; background: #0c0c0c; ...">
  <h3 style="margin-top: 0; color: #ffffff;">Contact Satya Thakur</h3>
  <form id="satyaContactEmbed" onsubmit="handleSatyaRedirect(event)">
    <!-- Inputs for Name, Email, and Message -->
    <input type="text" id="embedName" required />
    <input type="email" id="embedEmail" required />
    <textarea id="embedMessage" required></textarea>
    
    <button type="submit">Get in Touch</button>
  </form>
  
  <script>
    function handleSatyaRedirect(e) {
      e.preventDefault();
      const name = document.getElementById('embedName').value;
      const email = document.getElementById('embedEmail').value;
      const msg = document.getElementById('embedMessage').value;
      const subject = "Inquiry: Connection from " + name;
      const body = "Hi Satya,\\n\\n" + msg + "\\n\\nBest regards,\\n" + name + "\\nEmail: " + email;
      window.location.href = "mailto:${personalInfo.email}?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    }
  </script>
</div>`}
                          </pre>
                        </div>
                      </div>

                      {/* Right: Simulated Interactive Preview Container */}
                      <div className="space-y-4">
                        <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider font-bold">
                          Live Embedded Widget Simulation
                        </div>

                        <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-lg flex items-center justify-center">
                          {/* Live Simulator Widget */}
                          <div className="w-full max-w-sm bg-[#0c0c0c] border border-zinc-800 p-6 rounded-md text-zinc-200 font-sans shadow-xl">
                            <h4 className="font-serif font-bold text-base text-white border-b border-zinc-850 pb-3 mb-4 flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-gold" />
                              Contact Satya Thakur
                            </h4>

                            <div className="space-y-3 text-left">
                              <div>
                                <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-1">Full Name</label>
                                <input 
                                  type="text" 
                                  placeholder="e.g. Jane Doe" 
                                  defaultValue="Visitor Name"
                                  className="w-full bg-[#141414] border border-zinc-800 rounded p-2 text-xs text-white outline-none focus:border-gold/50" 
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-1">Professional Email</label>
                                <input 
                                  type="email" 
                                  placeholder="e.g. jane@company.com" 
                                  defaultValue="visitor@example.com"
                                  className="w-full bg-[#141414] border border-zinc-800 rounded p-2 text-xs text-white outline-none focus:border-gold/50" 
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-1">Message Body</label>
                                <textarea 
                                  rows={3} 
                                  placeholder="Your custom message..." 
                                  defaultValue="Hi Satya, I'm trying out the HTML integration block. It redirects instantly to my local default mail application pre-composing a message to your address."
                                  className="w-full bg-[#141414] border border-zinc-800 rounded p-2 text-xs text-white outline-none focus:border-gold/50 resize-none"
                                />
                              </div>

                              <button 
                                onClick={() => {
                                  const subject = "Inquiry: Connection from Visitor Name";
                                  const body = `Hi Satya,\n\nHi Satya, I'm trying out the HTML integration block. It redirects instantly to my local default mail application pre-composing a message to your address.\n\nBest regards,\nVisitor Name\nEmail: visitor@example.com`;
                                  window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                                }}
                                className="w-full bg-gold text-black hover:bg-gold/90 transition-colors font-bold text-[10px] uppercase tracking-widest py-2.5 rounded shadow-md mt-2 cursor-pointer flex items-center justify-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                Test Embed Trigger
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

