"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PatternAnalysisProps {
  score: number
  profile: string
}

export function PatternAnalysis({ score, profile }: PatternAnalysisProps) {
  const spendingData = [
    { week: "Week 1", spending: 450, budget: 500 },
    { week: "Week 2", spending: 520, budget: 500 },
    { week: "Week 3", spending: 380, budget: 500 },
    { week: "Week 4", spending: 490, budget: 500 },
  ]

  const patterns = [
    {
      name: "Highest Spending Day",
      value: "Saturday",
      icon: "📅",
      insight: "You tend to spend more on weekends",
    },
    {
      name: "Top Category",
      value: "Entertainment",
      icon: "🎬",
      insight: "35% of your spending goes here",
    },
    {
      name: "Saving Potential",
      value: "$850/month",
      icon: "💡",
      insight: "By cutting discretionary spending by 20%",
    },
    {
      name: "Risk Level",
      value: "Moderate",
      icon: "⚠️",
      insight: "You overspend 2-3 times per month",
    },
  ]

  const profileColor = {
    "Financial Master": "from-green-500 to-emerald-600",
    "Cautious Saver": "from-blue-500 to-cyan-600",
    "Moderate Spender": "from-orange-500 to-amber-600",
    "Impulsive Shopper": "from-red-500 to-pink-600",
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white overflow-hidden">
        <div
          className={`bg-gradient-to-r ${profileColor[profile as keyof typeof profileColor] || "from-amber-500 to-orange-500"} p-6 text-white`}
        >
          <h3 className="text-2xl font-bold mb-2">Pattern Analysis Results</h3>
          <p className="text-sm opacity-90">Based on your quiz answers and spending behavior</p>
        </div>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {patterns.map((pattern, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-2xl mb-2">{pattern.icon}</p>
                <p className="text-xs text-gray-600 mb-1">{pattern.name}</p>
                <p className="font-bold text-gray-800">{pattern.value}</p>
                <p className="text-xs text-gray-500 mt-2">{pattern.insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📈</span> Weekly Spending Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Line type="monotone" dataKey="spending" stroke="#f97316" strokeWidth={2} name="Your Spending" />
              <Line
                type="monotone"
                dataKey="budget"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Budget"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <p className="font-semibold text-green-900 mb-1">Strength</p>
            <p className="text-sm text-green-800">
              You maintain consistent spending patterns and rarely overspend significantly.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <p className="font-semibold text-yellow-900 mb-1">Opportunity</p>
            <p className="text-sm text-yellow-800">
              Weekend spending is 25% higher than weekdays. Consider planning ahead for weekend activities.
            </p>
          </div>
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="font-semibold text-blue-900 mb-1">Recommendation</p>
            <p className="text-sm text-blue-800">
              Cut entertainment spending by 15% to unlock $127/month in additional savings.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
