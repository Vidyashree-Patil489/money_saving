"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface KingdomMapProps {
  kingdomLevel: number
}

export function KingdomMap({ kingdomLevel }: KingdomMapProps) {
  const buildings = [
    { name: "Royal Palace", icon: "🏰", pos: "top-1/4 left-1/4", level: 1 },
    { name: "Treasury", icon: "🏦", pos: "top-1/4 right-1/4", level: 1 },
    { name: "Market Square", icon: "🏪", pos: "bottom-1/4 left-1/3", level: kingdomLevel >= 2 ? 1 : 0 },
    { name: "Library", icon: "📚", pos: "bottom-1/4 right-1/3", level: 1 },
    { name: "Training Grounds", icon: "⚔️", pos: "top-1/2 left-1/2 -translate-x-1/2", level: 1 },
  ]

  return (
    <Card className="bg-white overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🗺️</span> Your Kingdom
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-96 bg-gradient-to-b from-blue-100 to-green-100 rounded-lg border-2 border-green-300 overflow-hidden">
          {/* Sky and terrain */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full" />
          </div>

          {/* Buildings */}
          {buildings.map(
            (building, idx) =>
              building.level > 0 && (
                <div
                  key={idx}
                  className={`absolute ${building.pos} transform -translate-x-1/2 -translate-y-1/2 text-center group`}
                >
                  <div className="text-4xl mb-1 transition-transform group-hover:scale-110">{building.icon}</div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {building.name}
                  </div>
                </div>
              ),
          )}

          {/* Ground details */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-green-600 via-green-500 to-green-600 opacity-40" />
        </div>

        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Kingdom Level {kingdomLevel}:</span> Unlock new buildings and upgrades by
            increasing your rank and saving more money!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
