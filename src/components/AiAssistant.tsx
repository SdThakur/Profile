import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, User, Send, Sparkles, Trash2, Shield, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';

export default function AiAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'initial',
        sender: 'bot',
        text: "Hi! I'm Satya's AI Resume Assistant, powered by a localized custom RAG (Retrieval-Augmented Generation) pipeline. You can ask me any questions about Satya's background, coursework, systems projects, databases, or internship experience!",
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null); 

  const sampleQuestions = [
    'What databases is Satya skilled in?',
    'Explain Satya\'s RAG Pipeline project.',
    'Tell me about his internship experience.',
    'What is his GPA and coursework?',
  ];

  const scrollToBottom = () => {
  if (chatBodyRef.current) {
    const container = chatBodyRef.current;
    
    // Find the very last message element inside the container
    const messages = container.querySelectorAll('[id^="chat-msg-"]');
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1] as HTMLElement;
      
      // Calculate the top position of the new message relative to the container
      const newScrollTop = lastMessage.offsetTop - container.offsetTop - 16; // 16px padding offset

      container.scrollTo({
        top: newScrollTop,
        behavior: 'smooth',
      });
    } else {
      // Fallback to absolute bottom for the typing indicator or initial load
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }
};

useEffect(() => {
  // A tiny timeout ensures AnimatePresence has rendered the new DOM node
  const timer = setTimeout(() => {
    scrollToBottom();
  }, 50);
  
  return () => clearTimeout(timer);
}, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to the assistant server.');
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || "Sorry, I wasn't able to compile a response right now. Please try again.",
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: `⚠️ Connection Error: ${err.message || 'Unable to reach the server. Make sure the backend server is running.'}`,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'initial',
        sender: 'bot',
        text: "Hi! Chat has been reset. Ask me anything about Satya's technical skills, operating system driver achievements, or database pessimistic lock designs!",
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <section
      id="chatbot"
      className="py-24 bg-[#0A0A0A] relative z-10 border-b border-white/5"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-widest text-zinc-400 mb-3"
          >
            <Bot className="w-3.5 h-3.5 text-gold" />
            Local RAG Pipeline
          </motion.div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight">
            AI Resume Chatbot
          </h2>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed font-sans">
            Test the live RAG setup! Ask questions about Satya's background or let the agent summarize his qualifications for your roles.
          </p>
        </div>

        {/* Chat Window Box */}
        <div className="glass-card overflow-hidden flex flex-col h-[520px]">
          
          {/* Chat Header */}
          <div className="bg-zinc-900 px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-center text-gold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[#EDEDED] text-sm flex items-center gap-1.5">
                  Satya's AI Agent
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                </h3>
                <span className="text-[10px] font-mono text-gold block uppercase tracking-wider">
                  Active &bull; Local RAG Engine
                </span>
              </div>
            </div>

            <button
              id="clear-chat-btn"
              onClick={clearChat}
              className="p-2 rounded bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-red-400 hover:border-red-900/40 transition-all cursor-pointer"
              title="Clear Chat history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div ref={chatBodyRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#0B0B0B]/40">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  id={`chat-msg-${msg.id}`}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  {/* Avatar bubble */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-gold text-black font-bold text-xs'
                      : 'bg-zinc-950 border border-zinc-900 text-gold'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Text card */}
                  <div className="space-y-1">
                    <div className={`rounded-lg px-4 py-2.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gold text-black font-medium'
                        : 'bg-zinc-900 text-zinc-200 border border-zinc-850'
                    }`}>
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                    <span className={`block text-[9px] font-mono text-zinc-500 ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {msg.createdAt}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing simulation */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 max-w-[80%]"
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-950 border border-zinc-900 flex items-center justify-center text-gold flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-zinc-900 border border-zinc-850 rounded-lg px-4 py-3 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={chatBodyRef} />
          </div>

          {/* Prompt suggestions inside Chat container */}
          <div className="p-4 bg-zinc-900/30 border-t border-white/5 flex flex-wrap gap-2 justify-center">
            {sampleQuestions.map((question, idx) => (
              <button
                key={idx}
                id={`sample-prompt-btn-${idx}`}
                onClick={() => handleSend(question)}
                disabled={loading}
                className="px-3 py-1.5 rounded text-xs bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-900 hover:border-gold/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>

          {/* Form input controls */}
          <div className="p-4 bg-zinc-900/50 border-t border-white/5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask about systems projects, internship details, FastAPI skills..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 contact-input px-4 py-3 text-xs text-[#EDEDED]"
              />
              <button
                type="submit"
                id="submit-chat-btn"
                disabled={loading || !input.trim()}
                className="px-4 py-3 rounded bg-gold hover:bg-gold/90 text-black font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Security / Sandboxed note */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] font-mono text-zinc-600">
          <Shield className="w-3.5 h-3.5 text-gold/80" />
          <span>Server-Side Chat Session Encrypted & Isolated</span>
        </div>

      </div>
    </section>
  );
}
