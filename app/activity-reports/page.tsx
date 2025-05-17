import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivityReportCard } from "@/components/activity-report-card"
import { Apple, Baby, Book, Clock, Coffee, Moon, Utensils } from "lucide-react"

// Sample activity reports
const activityReports = [
  {
    id: 1,
    type: "meal",
    time: "8:30 AM",
    title: "Breakfast",
    description: "Oatmeal with fruit and milk",
    icon: Utensils,
  },
  {
    id: 2,
    type: "activity",
    time: "9:15 AM",
    title: "Morning Circle",
    description: "Participated in group songs and stories",
    icon: Book,
  },
  {
    id: 3,
    type: "meal",
    time: "10:30 AM",
    title: "Snack",
    description: "Apple slices and water",
    icon: Apple,
  },
  {
    id: 4,
    type: "activity",
    time: "11:00 AM",
    title: "Arts & Crafts",
    description: "Finger painting - created a beautiful landscape",
    icon: Baby,
  },
  {
    id: 5,
    type: "meal",
    time: "12:15 PM",
    title: "Lunch",
    description: "Chicken, vegetables, and rice",
    icon: Utensils,
  },
  {
    id: 6,
    type: "rest",
    time: "1:00 PM",
    title: "Nap Time",
    description: "Slept for 1.5 hours",
    icon: Moon,
  },
  {
    id: 7,
    type: "meal",
    time: "3:00 PM",
    title: "Snack",
    description: "Yogurt and graham crackers",
    icon: Coffee,
  },
  {
    id: 8,
    type: "activity",
    time: "3:30 PM",
    title: "Outdoor Play",
    description: "Enjoyed playground time with friends",
    icon: Baby,
  },
  {
    id: 9,
    type: "activity",
    time: "4:30 PM",
    title: "Story Time",
    description: "Listened attentively to 'The Very Hungry Caterpillar'",
    icon: Book,
  },
]

export default function ActivityReportsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Activity Reports</h1>
          <p className="text-muted-foreground">Stay updated on your child's daily activities</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select defaultValue="emma">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select child" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="emma">Emma Johnson</SelectItem>
              <SelectItem value="noah">Noah Johnson</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="today">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Summary */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Daily Summary</CardTitle>
            <CardDescription>May 1, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Utensils className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Meals</h3>
                  <p className="text-sm text-muted-foreground">All meals eaten well today</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Moon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Rest</h3>
                  <p className="text-sm text-muted-foreground">Napped for 1.5 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Baby className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Mood</h3>
                  <p className="text-sm text-muted-foreground">Happy and engaged all day</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Book className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Learning</h3>
                  <p className="text-sm text-muted-foreground">Practiced colors and shapes</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-medium mb-2">Notes from Caregiver</h3>
              <p className="text-sm text-muted-foreground">
                Emma had a wonderful day! She was very social and made a new friend during playtime. She's showing great
                progress with her fine motor skills during arts and crafts.
              </p>
            </div>
            <Button variant="outline" className="w-full mt-6">
              Download Daily Report
            </Button>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>Chronological record of today's activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="meals">Meals</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="rest">Rest</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <div className="relative pl-6 border-l">
                  {activityReports.map((activity, index) => (
                    <div key={activity.id} className="mb-6 relative">
                      <div className="absolute -left-[25px] p-1 bg-background border rounded-full">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <ActivityReportCard activity={activity} />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="meals" className="mt-4">
                <div className="relative pl-6 border-l">
                  {activityReports
                    .filter((a) => a.type === "meal")
                    .map((activity) => (
                      <div key={activity.id} className="mb-6 relative">
                        <div className="absolute -left-[25px] p-1 bg-background border rounded-full">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <ActivityReportCard activity={activity} />
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="activities" className="mt-4">
                <div className="relative pl-6 border-l">
                  {activityReports
                    .filter((a) => a.type === "activity")
                    .map((activity) => (
                      <div key={activity.id} className="mb-6 relative">
                        <div className="absolute -left-[25px] p-1 bg-background border rounded-full">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <ActivityReportCard activity={activity} />
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="rest" className="mt-4">
                <div className="relative pl-6 border-l">
                  {activityReports
                    .filter((a) => a.type === "rest")
                    .map((activity) => (
                      <div key={activity.id} className="mb-6 relative">
                        <div className="absolute -left-[25px] p-1 bg-background border rounded-full">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <ActivityReportCard activity={activity} />
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
