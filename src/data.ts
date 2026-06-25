import { Project, SkillCategory, ExperienceItem, CertificationItem } from './types';

export const personalInfo = {
  name: 'Satya Thakur',
  title: 'Software Engineer',
  location: 'Odenton, MD',
  email: 'tsatya487@gmail.com',
  github: 'https://github.com/SdThakur',
  linkedin: 'https://www.linkedin.com/in/satya-thakur-415706343', // Standard LinkedIn form
  citizenship: 'U.S. Citizen',
  bio: 'I am a Computer Science student at UMBC actively looking for a Software Engineer role, either for an internship or a full-time position. Experienced in full-stack development, backend systems, and building robust, scalable applications.',
};

export const education = {
  school: 'University of Maryland, Baltimore County',
  schoolAbbr: 'UMBC',
  location: 'Baltimore, MD',
  degree: 'Bachelor of Science in Computer Science',
  gpa: '3.34 / 4.00',
  expectedDate: 'Expected Dec 2026',
  coursework: [
    'Database Management Systems',
    'Operating Systems',
    'Artificial Intelligence',
    'Computer Networks',
    'Computer Graphics',
    'Data Structures and Algorithms',
  ],
};

export const skillsData: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    icon: 'Code',
    skills: ['Python', 'C', 'C++', 'SQL', 'HTML/CSS', 'JavaScript', 'TypeScript'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'Layers',
    skills: ['React', 'TailwindCSS', 'Streamlit'],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    icon: 'Cpu',
    skills: ['FastAPI', 'Node.js', 'Flask', 'REST API Design', 'Express.js'],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: 'Database',
    skills: ['PostgreSQL', 'MongoDB', 'ChromaDB'],
  },
  {
    id: 'tools',
    title: 'Tools & Infrastructure',
    icon: 'Terminal',
    skills: ['Docker', 'Git', 'GitHub', 'Linux/Unix', 'Kubernetes'],
  },
];

export const projectsData: Project[] = [
  {
    id: 'rag-pipeline',
    title: 'Retrieval-Augmented Generation (RAG) Pipeline',
    stack: ['Python', 'FastAPI', 'ChromaDB', 'Google GenAI', 'Streamlit'],
    category: 'web-ai',
    description: [
      'Built an automated text vectorization pipeline using FastAPI and ChromaDB, parsing and search-indexing over 10,000+ high-density document chunks.',
      'Improved relevant context search retrieval by 35% with 90%+ matching precision by engineering a customized cosine similarity evaluation scheme in ChromaDB, re-calibrating the similarity threshold from 0.75 to 0.45.',
      'Migrated downstream generation calls completely to a modern server-side GenAI SDK wrapper, establishing secure server-side API proxy routing with zero client exposure.'
    ],
    highlightCount: '10,000+ chunks',
    impactLabel: '80% faster search',
    githubUrl: 'https://github.com/SdThakur/RAG-Pipeline.git',
    date: '2026-05',
  },
  {
    id: 'kernel-driver',
    title: 'Linux Kernel Hardware-Adjacent Software Interface',
    stack: ['C', 'Operating Systems & Low-Level Infrastructure'],
    category: 'systems',
    description: [
      'Achieved zero-crash kernel-space stability across 500+ test operations, by building a Linux character device driver with custom ioctl read/write handlers for an 8×8 game board.',
      'Validated leak-free runtime performance across 100+ stress-test runs, by applying Valgrind-based memory analysis to kernel-space read/write handlers.',
      'Enabled safe, reliable user-to-kernel communication, by engineering custom ioctl interfaces with precise memory layout and resource lifecycle management (init/cleanup).',
    ],
    highlightCount: '500+ operations',
    impactLabel: 'Zero-crash stability',
    githubUrl: 'https://github.com/SdThakur/Connect-Four-Kernel-Module.git',
    date: '2024-11',
  },
  {
    id: 'parking-mgmt',
    title: 'UMBC Parking Management System',
    stack: ['PostgreSQL', 'Docker', 'Python', 'Streamlit'],
    category: 'databases',
    description: [
      'Automated campus parking logistics for 500+ spots with a fully reproducible deployment, by engineering a containerized PostgreSQL 16 database system using Docker.',
      'Eliminated double-booking conflicts during concurrent reservations, ensuring transactional booking integrity, by implementing FOR UPDATE pessimistic locking across the reservation layer.',
      'Reduced dashboard query latency by 40%, by building a real-time Streamlit admin dashboard optimized with B-Tree indexing and materialized views.',
    ],
    highlightCount: '500+ spots',
    impactLabel: '40% latency reduction',
    githubUrl: 'https://github.com/SdThakur/UMBC-Parking-System.git',
    date: '2025-12',
  },
  {
    id: 'task-scheduler',
    title: 'Multithreaded Priority Task Scheduler',
    stack: ['C', 'Concurrency & Systems Optimization'],
    category: 'systems',
    description: [
      'Simulated high-throughput background task processing across High/Medium/Low priority tiers, by developing a 3-tier scheduling system in C using multithreading, mutexes, and semaphores.',
      'Guaranteed 100% task completion and thread-safety under heavy concurrent multi-client loads, by implementing starvation-prevention and deadlock-avoidance algorithms validated via stress testing.',
      'Eliminated memory leaks and race conditions across 1,000+ task executions, by building an automated stress-test suite for performance-bound analysis.',
    ],
    highlightCount: '1,000+ tasks',
    impactLabel: 'Zero memory leaks',
    githubUrl: 'https://github.com/SdThakur/Task-Scheduler-with-Priority-and-Resource-Constraints.git',
    date: '2025-05',
  },
  {
    id: 'ctf-security-tools',
    title: 'Binary Exploitation & CTF Security Tools',
    stack: ['Python', 'Vulnerability Analysis', 'Low-Level Exploits', 'Network Auditing'],
    category: 'systems',
    description: [
      'Developed custom security exploitation scripts and payload-injection mechanisms for secure Capture The Flag (CTF) environments.',
      'Built precise stack-smashing payloads, Return-Oriented Programming (ROP) chains, and shellcode injections validating virtual memory protections.',
      'Programmed network packet capture utilities using raw socket decoders and PCAP decoders to capture, audit, and alert on malicious traffic signatures.',
    ],
    highlightCount: '20+ vulnerabilities',
    impactLabel: '99% exploit precision',
    githubUrl: 'https://github.com/SdThakur/binary-exploitation-tools',
    date: '2026-02',
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'ups-intern',
    role: 'Remote Data Entry Intern',
    company: 'UPS',
    location: 'Remote',
    period: 'Jun 2025 – Aug 2025',
    bullets: [
      'Reduced operational downtime by maintaining a 95%+ first-attempt resolution rate, by diagnosing and resolving remote data transmission errors, cloud database synchronization anomalies, and virtual workstation issues.',
      'Achieved 99%+ accuracy across secure database systems, by processing high-volume digital transaction records, global shipment data, and manifest documentation.',
      'Cut average completion time for 20+ daily client data requests, by streamlining digital document handling, cloud file organization, and virtual tracking workflows.',
    ],
  },
];

