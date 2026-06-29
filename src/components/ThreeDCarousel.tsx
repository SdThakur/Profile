import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCw, 
  MousePointerClick, 
  ChevronLeft, 
  ChevronRight, 
  Github, 
  Terminal, 
  Maximize2 
} from 'lucide-react';

interface ProjectSlide {
  id: string;
  title: string;
  category: string;
  tagline: string;
  image: string;
  metrics: string;
  details: string[];
  tech: string[];
  link?: string;
  githubUrl?: string;
}

const CAROUSEL_SLIDES: ProjectSlide[] = [
  {
    id: 'rag-pipeline',
    title: 'Retrieval-Augmented Generation (RAG) Pipeline',
    category: 'AI & NLP Engine',
    tagline: 'High-speed semantic search over 10,000+ text chunks with ChromaDB.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    metrics: '80% faster document lookup | 35% recall boost',
    details: [
      'Built an automated text vectorization pipeline using FastAPI and ChromaDB.',
      'Optimized semantic lookup recall by 35% with a calibrated cosine similarity threshold (0.75 to 0.45).',
      'Future-proofed pipeline using a secure, server-side AI processing wrapper.'
    ],
    tech: ['Python', 'FastAPI', 'ChromaDB', 'Streamlit'],
    githubUrl: 'https://github.com/SdThakur/RAG-Pipeline.git'
  },
  {
    id: 'kernel-driver',
    title: 'Linux Character Device Driver',
    category: 'Low-Level Kernel Space',
    tagline: 'Zero-crash memory isolation and system call ioctl coordinate registers.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    metrics: 'Zero kernel crashes | 500+ secure board writes',
    details: [
      'Designed a custom Linux system-level char driver targeting physical LED matrices.',
      'Protected direct user-to-kernel memory mapping registers from buffer overflows.',
      'Configured custom ioctl system calls handling state cycles safely.'
    ],
    tech: ['C Lang', 'Linux Kernel', 'Ioctl', 'Syscalls', 'Memory Layouts'],
    githubUrl: 'https://github.com/SdThakur/Connect-Four-Kernel-Module.git'
  },
  {
    id: 'parking-mgmt',
    title: 'UMBC Parking Management System',
    category: 'Database Architectures',
    tagline: 'Automated campus parking logistics and pessimistic locking reservation controls for 500+ spots.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    metrics: '40% latency reduction | Safe from double-bookings',
    details: [
      'Engineered SELECT FOR UPDATE row-level lock procedures at the PostgreSQL layer.',
      'Constructed B-Tree index mappings and automated materialized views.',
      'Fully containerized the system utilizing multi-stage Docker configurations.'
    ],
    tech: ['PostgreSQL', 'Docker', 'Python', 'Streamlit'],
    githubUrl: 'https://github.com/SdThakur/UMBC-Parking-System.git'
  },
  {
    id: 'task-scheduler',
    title: 'Multithreaded Priority Task Scheduler',
    category: 'Systems & Concurrency',
    tagline: '3-tier priority execution channels built using raw POSIX threading APIs.',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&w=800&q=80',
    metrics: 'Passed Valgrind leak-free | 1,000+ concurrent tasks',
    details: [
      'Simulated background processing queues with customizable priority allocation.',
      'Protected critical race conditions using standard POSIX mutex locks and semaphores.',
      'Constructed aging elements to resolve background starvation issues.'
    ],
    tech: ['C Lang', 'Pthreads', 'Mutexes', 'Semaphores', 'Valgrind'],
    githubUrl: 'https://github.com/SdThakur/Task-Scheduler-with-Priority-and-Resource-Constraints.git'
  },
  {
    id: 'ctf-security-tools',
    title: 'Binary Exploitation & CTF Security Tools',
    category: 'Cybersecurity & Auditing',
    tagline: 'Automated vulnerability validation tools and low-level stack exploitation scripts.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    metrics: '99% exploit precision | 20+ CTF targets simulated',
    details: [
      'Engineered reliable stack-smashing payload scripts and customized ROP chains.',
      'Audited virtual memory boundaries to study buffer overflows and protections (NX, ASLR).',
      'Constructed raw socket packet-intercept decoders tracing malicious payloads.'
    ],
    tech: ['Python', 'Reverse Engineering', 'ROP Chains', 'Packet Analysis'],
  },
];

interface TiltCardProps {
  slide: ProjectSlide;
  index: number;
  rotation: number;
  setSelectedSlide: (slide: ProjectSlide) => void;
  key?: React.Key;
}

