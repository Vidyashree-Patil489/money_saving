"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SavingsProgressProps {
  currentSavings: number
  goals: Array<{ title: string; amount: number }>
}

export function SavingsProgress({ currentSavings, goals }: SavingsProgressProps) {
  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.amount, 0)
  const progressPercentage = Math.min((currentSavings / totalGoalAmount) * 100, 100)

  return (
    <Card className="bg-slate-900 border-purple-700 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <span>🎯</span> Savings Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-purple-300">Short-term Goals</span>
            <span className="text-sm font-bold text-cyan-400">
              ₹{currentSavings.toLocaleString()} / ₹{totalGoalAmount.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden border border-purple-500">
            <div
              className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full transition-all duration-500 animate-pulse-glow"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-purple-400 mt-1">{progressPercentage.toFixed(1)}% Complete</p>
        </div>

        <div className="space-y-2">
          {goals.map((goal, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg border border-purple-500 hover:border-cyan-400 transition-colors animate-bounce-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <span className="text-sm font-medium text-purple-300">{goal.title}</span>
              <span className="text-sm font-bold text-cyan-400">₹{goal.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
