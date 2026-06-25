import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  ExternalLink, 
  Sparkles, 
  Database, 
  Cpu, 
  Brain, 
  CheckCircle2, 
  Terminal, 
  Play, 
  Lock, 
  Eye, 
  AlertCircle,
  SlidersHorizontal
} from 'lucide-react';
import { projectsData } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [activeTab, setActiveTab] = useState<'all' | 'web-ai' | 'systems' | 'databases'>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'title' | 'category'>('date-desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const [simulationState, setSimulationState] = useState<{
    id: string | null;
    status: 'idle' | 'running' | 'completed';
    logs: string[];
    customInput?: string;
    result?: any;
  }>({
    id: null,
    status: 'idle',
    logs: [],
  });

  const categories = [
    { id: 'all', label: 'All Fields' },
    { id: 'web-ai', label: 'AI & Full-Stack' },
    { id: 'systems', label: 'Systems & OS' },
    { id: 'databases', label: 'Database Architectures' },
  ];

  const techOptions = [
    { id: 'all', label: 'All Tech' },
    { id: 'Python', label: 'Python' },
    { id: 'C', label: 'C Lang' },
    { id: 'C++', label: 'C++' },
    { id: 'Java', label: 'Java' },
    { id: 'FastAPI', label: 'FastAPI' },
    { id: 'ChromaDB', label: 'ChromaDB' },
    { id: 'Google Gemini', label: 'Google GenAI' },
    { id: 'PostgreSQL', label: 'PostgreSQL' },
    { id: 'Docker', label: 'Docker' },
    { id: 'Streamlit', label: 'Streamlit' },
  ];

  // Helper to get category icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web-ai':
        return <Brain className="w-4 h-4 text-gold" />;
      case 'systems':
        return <Cpu className="w-4 h-4 text-gold" />;
      case 'databases':
        return <Database className="w-4 h-4 text-gold" />;
      default:
        return <Sparkles className="w-4 h-4 text-gold" />;
    }
  };

  // Helper to run specific project simulation
  const runSimulation = (projectId: string) => {
    setSimulationState({
      id: projectId,
      status: 'running',
      logs: ['[System] Booting local sandbox instance...'],
    });

    let currentLogIndex = 0;
    let logsList: string[] = [];

    if (projectId === 'rag-pipeline') {
      const query = simulationState.customInput || 'databases';
      logsList = [
        `[Sandbox] Received query: "${query}"`,
        `[ChromaDB] Searching vector space with cosine similarity threshold: 0.45`,
        `[ChromaDB] Found 3 matching document chunks in 12ms. (Similarity: 0.49, 0.47, 0.46)`,
        `[LLM] Preparing context prompt template with 3 injected context blocks.`,
        `[LLM API] Streaming generation request to generative language model...`,
        `[Response] Satya Thakur has completed advanced systems and databases coursework and engineered a dynamic, high-performance RAG pipeline connected with ChromaDB...`,
      ];
    } else if (projectId === 'dxt1-compressor') {
      logsList = [
        `[DXT1] Loading raw 512x512 RGBA texture (1,024 KB)...`,
        `[DXT1] Chunking image into 16,384 blocks of 4x4 pixels...`,
        `[Pipeline] Block 0: Choosing 2 base 16-bit RGB565 colors.`,
        `[Bitwise] Compressing block 0..16383: converting 32-bit colors into packed 16-bit indices...`,
        `[Mipmap] Generating 9 mipmap level pyramids dynamically.`,
        `[Output] Original: 1,024 KB | DXT1 Packed: 170.6 KB`,
        `[Result] Compression ratio 6:1 (83.33% storage reduction) completed successfully with zero buffer overflows!`,
      ];
    } else if (projectId === 'power-of-two-heap') {
      logsList = [
        `[Heap] Initializing Custom Max Heap with 2^3 (8) dynamic branching factor.`,
        `[Heap] Pre-allocating array index mapping. Root: Index 0. Child ranges: Indices 1 to 8.`,
        `[Logistics] Inserting 1,000 package elements with randomized priority weights...`,
        `[Bitshift] Computing parent-to-child indexing formulas via fast binary shift operations.`,
        `[Performance] Peak operations clocked at 4.2M inserts/sec.`,
        `[Extract] Pulling maximum priority package: ID=PKG-992, Priority=998.4`,
        `[Result] Priority queue sorted in O(log_8 N) time. 30% speedup verified vs. binary queue under concurrent workloads!`,
      ];
    } else if (projectId === 'unix-shell') {
      logsList = [
        `[Shell] Booting Custom Systems Interpreter. Prompt active: satya@sys:~$`,
        `[Parser] Parsing input command: "cat logs.txt | grep -E 'VULN|CRITICAL' > alert.txt"`,
        `[Process] fork() executed successfully. Parent PID: 80112, Child A PID: 80113.`,
        `[Process] fork() for pipe segment. Child B PID: 80114.`,
        `[Piping] Created kernel pipe descriptor array [fd0, fd1]. dup2() redirecting stdout to pipe input.`,
        `[Signal] Registering SIGCHLD handler to prevent zombie processes.`,
        `[Execution] execvp() completed. cat processes 1,200 lines. grep filter writes 3 matches to alert.txt.`,
        `[Status] Child processes closed. Exit code: 0. Shell loop listening.`,
      ];
    } else if (projectId === 'ctf-security-tools') {
      logsList = [
        `[CTF-Engine] Initializing vulnerability auditing script on virtual sandbox target...`,
        `[Scanner] Scanning ELF binary memory structure. ASLR: Enabled, NX: Enabled, Canary: Disabled.`,
        `[Analysis] Identified stack-smashing opportunity in insecure gets() buffer at 0x7fffffffe050.`,
        `[Payload] Constructing Return-Oriented Programming (ROP) chain to bypass NX.`,
        `[Payload] Gadgets located: pop rdi; ret (0x4011d3), system (0x401040), "/bin/sh" (0x402008).`,
        `[Exploit] Dispatching buffer overflow payload (120 bytes padding + ROP chain).`,
        `[Network] raw socket packet-intercept decodes shell interactive payload.`,
        `[Result] Remote interactive root shell spawned successfully! Vulnerability verified.`,
      ];
    } else if (projectId === 'parking-mgmt') {
      logsList = [
        `[Engine] Initiating concurrent booking simulator for Spot #104.`,
        `[Session A] Transaction started: BEGIN WORK;`,
        `[Session A] Executing: SELECT * FROM spots WHERE id = 104 FOR UPDATE;`,
        `[Session A] Row locked successfully.`,
        `[Session B] Transaction started: BEGIN WORK;`,
        `[Session B] Executing: SELECT * FROM spots WHERE id = 104 FOR UPDATE;`,
        `[Pessimistic Lock] Session B blocked. Waiting on lock released by Session A...`,
        `[Session A] Booking completed. COMMIT; Lock released.`,
        `[Session B] Lock acquired. Resource safe. Double-booking prevented successfully!`,
      ];
    } else if (projectId === 'task-scheduler') {
      logsList = [
        `[Scheduler] Initializing 3 priority queue channels (High, Medium, Low).`,
        `[CPU] Allocating 4 concurrent worker threads.`,
        `[Thread 1] Pulled task T-101 (HIGH priority). Acquiring mutex lock.`,
        `[Thread 2] Pulled task T-102 (HIGH priority). Mutex locked.`,
        `[Thread 3] Pulled task T-103 (MEDIUM priority). Starvation prevention counter: 4.`,
        `[Deadlock Avoidance] Mutex cycle check: SAFE. Task processing started.`,
        `[Stress Test] 1,000 tasks executed with zero memory leaks. Task scheduler successfully completed.`,
      ];
    } else if (projectId === 'kernel-driver') {
      logsList = [
        `[Driver] Registered char device driver "8x8_gameboard" major: 244.`,
        `[User-Space] Initiating ioctl write: cmd=SET_COORDINATES, payload={x:3, y:4, color:red}`,
        `[Kernel-Space] Received ioctl command. Validating pointer layouts...`,
        `[Memory] Virtual address space aligned. Writing directly to mapped 8x8 character buffer.`,
        `[Valgrind] Tracking 500+ read/write cycles...`,
        `[System] 0 leaks, 0 errors, kernel integrity verified successfully.`,
      ];
    }

    const interval = setInterval(() => {
      if (currentLogIndex < logsList.length) {
        setSimulationState(prev => ({
          ...prev,
          logs: [...prev.logs, logsList[currentLogIndex]],
        }));
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setSimulationState(prev => ({
          ...prev,
          status: 'completed',
        }));
      }
    }, 900);
  };

  // Advanced Filtering
  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = activeTab === 'all' || project.category === activeTab;
    
    const matchesTech = selectedTech === 'all' || project.stack.some(tech => {
      if (selectedTech === 'C') return tech === 'C' || tech.includes('C ');
      return tech.toLowerCase().includes(selectedTech.toLowerCase());
    });
    
    return matchesCategory && matchesTech;
  });

  // Sorting Logic
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'date-desc') {
      return (b.date || '').localeCompare(a.date || '');
    }
    if (sortBy === 'date-asc') {
      return (a.date || '').localeCompare(b.date || '');
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <section
      id="projects"
      className="py-24 bg-[#0A0A0A] relative z-10 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-widest text-zinc-400 mb-3"
          >
            <Terminal className="w-3.5 h-3.5 text-gold" />
            Product Engineering
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight"
          >
            Technical Project Archive
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed font-sans"
          >
            A searchable, filterable history of my lower-level kernel work, concurrency mechanisms, and databases systems.
            Utilize the control panel below to drill down into specific engineering stacks.
          </motion.p>
        </div>

        {/* Gallery Filter & Control Dashboard */}
        <div className="glass-card p-6 mb-12 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
            <div>
              <h4 className="font-serif font-bold text-sm text-[#EDEDED] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-gold" />
                Archive Filters & Controls
              </h4>
              <p className="text-xs text-zinc-500 font-sans">
                Filter by technical layer, system language, or sort chronologically.
              </p>
            </div>
            
            {/* Sort Control */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Sort By:</span>
              <select
                id="project-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-950 border border-zinc-900 text-zinc-300 font-mono text-xs px-3 py-1.5 focus:outline-none focus:border-gold/30 rounded cursor-pointer"
              >
                <option value="date-desc">Date (Newest First)</option>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="title">Alphabetical (A-Z)</option>
                <option value="category">Project Type</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Field Filters */}
            <div>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold mb-3">
                Filter by Core Field
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    id={`project-tab-${cat.id}`}
                    onClick={() => {
                      setActiveTab(cat.id as any);
                      setExpandedId(null);
                      setSimulationState({ id: null, status: 'idle', logs: [] });
                    }}
                    className={`px-3 py-1.5 rounded text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer border ${
                      activeTab === cat.id
                        ? 'bg-gold border-gold text-black font-bold'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Filters */}
            <div>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold mb-3">
                Filter by Technology
              </span>
              <div className="flex flex-wrap gap-2">
                {techOptions.map((tech) => (
                  <button
                    key={tech.id}
                    id={`tech-tab-${tech.id}`}
                    onClick={() => {
                      setSelectedTech(tech.id);
                      setExpandedId(null);
                      setSimulationState({ id: null, status: 'idle', logs: [] });
                    }}
                    className={`px-2.5 py-1 rounded text-[9px] uppercase tracking-widest font-mono transition-all cursor-pointer border ${
                      selectedTech === tech.id
                        ? 'bg-zinc-850 border-gold/40 text-gold font-bold'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {tech.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Masonry Grid */}
        <motion.div 
          layout 
          id="projects-grid" 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {sortedProjects.length === 0 ? (
              <motion.div 
                key="no-matches"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="col-span-1 md:col-span-2 py-16 text-center glass-card"
              >
                <AlertCircle className="w-10 h-10 text-gold mx-auto mb-3" />
                <p className="font-serif font-bold text-base text-[#EDEDED]">No matching projects found</p>
                <p className="text-xs text-zinc-500 font-sans mt-1">Try adjusting your category or technology filters.</p>
                <button
                  onClick={() => {
                    setActiveTab('all');
                    setSelectedTech('all');
                  }}
                  className="mt-4 px-4 py-2 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-gold text-[10px] uppercase tracking-wider rounded font-bold cursor-pointer"
                >
                  Reset All Filters
                </button>
              </motion.div>
            ) : (
              sortedProjects.map((project) => {
                const isExpanded = expandedId === project.id;
                const isSimulating = simulationState.id === project.id;

                return (
                  <motion.div
                    key={project.id}
                    id={`project-card-${project.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-6 relative overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Category Pill Tag & Impact Badges */}
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-950 text-zinc-300 text-xs border border-zinc-900">
                          {getCategoryIcon(project.category)}
                          {project.category === 'web-ai' ? 'AI & App' : project.category === 'systems' ? 'Systems' : 'Database'}
                        </span>
                        <div className="flex items-center gap-2">
                          {project.date && (
                            <span className="text-[9px] font-mono text-zinc-500 font-semibold bg-zinc-950 px-1.5 py-0.5 border border-zinc-900 rounded">
                              {project.date}
                            </span>
                          )}
                          {project.impactLabel && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-900 border border-gold/15 text-gold text-[10px] font-mono tracking-wide uppercase font-semibold">
                              {project.impactLabel}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & Core Stack */}
                      <h3 className="font-serif font-bold text-lg text-[#EDEDED] mb-2 leading-snug">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.stack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-mono bg-zinc-900 text-zinc-400 border border-zinc-850"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Summary Bullets */}
                      <ul className="space-y-2 text-sm text-zinc-400 mb-6 leading-relaxed">
                        {project.description.slice(0, isExpanded ? undefined : 1).map((bullet, idx) => (
                          <li key={idx} className="flex gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Actions Footer */}
                    <div>
                      <div className="border-t border-white/5 pt-4 mt-4 flex flex-wrap gap-3 items-center justify-between">
                        <div className="flex gap-2">
                          <button
                            id={`project-expand-${project.id}`}
                            onClick={() => setExpandedId(isExpanded ? null : project.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-zinc-400" />
                            {isExpanded ? 'Hide Details' : 'Full Metrics'}
                          </button>
                          
                          <button
                            id={`project-simulate-btn-${project.id}`}
                            onClick={() => {
                              setExpandedId(project.id);
                              if (isSimulating && simulationState.status === 'running') return;
                              runSimulation(project.id);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-zinc-950 hover:bg-zinc-900 text-gold border border-gold/15 cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 text-gold" />
                            Run Sandbox
                          </button>
                        </div>

                        <a
                          id={`project-github-link-${project.id}`}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-gold transition-all"
                          title="View source on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Embedded Interactive Sandbox Panel (renders when simulated) */}
                      <AnimatePresence>
                        {isExpanded && isSimulating && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 border border-zinc-800 bg-[#0D0D0D] rounded overflow-hidden font-mono text-xs text-[#EDEDED]"
                          >
                            <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between border-b border-zinc-800">
                              <span className="flex items-center gap-1.5 font-bold text-gold uppercase tracking-wider text-[10px]">
                                <Terminal className="w-3.5 h-3.5 text-gold" />
                                Interactive Sandbox Console
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold ${
                                simulationState.status === 'running' 
                                  ? 'bg-zinc-800 text-gold border border-gold/25 animate-pulse'
                                  : 'bg-zinc-900 text-zinc-400 border border-zinc-850'
                              }`}>
                                {simulationState.status}
                              </span>
                            </div>

                            {/* Optional Interactive Input for RAG Pipeline */}
                            {project.id === 'rag-pipeline' && (
                              <div className="p-3 border-b border-zinc-800 bg-zinc-950 flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Enter query (e.g., databases, systems)..."
                                  value={simulationState.customInput || ''}
                                  onChange={(e) => setSimulationState(prev => ({ ...prev, customInput: e.target.value }))}
                                  className="flex-1 contact-input px-3 py-1.5 text-xs text-[#EDEDED]"
                                />
                                <button
                                  id="rag-submit-sandbox"
                                  onClick={() => runSimulation(project.id)}
                                  disabled={simulationState.status === 'running'}
                                  className="accent-button px-3 py-1.5 text-xs cursor-pointer font-bold disabled:opacity-50"
                                >
                                  Query RAG
                                </button>
                              </div>
                            )}

                            {/* Log output stream */}
                            <div className="p-4 space-y-2 max-h-48 overflow-y-auto bg-[#050505] text-zinc-300">
                              {simulationState.logs.map((log, idx) => (
                                <div key={idx} className="flex gap-2">
                                  <span className="text-gold/85">&gt;</span>
                                  <span className={log.includes('[Pessimistic Lock]') || log.includes('[Deadlock Avoidance]') ? 'text-amber-400 font-bold' : log.includes('COMMIT') || log.includes('Success') || log.includes('zero') || log.includes('completed') ? 'text-green-400' : ''}>
                                    {log}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
