"use client"

import { useState } from "react"
import { SpendingQuiz } from "./spending-quiz"
import { PatternAnalysis } from "./pattern-analysis"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SpendingScannerHub() {
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [profile, setProfile] = useState("")

  const handleQuizComplete = (finalScore: number, userProfile: string) => {
    setScore(finalScore)
    setProfile(userProfile)
    setQuizCompleted(true)
  }

  const handleResetQuiz = () => {
    setQuizCompleted(false)
    setScore(0)
    setProfile("")
  }

  if (!quizCompleted) {
    return <SpendingQuiz onComplete={handleQuizComplete} />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Spending Analysis</h2>
        <Button onClick={handleResetQuiz} variant="outline">
          Retake Quiz
        </Button>
      </div>

      <PatternAnalysis score={score} profile={profile} />

      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🎁</span> Rewards for Good Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Complete this analysis to earn 250 XP and unlock the Financial Analyst badge!
          </p>
          <Button className="bg-amber-600 hover:bg-amber-700 w-full">Claim Rewards</Button>
        </CardContent>
      </Card>
    </div>
  )
}
