"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginPageProps {
  onLoginSuccess: () => void
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onLoginSuccess()
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse" />
      </div>

      <Card className="w-full max-w-md border-0 shadow-2xl bg-slate-900 relative z-10 animate-bounce-in">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl text-center">{isSignUp ? "Create Account" : "Kingdom Finances"}</CardTitle>
          <CardDescription className="text-purple-100 text-center mt-2">
            {isSignUp ? "Join the financial kingdom" : "Enter your realm"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-purple-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@kingdom.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 bg-slate-800 border-purple-500 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-purple-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 bg-slate-800 border-purple-500 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded text-red-300 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-6 rounded-lg transition-all hover:shadow-lg hover:shadow-purple-500/50"
            >
              {isLoading ? "Entering Kingdom..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-purple-300 text-sm">
              {isSignUp ? "Already have an account?" : "New to Kingdom Finances?"}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError("")
                }}
                className="text-cyan-400 hover:text-cyan-300 ml-2 font-semibold transition-colors"
              >
                {isSignUp ? "Sign In" : "Create Account"}
              </button>
            </p>
          </div>

          <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-purple-500 border-opacity-30">
            <p className="text-xs text-purple-300">
              Demo: Use any email and password (min 6 chars) to enter the Kingdom
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
