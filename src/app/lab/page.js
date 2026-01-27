"use client"

import Link from "next/link"
import { Terminal } from "lucide-react"
import { LabInterface } from "@/components/lab/lab-interface"
import { NeonButton } from "@/components/neon-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LabPage() {
    return (
        <Card className="bg-black/40 border-white/10 shadow-[0_0_40px_rgba(249,115,22,0.08)]">
            <CardHeader className="border-b border-white/5 pb-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <Badge className="bg-orange-500/20 text-orange-200 border border-orange-400/40">
                            <Terminal className="h-3 w-3 mr-1" />
                            Free Play
                        </Badge>
                        <CardTitle className="text-xl md:text-2xl font-orbitron">
                            Interactive Lab Environment
                        </CardTitle>
                    </div>
                    <Link href="/tutorial">
                        <NeonButton variant="outline" size="sm" className="border-white/30 text-white">
                            Back to Tutorial
                        </NeonButton>
                    </Link>
                </div>
                <p className="text-base text-muted-foreground font-exo leading-relaxed">
                    Test your prompt injection skills in an open environment. Configure the AI system and try to bypass its security measures.
                </p>
            </CardHeader>
            <CardContent className="p-6">
                <LabInterface />
            </CardContent>
        </Card>
    )
}
