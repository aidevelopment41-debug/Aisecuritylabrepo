"use client"

import Link from "next/link"
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck, Activity, Lock, Target, Timer, Layers } from "lucide-react"
import { motion, useScroll, useSpring } from "framer-motion";
import HeroBackground from "@/components/hero-background"
import { LiveDefenseConsole } from "@/components/live-console"
import SecurityFeatures from "@/components/feature"
import ServicesSection from "@/components/securityes"
import InnovationLab from "@/components/projects";
import { NeonButton } from "@/components/neon-button"
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

const heroStats = [
  {
    label: "Attack scenarios",
    value: "120+",
    note: "Coverage across prompt, RAG, and tool abuse",
    icon: Target,
  },
  {
    label: "Median hardening",
    value: "36 hrs",
    note: "From first drill to patched release",
    icon: Timer,
  },
  {
    label: "Attack-class coverage",
    value: "98%",
    note: "Mapped to the latest LLM threat taxonomy",
    icon: Layers,
  },
]

const heroChecks = [
  { icon: ShieldCheck, text: "Prompt injection coverage across chat, RAG, and agents." },
  { icon: Activity, text: "Live telemetry for intent, leakage, and tool misuse." },
  { icon: Lock, text: "Audit-ready reports in minutes for governance, risk, and compliance." },
]

const complianceBadges = ["SOC2", "ISO 27001", "HIPAA-ready"];

export default function Home() {
const containerRef = useRef(null);
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);



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
      className="flex flex-col min-h-screen bg-[#000000] text-white pt-[124px] md:pt-[124px] pb-24 relative overflow-hidden"
    >
      <div className="fixed left-6 top-1/2 -translate-y-1/2 h-64 w-[1px] bg-zinc-800 hidden lg:block">
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
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-center min-h-[70vh] lg:min-h-[60vh] py-16 md:py-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start text-left relative lg:self-center"
          >
            <div className="absolute -left-16 -top-10 h-[320px] w-[320px] rounded-full bg-orange-500/10 blur-[140px] -z-10 pointer-events-none" />
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.3em] text-orange-400"
            >
              Lab Status: Ready
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-[-0.05em] mb-6 leading-[1.05] font-exo relative z-10"
            >
              <span className="absolute -z-10 left-0 top-1/2 -translate-y-1/2 h-[120%] w-[120%] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.85),transparent_70%)]" />
              Secure your LLM apps
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 font-black"
                style={{ textShadow: "0 0 20px rgba(255, 107, 0, 0.3)" }}
              >
                {" "}before they ship.
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-base md:text-lg text-white/80 mb-8 max-w-[65ch] font-sans font-semibold leading-relaxed"
            >
              Reduce LLM vulnerability by 90% before deployment. Automate prompt injection
              drills, harden agent permissions, and deliver audit-ready reports in minutes
              for governance, risk, and compliance teams.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link href="/lab">
                <NeonButton
                  variant="orange"
                  size="lg"
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#FF6B00] text-black border-transparent shadow-[0_0_18px_rgba(255,107,0,0.35)] hover:brightness-110 hover:text-black hover:shadow-[0_0_22px_rgba(255,107,0,0.5)] transition-[filter,box-shadow,color,background,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-sans font-semibold tracking-normal px-6 py-2.5 rounded-lg"
                >
                  Try the Lab
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NeonButton>
              </Link>
              <Link href="/platform">
                <NeonButton
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white/80 bg-transparent hover:text-white transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-sans font-semibold tracking-normal px-6 py-2.5 rounded-lg"
                >
                  See How It Works
                </NeonButton>
              </Link>
            </motion.div>

            <motion.div variants={item} className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 shadow-2xl">
              {heroStats.map((stat) => {
                const StatIcon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-[#0D0D0D] border border-white/10 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-2xl font-bold text-white font-orbitron">{stat.value}</div>
                        <div className="text-[11px] text-white/70 uppercase tracking-[0.2em] font-mono mt-2 font-semibold">
                          {stat.label}
                        </div>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center">
                        <StatIcon className="h-5 w-5 text-orange-400/80" />
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-white/70 font-medium leading-relaxed">
                      {stat.note}
                    </p>
                  </div>
                )
              })}
            </motion.div>

            <motion.div variants={item} className="mt-8 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {heroChecks.map((check) => (
                  <div key={check.text} className="flex items-start gap-3 text-sm text-white/80 font-medium">
                    <check.icon className="h-4 w-4 text-orange-400 mt-1" />
                    <span>{check.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm opacity-90 lg:translate-x-4">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10 blur-2xl" />
              <div className="relative">
                <div className="sm:hidden rounded-2xl border border-white/10 bg-black/50 p-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-300">
                    System Active
                  </div>
                  <div className="mt-3 text-sm text-white/80 font-medium">
                    Threat Trace: "ignore previous instructions"
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-orange-200">
                    Prompt blocked
                  </div>
                </div>
                <div className="hidden sm:block">
                  <LiveDefenseConsole />
                  <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span>Telemetry: Live</span>
                    <span>Latency: 9ms</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {complianceBadges.map((badge) => (
                      <span
                        key={badge}
                        className="px-2 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-mono uppercase tracking-[0.2em] text-white/60"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.18),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_40%,rgba(14,14,14,0.9)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-28 w-28 rounded-full border border-orange-500/40 animate-pulse-scan" />
              <div className="absolute h-44 w-44 rounded-full border border-orange-500/20 animate-scan-ring" />
            </div>
            <div className="absolute left-6 top-6 rounded-xl border border-white/10 bg-black/60 px-4 py-3">
              <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-orange-400">Active Nodes</div>
              <div className="text-2xl font-orbitron text-white">142</div>
            </div>
            <div className="absolute right-6 bottom-6 rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-right">
              <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-orange-400">Threat Index</div>
              <div className="text-2xl font-orbitron text-white">98%</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
      </section>

      {/* Resources & Insights Section */}
      <section className="relative z-10 container px-4 md:px-8 mx-auto max-w-screen-2xl mb-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="text-orange-500 font-mono text-xs tracking-[0.3em] uppercase">Resources</div>
            <h2 className="text-3xl md:text-5xl font-bold font-orbitron">Resources & Insights</h2>
            <p className="text-muted-foreground max-w-2xl">
              Reports, toolkits, and briefing notes used by security teams to ship safer AI products.
            </p>
          </div>
          <Link href="/research">
            <NeonButton variant="outline" size="sm" className="border-white/30 text-white">
              Explore Research
              <ArrowRight className="ml-2 h-3 w-3" />
            </NeonButton>
          </Link>
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
              className="group p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-orange-500/20 flex flex-col"
            >
              <div className="text-[10px] font-mono text-orange-500 mb-2 uppercase tracking-widest font-bold">{r.type}</div>
              <h4 className="font-bold text-white mb-6 leading-tight font-orbitron text-sm">{r.title}</h4>
              <NeonButton variant="outline" size="sm" className="w-full text-[10px] opacity-60 group-hover:opacity-100 group-hover:border-orange-500/30 mt-auto">
                Download <ArrowRight className="ml-2 h-3 w-3" />
              </NeonButton>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Spacer */}
      <div className="h-20 mb-10"></div>

    </div>
  )
}
