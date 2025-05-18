import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { type Booking, getDaycareName } from "@/lib/booking-data"
import { Clock, MessageCircle, Video } from "lucide-react"
import Link from "next/link"

interface ChildStatusCardProps {
    child: Booking
}

export function ChildStatusCard({ child }: ChildStatusCardProps) {
    const daycareName = getDaycareName(child.daycareId)

    // Get child's initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part.charAt(0))
            .join("")
            .toUpperCase()
    }

    // Get current activity based on time
    const getCurrentActivity = () => {
        if (!child.dailyActivities || child.dailyActivities.length === 0) {
            return "No activities reported yet"
        }

        // Sort activities by time and get the most recent one
        const sortedActivities = [...child.dailyActivities].sort((a, b) => {
            const timeA = new Date(`2025-01-01 ${a.time}`).getTime()
            const timeB = new Date(`2025-01-01 ${b.time}`).getTime()
            return timeB - timeA
        })

        return sortedActivities[0].activity
    }

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="p-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={child.childName} />
                            <AvatarFallback>{getInitials(child.childName)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-medium">{child.childName}</h3>
                                <Badge variant="outline" className="text-xs">
                                    {child.childAge === "infant"
                                        ? "Infant"
                                        : child.childAge === "toddler"
                                            ? "Toddler"
                                            : child.childAge === "preschool"
                                                ? "Preschool"
                                                : "School Age"}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{daycareName}</p>
                        </div>
                    </div>

                    <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Check-in:</span>
                            <span>{child.checkInTime || "Not checked in"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Current Activity:</span>
                            <span>{getCurrentActivity()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Status:</span>
                            <span className="font-medium text-green-600">Active</span>
                        </div>
                    </div>
                </div>

                <div className="border-t grid grid-cols-3 divide-x">
                    <Link href={`/activity-reports?child=${child.childName}`} className="block">
                        <Button variant="ghost" className="w-full h-10 rounded-none text-xs gap-1 p-0">
                            <Clock className="h-3 w-3" />
                            Activities
                        </Button>
                    </Link>
                    <Link href={`/cctv?daycare=${child.daycareId}`} className="block">
                        <Button variant="ghost" className="w-full h-10 rounded-none text-xs gap-1 p-0">
                            <Video className="h-3 w-3" />
                            CCTV
                        </Button>
                    </Link>
                    <Link href={`/chat`} className="block">
                        <Button variant="ghost" className="w-full h-10 rounded-none text-xs gap-1 p-0">
                            <MessageCircle className="h-3 w-3" />
                            Chat
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
