"use client"

import { Card, CardContent } from "@/components/ui/card"

interface KingdomStatsProps {
  savings: number
  monthlyIncome: number
  citizenCount: number
  buildings: number
}

export function KingdomStats({ savings, monthlyIncome, citizenCount, buildings }: KingdomStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-1">Treasury</p>
          <p className="text-2xl font-bold text-blue-600">${savings.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">Kingdom wealth</p>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
          <p className="text-2xl font-bold text-green-600">${monthlyIncome.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">Kingdom revenue</p>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-1">Population</p>
          <p className="text-2xl font-bold text-purple-600">{citizenCount}</p>
          <p className="text-xs text-gray-500 mt-2">Active citizens</p>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-1">Buildings</p>
          <p className="text-2xl font-bold text-orange-600">{buildings}</p>
          <p className="text-xs text-gray-500 mt-2">Constructed</p>
        </CardContent>
      </Card>
    </div>
  )
}
