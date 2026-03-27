"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Github, Linkedin, ExternalLink, Activity } from "lucide-react";
import { TeamMember } from "@/app/actions/teamActions";

const STATUSES = ["Building", "Shipping", "Learning", "Exploring"];
const MOCK_SKILLS = ["React", "Next.js", "AI", "Web3", "UI/UX", "Python", "Node.js", "Solidity"];

export function TeamPreview({ members }: { members: TeamMember[] }) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Pick a subset or all members to show in the wall
  const displayMembers = members.slice(0, 16);

  // Esc key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMember(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="builder-wall" className="relative pt-32 pb-32 bg-[#050505] min-h-screen flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)]" />
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,242,255,0.08)_0%,transparent_60%)] rounded-full blur-3xl"
        />
      </div>

      {/* Header Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 mb-20 md:mb-32 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-[#00F2FF]" />
            <span className="font-mono text-sm tracking-widest text-[#00F2FF] uppercase">System Nodes Online</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-wider drop-shadow-[0_0_15px_rgba(0,242,255,0.3)]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Live Builder Wall
          </h2>
        </div>
        <Link href="/team" className="font-mono text-xs uppercase tracking-widest text-gray-400 hover:text-[#00F2FF] transition-colors flex items-center gap-2 border-b border-white/10 hover:border-[#00F2FF]/50 pb-1">
          Explore full system <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* The Floating Wall Grid */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-12 flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12 min-h-[60vh]">
        {displayMembers.length > 0 ? (
          displayMembers.map((member, i) => (
            <BuilderNode 
              key={member.id} 
              member={member} 
              index={i} 
              onClick={() => setSelectedMember(member)} 
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-xl border border-red-500/20 rounded-2xl w-full max-w-2xl">
            <svg className="w-12 h-12 text-red-500/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-bold text-red-400 mb-2 font-mono">System Offline</h3>
            <p className="text-gray-400 text-center font-mono text-sm">Failed to connect to the builder database. Core members could not be loaded at this time.</p>
          </div>
        )}
      </div>

      {/* Builder Profile Modal */}
      <AnimatePresence>
        {selectedMember && (
          <BuilderModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function BuilderNode({ member, index, onClick }: { member: TeamMember, index: number, onClick: () => void }) {
  // Deterministic randomness
  const status = STATUSES[index % STATUSES.length];
  const delay = (index % 5) * 0.2;
  const driftY = 10 + (index % 10);
  const driftX = 5 + (index % 5);
  
  // Assign 2 random skills based on index to mock data if non-existent
  const memberSkills = [
    MOCK_SKILLS[index % MOCK_SKILLS.length],
    MOCK_SKILLS[(index + 3) % MOCK_SKILLS.length]
  ];

  // Mock activity pulse firing periodically
  const [isPulsing, setIsPulsing] = useState(false);
  useEffect(() => {
    // Random interval between 4s and 12s
    const pulseInterval = 4000 + (Math.random() * 8000);
    const intervalId = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1500); // 1.5s active pulse
    }, pulseInterval);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay }}
      className="relative z-10"
    >
      <motion.div
        animate={{ y: [0, -driftY, 0], x: [0, driftX, 0] }}
        transition={{ duration: 6 + (index % 4), repeat: Infinity, ease: "easeInOut", delay: delay }}
        onClick={onClick}
        whileHover={{ scale: 1.05, zIndex: 40 }}
        className="group cursor-pointer relative flex flex-col items-center"
      >
        {/* The Node Glass Card */}
        <div className="relative flex flex-col items-center justify-center p-4 rounded-[2rem] bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-500 hover:bg-black/80 hover:border-[#00F2FF]/50 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,242,255,0.2)]">
          
          {/* Status Badge (The Live Element) */}
          <div className="absolute -top-3 px-3 py-1 bg-[#111] border rounded-full flex items-center gap-1.5 transition-colors duration-500" 
               style={{ borderColor: isPulsing ? '#00FF66' : 'rgba(255,255,255,0.1)' }}>
            <motion.div 
              animate={isPulsing ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: isPulsing ? '#00FF66' : '#555', boxShadow: isPulsing ? '0 0 5px #00FF66' : 'none' }}
            />
            <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: isPulsing ? '#00FF66' : '#777' }}>
              {status}
            </span>
          </div>

          {/* Avatar Ring */}
          <div className="relative w-24 h-24 mt-2 rounded-full p-1 border-2 border-transparent transition-colors duration-500 group-hover:border-[#00F2FF]/60">
            {/* Pulsing ring during activity */}
            {isPulsing && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.3, 1.5] }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-[#00FF66]"
              />
            )}
            
            <div className="w-full h-full rounded-full overflow-hidden bg-[#111] flex items-center justify-center">
              {member.photo ? (
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
              ) : (
                <span className="font-mono text-2xl text-white/50">{member.name[0]}</span>
              )}
            </div>
          </div>

          {/* Name & Role */}
          <div className="mt-4 text-center">
            <h3 className="text-white font-bold text-sm tracking-wide group-hover:text-[#00F2FF] transition-colors">{member.name}</h3>
            <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-widest">{member.role || "Core"}</p>
          </div>

          {/* Expanded Hover Skills (Desktop mostly) */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none hidden md:flex flex-wrap gap-1 justify-center z-50">
            {memberSkills.map(skill => (
               <span key={skill} className="px-2 py-1 rounded bg-[#00F2FF]/10 border border-[#00F2FF]/30 text-[9px] font-mono text-[#00F2FF] uppercase">{skill}</span>
            ))}
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

function BuilderModal({ member, onClose }: { member: TeamMember, onClose: () => void }) {
  // Mock data parsing for modal depth
  const bio = "Building the future of web interfaces. Obsessed with high-performance animations, fluid user experiences, and scalable system architecture.";
  const MOCK_SKILLS = ["React", "Typescript", "Next.js", "Framer Motion", "TailwindCSS", "Node.js"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={onClose} />
      
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
        {/* Glow Effects inside Modal */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(0,242,255,0.15)_0%,transparent_70%)] rounded-full blur-2xl pointer-events-none" />

        {/* Header / Close */}
        <div className="absolute top-4 right-4 z-20">
          <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8 relative z-10">
          {/* Avatar Section */}
          <div className="flex-shrink-0 flex flex-col gap-4 items-center md:items-start">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/10 overflow-hidden bg-[#111] relative group">
              {member.photo ? (
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-mono text-white/20">{member.name[0]}</div>
              )}
              {/* Overlay glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-2">
              <Link href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-[#00F2FF]/20 hover:text-[#00F2FF] border border-white/5 hover:border-[#00F2FF]/50 text-gray-400 transition-all">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-[#00F2FF]/20 hover:text-[#00F2FF] border border-white/5 hover:border-[#00F2FF]/50 text-gray-400 transition-all">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 flex flex-col pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F2FF]/10 border border-[#00F2FF]/20 text-[#00F2FF] text-[10px] uppercase font-mono tracking-widest rounded-full w-fit mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00F2FF] animate-pulse" />
              Active System Builder
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1px" }}>
              {member.name}
            </h2>
            <p className="text-sm font-mono text-[#00F2FF] uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
              {member.role || "Core Developer"}
            </p>

            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              {bio}
            </p>

            <div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">Tech Stack / Skills</p>
              <div className="flex flex-wrap gap-2">
                {MOCK_SKILLS.map(skill => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-gray-300 shadow-inner">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
