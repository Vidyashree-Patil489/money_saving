"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FinancialOverview } from "./sections/financial-overview"
import { SavingsProgress } from "./sections/savings-progress"
import { ExpenseBreakdown } from "./sections/expense-breakdown"
import { GoalTracker } from "./sections/goal-tracker"
import { AssetsDebts } from "./sections/assets-debts"
import { Menu, LogOut, Mail } from "lucide-react"
import { GamificationHub } from "../gamification/gamification-hub"
import { SpendingScannerHub } from "../spending-scanner/spending-scanner-hub"
import { KingdomView } from "../kingdom/kingdom-view"
import { KingMessages } from "../king/king-messages"

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [onboardingData, setOnboardingData] = useState<any>(null)
  const [showMessages, setShowMessages] = useState(false)

  useEffect(() => {
    setOnboardingData({
      monthlySalary: 50000,
      mandatoryExpenses: [
        { title: "Rent", amount: 15000 },
        { title: "Insurance", amount: 2000 },
        { title: "Utilities", amount: 1500 },
      ],
      optionalExpenses: [
        { title: "Entertainment", amount: 3000 },
        { title: "Shopping", amount: 2000 },
        { title: "Dining", amount: 2500 },
      ],
      shortTermGoals: [
        { title: "Emergency Fund", amount: 30000 },
        { title: "Vacation", amount: 20000 },
      ],
      longTermGoals: [
        { title: "House Down Payment", amount: 500000 },
        { title: "Retirement", amount: 1000000 },
      ],
      assets: 100000,
      debts: 50000,
      savings: 80000,
    })
  }, [])

  const handleLogout = () => {
    window.location.reload()
  }

  if (!onboardingData) {
    return <div className="flex items-center justify-center min-h-screen text-purple-300">Loading your kingdom...</div>
  }

  const totalMandatory = onboardingData.mandatoryExpenses.reduce((sum: number, exp: any) => sum + exp.amount, 0)
  const totalOptional = onboardingData.optionalExpenses.reduce((sum: number, exp: any) => sum + exp.amount, 0)
  const totalExpenses = totalMandatory + totalOptional
  const availableForSaving = onboardingData.monthlySalary - totalExpenses
  const savingsRate = (availableForSaving / onboardingData.monthlySalary) * 100

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-purple-900 to-purple-950 border-r border-purple-700 text-white transition-all duration-300 shadow-xl shadow-purple-900/50 fixed h-screen overflow-y-auto`}
      >
        <div className="p-4 border-b border-purple-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Kingdom
              </h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-purple-800 rounded-lg transition"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <NavItem icon="📊" label="Dashboard" open={sidebarOpen} />
          <NavItem icon="👑" label="Kingdom" open={sidebarOpen} />
          <NavItem icon="🎯" label="Goals" open={sidebarOpen} />
          <NavItem icon="📈" label="Spending" open={sidebarOpen} />
          <NavItem icon="🎮" label="Challenges" open={sidebarOpen} />
          <button
            onClick={() => setShowMessages(!showMessages)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg hover:bg-purple-800 transition text-left ${
              showMessages ? "bg-purple-800" : ""
            }`}
          >
            <Mail size={20} />
            {sidebarOpen && <span className="text-sm">Messages</span>}
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 w-full p-2 hover:bg-purple-800 rounded-lg transition text-cyan-400 hover:text-cyan-300 ${
              !sidebarOpen && "justify-center"
            }`}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`${sidebarOpen ? "ml-64" : "ml-20"} flex-1 p-8 overflow-auto transition-all`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Welcome, Citizen
            </h1>
            <p className="text-purple-300 mt-2">Manage your wealth and grow your kingdom</p>
          </div>

          {showMessages && (
            <div className="mb-8">
              <KingMessages
                savingsRate={savingsRate}
                spendingTrend="stable"
                userRank="Gold Advisor"
                streak={7}
                totalChallengesCompleted={3}
              />
            </div>
          )}

          <div className="mb-8">
            <GamificationHub salary={onboardingData.monthlySalary} savings={Number.parseInt(onboardingData.savings)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-slate-900 border-l-4 border-purple-500 hover:border-cyan-400 transition-colors shadow-lg animate-bounce-in">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Monthly Income</p>
                    <p className="text-3xl font-bold text-cyan-400 mt-2">
                      ₹{onboardingData.monthlySalary.toLocaleString()}
                    </p>
                  </div>
                  <span className="text-3xl">💰</span>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-slate-900 border-l-4 border-red-500 hover:border-red-400 transition-colors shadow-lg animate-bounce-in"
              style={{ animationDelay: "0.1s" }}
            >
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Total Expenses</p>
                    <p className="text-3xl font-bold text-red-400 mt-2">₹{totalExpenses.toLocaleString()}</p>
                  </div>
                  <span className="text-3xl">📉</span>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-slate-900 border-l-4 border-green-500 hover:border-green-400 transition-colors shadow-lg animate-bounce-in"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Available to Save</p>
                    <p className="text-3xl font-bold text-green-400 mt-2">₹{availableForSaving.toLocaleString()}</p>
                  </div>
                  <span className="text-3xl">📈</span>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-slate-900 border-l-4 border-cyan-500 hover:border-purple-400 transition-colors shadow-lg animate-bounce-in"
              style={{ animationDelay: "0.3s" }}
            >
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Current Savings</p>
                    <p className="text-3xl font-bold text-cyan-400 mt-2">₹{onboardingData.savings.toLocaleString()}</p>
                  </div>
                  <span className="text-3xl">🏦</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <FinancialOverview
                salary={onboardingData.monthlySalary}
                totalExpenses={totalExpenses}
                availableForSaving={availableForSaving}
              />
            </div>
            <AssetsDebts
              assets={Number.parseInt(onboardingData.assets)}
              debts={Number.parseInt(onboardingData.debts)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ExpenseBreakdown
              mandatoryExpenses={onboardingData.mandatoryExpenses}
              optionalExpenses={onboardingData.optionalExpenses}
            />
            <SavingsProgress
              currentSavings={Number.parseInt(onboardingData.savings)}
              goals={onboardingData.shortTermGoals}
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Kingdom Management
            </h2>
            <KingdomView
              userRank="Gold Advisor"
              savings={Number.parseInt(onboardingData.savings)}
              monthlyIncome={onboardingData.monthlySalary}
            />
          </div>

          <div>
            <GoalTracker
              shortTermGoals={onboardingData.shortTermGoals}
              longTermGoals={onboardingData.longTermGoals}
              monthlyAvailable={availableForSaving}
            />
          </div>

          <div id="spending-scanner" className="mb-8">
            <SpendingScannerHub />
          </div>
        </div>
      </main>
    </div>
  )
}

interface NavItemProps {
  icon: string
  label: string
  open: boolean
}

function NavItem({ icon, label, open }: NavItemProps) {
  return (
    <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-purple-800 transition text-left hover:text-cyan-300">
      <span className="text-xl">{icon}</span>
      {open && <span className="text-sm">{label}</span>}
    </button>
  )
}
