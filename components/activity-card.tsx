import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface ActivityCardProps {
  activity: {
    id: number
    title: string
    description: string
    time: string
  }
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold">{activity.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{activity.time}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
