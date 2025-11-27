"use client"

import { Card, CardContent } from "@/components/ui/card"

type Rank = "Bronze Citizen" | "Silver Merchant" | "Gold Advisor" | "Diamond Magnate"

interface RankDisplayProps {
  rank: Rank
  savings: number
  monthlyIncome: number
}

const rankInfo = {
  "Bronze Citizen": {
    color: "from-amber-600 to-yellow-600",
    icon: "🥉",
    description: "Just starting your financial journey",
    savingsRequirement: 0,
  },
  "Silver Merchant": {
    color: "from-gray-400 to-gray-600",
    icon: "🥈",
    description: "Building wealth consistently",
    savingsRequirement: 5000,
  },
  "Gold Advisor": {
    color: "from-yellow-400 to-yellow-600",
    icon: "🥇",
    description: "Master of financial wisdom",
    savingsRequirement: 25000,
  },
  "Diamond Magnate": {
    color: "from-cyan-300 to-blue-500",
    icon: "💎",
    description: "The ultimate wealth builder",
    savingsRequirement: 100000,
  },
}

export function RankDisplay({ rank, savings, monthlyIncome }: RankDisplayProps) {
  const info = rankInfo[rank]
  const savingsRate = monthlyIncome > 0 ? (savings / monthlyIncome) * 100 : 0

  return (
    <Card className="bg-white overflow-hidden">
      <div className={`bg-gradient-to-r ${info.color} p-6 text-white`}>
        <div className="flex items-center gap-4">
          <div className="text-6xl">{info.icon}</div>
          <div>
            <h3 className="text-3xl font-bold">{rank}</h3>
            <p className="text-sm opacity-90">{info.description}</p>
          </div>
        </div>
      </div>

      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Current Savings</p>
            <p className="text-2xl font-bold text-blue-600">${savings.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Savings Rate</p>
            <p className="text-2xl font-bold text-green-600">{savingsRate.toFixed(1)}%</p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">Progress to Next Rank</p>
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${info.color} rounded-full transition-all duration-500`}
              style={{ width: "65%" }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">$75,000 / $100,000 to Diamond Magnate</p>
        </div>
      </CardContent>
    </Card>
  )
}
