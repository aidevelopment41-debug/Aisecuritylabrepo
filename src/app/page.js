"use client"

import Link from "next/link"
import React,{useRef,useState,useEffect} from "react";
import { ArrowRight, ShieldCheck, Activity, Lock, Eye, Shield, Zap } from "lucide-react"
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image"
import HeroBackground from "@/components/hero-background"
import { LiveDefenseConsole } from "@/components/live-console"
import SecurityFeatures from "@/components/feature"
import ServicesSection from "@/components/securityes"
import InnovationLab from "@/components/projects";
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } },
}

const features = [
  { icon: Shield, title: "Automated Protection", desc: "Real-time AI-driven threat neutralization." },
  { icon: Zap, title: "Predictive Defense", desc: "Forseeing attacks before they originate." },
  { icon: Lock, title: "Model Hardening", desc: "Securing the core of your AI infrastructure." },
]

import { NeonButton } from "@/components/neon-button"

export default function Home() {
const containerRef = useRef(null);
const [mounted, setMounted] = useState(false);



const { scrollYProgress } = useScroll(
  mounted
    ? {
        target: containerRef,
        offset: ["start start", "end end"],
      }
    : {}
);

const scaleY = useSpring(scrollYProgress ?? 0, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
});

  return (
<div
  ref={containerRef}
  className="flex flex-col min-h-screen bg-[#000000] text-white pt-[80px] md:pt-[100px] relative overflow-hidden"
>      <div className="fixed left-6 top-1/2 -translate-y-1/2 h-64 w-[1px] bg-zinc-800 hidden lg:block">
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="w-full h-full bg-orange-500 shadow-[0_0_15px_#f97316]"
          />
        </div>
      {/* Backgrounds */}
      <HeroBackground />
      {/* Animated noise overlay */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay animate-grain" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative z-10 container px-4 md:px-8 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh] lg:min-h-[60vh] py-12 md:py-20">

          {/* Left: Copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start text-left"
          >


            <motion.h1 variants={item} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight font-orbitron">
              Securing Tomorrow with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500">
                Intelligent Defense.
              </span>
            </motion.h1>

            <motion.p variants={item} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg font-exo font-light leading-relaxed">
              AI-Powered Threat Intelligence for the modern enterprise.
              Observe, evaluate, and neutralize adversarial threats with precision.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link href="/research">
                <NeonButton variant="orange" size="lg">
                  Explore Our Research
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NeonButton>
              </Link>
              <Link href="/projects">
                <NeonButton variant="outline" size="lg">
                  View Projects
                </NeonButton>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Console */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <LiveDefenseConsole />
          </motion.div>
        </div>
      </section>

      {/* Feature Strip */}
      <SecurityFeatures/>

      {/* Services/Solutions Section */}
      <ServicesSection/>

      {/* Research & Projects Section */}
      <InnovationLab/>

      {/* About Us Section */}
      <section className="relative z-10 container px-4 md:px-8 mx-auto max-w-screen-2xl mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-orange-500 font-mono text-xs tracking-widest mb-2 uppercase">Our Mission</div>
            <h2 className="text-3xl md:text-5xl font-bold font-orbitron mb-6">Pioneering AI Security</h2>
            <p className="text-lg text-muted-foreground font-exo font-light leading-relaxed mb-8">
              At AI Security Lab, we are dedicated to securing the future of intelligent systems.
              By combining deep cybersecurity expertise with cutting-edge AI research, we build
              the defense mechanisms necessary for a world driven by autonomous agents.
            </p>
            <div className="flex gap-8 md:gap-12">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white font-orbitron">15+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Active Projects</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white font-orbitron">100k+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Threats Analyzed</div>
              </div>
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl border border-white/10 bg-white/5 overflow-hidden group shadow-[0_0_50px_rgba(249,115,22,0.1)]">
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
      </section>

      {/* Resources & Insights Section */}
      <section className="relative z-10 container px-4 md:px-8 mx-auto max-w-screen-2xl mb-32">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-center w-full">Resources & Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "2024 AI Threat Report", type: "Whitepaper" },
            { title: "Adversarial Defense Toolkit", type: "Tool" },
            { title: "Biometric Security Case Study", type: "Case Study" },
            { title: "Securing LLMs in DevOps", type: "Article" }
          ].map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer hover:border-orange-500/20"
            >
              <div className="text-[10px] font-mono text-orange-500 mb-2 uppercase tracking-widest font-bold">{r.type}</div>
              <h4 className="font-bold text-white mb-6 leading-tight font-orbitron text-sm">{r.title}</h4>
              <NeonButton variant="outline" size="sm" className="w-full text-[10px] opacity-60 group-hover:opacity-100 group-hover:border-orange-500/30">
                Download <ArrowRight className="ml-2 h-3 w-3" />
              </NeonButton>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Spacer */}
      <div className="h-20"></div>

    </div>
  )
}
