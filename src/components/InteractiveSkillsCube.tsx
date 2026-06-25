import React, { useState } from 'react';
import { Terminal, Cpu, Database, Layers, Code, Sparkles } from 'lucide-react';

interface SkillFace {
  name: string;
  icon: React.ReactNode;
  level: string;
  tagline: string;
  metrics: string;
  bgGradient: string;
  borderGlow: string;
}

export default function InteractiveSkillsCube() {
  const [hoveredFace, setHoveredFace] = useState<number | null>(null);

  const cubeFaces: SkillFace[] = [
    {
      name: 'C++',
      icon: <Terminal className="w-8 h-8 text-gold" />,
      level: 'Advanced',
      tagline: 'High-Performance Graphics & OS Systems',
      metrics: '6:1 DXT1 Bitwise Comp',
      bgGradient: 'from-amber-950/40 to-zinc-950/90',
      borderGlow: 'rgba(212, 175, 55, 0.3)'
    },
    {
      name: 'Python',
      icon: <Cpu className="w-8 h-8 text-emerald-400" />,
      level: 'Advanced',
      tagline: 'AI Pipelines & FastAPI Microservices',
      metrics: '10k+ Chunks RAG System',
      bgGradient: 'from-emerald-950/40 to-zinc-950/90',
      borderGlow: 'rgba(52, 211, 153, 0.3)'
    },
    {
      name: 'Docker',
      icon: <Layers className="w-8 h-8 text-sky-400" />,
      level: 'Intermediate',
      tagline: 'Containerized Architectures & DevOps',
      metrics: 'Multi-stage builds',
      bgGradient: 'from-sky-950/40 to-zinc-950/90',
      borderGlow: 'rgba(56, 189, 248, 0.3)'
    },
    {
      name: 'SQL',
      icon: <Database className="w-8 h-8 text-amber-500" />,
      level: 'Advanced',
      tagline: 'Relational Database Optimization',
      metrics: 'B-Tree & Index Tuning',
      bgGradient: 'from-amber-950/30 to-zinc-950/90',
      borderGlow: 'rgba(245, 158, 11, 0.3)'
    },
    {
      name: 'C Lang',
      icon: <Code className="w-8 h-8 text-blue-400" />,
      level: 'Advanced',
      tagline: 'Low-level Linux Systems & Shells',
      metrics: 'Custom fork/exec CLI',
      bgGradient: 'from-blue-950/40 to-zinc-950/90',
      borderGlow: 'rgba(96, 165, 250, 0.3)'
    },
    {
      name: 'Systems',
      icon: <Sparkles className="w-8 h-8 text-gold" />,
      level: 'Expertise',
      tagline: 'Algorithms & Computer Graphics',
      metrics: 'Power-of-Two Max Heap',
      bgGradient: 'from-zinc-900/40 to-zinc-950/90',
      borderGlow: 'rgba(212, 175, 55, 0.4)'
    }
  ];

  return (
    <div className="relative w-full py-8 flex flex-col items-center justify-center overflow-visible select-none">
      {/* Dynamic 3D Styles */}
      <style>{`
        .scene-container {
          width: 220px;
          height: 220px;
          perspective: 1000px;
          margin: 20px auto;
          position: relative;
        }

        .skills-3d-cube {
          width: 100%;
          height: 100%;
          position: absolute;
          transform-style: preserve-3d;
          animation: cubeTumble 18s infinite linear;
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* Hover behavior to pause rotation */
        .scene-container:hover .skills-3d-cube {
          animation-play-state: paused;
        }

        /* Standard 3D Rotations for 220px cube (half-size is 110px translateZ offset) */
        .cube-face {
          position: absolute;
          width: 220px;
          height: 220px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          backdrop-blur: 12px;
          background: rgba(10, 10, 10, 0.85);
          backface-visibility: visible; /* allows seeing inner frame outline which looks high tech */
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
        }

        .face-cpp      { transform: rotateY(  0deg) translateZ(110px); }
        .face-python   { transform: rotateY( 90deg) translateZ(110px); }
        .face-docker   { transform: rotateY(180deg) translateZ(110px); }
        .face-sql      { transform: rotateY(-90deg) translateZ(110px); }
        .face-clang    { transform: rotateX( 90deg) translateZ(110px); }
        .face-systems  { transform: rotateX(-90deg) translateZ(110px); }

        /* Tactical pop-out behavior on hover of individual faces */
        .cube-face:hover {
          background: rgba(14, 14, 14, 0.95);
          border-color: #D4AF37;
          box-shadow: 0 15px 40px rgba(212, 175, 55, 0.25);
          cursor: pointer;
        }

        .face-cpp:hover     { transform: rotateY(  0deg) translateZ(135px) scale(1.05); }
        .face-python:hover  { transform: rotateY( 90deg) translateZ(135px) scale(1.05); }
        .face-docker:hover  { transform: rotateY(180deg) translateZ(135px) scale(1.05); }
        .face-sql:hover     { transform: rotateY(-90deg) translateZ(135px) scale(1.05); }
        .face-clang:hover   { transform: rotateX( 90deg) translateZ(135px) scale(1.05); }
        .face-systems:hover { transform: rotateX(-90deg) translateZ(135px) scale(1.05); }

        @keyframes cubeTumble {
          0% {
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          }
          50% {
            transform: rotateX(180deg) rotateY(180deg) rotateZ(45deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg) rotateZ(90deg);
          }
        }
      `}</style>

      {/* Cybernetic Radial Glow Behind the Cube */}
      <div className="absolute w-72 h-72 rounded-full bg-gold/5 blur-[80px] pointer-events-none -z-10 animate-pulse" />

      {/* 3D Scene Wrapper */}
      <div className="scene-container" id="3d-skills-scene">
        <div className="skills-3d-cube" id="skills-3d-cube-wrapper">
          {/* FACE 1: C++ */}
          <div 
            className="cube-face face-cpp bg-gradient-to-br from-amber-950/20 to-zinc-950/90"
            onMouseEnter={() => setHoveredFace(0)}
            onMouseLeave={() => setHoveredFace(null)}
            style={{
              borderColor: hoveredFace === 0 ? '#D4AF37' : 'rgba(212, 175, 55, 0.15)',
              boxShadow: hoveredFace === 0 ? '0 0 25px rgba(212, 175, 55, 0.25)' : 'none'
            }}
          >
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
              <span className="text-[10px] font-mono tracking-widest text-gold uppercase font-bold">Face 01 // Core</span>
              <span className="text-[8px] font-mono text-zinc-500 bg-zinc-900/50 px-1.5 py-0.5 rounded">C++</span>
            </div>
            <div className="flex flex-col items-center justify-center my-3 text-center">
              {cubeFaces[0].icon}
              <h4 className="font-serif font-bold text-lg text-white mt-2">{cubeFaces[0].name}</h4>
              <p className="text-[10px] text-zinc-400 mt-1 max-w-[170px] leading-snug">{cubeFaces[0].tagline}</p>
            </div>
            <div className="flex items-center justify-between text-[9px] font-mono border-t border-zinc-900 pt-2 text-zinc-500">
              <span>{cubeFaces[0].level}</span>
              <span className="text-gold font-bold">{cubeFaces[0].metrics}</span>
            </div>
          </div>

          {/* FACE 2: Python */}
          <div 
            className="cube-face face-python bg-gradient-to-br from-emerald-950/20 to-zinc-950/90"
            onMouseEnter={() => setHoveredFace(1)}
            onMouseLeave={() => setHoveredFace(null)}
            style={{
              borderColor: hoveredFace === 1 ? '#34D399' : 'rgba(52, 211, 153, 0.15)',
              boxShadow: hoveredFace === 1 ? '0 0 25px rgba(52, 211, 153, 0.2)' : 'none'
            }}
          >
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">Face 02 // Core</span>
              <span className="text-[8px] font-mono text-zinc-500 bg-zinc-900/50 px-1.5 py-0.5 rounded">Py</span>
            </div>
            <div className="flex flex-col items-center justify-center my-3 text-center">
              {cubeFaces[1].icon}
              <h4 className="font-serif font-bold text-lg text-white mt-2">{cubeFaces[1].name}</h4>
              <p className="text-[10px] text-zinc-400 mt-1 max-w-[170px] leading-snug">{cubeFaces[1].tagline}</p>
            </div>
            <div className="flex items-center justify-between text-[9px] font-mono border-t border-zinc-900 pt-2 text-zinc-500">
              <span>{cubeFaces[1].level}</span>
              <span className="text-emerald-400 font-bold">{cubeFaces[1].metrics}</span>
            </div>
          </div>

          {/* FACE 3: Docker */}
          <div 
            className="cube-face face-docker bg-gradient-to-br from-sky-950/20 to-zinc-950/90"
            onMouseEnter={() => setHoveredFace(2)}
            onMouseLeave={() => setHoveredFace(null)}
            style={{
              borderColor: hoveredFace === 2 ? '#38BDF8' : 'rgba(56, 189, 248, 0.15)',
              boxShadow: hoveredFace === 2 ? '0 0 25px rgba(56, 189, 248, 0.2)' : 'none'
            }}
          >
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
              <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase font-bold">Face 03 // Ops</span>
              <span className="text-[8px] font-mono text-zinc-500 bg-zinc-900/50 px-1.5 py-0.5 rounded">Docker</span>
            </div>
            <div className="flex flex-col items-center justify-center my-3 text-center">
              {cubeFaces[2].icon}
              <h4 className="font-serif font-bold text-lg text-white mt-2">{cubeFaces[2].name}</h4>
              <p className="text-[10px] text-zinc-400 mt-1 max-w-[170px] leading-snug">{cubeFaces[2].tagline}</p>
            </div>
            <div className="flex items-center justify-between text-[9px] font-mono border-t border-zinc-900 pt-2 text-zinc-500">
              <span>{cubeFaces[2].level}</span>
              <span className="text-sky-400 font-bold">{cubeFaces[2].metrics}</span>
            </div>
          </div>

          {/* FACE 4: SQL */}
          <div 
            className="cube-face face-sql bg-gradient-to-br from-amber-950/15 to-zinc-950/90"
            onMouseEnter={() => setHoveredFace(3)}
            onMouseLeave={() => setHoveredFace(null)}
            style={{
              borderColor: hoveredFace === 3 ? '#F59E0B' : 'rgba(245, 158, 11, 0.15)',
              boxShadow: hoveredFace === 3 ? '0 0 25px rgba(245, 158, 11, 0.2)' : 'none'
            }}
          >
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
              <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase font-bold">Face 04 // Data</span>
              <span className="text-[8px] font-mono text-zinc-500 bg-zinc-900/50 px-1.5 py-0.5 rounded">SQL</span>
            </div>
            <div className="flex flex-col items-center justify-center my-3 text-center">
              {cubeFaces[3].icon}
              <h4 className="font-serif font-bold text-lg text-white mt-2">{cubeFaces[3].name}</h4>
              <p className="text-[10px] text-zinc-400 mt-1 max-w-[170px] leading-snug">{cubeFaces[3].tagline}</p>
            </div>
            <div className="flex items-center justify-between text-[9px] font-mono border-t border-zinc-900 pt-2 text-zinc-500">
              <span>{cubeFaces[3].level}</span>
              <span className="text-amber-500 font-bold">{cubeFaces[3].metrics}</span>
            </div>
          </div>

          {/* FACE 5: C Lang */}
          <div 
            className="cube-face face-clang bg-gradient-to-br from-blue-950/20 to-zinc-950/90"
            onMouseEnter={() => setHoveredFace(4)}
            onMouseLeave={() => setHoveredFace(null)}
            style={{
              borderColor: hoveredFace === 4 ? '#60A5FA' : 'rgba(96, 165, 250, 0.15)',
              boxShadow: hoveredFace === 4 ? '0 0 25px rgba(96, 165, 250, 0.2)' : 'none'
            }}
          >
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
              <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold">Face 05 // Low</span>
              <span className="text-[8px] font-mono text-zinc-500 bg-zinc-900/50 px-1.5 py-0.5 rounded">C</span>
            </div>
            <div className="flex flex-col items-center justify-center my-3 text-center">
              {cubeFaces[4].icon}
              <h4 className="font-serif font-bold text-lg text-white mt-2">{cubeFaces[4].name}</h4>
              <p className="text-[10px] text-zinc-400 mt-1 max-w-[170px] leading-snug">{cubeFaces[4].tagline}</p>
            </div>
            <div className="flex items-center justify-between text-[9px] font-mono border-t border-zinc-900 pt-2 text-zinc-500">
              <span>{cubeFaces[4].level}</span>
              <span className="text-blue-400 font-bold">{cubeFaces[4].metrics}</span>
            </div>
          </div>

          {/* FACE 6: Systems */}
          <div 
            className="cube-face face-systems bg-gradient-to-br from-zinc-900/20 to-zinc-950/90"
            onMouseEnter={() => setHoveredFace(5)}
            onMouseLeave={() => setHoveredFace(null)}
            style={{
              borderColor: hoveredFace === 5 ? '#D4AF37' : 'rgba(212, 175, 55, 0.15)',
              boxShadow: hoveredFace === 5 ? '0 0 25px rgba(212, 175, 55, 0.25)' : 'none'
            }}
          >
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
              <span className="text-[10px] font-mono tracking-widest text-gold uppercase font-bold">Face 06 // Theory</span>
              <span className="text-[8px] font-mono text-zinc-500 bg-zinc-900/50 px-1.5 py-0.5 rounded">SYS</span>
            </div>
            <div className="flex flex-col items-center justify-center my-3 text-center">
              {cubeFaces[5].icon}
              <h4 className="font-serif font-bold text-lg text-white mt-2">{cubeFaces[5].name}</h4>
              <p className="text-[10px] text-zinc-400 mt-1 max-w-[170px] leading-snug">{cubeFaces[5].tagline}</p>
            </div>
            <div className="flex items-center justify-between text-[9px] font-mono border-t border-zinc-900 pt-2 text-zinc-500">
              <span>{cubeFaces[5].level}</span>
              <span className="text-gold font-bold">{cubeFaces[5].metrics}</span>
            </div>
          </div>

        </div>
      </div>

      <div className="text-[10px] font-mono text-zinc-500 tracking-wider text-center mt-4 uppercase">
        Hover to freeze rotation · Interaction active
      </div>
    </div>
  );
}
