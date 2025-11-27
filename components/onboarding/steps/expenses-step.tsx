"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

interface Expense {
  title: string
  amount: number
}

interface ExpensesStepProps {
  expenses: Expense[]
  title: string
  placeholder: string
  onChange: (expenses: Expense[]) => void
}

export function ExpensesStep({ expenses, title, placeholder, onChange }: ExpensesStepProps) {
  const [newExpense, setNewExpense] = useState({ title: "", amount: "" })

  const addExpense = () => {
    if (newExpense.title && newExpense.amount) {
      onChange([...expenses, { title: newExpense.title, amount: Number.parseFloat(newExpense.amount) }])
      setNewExpense({ title: "", amount: "" })
    }
  }

  const removeExpense = (index: number) => {
    onChange(expenses.filter((_, i) => i !== index))
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold block text-purple-300">{title}</Label>
      <div className="space-y-2 max-h-64 overflow-y-auto mb-3">
        {expenses.map((expense, idx) => (
          <Card
            key={idx}
            className="p-3 flex justify-between items-center bg-slate-800 border-purple-500 hover:border-cyan-400 transition-colors"
          >
            <div>
              <p className="font-medium text-cyan-400">{expense.title}</p>
              <p className="text-sm text-purple-300">₹{expense.amount.toLocaleString()}</p>
            </div>
            <button onClick={() => removeExpense(idx)} className="text-red-400 hover:text-red-300 transition-colors">
              <Trash2 size={18} />
            </button>
          </Card>
        ))}
      </div>
      <div className="flex gap-2 mb-3">
        <Input
          placeholder={placeholder}
          value={newExpense.title}
          onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
          className="bg-slate-800 border-purple-500 text-white placeholder:text-slate-500 focus:border-cyan-400"
        />
        <Input
          placeholder="Amount"
          type="number"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          className="w-32 bg-slate-800 border-purple-500 text-white placeholder:text-slate-500 focus:border-cyan-400"
        />
        <Button
          onClick={addExpense}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          Add
        </Button>
      </div>
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-3 rounded-lg border border-purple-500">
        <p className="text-sm text-purple-300">Total {title}</p>
        <p className="text-2xl font-bold text-cyan-400">₹{totalExpenses.toLocaleString()}</p>
      </div>
    </div>
  )
}
