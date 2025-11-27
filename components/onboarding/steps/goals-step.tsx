"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

interface Goal {
  title: string
  amount: number
}

interface GoalsStepProps {
  shortTermGoals: Goal[]
  longTermGoals: Goal[]
  onUpdate: (shortTerm: Goal[], longTerm: Goal[]) => void
}

export function GoalsStep({ shortTermGoals, longTermGoals, onUpdate }: GoalsStepProps) {
  const [newShortGoal, setNewShortGoal] = useState({ title: "", amount: "" })
  const [newLongGoal, setNewLongGoal] = useState({ title: "", amount: "" })

  const addShortTermGoal = () => {
    if (newShortGoal.title && newShortGoal.amount) {
      onUpdate(
        [...shortTermGoals, { title: newShortGoal.title, amount: Number.parseFloat(newShortGoal.amount) }],
        longTermGoals,
      )
      setNewShortGoal({ title: "", amount: "" })
    }
  }

  const addLongTermGoal = () => {
    if (newLongGoal.title && newLongGoal.amount) {
      onUpdate(shortTermGoals, [
        ...longTermGoals,
        { title: newLongGoal.title, amount: Number.parseFloat(newLongGoal.amount) },
      ])
      setNewLongGoal({ title: "", amount: "" })
    }
  }

  const removeGoal = (type: "short" | "long", index: number) => {
    if (type === "short") {
      onUpdate(
        shortTermGoals.filter((_, i) => i !== index),
        longTermGoals,
      )
    } else {
      onUpdate(
        shortTermGoals,
        longTermGoals.filter((_, i) => i !== index),
      )
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold block mb-3 text-purple-300">Short-term Goals (1-12 months)</Label>
        <div className="space-y-2 mb-3">
          {shortTermGoals.map((goal, idx) => (
            <Card
              key={idx}
              className="p-3 flex justify-between items-center bg-slate-800 border-cyan-500 hover:border-purple-400 transition-colors"
            >
              <div>
                <p className="font-medium text-cyan-400">{goal.title}</p>
                <p className="text-sm text-purple-300">₹{goal.amount.toLocaleString()}</p>
              </div>
              <button
                onClick={() => removeGoal("short", idx)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </Card>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Goal title (e.g., Emergency Fund)"
            value={newShortGoal.title}
            onChange={(e) => setNewShortGoal({ ...newShortGoal, title: e.target.value })}
            className="bg-slate-800 border-purple-500 text-white placeholder:text-slate-500 focus:border-cyan-400"
          />
          <Input
            placeholder="Amount"
            type="number"
            value={newShortGoal.amount}
            onChange={(e) => setNewShortGoal({ ...newShortGoal, amount: e.target.value })}
            className="w-32 bg-slate-800 border-purple-500 text-white placeholder:text-slate-500 focus:border-cyan-400"
          />
          <Button
            onClick={addShortTermGoal}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
          >
            Add
          </Button>
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold block mb-3 text-purple-300">Long-term Goals (1+ years)</Label>
        <div className="space-y-2 mb-3">
          {longTermGoals.map((goal, idx) => (
            <Card
              key={idx}
              className="p-3 flex justify-between items-center bg-slate-800 border-purple-500 hover:border-cyan-400 transition-colors"
            >
              <div>
                <p className="font-medium text-cyan-400">{goal.title}</p>
                <p className="text-sm text-purple-300">₹{goal.amount.toLocaleString()}</p>
              </div>
              <button
                onClick={() => removeGoal("long", idx)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </Card>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Goal title (e.g., Buy a House)"
            value={newLongGoal.title}
            onChange={(e) => setNewLongGoal({ ...newLongGoal, title: e.target.value })}
            className="bg-slate-800 border-purple-500 text-white placeholder:text-slate-500 focus:border-cyan-400"
          />
          <Input
            placeholder="Amount"
            type="number"
            value={newLongGoal.amount}
            onChange={(e) => setNewLongGoal({ ...newLongGoal, amount: e.target.value })}
            className="w-32 bg-slate-800 border-purple-500 text-white placeholder:text-slate-500 focus:border-cyan-400"
          />
          <Button
            onClick={addLongTermGoal}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
