"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface QuizQuestion {
  id: string
  question: string
  answers: {
    text: string
    score: number
  }[]
}

interface SpendingQuizProps {
  onComplete: (score: number, profile: string) => void
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    question: "How often do you check your bank account?",
    answers: [
      { text: "Multiple times a day", score: 10 },
      { text: "Once a day", score: 8 },
      { text: "A few times a week", score: 5 },
      { text: "Rarely or never", score: 0 },
    ],
  },
  {
    id: "2",
    question: "Do you make a shopping list before going to the store?",
    answers: [
      { text: "Always, and I stick to it", score: 10 },
      { text: "Usually, but I add items", score: 7 },
      { text: "Sometimes", score: 4 },
      { text: "Never, I just buy what I want", score: 0 },
    ],
  },
  {
    id: "3",
    question: "When you see something you want, what do you do?",
    answers: [
      { text: "Wait 30 days before buying", score: 10 },
      { text: "Think about it for a few days", score: 7 },
      { text: "Buy it if I have enough money", score: 4 },
      { text: "Buy it immediately", score: 0 },
    ],
  },
  {
    id: "4",
    question: "How much of your income do you typically save?",
    answers: [
      { text: "30% or more", score: 10 },
      { text: "15-30%", score: 7 },
      { text: "5-15%", score: 4 },
      { text: "I spend everything", score: 0 },
    ],
  },
  {
    id: "5",
    question: "Do you use subscriptions you actively use?",
    answers: [
      { text: "I regularly review and cancel unused ones", score: 10 },
      { text: "I know most of them", score: 6 },
      { text: "I have some I rarely use", score: 3 },
      { text: "I don't even know how many I have", score: 0 },
    ],
  },
]

export function SpendingQuiz({ onComplete }: SpendingQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (score: number) => {
    const newScore = totalScore + score
    setTotalScore(newScore)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const getProfile = (score: number): string => {
    if (score >= 45) return "Financial Master"
    if (score >= 35) return "Cautious Saver"
    if (score >= 20) return "Moderate Spender"
    return "Impulsive Shopper"
  }

  const handleComplete = () => {
    const profile = getProfile(totalScore)
    onComplete(totalScore, profile)
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  if (showResults) {
    const profile = getProfile(totalScore)
    return (
      <Card className="bg-white">
        <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <CardTitle>Your Spending Profile</CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-2">You scored</p>
            <p className="text-5xl font-bold text-amber-600 mb-2">{totalScore}/50</p>
            <p className="text-2xl font-bold text-gray-800">{profile}</p>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">{getProfileDescription(profile)}</p>
          </div>

          <div className="space-y-3 mb-6">
            <p className="font-semibold text-gray-800">Recommendations:</p>
            {getRecommendations(profile).map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <p className="text-sm text-gray-700">{rec}</p>
              </div>
            ))}
          </div>

          <Button
            onClick={handleComplete}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            View My Pattern Analysis
          </Button>
        </CardContent>
      </Card>
    )
  }

  const question = quizQuestions[currentQuestion]

  return (
    <Card className="bg-white">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="flex justify-between items-start">
          <CardTitle>Spending Pattern Quiz</CardTitle>
          <span className="text-sm font-semibold">
            {currentQuestion + 1}/{quizQuestions.length}
          </span>
        </div>
        <Progress value={progress} className="mt-4 bg-amber-200" />
      </CardHeader>
      <CardContent className="pt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h3>

        <div className="space-y-3">
          {question.answers.map((answer, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(answer.score)}
              className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition"
            >
              <p className="font-medium text-gray-800">{answer.text}</p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function getProfileDescription(profile: string): string {
  const descriptions = {
    "Financial Master":
      "Excellent spending habits! You are disciplined, mindful of your finances, and make thoughtful purchasing decisions.",
    "Cautious Saver":
      "Good job! You show awareness of your spending and make an effort to save. A little more discipline could take you to the next level.",
    "Moderate Spender":
      "You have mixed spending habits. Try tracking expenses more carefully and setting clear budget goals.",
    "Impulsive Shopper":
      "Your spending habits need attention. Focus on delayed gratification and building a stronger savings routine.",
  }
  return descriptions[profile as keyof typeof descriptions] || ""
}

function getRecommendations(profile: string): string[] {
  const recommendations = {
    "Financial Master": [
      "Maintain your excellent habits",
      "Consider increasing your savings goals",
      "Help others improve their financial literacy",
      "Explore investment opportunities",
    ],
    "Cautious Saver": [
      "Implement the 50/30/20 budget rule",
      "Automate your savings",
      "Review subscriptions quarterly",
      "Set specific financial goals",
    ],
    "Moderate Spender": [
      "Start tracking every expense",
      "Use the 30-day rule for non-essentials",
      "Identify and cut unnecessary subscriptions",
      "Create a monthly budget",
    ],
    "Impulsive Shopper": [
      'Implement a "no-buy" month challenge',
      "Use cash instead of cards for discretionary spending",
      "Unsubscribe from shopping notifications",
      "Track your impulse purchases for one week",
    ],
  }
  return recommendations[profile as keyof typeof recommendations] || []
}
