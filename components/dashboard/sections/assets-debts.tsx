"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AssetsDebtsProps {
  assets: number
  debts: number
}

export function AssetsDebts({ assets, debts }: AssetsDebtsProps) {
  const netWorth = assets - debts

  return (
    <Card className="bg-slate-900 border-purple-700 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <span>💎</span> Net Worth
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gradient-to-br from-green-950 to-green-900 rounded-lg border-l-4 border-green-500 hover:border-green-400 transition-colors">
          <p className="text-sm text-green-300">Total Assets</p>
          <p className="text-2xl font-bold text-green-400 mt-1">₹{assets.toLocaleString()}</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-red-950 to-red-900 rounded-lg border-l-4 border-red-500 hover:border-red-400 transition-colors">
          <p className="text-sm text-red-300">Total Debts</p>
          <p className="text-2xl font-bold text-red-400 mt-1">₹{debts.toLocaleString()}</p>
        </div>

        <div
          className={`p-4 rounded-lg border-l-4 ${
            netWorth >= 0
              ? "bg-gradient-to-br from-cyan-950 to-cyan-900 border-cyan-500 hover:border-cyan-400"
              : "bg-gradient-to-br from-orange-950 to-orange-900 border-orange-500 hover:border-orange-400"
          } transition-colors`}
        >
          <p className={`text-sm ${netWorth >= 0 ? "text-cyan-300" : "text-orange-300"}`}>Net Worth</p>
          <p className={`text-2xl font-bold mt-1 ${netWorth >= 0 ? "text-cyan-400" : "text-orange-400"}`}>
            ₹{netWorth.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
