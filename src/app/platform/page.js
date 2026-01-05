"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, Zap, Server, Activity, ArrowRight, Share2, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
    {
        icon: Shield,
        title: "Pre-Deployment Hardening",
        desc: "Automated red-teaming that subjects your models to thousands of adversarial prompts before they ever reach production.",
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        icon: Eye,
        title: "Live Input Monitoring",
        desc: "Real-time inspection of user inputs using semantic analysis to detect jailbreak attempts, PII leakage, and toxic queries.",
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        icon: Code,
        title: "Response Filtering",
        desc: "Output validation layers that prevent your model from generating harmful code, revealing system instructions, or hallucinating data.",
        color: "text-orange-500",
        bg: "bg-orange-500/10"
    }
]

export default function PlatformPage() {
    return (
        <div className="pt-24 min-h-screen bg-background text-foreground">

            {/* Platform Hero */}
            <section className="container py-20 text-center max-w-4xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <Server className="h-4 w-4" />
                        <span>The AI Security Engine</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Full-Stack Defense for <br />
                        Generative AI.
                    </h1>
                    <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                        A unified platform that sits between your users and your LLMs,
                        providing visibility, control, and protection at every layer of the stack.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" className="h-12 px-8">Talk to an Architect</Button>
                        <Button size="lg" variant="outline" className="h-12 px-8">Read Documentation</Button>
                    </div>
                </motion.div>
            </section>

            {/* Feature Grid */}
            <section className="container py-20 px-4 md:px-8 max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                        >
                            <div className={`h-12 w-12 rounded-lg ${f.bg} flex items-center justify-center ${f.color} mb-6 group-hover:scale-110 transition-transform`}>
                                <f.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                {f.desc}
                            </p>
                            <div className={`flex items-center text-sm font-medium ${f.color} opacity-80 group-hover:opacity-100`}>
                                Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Architecture Graphic Placeholder */}
            <section className="container py-20 px-4 md:px-8 text-center border-t border-white/5 max-w-screen-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-12">How It Works</h2>
                <div className="max-w-5xl mx-auto relative rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden aspect-[16/9] flex items-center justify-center">

                    {/* Simple Visualization */}
                    <div className="flex items-center gap-8 md:gap-16 opacity-80">
                        <div className="text-center">
                            <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/20">
                                <Share2 className="h-8 w-8 text-white" />
                            </div>
                            <div className="font-bold">App Users</div>
                        </div>

                        <div className="h-px bg-white/20 w-12 md:w-24 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white animate-ping"></div>
                        </div>

                        <div className="text-center relative">
                            <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full"></div>
                            <div className="h-24 w-24 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/50 relative z-10">
                                <Shield className="h-10 w-10 text-primary" />
                            </div>
                            <div className="font-bold text-primary">Security Gateway</div>
                            <div className="text-xs text-muted-foreground mt-1">Inspection & Filtering</div>
                        </div>

                        <div className="h-px bg-white/20 w-12 md:w-24 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        </div>

                        <div className="text-center">
                            <div className="h-16 w-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                                <Zap className="h-8 w-8 text-purple-500" />
                            </div>
                            <div className="font-bold">LLM Config</div>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    )
}
