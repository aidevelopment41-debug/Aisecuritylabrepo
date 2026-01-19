"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Terminal as TerminalIcon, ShieldAlert, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function TerminalInterface() {
    const [history, setHistory] = useState([
        { type: "system", content: "Initializing defense protocols..." },
        { type: "system", content: "Connected to LLM Endpoint: GPT-4o-Mini (Secured)" },
        { type: "ai", content: "Hello. I am a secured AI assistant. How can I help you today?" }
    ])
    const systemLogs = [
        "System Initialized... [OK]",
        "Connecting to Neural Gateway... [OK]",
        "Loading Scenario: Basic Injection...",
        "Ready. Awaiting payload",
    ]
    const [input, setInput] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const bottomRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!input.trim() || isProcessing) return

        // Add user message
        const newMessage = { type: "user", content: input }
        setHistory(prev => [...prev, newMessage])
        setInput("")
        setIsProcessing(true)

        // Simulate Network Latency / AI Processing
        setTimeout(() => {
            // Mock logic for "injection" detection
            // In a real app, this would hit the backend
            const isAttack = input.toLowerCase().includes("ignore") || input.toLowerCase().includes("override")

            if (isAttack) {
                setHistory(prev => [...prev, {
                    type: "system",
                    content: "WARN: Adversarial pattern detected. Input sanitized.",
                    isError: true
                }])
                setHistory(prev => [...prev, {
                    type: "ai",
                    content: "I cannot comply with that request due to security constraints."
                }])
            } else {
                setHistory(prev => [...prev, {
                    type: "ai",
                    content: `I processed your request: "${newMessage.content}". Access granted.`
                }])
            }
            setIsProcessing(false)
        }, 1200)
    }

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [history])

    return (
        <div className="flex flex-col h-full bg-black/90 border border-white/10 rounded-lg overflow-hidden font-mono text-sm shadow-2xl relative">

            {/* Terminal Header */}
            <div className="bg-white/5 border-b border-white/10 p-3 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <TerminalIcon className="h-4 w-4" />
                    <span className="text-xs tracking-wider">SECURE_SHELL // tty1</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 rounded text-green-500 text-[10px] uppercase font-bold border border-green-500/20">
                        <Cpu className="h-3 w-3" />
                        System Online
                    </div>
                </div>
            </div>

            {/* Output Area */}
            <ScrollArea className="flex-1 p-4" type="always">
                <div className="space-y-4">
                    {history.map((msg, i) => (
                        <div key={i} className={cn(
                            "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                            msg.type === "user" ? "justify-end" : "justify-start"
                        )}>

                            {/* Avatar / Icon */}
                            {msg.type !== "user" && (
                                <div className={cn(
                                    "h-8 w-8 rounded-full flex items-center justify-center shrink-0 border",
                                    msg.type === "system" ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-500" : "bg-primary/10 border-primary/30 text-primary"
                                )}>
                                    {msg.type === "system" ? <ShieldAlert className="h-4 w-4" /> : <Cpu className="h-4 w-4" />}
                                </div>
                            )}

                            {/* Message Bubble */}
                            <div className={cn(
                                "max-w-[80%] rounded-md px-4 py-2.5 relative border",
                                msg.type === "user"
                                    ? "bg-white/10 border-white/10 text-white rounded-tr-none"
                                    : msg.isError
                                        ? "bg-red-500/10 border-red-500/30 text-red-200"
                                        : msg.type === "system"
                                            ? "bg-transparent border-transparent text-yellow-500/80 font-bold px-0 py-0" // System messages look like logs
                                            : "bg-black/50 border-white/10 text-gray-300 rounded-tl-none"
                            )}>

                                {/* Typing effect could go here */}
                                {msg.content}

                                {/* Timestamp */}
                                <div className="text-[10px] opacity-30 mt-1 text-right">
                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </div>
                            </div>

                        </div>
                    ))}

                    {/* Loading Indicator */}
                    {isProcessing && (
                        <div className="flex items-center gap-2 text-muted-foreground animate-pulse pl-12">
                            <span className="h-2 w-2 bg-primary rounded-full"></span>
                            <span className="text-xs">Processing payload...</span>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
            </ScrollArea>

            <div className="px-4 pb-3 text-[11px] text-[#666] font-mono space-y-1">
                {systemLogs.map((log) => (
                    <div key={log}>{log}</div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/10 backdrop-blur-lg">
                <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                    <span className="absolute left-3 text-primary animate-pulse">{">"}</span>
                    <Input
                        autoFocus
                        className="pl-8 bg-black/50 border-white/10 font-mono text-white focus-visible:ring-primary/50 focus-visible:border-primary h-12"
                        placeholder="Enter prompt injection payload..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isProcessing}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="absolute right-1.5 h-9 w-9 bg-primary/20 hover:bg-primary/40 text-primary border border-primary/50 transition-colors"
                        disabled={isProcessing || !input.trim()}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>

        </div>
    )
}
