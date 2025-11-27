"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IncomeStep } from "./steps/income-step"
import { GoalsStep } from "./steps/goals-step"
import { ExpensesStep } from "./steps/expenses-step"
import { AssetStep } from "./steps/asset-step"

interface OnboardingFlowProps {
  onComplete: () => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    monthlySalary: "",
    shortTermGoals: [] as Array<{ title: string; amount: number }>,
    longTermGoals: [] as Array<{ title: string; amount: number }>,
    mandatoryExpenses: [] as Array<{ title: string; amount: number }>,
    optionalExpenses: [] as Array<{ title: string; amount: number }>,
    assets: "",
    debts: "",
    savings: "",
  })

  const steps = [
    {
      title: "Monthly Income",
      description: "Enter your monthly salary or income",
      component: (
        <IncomeStep
          value={formData.monthlySalary}
          onChange={(value) => setFormData({ ...formData, monthlySalary: value })}
        />
      ),
    },
    {
      title: "Set Your Goals",
      description: "Add your short-term and long-term financial goals",
      component: (
        <GoalsStep
          shortTermGoals={formData.shortTermGoals}
          longTermGoals={formData.longTermGoals}
          onUpdate={(short, long) => setFormData({ ...formData, shortTermGoals: short, longTermGoals: long })}
        />
      ),
    },
    {
      title: "Mandatory Expenses",
      description: "List your bills, fees, and taxes",
      component: (
        <ExpensesStep
          expenses={formData.mandatoryExpenses}
          title="Mandatory Expenses"
          placeholder="e.g., Rent, Insurance, Taxes"
          onChange={(expenses) => setFormData({ ...formData, mandatoryExpenses: expenses })}
        />
      ),
    },
    {
      title: "Optional Spending",
      description: "Add your shopping, entertainment, and hobby expenses",
      component: (
        <ExpensesStep
          expenses={formData.optionalExpenses}
          title="Optional Spending"
          placeholder="e.g., Shopping, Entertainment, Hobbies"
          onChange={(expenses) => setFormData({ ...formData, optionalExpenses: expenses })}
        />
      ),
    },
    {
      title: "Financial Assets",
      description: "Overview of your assets, debts, and current savings",
      component: (
        <AssetStep
          assets={formData.assets}
          debts={formData.debts}
          savings={formData.savings}
          onUpdate={(assets, debts, savings) => setFormData({ ...formData, assets, debts, savings })}
        />
      ),
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
      </div>

      <Card className="w-full max-w-2xl border-0 shadow-2xl bg-slate-900 relative z-10 animate-slide-in-left">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl">{steps[currentStep].title}</CardTitle>
              <CardDescription className="text-purple-100 mt-2">{steps[currentStep].description}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-cyan-300">{currentStep + 1}</div>
              <div className="text-sm text-purple-100">of {steps.length}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-8 pb-8">
          {steps[currentStep].component}
          <div className="flex justify-between mt-8 gap-4">
            <Button
              onClick={handlePrev}
              variant="outline"
              disabled={currentStep === 0}
              className="w-24 bg-transparent border-purple-500 text-purple-300 hover:bg-purple-900"
            >
              Back
            </Button>
            <div className="flex gap-2">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentStep ? "bg-cyan-400 w-8 animate-pulse-glow" : "bg-purple-600 w-2"
                  }`}
                />
              ))}
            </div>
            <Button
              onClick={handleNext}
              className="w-24 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 hover:shadow-lg hover:shadow-purple-500/50"
            >
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
