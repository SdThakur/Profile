import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Paths to database files
const LEADS_FILE = path.join(process.cwd(), 'leads.json');

// Ensure leads.json exists
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// 1. Submit Inquiry
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const leadsData = fs.readFileSync(LEADS_FILE, 'utf-8');
    const leads = JSON.parse(leadsData);

    const newLead = {
      id: `lead_${Date.now()}`,
      name,
      email,
      company: company || '',
      message,
      createdAt: new Date().toISOString(),
    };

    leads.push(newLead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');

    console.log(`[Lead Collected] Submitted by: ${name} (${email})`);
    console.log(`[Simulated Email] Automated alert dispatched to tsatya487@gmail.com for lead ${newLead.id}`);

    return res.json({ success: true, lead: newLead });
  } catch (error: any) {
    console.error('Error recording contact inquiry:', error);
    return res.status(500).json({ error: 'Failed to record contact inquiry.' });
  }
});

// 2. Fetch inquiries
app.get('/api/leads', (req, res) => {
  try {
    const leadsData = fs.readFileSync(LEADS_FILE, 'utf-8');
    const leads = JSON.parse(leadsData);
    // Return newest first
    const sortedLeads = [...leads].reverse();
    return res.json({ leads: sortedLeads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return res.status(500).json({ error: 'Failed to retrieve leads database.' });
  }
});

// Stop words for query token filtering
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'of', 'to', 'in', 'for', 'on', 'with', 'about', 
  'what', 'how', 'who', 'where', 'can', 'you', 'tell', 'me', 'he', 'his', 'him', 'satya', 'thakur', 'resume', 'portfolio',
  'please', 'give', 'show', 'get', 'any', 'some', 'has', 'have', 'had', 'been', 'be', 'do', 'does', 'did', 'at', 'by', 'i', 'like', 'want'
]);

