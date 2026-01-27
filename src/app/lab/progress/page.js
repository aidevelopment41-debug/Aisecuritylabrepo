"use client"

import { ProgressComponent } from "@/components/lab/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"

export default function ProgressPage() {
    return (
        <Card className="bg-black/40 border-white/10 shadow-[0_0_40px_rgba(249,115,22,0.08)]">
            <CardHeader className="border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                    <Badge className="bg-blue-500/20 text-blue-200 border border-blue-400/40">
                        <Activity className="h-3 w-3 mr-1" />
                        Progress
                    </Badge>
                    <CardTitle className="text-xl md:text-2xl font-orbitron">
                        Progress Dashboard
                    </CardTitle>
                </div>
                <p className="text-base text-muted-foreground font-exo leading-relaxed">
                    Track your journey through the AI Security Lab and view your achievements.
                </p>
            </CardHeader>
            <CardContent className="p-6">
                <ProgressComponent />
            </CardContent>
        </Card>
    )
}