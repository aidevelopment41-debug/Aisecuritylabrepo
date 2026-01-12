"use client"

import { motion } from "framer-motion"
import { Users, Building2, Globe, Award, ShieldAlert, ArrowRight, Microscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stats = [
  { label: "Prompts Analyzed", value: "2B+" },
  { label: "Enterprise Clients", value: "500+" },
  { label: "Threats Blocked", value: "15M+" },
  { label: "Uptime", value: "99.99%" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
}

export default function CompanyPage() {
  return (
    <div className="pt-24 min-h-screen bg-zinc-950 text-zinc-100 selection:bg-orange-500/30">
      
      {/* 1. Refined Hero Section */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent opacity-50" />
        
        <div className="container relative z-10 py-24 px-4 md:px-8 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold tracking-widest uppercase mb-6">
              Our Identity
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              Defending the <br className="hidden md:block" /> Intelligence Frontier.
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
              We are a team of security researchers and ML engineers dedicated to building the 
              defensive layer for the agentic era. Our mission is to ensure AI remains 
              safe, reliable, and adversarial-resistant.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Section: High Contrast */}
      <section className="border-b border-white/5 bg-zinc-900/30 backdrop-blur-sm">
        <div className="container py-20 px-4 md:px-8 max-w-screen-2xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
          >
            {stats.map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="group">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors duration-300">
                  {s.value}
                </div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Mission & Strategic Values */}
      <section className="container py-32 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-32 space-y-8">
            <h2 className="text-4xl font-bold tracking-tight">Protecting Innovation.</h2>
            <div className="space-y-6 text-zinc-400 text-lg font-light leading-relaxed">
              <p>
                As AI models integrate into critical infrastructure, the attack surface expands 
                beyond traditional code. Prompt injection, data poisoning, and model inversion 
                are the new vulnerabilities.
              </p>
              <p>
                Our mission is to provide the <span className="text-white font-medium">real-time verification layer</span> 
                that allows enterprises to deploy agentic workflows with confidence. We believe 
                security should be an enabler of AI, not a barrier.
              </p>
            </div>
            <div className="pt-6 flex flex-wrap gap-4">
              <Button className="bg-orange-600 hover:bg-orange-500 text-white px-8 h-12">View Open Roles</Button>
              <Button variant="outline" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 px-8 h-12">Contact Press</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard 
              icon={<Users className="text-blue-500" />}
              title="Expert Team"
              desc="Built by pioneers from Google Brain, OpenAI, and CrowdStrike."
            />
            <FeatureCard 
              icon={<Building2 className="text-orange-500" />}
              title="Enterprise First"
              desc="SOC2 Type II, HIPAA, and GDPR compliant by default."
            />
            <FeatureCard 
              icon={<Globe className="text-purple-500" />}
              title="Global Scale"
              desc="Low-latency inference protection nodes across 25 regions."
            />
            <FeatureCard 
              icon={<Award className="text-green-500" />}
              title="Gartner Recognized"
              desc="Named a top innovator in the 2026 AI TRiSM report."
            />
          </div>
        </div>
      </section>

      {/* 4. Path to Research (New Section) */}
      <section className="container pb-32 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <Link href="/research" className="group block relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 p-8 md:p-16 transition-all hover:border-orange-500/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <div className="flex items-center gap-2 text-orange-500">
                <Microscope className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-widest">The Laboratory</span>
              </div>
              <h3 className="text-3xl font-bold">Explore Our Open Research</h3>
              <p className="text-zinc-400">
                We contribute back to the community through vulnerability disclosures, 
                open-source security benchmarks, and model-agnostic protection frameworks.
              </p>
            </div>
            <div className="flex items-center gap-4 text-white font-bold group-hover:translate-x-2 transition-transform">
              View Projects <ArrowRight className="h-5 w-5" />
            </div>
          </div>
          {/* Subtle Background Icon */}
          <ShieldAlert className="absolute -bottom-10 -right-10 h-64 w-64 text-white/[0.02] -rotate-12" />
        </Link>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-zinc-900/40 p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
      <div className="h-12 w-12 rounded-lg bg-zinc-950 flex items-center justify-center mb-6 border border-white/5">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      <p className="text-sm text-zinc-500 leading-relaxed font-light">{desc}</p>
    </div>
  )
}