// Separate top-level component with tilt logic
function TiltCard({ slide, index, rotation, setSelectedSlide }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate tilts
    const rX = ((mouseY / height) - 0.5) * -16; // Up to 16 deg tilt
    const rY = ((mouseX / width) - 0.5) * 16;
    
    setTiltX(rX);
    setTiltY(rY);

    // Light/Glow position %
    const gX = (mouseX / width) * 100;
    const gY = (mouseY / height) * 100;
    setGlowX(gX);
    setGlowY(gY);
  };

  const handleMouseLeaveCard = () => {
    setTiltX(0);
    setTiltY(0);
  };

  // Calculate 3D layout parameters for cylinder
  const totalSlides = CAROUSEL_SLIDES.length;
  const angleStep = 360 / totalSlides;
  const currentAngle = (index * angleStep) + rotation;
  
  // Radius of the cylinder
  const radius = CAROUSEL_SLIDES.length > 5 ? 420 : 340; 
  
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMoveCard}
      onMouseLeave={handleMouseLeaveCard}
      onClick={() => setSelectedSlide(slide)}
      className="absolute w-[240px] sm:w-[280px] h-[350px] transition-shadow duration-300 rounded cursor-pointer group origin-center select-none"
      style={{
        transform: `rotateY(${currentAngle}deg) translateZ(${radius}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Futuristic Card Frame */}
      <div className="absolute inset-0 bg-zinc-950 border border-white/10 rounded-lg overflow-hidden flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.6)] group-hover:border-gold/45 transition-colors duration-300">
        
        {/* Card Image Cover */}
        <div className="h-[140px] w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
          
          {/* Project Category Tag */}
          <span className="absolute top-3 left-3 z-20 px-2 py-0.5 bg-zinc-950/80 border border-zinc-800 text-[8px] uppercase tracking-widest text-gold font-mono rounded-sm">
            {slide.category}
          </span>
        </div>

        {/* Card Content body */}
        <div className="p-4 flex-1 flex flex-col justify-between bg-zinc-950">
          <div>
            <h3 className="font-serif font-bold text-sm text-[#EDEDED] group-hover:text-gold transition-colors duration-200">
              {slide.title}
            </h3>
            <p className="text-[11px] text-zinc-400 mt-2 line-clamp-3 font-sans leading-relaxed">
              {slide.tagline}
            </p>
          </div>

          {/* Bottom info row */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
            <span>Metric Highlight</span>
            <span className="text-gold flex items-center gap-1 font-semibold">
              View <Maximize2 className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>

        {/* Dynamic Light/Glow Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 120px at ${glowX}% ${glowY}%, rgba(212,175,55,0.15), transparent)`,
          }}
        />
      </div>
    </div>
  );
}

