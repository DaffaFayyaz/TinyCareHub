import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ReviewCard } from "@/components/review-card"
import { ActivityCard } from "@/components/activity-card"
import { daycareDetails, daycareReviews } from "@/lib/daycare-data"
import Link from "next/link"
import { Calendar, Clock, MapPin, MessageCircle, Star, Video } from "lucide-react"
import { notFound } from "next/navigation"

export default function DaycareDetailPage({ params }: { params: { id: string } }) {
  const daycare = daycareDetails[Number(params.id)]
  const reviews = daycareReviews[Number(params.id)] || []

  // If the daycare ID doesn't exist, show 404
  if (!daycare) {
    notFound()
  }

  return (
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="rounded-lg overflow-hidden">
              <img
                  src={daycare.images[0] || "/placeholder.svg"}
                  alt={daycare.name}
                  className="w-full h-[400px] object-cover"
              />
              <div className="grid grid-cols-3 gap-2 mt-2">
                {daycare.images.slice(1).map((image, index) => (
                    <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`${daycare.name} ${index + 2}`}
                        className="w-full h-32 object-cover rounded-md"
                    />
                ))}
              </div>
            </div>

            {/* Daycare Info */}
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold">{daycare.name}</h1>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-lg">{daycare.rating}</span>
                  <span className="text-muted-foreground">({daycare.reviews} reviews)</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground mt-2">
                <MapPin className="h-4 w-4" />
                <span>{daycare.fullLocation}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {daycare.ageGroups.map((age, index) => (
                    <Badge key={index} variant="outline">
                      {age}
                    </Badge>
                ))}
              </div>
              <Separator className="my-4" />
              <p className="text-muted-foreground">{daycare.fullDescription}</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="details">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="cctv">CCTV</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div>
                  <h3 className="font-semibold text-lg">Hours</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{daycare.hours}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Amenities</h3>
                  <ul className="grid grid-cols-2 gap-2 mt-2">
                    {daycare.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>{amenity}</span>
                        </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="activities" className="space-y-4 pt-4">
                <h3 className="font-semibold text-lg">Daily Activities</h3>
                <div className="grid gap-4">
                  {daycare.activities.map((activity) => (
                      <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Parent Reviews</h3>
                  <Button variant="outline" size="sm">
                    Write a Review
                  </Button>
                </div>
                <div className="grid gap-4">
                  {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="cctv" className="space-y-4 pt-4">
                <div className="bg-muted rounded-lg p-6 text-center">
                  <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold text-lg">CCTV Monitoring</h3>
                  <p className="text-muted-foreground mt-2 mb-4">
                    CCTV monitoring is available for parents with active bookings. Login to access the secure video feed.
                  </p>
                  <Link href="/login">
                    <Button>Login to View</Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="border rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Book This Daycare</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold">{daycare.price}</p>
                  <p className="text-sm text-muted-foreground">per child</p>
                </div>
                <Separator />
                <div className="grid gap-4">
                  <Link href={`/daycares/${params.id}/book`}>
                    <Button className="w-full">Book Now</Button>
                  </Link>
                  <Button variant="outline" className="w-full gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Contact Daycare
                  </Button>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Availability</h3>
              <div className="flex justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <p className="text-center text-sm text-muted-foreground mb-4">Check availability and book your spot</p>
              <Link href={`/daycares/${params.id}/book`}>
                <Button variant="outline" className="w-full">
                  Check Dates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}
