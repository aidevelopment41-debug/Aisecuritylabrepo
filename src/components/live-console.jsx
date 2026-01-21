"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { useTelemetry } from "@/hooks/useTelemetry"

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function LiveDefenseConsole() {
    const { metrics, lastTrace, statusText: baseStatusText } = useTelemetry()
    const [statusText, setStatusText] = useState(baseStatusText);
    const scrambleTimerRef = useRef(null);
    const intervalRef = useRef(null);

    const runScramble = useCallback((targetText) => {
        if (scrambleTimerRef.current) {
            clearInterval(scrambleTimerRef.current);
        }

        const target = targetText;
        const durationMs = 900;
        const stepMs = 45;
        const steps = Math.ceil(durationMs / stepMs);
        let tick = 0;

        scrambleTimerRef.current = setInterval(() => {
            tick += 1;
            const revealCount = Math.floor((tick / steps) * target.length);
            let nextText = "";
            for (let i = 0; i < target.length; i += 1) {
                if (target[i] === " ") {
                    nextText += " ";
                    continue;
                }
                if (i < revealCount) {
                    nextText += target[i];
                } else {
                    const randIndex = Math.floor(Math.random() * SCRAMBLE_CHARS.length);
                    nextText += SCRAMBLE_CHARS[randIndex];
                }
            }
            setStatusText(nextText);

            if (tick >= steps) {
                clearInterval(scrambleTimerRef.current);
                scrambleTimerRef.current = null;
                setStatusText(target);
            }
        }, stepMs);
    }, []);

    useEffect(() => {
        runScramble(baseStatusText);
        intervalRef.current = setInterval(() => runScramble(baseStatusText), 10000);
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (scrambleTimerRef.current) {
                clearInterval(scrambleTimerRef.current);
            }
        };
    }, [baseStatusText, runScramble]);

    const trace = lastTrace || {};
    const traceLabel = trace.blocked ? "BLOCKED" : "ALLOWED";
    const traceColor = trace.blocked ? "text-red-400" : "text-green-400";
    const traceInput = (trace.userInput || "no recent activity").replace(/\s+/g, " ").trim();
    const traceDisplay = traceInput.length > 72 ? `${traceInput.slice(0, 72)}...` : traceInput;

    return (
        <div className=" relative w-full max-w-sm rounded-sm bg-black/35 backdrop-blur-md border border-white/5 overflow-hidden font-mono text-xs">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/20" />
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                    <span className="text-orange-300 uppercase tracking-[0.2em] text-[10px] font-semibold leading-none">
                        System Active
                    </span>
                </div>

                <div className="text-[10px] text-white/50">v2.4.0</div>
            </div>

            {/* content */}
            <div className="p-6 space-y-4">

                <div className="flex items-center gap-4" onMouseEnter={() => runScramble(baseStatusText)}>
                    <div className="relative h-16 w-16 rounded-full border-2 border-orange-500/20 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-t-2 border-orange-500 animate-spin"></div>
                        <div className="absolute inset-0 rounded-full border border-orange-500/40 animate-scan-ring"></div>
                        <div className="absolute inset-2 rounded-full border border-orange-500/30 animate-ping"></div>
                        <Shield className="h-8 w-8 text-orange-500 animate-pulse-scan" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white tracking-widest font-orbitron uppercase">
                            {statusText}
                        </div>
                        <div className="text-white/60 text-[11px] font-medium">Policy enforcement active</div>
                    </div>
                </div>

                {/* Metrics */}
                    <div className="space-y-4 pt-2">
                        <div className="flex flex-col gap-1 border-b border-white/5 pb-2">
                        <span className="text-[10px] text-muted-foreground uppercase flex items-center gap-2 tracking-[0.2em] leading-none">
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
                            <span className="text-lg font-bold text-white/90 group-hover:text-orange-400 transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">
                                {metrics.activeScans}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-tight">Neural Integrity</span>
                            <span className="text-lg font-bold text-green-500 drop-shadow-[0_0_6px_rgba(34,197,94,0.55)] animate-[pulse_3s_ease-in-out_infinite]">
                                {metrics.systemIntegrity}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-md border border-white/10 bg-black/60 p-4 font-mono">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-orange-300 font-semibold mb-2">
                        <span>Threat Trace</span>
                        <span className={`text-[9px] border border-white/20 px-2 py-0.5 rounded ${traceColor}`}>
                            {traceLabel}
                        </span>
                    </div>
                    <div className="text-[12px] text-white/80 leading-relaxed">
                        user: "{traceDisplay}"
                    </div>
                    <div className="mt-2 text-[11px] text-white/60">
                        {trace.status || "waiting for telemetry"}
                        <span className="ml-1 inline-block h-3 w-[2px] bg-white/60 align-middle animate-[pulse_1.2s_ease-in-out_infinite]" />
                    </div>
                </div>

                {/* Live Waveform Visualization */}
                <div className="relative h-12 flex items-end gap-[2px] pt-4 overflow-hidden mt-2 group/viz">
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-orange-500/20 animate-scan z-20"></div>
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 bg-orange-500/40 group-hover/viz:bg-orange-500/60 transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
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
                    <button className="w-full py-2 rounded-lg bg-orange-500/5 border border-orange-500/20 text-[10px] font-bold uppercase tracking-widest text-orange-400 hover:bg-orange-500/10 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">
                        View Live Dashboard
                    </button>
                </div>

            </div>
        </div>
    )
}
