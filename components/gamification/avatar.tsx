"use client"

import { Card, CardContent } from "@/components/ui/card"

interface AvatarProps {
  emotion: "happy" | "neutral" | "sad" | "excited"
  level: number
  experience: number
}

const emotionStyles = {
  happy: {
    color: "text-yellow-400",
    emoji: "😊",
    description: "Happy - Keep up the good savings!",
    bg: "bg-gradient-to-br from-yellow-900 to-yellow-950",
  },
  neutral: {
    color: "text-slate-400",
    emoji: "😐",
    description: "Neutral - Time to make better choices",
    bg: "bg-gradient-to-br from-slate-800 to-slate-900",
  },
  sad: {
    color: "text-red-400",
    emoji: "😢",
    description: "Sad - You spent too much this month",
    bg: "bg-gradient-to-br from-red-900 to-red-950",
  },
  excited: {
    color: "text-pink-400",
    emoji: "🤩",
    description: "Excited - Fantastic spending control!",
    bg: "bg-gradient-to-br from-pink-900 to-pink-950",
  },
}

export function Avatar({ emotion, level, experience }: AvatarProps) {
  const style = emotionStyles[emotion]
  const nextLevelExp = level * 1000
  const expPercentage = (experience / nextLevelExp) * 100

  return (
    <Card className="bg-slate-900 border-purple-700 shadow-lg">
      <CardContent className="pt-6">
        <div className={`${style.bg} rounded-lg p-6 text-center mb-6 border border-purple-600`}>
          <div className="text-7xl mb-2">{style.emoji}</div>
          <p className="font-semibold text-white">{style.description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-purple-300">Level</span>
              <span className="text-2xl font-bold text-cyan-400">{level}</span>
            </div>
            <div className="bg-slate-700 rounded-full h-3 overflow-hidden border border-purple-600">
              <div
                className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full transition-all duration-500 animate-pulse-glow"
                style={{ width: `${expPercentage}%` }}
              />
            </div>
            <p className="text-xs text-purple-400 mt-1">
              {experience.toLocaleString()} / {nextLevelExp.toLocaleString()} XP
            </p>
          </div>

          <div className="pt-4 border-t border-purple-600">
            <p className="text-sm text-purple-300 mb-2">Current Streak</p>
            <p className="text-3xl font-bold text-orange-400">7 days 🔥</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
