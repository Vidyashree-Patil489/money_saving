"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CitizenRosterProps {
  rank: string
}

export function CitizenRoster({ rank }: CitizenRosterProps) {
  const citizens = [
    {
      name: "You",
      title: rank,
      icon: "👤",
      status: "Active",
      contribution: "$5,000",
      joinDate: "Nov 1, 2024",
    },
    {
      name: "Tax Collector",
      title: "Assistant",
      icon: "💼",
      status: "Active",
      contribution: "Collects taxes",
      joinDate: "Nov 5, 2024",
    },
    {
      name: "Budget Advisor",
      title: "Assistant",
      icon: "📊",
      status: "Unlocked",
      contribution: "Provides advice",
      joinDate: "When you reach Gold Advisor",
    },
    {
      name: "Investment Manager",
      title: "Assistant",
      icon: "📈",
      status: "Locked",
      contribution: "Manages investments",
      joinDate: "When you reach Diamond Magnate",
    },
  ]

  const getRoleColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700"
      case "Unlocked":
        return "bg-blue-100 text-blue-700"
      case "Locked":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>👥</span> Kingdom Citizens & Advisors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {citizens.map((citizen, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{citizen.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{citizen.name}</h4>
                    <p className="text-sm text-gray-600">{citizen.title}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded font-medium ${getRoleColor(citizen.status)}`}>
                  {citizen.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Contribution</p>
                  <p className="font-semibold text-gray-800">{citizen.contribution}</p>
                </div>
                <div>
                  <p className="text-gray-600">Since</p>
                  <p className="font-semibold text-gray-800">{citizen.joinDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="font-semibold text-blue-900 mb-2">How to unlock more citizens:</p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Reach Silver Merchant rank to recruit assistants</li>
            <li>• Reach Gold Advisor to unlock Budget Advisor</li>
            <li>• Reach Diamond Magnate for Investment Manager</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
