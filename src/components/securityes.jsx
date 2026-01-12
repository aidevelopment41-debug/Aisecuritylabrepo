"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Shield, Zap, Lock, ArrowRight, Binary, Network, Eye, Radio, Cpu, Workflow } from "lucide-react";
import { Crosshair } from "lucide-react"; 

const services = [
  {
    id: "threat",
    icon: Shield,
    title: "Automated Threat Detection",
    tag: "MODULE: NEURAL-SCAN",
    desc: "AI-driven identification of adversarial patterns and anomalies.",
    explanation: "Our neural engine monitors packet headers in real-time, comparing them against 50M+ known attack signatures using high-speed vector clustering.",
    stats: ["Accuracy: 99.9%", "Detection: <10ms"],
    visual: "radar"
  },
  {
    id: "predict",
    icon: Zap,
    title: "Predictive Defense",
    tag: "MODULE: OMEN-PREDICT",
    desc: "Leveraging neural intelligence to anticipate and neutralize future threats.",
    explanation: "Simulating 10,000 potential breach scenarios every second to identify vulnerabilities before a single line of code is exploited.",
    stats: ["Sims/sec: 10k", "Risk Bias: 0.02%"],
    visual: "network"
  },
  {
    id: "harden",
    icon: Lock,
    title: "Model Hardening",
    tag: "MODULE: SHIELD-GEN",
    desc: "Rigorous security assurance for large-scale AI infrastructure.",
    explanation: "Adversarial training protocols that inject noise and malicious gradients to ensure your LLMs remain un-poisonable and resistant to prompt injection.",
    stats: ["Hardness: 0.95", "Latent Space: Secure"],
    visual: "binary"
  }
];

export default function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <section ref={containerRef} className="relative py-24 bg-transparent text-zinc-100 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-orange-500/20 to-transparent" />

      <motion.div style={{ opacity, scale }} className="container mx-auto px-6 relative z-10">
        
        {/* Header HUD */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-orange-500" />
              <span className="text-orange-500 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">System Capabilities</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-orbitron  text-white">
              Services <br /> <span className="text-zinc-500 italic">&</span> Solutions
            </h2>
          </div>
          <button className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-full hover:bg-orange-500 transition-all duration-500 hover:text-black">
            <span className="font-mono text-xs font-bold uppercase tracking-widest">Learn how AI helps</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Interactive Dashboard Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Navigable List */}
