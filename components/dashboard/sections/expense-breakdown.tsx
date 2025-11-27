"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface ExpenseBreakdownProps {
  mandatoryExpenses: Array<{ title: string; amount: number }>
  optionalExpenses: Array<{ title: string; amount: number }>
}

export function ExpenseBreakdown({ mandatoryExpenses, optionalExpenses }: ExpenseBreakdownProps) {
  const data = [
    {
      name: "Mandatory",
      value: mandatoryExpenses.reduce((sum, exp) => sum + exp.amount, 0),
      fill: "#ef4444",
    },
    {
      name: "Optional",
      value: optionalExpenses.reduce((sum, exp) => sum + exp.amount, 0),
      fill: "#f97316",
    },
  ]

  return (
    <Card className="bg-slate-900 border-purple-700 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <span>💸</span> Expense Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderLabel} outerRadius={100}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `₹${value.toLocaleString()}`}
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #a78bfa",
                borderRadius: "8px",
                color: "#22d3ee",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-6 space-y-3">
          <div>
            <h4 className="font-semibold text-red-400 mb-2">Mandatory Expenses</h4>
            <div className="space-y-1">
              {mandatoryExpenses.map((exp, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-sm text-purple-300 hover:text-cyan-300 transition-colors"
                >
                  <span>{exp.title}</span>
                  <span className="font-medium">₹{exp.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-orange-400 mb-2">Optional Expenses</h4>
            <div className="space-y-1">
              {optionalExpenses.map((exp, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-sm text-purple-300 hover:text-cyan-300 transition-colors"
                >
                  <span>{exp.title}</span>
                  <span className="font-medium">₹{exp.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function renderLabel(entry: any) {
  return `${entry.name}: ₹${entry.value.toLocaleString()}`
}
