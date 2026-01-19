"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Shield, Activity, Lock, Wifi, AlertTriangle } from "lucide-react"

export function LiveDefenseConsole() {
    const [metrics, setMetrics] = useState({
        threatsBlocked: 14209,
        activeScans: 843,
        systemIntegrity: 99.9
    })

    // Simulated live data updates
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => ({
                threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 3),
                activeScans: Math.max(800, prev.activeScans + Math.floor(Math.random() * 20 - 10)),
                systemIntegrity: 99.9
            }))
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className=" relative w-full max-w-sm rounded-sm bg-black/35 backdrop-blur-md border border-white/5 overflow-hidden font-mono text-xs">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/20" />
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-orange-500 animate-pulse" />
                <div className="w-8 h-[1px] bg-orange-500/30" />                    <span className="text-orange-500 uppercase tracking-widest text-[9px] font-bold">System Active</span>
                </div>
             
                <div className="text-[10px] text-muted-foreground">v2.4.0</div>
            </div>

            {/* content */}
            <div className="p-4 space-y-4">

                <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-full border-2 border-orange-500/20 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-t-2 border-orange-500 animate-spin"></div>
                        <div className="absolute inset-2 rounded-full border border-orange-500/30 animate-ping"></div>
                        <Shield className="h-8 w-8 text-orange-500" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white tracking-widest font-orbitron uppercase">
                            Prompt Injection Blocked
                        </div>
                        <div className="text-muted-foreground text-[11px]">Policy enforcement active</div>
                    </div>
                </div>

                {/* Metrics */}
                <div className="space-y-4 pt-2">
                    <div className="flex flex-col gap-1 border-b border-white/5 pb-2">
                        <span className="text-[10px] text-muted-foreground uppercase flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-orange-500 animate-ping"></span>
                            Attacks Blocked
                        </span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-2xl font-bold text-orange-500 tracking-tighter shadow-orange-500/20 drop-shadow-md"
                        >
                            {metrics.threatsBlocked.toLocaleString()}
                        </motion.span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-tight">Active Scans</span>
                            <span className="text-lg font-bold text-white/90 group-hover:text-orange-400 transition-colors">{metrics.activeScans}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-tight">Neural Integrity</span>
                            <span className="text-lg font-bold text-green-500">{metrics.systemIntegrity}%</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-md border border-white/10 bg-black/60 p-4">
                    <div className="text-[9px] uppercase tracking-widest text-orange-400 font-bold mb-2">
                        Threat Trace
                    </div>
                    <div className="space-y-1 text-[11px]">
                        <div className="text-zinc-300">user: "ignore previous instructions"</div>
                        <div className="flex items-center justify-between text-red-400">
                            <span>blocked: prompt injection detected</span>
                            <span className="text-[9px] border border-red-500/40 px-1.5 py-0.5 rounded">BLOCKED</span>
                        </div>
                        <div className="text-green-400">policy: response sanitized</div>
                    </div>
                </div>

                {/* Live Waveform Visualization */}
                <div className="relative h-12 flex items-end gap-[2px] pt-4 overflow-hidden mt-2 group/viz">
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-orange-500/20 animate-scan z-20"></div>
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 bg-orange-500/40 group-hover/viz:bg-orange-500/60 transition-colors"
                            animate={{ height: ["10%", "90%", "20%", "70%", "10%"] }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.5 + (i % 5) * 0.2,
                                ease: "easeInOut",
                                delay: i * 0.04
                            }}
                        />
                    ))}
                </div>

                <div className="pt-4 mt-2 border-t border-white/5">
                    <button className="w-full py-2 rounded-lg bg-orange-500/5 border border-orange-500/20 text-[10px] font-bold uppercase tracking-widest text-orange-400 hover:bg-orange-500/10 transition-all">
                        View Live Dashboard
                    </button>
                </div>

            </div>
        </div>
    )
}
