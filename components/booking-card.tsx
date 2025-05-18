"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type Booking, getDaycareName, getDaycarePrice } from "@/lib/booking-data"
import { Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ReviewFormModal } from "@/components/review-form-modal"
import { ModifyBookingModal } from "@/components/modify-booking-modal"

interface BookingCardProps {
    booking: Booking
}

export function BookingCard({ booking }: BookingCardProps) {
    const daycareName = getDaycareName(booking.daycareId)
    const daycarePrice = getDaycarePrice(booking.daycareId)
    const [reviewModalOpen, setReviewModalOpen] = useState(false)
    const [modifyModalOpen, setModifyModalOpen] = useState(false)
    const [isModified, setIsModified] = useState(false)

    // Format dates for display
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    // Calculate total price
    const pricePerDay = Number(daycarePrice.replace(/[^0-9.]/g, ""))
    const startDate = new Date(booking.startDate)
    const endDate = new Date(booking.endDate)
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    const totalPrice = pricePerDay * days

    // Determine badge color based on status
    const getBadgeVariant = (status: Booking["status"]) => {
        switch (status) {
            case "ongoing":
                return "default"
            case "upcoming":
                return "secondary"
            case "completed":
                return "outline"
            case "cancelled":
                return "destructive"
            default:
                return "outline"
        }
    }

    // Format status for display
    const formatStatus = (status: Booking["status"]) => {
        return status.charAt(0).toUpperCase() + status.slice(1)
    }

    // Handle booking modification
    const handleBookingModified = () => {
        setIsModified(true)
        // In a real app, you would refetch the booking data here
    }

    return (
        <>
            <Card className={isModified ? "border-green-500 shadow-sm" : ""}>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between md:justify-start gap-2">
                                <h3 className="font-bold text-lg">{daycareName}</h3>
                                <Badge variant={getBadgeVariant(booking.status)}>{formatStatus(booking.status)}</Badge>
                                {isModified && (
                                    <Badge variant="outline" className="bg-green-50 text-green-700">
                                        Modified
                                    </Badge>
                                )}
                            </div>

                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>Booking ID: {booking.id}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-2">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <Calendar className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Dates</p>
                                        <p className="text-sm font-medium">
                                            {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <Clock className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Schedule</p>
                                        <p className="text-sm font-medium">
                                            {booking.schedule === "full-day"
                                                ? "Full Day (7AM-6PM)"
                                                : booking.schedule === "morning"
                                                    ? "Morning (7AM-12PM)"
                                                    : "Afternoon (1PM-6PM)"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Child</p>
                                <p className="font-medium">{booking.childName}</p>
                                <p className="text-sm text-muted-foreground">
                                    {booking.childAge === "infant"
                                        ? "Infant (0-1)"
                                        : booking.childAge === "toddler"
                                            ? "Toddler (1-3)"
                                            : booking.childAge === "preschool"
                                                ? "Preschool (3-5)"
                                                : "School Age (5+)"}
                                </p>
                            </div>

                            <div className="text-right mt-2 md:mt-0">
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="font-bold">${totalPrice.toFixed(2)}</p>
                                <p className="text-xs text-muted-foreground">
                                    {days} days @ {daycarePrice}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="bg-muted/50 px-6 py-3">
                    <div className="flex flex-wrap justify-between w-full gap-2">
                        <Link href={`/daycares/${booking.daycareId}`}>
                            <Button variant="outline" size="sm">
                                View Daycare
                            </Button>
                        </Link>

                        {booking.status === "ongoing" && (
                            <Link href={`/activity-reports?child=${booking.childName}`}>
                                <Button variant="outline" size="sm">
                                    View Activity Reports
                                </Button>
                            </Link>
                        )}

                        {booking.status === "ongoing" && (
                            <Link href={`/cctv?daycare=${booking.daycareId}`}>
                                <Button variant="outline" size="sm">
                                    CCTV Monitoring
                                </Button>
                            </Link>
                        )}

                        {booking.status === "upcoming" && (
                            <Button variant="outline" size="sm" onClick={() => setModifyModalOpen(true)}>
                                Modify Booking
                            </Button>
                        )}

                        {booking.status === "upcoming" && (
                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                                Cancel Booking
                            </Button>
                        )}

                        {booking.status === "completed" && (
                            <Button variant="outline" size="sm">
                                View Receipt
                            </Button>
                        )}

                        {booking.status === "completed" && (
                            <Button variant="outline" size="sm" onClick={() => setReviewModalOpen(true)}>
                                Write Review
                            </Button>
                        )}
                    </div>
                </CardFooter>
            </Card>

            <ReviewFormModal
                open={reviewModalOpen}
                onOpenChange={setReviewModalOpen}
                daycareId={booking.daycareId}
                daycareName={daycareName}
                bookingId={booking.id}
            />

            <ModifyBookingModal
                open={modifyModalOpen}
                onOpenChange={setModifyModalOpen}
                booking={booking}
                daycareName={daycareName}
                onBookingModified={handleBookingModified}
            />
        </>
    )
}
