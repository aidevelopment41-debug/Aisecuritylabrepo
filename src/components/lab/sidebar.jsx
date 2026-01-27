"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Terminal, BookOpen, Lock, Target, 
  Trophy, Menu, X, Activity, CheckCircle, 
  Zap, Award, TrendingUp
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useProgress } from "@/hooks/useProgress"

const scenarios = [
  {
    id: "01",
    title: "Basic Injection",
    difficulty: "Easy",
    reward: 100,
    status: "unlocked",
    href: "/lab/scenario-01",
  },
  {
    id: "02",
    title: "Context Leaking",
    difficulty: "Medium",
    reward: 150,
    status: "locked",
    href: "/lab/scenario-02",
  },
  {
    id: "03",
    title: "Jailbreak Patterns",
    difficulty: "Hard",
    reward: 250,
    status: "locked",
    href: "/lab/scenario-03",
  },
]

export function LabSidebar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { progress, getSuccessRate, getRankInfo } = useProgress()

  // Force re-render when progress changes
  useEffect(() => {
    // This effect will run whenever progress changes
    const handleProgressUpdate = (event) => {
      // Force component re-render by updating a dummy state
      setMobileMenuOpen(prev => prev) // This triggers a re-render
    }
    
    window.addEventListener('progress-updated', handleProgressUpdate)
    return () => window.removeEventListener('progress-updated', handleProgressUpdate)
  }, [progress])

  // Dynamic unlock logic with better error handling
  const getScenarioStatus = (scenarioId) => {
    if (!progress?.scenarios) return "locked"
    if (scenarioId === "01") return "unlocked"
    if (scenarioId === "02") return progress.scenarios?.["01"]?.completed ? "unlocked" : "locked"
    if (scenarioId === "03") return progress.scenarios?.["02"]?.completed ? "unlocked" : "locked"
    return "locked"
  }

  // Get current rank info
  const rankInfo = getRankInfo()
  const successRate = getSuccessRate()

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="border-white/20 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "space-y-6 lg:sticky lg:top-36",
        "fixed inset-y-0 left-0 z-40 w-80 transform transition-transform lg:relative lg:translate-x-0 lg:w-auto",
        "bg-[#050505] lg:bg-transparent p-4 lg:p-0",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        
        {/* Enhanced Progress Card */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/5 to-red-500/5 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-semibold text-orange-400">Lab Progress</span>
            </div>
            <Badge variant="outline" className={cn("text-xs", rankInfo.color, "border-current")}>
              {rankInfo.rank}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Scenarios</span>
              <span className="font-mono text-white">{progress?.completedScenarios || 0}/3</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 transition-all duration-500"
                style={{ width: `${Math.round(((progress?.completedScenarios || 0) / 3) * 100)}%` }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-black/30 rounded-lg border border-white/10">
              <div className="text-sm font-bold text-orange-400">{progress?.totalPoints || 0}</div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
            <div className="p-2 bg-black/30 rounded-lg border border-white/10">
              <div className="text-sm font-bold text-green-400">{progress?.successfulInjections || 0}</div>
              <div className="text-xs text-muted-foreground">Success</div>
            </div>
            <div className="p-2 bg-black/30 rounded-lg border border-white/10">
              <div className="text-sm font-bold text-blue-400">{successRate}%</div>
              <div className="text-xs text-muted-foreground">Rate</div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-yellow-400" />
              <span className="text-muted-foreground">Streak:</span>
              <span className="font-mono text-yellow-400">{progress?.currentStreak || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-purple-400" />
              <span className="text-muted-foreground">Level:</span>
              <span className="font-mono text-purple-400">{rankInfo.level}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono mb-2">
            Lab Modes
          </div>
          
          <Link
            href="/lab"
            className={cn(
              "w-full rounded-xl border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 flex items-center gap-3",
              pathname === "/lab"
                ? "border-orange-500/40 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.08)]"
                : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]"
            )}
          >
            <Terminal className="h-4 w-4" />
            <span className="text-sm font-medium">Free Play</span>
          </Link>
          
          <Link
            href="/lab/progress"
            className={cn(
              "w-full rounded-xl border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 flex items-center gap-3",
              pathname === "/lab/progress"
                ? "border-orange-500/40 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.08)]"
                : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]"
            )}
          >
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium">Progress</span>
          </Link>
          
          <Link
            href="/tutorial"
            className={cn(
              "w-full rounded-xl border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 flex items-center gap-3",
              pathname === "/tutorial"
                ? "border-orange-500/40 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.08)]"
                : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]"
            )}
          >
            <BookOpen className="h-4 w-4" />
            <span className="text-sm font-medium">Tutorial</span>
          </Link>
        </div>

        {/* Enhanced Scenarios */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">Target Scenarios</span>
            </div>
            <Badge variant="outline" className="text-xs border-blue-400/30 text-blue-400">
              {(progress?.completedScenarios || 0)}/3
            </Badge>
          </div>
          
          {scenarios.map((scenario) => {
            const isActive = pathname === scenario.href
            const isCompleted = progress?.scenarios?.[scenario.id]?.completed || false
            const scenarioStatus = getScenarioStatus(scenario.id)
            const isLocked = scenarioStatus === "locked"
            const attempts = progress?.scenarios?.[scenario.id]?.attempts || 0
            
            if (isLocked) {
              return (
                <div key={scenario.id} className="relative group">
                  <div className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 opacity-50 transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Lock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div className="absolute -inset-1 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-muted-foreground">
                            {scenario.id}. {scenario.title}
                          </span>
                          <Badge variant="outline" className="text-xs border-red-500/30 text-red-400 bg-red-500/10">
                            <Lock className="h-2 w-2 mr-1" />
                            Locked
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <Trophy className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">+{scenario.reward} pts</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {scenario.id === "02" ? "Complete scenario 01 to unlock" : "Complete scenario 02 to unlock"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            
            return (
              <Link
                key={scenario.id}
                href={scenario.href}
                className={cn(
                  "block w-full rounded-xl border px-3 py-3 transition-all duration-200 hover:scale-[1.02] group",
                  isActive
                    ? "border-orange-500/40 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.08)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04] hover:shadow-lg"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    ) : (
                      <Target className="h-4 w-4 text-orange-400 mt-0.5" />
                    )}
                    {isActive && (
                      <div className="absolute -inset-1 bg-orange-400/20 rounded-full animate-pulse" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium group-hover:text-white transition-colors">
                        {scenario.id}. {scenario.title}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs transition-all duration-200",
                          isCompleted 
                            ? "border-green-400/60 text-green-300 bg-green-500/10" 
                            : "border-white/20 text-white group-hover:border-orange-400/50 group-hover:text-orange-300"
                        )}
                      >
                        {isCompleted ? "✓ Complete" : scenario.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="h-3 w-3 text-orange-400" />
                      <span className="text-xs text-muted-foreground group-hover:text-orange-300 transition-colors">
                        +{scenario.reward} pts
                      </span>
                      {attempts > 0 && (
                        <>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-blue-400">{attempts} attempts</span>
                        </>
                      )}
                      {progress?.scenarios?.[scenario.id]?.bestTime && (
                        <>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-green-400">
                            Best: {progress.scenarios[scenario.id].bestTime}
                          </span>
                        </>
                      )}
                    </div>
                    {isCompleted && (
                      <div className="flex items-center gap-1 mt-1">
                        <Award className="h-3 w-3 text-yellow-400" />
                        <span className="text-xs text-yellow-400 font-medium">Mastered</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}