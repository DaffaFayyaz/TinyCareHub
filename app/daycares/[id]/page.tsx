import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ReviewCard } from "@/components/review-card"
import { ActivityCard } from "@/components/activity-card"
import Link from "next/link"
import { Calendar, Clock, MapPin, MessageCircle, Star, Video } from "lucide-react"

// Sample daycare data
const daycare = {
  id: 1,
  name: "Sunshine Daycare Center",
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  rating: 4.8,
  reviews: 124,
  price: "$45/day",
  location: "123 Main St, Downtown",
  description:
    "Sunshine Daycare Center provides a bright and cheerful environment where children can learn and play. Our experienced staff is dedicated to creating a nurturing atmosphere that promotes early childhood development through a balance of structured activities and free play. We offer flexible scheduling options to accommodate working parents and provide nutritious meals and snacks throughout the day.",
  hours: "Monday - Friday: 7:00 AM - 6:00 PM",
  ageGroups: ["Infant (0-1)", "Toddler (1-3)", "Preschool (3-5)"],
  amenities: ["Outdoor Playground", "Learning Center", "Nap Area", "CCTV Monitoring", "Meal Service"],
  activities: [
    {
      id: 1,
      title: "Morning Circle Time",
      description: "Group activities including songs, stories, and movement.",
      time: "9:00 AM",
    },
    {
      id: 2,
      title: "Arts & Crafts",
      description: "Creative expression through various art mediums.",
      time: "10:30 AM",
    },
    {
      id: 3,
      title: "Outdoor Play",
      description: "Physical activity and exploration in our playground.",
      time: "11:30 AM",
    },
    {
      id: 4,
      title: "Lunch & Rest Time",
      description: "Nutritious meal followed by nap or quiet activities.",
      time: "12:30 PM",
    },
    {
      id: 5,
      title: "Learning Centers",
      description: "Self-directed play in various educational centers.",
      time: "2:30 PM",
    },
  ],
}

// Sample reviews
const reviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 months ago",
    content:
      "My daughter loves going to Sunshine Daycare! The staff is incredibly caring and attentive. I appreciate the daily updates and photos they send. Highly recommend!",
  },
  {
    id: 2,
    author: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "3 months ago",
    content:
      "Great facility with lots of activities for the kids. My son has learned so much since starting here. The only reason for 4 stars instead of 5 is that pickup can sometimes be a bit chaotic.",
  },
  {
    id: 3,
    author: "Jessica Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "1 month ago",
    content:
      "The CCTV monitoring feature gives me such peace of mind while I'm at work. I can check in on my twins anytime. The staff is professional and the facility is always clean.",
  },
]

export default function DaycareDetailPage({ params }: { params: { id: string } }) {
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
              <span>{daycare.location}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {daycare.ageGroups.map((age, index) => (
                <Badge key={index} variant="outline">
                  {age}
                </Badge>
              ))}
            </div>
            <Separator className="my-4" />
            <p className="text-muted-foreground">{daycare.description}</p>
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