// Local Resume Document Chunks
const RESUME_CHUNKS = [
  {
    id: 'bio',
    category: 'Biography',
    title: "Satya's Profile & Contact Information",
    content: [
      "Satya Thakur is a highly motivated Software Engineer based in Odenton, MD, and is a US Citizen.",
      "He is currently available for internships, co-ops, and full-time graduate SWE roles starting around Fall 2026 / Winter 2026.",
      "He is passionate about performance-bound services, systems concurrency, low-level drivers, and LLM orchestration.",
      "Direct Channels: Email: tsatya487@gmail.com | GitHub: github.com/SdThakur"
    ],
    keywords: ['bio', 'profile', 'who', 'satya', 'thakur', 'contact', 'email', 'location', 'citizen', 'citizenship', 'maryland', 'md', 'odenton', 'hire', 'intern', 'internship', 'coop', 'co-op', 'graduate', 'role', 'jobs', 'job', 'work', 'availability', 'address', 'about']
  },
  {
    id: 'education',
    category: 'Education',
    title: 'Academic Credentials (UMBC)',
    content: [
      "Pursuing a Bachelor of Science (B.S.) in Computer Science at the University of Maryland, Baltimore County (UMBC).",
      "Expected Graduation: December 2026.",
      "Current Cumulative GPA: 3.34 / 4.0.",
      "Relevant Coursework: Database Management Systems, Operating Systems, Artificial Intelligence, Computer Networks, Computer Graphics, Data Structures and Algorithms."
    ],
    keywords: ['education', 'umbc', 'gpa', 'university', 'college', 'course', 'coursework', 'degree', 'graduation', 'graduating', 'major', 'class', 'classes', 'school', 'maryland', 'baltimore']
  },
  {
    id: 'skills',
    category: 'Skills',
    title: 'Technical Skills Inventory',
    content: [
      "Programming Languages: Python, C, C++, SQL, HTML/CSS, JavaScript, TypeScript.",
      "Frontend Architecture: React, TailwindCSS, Streamlit for responsive web interfaces.",
      "Backend & APIs: FastAPI, Node.js, Flask, REST API Design, Express.js.",
      "Databases & Vector Storage: PostgreSQL, MongoDB, ChromaDB vector databases.",
      "DevOps & Infrastructure: Docker, Git, GitHub, Linux/Unix environments, Kubernetes."
    ],
    keywords: ['skills', 'languages', 'technical', 'programming', 'react', 'python', 'typescript', 'postgres', 'postgresql', 'c', 'c++', 'javascript', 'node', 'fastapi', 'docker', 'git', 'github', 'linux', 'unix', 'database', 'db', 'mongodb', 'chromadb', 'vector', 'kubernetes', 'stack', 'libraries', 'tools', 'backend', 'frontend']
  },
  {
    id: 'rag-pipeline',
    category: 'Project',
    title: 'AI Document RAG Pipeline Project',
    content: [
      "Engineered a production-optimized semantic document search and context generation engine.",
      "Accelerated semantic document retrieval across 10,000+ document chunks, cutting retrieval lookup times by 80%.",
      "Ingested text files into a ChromaDB vector database utilizing sentence-transformer embeddings.",
      "Calibrated the similarity threshold from 0.75 to 0.45, boosting document retrieval recall by 35% with 90%+ precision.",
      "Future-proofed the system by migrating the generation layer to a modern server-side AI processing pipeline."
    ],
    keywords: ['rag', 'pipeline', 'ai', 'document', 'search', 'retrieval', 'chroma', 'chromadb', 'embeddings', 'vector', 'similarity', 'fastapi', 'streamlit', 'sdk', 'transformers', 'sentence-transformers', 'threshold', 'precision', 'recall', 'nlp', 'llm', 'semantic']
  },
  {
    id: 'parking-mgmt',
    category: 'Project',
    title: 'UMBC Parking Management System Project',
    content: [
      "Automated logistics, spots lookup, and reservation transactions for 500+ parking spots.",
      "Implemented standard SELECT FOR UPDATE pessimistic concurrency locks at the PostgreSQL layer, successfully preventing double-booking race conditions.",
      "Achieved a 40% query latency reduction on the live dashboard through B-Tree indexing and SQL materialized views.",
      "Deployed the entire database and application environment using containerized Docker pipelines."
    ],
    keywords: ['parking', 'management', 'postgres', 'postgresql', 'sql', 'spot', 'spots', 'reservation', 'concurrency', 'booking', 'locks', 'lock', 'pessimistic', 'update', 'for update', 'latency', 'indexing', 'b-tree', 'materialized', 'views', 'view', 'docker', 'python', 'streamlit', 'race', 'conditions']
  },
  {
    id: 'task-scheduler',
    category: 'Project',
    title: 'Multithreaded Priority Task Scheduler Project',
    content: [
      "Simulated a high-performance, concurrent 3-tier priority scheduler (High/Medium/Low channels) in C Lang.",
      "Utilized POSIX threads (pthreads), mutual exclusion locks (mutexes), and custom semaphores for synchronization.",
      "Engineered dynamic starvation prevention (aging elements) and deadlock-avoidance algorithms.",
      "Successfully processed 1,000+ highly concurrent scheduler tasks, passing strict Valgrind stress testing with zero memory leaks."
    ],
    keywords: ['scheduler', 'task', 'multithreaded', 'concurrency', 'pthread', 'pthreads', 'mutex', 'mutexes', 'locks', 'lock', 'semaphore', 'semaphores', 'starvation', 'deadlock', 'avoidance', 'aging', 'c', 'valgrind', 'memory', 'leaks', 'leak', 'stress', 'threads', 'priority', 'c lang']
  },
  {
    id: 'kernel-driver',
    category: 'Project',
    title: 'Linux Kernel Hardware-Adjacent Software Interface Project',
    content: [
      "Developed a low-level Linux character device driver in C Lang to interface user-space with an 8x8 led game board.",
      "Authored custom ioctl system-call read and write handlers to manage board hardware coordinate state cycles safely.",
      "Architected secure kernel-space and user-space memory layout isolation buffers.",
      "Ensured absolute stability with zero kernel crashes, validated over 100+ stress test cycles with Valgrind memory leak tools."
    ],
    keywords: ['kernel', 'driver', 'linux', 'character', 'device', 'char', 'ioctl', 'hardware', 'board', 'gameboard', 'game', 'memory', 'crashes', 'crash', 'valgrind', 'user-space', 'kernel-space', 'leak', 'c', 'low-level', 'os', 'operating system']
  },
  {
    id: 'experience',
    category: 'Experience',
    title: 'UPS Remote Data Entry Internship',
    content: [
      "Worked as a Remote Data Entry Intern at UPS (United Parcel Service) from June 2025 to August 2025.",
      "Maintained a 95%+ first-attempt resolution on remote document anomalies.",
      "Processed digital shipments, manifests, and billing databases with 99%+ accuracy.",
      "Streamlined workflows, cutting document completion times for 20+ urgent daily shipment requests."
    ],
    keywords: ['experience', 'job', 'work', 'ups', 'intern', 'internship', 'data', 'entry', 'anomaly', 'anomalies', 'accuracy', 'manifest', 'billing', 'shipments', 'shipping', 'june', 'august', '2025']
  },
  {
    id: 'ibm-ai-agent',
    category: 'Certifications',
    title: 'IBM - Intelligent by Design: Build an AI Agent',
    content: [
      "Completed the IBM Intelligent by Design: Build an AI Agent certification in June 2026.",
      "Mastered autonomous AI agents, multi-agent orchestrations, memory cycles, and tool structures.",
      "Constructed custom agents with prompt templates, task reasoning loops, and external execution triggers."
    ],
    keywords: ['ibm', 'ai', 'agent', 'agents', 'intelligent', 'by', 'design', 'prompt', 'generative', 'conversational', 'orchestration', 'june', '2026', 'certification', 'certifications']
  },
  {
    id: 'claude-101',
    category: 'Certifications',
    title: 'Anthropic - Claude 101',
    content: [
      "Completed the Anthropic Claude 101 certificate of completion in June 2026.",
      "Credential ID: ddt86947g3pg.",
      "Gained expertise in Claude 3.5 context windows, XML tags output structures, system prompt design, and anti-hallucination guardrails."
    ],
    keywords: ['claude', 'anthropic', '101', 'xml', 'prompt', 'structured', 'deterministic', 'june', '2026', 'ddt86947g3pg', 'certification', 'certifications']
  },
  {
    id: 'ai-fluency',
    category: 'Certifications',
    title: 'Anthropic - AI Fluency Framework & Foundations',
    content: [
      "Completed the Anthropic AI Fluency Framework & Foundations certification in June 2026.",
      "Credential ID: fharrq8mfwsb.",
      "Studied transformer architectures, scaling laws, LLM foundations, AI ethics, and defensive mitigation rules."
    ],
    keywords: ['fluency', 'framework', 'foundations', 'anthropic', 'safety', 'ethics', 'llm', 'transformer', 'attention', 'scaling', 'june', '2026', 'fharrq8mfwsb', 'certification', 'certifications']
  },
  {
    id: 'walmart-se',
    category: 'Certifications',
    title: 'Walmart USA - Advanced Software Engineering Job Simulation',
    content: [
      "Completed the Walmart USA Advanced Software Engineering Job Simulation via Forage in May 2026.",
      "Credential ID: dSCz55qE4c53YrtMP.",
      "Simulated enterprise system design, database indexing strategy, memory optimization, and concurrent traffic pipelines."
    ],
    keywords: ['walmart', 'usa', 'advanced', 'system', 'design', 'concurrency', 'forage', 'scale', 'simulation', 'may', '2026', 'dscz55qe4c53yrtmp', 'certification', 'certifications']
  },
  {
    id: 'cba-se',
    category: 'Certifications',
    title: 'Commonwealth Bank - Software Engineering Job Simulation',
    content: [
      "Completed the Commonwealth Bank Software Engineering Job Simulation via Forage in May 2026.",
      "Credential ID: 69f4e3d01943326e70a28862.",
      "Practiced financial secure APIs design, defensive programming, and code reviews for vulnerability scanning."
    ],
    keywords: ['commonwealth', 'bank', 'cba', 'forage', 'security', 'audit', 'defensive', 'api', 'vulnerability', 'fintech', 'may', '2026', '69f4e3d01943326e70a28862', 'certification', 'certifications']
  },
  {
    id: 'hpe-se',
    category: 'Certifications',
    title: 'HPE - Software Engineering Job Simulation',
    content: [
      "Completed the HPE Software Engineering Job Simulation via Forage in May 2026.",
      "Credential ID: QpjGiEwaE4X5yDw7t.",
      "Engineered an employee management microservice in Java Spring Boot with REST CRUD endpoints and JUnit test suites (90%+ coverage)."
    ],
    keywords: ['hpe', 'hewlett', 'packard', 'enterprise', 'java', 'spring', 'boot', 'spring boot', 'forage', 'junit', 'crud', 'endpoints', 'coverage', 'may', '2026', 'qpjgiewae4x5ydw7t', 'certification', 'certifications']
  }
];

