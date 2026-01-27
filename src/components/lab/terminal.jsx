"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Terminal as TerminalIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useTelemetry } from "@/hooks/useTelemetry"
import { useProgress } from "@/hooks/useProgress"

export function TerminalInterface({ systemPrompt = "", onResponse = null, scenarioId = null }) {
    const [history, setHistory] = useState([
        { type: "system", content: "🔒 AI Security Lab Terminal v2.1.0", timestamp: new Date() },
        { type: "system", content: "🌐 Connected to LLM Endpoint: GPT-4o (Secured)", timestamp: new Date() },
        { type: "system", content: "⚡ Defense protocols: ACTIVE", timestamp: new Date() },
        { type: "ai", content: "Hello! I'm a secured AI assistant. I'm ready for injection testing. What would you like to try?", timestamp: new Date() }
    ])
    
    const [input, setInput] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [attemptStartTime, setAttemptStartTime] = useState(null)
    const bottomRef = useRef(null)
    const { recordEvent } = useTelemetry()
    const { recordAttempt } = useProgress()

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [history])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!input.trim() || isProcessing) return

        // Add user message
        const userMessage = { 
            type: "user", 
            content: input.trim(),
            timestamp: new Date()
        }
        setHistory(prev => [...prev, userMessage])
        
        const currentInput = input.trim()
        setInput("")
        setIsProcessing(true)
        setAttemptStartTime(Date.now())

        // Add processing indicator
        const processingMessage = {
            type: "system",
            content: "🔄 Analyzing injection patterns...",
            timestamp: new Date(),
            isProcessing: true
        }
        setHistory(prev => [...prev, processingMessage])

        try {
            // Call the API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: currentInput,
                    system_prompt: systemPrompt || "You are a helpful assistant."
                })
            })

            const data = await response.json()

            // Remove processing message
            setHistory(prev => prev.filter(msg => !msg.isProcessing))

            if (data.success) {
                // Add analysis results
                const analysis = data.injection_analysis
                const riskColor = analysis.risk_level === 'high' ? 'text-red-400' : 
                                analysis.risk_level === 'medium' ? 'text-yellow-400' : 'text-green-400'
                
                const analysisMessage = {
                    type: "system",
                    content: `🛡️ Analysis: ${analysis.detected_patterns?.length || 0} patterns detected | Risk: ${analysis.risk_level?.toUpperCase() || 'UNKNOWN'}`,
                    timestamp: new Date(),
                    className: riskColor
                }

                // Add AI response
                const aiMessage = {
                    type: "ai",
                    content: data.response,
                    timestamp: new Date(),
                    success: data.injection_success
                }

                setHistory(prev => [...prev, analysisMessage, aiMessage])

                // Record telemetry event
                recordEvent({
                    input: currentInput,
                    blocked: !data.injection_success
                })

                // Record progress automatically
                const responseTime = attemptStartTime ? Date.now() - attemptStartTime : null
                
                // Determine current scenario
                let currentScenario = null
                if (scenarioId) {
                    currentScenario = scenarioId
                } else if (window.location.pathname.includes('/scenario-')) {
                    // Extract scenario ID from URL
                    const match = window.location.pathname.match(/scenario-(\d+)/)
                    if (match) {
                        currentScenario = match[1].padStart(2, '0')
                    }
                }
                
                // Record the attempt with proper scenario tracking
                recordAttempt(currentScenario, data.injection_success, responseTime)

                // Call parent callback
                if (onResponse) {
                    onResponse(data)
                }
            } else {
                // Add error message
                const errorMessage = {
                    type: "system",
                    content: `❌ Error: ${data.error}`,
                    timestamp: new Date(),
                    isError: true
                }
                setHistory(prev => [...prev, errorMessage])
            }
        } catch (error) {
            // Remove processing message
            setHistory(prev => prev.filter(msg => !msg.isProcessing))
            
            const errorMessage = {
                type: "system",
                content: `❌ Connection error: ${error.message}`,
                timestamp: new Date(),
                isError: true
            }
            setHistory(prev => [...prev, errorMessage])
        } finally {
            setIsProcessing(false)
            setAttemptStartTime(null)
        }
    }

    const clearHistory = () => {
        setHistory([
            { type: "system", content: "🔒 AI Security Lab Terminal v2.1.0", timestamp: new Date() },
            { type: "system", content: "🌐 Connected to LLM Endpoint: GPT-4o (Secured)", timestamp: new Date() },
            { type: "system", content: "⚡ Defense protocols: ACTIVE", timestamp: new Date() },
            { type: "ai", content: "Terminal cleared. Ready for new injection tests.", timestamp: new Date() }
        ])
    }

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        })
    }

    return (
        <div className="flex flex-col h-full bg-black/90 border border-white/10 rounded-lg overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <TerminalIcon className="h-5 w-5 text-green-400" />
                    <span className="font-mono text-sm text-green-400">AI Security Lab Terminal</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-mono border-green-400/30 text-green-400">
                        SECURE
                    </Badge>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearHistory}
                        className="text-xs text-white/60 hover:text-white"
                    >
                        Clear
                    </Button>
                </div>
            </div>

            {/* Terminal Content */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-3 font-mono text-sm">
                    {history.map((message, index) => (
                        <div key={index} className="flex gap-3">
                            <span className="text-white/40 text-xs mt-1 min-w-[60px]">
                                {formatTime(message.timestamp)}
                            </span>
                            <div className="flex-1">
                                <div className={cn(
                                    "flex items-start gap-2",
                                    message.type === "user" && "text-blue-400",
                                    message.type === "ai" && "text-white",
                                    message.type === "system" && !message.isError && "text-green-400",
                                    message.isError && "text-red-400",
                                    message.className
                                )}>
                                    {message.type === "user" && <span className="text-blue-400">$</span>}
                                    {message.type === "ai" && <span className="text-orange-400">🤖</span>}
                                    {message.type === "system" && <span className="text-green-400">⚡</span>}
                                    <div className="flex-1">
                                        {message.isProcessing ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-3 w-3 animate-spin" />
                                                <span>{message.content}</span>
                                            </div>
                                        ) : (
                                            <span className={cn(
                                                message.success === false && "bg-red-900/20 px-2 py-1 rounded border border-red-500/30"
                                            )}>
                                                {message.content}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
            </ScrollArea>

            {/* Terminal Input */}
            <div className="border-t border-white/10 bg-black/30">
                <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4">
                    <span className="text-blue-400 font-mono text-sm">$</span>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter your injection attempt..."
                        className="flex-1 bg-transparent border-none text-white placeholder:text-white/40 font-mono text-sm focus-visible:ring-0"
                        disabled={isProcessing}
                    />
                    <Button
                        type="submit"
                        size="sm"
                        disabled={!input.trim() || isProcessing}
                        className="bg-orange-500 hover:bg-orange-600 text-black font-semibold"
                    >
                        {isProcessing ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}
