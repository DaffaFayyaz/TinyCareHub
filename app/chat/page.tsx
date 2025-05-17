"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { useState } from "react"

// Sample chat data
const initialMessages = [
  {
    id: 1,
    sender: "staff",
    name: "Ms. Gibran",
    avatar: "/placeholder.svg?height=40&width=40",
    message:
      "Good morning! Just wanted to let you know that Emma is having a great day so far. She enjoyed breakfast and is now participating in our morning circle time.",
    time: "8:45 AM",
  },
  {
    id: 2,
    sender: "parent",
    name: "You",
    avatar: "/placeholder.svg?height=40&width=40",
    message:
      "That's great to hear! Does she need anything for the afternoon? I forgot to pack her favorite stuffed animal.",
    time: "9:15 AM",
  },
  {
    id: 3,
    sender: "staff",
    name: "Ms. Gibran",
    avatar: "/placeholder.svg?height=40&width=40",
    message:
      "No worries! She seems fine without it today. We have plenty of toys here that she's enjoying. I'll send you a photo of her during playtime later.",
    time: "9:20 AM",
  },
  {
    id: 4,
    sender: "staff",
    name: "Ms. Gibran",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Here's Emma during arts and crafts! She's making a beautiful painting.",
    time: "11:30 AM",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    sender: "parent",
    name: "You",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "She looks so happy! Thank you for sharing this. What time is pickup today?",
    time: "11:45 AM",
  },
  {
    id: 6,
    sender: "staff",
    name: "Ms. Gibran",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "You're scheduled for 5:30 PM pickup. She's having lunch now and will have nap time after that.",
    time: "12:00 PM",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      sender: "parent",
      name: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Chat</h1>
            <p className="text-muted-foreground">Communicate directly with daycare staff</p>
          </div>
          <Select defaultValue="sunshine">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select daycare" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sunshine">Sunshine Daycare Center</SelectItem>
              <SelectItem value="little">Little Explorers Childcare</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="border shadow-sm">
          <CardContent className="p-0">
            <div className="border-b p-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Ms. Gibran" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Ms. Gibran</h3>
                  <p className="text-xs text-muted-foreground">Lead Teacher • Sunshine Daycare</p>
                </div>
              </div>
            </div>

            <ScrollArea className="h-[500px] p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "parent" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] ${
                        msg.sender === "parent" ? "bg-primary text-primary-foreground" : "bg-muted"
                      } rounded-lg p-3`}
                    >
                      {msg.sender === "staff" && (
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={msg.avatar || "/placeholder.svg"} alt={msg.name} />
                            <AvatarFallback>{msg.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium">{msg.name}</span>
                        </div>
                      )}
                      <p className="text-sm">{msg.message}</p>
                      {msg.image && (
                        <img
                          src={msg.image || "/placeholder.svg"}
                          alt="Shared image"
                          className="mt-2 rounded-md w-full max-w-[300px]"
                        />
                      )}
                      <div
                        className={`text-xs mt-1 ${
                          msg.sender === "parent" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