export default function ThreeDCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [selectedSlide, setSelectedSlide] = useState<ProjectSlide | null>(null);
  
  // Drag and rotation control state
  const [rotation, setRotation] = useState(0);
  const dragStart = useRef<number | null>(null);
  const rotationStart = useRef<number>(0);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // Auto rotation timer
  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotation(prev => prev - (360 / CAROUSEL_SLIDES.length));
      setActiveIndex(prev => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isRotating]);

  const handleNext = () => {
    setIsRotating(false);
    setRotation(prev => prev - (360 / CAROUSEL_SLIDES.length));
    setActiveIndex(prev => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handlePrev = () => {
    setIsRotating(false);
    setRotation(prev => prev + (360 / CAROUSEL_SLIDES.length));
    setActiveIndex(prev => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  // Drag Handlers for 3D spin interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsRotating(false);
    dragStart.current = e.clientX;
    rotationStart.current = rotation;
    if (carouselContainerRef.current) {
      carouselContainerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart.current === null) return;
    const deltaX = e.clientX - dragStart.current;
    // Calibrate movement sensitivity
    const sensitiveRotation = rotationStart.current + (deltaX * 0.25);
    setRotation(sensitiveRotation);
  };

  const handleMouseUpOrLeave = () => {
    if (dragStart.current === null) return;
    dragStart.current = null;
    if (carouselContainerRef.current) {
      carouselContainerRef.current.style.cursor = 'grab';
    }
    
    // Snap to nearest slide angle
    const angleStep = 360 / CAROUSEL_SLIDES.length;
    const rawSnappedIndex = Math.round(-rotation / angleStep);
    const snappedRotation = -rawSnappedIndex * angleStep;
    
    // Smooth snap with dynamic spring feel
    setRotation(snappedRotation);
    
    // Adjust active slide index mathematically
    const positiveIndex = ((rawSnappedIndex % CAROUSEL_SLIDES.length) + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length;
    setActiveIndex(positiveIndex);
  };

  return (
    <section id="threed-deck" className="py-24 bg-[#0A0A0A] relative z-10 overflow-hidden border-b border-white/5">
      
      {/* Decorative cyber backdrop circles */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none -z-10">
        <div className="w-[800px] h-[800px] rounded-full border border-white/5 opacity-40 animate-pulse" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-white/5 opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-widest text-zinc-400 mb-3"
          >
            <RotateCw className="w-3.5 h-3.5 text-gold" />
            3D Interactive Space
          </motion.div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight">
            Immersive 3D Project Deck
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed font-sans">
            Spin the dimensional cylinder to inspect Satya's core projects. Drag laterally or use the navigation indicators to browse through system nodes and live statistics.
          </p>
        </div>

        {/* 3D Cylinder Arena */}
        <div className="h-[440px] flex items-center justify-center relative select-none">
          
          {/* Cylinder Wrapper with high-perspective */}
          <div 
            ref={carouselContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="w-full max-w-xl h-[400px] flex items-center justify-center relative cursor-grab active:cursor-grabbing"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* The spinning group container */}
            <div 
              className="relative w-full h-full flex items-center justify-center transform transition-transform duration-300 ease-out"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {CAROUSEL_SLIDES.map((slide, idx) => (
                <TiltCard 
                  key={slide.id} 
                  slide={slide} 
                  index={idx} 
                  rotation={rotation}
                  setSelectedSlide={setSelectedSlide}
                />
              ))}
            </div>
          </div>

          {/* Interactive Drag Hint overlay */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-zinc-950 border border-zinc-900 px-3 py-1.5 rounded-full text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
            <MousePointerClick className="w-3.5 h-3.5 text-gold" />
            Drag horizontally to spin
          </div>
        </div>

        {/* Console Controls & Navigation Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto mt-10 p-5 bg-zinc-950 border border-zinc-900 rounded-lg">
          
          {/* Slide Indicator bullets */}
          <div className="flex items-center gap-2">
            {CAROUSEL_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsRotating(false);
                  const angleStep = 360 / CAROUSEL_SLIDES.length;
                  const deltaIndex = idx - activeIndex;
                  setRotation(prev => prev - (deltaIndex * angleStep));
                  setActiveIndex(idx);
                }}
                className={`h-1.5 transition-all duration-300 rounded ${
                  idx === activeIndex ? 'w-8 bg-gold' : 'w-2 bg-zinc-850 hover:bg-zinc-700'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Center Label of Active Project */}
          <div className="text-center sm:text-left">
            <span className="text-[9px] font-mono tracking-widest text-gold uppercase font-bold block mb-0.5">
              Inspecting Slide {activeIndex + 1} of {CAROUSEL_SLIDES.length}
            </span>
            <span className="font-serif font-bold text-sm text-zinc-100">
              {CAROUSEL_SLIDES[activeIndex].title}
            </span>
          </div>

          {/* Play/Pause & Left/Right Action Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`px-3 py-1.5 border font-mono text-[10px] uppercase rounded transition-all cursor-pointer ${
                isRotating 
                  ? 'bg-gold/10 border-gold/40 text-gold font-bold' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-[#EDEDED]'
              }`}
            >
              {isRotating ? 'Auto-Spin [ON]' : 'Auto-Spin [OFF]'}
            </button>
            <div className="flex gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white rounded cursor-pointer transition-colors"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white rounded cursor-pointer transition-colors"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Slide Zoom Details Modal Portal (Spring Animated) */}
        <AnimatePresence>
          {selectedSlide && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-full max-w-2xl bg-zinc-950 border border-zinc-900 rounded-lg overflow-hidden flex flex-col md:flex-row shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
              >
                
                {/* Modal Visual Left Cover */}
                <div className="w-full md:w-[240px] h-[180px] md:h-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent z-10" />
                  <img 
                    src={selectedSlide.image} 
                    alt={selectedSlide.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="px-2 py-0.5 bg-gold text-black text-[9px] uppercase font-bold tracking-widest rounded-sm block max-w-fit mb-1">
                      {selectedSlide.category}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                      UMBC Engineering Archive
                    </span>
                  </div>
                </div>

                {/* Modal Content Right Detail */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-serif font-bold text-xl text-[#EDEDED]">
                          {selectedSlide.title}
                        </h3>
                        <p className="text-xs text-gold/90 font-mono uppercase tracking-widest mt-0.5">
                          {selectedSlide.metrics}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedSlide(null)}
                        className="p-1 text-zinc-500 hover:text-white font-mono text-xs cursor-pointer border border-zinc-900 bg-zinc-950 hover:bg-zinc-900 rounded"
                      >
                        [ESC] Close
                      </button>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-5">
                      {selectedSlide.tagline}
                    </p>

                    <div className="space-y-2.5 mb-6">
                      {selectedSlide.details.map((detail, idx) => (
                        <div key={idx} className="flex gap-2.5 text-xs text-zinc-300">
                          <span className="text-gold font-bold">&bull;</span>
                          <span className="font-sans leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech tag list */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {selectedSlide.tech.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-[9px] font-mono bg-zinc-900 border border-zinc-850 rounded text-zinc-400 uppercase">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-4 border-t border-white/5 flex gap-3">
                    {selectedSlide.githubUrl && (
                      <a
                        href={selectedSlide.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[#EDEDED] text-xs font-bold uppercase tracking-wider rounded transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Source Code
                      </a>
                    )}
                    <button
                      onClick={() => {
                        setSelectedSlide(null);
                        // Smooth scroll to sandbox simulation
                        const el = document.getElementById('projects');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold hover:bg-gold-hover text-black text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      Run Code Simulation
                    </button>
                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
