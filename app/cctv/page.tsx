"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Maximize2, Pause, Play } from "lucide-react"

// Sample CCTV rooms
const rooms = [
  {
    id: "playroom",
    name: "Playroom",
    description: "Main activity area for children",
  },
  {
    id: "nap-room",
    name: "Nap Room",
    description: "Quiet space for rest time",
  },
  {
    id: "outdoor",
    name: "Outdoor Playground",
    description: "Outdoor play area with equipment",
  },
  {
    id: "classroom",
    name: "Classroom",
    description: "Educational activities and learning",
  },
]

export default function CCTVPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isPlaying, setIsPlaying] = useState(true)
  const [selectedRoom, setSelectedRoom] = useState("playroom")
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">CCTV Monitoring</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Video Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Live Feed</CardTitle>
                  <CardDescription>
                    {rooms.find((r) => r.id === selectedRoom)?.name} - {selectedDate?.toLocaleDateString()}
                  </CardDescription>
                </div>
                <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=700"
                  alt="CCTV Feed"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 text-white px-4 py-2 rounded-md">
                    Video CCTVnyaa
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 flex justify-between items-center">
                  <div className="text-sm">{new Date().toLocaleTimeString()} • Live</div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:text-white hover:bg-white/20"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:text-white hover:bg-white/20"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Room Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={selectedRoom}>
                <TabsList className="grid grid-cols-4">
                  {rooms.map((room) => (
                    <TabsTrigger key={room.id} value={room.id} onClick={() => setSelectedRoom(room.id)}>
                      {room.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {rooms.map((room) => (
                  <TabsContent key={room.id} value={room.id} className="pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">{room.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{room.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Current Staff:</span>
                            <span>Ms. Gibran, Mr. Arthur</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Children Present:</span>
                            <span>12</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Current Activity:</span>
                            <span>Free Play</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {/*{[1, 2, 3, 4].map((i) => (*/}
                        {/*  <div key={i} className="aspect-video bg-muted rounded-md overflow-hidden">*/}
                        {/*    <img*/}
                        {/*      src="/placeholder.svg?height=100&width=160"*/}
                        {/*      alt={`${room.name} Thumbnail ${i}`}*/}
                        {/*      className="w-full h-full object-cover"*/}
                        {/*    />*/}
                        {/*  </div>*/}
                        {/*))}*/}
                        <div className="aspect-video bg-muted rounded-md overflow-hidden">
                          <img
                              src="/daycare1.jpg?height=100&width=160"
                              alt={`${room.name} Thumbnail`}
                              className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="aspect-video bg-muted rounded-md overflow-hidden">
                          <img
                              src="/daycare2.jpg?height=100&width=160"
                              alt={`${room.name} Thumbnail`}
                              className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="aspect-video bg-muted rounded-md overflow-hidden">
                          <img
                              src="/daycare5.jpg?height=100&width=160"
                              alt={`${room.name} Thumbnail`}
                              className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="aspect-video bg-muted rounded-md overflow-hidden">
                          <img
                              src="/daycare10.jpg?height=100&width=160"
                              alt={`${room.name} Thumbnail`}
                              className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view recordings</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
              />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" className="gap-1">
                    <ChevronLeft className="h-4 w-4" />
                    Previous Day
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    Next Day
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="w-full gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  View Today
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recordings</CardTitle>
              <CardDescription>Previous recordings from {selectedDate?.toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM"].map((time) => (
                  <Button key={time} variant="outline" className="w-full justify-start gap-2">
                    <Play className="h-4 w-4" />
                    <span>{time}</span>
                    <span className="text-xs text-muted-foreground ml-auto">30 min</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
