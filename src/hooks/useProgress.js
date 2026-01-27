"use client"

import { useState, useEffect, useCallback } from 'react'

const INITIAL_PROGRESS = {
    totalPoints: 0,
    completedScenarios: 0,
    completedTasks: 0,
    totalAttempts: 0,
    successfulInjections: 0,
    currentStreak: 0,
    longestStreak: 0,
    timeSpent: 0,
    rank: "Novice",
    level: 1,
    xpToNextLevel: 100,
    scenarios: {
        "01": { completed: false, bestTime: null, attempts: 0 },
        "02": { completed: false, bestTime: null, attempts: 0 },
        "03": { completed: false, bestTime: null, attempts: 0 }
    },
    tasks: {
        // Task completion tracking will be added dynamically
    },
    achievements: {
        first_injection: false,
        first_task: false,
        task_explorer: false,
        task_specialist: false,
        task_master: false,
        scenario_master: false,
        speed_runner: false,
        persistence: false,
        security_expert: false,
        learner: false,
        explorer: false
    }
}

export function useProgress() {
    const [progress, setProgress] = useState(INITIAL_PROGRESS)
    const [sessionStartTime, setSessionStartTime] = useState(Date.now())

    // Load progress from localStorage on mount
    useEffect(() => {
        const savedProgress = localStorage.getItem('lab_progress')
        if (savedProgress) {
            try {
                const parsed = JSON.parse(savedProgress)
                // Ensure all required properties exist
                const mergedProgress = {
                    ...INITIAL_PROGRESS,
                    ...parsed,
                    // Ensure scenarios object exists
                    scenarios: {
                        ...INITIAL_PROGRESS.scenarios,
                        ...(parsed.scenarios || {})
                    },
                    // Ensure achievements object exists
                    achievements: {
                        ...INITIAL_PROGRESS.achievements,
                        ...(parsed.achievements || {})
                    }
                }
                setProgress(mergedProgress)
            } catch (error) {
                console.error('Failed to load progress:', error)
                setProgress(INITIAL_PROGRESS)
            }
        } else {
            setProgress(INITIAL_PROGRESS)
        }
        setSessionStartTime(Date.now())
    }, [])

    // Save progress to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('lab_progress', JSON.stringify(progress))
        // Force update all components that use progress
        window.dispatchEvent(new CustomEvent('progress-updated', { detail: progress }))
    }, [progress])

    // Record an injection attempt
    const recordAttempt = useCallback((scenarioId, success, responseTime) => {
        setProgress(prev => {
            const newProgress = { ...prev }
            const newAchievements = []
            
            // Update basic stats
            newProgress.totalAttempts += 1
            
            // Award participation points for every attempt (5 points)
            newProgress.totalPoints += 5
            
            if (success) {
                newProgress.successfulInjections += 1
                newProgress.currentStreak += 1
                newProgress.longestStreak = Math.max(newProgress.longestStreak, newProgress.currentStreak)
                
                // Award bonus points for successful injection (20 points)
                newProgress.totalPoints += 20
                
                // Check for first injection achievement
                if (!newProgress.achievements.first_injection && newProgress.successfulInjections === 1) {
                    newProgress.achievements.first_injection = true
                    newProgress.totalPoints += 50
                    newAchievements.push({ name: 'First Injection', points: 50, description: 'Successfully bypassed AI security for the first time!' })
                }
                
                // Check for speed runner achievement (under 2 minutes)
                if (!newProgress.achievements.speed_runner && responseTime && responseTime < 120000) {
                    newProgress.achievements.speed_runner = true
                    newProgress.totalPoints += 100
                    newAchievements.push({ name: 'Speed Runner', points: 100, description: 'Completed an injection in under 2 minutes!' })
                }
            } else {
                newProgress.currentStreak = 0
                // Award small points for learning from blocked attempts (2 points)
                newProgress.totalPoints += 2
            }
            
            // Check for learner achievement (5 attempts)
            if (!newProgress.achievements.learner && newProgress.totalAttempts >= 5) {
                newProgress.achievements.learner = true
                newProgress.totalPoints += 25
                newAchievements.push({ name: 'Learner', points: 25, description: 'Made 5 attempts - keep learning!' })
            }
            
            // Check for explorer achievement (10 attempts)
            if (!newProgress.achievements.explorer && newProgress.totalAttempts >= 10) {
                newProgress.achievements.explorer = true
                newProgress.totalPoints += 75
                newAchievements.push({ name: 'Explorer', points: 75, description: 'Made 10 attempts - exploring the boundaries!' })
            }
            
            // Update scenario-specific stats
            if (scenarioId && newProgress.scenarios[scenarioId]) {
                newProgress.scenarios[scenarioId].attempts += 1
                
                if (success && !newProgress.scenarios[scenarioId].completed) {
                    newProgress.scenarios[scenarioId].completed = true
                    newProgress.completedScenarios += 1
                    
                    // Award scenario completion bonus points
                    const scenarioPoints = { "01": 100, "02": 150, "03": 250 }
                    newProgress.totalPoints += scenarioPoints[scenarioId] || 0
                    
                    // Update best time
                    if (responseTime) {
                        const timeInSeconds = Math.round(responseTime / 1000)
                        newProgress.scenarios[scenarioId].bestTime = `${Math.floor(timeInSeconds / 60)}:${(timeInSeconds % 60).toString().padStart(2, '0')}`
                    }
                    
                    // Check for scenario master achievement
                    if (newProgress.completedScenarios === 3 && !newProgress.achievements.scenario_master) {
                        newProgress.achievements.scenario_master = true
                        newProgress.totalPoints += 500
                        newAchievements.push({ name: 'Scenario Master', points: 500, description: 'Completed all 3 scenarios!' })
                    }
                }
            }
            
            // Check for persistence achievement (25 attempts)
            if (!newProgress.achievements.persistence && newProgress.totalAttempts >= 25) {
                newProgress.achievements.persistence = true
                newProgress.totalPoints += 200
                newAchievements.push({ name: 'Persistent', points: 200, description: 'Made 25 attempts - dedication pays off!' })
            }
            
            // Update rank and level
            const rankInfo = getRankInfo(newProgress.totalPoints)
            newProgress.rank = rankInfo.rank
            newProgress.level = rankInfo.level
            
            // Dispatch achievement notifications
            if (newAchievements.length > 0) {
                setTimeout(() => {
                    newAchievements.forEach(achievement => {
                        window.dispatchEvent(new CustomEvent('achievement-unlocked', { detail: achievement }))
                    })
                }, 100)
            }
            
            return newProgress
        })
    }, [])

    // Record task completion
    const recordTaskCompletion = useCallback((taskId, taskPoints, passed) => {
        setProgress(prev => {
            const newProgress = { ...prev }
            const newAchievements = []
            
            // Initialize task tracking if not exists
            if (!newProgress.tasks[taskId]) {
                newProgress.tasks[taskId] = { completed: false, attempts: 0, bestScore: 0 }
            }
            
            newProgress.tasks[taskId].attempts += 1
            
            // Award points for attempting the task (5 points)
            newProgress.totalPoints += 5
            
            if (passed && !newProgress.tasks[taskId].completed) {
                newProgress.tasks[taskId].completed = true
                newProgress.completedTasks += 1
                newProgress.totalPoints += taskPoints
                
                // Check for first task achievement
                if (!newProgress.achievements.first_task && newProgress.completedTasks === 1) {
                    newProgress.achievements.first_task = true
                    newProgress.totalPoints += 25
                    newAchievements.push({ name: 'First Task', points: 25, description: 'Completed your first lab task!' })
                }
                
                // Check for task milestone achievements
                if (!newProgress.achievements.task_explorer && newProgress.completedTasks >= 3) {
                    newProgress.achievements.task_explorer = true
                    newProgress.totalPoints += 50
                    newAchievements.push({ name: 'Task Explorer', points: 50, description: 'Completed 3 tasks!' })
                }
                
                if (!newProgress.achievements.task_specialist && newProgress.completedTasks >= 5) {
                    newProgress.achievements.task_specialist = true
                    newProgress.totalPoints += 100
                    newAchievements.push({ name: 'Task Specialist', points: 100, description: 'Completed 5 tasks!' })
                }
                
                // Check for task master achievement (complete 10 tasks)
                if (!newProgress.achievements.task_master && newProgress.completedTasks >= 10) {
                    newProgress.achievements.task_master = true
                    newProgress.totalPoints += 300
                    newAchievements.push({ name: 'Task Master', points: 300, description: 'Completed 10 tasks - you\'re getting good at this!' })
                }
                
                // Check for security expert achievement (complete all 17 tasks)
                if (!newProgress.achievements.security_expert && newProgress.completedTasks >= 17) {
                    newProgress.achievements.security_expert = true
                    newProgress.totalPoints += 1000
                    newAchievements.push({ name: 'Security Expert', points: 1000, description: 'Completed all tasks - you\'re a security expert!' })
                }
            } else if (passed && newProgress.tasks[taskId].completed) {
                // Task already completed, give small bonus for re-completion
                newProgress.totalPoints += Math.floor(taskPoints * 0.1)
            } else {
                // Task failed, give small participation points
                newProgress.totalPoints += 2
            }
            
            // Update rank and level
            const rankInfo = getRankInfo(newProgress.totalPoints)
            newProgress.rank = rankInfo.rank
            newProgress.level = rankInfo.level
            
            // Dispatch achievement notifications
            if (newAchievements.length > 0) {
                setTimeout(() => {
                    newAchievements.forEach(achievement => {
                        window.dispatchEvent(new CustomEvent('achievement-unlocked', { detail: achievement }))
                    })
                }, 100)
            }
            
            return newProgress
        })
    }, [])

    // Update session time
    const updateSessionTime = useCallback(() => {
        const sessionTime = Math.round((Date.now() - sessionStartTime) / 60000) // in minutes
        setProgress(prev => ({
            ...prev,
            timeSpent: prev.timeSpent + sessionTime
        }))
        setSessionStartTime(Date.now())
    }, [sessionStartTime])

    // Reset all progress
    const resetProgress = useCallback(() => {
        setProgress(INITIAL_PROGRESS)
        localStorage.removeItem('lab_progress')
    }, [])

    // Force refresh progress (for debugging)
    const refreshProgress = useCallback(() => {
        const savedProgress = localStorage.getItem('lab_progress')
        if (savedProgress) {
            try {
                const parsed = JSON.parse(savedProgress)
                const mergedProgress = {
                    ...INITIAL_PROGRESS,
                    ...parsed,
                    scenarios: {
                        ...INITIAL_PROGRESS.scenarios,
                        ...(parsed.scenarios || {})
                    },
                    achievements: {
                        ...INITIAL_PROGRESS.achievements,
                        ...(parsed.achievements || {})
                    }
                }
                setProgress(mergedProgress)
            } catch (error) {
                console.error('Failed to refresh progress:', error)
            }
        }
    }, [])

    // Get current rank info
    const getRankInfo = (points) => {
        if (points >= 1500) return { rank: "Elite Hacker", level: 6, color: "text-purple-400" }
        if (points >= 1000) return { rank: "Security Expert", level: 5, color: "text-red-400" }
        if (points >= 600) return { rank: "Advanced", level: 4, color: "text-orange-400" }
        if (points >= 300) return { rank: "Intermediate", level: 3, color: "text-yellow-400" }
        if (points >= 100) return { rank: "Beginner", level: 2, color: "text-green-400" }
        return { rank: "Novice", level: 1, color: "text-gray-400" }
    }

    // Get progress percentage (based on total possible points from tasks)
    const getProgressPercentage = useCallback(() => {
        const totalPossiblePoints = 1500 // Approximate total from all tasks + scenarios
        return Math.round((progress.totalPoints / totalPossiblePoints) * 100)
    }, [progress.totalPoints])

    // Get success rate
    const getSuccessRate = useCallback(() => {
        if (progress.totalAttempts === 0) return 0
        return Math.round((progress.successfulInjections / progress.totalAttempts) * 100)
    }, [progress.totalAttempts, progress.successfulInjections])

    return {
        progress,
        recordAttempt,
        recordTaskCompletion,
        updateSessionTime,
        resetProgress,
        refreshProgress,
        getProgressPercentage,
        getSuccessRate,
        getRankInfo: () => getRankInfo(progress.totalPoints)
    }
}