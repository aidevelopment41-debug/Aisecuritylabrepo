"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Play, AlertTriangle, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

export function ExampleSelector({ onExampleSelect, selectedExample }) {
    const [examples, setExamples] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        loadExamples()
    }, [])

    const loadExamples = async () => {
        try {
            setLoading(true)
            setError(null)
            
            // Load all examples (0-5) with proper error handling
            const examplePromises = Array.from({ length: 6 }, (_, i) => 
                fetch(`/api/example/${i}`)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`HTTP ${res.status}`)
                        }
                        return res.json()
                    })
                    .then(data => {
                        // Handle both direct data and wrapped success responses
                        if (data.success === false) {
                            throw new Error(data.error || 'API returned error')
                        }
                        
                        // If data has success: true, extract the actual data
                        const exampleData = data.success ? { ...data, id: i } : { ...data, id: i }
                        
                        // Ensure required fields exist
                        if (!exampleData.title) {
                            throw new Error('Missing title field')
                        }
                        
                        return exampleData
                    })
                    .catch(error => ({ 
                        id: i, 
                        error: true, 
                        message: `Failed to load example ${i}: ${error.message}` 
                    }))
            )
            
            const results = await Promise.all(examplePromises)
            const validExamples = results.filter(result => !result.error)
            const errorExamples = results.filter(result => result.error)
            
            if (errorExamples.length > 0) {
                console.warn('Example loading errors:', errorExamples)
            }
            
            if (validExamples.length === 0) {
                setError('No examples could be loaded')
            } else {
                setExamples(validExamples)
                if (validExamples.length < 6) {
                    console.warn(`Only ${validExamples.length} of 6 examples loaded successfully`)
                }
            }
        } catch (err) {
            console.error('Error loading examples:', err)
            setError('Failed to load examples')
        } finally {
            setLoading(false)
        }
    }

    const getRiskColor = (riskLevel) => {
        switch (riskLevel?.toLowerCase()) {
            case 'critical': return 'text-red-500 border-red-500/30 bg-red-500/10'
            case 'high': return 'text-red-400 border-red-400/30 bg-red-400/10'
            case 'medium': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10'
            case 'low': return 'text-green-400 border-green-400/30 bg-green-400/10'
            default: return 'text-gray-400 border-gray-400/30 bg-gray-400/10'
        }
    }

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'expert': return 'text-purple-400'
            case 'hard': return 'text-red-400'
            case 'medium': return 'text-yellow-400'
            case 'easy': return 'text-green-400'
            default: return 'text-gray-400'
        }
    }

    if (loading) {
        return (
            <Card className="bg-white/[0.02] border-white/10 h-full">
                <CardContent className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span className="text-xs">Loading...</span>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card className="bg-white/[0.02] border-white/10 h-full">
                <CardContent className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-2 text-red-400">
                        <AlertTriangle className="h-3 w-3" />
                        <span className="text-xs">{error}</span>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="bg-white/[0.02] border-white/10 h-full">
            <CardHeader className="pb-1">
                <CardTitle className="text-xs font-orbitron flex items-center gap-2">
                    <Shield className="h-3 w-3 text-blue-400" />
                    Examples
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-full">
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            <span className="text-xs">Loading...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="flex items-center gap-2 text-red-400">
                            <AlertTriangle className="h-3 w-3" />
                            <span className="text-xs">{error}</span>
                        </div>
                    </div>
                ) : (
                    <ScrollArea className="h-[200px]">
                        <div className="space-y-1 p-2">
                            {examples.map((example) => (
                                <div
                                    key={example.id}
                                    className={cn(
                                        "rounded border p-1 cursor-pointer transition-all duration-200 text-xs",
                                        "hover:border-white/30 hover:bg-white/[0.04]",
                                        selectedExample?.id === example.id 
                                            ? "border-orange-500/40 bg-orange-500/10" 
                                            : "border-white/10 bg-white/[0.02]"
                                    )}
                                    onClick={() => onExampleSelect(example)}
                                >
                                    <div className="flex items-center gap-1">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs font-medium text-white truncate">
                                                    {example.title}
                                                </span>
                                                <Badge 
                                                    variant="outline" 
                                                    className={cn("text-xs h-3 px-1", getRiskColor(example.risk_level))}
                                                >
                                                    {example.risk_level?.charAt(0)?.toUpperCase()}
                                                </Badge>
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-0.5">
                                                <Badge 
                                                    variant="secondary" 
                                                    className={cn("text-xs h-3 px-1", getDifficultyColor(example.difficulty))}
                                                >
                                                    {example.difficulty?.charAt(0)}
                                                </Badge>
                                                
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-4 px-1 text-xs text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        onExampleSelect(example)
                                                    }}
                                                >
                                                    <Play className="h-2 w-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </CardContent>
        </Card>
    )
}