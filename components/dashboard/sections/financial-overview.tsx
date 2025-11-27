"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface FinancialOverviewProps {
  salary: number
  totalExpenses: number
  availableForSaving: number
}

export function FinancialOverview({ salary, totalExpenses, availableForSaving }: FinancialOverviewProps) {
  const data = [
    { name: "Income", value: salary, fill: "#a78bfa" },
    { name: "Expenses", value: totalExpenses, fill: "#ef4444" },
    { name: "Available", value: availableForSaving, fill: "#22d3ee" },
  ]

  return (
    <Card className="bg-slate-900 border-purple-700 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <span>📊</span> Financial Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
            <XAxis dataKey="name" stroke="#a78bfa" />
            <YAxis stroke="#a78bfa" />
            <Tooltip
              formatter={(value) => `₹${value.toLocaleString()}`}
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #a78bfa",
                borderRadius: "8px",
                color: "#22d3ee",
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
