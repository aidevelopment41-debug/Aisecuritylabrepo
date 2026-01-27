"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
    Target, 
    Trophy, 
    CheckCircle, 
    AlertTriangle,
    Play,
    Flame,
    Lock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { LAB_TASKS, RISK_LEVELS } from "@/data/lab-tasks"

export function TaskSelector({ onTaskSelect, selectedTask, completedTasks = [] }) {
    const [selectedLevel, setSelectedLevel] = useState("level1")
    
    // Safely construct levels array with error handling
    const levels = [
        { id: "level1", title: "Level 1", icon: Target, ...LAB_TASKS.level1 },
        { id: "level2", title: "Level 2", icon: AlertTriangle, ...LAB_TASKS.level2 },
        { id: "level3", title: "Level 3", icon: Lock, ...LAB_TASKS.level3 },
        { id: "level4", title: "Level 4", icon: Flame, ...LAB_TASKS.level4 },
        { id: "level5", title: "Level 5", icon: Trophy, ...LAB_TASKS.level5 },
        { id: "level6", title: "Level 6", icon: Target, ...LAB_TASKS.level6 },
        { id: "finalBoss", title: "Final Boss", icon: Flame, ...LAB_TASKS.finalBoss }
    ].filter(level => level.tasks && Array.isArray(level.tasks)) // Only include levels with valid tasks

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Baseline": return "text-gray-400 border-gray-400/30"
            case "Easy": return "text-green-400 border-green-400/30"
            case "Medium": return "text-yellow-400 border-yellow-400/30"
            case "Hard": return "text-orange-400 border-orange-400/30"
            case "Expert": return "text-red-400 border-red-400/30"
            case "Master": return "text-purple-400 border-purple-400/30"
            default: return "text-gray-400 border-gray-400/30"
        }
    }

    const getRiskColor = (riskLevel) => {
        const risk = RISK_LEVELS[riskLevel]
        if (!risk) return "text-gray-400"
        
        switch (risk.color) {
            case "green": return "text-green-400"
            case "yellow": return "text-yellow-400"
            case "orange": return "text-orange-400"
            case "red": return "text-red-400"
            default: return "text-gray-400"
        }
    }

    const isTaskCompleted = (taskId) => completedTasks.includes(taskId)

    return (
        <Card className="bg-white/[0.02] border-white/10 h-full">
            <CardHeader className="pb-1">
                <CardTitle className="text-xs font-orbitron flex items-center gap-2">
                    <Target className="h-3 w-3 text-blue-400" />
                    Lab Tasks
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-full">
                {/* Level Selector */}
                <div className="px-2 pb-1">
                    <ScrollArea className="w-full">
                        <div className="flex gap-1 pb-1">
                            {levels.map((level) => {
                                if (!level || !level.id) return null // Safety check
                                
                                const IconComponent = level.icon || Target // Fallback icon
                                const isActive = selectedLevel === level.id
                                
                                return (
                                    <Button
                                        key={level.id}
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedLevel(level.id)}
                                        className={cn(
                                            "flex items-center gap-1 whitespace-nowrap text-xs h-5 px-1",
                                            isActive 
                                                ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" 
                                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        <IconComponent className="h-2 w-2" />
                                        <span className="text-xs">L{level.id.slice(-1)}</span>
                                    </Button>
                                )
                            }).filter(Boolean)}
                        </div>
                    </ScrollArea>
                </div>

                {/* Task List */}
                <ScrollArea className="h-[200px]">
                    <div className="space-y-1 p-2 pt-0">
                        {LAB_TASKS[selectedLevel]?.tasks?.length > 0 ? (
                            LAB_TASKS[selectedLevel].tasks.map((task) => {
                                if (!task || !task.id) return null // Safety check
                                
                                const isSelected = selectedTask?.id === task.id
                                const isCompleted = isTaskCompleted(task.id)
                                
                                return (
                                    <div
                                        key={task.id}
                                        className={cn(
                                            "rounded border p-1 cursor-pointer transition-all duration-200 text-xs",
                                            "hover:border-white/30 hover:bg-white/[0.04]",
                                            isSelected 
                                                ? "border-orange-500/40 bg-orange-500/10" 
                                                : "border-white/10 bg-white/[0.02]"
                                        )}
                                        onClick={() => onTaskSelect(task)}
                                    >
                                        <div className="flex items-center gap-1">
                                            {/* Status Icon */}
                                            <div>
                                                {isCompleted ? (
                                                    <CheckCircle className="h-2 w-2 text-green-400" />
                                                ) : (
                                                    <Target className="h-2 w-2 text-orange-400" />
                                                )}
                                            </div>
                                            
                                            {/* Task Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-xs font-medium text-white truncate">
                                                        {task.title || 'Untitled Task'}
                                                    </span>
                                                    <Badge 
                                                        variant="outline" 
                                                        className={cn("text-xs h-3 px-1", getDifficultyColor(task.difficulty))}
                                                    >
                                                        {task.difficulty?.charAt(0) || 'U'}
                                                    </Badge>
                                                    {isCompleted && (
                                                        <Badge variant="outline" className="text-xs h-3 px-1 border-green-400/60 text-green-300 bg-green-500/10 animate-pulse">
                                                            ✓ +{task.points}
                                                        </Badge>
                                                    )}
                                                </div>
                                                
                                                <div className="flex items-center justify-between mt-0.5">
                                                    <div className="flex items-center gap-1">
                                                        <Trophy className="h-2 w-2 text-orange-400" />
                                                        <span className="text-xs text-muted-foreground">+{task.points || 0}</span>
                                                    </div>
                                                    
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-4 px-1 text-xs text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            onTaskSelect(task)
                                                        }}
                                                    >
                                                        <Play className="h-2 w-2" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }).filter(Boolean)
                        ) : (
                            <div className="flex items-center justify-center py-8">
                                <span className="text-xs text-muted-foreground">No tasks available for this level</span>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Selected Task Details */}
                {selectedTask && (
                    <div className="border-t border-white/10 p-2">
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <h4 className="text-xs font-semibold text-orange-400">
                                    {selectedTask.title}
                                </h4>
                                <Badge variant="outline" className={cn("text-xs h-3 px-1", getDifficultyColor(selectedTask.difficulty))}>
                                    {selectedTask.difficulty.charAt(0)}
                                </Badge>
                            </div>
                            
                            <div>
                                <span className="text-xs font-medium text-white">Input:</span>
                                <div className="mt-0.5 p-1 bg-black/60 rounded border border-white/10">
                                    <code className="text-xs text-orange-300 font-mono">
                                        {selectedTask.input}
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}