// api/chat.js
// Local RAG pipeline — no external AI API
// Retrieve → rank → template-generate from scored chunks

const STOP_WORDS = new Set([
  "a","an","the","and","or","but","is","are","was","were","of","to","in","for",
  "on","with","about","what","how","who","where","can","you","tell","me","he",
  "his","him","satya","thakur","resume","portfolio","please","give","show","get",
  "any","some","has","have","had","been","be","do","does","did","at","by","i",
  "like","want","your","his","their","my","its"
]);

// ─── Knowledge base ─────────────────────────────────────────────────────────────
const RESUME_CHUNKS = [
  {
    id: "bio",
    category: "Biography",
    title: "Profile & Contact",
    content: [
      "Satya Thakur is a Software Engineer based in Odenton, MD — US Citizen.",
      "Available for internships, co-ops, and full-time SWE roles starting Fall / Winter 2026.",
      "Passionate about performance-bound services, systems concurrency, low-level drivers, and LLM orchestration.",
      "Email: tsatya487@gmail.com | GitHub: github.com/SdThakur"
    ],
    keywords: ["bio","profile","who","contact","email","location","citizen","citizenship","maryland","md","odenton","hire","intern","internship","coop","co-op","graduate","role","jobs","job","work","availability","address","about","available","reach","connect"]
  },
  {
    id: "education",
    category: "Education",
    title: "Academic Credentials (UMBC)",
    content: [
      "B.S. in Computer Science — University of Maryland, Baltimore County (UMBC).",
      "Expected Graduation: December 2026 | Cumulative GPA: 3.34 / 4.0.",
      "Relevant Coursework: Database Management Systems, Operating Systems, Artificial Intelligence, Computer Networks, Computer Graphics, Data Structures & Algorithms."
    ],
    keywords: ["education","umbc","gpa","university","college","course","coursework","degree","graduation","graduating","major","class","classes","school","maryland","baltimore","study","studied","bachelor","bs","3.34","december","2026"]
  },
  {
    id: "skills",
    category: "Technical Skills",
    title: "Technical Skills",
    content: [
      "Languages: Python, C, C++, SQL, HTML/CSS, JavaScript, TypeScript.",
      "Frontend: React, TailwindCSS, Streamlit.",
      "Backend & APIs: FastAPI, Node.js, Flask, Express.js.",
      "Databases: PostgreSQL, MongoDB, ChromaDB (vector).",
      "DevOps: Docker, Git, GitHub, Linux/Unix, Kubernetes."
    ],
    keywords: ["skills","languages","technical","programming","react","python","typescript","postgres","postgresql","c","c++","javascript","node","fastapi","docker","git","github","linux","unix","database","db","mongodb","chromadb","vector","kubernetes","stack","tools","backend","frontend","tailwind","flask","express","devops","infrastructure","tech"]
  },
  {
    id: "rag-pipeline",
    category: "Project",
    title: "AI Document RAG Pipeline",
    content: [
      "Production-optimized semantic document search and context generation engine.",
      "Handles 10,000+ document chunks with 80% faster retrieval lookup times.",
      "Ingests text into ChromaDB via sentence-transformer embeddings.",
      "Similarity threshold tuned from 0.75 → 0.45: +35% recall, 90%+ precision.",
      "Migrated generation layer to google-genai SDK across 15+ API call sites."
    ],
    keywords: ["rag","pipeline","ai","document","search","retrieval","chroma","chromadb","embeddings","vector","similarity","fastapi","streamlit","gemini","sdk","transformers","sentence-transformers","threshold","precision","recall","nlp","llm","semantic","search"]
  },
  {
    id: "parking-mgmt",
    category: "Project",
    title: "UMBC Parking Management System",
    content: [
      "Automated logistics, spot lookup, and reservation transactions for 500+ parking spots.",
      "SELECT FOR UPDATE pessimistic locking at PostgreSQL — eliminates double-booking race conditions.",
      "40% query latency reduction via B-Tree indexing and SQL materialized views.",
      "Deployed with containerized Docker pipelines."
    ],
    keywords: ["parking","management","postgres","postgresql","sql","spot","spots","reservation","concurrency","booking","locks","lock","pessimistic","latency","indexing","b-tree","materialized","views","docker","streamlit","race","conditions","umbc","database"]
  },
  {
    id: "task-scheduler",
    category: "Project",
    title: "Multithreaded Priority Task Scheduler",
    content: [
      "High-performance 3-tier priority scheduler (High / Medium / Low) written in C.",
      "Built with POSIX pthreads, mutexes, and custom semaphores for synchronization.",
      "Dynamic starvation prevention (aging) and deadlock-avoidance algorithms.",
      "Processed 1,000+ concurrent tasks — zero memory leaks under Valgrind stress tests."
    ],
    keywords: ["scheduler","task","multithreaded","concurrency","pthread","pthreads","mutex","mutexes","locks","semaphore","semaphores","starvation","deadlock","aging","c","valgrind","memory","leaks","threads","priority","systems","os","operating"]
  },
  {
    id: "kernel-driver",
    category: "Project",
    title: "Linux Kernel Character Device Driver",
    content: [
      "Low-level Linux character device driver in C — bridges user-space and an 8×8 LED game board.",
      "Custom ioctl handlers for safe coordinate-state read/write cycles.",
      "Kernel-space / user-space memory isolation buffers.",
      "Zero kernel crashes across 100+ Valgrind stress-test cycles."
    ],
    keywords: ["kernel","driver","linux","character","device","char","ioctl","hardware","board","gameboard","memory","crashes","valgrind","user-space","kernel-space","c","low-level","os","operating","system","module","led"]
  },
  {
    id: "experience",
    category: "Experience",
    title: "UPS — Remote Data Entry Intern",
    content: [
      "Remote Data Entry Intern at UPS, June 2025 – August 2025.",
      "95%+ first-attempt resolution rate on document anomalies.",
      "99%+ accuracy processing digital shipments, manifests, and billing databases.",
      "Streamlined workflows cutting completion time on 20+ urgent daily shipment requests."
    ],
    keywords: ["experience","job","work","ups","intern","internship","data","entry","anomaly","accuracy","manifest","billing","shipments","shipping","june","august","2025","employment","worked","role"]
  },
  {
    id: "certifications",
    category: "Certifications",
    title: "Professional Certifications",
    content: [
      "IBM — Intelligent by Design: Build an AI Agent (June 2026): autonomous agents, multi-agent orchestration, memory cycles, tool structures.",
      "Anthropic — Claude 101 (June 2026, ID: ddt86947g3pg): context windows, XML output structures, system prompt design, anti-hallucination guardrails.",
      "Anthropic — AI Fluency Framework & Foundations (June 2026, ID: fharrq8mfwsb): transformer architectures, scaling laws, LLM foundations, AI ethics.",
      "Walmart USA — Advanced SWE Job Simulation via Forage (May 2026, ID: dSCz55qE4c53YrtMP): system design, DB indexing, memory optimization.",
      "Commonwealth Bank — SWE Job Simulation via Forage (May 2026, ID: 69f4e3d01943326e70a28862): secure APIs, defensive programming, vulnerability scanning.",
      "HPE — SWE Job Simulation via Forage (May 2026, ID: QpjGiEwaE4X5yDw7t): Java Spring Boot microservice, REST CRUD, JUnit suites (90%+ coverage)."
    ],
    keywords: ["ibm","claude","anthropic","101","walmart","commonwealth","bank","hpe","hewlett","packard","forage","certification","certifications","certified","certificate","credential","ai","agent","fluency","framework","foundations","spring","boot","junit","java","security","fintech","orchestration","2026","may","june"]
  }
];

