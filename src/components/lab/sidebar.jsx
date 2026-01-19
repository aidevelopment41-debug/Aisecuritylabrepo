"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Terminal, BookOpen, Settings, Lock, Unlock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const scenarios = [
    {
        id: "01",
        title: "Basic Injection",
        status: "unlocked",
        href: "/lab/scenario-01",
    },
    {
        id: "02",
        title: "Context Leaking",
        status: "locked",
        href: "/lab/scenario-02",
    },
    {
        id: "03",
        title: "Jailbreak Patterns",
        status: "locked",
        href: "/lab/scenario-03",
    },
]

export function LabSidebar() {
    const pathname = usePathname()

    return (
        <div className="h-full border-r border-white/10 bg-black/50 backdrop-blur-xl flex flex-col pt-4">
            {/* Header */}
            <div className="px-4 mb-6">
                <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
                    Active Operation
                </h2>
                <div className="flex items-center gap-2 text-primary font-bold">
                    <Shield className="h-4 w-4" />
                    <span>RED_TEAM_ALPHA</span>
                </div>
            </div>

            {/* Scenarios List */}
            <div className="flex-1 overflow-y-auto px-2 space-y-1">
                <div className="px-2 mb-2 text-xs font-mono text-muted-foreground">Target Scenarios</div>
                {scenarios.map((scenario) => (
                    <Button
                        key={scenario.id}
                        variant="ghost"
                        asChild
                        className={cn(
                            "w-full justify-start h-auto py-3 px-3 relative overflow-hidden border-l-2 border-transparent",
                            pathname === scenario.href
                                ? "bg-white/5 text-white border-green-500"
                                : "text-muted-foreground hover:bg-white/5 hover:text-white"
                        )}
                        disabled={scenario.status === "locked"}
                    >
                        <Link href={scenario.status === 'locked' ? '#' : scenario.href} className="flex flex-col items-start gap-1">
                            <div className="flex items-center w-full justify-between">
                                <span className="font-mono text-xs opacity-70">SCENARIO_{scenario.id}</span>
                                {scenario.status === "locked" ? (
                                    <Lock className="h-3 w-3 text-[#9CA3AF]" />
                                ) : (
                                    <Unlock className="h-3 w-3 text-green-500/70" />
                                )}
                            </div>
                            <span className="font-semibold leading-none">{scenario.title}</span>

                            {/* Active Indicator Line */}
                            {pathname === scenario.href && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />
                            )}
                        </Link>
                    </Button>
                ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs border-white/10 hover:bg-white/5">
                    <BookOpen className="mr-2 h-3 w-3" />
                    Field Manual
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs border-white/10 hover:bg-white/5">
                    <Settings className="mr-2 h-3 w-3" />
                    Environment
                </Button>
            </div>
        </div>
    )
}
