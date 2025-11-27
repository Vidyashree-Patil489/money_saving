"use client"

import { useState } from "react"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { Dashboard } from "@/components/dashboard/dashboard"
import { LoginPage } from "@/components/auth/login-page"
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs"
import { SpendingScannerHub } from "@/components/spending-scanner/spending-scanner-hub"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOnboarded, setIsOnboarded] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
  }

  if (!isOnboarded) {
    return <OnboardingFlow onComplete={() => setIsOnboarded(true)} />
  }

  return (
    <div className="min-h-screen">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="hidden" />
        <TabsContent value="dashboard" className="m-0">
          <Dashboard />
        </TabsContent>
        <TabsContent value="spending-scanner" className="m-0">
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Spending Pattern Scanner
                </h1>
                <p className="text-purple-300 mt-2">
                  Analyze your spending habits and get personalized recommendations
                </p>
              </div>
              <SpendingScannerHub />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
