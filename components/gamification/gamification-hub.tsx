"use client"

import { useState } from "react"
import { Avatar } from "./avatar"
import { Challenges } from "./challenges"
import { Badges } from "./badges"
import { RankDisplay } from "./rank-display"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GamificationHubProps {
  salary: number
  savings: number
}

export function GamificationHub({ salary, savings }: GamificationHubProps) {
  const [avatar, setAvatar] = useState({
    emotion: "happy" as const,
    level: 5,
    experience: 2500,
  })

  const [challenges, setChallenges] = useState([
    {
      id: "1",
      title: "Frugal Friday",
      description: "Spend 30% less than your daily average",
      reward: 100,
      completed: false,
      difficulty: "easy" as const,
    },
    {
      id: "2",
      title: "No-Spend Day",
      description: "Go an entire day without spending money",
      reward: 150,
      completed: true,
      difficulty: "medium" as const,
    },
    {
      id: "3",
      title: "Budget Master",
      description: "Stay within budget for 30 consecutive days",
      reward: 500,
      completed: false,
      difficulty: "hard" as const,
    },
    {
      id: "4",
      title: "Savings Sprint",
      description: "Save 50% of your income this month",
      reward: 300,
      completed: false,
      difficulty: "hard" as const,
    },
  ])

  const [badges] = useState([
    {
      id: "1",
      name: "First Steps",
      description: "Complete your first challenge",
      icon: "👣",
      unlocked: true,
      unlockedDate: "Nov 15",
    },
    {
      id: "2",
      name: "Streak Master",
      description: "Maintain a 7-day saving streak",
      icon: "🔥",
      unlocked: true,
      unlockedDate: "Nov 18",
    },
    {
      id: "3",
      name: "Budget Hero",
      description: "Stay under budget 10 times",
      icon: "💪",
      unlocked: false,
    },
    {
      id: "4",
      name: "Wealth Accumulator",
      description: "Reach $10,000 in savings",
      icon: "💰",
      unlocked: true,
      unlockedDate: "Nov 20",
    },
    {
      id: "5",
      name: "Challenge Champion",
      description: "Complete 5 challenges",
      icon: "🏆",
      unlocked: false,
    },
    {
      id: "6",
      name: "Financial Wizard",
      description: "Reach level 10",
      icon: "🧙",
      unlocked: false,
    },
  ])

  const handleCompleteChallenge = (challengeId: string) => {
    setChallenges(challenges.map((c) => (c.id === challengeId ? { ...c, completed: true } : c)))
    setAvatar({
      ...avatar,
      experience: avatar.experience + 150,
      emotion: "excited",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="kingdom" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="kingdom">Kingdom</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="rank">Rank</TabsTrigger>
        </TabsList>

        <TabsContent value="kingdom" className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Avatar emotion={avatar.emotion} level={avatar.level} experience={avatar.experience} />
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border-2 border-amber-300">
              <h3 className="font-semibold text-amber-900 mb-2">Kingdom Stats</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>Total Population: 1 Citizen</p>
                <p>Treasury: ${savings.toLocaleString()}</p>
                <p>Monthly Income: ${salary.toLocaleString()}</p>
                <p>Buildings Unlocked: 3</p>
                <p>Citizens Happy: 95%</p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
              <h3 className="font-semibold text-blue-900 mb-2">Next Milestone</h3>
              <p className="text-sm text-gray-700 mb-3">Reach Level 6 to unlock: Treasury Expansion</p>
              <div className="bg-blue-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="mt-6">
          <Challenges challenges={challenges} onComplete={handleCompleteChallenge} />
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <Badges badges={badges} />
        </TabsContent>

        <TabsContent value="rank" className="mt-6">
          <RankDisplay rank="Gold Advisor" savings={savings} monthlyIncome={salary} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
