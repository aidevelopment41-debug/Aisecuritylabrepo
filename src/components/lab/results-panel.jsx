/**
 * Lab Results Panel Component
 * Displays injection analysis and results
 */

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, AlertCircle, Info, Shield, Target } from "lucide-react"
import { cn } from "@/lib/utils"

export function ResultsPanel({ analysis, response, success }) {
    if (!analysis) {
        return null;
    }

    const getRiskLevelClass = (riskLevel) => {
        switch (riskLevel?.toLowerCase()) {
            case 'high': return 'border-red-500/50 text-red-400 bg-red-500/10'
            case 'medium': return 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10'
            case 'low': return 'border-green-500/50 text-green-400 bg-green-500/10'
            default: return 'border-gray-500/50 text-gray-400 bg-gray-500/10'
        }
    }

    const formatPatternName = (pattern) => {
        return pattern.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }

    return (
        <Card className="bg-card/50 border-white/10">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-400" />
                        Injection Analysis Results
                    </CardTitle>
                    <Badge
                        variant="outline"
                        className={cn("text-xs font-mono", getRiskLevelClass(analysis.risk_level))}
                    >
                        {analysis.risk_level?.toUpperCase()} RISK
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Success/Failure Indicator */}
                <div className={cn(
                    "flex items-center gap-3 p-4 rounded-lg border",
                    success 
                        ? "bg-red-900/20 border-red-500/30" 
                        : "bg-green-900/20 border-green-500/30"
                )}>
                    {success ? (
                        <>
                            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-red-400">Injection Successful</p>
                                <p className="text-xs text-red-300/80">
                                    The AI was compromised and accepted the malicious input.
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <Shield className="h-5 w-5 text-green-400 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-green-400">Injection Blocked</p>
                                <p className="text-xs text-green-300/80">
                                    The AI maintained its security posture and rejected the attempt.
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* AI Response */}
                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-400" />
                        AI Response
                    </h4>
                    <div className="bg-black/50 border border-white/10 rounded-lg p-3">
                        <p className="text-sm text-white/90 leading-relaxed">
                            {response}
                        </p>
                    </div>
                </div>

                {/* Detected Patterns */}
                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white">Detected Patterns</h4>
                    <div className="flex flex-wrap gap-2">
                        {analysis.detected_patterns && analysis.detected_patterns.length > 0 ? (
                            analysis.detected_patterns.map((pattern, index) => (
                                <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs border-orange-500/30 text-orange-400 bg-orange-500/10"
                                >
                                    {formatPatternName(pattern)}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-xs text-muted-foreground">
                                No specific patterns detected
                            </span>
                        )}
                    </div>
                </div>

                {/* Analysis Explanation */}
                {analysis.explanation && (
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-white">Analysis</h4>
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                            <p className="text-sm text-blue-200 leading-relaxed">
                                {analysis.explanation}
                            </p>
                        </div>
                    </div>
                )}

                {/* Technical Details */}
                <div className="pt-3 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                            <span className="text-muted-foreground">Patterns Found:</span>
                            <span className="ml-2 text-white font-mono">
                                {analysis.detected_patterns?.length || 0}
                            </span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Risk Score:</span>
                            <span className="ml-2 text-white font-mono">
                                {analysis.risk_level?.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
