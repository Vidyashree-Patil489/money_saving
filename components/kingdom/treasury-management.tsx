"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TreasuryManagementProps {
  savings: number
  monthlyIncome: number
}

export function TreasuryManagement({ savings, monthlyIncome }: TreasuryManagementProps) {
  const treasuryHistory = [
    { month: "Jan", amount: 2000 },
    { month: "Feb", amount: 3500 },
    { month: "Mar", amount: 5200 },
    { month: "Apr", amount: 6800 },
    { month: "May", amount: 7500 },
    { month: "Jun", amount: 8000 },
  ]

  const allocations = [
    { category: "Emergency Fund", amount: 3000, percentage: 37.5, icon: "🆘" },
    { category: "Short-term Goals", amount: 2500, percentage: 31.25, icon: "🎯" },
    { category: "Investments", amount: 1500, percentage: 18.75, icon: "📈" },
    { category: "Contingency", amount: 1000, percentage: 12.5, icon: "🛡️" },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>💰</span> Treasury Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Total Treasury</p>
              <p className="text-3xl font-bold text-blue-600">${savings.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
              <p className="text-3xl font-bold text-green-600">${monthlyIncome.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Monthly Growth Rate</p>
              <p className="text-3xl font-bold text-purple-600">
                {((monthlyIncome / (savings || 1)) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Treasury Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={treasuryHistory}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Area type="monotone" dataKey="amount" stroke="#f59e0b" fillOpacity={1} fill="url(#colorAmount)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📊</span> Fund Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {allocations.map((alloc, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{alloc.icon}</span>
                    <span className="font-medium text-gray-800">{alloc.category}</span>
                  </div>
                  <span className="font-bold text-gray-800">${alloc.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full"
                      style={{ width: `${alloc.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{alloc.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
