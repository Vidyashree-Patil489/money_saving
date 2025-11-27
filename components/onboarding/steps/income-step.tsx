"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface IncomeStepProps {
  value: string
  onChange: (value: string) => void
}

export function IncomeStep({ value, onChange }: IncomeStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="salary" className="text-base font-semibold text-purple-300">
          Monthly Salary / Income
        </Label>
        <div className="relative mt-2">
          <span className="absolute left-3 top-3 text-cyan-400 text-lg font-bold">₹</span>
          <Input
            id="salary"
            type="number"
            placeholder="0.00"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-8 text-lg py-6 bg-slate-800 border-purple-500 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400"
          />
        </div>
      </div>
      <p className="text-sm text-purple-300">
        This will be the base for calculating your savings potential and financial goals.
      </p>
    </div>
  )
}
