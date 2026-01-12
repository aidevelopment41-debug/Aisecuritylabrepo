"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Fingerprint, Activity, Radio, Cpu, Terminal } from "lucide-react";
import { NeonButton } from "@/components/neon-button";

const projects = [
  { 
    title: "IoT Security Lab", 
    subtitle: "Edge Intelligence Defense", 
    id: "PROJ-001",
    tags: ["IoT", "Security"], 
    color: "orange",
    icon: Radio,
    visual: "waveform"
  },
  { 
    title: "Biometric AI", 
    subtitle: "Secure Identity Verification", 
    id: "PROJ-002",
    tags: ["Biometrics", "AI"], 
    color: "blue",
    icon: Fingerprint,
    visual: "circuit"
  },
  { 
    title: "Threat Detection", 
    subtitle: "Adversarial Pattern Recognition", 
    id: "PROJ-003",
    tags: ["Research", "Safety"], 
    color: "orange",
    icon: Activity,
    visual: "grid"
  }
];

export default function InnovationLab() {
  return (
    <section className="relative z-10 py-24 container px-4 md:px-8 mx-auto max-w-screen-2xl mb-32 ">
      {/* SECTION HEADER */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-orange-500 text-[10px] tracking-[0.3em] uppercase mb-4">
            <span className="w-8 h-[1px] bg-orange-500"></span>
            Innovation Lab_
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron  text-white">
            Research <br /> <span className="text-zinc-500 italic">& </span>Projects
          </h2>
        </motion.div>
        
        <div className="text-right hidden md:block">
          <div className="text-[10px] text-zinc-600 uppercase">System Frequency: 44.1kHz</div>
          <div className="text-[10px] text-zinc-600 uppercase">Active Nodes: 12</div>
        </div>
      </div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group relative h-[450px] overflow-hidden rounded-sm border border-white/5 bg-[#050505] transition-all hover:border-orange-500/40"
          >
            {/* 1. THE "SCAN" ANIMATION LAYER */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
               <motion.div 
                 animate={{ y: ["-100%", "200%"] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 className="w-full h-24 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent z-20"
               />
               {/* Background Grid */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>

            {/* 2. TOP TELEMETRY BAR */}
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center border-b border-white/5 bg-black/40 backdrop-blur-sm z-30">
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-orange-500" />
                <span className="text-[9px] text-zinc-500 tracking-tighter">{p.id}</span>
              </div>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-orange-500 animate-pulse" />
                <div className="w-1 h-1 bg-zinc-800" />
              </div>
            </div>

            {/* 3. CENTER VISUAL (Visual Explanation) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-700">
               <ProjectVisual type={p.visual} />
            </div>

            {/* 4. BOTTOM CONTENT SECTION */}
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/90 to-transparent z-30">
              <div className="flex gap-2 mb-4">
                {p.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-zinc-900 border border-white/10 text-zinc-400 uppercase tracking-widest">
                    {t}
                  </span>
                ))}
              </div>
              
              <h3 className="text-2xl font-bold font-orbitron mb-2 text-white group-hover:text-orange-500 transition-colors">
                {p.title}
              </h3>
              <p className="text-zinc-500 text-xs leading-relaxed mb-6 font-exo opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                {p.subtitle}: Implementing next-gen protocols for secure data distribution at the edge.
              </p>

              <NeonButton 
                variant="outline" 
                size="sm" 
                className="w-full justify-between bg-black/50 border-white/10 hover:border-orange-500/50"
              >
                Launch Protocol <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </NeonButton>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Visual Explanation Component inside the card
function ProjectVisual({ type }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {type === "waveform" && (
        <div className="flex items-center gap-1">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [10, 40, 15, 30, 10] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              className="w-1 bg-orange-500/20"
            />
          ))}
        </div>
      )}
      {type === "circuit" && (
        <div className="relative">
          <Cpu className="text-blue-500/10" size={180} />
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
             <div className="w-24 h-24 rounded-full border border-blue-500/20 animate-ping" />
          </motion.div>
        </div>
      )}
      {type === "grid" && (
        <div className="grid grid-cols-4 gap-4 opacity-10">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              className="w-8 h-8 border border-white"
            />
          ))}
        </div>
      )}
    </div>
  );
}