<div className="lg:col-span-5 space-y-4">
  {services.map((s, i) => (
    <motion.div
      key={s.id}
      onMouseEnter={() => setActiveIdx(i)}
      onClick={() => setActiveIdx(i)} // Added for mobile/click support
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.1 }}
      className={`group relative cursor-pointer p-6 transition-all duration-500 rounded-sm border ${
        activeIdx === i 
          ? "bg-orange-500/10 border-orange-500/50" 
          : "bg-white/[0.01] border-white/5 hover:border-white/20"
      }`}
    >
      {/* 1. ACTIVE GLOW EFFECT */}
      {activeIdx === i && (
        <motion.div 
          layoutId="activeGlow" 
          className="absolute inset-0 bg-orange-500/5 blur-xl pointer-events-none" 
        />
      )}

      <div className="flex items-start gap-6 relative z-10">
        {/* 2. NUMBER INDICATOR */}
        <span className={`font-mono text-xs font-bold mt-1 transition-colors ${
          activeIdx === i ? "text-orange-500" : "text-zinc-700"
        }`}>
          0{i + 1}
        </span>

        {/* 3. CONTENT AREA */}
        <div className="flex-grow space-y-2">
          <div className="flex items-center justify-between">
            <h3 className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors ${
              activeIdx === i ? "text-white" : "text-zinc-500"
            }`}>
              {s.title}
            </h3>
            
            {/* 4. CROSSHAIR ANIMATION */}
            {activeIdx === i && (
              <motion.div 
                initial={{ scale: 0, rotate: -90 }} 
                animate={{ scale: 1, rotate: 0 }} 
                className="ml-auto"
              >
                <Crosshair size={16} className="text-orange-500 animate-[spin_4s_linear_infinite]" />
              </motion.div>
            )}
          </div>

          <p className={`text-sm leading-relaxed max-w-sm transition-colors duration-500 ${
            activeIdx === i ? "text-zinc-300" : "text-zinc-600 group-hover:text-zinc-400"
          }`}>
            {s.desc}
          </p>
        </div>
      </div>

      {/* 5. BOTTOM PROGRESS LINE (Optional extra detail) */}
      {activeIdx === i && (
        <motion.div 
          layoutId="activeBorder"
          className="absolute bottom-0 left-0 h-[2px] bg-orange-500 w-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
        />
      )}
    </motion.div>
  ))}
</div>
          {/* RIGHT: Visual Explain Panel */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="relative aspect-video lg:h-[500px] w-full bg-zinc-950 border border-white/10 rounded-sm overflow-hidden group">
                            {/* Decorative Corner Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/30" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/30" />
              {/* Animated HUD Corners */}
              <div className="absolute top-4 left-4 flex gap-1">
                <div className="w-1 h-1 bg-orange-500 animate-pulse" />
                <div className="w-8 h-[1px] bg-orange-500/30" />
              </div>
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-zinc-600 tracking-tighter uppercase">
                X-Coordinate: 44.02 // Y-Coordinate: 10.99
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="absolute inset-0 p-12 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-orange-500 text-black rounded-sm">
                      {React.createElement(services[activeIdx].icon, { size: 24 })}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{services[activeIdx].tag}</div>
                      <div className="text-xs text-zinc-500 font-mono">Status: Processing Intelligence...</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-12 h-full">
                    {/* Visual Graphics Generator */}
                    <div className="relative flex items-center justify-center border border-white/5 bg-black/40 rounded-sm overflow-hidden">
                       <VisualGraphic type={services[activeIdx].visual} />
                    </div>

                    {/* Explainer Data */}
                    <div className="flex flex-col justify-center space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
                          <Workflow size={14} className="text-orange-500" /> Technical Logic
                        </div>
                        <p className="text-zinc-400 text-sm font-mono leading-relaxed">
                          {services[activeIdx].explanation}
                        </p>
                      </div>

                      <div className="space-y-3 border-t border-white/10 pt-6">
                        {services[activeIdx].stats.map((stat, idx) => (
                          <div key={idx} className="flex justify-between items-center text-[10px] font-mono uppercase">
                            <span className="text-zinc-500">{stat.split(':')[0]}</span>
                            <span className="text-orange-500 font-bold">{stat.split(':')[1]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Scanning Line Effect */}
              <motion.div 
                animate={{ translateY: ["-100%", "200%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent pointer-events-none"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Sub-component for dynamic graphics
function VisualGraphic({ type }) {
  if (type === "radar") {
    return (
      <div className="relative w-32 h-32">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-orange-500/20 border-t-orange-500" 
        />
        <div className="absolute inset-4 rounded-full border border-white/5" />
        <div className="absolute inset-8 rounded-full border border-white/5" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-[45%] bg-orange-500 rounded-full blur-sm" 
        />
        <Radio className="absolute inset-0 m-auto text-orange-500 opacity-20" size={40} />
      </div>
    );
  }
  
  if (type === "network") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <Network className="text-orange-500/40" size={80} />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
              x: Math.sin(i) * 40,
              y: Math.cos(i) * 40
            }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            className="absolute w-2 h-2 bg-orange-500 rounded-full"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 opacity-30">
      {[...Array(16)].map((_, i) => (
        <motion.div 
          key={i}
          animate={{ opacity: [0.1, 1, 0.1] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
          className="w-4 h-4 bg-orange-500 rounded-xs" 
        />
      ))}
      <Binary className="absolute inset-0 m-auto text-orange-500" size={40} />
    </div>
  );
}