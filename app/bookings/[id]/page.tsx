"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { getBookingById, getDaycareName, calculateBookingPrice } from "@/lib/booking-data"
import { daycareDetails } from "@/lib/daycare-data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Clock, FileText, MapPin, MessageCircle, Video, Star } from "lucide-react"
import { ReviewFormModal } from "@/components/review-form-modal"
import { ModifyBookingModal } from "@/components/modify-booking-modal"

export default function BookingDetailPage({ params }: { params: { id: string } }) {
    const booking = getBookingById(params.id)
    const [reviewModalOpen, setReviewModalOpen] = useState(false)
    const [modifyModalOpen, setModifyModalOpen] = useState(false)
    const [isModified, setIsModified] = useState(false)

    if (!booking) {
        notFound()
    }

    const daycare = daycareDetails[booking.daycareId]
    const daycareName = getDaycareName(booking.daycareId)

    // Format dates for display
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    // Calculate total price using the helper function
    const totalPrice = calculateBookingPrice(booking.daycareId, booking.startDate, booking.endDate)
    const startDate = new Date(booking.startDate)
    const endDate = new Date(booking.endDate)
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    const pricePerDay = Math.round(totalPrice / days)

    // Determine badge color based on status
    const getBadgeVariant = (status: string) => {
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
    const formatStatus = (status: string) => {
        return status.charAt(0).toUpperCase() + status.slice(1)
    }

    // Format schedule for display
    const formatSchedule = (schedule: string) => {
        switch (schedule) {
            case "full-day":
                return "Full Day (7AM-6PM)"
            case "morning":
                return "Morning (7AM-12PM)"
            case "afternoon":
                return "Afternoon (1PM-6PM)"
            default:
                return schedule
        }
    }

    // Format child age for display
    const formatChildAge = (age: string) => {
        switch (age) {
            case "infant":
                return "Infant (0-1 years)"
            case "toddler":
                return "Toddler (1-3 years)"
            case "preschool":
                return "Preschool (3-5 years)"
            case "school-age":
                return "School Age (5+ years)"
            default:
                return age
        }
    }

    // Handle booking modification
    const handleBookingModified = () => {
        setIsModified(true)
        // In a real app, you would refetch the booking data here
    }

    return (
        <div className="container py-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold">{daycareName} Booking</h1>
                        <Badge variant={getBadgeVariant(booking.status)}>{formatStatus(booking.status)}</Badge>
                        {isModified && (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                                Modified
                            </Badge>
                        )}
                    </div>
                    <p className="text-muted-foreground">Booking ID: {booking.id}</p>
                </div>
                <div className="flex gap-2">
                    {booking.status === "upcoming" && (
                        <>
                            <Button variant="outline" size="sm" onClick={() => setModifyModalOpen(true)}>
                                Modify Booking
                            </Button>
                            <Button variant="destructive" size="sm">
                                Cancel Booking
                            </Button>
                        </>
                    )}
                    {booking.status === "ongoing" && (
                        <Link href={`/cctv?daycare=${booking.daycareId}`}>
                            <Button size="sm">CCTV Monitoring</Button>
                        </Link>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Booking Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Child Information</h3>
                                        <p className="font-medium mt-1">{booking.childName}</p>
                                        <p className="text-sm">{formatChildAge(booking.childAge)}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Daycare</h3>
                                        <p className="font-medium mt-1">{daycareName}</p>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                            <MapPin className="h-3.5 w-3.5" />
                                            <span>{daycare.fullLocation}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Special Instructions</h3>
                                        <p className="text-sm mt-1">{booking.specialInstructions || "None provided"}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Booking Period</h3>
                                        <p className="font-medium mt-1">
                                            {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                                        </p>
                                        <p className="text-sm">{days} days</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Schedule</h3>
                                        <p className="font-medium mt-1">{formatSchedule(booking.schedule)}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Payment</h3>
                                        <div className="flex justify-between items-center mt-1">
                                            <span>Daily Rate:</span>
                                            <span>Rp {pricePerDay.toLocaleString("id-ID")}/hari</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Total:</span>
                                            <span className="font-bold">Rp {totalPrice.toLocaleString("id-ID")}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">Paid on {formatDate(booking.startDate)}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {booking.status === "ongoing" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Today's Activities</CardTitle>
                                <CardDescription>
                                    {new Date().toLocaleDateString(undefined, {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {booking.dailyActivities && booking.dailyActivities.length > 0 ? (
                                    <div className="space-y-4">
                                        {booking.dailyActivities.map((activity) => (
                                            <div key={activity.id} className="flex items-start gap-3">
                                                <div className="p-2 bg-primary/10 rounded-full">
                                                    <Clock className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="font-medium">{activity.activity}</h3>
                                                        <span className="text-sm text-muted-foreground">{activity.time}</span>
                                                    </div>
                                                    {activity.notes && <p className="text-sm text-muted-foreground mt-1">{activity.notes}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-muted-foreground py-4">No activities reported yet today</p>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {booking.status === "ongoing" && (
                                <>
                                    <Link href={`/activity-reports?child=${booking.childName}`}>
                                        <Button variant="outline" className="w-full justify-start gap-2">
                                            <FileText className="h-4 w-4" />
                                            View Activity Reports
                                        </Button>
                                    </Link>
                                    <Link href={`/cctv?daycare=${booking.daycareId}`}>
                                        <Button variant="outline" className="w-full justify-start gap-2">
                                            <Video className="h-4 w-4" />
                                            CCTV Monitoring
                                        </Button>
                                    </Link>
                                </>
                            )}

                            <Link href="/chat">
                                <Button variant="outline" className="w-full justify-start gap-2">
                                    <MessageCircle className="h-4 w-4" />
                                    Contact Daycare
                                </Button>
                            </Link>

                            <Link href={`/daycares/${booking.daycareId}`}>
                                <Button variant="outline" className="w-full justify-start gap-2">
                                    <MapPin className="h-4 w-4" />
                                    View Daycare Details
                                </Button>
                            </Link>

                            {booking.status === "completed" && (
                                <Button variant="outline" className="w-full justify-start gap-2">
                                    <FileText className="h-4 w-4" />
                                    Download Receipt
                                </Button>
                            )}

                            {booking.status === "completed" && (
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-2"
                                    onClick={() => setReviewModalOpen(true)}
                                >
                                    <Star className="h-4 w-4" />
                                    Write a Review
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    {booking.status === "ongoing" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Check-in/Check-out</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Check-in Time:</span>
                                        <span className="font-medium">{booking.checkInTime || "Not checked in"}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Check-out Time:</span>
                                        <span className="font-medium">{booking.checkOutTime || "Not checked out"}</span>
                                    </div>
                                </div>
                                <Separator />
                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground mb-2">Need to pick up early?</p>
                                    <Button variant="outline" className="w-full">
                                        Notify Daycare
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Review Modal */}
            <ReviewFormModal
                open={reviewModalOpen}
                onOpenChange={setReviewModalOpen}
                daycareId={booking.daycareId}
                daycareName={daycareName}
                bookingId={booking.id}
            />

            {/* Modify Booking Modal */}
            <ModifyBookingModal
                open={modifyModalOpen}
                onOpenChange={setModifyModalOpen}
                booking={booking}
                daycareName={daycareName}
                onBookingModified={handleBookingModified}
            />
        </div>
    )
}
