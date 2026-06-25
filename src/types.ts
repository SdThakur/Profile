export interface Project {
  id: string;
  title: string;
  stack: string[];
  category: 'web-ai' | 'systems' | 'databases';
  description: string[];
  demoUrl?: string;
  githubUrl?: string;
  highlightCount?: string;
  impactLabel?: string;
  date?: string; // Format: YYYY-MM
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  company: string;
  date: string;
  credentialId?: string;
  bullets: string[];
  skills: string[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  createdAt: string;
}
