"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AssetStepProps {
  assets: string
  debts: string
  savings: string
  onUpdate: (assets: string, debts: string, savings: string) => void
}

export function AssetStep({ assets, debts, savings, onUpdate }: AssetStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="assets" className="text-base font-semibold text-purple-300">
          Total Assets
        </Label>
        <div className="relative mt-2">
          <span className="absolute left-3 top-3 text-cyan-400 text-lg font-bold">₹</span>
          <Input
            id="assets"
            type="number"
            placeholder="0.00"
            value={assets}
            onChange={(e) => onUpdate(e.target.value, debts, savings)}
            className="pl-8 text-lg py-6 bg-slate-800 border-purple-500 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400"
          />
        </div>
        <p className="text-xs text-purple-300 mt-1">e.g., Investments, Property, Valuables</p>
      </div>

      <div>
        <Label htmlFor="debts" className="text-base font-semibold text-purple-300">
          Total Debts
        </Label>
        <div className="relative mt-2">
          <span className="absolute left-3 top-3 text-red-400 text-lg font-bold">₹</span>
          <Input
            id="debts"
            type="number"
            placeholder="0.00"
            value={debts}
            onChange={(e) => onUpdate(assets, e.target.value, savings)}
            className="pl-8 text-lg py-6 bg-slate-800 border-purple-500 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400"
          />
        </div>
        <p className="text-xs text-purple-300 mt-1">e.g., Loans, Credit Cards, Mortgages</p>
      </div>

      <div>
        <Label htmlFor="savings" className="text-base font-semibold text-purple-300">
          Current Savings
        </Label>
        <div className="relative mt-2">
          <span className="absolute left-3 top-3 text-green-400 text-lg font-bold">₹</span>
          <Input
            id="savings"
            type="number"
            placeholder="0.00"
            value={savings}
            onChange={(e) => onUpdate(assets, debts, e.target.value)}
            className="pl-8 text-lg py-6 bg-slate-800 border-purple-500 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400"
          />
        </div>
        <p className="text-xs text-purple-300 mt-1">e.g., Emergency Fund, Bank Accounts</p>
      </div>
    </div>
  )
}