// ─── Intent detection ──────────────────────────────────────────────────────────
const INTENTS = {
  greeting:    ["hi","hello","hey","greetings","yo","sup","howdy","welcome","whats up","what's up"],
  projects:    ["project","projects","built","build","made","created","work on","working on","portfolio","side project"],
  contact:     ["contact","email","reach","hire","hiring","available","availability","connect","linkedin","github"],
  experience:  ["experience","internship","intern","worked","work history","job","employment","ups"],
  skills:      ["skill","skills","know","tech","stack","languages","tools","use","using","proficient"],
  education:   ["school","study","degree","gpa","college","university","umbc","graduate","graduation","coursework"],
  certifications: ["cert","certs","certification","certifications","certificate","certified","credential","badge"]
};

function detectIntent(tokens, rawQuery) {
  const q = rawQuery.toLowerCase();
  for (const [intent, phrases] of Object.entries(INTENTS)) {
    if (phrases.some((p) => q.includes(p) || tokens.includes(p))) return intent;
  }
  return null;
}

// ─── Scoring ───────────────────────────────────────────────────────────────────
function scoreChunks(tokens) {
  return RESUME_CHUNKS.map((chunk) => {
    let score = 0;
    const hits = new Set();

    tokens.forEach((token) => {
      if (chunk.keywords.includes(token)) {
        score += 15; hits.add(token);
      } else {
        const partial = chunk.keywords.find((kw) => kw.includes(token) || token.includes(kw));
        if (partial) { score += 8; hits.add(token); }
      }
      if (chunk.title.toLowerCase().includes(token)) score += 5;
      chunk.content.forEach((line) => { if (line.toLowerCase().includes(token)) score += 2; });
    });

    score += hits.size * 5; // diversity bonus
    return { chunk, score, hits: Array.from(hits) };
  });
}

