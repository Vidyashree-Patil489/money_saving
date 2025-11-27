"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Message {
  id: string
  sender: string
  title: string
  content: string
  type: "praise" | "warning" | "advice" | "celebration"
  date: string
  icon: string
  read: boolean
}

interface KingMessagesProps {
  savingsRate: number
  spendingTrend: "improving" | "declining" | "stable"
  userRank: string
  streak: number
  totalChallengesCompleted: number
}

export function KingMessages({
  savingsRate,
  spendingTrend,
  userRank,
  streak,
  totalChallengesCompleted,
}: KingMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const generatedMessages = generateMessages(savingsRate, spendingTrend, userRank, streak, totalChallengesCompleted)
    setMessages(generatedMessages)
    setUnreadCount(generatedMessages.filter((m) => !m.read).length)
  }, [savingsRate, spendingTrend, userRank, streak, totalChallengesCompleted])

  const handleMarkAsRead = (messageId: string) => {
    setMessages(messages.map((m) => (m.id === messageId ? { ...m, read: true } : m)))
    setUnreadCount(unreadCount - 1)
  }

  const praiseMessages = messages.filter((m) => m.type === "praise")
  const warningMessages = messages.filter((m) => m.type === "warning")
  const adviceMessages = messages.filter((m) => m.type === "advice")
  const celebrationMessages = messages.filter((m) => m.type === "celebration")

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-700 to-cyan-700 text-white overflow-hidden shadow-lg shadow-purple-500/50 animate-pulse-glow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Royal Messages from the King</CardTitle>
              <p className="text-purple-100 text-sm mt-2">Personalized guidance based on your financial behavior</p>
            </div>
            {unreadCount > 0 && (
              <div className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg shadow-red-500/50 animate-pulse">
                {unreadCount}
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-900 border border-purple-700">
          <TabsTrigger
            value="all"
            className="text-purple-300 data-[state=active]:text-cyan-400 data-[state=active]:bg-purple-700"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="praise"
            className="text-purple-300 data-[state=active]:text-cyan-400 data-[state=active]:bg-purple-700"
          >
            Praise
          </TabsTrigger>
          <TabsTrigger
            value="advice"
            className="text-purple-300 data-[state=active]:text-cyan-400 data-[state=active]:bg-purple-700"
          >
            Advice
          </TabsTrigger>
          <TabsTrigger
            value="warning"
            className="text-purple-300 data-[state=active]:text-cyan-400 data-[state=active]:bg-purple-700"
          >
            Warnings
          </TabsTrigger>
          <TabsTrigger
            value="celebration"
            className="text-purple-300 data-[state=active]:text-cyan-400 data-[state=active]:bg-purple-700"
          >
            Milestones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <MessageList messages={messages} onMarkAsRead={handleMarkAsRead} />
        </TabsContent>

        <TabsContent value="praise" className="mt-6">
          <MessageList messages={praiseMessages} onMarkAsRead={handleMarkAsRead} />
        </TabsContent>

        <TabsContent value="advice" className="mt-6">
          <MessageList messages={adviceMessages} onMarkAsRead={handleMarkAsRead} />
        </TabsContent>

        <TabsContent value="warning" className="mt-6">
          <MessageList messages={warningMessages} onMarkAsRead={handleMarkAsRead} />
        </TabsContent>

        <TabsContent value="celebration" className="mt-6">
          <MessageList messages={celebrationMessages} onMarkAsRead={handleMarkAsRead} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MessageListProps {
  messages: Message[]
  onMarkAsRead: (messageId: string) => void
}

function MessageList({ messages, onMarkAsRead }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <Card className="bg-slate-900 border-purple-700">
        <CardContent className="pt-8 pb-8 text-center">
          <p className="text-purple-400">No messages in this category yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {messages.map((message, idx) => (
        <MessageCard key={message.id} message={message} onMarkAsRead={onMarkAsRead} idx={idx} />
      ))}
    </div>
  )
}

interface MessageCardProps {
  message: Message
  onMarkAsRead: (messageId: string) => void
  idx?: number
}

function MessageCard({ message, onMarkAsRead, idx = 0 }: MessageCardProps) {
  const [expanded, setExpanded] = useState(!message.read)

  const typeColors = {
    praise: "border-green-600 bg-gradient-to-r from-green-950 to-green-900",
    warning: "border-red-600 bg-gradient-to-r from-red-950 to-red-900",
    advice: "border-cyan-600 bg-gradient-to-r from-cyan-950 to-cyan-900",
    celebration: "border-yellow-600 bg-gradient-to-r from-yellow-950 to-yellow-900",
  }

  const headerColors = {
    praise: "bg-green-700 text-white hover:bg-green-600",
    warning: "bg-red-700 text-white hover:bg-red-600",
    advice: "bg-cyan-700 text-white hover:bg-cyan-600",
    celebration: "bg-yellow-700 text-white hover:bg-yellow-600",
  }

  return (
    <Card
      className={`border-l-4 ${typeColors[message.type]} shadow-lg animate-bounce-in`}
      style={{ animationDelay: `${idx * 0.1}s` }}
    >
      <div
        className={`${headerColors[message.type]} p-4 cursor-pointer transition-all transform hover:scale-[1.02]`}
        onClick={() => {
          setExpanded(!expanded)
          if (!message.read) {
            onMarkAsRead(message.id)
          }
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{message.icon}</span>
            <div>
              <h4 className="font-bold text-lg">{message.title}</h4>
              <p className="text-sm opacity-90">From: {message.sender}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-90">{message.date}</p>
            {!message.read && (
              <span className="inline-block mt-1 px-2 py-1 bg-white bg-opacity-20 rounded text-xs font-bold animate-pulse">
                NEW
              </span>
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <CardContent className="pt-4 pb-4">
          <p className="text-purple-200 leading-relaxed">{message.content}</p>
        </CardContent>
      )}
    </Card>
  )
}

function generateMessages(
  savingsRate: number,
  spendingTrend: "improving" | "declining" | "stable",
  userRank: string,
  streak: number,
  totalChallengesCompleted: number,
): Message[] {
  const messages: Message[] = []
  const today = new Date()

  // Praise messages
  if (savingsRate > 40) {
    messages.push({
      id: "praise-1",
      sender: "The Royal Treasury",
      title: "Exceptional Fiscal Discipline!",
      content: `Your Majesty, I am honored to report that your savings rate exceeds 40%! This demonstrates the discipline of a true financial leader. Your kingdom prospers under such wise stewardship. Continue this path, and your throne will be eternal.`,
      type: "praise",
      date: formatDate(today),
      icon: "👑",
      read: false,
    })
  }

  if (streak >= 7) {
    messages.push({
      id: "praise-2",
      sender: "The Guardian Spirit",
      title: `Your ${streak}-Day Streak is Glorious!`,
      content: `With ${streak} days of consistent financial discipline, you have proven your commitment to prosperity. The kingdom celebrates your unwavering dedication!`,
      type: "praise",
      date: formatDate(today),
      icon: "🔥",
      read: false,
    })
  }

  // Advice messages
  if (spendingTrend === "stable" && savingsRate < 30) {
    messages.push({
      id: "advice-1",
      sender: "The Sage Advisor",
      title: "Opportunity for Growth",
      content:
        "Dear Citizen, your spending patterns have stabilized, which is good. However, consider cutting discretionary spending by 10% to accelerate your journey toward financial mastery. Small sacrifices today lead to grand rewards tomorrow.",
      type: "advice",
      date: formatDate(today),
      icon: "🧙",
      read: false,
    })
  }

  // Warning messages
  if (spendingTrend === "declining") {
    messages.push({
      id: "warning-1",
      sender: "The Royal Treasurer",
      title: "Spending Alert!",
      content:
        "Your Majesty, your spending has increased this month! The kingdom is concerned about your fiscal trajectory. We urge you to review your expenses and recommit to your savings goals. Your future self will thank you!",
      type: "warning",
      date: formatDate(today),
      icon: "⚠️",
      read: false,
    })
  }

  if (savingsRate < 10) {
    messages.push({
      id: "warning-2",
      sender: "The Council of Finance",
      title: "Critical Savings Alert",
      content:
        "Beloved Ruler, your savings rate is dangerously low. With less than 10% of your income being saved, you are vulnerable to financial hardship. We strongly recommend creating an emergency fund and reducing discretionary expenses immediately.",
      type: "warning",
      date: formatDate(today),
      icon: "🚨",
      read: false,
    })
  }

  // Celebration messages
  if (userRank === "Silver Merchant") {
    messages.push({
      id: "celebration-1",
      sender: "The Royal Court",
      title: "You Have Ascended to Silver Merchant!",
      content:
        "Hail! The kingdom rejoices in your promotion! You have proven your commitment to financial wisdom and earned the title of Silver Merchant. New advisors and building upgrades now await you. Your reign grows stronger!",
      type: "celebration",
      date: formatDate(today),
      icon: "🎖️",
      read: false,
    })
  }

  if (userRank === "Gold Advisor") {
    messages.push({
      id: "celebration-2",
      sender: "The King Himself",
      title: "Welcome, Gold Advisor!",
      content:
        "You have risen to the prestigious rank of Gold Advisor! Your financial acumen is now legendary throughout the realm. I am proud to grant you access to our most powerful financial tools and strategies. The kingdom is in excellent hands.",
      type: "celebration",
      date: formatDate(today),
      icon: "👑",
      read: false,
    })
  }

  if (userRank === "Diamond Magnate") {
    messages.push({
      id: "celebration-3",
      sender: "The King Himself",
      title: "All Hail the Diamond Magnate!",
      content:
        "You have reached the pinnacle of financial excellence! As Diamond Magnate, you stand among the greatest wealth builders in our kingdom. Your wisdom shall guide future generations. You have earned the ultimate respect and resources of the realm!",
      type: "celebration",
      date: formatDate(today),
      icon: "💎",
      read: false,
    })
  }

  if (totalChallengesCompleted >= 5) {
    messages.push({
      id: "celebration-4",
      sender: "The Challenge Master",
      title: `You've Completed ${totalChallengesCompleted} Challenges!`,
      content: `What an achievement! You have completed ${totalChallengesCompleted} financial challenges, demonstrating your dedication and discipline. Each victory strengthens your kingdom. Keep pushing forward!`,
      type: "celebration",
      date: formatDate(today),
      icon: "🏆",
      read: false,
    })
  }

  // Default message if no others generated
  if (messages.length === 0) {
    messages.push({
      id: "default-1",
      sender: "The Royal Court",
      title: "Welcome, Citizen",
      content:
        "Greetings! Your financial journey has begun. Focus on building your savings, completing challenges, and growing your kingdom. The treasury awaits your success!",
      type: "advice",
      date: formatDate(today),
      icon: "📜",
      read: false,
    })
  }

  return messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
