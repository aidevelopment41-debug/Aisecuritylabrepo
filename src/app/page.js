"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, Activity, Lock, Eye, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { HeroBackground } from "@/components/hero-background"
import { LiveDefenseConsole } from "@/components/live-console"

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
  return (
    <div className="flex flex-col min-h-screen bg-[#020202] text-white pt-[80px] md:pt-[100px] relative overflow-hidden">

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
      <section className="relative z-10 container px-4 md:px-8 mx-auto max-w-screen-2xl mt-12 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, borderColor: "rgba(249, 115, 22, 0.3)" }}
              className="flex items-center gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group cursor-default hover:shadow-[0_0_20px_rgba(249,115,22,0.05)]"
            >
              <div className="h-10 w-10 rounded-lg bg-orange-500/5 border border-orange-500/10 flex items-center justify-center text-orange-500 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-all">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold font-orbitron text-sm tracking-tight">{f.title}</div>
                <div className="text-[10px] text-muted-foreground font-exo uppercase tracking-widest mt-0.5 opacity-70">{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services/Solutions Section */}
      <section className="relative z-10 container px-4 md:px-8 mx-auto max-w-screen-2xl mb-32">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-orange-500 font-mono text-xs tracking-widest mb-2 uppercase font-bold">Core Expertise</div>
            <h2 className="text-3xl md:text-5xl font-bold font-orbitron">Services & Solutions</h2>
          </div>
          <Link href="/services">
            <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-orange-500/10 hover:border-orange-500/50 hover:text-orange-400 transition-all shrink-0">
              Learn How AI Helps <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: "Automated Threat Detection", desc: "AI-driven identification of adversarial patterns and anomalies." },
            { icon: Zap, title: "Predictive Defense", desc: "Leveraging neural intelligence to anticipate and neutralize future threats." },
            { icon: Lock, title: "Model Hardening", desc: "Rigorous security assurance for large-scale AI infrastructure." }
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all hover:border-orange-500/30"
            >
              <div className="h-12 w-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:text-orange-400 group-hover:scale-110 transition-all">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-orbitron">{s.title}</h3>
              <p className="text-muted-foreground mb-6 font-exo text-sm leading-relaxed">{s.desc}</p>
              <div className="pt-2">
                <NeonButton variant="orange" size="sm" className="w-full justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  View Solution <ArrowRight className="h-4 w-4" />
                </NeonButton>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Research & Projects Section */}
      <section className="relative z-10 container px-4 md:px-8 mx-auto max-w-screen-2xl mb-32">
        <div className="mb-12">
          <div className="text-orange-500 font-mono text-xs tracking-widest mb-2 uppercase">Innovation Lab</div>
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron">Research & Projects</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { title: "IoT Security Lab", subtitle: "Edge Intelligence Defense", tags: ["IoT", "Security"], color: "from-blue-500 to-indigo-500" },
            { title: "Biometric AI", subtitle: "Secure Identity Verification", tags: ["Biometrics", "AI"], color: "from-green-500 to-teal-500" },
            { title: "Threat Detection", subtitle: "Adversarial Pattern Recognition", tags: ["Research", "Safety"], color: "from-orange-500 to-red-500" }
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black min-h-[280px] flex flex-col justify-end p-8"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
              <div className="relative z-10">
                <div className="flex gap-2 mb-3">
                  {p.tags.map(t => (
                    <span key={t} className="px-2 py-1 rounded text-[10px] font-mono bg-white/10 border border-white/10 uppercase tracking-wider">{t}</span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold font-orbitron mb-1 text-white">{p.title}</h3>
                <p className="text-white/70 font-exo mb-6 text-sm leading-relaxed">{p.subtitle}</p>
                <div className="pt-2">
                  <NeonButton variant="outline" size="sm" className="w-full justify-between group-hover:border-white/40 transition-all bg-black/50">
                    Explore Research <ArrowRight className="h-4 w-4" />
                  </NeonButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

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
            <Image
              src="/brain/89b74612-74fa-40a1-8bd9-ca4c04c47d71/ai_security_mission_visual_1767567359490.png"
              alt="AI Security Mission Visual"
              fill
              className="object-cover opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-105 duration-700"
            />
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
