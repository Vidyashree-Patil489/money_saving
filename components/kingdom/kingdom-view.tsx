"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CitizenRoster } from "./citizen-roster"
import { KingdomStats } from "./kingdom-stats"
import { KingdomMap } from "./kingdom-map"
import { TreasuryManagement } from "./treasury-management"

interface KingdomViewProps {
  userRank: string
  savings: number
  monthlyIncome: number
}

export function KingdomView({ userRank, savings, monthlyIncome }: KingdomViewProps) {
  const [kingdomLevel, setKingdomLevel] = useState(1)
  const [populationHappiness, setPopulationHappiness] = useState(85)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>👑</span> Your Kingdom
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Your Rank</p>
              <p className="text-2xl font-bold text-amber-700">{userRank}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Kingdom Level</p>
              <p className="text-2xl font-bold text-orange-700">{kingdomLevel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Population Happiness</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full"
                    style={{ width: `${populationHappiness}%` }}
                  />
                </div>
                <span className="text-lg font-bold text-green-600">{populationHappiness}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <KingdomStats savings={savings} monthlyIncome={monthlyIncome} citizenCount={1} buildings={3} />
      </div>

      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="map">Kingdom Map</TabsTrigger>
          <TabsTrigger value="citizens">Citizens</TabsTrigger>
          <TabsTrigger value="treasury">Treasury</TabsTrigger>
          <TabsTrigger value="upgrades">Upgrades</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-6">
          <KingdomMap kingdomLevel={kingdomLevel} />
        </TabsContent>

        <TabsContent value="citizens" className="mt-6">
          <CitizenRoster rank={userRank} />
        </TabsContent>

        <TabsContent value="treasury" className="mt-6">
          <TreasuryManagement savings={savings} monthlyIncome={monthlyIncome} />
        </TabsContent>

        <TabsContent value="upgrades" className="mt-6">
          <KingdomUpgrades kingdomLevel={kingdomLevel} savings={savings} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface KingdomUpgradesProps {
  kingdomLevel: number
  savings: number
}

function KingdomUpgrades({ kingdomLevel, savings }: KingdomUpgradesProps) {
  const upgrades = [
    {
      name: "Grand Library",
      cost: 5000,
      level: 1,
      description: "Unlock financial education courses",
      icon: "📚",
      status: "available",
    },
    {
      name: "Market Square",
      cost: 10000,
      level: 2,
      description: "Attract merchants and boost savings",
      icon: "🏪",
      status: "locked",
    },
    {
      name: "Treasury Vault",
      cost: 25000,
      level: 3,
      description: "Increase savings capacity",
      icon: "🏦",
      status: "locked",
    },
    {
      name: "Royal Observatory",
      cost: 50000,
      level: 4,
      description: "Predict market trends",
      icon: "🔭",
      status: "locked",
    },
  ]

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🏗️</span> Kingdom Upgrades
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upgrades.map((upgrade, idx) => (
            <div
              key={idx}
              className={`p-4 border-2 rounded-lg ${
                upgrade.status === "available"
                  ? "border-green-400 bg-green-50"
                  : upgrade.status === "locked"
                    ? "border-gray-300 bg-gray-50 opacity-60"
                    : "border-amber-300 bg-amber-50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{upgrade.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{upgrade.name}</h4>
                    <p className="text-sm text-gray-600">{upgrade.description}</p>
                  </div>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Lvl {upgrade.level}</span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-amber-600">${upgrade.cost.toLocaleString()}</span>
                <button
                  disabled={upgrade.status !== "available" || savings < upgrade.cost}
                  className={`px-3 py-1 rounded text-sm font-medium transition ${
                    upgrade.status === "available" && savings >= upgrade.cost
                      ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {upgrade.status === "locked" ? "Locked" : savings >= upgrade.cost ? "Build" : "Insufficient Funds"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
