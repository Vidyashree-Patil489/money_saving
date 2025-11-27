"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Goal {
  title: string
  amount: number
}

interface GoalTrackerProps {
  shortTermGoals: Goal[]
  longTermGoals: Goal[]
  monthlyAvailable: number
}

export function GoalTracker({ shortTermGoals, longTermGoals, monthlyAvailable }: GoalTrackerProps) {
  const renderGoalCard = (goal: Goal, type: "short" | "long") => {
    const months = type === "short" ? 6 : 24
    const monthlyRequired = goal.amount / months

    return (
      <div
        key={goal.title}
        className="p-4 border border-purple-600 rounded-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all bg-gradient-to-br from-slate-800 to-slate-900 animate-bounce-in"
      >
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-semibold text-cyan-400">{goal.title}</h4>
          <span
            className={`text-xs px-2 py-1 rounded font-semibold ${
              type === "short"
                ? "bg-blue-900 text-blue-300 border border-blue-500"
                : "bg-purple-900 text-purple-300 border border-purple-500"
            }`}
          >
            {type === "short" ? "Short-term" : "Long-term"}
          </span>
        </div>
        <p className="text-sm text-purple-300 mb-3">Target: ₹{goal.amount.toLocaleString()}</p>
        <div className="bg-slate-700 rounded-full h-2 overflow-hidden mb-3 border border-purple-500">
          <div
            className={`h-full ${
              type === "short"
                ? "bg-gradient-to-r from-cyan-400 to-cyan-600"
                : "bg-gradient-to-r from-purple-400 to-purple-600"
            }`}
            style={{ width: "35%" }}
          />
        </div>
        <p className="text-xs text-purple-400">
          Monthly savings needed: ₹{monthlyRequired.toFixed(2)}
          {monthlyRequired > monthlyAvailable && <span className="text-red-400 ml-2">⚠️ Exceeds available savings</span>}
        </p>
      </div>
    )
  }

  return (
    <Card className="bg-slate-900 border-purple-700 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <span>🏆</span> Goals Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="short" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800 border border-purple-700">
            <TabsTrigger
              value="short"
              className="text-purple-300 data-[state=active]:text-cyan-400 data-[state=active]:bg-purple-700"
            >
              Short-term
            </TabsTrigger>
            <TabsTrigger
              value="long"
              className="text-purple-300 data-[state=active]:text-cyan-400 data-[state=active]:bg-purple-700"
            >
              Long-term
            </TabsTrigger>
          </TabsList>
          <TabsContent value="short" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shortTermGoals.map((goal) => renderGoalCard(goal, "short"))}
            </div>
          </TabsContent>
          <TabsContent value="long" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {longTermGoals.map((goal) => renderGoalCard(goal, "long"))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
