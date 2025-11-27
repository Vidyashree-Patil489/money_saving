"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedDate?: string
}

interface BadgesProps {
  badges: Badge[]
}

export function Badges({ badges }: BadgesProps) {
  const unlockedCount = badges.filter((b) => b.unlocked).length
  const totalCount = badges.length

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🏅</span> Badges ({unlockedCount}/{totalCount})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`flex flex-col items-center justify-center p-3 rounded-lg text-center transition ${
                badge.unlocked
                  ? "bg-amber-50 border-2 border-amber-300 hover:shadow-lg"
                  : "bg-gray-100 border-2 border-gray-300 opacity-50"
              }`}
              title={badge.description}
            >
              <div className="text-3xl mb-1">{badge.icon}</div>
              <p className="text-xs font-semibold text-gray-700">{badge.name}</p>
              {badge.unlocked && badge.unlockedDate && (
                <p className="text-xs text-gray-500 mt-1">{badge.unlockedDate}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
