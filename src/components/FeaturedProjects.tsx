import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Brain, 
  Cpu, 
  Database, 
  ArrowRight, 
  Github, 
  ExternalLink, 
  Terminal, 
  Play, 
  CheckCircle2, 
  Activity, 
  Network,
  Layers
} from 'lucide-react';

export default function FeaturedProjects() {
  const [activeVisual, setActiveVisual] = useState<'rag' | 'threads'>('rag');
  
  // RAG Visual Simulation State
  const [ragStep, setRagStep] = useState<number>(0);
  const [ragQuery, setRagQuery] = useState<string>('Find systems programming expert...');
  const [ragIsRunning, setRagIsRunning] = useState<boolean>(false);
  
  // Thread Simulator State
  const [threadStatus, setThreadStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [threadTasks, setThreadTasks] = useState<Array<{ id: string; prio: 'HIGH' | 'MED' | 'LOW'; status: string; progress: number }>>([
    { id: 'T-101', prio: 'HIGH', status: 'Queued', progress: 0 },
    { id: 'T-102', prio: 'HIGH', status: 'Queued', progress: 0 },
    { id: 'T-103', prio: 'MED', status: 'Queued', progress: 0 },
    { id: 'T-104', prio: 'LOW', status: 'Queued', progress: 0 },
  ]);
  const [activeThreads, setActiveThreads] = useState<Array<{ name: string; task: string | null; lock: boolean }>>([
    { name: 'CPU Core Thread 0', task: null, lock: false },
    { name: 'CPU Core Thread 1', task: null, lock: false },
    { name: 'CPU Core Thread 2', task: null, lock: false },
    { name: 'CPU Core Thread 3', task: null, lock: false },
  ]);

  // Run RAG Visual Simulation
  const runRagDemo = () => {
    if (ragIsRunning) return;
    setRagIsRunning(true);
    setRagStep(1); // Encoding
    
    setTimeout(() => {
      setRagStep(2); // Vector Search
      setTimeout(() => {
        setRagStep(3); // Context Augment
        setTimeout(() => {
          setRagStep(4); // LLM Generation
          setTimeout(() => {
            setRagStep(5); // Complete
            setRagIsRunning(false);
          }, 2000);
        }, 1800);
      }, 1600);
    }, 1400);
  };

  // Run CPU Thread Visual Simulation
  const runThreadDemo = () => {
    if (threadStatus === 'running') return;
    setThreadStatus('running');
    
    // Reset tasks
    setThreadTasks([
      { id: 'T-101', prio: 'HIGH', status: 'Queued', progress: 0 },
      { id: 'T-102', prio: 'HIGH', status: 'Queued', progress: 0 },
      { id: 'T-103', prio: 'MED', status: 'Queued', progress: 0 },
      { id: 'T-104', prio: 'LOW', status: 'Queued', progress: 0 },
    ]);
    setActiveThreads([
      { name: 'CPU Core Thread 0', task: null, lock: false },
      { name: 'CPU Core Thread 1', task: null, lock: false },
      { name: 'CPU Core Thread 2', task: null, lock: false },
      { name: 'CPU Core Thread 3', task: null, lock: false },
    ]);

    // Animate tasks entering cores
    setTimeout(() => {
      // T-101 and T-102 (HIGH) enter cores
      setActiveThreads([
        { name: 'CPU Core Thread 0', task: 'T-101 (Acquired Mutex)', lock: true },
        { name: 'CPU Core Thread 1', task: 'T-102 (Acquired Mutex)', lock: true },
        { name: 'CPU Core Thread 2', task: null, lock: false },
        { name: 'CPU Core Thread 3', task: null, lock: false },
      ]);
      setThreadTasks(prev => prev.map(t => t.id === 'T-101' || t.id === 'T-102' ? { ...t, status: 'Processing', progress: 30 } : t));

      setTimeout(() => {
        // Cores progress, T-103 (MED) scheduled
        setActiveThreads([
          { name: 'CPU Core Thread 0', task: 'T-101 (Acquired Mutex)', lock: true },
          { name: 'CPU Core Thread 1', task: 'T-102 (Acquired Mutex)', lock: true },
          { name: 'CPU Core Thread 2', task: 'T-103 (Starvation Guard)', lock: false },
          { name: 'CPU Core Thread 3', task: null, lock: false },
        ]);
        setThreadTasks(prev => prev.map(t => {
          if (t.id === 'T-101' || t.id === 'T-102') return { ...t, progress: 70 };
          if (t.id === 'T-103') return { ...t, status: 'Processing', progress: 20 };
          return t;
        }));

        setTimeout(() => {
          // T-101, T-102 complete, release lock. T-104 (LOW) scheduled
          setActiveThreads([
            { name: 'CPU Core Thread 0', task: null, lock: false },
            { name: 'CPU Core Thread 1', task: 'T-104 (Low Priority Channel)', lock: false },
            { name: 'CPU Core Thread 2', task: 'T-103 (Starvation Guard)', lock: false },
            { name: 'CPU Core Thread 3', task: null, lock: false },
          ]);
          setThreadTasks(prev => prev.map(t => {
            if (t.id === 'T-101' || t.id === 'T-102') return { ...t, status: 'Completed', progress: 100 };
            if (t.id === 'T-103') return { ...t, progress: 80 };
            if (t.id === 'T-104') return { ...t, status: 'Processing', progress: 40 };
            return t;
          }));

          setTimeout(() => {
            // All complete
            setActiveThreads([
              { name: 'CPU Core Thread 0', task: null, lock: false },
              { name: 'CPU Core Thread 1', task: null, lock: false },
              { name: 'CPU Core Thread 2', task: null, lock: false },
              { name: 'CPU Core Thread 3', task: null, lock: false },
            ]);
            setThreadTasks(prev => prev.map(t => ({ ...t, status: 'Completed', progress: 100 })));
            setThreadStatus('completed');
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1000);
  };

  const scrollToArchiveAndSimulate = (projectId: string) => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="spotlight" className="py-24 bg-[#0A0A0A] relative z-10 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-widest text-zinc-400 mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Spotlight
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight"
          >
            Featured Project Spotlight
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed font-sans"
          >
            A high-fidelity look into my cornerstone systems engineering and AI-driven architectures.
            Interact with the custom sandbox terminals below to see how they run at the compiler and vector space levels.
          </motion.p>
        </div>

        {/* Spotlight Navigation Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-zinc-950 p-1 border border-zinc-900 rounded flex gap-2">
            <button
              onClick={() => setActiveVisual('rag')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-2 ${
                activeVisual === 'rag'
                  ? 'bg-gold text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Brain className="w-4 h-4" />
              1. AI Document RAG Pipeline
            </button>
            <button
              onClick={() => setActiveVisual('threads')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-2 ${
                activeVisual === 'threads'
                  ? 'bg-gold text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              2. Multithreaded Task Scheduler
            </button>
          </div>
        </div>

        {/* Interactive Spotlight Card */}
        <AnimatePresence mode="wait">
          {activeVisual === 'rag' ? (
            <motion.div
              key="rag-spotlight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Info Panel */}
              <div className="lg:col-span-5 flex flex-col justify-between glass-card p-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-900 text-gold text-xs border border-gold/15 uppercase font-mono tracking-wide">
                      Cornerstone Project
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      AI & NLP Engine
                    </span>
                  </div>
                  
                  <h3 className="font-serif font-bold text-2xl text-[#EDEDED] mb-3">
                    RAG Pipeline with LLM Integration
                  </h3>
                  
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans mb-6">
                    A production-optimized semantic document search and context generation engine. 
                    Built to scale parsing and lookup across 10,000+ document chunks, replacing restrictive cosine similarity algorithms with a calibrated threshold to improve context retrieval recall by 35%.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex gap-3 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>Optimized embeddings search using ChromaDB and Sentence-Transformers.</span>
                    </div>
                    <div className="flex gap-3 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>Calibrated threshold (0.75 &rarr; 0.45) boosting recall with 90%+ precision.</span>
                    </div>
                    <div className="flex gap-3 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>Modernized architecture built natively with secure server-side AI parsing logic.</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {['FastAPI', 'ChromaDB', 'Streamlit', 'Python'].map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] tracking-wider uppercase font-mono bg-zinc-950 border border-zinc-900 text-zinc-400 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                  <button
                    onClick={() => scrollToArchiveAndSimulate('rag-pipeline')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-xs font-bold bg-gold text-black uppercase tracking-wider cursor-pointer hover:bg-gold/90 transition-all shadow-md"
                  >
                    Run RAG Sandbox
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="https://github.com/SdThakur/RAG-Pipeline.git"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-zinc-400" />
                    Source Code
                  </a>
                </div>
              </div>

              {/* Animated Visualization Panel */}
              <div className="lg:col-span-7 bg-zinc-950/80 border border-white/5 rounded p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gold/5 to-transparent rounded-full pointer-events-none" />
                
                {/* Visual Title */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gold" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[#EDEDED] font-bold">
                      Interactive Vector Pipeline Flow
                    </span>
                  </div>
                  <button
                    onClick={runRagDemo}
                    disabled={ragIsRunning}
                    className="px-3 py-1 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-gold font-mono text-[10px] uppercase rounded flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                  >
                    <Play className="w-3 h-3 text-gold" />
                    Trigger Pipeline
                  </button>
                </div>

                {/* Pipeline visual blocks */}
                <div className="flex-1 flex flex-col justify-center space-y-4 py-4 font-mono text-xs text-zinc-400">
                  {/* Step 0: Input query */}
                  <div className={`p-3 rounded border transition-all ${ragStep >= 0 ? 'bg-zinc-900/60 border-zinc-800 text-white' : 'border-transparent opacity-40'}`}>
                    <div className="flex justify-between items-center mb-1 text-[10px] text-zinc-500 uppercase font-bold">
                      <span>Step 1: Input Document Query</span>
                      {ragStep === 0 && <span className="text-gold animate-pulse">Awaiting Input...</span>}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gold font-bold">&gt;</span>
                      <input 
                        type="text" 
                        value={ragQuery} 
                        onChange={(e) => setRagQuery(e.target.value)}
                        disabled={ragIsRunning}
                        className="bg-transparent border-none text-zinc-200 focus:outline-none w-full text-xs font-mono"
                      />
                    </div>
                  </div>

                  {/* Step 1: Sentence Transformer Embeddings */}
                  <div className={`p-3 rounded border transition-all ${ragStep >= 1 ? 'bg-zinc-900/60 border-zinc-800 text-white' : 'border-transparent opacity-40'}`}>
                    <div className="flex justify-between items-center mb-1 text-[10px] text-zinc-500 uppercase font-bold">
                      <span>Step 2: Sentence-Transformer Vectorizer</span>
                      {ragStep === 1 && <span className="text-gold animate-bounce">Encoding...</span>}
                    </div>
                    <div className="text-zinc-400 text-[11px] truncate font-mono">
                      {ragStep >= 1 ? `vector_repr = [0.124, -0.442, 0.901, ..., ${ragQuery.length * 3}.109] (384-dims)` : 'Waiting for document vectorizer...'}
                    </div>
                  </div>

                  {/* Step 2: Vector Similarity search */}
                  <div className={`p-3 rounded border transition-all ${ragStep >= 2 ? 'bg-zinc-900/60 border-zinc-800 text-white' : 'border-transparent opacity-40'}`}>
                    <div className="flex justify-between items-center mb-1 text-[10px] text-zinc-500 uppercase font-bold">
                      <span>Step 3: ChromaDB Vector Lookup</span>
                      {ragStep === 2 && <span className="text-gold animate-pulse">Similarity scanning...</span>}
                    </div>
                    <div className="text-zinc-400 text-[11px] font-mono space-y-1">
                      {ragStep >= 2 ? (
                        <>
                          <div className="text-green-400">&bull; Chunk #4421: Match found! (Similarity: 0.490 &gt; Threshold: 0.450)</div>
                          <div className="text-green-400">&bull; Chunk #1091: Match found! (Similarity: 0.472 &gt; Threshold: 0.450)</div>
                        </>
                      ) : (
                        'Searching similarity database space...'
                      )}
                    </div>
                  </div>

                  {/* Step 3: LLM Context Assembly */}
                  <div className={`p-3 rounded border transition-all ${ragStep >= 3 ? 'bg-zinc-900/60 border-zinc-800 text-white' : 'border-transparent opacity-40'}`}>
                    <div className="flex justify-between items-center mb-1 text-[10px] text-zinc-500 uppercase font-bold">
                      <span>Step 4: Prompt Context Augmentation</span>
                      {ragStep === 3 && <span className="text-gold">Injecting chunks...</span>}
                    </div>
                    <div className="text-zinc-400 text-[11px] truncate font-mono">
                      {ragStep >= 3 ? `Prompt: "Use context: [Chunk #4421: Satya Thakur has systems programming expertise...], [Chunk #1091...] to answer query: ${ragQuery}"` : 'Constructing augmented prompt context...'}
                    </div>
                  </div>

                  {/* Step 4: AI processing output */}
                  <div className={`p-3 rounded border transition-all ${ragStep >= 4 ? 'bg-zinc-900/60 border-zinc-800 text-white' : 'border-transparent opacity-40'}`}>
                    <div className="flex justify-between items-center mb-1 text-[10px] text-zinc-500 uppercase font-bold">
                      <span>Step 5: Generative AI LLM Response</span>
                      {ragStep === 4 && <span className="text-gold animate-pulse">Streaming response...</span>}
                    </div>
                    <div className="text-zinc-200 text-[11px] font-mono leading-relaxed">
                      {ragStep >= 4 ? (
                        <span className="text-gold font-semibold">
                          "Satya Thakur is a Software Engineer specializing in full-stack development, C multithreaded scheduling, OS character drivers, and robust applications..."
                        </span>
                      ) : (
                        'Awaiting streaming agent completion...'
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-zinc-500 text-center border-t border-white/5 pt-3 mt-3">
                  This RAG demonstration simulates actual query vectors and distance parameters used in the portfolio's RAG stack.
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="thread-spotlight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Info Panel */}
              <div className="lg:col-span-5 flex flex-col justify-between glass-card p-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-900 text-gold text-xs border border-gold/15 uppercase font-mono tracking-wide">
                      Cornerstone Project
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      Concurrency & Systems
                    </span>
                  </div>
                  
                  <h3 className="font-serif font-bold text-2xl text-[#EDEDED] mb-3">
                    Multithreaded Priority Task Scheduler
                  </h3>
                  
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans mb-6">
                    A robust, high-performance background scheduling system written in low-level C. 
                    Simulates highly concurrent background executions across multiple client threads using POSIX threads (`pthreads`), mutex locks, and custom semaphores. Optimized for starvation-free priority scheduling.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex gap-3 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>3-Tier priority execution channels (High / Medium / Low).</span>
                    </div>
                    <div className="flex gap-3 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>Starvation prevention counters automatically elevating long-waiting tasks.</span>
                    </div>
                    <div className="flex gap-3 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>Zero-crash, leak-free design validated via automated concurrent stress testing.</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {['C Lang', 'Pthreads', 'Mutexes', 'Semaphores', 'Low-Level OS'].map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] tracking-wider uppercase font-mono bg-zinc-950 border border-zinc-900 text-zinc-400 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                  <button
                    onClick={() => scrollToArchiveAndSimulate('task-scheduler')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-xs font-bold bg-gold text-black uppercase tracking-wider cursor-pointer hover:bg-gold/90 transition-all shadow-md"
                  >
                    Run Scheduler Sandbox
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="https://github.com/SdThakur/Task-Scheduler-with-Priority-and-Resource-Constraints.git"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-zinc-400" />
                    Source Code
                  </a>
                </div>
              </div>

              {/* Thread Simulator Graphic */}
              <div className="lg:col-span-7 bg-zinc-950/80 border border-white/5 rounded p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gold/5 to-transparent rounded-full pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-gold" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[#EDEDED] font-bold">
                      CPU Core Concurrency Sandbox
                    </span>
                  </div>
                  <button
                    onClick={runThreadDemo}
                    disabled={threadStatus === 'running'}
                    className="px-3 py-1 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-gold font-mono text-[10px] uppercase rounded flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                  >
                    <Play className="w-3 h-3 text-gold" />
                    Dispatch Core Tasks
                  </button>
                </div>

                {/* Graphics Arena */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-center py-2">
                  
                  {/* Task Pool Queue (Left) */}
                  <div className="space-y-2.5 border-r border-white/5 pr-4">
                    <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold mb-2 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-gold" />
                      Incoming Task Priority Queue
                    </div>
                    {threadTasks.map((task) => (
                      <div key={task.id} className="bg-zinc-900 border border-zinc-850 p-2 rounded flex flex-col justify-between font-mono text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-zinc-200 font-bold">{task.id}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                            task.prio === 'HIGH' ? 'bg-red-950 text-red-400 border border-red-900/30' :
                            task.prio === 'MED' ? 'bg-amber-950 text-amber-400 border border-amber-900/30' :
                            'bg-blue-950 text-blue-400 border border-blue-900/30'
                          }`}>
                            {task.prio} Priority
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1 text-[10px]">
                          <span className={task.status === 'Completed' ? 'text-green-400' : task.status === 'Processing' ? 'text-gold animate-pulse' : 'text-zinc-500'}>
                            {task.status}
                          </span>
                          <span className="text-zinc-400">{task.progress}%</span>
                        </div>
                        <div className="w-full bg-zinc-950 h-1 rounded overflow-hidden mt-1">
                          <div className={`h-full transition-all duration-300 ${task.status === 'Completed' ? 'bg-green-400' : 'bg-gold'}`} style={{ width: `${task.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CPU Core Thread Allocation Slots (Right) */}
                  <div className="space-y-3 pl-2">
                    <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold mb-2">
                      Runtime Multi-Core Thread Allocation
                    </div>
                    {activeThreads.map((thread, idx) => (
                      <div key={idx} className="bg-zinc-950 border border-zinc-900 p-2.5 rounded font-mono text-xs">
                        <div className="flex justify-between items-center text-[10px] mb-1.5">
                          <span className="text-zinc-400 font-bold">{thread.name}</span>
                          {thread.lock && (
                            <span className="text-amber-400 font-semibold uppercase tracking-wider text-[8px] bg-amber-950/40 px-1 border border-amber-900/30 animate-pulse">
                              [Mutex Lock]
                            </span>
                          )}
                        </div>
                        <div className="text-xs">
                          {thread.task ? (
                            <div className="text-gold flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                              Processing: <span className="text-white font-bold">{thread.task}</span>
                            </div>
                          ) : (
                            <span className="text-zinc-600 font-normal italic">Thread Idle (Waiting...)</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                <div className="text-[10px] font-mono text-zinc-500 text-center border-t border-white/5 pt-3 mt-3">
                  This core pool displays thread safety mechanisms, mutex resource locks, and starvation avoidance algorithms.
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
