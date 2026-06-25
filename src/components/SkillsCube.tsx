import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  Hand,
  Sparkles,
  Code,
  Copy,
  Check,
  ExternalLink,
  Lock
} from 'lucide-react';

export default function SkillsCube() {
  const cubeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFace, setActiveFace] = useState<string>('highlights'); // Default to highlights
  const [showConsole, setShowConsole] = useState(false);
  const [copied, setCopied] = useState(false);

  // Drag state
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const currentX = useRef<number>(-90); // default rotX for Bottom (highlights) face to match user setup
  const currentY = useRef<number>(0);   // default rotY for Bottom (highlights) face
  const targetX = useRef<number>(-90);
  const targetY = useRef<number>(0);

  // Helper to rotate to specific angles
  const rotateTo = (rotX: number, rotY: number) => {
    // Identify which face matches this target rotation
    if (rotX === 0 && rotY === 0) setActiveFace('about');
    else if (rotX === 0 && rotY === -90) setActiveFace('projects');
    else if (rotX === 0 && rotY === 180) setActiveFace('skills');
    else if (rotX === 0 && rotY === 90) setActiveFace('experience');
    else if (rotX === -90 && rotY === 0) setActiveFace('education');
    else if (rotX === 90 && rotY === 0) setActiveFace('highlights');

    targetX.current = rotX;
    targetY.current = rotY;

    if (cubeRef.current) {
      gsap.to(cubeRef.current, {
        rotateX: rotX,
        rotateY: rotY,
        duration: 1.2,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }
  };

  // Drag Handlers
  const handleStart = (clientX: number, clientY: number) => {
    isDragging.current = true;
    startX.current = clientX;
    startY.current = clientY;
    currentX.current = targetX.current;
    currentY.current = targetY.current;

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;

    const deltaX = clientX - startX.current;
    const deltaY = clientY - startY.current;

    // Y drag rotates on X axis, X drag rotates on Y axis
    targetY.current = currentY.current + deltaX * 0.45;
    targetX.current = currentX.current - deltaY * 0.45;

    // Soft clamp rotation on X to avoid extreme flips
    if (targetX.current > 115) targetX.current = 115;
    if (targetX.current < -115) targetX.current = -115;

    if (cubeRef.current) {
      gsap.to(cubeRef.current, {
        rotateX: targetX.current,
        rotateY: targetY.current,
        duration: 0.25,
        ease: 'power1.out',
        overwrite: 'auto'
      });
    }
  };

  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }

    // Snap to nearest face on end of drag
    let normX = ((targetX.current % 360) + 360) % 360;
    let normY = ((targetY.current % 360) + 360) % 360;

    // Convert negative ranges to positive equivalents
    if (normX > 180) normX -= 360;
    if (normY > 180) normY -= 360;

    let bestFace = 'about';
    let bestX = 0;
    let bestY = 0;
    let minDistance = Infinity;

    const faceAngles = [
      { id: 'about', x: 0, y: 0 },
      { id: 'projects', x: 0, y: -90 },
      { id: 'skills', x: 0, y: 180 },
      { id: 'experience', x: 0, y: 90 },
      { id: 'education', x: -90, y: 0 },
      { id: 'highlights', x: 90, y: 0 },
    ];

    faceAngles.forEach((fa) => {
      const dx = Math.abs(normX - fa.x);
      const dy = Math.abs(normY - fa.y);
      const dist = Math.min(dx, 360 - dx) + Math.min(dy, 360 - dy);
      if (dist < minDistance) {
        minDistance = dist;
        bestFace = fa.id;
        bestX = fa.x;
        bestY = fa.y;
      }
    });

    setActiveFace(bestFace);
    rotateTo(bestX, bestY);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      handleEnd();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches.length > 0) {
        // Prevent default scrolling when actively spinning/dragging the cube
        if (e.cancelable) {
          e.preventDefault();
        }
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      handleEnd();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  // Snap to highlights on component mount to match requested screenshot
  useEffect(() => {
    rotateTo(90, 0);
  }, []);

  return (
    <section className="cube-section" id="cube">
      {/* Scope Scoped Styling block to achieve beautiful precision layout of the cube faces */}
      <style>{`
        .cube-section {
          padding: 88px 0;
          background-color: #0A0A0A;
          color: #EDEDED;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .section-header {
          text-align: center;
          margin-bottom: 48px;
          max-width: 650px;
          padding: 0 24px;
        }

        .section-eyebrow {
          display: inline-block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #D4AF37;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .section-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 32px;
          font-weight: 700;
          color: #EDEDED;
          letter-spacing: -0.01em;
          line-height: 1.25;
        }

        .cube-scene {
          width: 320px;
          height: 320px;
          perspective: 1200px;
          margin: 16px auto;
          position: relative;
        }

        .cube {
          width: 100%;
          height: 100%;
          position: absolute;
          transform-style: preserve-3d;
          cursor: grab;
        }

        .cube:active {
          cursor: grabbing;
        }

        .face {
          position: absolute;
          width: 320px;
          height: 320px;
          background-color: #E2F0D9;
          border: 1px solid rgba(46, 74, 21, 0.15);
          border-radius: 18px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          color: #2E4A15;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        .face * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        /* 3D rotations based on 160px translateZ offset for 320px cube size */
        .face-front  { transform: rotateY(  0deg) translateZ(160px); }
        .face-right  { transform: rotateY( 90deg) translateZ(160px); }
        .face-back   { transform: rotateY(180deg) translateZ(160px); }
        .face-left   { transform: rotateY(-90deg) translateZ(160px); }
        .face-top    { transform: rotateX( 90deg) translateZ(160px); }
        .face-bottom { transform: rotateX(-90deg) translateZ(160px); }

        /* Face Content Styling */
        .face-label {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #768C63;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .hero-face-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 24px;
          font-weight: 800;
          color: #1A300B;
          line-height: 1.15;
          margin-bottom: 2px;
        }

        .hero-face-sub {
          font-size: 11px;
          line-height: 1.45;
          color: #3C5E25;
          margin-bottom: 12px;
        }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          color: #3C5E25;
          margin-bottom: 8px;
        }

        .contact-row svg {
          color: #2E4A15;
          flex-shrink: 0;
        }

        .contact-val a {
          color: #1A300B;
          font-weight: 700;
          text-decoration: underline;
          transition: opacity 0.2s;
        }

        .contact-val a:hover {
          opacity: 0.8;
        }

        .face-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 18px;
          font-weight: 750;
          color: #1A300B;
          margin-bottom: 12px;
          border-bottom: 1px solid rgba(46, 74, 21, 0.1);
          padding-bottom: 4px;
        }

        .proj-item {
          margin-bottom: 10px;
        }

        .proj-name {
          font-size: 11px;
          font-weight: 700;
          color: #1A300B;
          line-height: 1.2;
        }

        .proj-tech {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 8.5px;
          font-weight: 600;
          color: #647C50;
          margin-top: 1px;
        }

        .proj-bullet {
          font-size: 10px;
          color: #3C5E25;
          margin-top: 1px;
          line-height: 1.3;
        }

        .skill-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .pill {
          font-size: 9px;
          background-color: #C5E2A1;
          color: #2E4A15;
          padding: 2px 7px;
          border-radius: 4px;
          font-weight: 700;
          border: 1px solid rgba(46, 74, 21, 0.08);
        }

        .exp-role {
          font-size: 11px;
          font-weight: 750;
          color: #1A300B;
        }

        .exp-co {
          font-size: 10px;
          font-weight: 600;
          color: #526B3C;
          margin-top: 1px;
        }

        .exp-date {
          font-size: 8.5px;
          font-family: ui-monospace, SFMono-Regular, monospace;
          color: #768C63;
          margin-bottom: 3px;
        }

        .exp-bullet {
          font-size: 9.5px;
          color: #3C5E25;
          line-height: 1.35;
        }

        .edu-school {
          font-size: 12px;
          font-weight: 750;
          color: #1A300B;
          line-height: 1.25;
        }

        .edu-deg {
          font-size: 11px;
          color: #3C5E25;
          margin-top: 3px;
          line-height: 1.4;
        }

        .edu-gpa {
          font-size: 11px;
          font-weight: 750;
          color: #1A300B;
          margin-top: 4px;
        }

        .course-pill {
          font-size: 9px;
          background-color: #C5E2A1;
          color: #2E4A15;
          padding: 2.5px 7px;
          border-radius: 4px;
          font-weight: 600;
          border: 1px solid rgba(46, 74, 21, 0.05);
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          flex: 1;
        }

        .metric-card {
          background-color: #C5E2A1;
          border-radius: 12px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border: 1px solid rgba(46, 74, 21, 0.05);
        }

        .metric-val {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          font-weight: 900;
          color: #2E4A15;
          line-height: 1;
        }

        .metric-lbl {
          font-size: 9px;
          color: #3C5E25;
          margin-top: 2px;
          line-height: 1.2;
          font-weight: 500;
        }

        .nav-bar {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-top: 32px;
          max-width: 580px;
          padding: 0 16px;
        }

        .nav-btn {
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #9EA0A5;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding: 7px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.15);
        }

        .nav-btn.active {
          background-color: #C5E2A1;
          border-color: rgba(46, 74, 21, 0.15);
          color: #2E4A15;
          box-shadow: 0 4px 14px rgba(197, 226, 161, 0.35);
          font-weight: 750;
        }

        .drag-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-family: ui-monospace, SFMono-Regular, monospace;
          color: #606266;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-top: 24px;
        }
      `}</style>

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none -z-10">
        <div className="w-[850px] h-[850px] rounded-full bg-gradient-to-tr from-green-950/10 to-transparent blur-3xl opacity-40 animate-pulse" />
      </div>

      <div className="section-header">
        <div className="section-eyebrow">Interactive portfolio</div>
        <h2 className="section-title">Drag or tap a face to explore</h2>
      </div>

      <div 
        ref={containerRef}
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          if (e.touches.length > 0) {
            handleStart(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        className="cube-scene" 
        id="scene"
      >
        <div 
          ref={cubeRef}
          className="cube" 
          id="cube-el"
          style={{
            transform: `rotateX(${targetX.current}deg) rotateY(${targetY.current}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* FRONT: About */}
          <div className="face face-front">
            <div className="face-label">About</div>
            <div className="hero-face-name">Satya Thakur</div>
            <div className="hero-face-sub">CS student at UMBC · Full-stack & systems engineer<br />Graduating Dec 2026 · U.S. Citizen</div>
            <div className="contact-row">
              <Mail className="w-3.5 h-3.5" />
              <span className="contact-val">tsatya487@gmail.com</span>
            </div>
            <div className="contact-row">
              <MapPin className="w-3.5 h-3.5" />
              <span className="contact-val">Odenton, MD</span>
            </div>
            <div className="contact-row">
              <Github className="w-3.5 h-3.5" />
              <span className="contact-val">
                <a href="https://github.com/SdThakur" target="_blank" rel="noopener noreferrer">GitHub</a>
              </span>
            </div>
            <div className="contact-row">
              <Linkedin className="w-3.5 h-3.5" />
              <span className="contact-val">
                <a href="https://www.linkedin.com/in/satya-thakur-415706343" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </span>
            </div>
          </div>

          {/* RIGHT: Projects */}
          <div className="face face-right">
            <div className="face-label">Projects</div>
            <div className="face-title">Featured work</div>
            <div className="proj-item">
              <div className="proj-name">RAG Pipeline</div>
              <div className="proj-tech">FastAPI · ChromaDB · Streamlit · Google GenAI</div>
              <div className="proj-bullet">10,000+ doc chunks · 80% faster lookup · 35% recall boost</div>
            </div>
            <div className="proj-item">
              <div className="proj-name">Kernel Driver</div>
              <div className="proj-tech">C · Linux Kernel · Ioctl · Syscalls</div>
              <div className="proj-bullet">Zero kernel crashes · 500+ secure board writes</div>
            </div>
            <div className="proj-item">
              <div className="proj-name">Parking DBMS</div>
              <div className="proj-tech">PostgreSQL · Python · Concurrency</div>
              <div className="proj-bullet">Optimized concurrency · dynamic locking · mock payment flow</div>
            </div>
            <div className="proj-item">
              <div className="proj-name">Task Scheduler</div>
              <div className="proj-tech">C · Multithreading · Concurrency</div>
              <div className="proj-bullet">Custom priority queues · fine-grained locks · 99.8% stability</div>
            </div>
          </div>

          {/* BACK: Skills */}
          <div className="face face-back" style={{ padding: '16px 20px 14px 20px' }}>
            <div className="face-label" style={{ marginBottom: '2px' }}>Skills</div>
            <div className="face-title" style={{ marginBottom: '8px', paddingBottom: '2px' }}>Technical stack</div>
            <div style={{ marginBottom: '4px' }}>
              <div style={{ fontSize: '9.5px', fontWeight: 600, color: '#368E71', marginBottom: '2px' }}>Languages</div>
              <div className="skill-pills">
                <span className="pill">Python</span>
                <span className="pill">C</span>
                <span className="pill">C++</span>
                <span className="pill">SQL</span>
                <span className="pill">JavaScript</span>
                <span className="pill">TypeScript</span>
                <span className="pill">HTML/CSS</span>
              </div>
            </div>
            <div style={{ marginBottom: '4px' }}>
              <div style={{ fontSize: '9.5px', fontWeight: 600, color: '#368E71', marginBottom: '2px' }}>Frontend</div>
              <div className="skill-pills">
                <span className="pill">React</span>
                <span className="pill">TailwindCSS</span>
                <span className="pill">Streamlit</span>
              </div>
            </div>
            <div style={{ marginBottom: '4px' }}>
              <div style={{ fontSize: '9.5px', fontWeight: 600, color: '#368E71', marginBottom: '2px' }}>Backend</div>
              <div className="skill-pills">
                <span className="pill">FastAPI</span>
                <span className="pill">Node.js</span>
                <span className="pill">Flask</span>
                <span className="pill">Express.js</span>
              </div>
            </div>
            <div style={{ marginBottom: '4px' }}>
              <div style={{ fontSize: '9.5px', fontWeight: 600, color: '#368E71', marginBottom: '2px' }}>Databases</div>
              <div className="skill-pills">
                <span className="pill">PostgreSQL</span>
                <span className="pill">MongoDB</span>
                <span className="pill">ChromaDB</span>
              </div>
            </div>
            <div style={{ marginBottom: '0px' }}>
              <div style={{ fontSize: '9.5px', fontWeight: 600, color: '#368E71', marginBottom: '2px' }}>Tools</div>
              <div className="skill-pills">
                <span className="pill">Docker</span>
                <span className="pill">Git</span>
                <span className="pill">Linux</span>
                <span className="pill">Kubernetes</span>
              </div>
            </div>
          </div>

          {/* LEFT: Experience */}
          <div className="face face-left">
            <div className="face-label">Experience</div>
            <div className="face-title">Work history</div>
            <div className="exp-role">Remote Data Entry Intern</div>
            <div className="exp-co">UPS · Remote</div>
            <div className="exp-date">Jun 2025 – Aug 2025</div>
            <div className="exp-bullet">95%+ first-attempt resolution rate · 99%+ data accuracy · 20+ daily client requests streamlined</div>
            <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '0.5px solid rgba(55,138,221,0.15)' }}>
              <div style={{ fontSize: '10px', fontWeight: 500, color: '#378ADD', marginBottom: '8px' }}>Certifications</div>
              <div className="exp-role" style={{ color: '#1A300B' }}>HPE Software Engineering Virtual Experience</div>
              <div className="exp-co">Hewlett Packard Enterprise · Forage</div>
              <div className="exp-date">May 2026</div>
              <div className="exp-bullet">Java Spring Boot · 5 CRUD endpoints · 90%+ test coverage</div>
            </div>
          </div>

          {/* TOP: Education */}
          <div className="face face-top">
            <div className="face-label">Education</div>
            <div className="face-title">Academic background</div>
            <div className="edu-school">University of Maryland, Baltimore County</div>
            <div className="edu-deg">Bachelor of Science, Computer Science<br />Expected December 2026</div>
            <div className="edu-gpa">GPA: 3.34</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '12px' }}>
              <span className="course-pill">Database Systems</span>
              <span className="course-pill">Operating Systems</span>
              <span className="course-pill">Artificial Intelligence</span>
              <span className="course-pill">Computer Networks</span>
              <span className="course-pill">Computer Graphics</span>
              <span className="course-pill">DSA</span>
            </div>
          </div>

          {/* BOTTOM: Highlights */}
          <div className="face face-bottom">
            <div className="face-label">Highlights</div>
            <div className="face-title">By the numbers</div>
            <div className="metric-grid">
              <div className="metric-card">
                <div className="metric-val">4</div>
                <div className="metric-lbl">major projects</div>
              </div>
              <div className="metric-card">
                <div className="metric-val">3.34</div>
                <div className="metric-lbl">GPA at UMBC</div>
              </div>
              <div className="metric-card">
                <div className="metric-val">80%</div>
                <div className="metric-lbl">lookup time saved</div>
              </div>
              <div className="metric-card">
                <div className="metric-val">15+</div>
                <div className="metric-lbl">tech stack tools</div>
              </div>
              <div className="metric-card">
                <div className="metric-val">99%</div>
                <div className="metric-lbl">data accuracy @ UPS</div>
              </div>
              <div className="metric-card">
                <div className="metric-val">Dec</div>
                <div className="metric-lbl">2026 graduation</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="nav-bar">
        <button 
          className={`nav-btn ${activeFace === 'about' ? 'active' : ''}`} 
          onClick={() => rotateTo(0, 0)}
        >
          About
        </button>
        <button 
          className={`nav-btn ${activeFace === 'projects' ? 'active' : ''}`} 
          onClick={() => rotateTo(0, -90)}
        >
          Projects
        </button>
        <button 
          className={`nav-btn ${activeFace === 'skills' ? 'active' : ''}`} 
          onClick={() => rotateTo(0, 180)}
        >
          Skills
        </button>
        <button 
          className={`nav-btn ${activeFace === 'experience' ? 'active' : ''}`} 
          onClick={() => rotateTo(0, 90)}
        >
          Experience
        </button>
        <button 
          className={`nav-btn ${activeFace === 'education' ? 'active' : ''}`} 
          onClick={() => rotateTo(-90, 0)}
        >
          Education
        </button>
        <button 
          className={`nav-btn ${activeFace === 'highlights' ? 'active' : ''}`} 
          onClick={() => rotateTo(90, 0)}
        >
          Highlights
        </button>
      </div>

      <div className="drag-hint">
        <Hand className="w-3.5 h-3.5 text-gold" />
        Drag to spin freely · buttons snap to each face
      </div>

      {/* HTML Integration Hub (Interactive Developer Console) */}
      <div className="mt-8 w-full max-w-4xl px-6">
        <div className="flex justify-center">
          <button
            id="toggle-cube-integration-btn"
            onClick={() => setShowConsole(!showConsole)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold border transition-all cursor-pointer shadow-sm ${
              showConsole
                ? 'bg-gold text-black border-gold font-bold scale-[1.02]'
                : 'bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border-zinc-900'
            }`}
            title="Get HTML Embed Integration Code for 3D Cube"
          >
            <Code className="w-3.5 h-3.5" />
            {showConsole ? 'Hide HTML Integration Hub' : 'HTML Integration Embed Code'}
          </button>
        </div>

        {showConsole && (
          <div className="mt-6 border border-zinc-800 rounded overflow-hidden bg-[#0D0D0D] shadow-2xl shadow-black/80 text-left">
            {/* Panel Header */}
            <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                <Code className="w-3.5 h-3.5 text-gold" />
                <span>3D Skills Cube HTML Widget Generator</span>
              </div>
            </div>

            {/* Panel Body */}
            <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
              {/* Left: Code Box and Description */}
              <div className="space-y-4">
                <div className="text-zinc-400 font-sans text-xs leading-relaxed">
                  <p className="font-bold text-zinc-200 mb-1">Combine Everything Into Any Website</p>
                  Want to integrate Satya's signature 3D rotating skills cube on your own static web pages or external systems? 
                  This pure HTML template includes the custom perspective viewport, rotating keyframes, high-contrast face grids, and interactive hover-pausing behavior in a single code block. No React required!
                </div>

                <div className="relative">
                  {/* Copy code button */}
                  <button
                    onClick={() => {
                      const embedCode = `<!-- Satya Thakur 3D Skills Cube Widget Integration -->
<div class="satya-cube-widget" style="font-family: 'Inter', system-ui, -apple-system, sans-serif; background: #0c0c0c; border: 1px solid #1c1c1c; padding: 32px 16px; border-radius: 12px; max-width: 480px; color: #ededed; box-shadow: 0 4px 30px rgba(0,0,0,0.6); margin: 0 auto; display: flex; flex-direction: column; align-items: center; box-sizing: border-box;">
  <h3 style="margin: 0 0 20px 0; font-family: serif; font-size: 20px; color: #ffffff; border-bottom: 1px solid #222; padding-bottom: 10px; font-weight: bold; width: 100%; text-align: center;">Interactive 3D Portfolio Cube</h3>
  
  <div class="cube-scene" style="width: 200px; height: 200px; perspective: 600px; margin: 30px auto; position: relative;">
    <div class="cube" style="width: 100%; height: 100%; position: absolute; transform-style: preserve-3d; animation: cubeTumble 15s infinite linear; transition: transform 0.6s ease;">
      <!-- FRONT: About -->
      <div class="face" style="position: absolute; width: 200px; height: 200px; background: rgba(15,15,15,0.9); border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; box-sizing: border-box; padding: 12px; transform: rotateY(0deg) translateZ(100px); backface-visibility: visible;">
        <div style="font-size: 9px; text-transform: uppercase; color: #D4AF37; letter-spacing: 1.5px; font-weight: 700;">About</div>
        <div style="font-size: 16px; font-weight: bold; margin: 8px 0 4px 0; color: #fff;">Satya Thakur</div>
        <div style="font-size: 10px; color: #999; line-height: 1.3;">Full-Stack & Systems Engineer<br>Graduating Dec 2026</div>
      </div>
      
      <!-- RIGHT: Projects -->
      <div class="face" style="position: absolute; width: 200px; height: 200px; background: rgba(15,15,15,0.9); border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; box-sizing: border-box; padding: 12px; transform: rotateY(90deg) translateZ(100px); backface-visibility: visible;">
        <div style="font-size: 9px; text-transform: uppercase; color: #D4AF37; letter-spacing: 1.5px; font-weight: 700;">Projects</div>
        <div style="font-size: 13px; font-weight: bold; margin: 8px 0 4px 0; color: #fff;">RAG AI Pipeline</div>
        <div style="font-size: 10px; color: #999; line-height: 1.3;">FastAPI & ChromaDB<br>10k+ Chunks Context</div>
      </div>
      
      <!-- BACK: Skills -->
      <div class="face" style="position: absolute; width: 200px; height: 200px; background: rgba(15,15,15,0.9); border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; box-sizing: border-box; padding: 12px; transform: rotateY(180deg) translateZ(100px); backface-visibility: visible;">
        <div style="font-size: 9px; text-transform: uppercase; color: #D4AF37; letter-spacing: 1.5px; font-weight: 700;">Skills</div>
        <div style="font-size: 13px; font-weight: bold; margin: 8px 0 4px 0; color: #fff;">Technical Stack</div>
        <div style="font-size: 10px; color: #999; line-height: 1.3;">Python · C++ · SQL · Docker<br>React · Node · Postgres</div>
      </div>
      
      <!-- LEFT: Experience -->
      <div class="face" style="position: absolute; width: 200px; height: 200px; background: rgba(15,15,15,0.9); border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; box-sizing: border-box; padding: 12px; transform: rotateY(-90deg) translateZ(100px); backface-visibility: visible;">
        <div style="font-size: 9px; text-transform: uppercase; color: #D4AF37; letter-spacing: 1.5px; font-weight: 700;">Experience</div>
        <div style="font-size: 12px; font-weight: bold; margin: 8px 0 4px 0; color: #fff;">UPS Intern</div>
        <div style="font-size: 10px; color: #999; line-height: 1.3;">Remote Data Entry<br>99% Accuracy Rate</div>
      </div>
      
      <!-- TOP: Education -->
      <div class="face" style="position: absolute; width: 200px; height: 200px; background: rgba(15,15,15,0.9); border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; box-sizing: border-box; padding: 12px; transform: rotateX(90deg) translateZ(100px); backface-visibility: visible;">
        <div style="font-size: 9px; text-transform: uppercase; color: #D4AF37; letter-spacing: 1.5px; font-weight: 700;">Education</div>
        <div style="font-size: 12px; font-weight: bold; margin: 8px 0 4px 0; color: #fff;">UMBC BS CS</div>
        <div style="font-size: 10px; color: #999; line-height: 1.3;">GPA: 3.34<br>Graduating Dec 2026</div>
      </div>
      
      <!-- BOTTOM: Highlights -->
      <div class="face" style="position: absolute; width: 200px; height: 200px; background: rgba(15,15,15,0.9); border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; box-sizing: border-box; padding: 12px; transform: rotateX(-90deg) translateZ(100px); backface-visibility: visible;">
        <div style="font-size: 9px; text-transform: uppercase; color: #D4AF37; letter-spacing: 1.5px; font-weight: 700;">Metrics</div>
        <div style="font-size: 14px; font-weight: bold; margin: 8px 0 4px 0; color: #fff;">80% Lookup Saved</div>
        <div style="font-size: 10px; color: #999; line-height: 1.3;">15+ Tech Stack Tools</div>
      </div>
    </div>
  </div>
  
  <p style="font-size: 10px; color: #666; margin: 15px 0 0 0; text-transform: uppercase; letter-spacing: 1px; text-align: center;">Hover Cube to Pause Rotation</p>
  
  <style>
    @keyframes cubeTumble {
      0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
      50% { transform: rotateX(180deg) rotateY(180deg) rotateZ(45deg); }
      100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(90deg); }
    }
    .satya-cube-widget:hover .cube {
      animation-play-state: paused;
    }
  </style>
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
                        <span className="text-[10px] text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Copy Code</span>
                      </>
                    )}
                  </button>

                  <pre className="p-4 bg-zinc-950 rounded border border-zinc-900 overflow-x-auto text-[11px] font-mono leading-relaxed text-zinc-300 max-h-96">
{`<!-- Satya Thakur 3D Skills Cube Widget Integration -->
<div class="satya-cube-widget" style="font-family: 'Inter', sans-serif; background: #0c0c0c; ...">
  <h3 style="margin: 0 0 20px 0; color: #ffffff;">Interactive 3D Portfolio Cube</h3>
  
  <div class="cube-scene" style="width: 200px; height: 200px; perspective: 600px; ...">
    <div class="cube" style="transform-style: preserve-3d; animation: cubeTumble 15s infinite linear; ...">
      <!-- FRONT Face -->
      <div class="face" style="transform: rotateY(0deg) translateZ(100px);">...</div>
      <!-- RIGHT Face -->
      <div class="face" style="transform: rotateY(90deg) translateZ(100px);">...</div>
      <!-- BACK Face -->
      <div class="face" style="transform: rotateY(180deg) translateZ(100px);">...</div>
      <!-- LEFT Face -->
      <div class="face" style="transform: rotateY(-90deg) translateZ(100px);">...</div>
      <!-- TOP Face -->
      <div class="face" style="transform: rotateX(90deg) translateZ(100px);">...</div>
      <!-- BOTTOM Face -->
      <div class="face" style="transform: rotateX(-90deg) translateZ(100px);">...</div>
    </div>
  </div>
</div>`}
                  </pre>
                </div>
              </div>

              {/* Right: Simulated Interactive Preview Container */}
              <div className="space-y-4 text-center">
                <div className="text-zinc-400 font-mono text-[10px] uppercase tracking-wider font-bold text-left">
                  Live Embedded Widget Simulation
                </div>

                <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-lg flex items-center justify-center">
                  {/* Live Simulator Widget */}
                  <div className="w-full max-w-xs bg-[#0c0c0c] border border-zinc-800 p-6 rounded-md text-zinc-200 font-sans shadow-xl flex flex-col items-center">
                    <h4 className="font-serif font-bold text-base text-white border-b border-zinc-800 pb-3 mb-4 w-full text-center flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold" />
                      Portfolio 3D Cube
                    </h4>

                    {/* Embedding simulation of the scene */}
                    <div className="relative w-44 h-44 my-4" style={{ perspective: '500px' }}>
                      <div 
                        className="absolute w-full h-full"
                        style={{
                          transformStyle: 'preserve-3d',
                          animation: 'cubeTumble 15s infinite linear',
                        }}
                      >
                        <div className="sim-face" style={{ transform: 'rotateY(0deg) translateZ(88px)' }}>
                          <span className="text-[8px] uppercase tracking-wider text-gold font-bold">About</span>
                          <span className="text-xs font-bold text-white mt-1">Satya Thakur</span>
                          <span className="text-[9px] text-zinc-400 mt-0.5">UMBC BS CS</span>
                        </div>
                        <div className="sim-face" style={{ transform: 'rotateY(90deg) translateZ(88px)' }}>
                          <span className="text-[8px] uppercase tracking-wider text-gold font-bold">Projects</span>
                          <span className="text-xs font-bold text-white mt-1">RAG Pipeline</span>
                          <span className="text-[9px] text-zinc-400 mt-0.5">FastAPI</span>
                        </div>
                        <div className="sim-face" style={{ transform: 'rotateY(180deg) translateZ(88px)' }}>
                          <span className="text-[8px] uppercase tracking-wider text-gold font-bold">Skills</span>
                          <span className="text-xs font-bold text-white mt-1">Python & C++</span>
                          <span className="text-[9px] text-zinc-400 mt-0.5">Core Dev</span>
                        </div>
                        <div className="sim-face" style={{ transform: 'rotateY(-90deg) translateZ(88px)' }}>
                          <span className="text-[8px] uppercase tracking-wider text-gold font-bold">Experience</span>
                          <span className="text-xs font-bold text-white mt-1">UPS Intern</span>
                          <span className="text-[9px] text-zinc-400 mt-0.5">Data Entry</span>
                        </div>
                        <div className="sim-face" style={{ transform: 'rotateX(90deg) translateZ(88px)' }}>
                          <span className="text-[8px] uppercase tracking-wider text-gold font-bold">Education</span>
                          <span className="text-xs font-bold text-white mt-1">Grad Dec 2026</span>
                          <span className="text-[9px] text-zinc-400 mt-0.5">GPA: 3.34</span>
                        </div>
                        <div className="sim-face" style={{ transform: 'rotateX(-90deg) translateZ(88px)' }}>
                          <span className="text-[8px] uppercase tracking-wider text-gold font-bold">Metrics</span>
                          <span className="text-xs font-bold text-white mt-1">80% Faster</span>
                          <span className="text-[9px] text-zinc-400 mt-0.5">Lookup Speed</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[9px] text-zinc-500 uppercase tracking-widest mt-2 font-mono">
                      CSS 3D Engine Operational
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
