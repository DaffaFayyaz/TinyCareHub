import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface ActivityReportCardProps {
  activity: {
    id: number
    type: string
    time: string
    title: string
    description: string
    icon: LucideIcon
  }
}

export function ActivityReportCard({ activity }: ActivityReportCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <activity.icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{activity.title}</h3>
              <span className="text-sm text-muted-foreground">{activity.time}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