// ─── Response builder ──────────────────────────────────────────────────────────
// Builds a natural-reading reply from retrieved chunks rather than a raw data dump.
function buildReply({ selected, intent, isFallback, query, tokens }) {
  const chunkMap = Object.fromEntries(selected.map((s) => [s.chunk.id, s.chunk]));

  // ── Greeting ────────────────────────────────────────────────────────────────
  if (intent === "greeting") {
    return (
      `Hey! I'm Satya's portfolio assistant — I can tell you about his projects, skills, experience, education, or certifications.\n\n` +
      `**Quick highlights:**\n` +
      `• 🎓 CS student at UMBC, graduating December 2026\n` +
      `• 🛠 Full-stack + systems engineer — Python, C, React, FastAPI, Docker\n` +
      `• 🚀 Key projects: RAG Pipeline, Parking DBMS, Kernel Driver, Task Scheduler\n` +
      `• 📬 Available for SWE internships & co-ops\n\n` +
      `What would you like to know?`
    );
  }

  // ── Contact intent shortcut ─────────────────────────────────────────────────
  if (intent === "contact") {
    return (
      `Here's how to reach Satya:\n\n` +
      `• **Email:** tsatya487@gmail.com\n` +
      `• **GitHub:** github.com/SdThakur\n\n` +
      `He's actively looking for SWE internships and co-op roles starting Fall / Winter 2026.`
    );
  }

  // ── Certifications shortcut ─────────────────────────────────────────────────
  if (intent === "certifications" && chunkMap["certifications"]) {
    const c = chunkMap["certifications"];
    let r = `Satya holds **${c.content.length} professional certifications**:\n\n`;
    c.content.forEach((line) => { r += `• ${line}\n`; });
    return r;
  }

  // ── General: render retrieved chunks as clean sections ───────────────────────
  // Group by category for a more natural flow
  const sections = [];

  // Projects first if intent is projects
  const projectChunks = selected.filter((s) => s.chunk.category === "Project");
  const otherChunks   = selected.filter((s) => s.chunk.category !== "Project");
  const ordered = intent === "projects"
    ? [...projectChunks, ...otherChunks]
    : [...otherChunks, ...projectChunks];

  ordered.forEach(({ chunk }) => {
    let section = `**${chunk.title}** *(${chunk.category})*\n`;
    chunk.content.forEach((line) => { section += `• ${line}\n`; });
    sections.push(section);
  });

  const intro = isFallback
    ? `I didn't find an exact match for "${query}", but here's Satya's general profile:\n\n`
    : `Here's what I found for you:\n\n`;

  return intro + sections.join("\n") + `\n---\n*Ask about a specific project, skills, certifications, or how to get in touch!*`;
}

// ─── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")    return res.status(405).json({ error: "Method not allowed" });

  const startTime = Date.now();

  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message payload is required." });

    const query = message.trim();

    // 1. Tokenise
    const tokens = query
      .toLowerCase()
      .replace(/[^\w\s-]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 1 && !STOP_WORDS.has(t));

    // 2. Detect intent
    const intent = detectIntent(tokens, query);
    const isGreeting = intent === "greeting" || tokens.length === 0;

    // 3. Retrieve + rank
    const scored  = scoreChunks(tokens);
    const active  = scored.filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
    let selected, isFallback;

    if (active.length > 0) {
      const topScore = active[0].score;
      selected   = active.filter((x) => x.score >= topScore * 0.6).slice(0, 3);
      isFallback = false;
    } else {
      // Fallback: bio + skills (always useful)
      selected   = [
        { chunk: RESUME_CHUNKS[0], score: 0, hits: [] },
        { chunk: RESUME_CHUNKS[2], score: 0, hits: [] }
      ];
      isFallback = true;
    }

    // Intent-aware override: if intent maps to a specific chunk, surface it
    const intentChunkMap = {
      contact:          "bio",
      experience:       "experience",
      education:        "education",
      skills:           "skills",
      certifications:   "certifications",
    };
    if (intent && intentChunkMap[intent] && !isFallback) {
      const pinId = intentChunkMap[intent];
      const alreadyIn = selected.some((s) => s.chunk.id === pinId);
      if (!alreadyIn) {
        const pinned = RESUME_CHUNKS.find((c) => c.id === pinId);
        if (pinned) selected.unshift({ chunk: pinned, score: 999, hits: [] });
        selected = selected.slice(0, 3);
      }
    }

    // 4. Build natural reply
    const reply = buildReply({ selected, intent, isFallback, query, tokens });

    return res.json({
      reply,
      _meta: {
        intent,
        tokens_matched: tokens,
        chunks: selected.map((s) => ({ id: s.chunk.id, score: s.score })),
        is_fallback: isFallback,
        latency_ms: Date.now() - startTime
      }
    });

  } catch (error) {
    console.error("Pipeline error:", error);
    return res.status(500).json({
      error: "Pipeline error.",
      reply: "⚠️ Something went wrong. Please try again."
    });
  }
}
