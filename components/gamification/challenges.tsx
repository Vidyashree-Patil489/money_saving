"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle } from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  reward: number
  completed: boolean
  difficulty: "easy" | "medium" | "hard"
}

interface ChallengesProps {
  challenges: Challenge[]
  onComplete: (challengeId: string) => void
}

const difficultyColors = {
  easy: "bg-green-900 text-green-300 border border-green-600",
  medium: "bg-yellow-900 text-yellow-300 border border-yellow-600",
  hard: "bg-red-900 text-red-300 border border-red-600",
}

export function Challenges({ challenges, onComplete }: ChallengesProps) {
  return (
    <Card className="bg-slate-900 border-purple-700 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <span>⚔️</span> Challenges
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {challenges.map((challenge, idx) => (
          <div
            key={challenge.id}
            className={`p-4 border-2 rounded-lg transition-all animate-bounce-in ${
              challenge.completed
                ? "border-green-500 bg-gradient-to-r from-green-950 to-green-900 shadow-lg shadow-green-500/30"
                : "border-purple-600 hover:border-cyan-400 bg-gradient-to-r from-slate-800 to-slate-900 hover:shadow-lg hover:shadow-purple-500/50"
            }`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-3 flex-1">
                {challenge.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0 animate-pulse-glow" />
                ) : (
                  <Circle className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h4
                    className={`font-semibold ${challenge.completed ? "line-through text-purple-400" : "text-cyan-400"}`}
                  >
                    {challenge.title}
                  </h4>
                  <p className="text-sm text-purple-300 mt-1">{challenge.description}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${difficultyColors[challenge.difficulty]}`}>
                {challenge.difficulty}
              </span>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1">
                <span className="text-lg">⭐</span>
                <span className="font-bold text-cyan-400">{challenge.reward} XP</span>
              </div>
              {!challenge.completed && (
                <Button
                  size="sm"
                  onClick={() => onComplete(challenge.id)}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
                >
                  Complete
                </Button>
              )}
              {challenge.completed && <span className="text-green-400 font-bold">✓ Completed</span>}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