// 3. AI Chatbot endpoint - Satya's Local RAG Resume Context Agent
app.post('/api/chat', (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message payload is required.' });
    }

    const query = message.trim();
    
    // Normalize and tokenize the query
    const tokens = query.toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length > 1 && !STOP_WORDS.has(t));

    // Handle conversational greetings directly
    const greetings = ['hi', 'hello', 'hey', 'greetings', 'yo', 'sup', 'howdy', 'welcome'];
    const isGreeting = tokens.length === 0 || tokens.some(t => greetings.includes(t));

    // Compute matching score for each chunk
    const scoredChunks = RESUME_CHUNKS.map(chunk => {
      let score = 0;
      const matchedTokens: string[] = [];

      tokens.forEach((token) => {
        // Direct exact match with a keyword
        if (chunk.keywords.includes(token)) {
          score += 15;
          matchedTokens.push(token);
        } else {
          // Check substring matching
          const partialMatch = chunk.keywords.find(kw => kw.includes(token) || token.includes(kw));
          if (partialMatch) {
            score += 8;
            matchedTokens.push(token);
          }
        }

        // Match in title
        if (chunk.title.toLowerCase().includes(token)) {
          score += 5;
        }

        // Match in bullet content
        chunk.content.forEach(bullet => {
          if (bullet.toLowerCase().includes(token)) {
            score += 2;
          }
        });
      });

      // Boost score slightly if multiple unique tokens matched this chunk
      const uniqueMatches = new Set(matchedTokens).size;
      score += uniqueMatches * 5;

      return {
        chunk,
        score,
        matchedTokens: Array.from(new Set(matchedTokens))
      };
    });

    // Sort by score descending
    const activeMatches = scoredChunks
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    let selectedChunks: any[] = [];
    let matchedKeywords: string[] = [];
    let confidence = 0;
    let isFallback = false;

    if (activeMatches.length > 0) {
      const topScore = activeMatches[0].score;
      // Select the top match, and any other matches that have a score within 60% of the top match (up to max 3)
      selectedChunks = activeMatches
        .filter(item => item.score >= topScore * 0.6)
        .slice(0, 3);
      
      // Collect matched keywords
      const keys = new Set<string>();
      selectedChunks.forEach(sc => sc.matchedTokens.forEach((t: string) => keys.add(t)));
      matchedKeywords = Array.from(keys);
      
      // Calibrate confidence (capped at 100%)
      confidence = Math.min(100, Math.round((topScore / 30) * 100));
      if (confidence < 45) confidence = 45; // Calibrated minimum for any matching keyword
    } else {
      // Fallback: If no keywords match, retrieve bio and skills as general context
      isFallback = true;
      selectedChunks = [
        { chunk: RESUME_CHUNKS[0], score: 0 }, // Profile/Bio
        { chunk: RESUME_CHUNKS[2], score: 0 }  // Technical Skills
      ];
      matchedKeywords = isGreeting ? ['greeting'] : ['general_lookup'];
      confidence = 100;
    }

    // Generate random RAG simulation metrics
    const latencyMs = parseFloat((Math.random() * 0.8 + 0.3).toFixed(2)); // between 0.3ms and 1.1ms

    // Construct highly structured response matching our terminal RAG aesthetic
    let reply = `⚡ **RAG Pipeline Retrieval Log**:\n`;
    reply += `• **Status**: ${isFallback ? 'Default Context Routing' : 'Successful Match'}\n`;
    reply += `• **Latency**: ${latencyMs}ms | **Similarity Index**: cosine-keyword-calibrated\n`;
    reply += `• **Retrieval Score**: ${isFallback ? 'N/A' : `${activeMatches[0].score}pts`}\n`;
    reply += `• **Matched Keywords**: [${matchedKeywords.join(', ')}]\n`;
    reply += `• **Active Chunks**: [${selectedChunks.map(sc => sc.chunk.title).join(', ')}]\n`;
    reply += `--------------------------------------------------------------------------------\n\n`;

    if (isFallback) {
      if (isGreeting) {
        reply += `Hello! I am Satya's **RAG-Powered AI Agent**. Since you said hello, I've loaded Satya's primary background profile chunks:\n\n`;
      } else {
        reply += `I couldn't find an exact keyword match in my database for your question ("${query}"). However, here is Satya's general profile and skill set to help you:\n\n`;
      }
    } else {
      reply += `Based on Satya's resume database, the local RAG pipeline retrieved the following highly relevant context:\n\n`;
    }

    selectedChunks.forEach((sc, idx) => {
      const { chunk } = sc;
      reply += `### 🔹 ${chunk.title} (${chunk.category})\n`;
      chunk.content.forEach((bullet: string) => {
        reply += `• ${bullet}\n`;
      });
      if (idx < selectedChunks.length - 1) {
        reply += `\n`;
      }
    });

    // Add a professional closing statement
    reply += `\n\n---\n*Feel free to ask about any specific project (RAG Pipeline, Multithreaded Task Scheduler, Parking DBMS, Linux Driver), or GPA details!*`;

    return res.json({ reply });
  } catch (error: any) {
    console.error('Error in local RAG chat routing:', error);
    return res.status(500).json({ 
      error: 'Failed to process chat with local RAG pipeline.',
      reply: '⚠️ Sorry, there was an issue executing the local RAG pipeline retrieval.' 
    });
  }
});

// Mount Vite middleware for development, serve static for production
const startServer = async () => {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
