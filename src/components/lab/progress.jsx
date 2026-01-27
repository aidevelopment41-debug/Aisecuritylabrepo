"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
    Trophy, 
    Target, 
    Zap, 
    Award,
    Lock,
    CheckCircle,
    TrendingUp,
    Clock,
    Flame
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useProgress } from "@/hooks/useProgress"

export function ProgressComponent() {
    const { progress, recordAttempt, resetProgress, getProgressPercentage, getSuccessRate, getRankInfo } = useProgress()
    
    const scenarios = [
        {
            id: "01",
            title: "Basic Injection",
            difficulty: "Easy",
            points: 100,
            completed: progress.scenarios?.["01"]?.completed || false,
            bestTime: progress.scenarios?.["01"]?.bestTime || null
        },
        {
            id: "02", 
            title: "Context Leaking",
            difficulty: "Medium",
            points: 150,
            completed: progress.scenarios?.["02"]?.completed || false,
            bestTime: progress.scenarios?.["02"]?.bestTime || null
        },
        {
            id: "03",
            title: "Jailbreak Patterns", 
            difficulty: "Hard",
            points: 250,
            completed: progress.scenarios?.["03"]?.completed || false,
            bestTime: progress.scenarios?.["03"]?.bestTime || null
        }
    ]

    const achievements = [
        {
            id: "first_injection",
            title: "First Blood",
            description: "Complete your first successful injection",
            icon: Target,
            points: 50,
            unlocked: progress.achievements?.first_injection || false
        },
        {
            id: "first_task",
            title: "Task Starter",
            description: "Complete your first task",
            icon: CheckCircle,
            points: 25,
            unlocked: progress.achievements?.first_task || false
        },
        {
            id: "scenario_master",
            title: "Scenario Master",
            description: "Complete all 3 target scenarios",
            icon: Trophy,
            points: 500,
            unlocked: progress.achievements?.scenario_master || false
        },
        {
            id: "task_master",
            title: "Task Master",
            description: "Complete 10 tasks",
            icon: Award,
            points: 300,
            unlocked: progress.achievements?.task_master || false
        },
        {
            id: "security_expert",
            title: "Security Expert",
            description: "Complete all 17 tasks",
            icon: Flame,
            points: 1000,
            unlocked: progress.achievements?.security_expert || false
        },
        {
            id: "speed_runner",
            title: "Speed Runner",
            description: "Complete a scenario in under 2 minutes",
            icon: Zap,
            points: 100,
            unlocked: progress.achievements?.speed_runner || false
        },
        {
            id: "persistence",
            title: "Persistent Hacker",
            description: "Attempt 50 different injection patterns",
            icon: Flame,
            points: 200,
            unlocked: progress.achievements?.persistence || false
        }
    ]

    const rankInfo = getRankInfo()

    return (
        <div className="space-y-6">
            {/* Overall Progress Card */}
            <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-orange-400">
                        <Trophy className="h-5 w-5" />
                        Progress Overview
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Rank and Level */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className={cn("border-current", rankInfo.color)}>
                                    Level {rankInfo.level}
                                </Badge>
                                <span className={cn("font-semibold", rankInfo.color)}>
                                    {rankInfo.rank}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {progress.totalPoints} total points
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-orange-400">
                                {getProgressPercentage()}%
                            </div>
                            <p className="text-xs text-muted-foreground">Complete</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <Progress 
                            value={getProgressPercentage()} 
                            className="h-2 bg-black/50"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>0 pts</span>
                            <span>1500 pts (Max)</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="text-center p-3 bg-black/30 rounded-lg border border-white/10">
                            <div className="text-lg font-bold text-green-400">
                                {progress.completedScenarios}/3
                            </div>
                            <p className="text-xs text-muted-foreground">Scenarios</p>
                        </div>
                        <div className="text-center p-3 bg-black/30 rounded-lg border border-white/10">
                            <div className="text-lg font-bold text-blue-400">
                                {getSuccessRate()}%
                            </div>
                            <p className="text-xs text-muted-foreground">Success Rate</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Scenario Progress */}
            <Card className="bg-card/50 border-white/10">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Target className="h-5 w-5 text-blue-400" />
                        Scenario Progress
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {scenarios.map((scenario) => (
                        <div 
                            key={scenario.id}
                            className={cn(
                                "flex items-center justify-between p-3 rounded-lg border transition-colors",
                                scenario.completed 
                                    ? "bg-green-500/10 border-green-500/30" 
                                    : "bg-black/20 border-white/10"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                {scenario.completed ? (
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                ) : (
                                    <div className="h-5 w-5 rounded-full border-2 border-white/30" />
                                )}
                                <div>
                                    <h4 className="font-medium text-white">
                                        {scenario.id}. {scenario.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge 
                                            variant="outline" 
                                            className={cn(
                                                "text-xs",
                                                scenario.difficulty === "Easy" && "border-green-500/30 text-green-400",
                                                scenario.difficulty === "Medium" && "border-yellow-500/30 text-yellow-400",
                                                scenario.difficulty === "Hard" && "border-red-500/30 text-red-400"
                                            )}
                                        >
                                            {scenario.difficulty}
                                        </Badge>
                                        {scenario.bestTime && (
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {scenario.bestTime}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-mono text-orange-400">
                                    +{scenario.points}pts
                                </div>
                                {scenario.completed && (
                                    <div className="text-xs text-green-400">✓ Complete</div>
                                )}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-card/50 border-white/10">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Award className="h-5 w-5 text-yellow-400" />
                        Achievements
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {achievements.map((achievement) => {
                        const IconComponent = achievement.icon
                        return (
                            <div 
                                key={achievement.id}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-lg border transition-colors",
                                    achievement.unlocked 
                                        ? "bg-yellow-500/10 border-yellow-500/30" 
                                        : "bg-black/20 border-white/10 opacity-60"
                                )}
                            >
                                <div className={cn(
                                    "p-2 rounded-lg",
                                    achievement.unlocked 
                                        ? "bg-yellow-500/20 text-yellow-400" 
                                        : "bg-white/5 text-white/40"
                                )}>
                                    {achievement.unlocked ? (
                                        <IconComponent className="h-5 w-5" />
                                    ) : (
                                        <Lock className="h-5 w-5" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className={cn(
                                        "font-medium",
                                        achievement.unlocked ? "text-white" : "text-white/60"
                                    )}>
                                        {achievement.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        {achievement.description}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className={cn(
                                        "font-mono text-sm",
                                        achievement.unlocked ? "text-yellow-400" : "text-white/40"
                                    )}>
                                        +{achievement.points}pts
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="bg-card/50 border-white/10">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-white">
                        <TrendingUp className="h-5 w-5 text-purple-400" />
                        Statistics
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Total Attempts</span>
                                <span className="font-mono text-white">{progress.totalAttempts}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Successful Injections</span>
                                <span className="font-mono text-green-400">{progress.successfulInjections}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Current Streak</span>
                                <span className="font-mono text-orange-400">{progress.currentStreak}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Completed Tasks</span>
                                <span className="font-mono text-purple-400">{progress.completedTasks}</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Best Streak</span>
                                <span className="font-mono text-purple-400">{progress.longestStreak}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Time Spent</span>
                                <span className="font-mono text-blue-400">{progress.timeSpent}m</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Success Rate</span>
                                <span className="font-mono text-yellow-400">{getSuccessRate()}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Total Points</span>
                                <span className="font-mono text-orange-400">{progress.totalPoints}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>



            {/* Reset Progress Button */}
            <Card className="bg-red-500/10 border-red-500/30">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-red-400 mb-1">Reset Progress</h4>
                            <p className="text-xs text-muted-foreground">
                                Clear all progress and start fresh
                            </p>
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm"
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                            onClick={() => {
                                if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                                    resetProgress()
                                }
                            }}
                        >
                            Reset
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}