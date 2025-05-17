import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin, Star } from "lucide-react"

interface DaycareCardProps {
  daycare: {
    id: number
    name: string
    image: string
    rating: number
    reviews: number
    price: string
    location: string
    description: string
  }
}

export function DaycareCard({ daycare }: DaycareCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={daycare.image || "/placeholder.svg"}
          alt={daycare.name}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        <Badge className="absolute top-2 right-2">{daycare.price}</Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{daycare.name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{daycare.rating}</span>
            <span className="text-muted-foreground">({daycare.reviews})</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
          <MapPin className="h-3 w-3" />
          <span>{daycare.location}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{daycare.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/daycares/${daycare.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