export const certificationsData: CertificationItem[] = [
  {
    id: 'ibm-ai-agent',
    title: 'Intelligent by Design: Build an AI Agent',
    company: 'IBM',
    date: 'Jun 2026',
    bullets: [
      'Mastered the core architecture of state-driven autonomous AI agents, including tool utilization, memory retention cycles, and conversational steering frameworks.',
      'Constructed modular agents that dynamically orchestrate API integrations, perform multi-turn reasoning loops, and handle complex unstructured inputs.'
    ],
    skills: ['AI Agents', 'Prompt Engineering', 'Generative AI', 'Agentic Workflows']
  },
  {
    id: 'claude-101',
    title: 'Claude 101',
    company: 'Anthropic',
    date: 'Jun 2026',
    credentialId: 'ddt86947g3pg',
    bullets: [
      'Gained deep familiarity with Claude 3.5 architectures, XML-structured output generation, system prompt optimization, and advanced context-window handling.',
      'Designed defensive multi-prompt pipelines to prevent hallucination, minimize token usage, and enforce deterministic structural formatting.'
    ],
    skills: ['Claude Models', 'Anthropic API', 'Prompt Design', 'XML Structuring']
  },
  {
    id: 'ai-fluency',
    title: 'AI Fluency Framework & Foundations',
    company: 'Anthropic',
    date: 'Jun 2026',
    credentialId: 'fharrq8mfwsb',
    bullets: [
      'Studied the foundational scaling laws, attention mechanisms, and architectural designs of modern large language models.',
      'Applied robust safety evaluation frameworks, ethical risk mitigation guidelines, and output validation filters for AI applications.'
    ],
    skills: ['LLM Foundations', 'AI Safety & Ethics', 'Generative AI Overview']
  },
  {
    id: 'walmart-se',
    title: 'Walmart USA - Advanced Software Engineering Job Simulation',
    company: 'Forage',
    date: 'May 2026',
    credentialId: 'dSCz55qE4c53YrtMP',
    bullets: [
      'Completed practical simulations focused on enterprise-level system design, relational database modeling, and scale-out architecture planning.',
      'Optimized backend data pipelines and algorithm choices to handle concurrent traffic spikes and enforce secure transaction boundaries.'
    ],
    skills: ['System Design', 'Enterprise Software', 'Data Structures', 'Database Architectures']
  },
  {
    id: 'cba-se',
    title: 'Commonwealth Bank - Software Engineering Job Simulation',
    company: 'Forage',
    date: 'May 2026',
    credentialId: '69f4e3d01943326e70a28862',
    bullets: [
      'Simulated developer tasks modeling highly secure financial services, backend transaction validation loops, and multi-tenant isolation.',
      'Performed application security audits, vulnerability scanning procedures, and defensive API route structure configurations.'
    ],
    skills: ['Defensive Programming', 'Application Security', 'FinTech', 'API Security']
  },
  {
    id: 'hpe-se',
    title: 'Hewlett Packard Enterprise - Software Engineering Job Simulation',
    company: 'Forage',
    date: 'May 2026',
    credentialId: 'QpjGiEwaE4X5yDw7t',
    bullets: [
      'Delivered a fully tested employee management REST API achieving 90%+ code coverage across 15+ unit tests, by building a Java Spring Boot service with 5 CRUD endpoints and full JSON request/response handling.'
    ],
    skills: ['Java Spring Boot', 'JUnit Testing', 'REST API Development', 'Hibernate']
  }
];

