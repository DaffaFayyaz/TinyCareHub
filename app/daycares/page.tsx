import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { DaycareCard } from "@/components/daycare-card"
import { Search, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Sample daycare data
const daycares = [
  {
    id: 1,
    name: "Sunshine Daycare Center",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    reviews: 124,
    price: "$45/day",
    location: "Downtown",
    description: "A bright and cheerful environment where children can learn and play.",
  },
  {
    id: 2,
    name: "Little Explorers Childcare",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    reviews: 98,
    price: "$40/day",
    location: "Westside",
    description: "Focused on early childhood development through exploration and play.",
  },
  {
    id: 3,
    name: "Tiny Tots Academy",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    reviews: 156,
    price: "$50/day",
    location: "Northside",
    description: "Premium childcare with a structured learning curriculum for all ages.",
  },
  {
    id: 4,
    name: "Happy Kids Daycare",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    reviews: 112,
    price: "$42/day",
    location: "Eastside",
    description: "A home-like environment where children feel comfortable and secure.",
  },
  {
    id: 5,
    name: "Bright Beginnings",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    reviews: 87,
    price: "$38/day",
    location: "Southside",
    description: "Nurturing care with a focus on creative development and social skills.",
  },
  {
    id: 6,
    name: "Little Learners Daycare",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    reviews: 103,
    price: "$44/day",
    location: "Central",
    description: "Educational childcare that prepares your little ones for school success.",
  },
]

export default function DaycaresPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Find the Perfect Daycare</h1>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or location..." className="pl-10" />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Daycares</SheetTitle>
              <SheetDescription>Refine your search to find the perfect daycare for your child.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 py-6">
              <div className="space-y-2">
                <Label>Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="downtown">Downtown</SelectItem>
                    <SelectItem value="westside">Westside</SelectItem>
                    <SelectItem value="northside">Northside</SelectItem>
                    <SelectItem value="eastside">Eastside</SelectItem>
                    <SelectItem value="southside">Southside</SelectItem>
                    <SelectItem value="central">Central</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Price Range (per day)</Label>
                <div className="pt-4">
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$30</span>
                  <span>$100</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Minimum Rating</Label>
                <Select defaultValue="4">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Age Group</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="infant">Infant (0-1)</SelectItem>
                    <SelectItem value="toddler">Toddler (1-3)</SelectItem>
                    <SelectItem value="preschool">Preschool (3-5)</SelectItem>
                    <SelectItem value="school-age">School Age (5+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Apply Filters</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Daycare Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {daycares.map((daycare) => (
          <DaycareCard key={daycare.id} daycare={daycare} />
        ))}
      </div>
    </div>
  )
}
