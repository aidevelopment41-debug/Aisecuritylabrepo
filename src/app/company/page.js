"use client"

import { motion } from "framer-motion"
import { Users, Building2, Globe, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
    { label: "Prompts Analyzed", value: "2B+" },
    { label: "Enterprise Clients", value: "500+" },
    { label: "Threats Blocked", value: "15M+" },
    { label: "Uptime", value: "99.99%" },
]

export default function CompanyPage() {
    return (
        <div className="pt-24 min-h-screen bg-background text-foreground">

            {/* Hero */}
            <section className="container py-20 px-4 md:px-8 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
                        Securing the Future of <br />
                        Artificial Intelligence.
                    </h1>
                    <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                        We are a team of security researchers, ML engineers, and policy experts dedicated to making AI safe, reliable, and trustworthy for the enterprise.
                    </p>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="border-y border-white/5 bg-white/[0.02]">
                <div className="container py-16 px-4 md:px-8 max-w-screen-2xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((s, i) => (
                            <div key={i}>
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{s.value}</div>
                                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission / Culture */}
            <section className="container py-24 px-4 md:px-8 max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">Our Mission</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            As AI models become seamlessly integrated into critical infrastructure, the attack surface expands exponentially.
                            <br /><br />
                            Our mission is to provide the defensive layer that allows innovation to happen safely. We believe that trust is the currency of the AI era, and we deliver the technology to verify it.
                        </p>
                        <div className="pt-4">
                            <Button variant="outline" className="border-white/10">View Careers</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4 pt-8">
                            <div className="bg-white/[0.03] p-6 rounded-xl border border-white/5">
                                <Users className="h-8 w-8 text-blue-500 mb-4" />
                                <h3 className="font-bold mb-2">Expert Team</h3>
                                <p className="text-sm text-muted-foreground">Veterans from NSA, Google Brain, and CrowdStrike.</p>
                            </div>
                            <div className="bg-white/[0.03] p-6 rounded-xl border border-white/5">
                                <Globe className="h-8 w-8 text-purple-500 mb-4" />
                                <h3 className="font-bold mb-2">Global Scale</h3>
                                <p className="text-sm text-muted-foreground">Infrastructure deployed across 25 regions globally.</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white/[0.03] p-6 rounded-xl border border-white/5">
                                <Building2 className="h-8 w-8 text-orange-500 mb-4" />
                                <h3 className="font-bold mb-2">Enterprise First</h3>
                                <p className="text-sm text-muted-foreground">Built for SOC2, HIPAA, and GDPR compliance.</p>
                            </div>
                            <div className="bg-white/[0.03] p-6 rounded-xl border border-white/5">
                                <Award className="h-8 w-8 text-green-500 mb-4" />
                                <h3 className="font-bold mb-2">Award Winning</h3>
                                <p className="text-sm text-muted-foreground">Recognized as a Cool Vendor by Gartner in AI Security.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
