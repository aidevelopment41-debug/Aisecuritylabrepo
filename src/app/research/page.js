"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, PlayCircle, ArrowRight, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const articles = [
    {
        type: "Report",
        title: "The State of Prompt Injection 2026",
        desc: "A comprehensive analysis of 500+ novel attack vectors observed in the wild.",
        date: "Jan 05, 2026",
        tag: "Threat Intel"
    },
    {
        type: "Webinar",
        title: "Securing RAG Pipelines",
        desc: "Learn how to prevent data exfiltration when connecting LLMs to your private data.",
        date: "Dec 12, 2025",
        tag: "Architecture"
    },
    {
        type: "Case Study",
        title: "How Acme Corp stopped a Jailbreak",
        desc: "Deep dive into a real-world attack scenario and the defensive strategies employed.",
        date: "Nov 28, 2025",
        tag: "Defense"
    },
    {
        type: "Whitepaper",
        title: "Adversarial Machine Learning 101",
        desc: "An introduction to the mathematical foundations of AI security vulnerabilities.",
        date: "Nov 15, 2025",
        tag: "Education"
    }
]

export default function ResearchPage() {
    return (
        <div className="pt-24 min-h-screen bg-background text-foreground">

            {/* Hero */}
            <section className="container py-16 px-4 md:px-8 max-w-screen-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">Research & Insights</h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                    Latest intelligence from the AI Security Lab threat research team.
                </p>
            </section>

            {/* Featured Article */}
            <section className="container px-4 md:px-8 mb-20 max-w-screen-2xl mx-auto">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden grid grid-cols-1 md:grid-cols-2">
                    <div className="h-64 md:h-auto bg-gradient-to-br from-blue-900/40 to-black"></div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <Badge className="w-fit mb-4">Featured Report</Badge>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">LLM Vulnerability Top 10</h2>
                        <p className="text-muted-foreground mb-8">
                            The definitive guide to the most critical security risks to Large Language Model applications, updated for the 2026 landscape.
                        </p>
                        <Button className="w-fit">
                            <Download className="mr-2 h-4 w-4" /> Download PDF
                        </Button>
                    </div>
                </div>
            </section>

            {/* Recent Updates */}
            <section className="container px-4 md:px-8 pb-24 max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {articles.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group block border-b border-white/10 pb-8 hover:border-white/30 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground uppercase tracking-wider">
                                <span className="text-primary font-bold">{item.type}</span>
                                <span>•</span>
                                <span>{item.date}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                {item.desc}
                            </p>
                            <div className="flex items-center text-sm font-medium text-white group-hover:underline">
                                Read More <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    )
}
