"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle2, CalendarIcon, AlertCircle, CreditCard } from "lucide-react"
import { format, differenceInDays, addDays, isBefore } from "date-fns"
import type { DateRange } from "react-day-picker"
import type { Booking } from "@/lib/booking-data"
import { getDaycarePriceNumeric } from "@/lib/booking-data"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { QRPaymentModal } from "@/components/qr-payment-modal"

interface ModifyBookingModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    booking: Booking
    daycareName: string
    onBookingModified: () => void
}

export function ModifyBookingModal({
                                       open,
                                       onOpenChange,
                                       booking,
                                       daycareName,
                                       onBookingModified,
                                   }: ModifyBookingModalProps) {
    // Form state
    const [dateRange, setDateRange] = useState<DateRange | undefined>()
    const [startDate, setStartDate] = useState(booking.startDate)
    const [endDate, setEndDate] = useState(booking.endDate)
    const [schedule, setSchedule] = useState(booking.schedule)
    const [specialInstructions, setSpecialInstructions] = useState(booking.specialInstructions || "")
    const [numberOfDays, setNumberOfDays] = useState(0)
    const [originalNumberOfDays, setOriginalNumberOfDays] = useState(0)
    const [additionalDays, setAdditionalDays] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [calendarOpen, setCalendarOpen] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [modificationId, setModificationId] = useState("")

    // Get daycare price
    const dailyPrice = getDaycarePriceNumeric(booking.daycareId)
    const totalPrice = dailyPrice * numberOfDays
    const additionalPrice = dailyPrice * additionalDays

    // Initialize date range from booking
    useEffect(() => {
        if (booking) {
            const start = new Date(booking.startDate)
            const end = new Date(booking.endDate)
            setDateRange({ from: start, to: end })
            setStartDate(booking.startDate)
            setEndDate(booking.endDate)

            // Calculate original days including both start and end date
            const days = differenceInDays(end, start) + 1
            setNumberOfDays(days)
            setOriginalNumberOfDays(days)
        }
    }, [booking])

    // Update number of days when date range changes
    useEffect(() => {
        if (dateRange?.from && dateRange?.to) {
            const formattedStartDate = format(dateRange.from, "yyyy-MM-dd")
            const formattedEndDate = format(dateRange.to, "yyyy-MM-dd")

            // Ensure start date is not changed (already paid for)
            if (formattedStartDate !== booking.startDate) {
                // Reset to original start date if user tries to change it
                const originalStart = new Date(booking.startDate)
                const currentEnd = dateRange.to
                setDateRange({ from: originalStart, to: currentEnd })
                setStartDate(booking.startDate)
            } else {
                setStartDate(formattedStartDate)
                setEndDate(formattedEndDate)

                // Calculate days including both start and end date
                const days = differenceInDays(dateRange.to, dateRange.from) + 1
                setNumberOfDays(days)

                // Calculate additional days compared to original booking
                const additionalDays = Math.max(0, days - originalNumberOfDays)
                setAdditionalDays(additionalDays)
            }
        }
    }, [dateRange, booking.startDate, originalNumberOfDays])

    // Custom date selection handler to prevent reducing days
    const handleDateSelect = (range: DateRange | undefined) => {
        if (!range) {
            return
        }

        const originalStartDate = new Date(booking.startDate)
        const originalEndDate = new Date(booking.endDate)

        // Always keep the original start date
        range.from = originalStartDate

        // Don't allow end date to be before the original end date
        if (range.to && isBefore(range.to, originalEndDate)) {
            range.to = originalEndDate
        }

        setDateRange(range)
    }

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // If there are additional days, show payment modal
        if (additionalDays > 0) {
            // Generate a modification ID
            const newModificationId = `MOD-${Math.floor(Math.random() * 10000)}`
            setModificationId(newModificationId)
            setShowPaymentModal(true)
        } else {
            // No additional payment needed, just update
            processModification()
        }
    }

    // Process the modification after payment (if needed)
    const processModification = () => {
        setIsSubmitting(true)

        // Simulate API call to update booking
        setTimeout(() => {
            console.log("Booking modified:", {
                id: booking.id,
                startDate,
                endDate,
                schedule,
                specialInstructions,
                additionalDays,
                additionalPayment: additionalDays > 0 ? additionalPrice : 0,
            })

            setIsSubmitting(false)
            setIsSuccess(true)

            // Close modal after success
            setTimeout(() => {
                setIsSuccess(false)
                onBookingModified()
                onOpenChange(false)
            }, 2000)
        }, 1500)
    }

    // Handle payment completion
    const handlePaymentComplete = () => {
        setShowPaymentModal(false)
        processModification()
    }

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return format(date, "PPP")
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
                    <DialogHeader className="flex-shrink-0">
                        <DialogTitle>Modify Booking</DialogTitle>
                        <DialogDescription>
                            Update your booking details for {daycareName} (ID: {booking.id})
                        </DialogDescription>
                    </DialogHeader>

                    {isSuccess ? (
                        <div className="py-6 text-center">
                            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-medium text-green-800">Booking Updated!</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                Your booking has been successfully modified. You will receive a confirmation email shortly.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1">
                            {/* Policy Alert */}
                            <Alert className="bg-blue-50 border-blue-200">
                                <AlertCircle className="h-4 w-4 text-blue-600" />
                                <AlertTitle className="text-blue-800 text-sm">Booking Modification Policy</AlertTitle>
                                <AlertDescription className="text-blue-700 text-xs">
                                    You can only extend your booking, not reduce it. The original start date and duration cannot be
                                    changed as they have already been paid for.
                                </AlertDescription>
                            </Alert>

                            {/* Date Selection */}
                            <div className="space-y-1">
                                <Label className="text-sm">Booking Dates</Label>
                                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start text-left font-normal truncate text-sm">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {dateRange?.from ? (
                                                dateRange.to ? (
                                                    <>
                                                        {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                                                    </>
                                                ) : (
                                                    format(dateRange.from, "MMM d, yyyy")
                                                )
                                            ) : (
                                                <span>Pick a date range</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <div className="p-2 border-b text-xs">
                                            <p className="text-muted-foreground">
                                                You can only extend your end date. The original start date (
                                                {format(new Date(booking.startDate), "MMM d, yyyy")}) cannot be changed.
                                            </p>
                                        </div>
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={dateRange?.from}
                                            selected={dateRange}
                                            onSelect={handleDateSelect}
                                            numberOfMonths={1}
                                            disabled={{
                                                before: new Date(booking.startDate),
                                                from: new Date(booking.startDate),
                                                to: addDays(new Date(booking.startDate), 0),
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Schedule Selection */}
                            <div className="space-y-1">
                                <Label htmlFor="schedule" className="text-sm">
                                    Schedule
                                </Label>
                                <Select value={schedule} onValueChange={setSchedule}>
                                    <SelectTrigger className="text-sm">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="full-day">Full Day (7AM-6PM)</SelectItem>
                                        <SelectItem value="morning">Morning (7AM-12PM)</SelectItem>
                                        <SelectItem value="afternoon">Afternoon (1PM-6PM)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Special Instructions */}
                            <div className="space-y-1">
                                <Label htmlFor="specialInstructions" className="text-sm">
                                    Special Instructions
                                </Label>
                                <Textarea
                                    id="specialInstructions"
                                    value={specialInstructions}
                                    onChange={(e) => setSpecialInstructions(e.target.value)}
                                    placeholder="Any allergies, medical conditions, or special requirements"
                                    className="min-h-[80px] text-sm"
                                />
                            </div>

                            {/* Booking Summary */}
                            <div className="rounded-md border p-3 space-y-1">
                                <h4 className="font-medium text-sm">Booking Summary</h4>
                                <div className="text-xs space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Child:</span>
                                        <span>{booking.childName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Original Dates:</span>
                                        <span>
                      {format(new Date(booking.startDate), "MMM d")} -{" "}
                                            {format(new Date(booking.endDate), "MMM d, yyyy")}
                    </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">New Dates:</span>
                                        <span>
                      {format(new Date(startDate), "MMM d")} - {format(new Date(endDate), "MMM d, yyyy")}
                    </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Original Duration:</span>
                                        <span>{originalNumberOfDays} days</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">New Duration:</span>
                                        <span>{numberOfDays} days</span>
                                    </div>
                                    <Separator className="my-1" />
                                    <div className="flex justify-between font-medium">
                                        <span>Original Price:</span>
                                        <span>Rp {(dailyPrice * originalNumberOfDays).toLocaleString("id-ID")}</span>
                                    </div>
                                    {additionalDays > 0 && (
                                        <>
                                            <div className="flex justify-between text-primary font-medium">
                                                <span>Additional Days:</span>
                                                <span>
                          {additionalDays} days (Rp {additionalPrice.toLocaleString("id-ID")})
                        </span>
                                            </div>
                                            <div className="flex justify-between font-bold">
                                                <span>New Total Price:</span>
                                                <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {additionalDays > 0 && (
                                <Alert className="bg-yellow-50 border-yellow-200">
                                    <CreditCard className="h-4 w-4 text-yellow-600" />
                                    <AlertDescription className="text-yellow-700 text-xs">
                                        You will be charged Rp {additionalPrice.toLocaleString("id-ID")} for the {additionalDays} additional
                                        day
                                        {additionalDays !== 1 ? "s" : ""} using your original payment method.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </form>
                    )}

                    <DialogFooter className="flex-shrink-0 mt-4 pt-2 border-t">
                        <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={isSuccess ? undefined : handleSubmit}
                            disabled={
                                isSubmitting ||
                                (numberOfDays === originalNumberOfDays &&
                                    schedule === booking.schedule &&
                                    specialInstructions === (booking.specialInstructions || ""))
                            }
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : additionalDays > 0 ? (
                                "Proceed to Payment"
                            ) : (
                                "Update Booking"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Payment Modal for Additional Days */}
            {additionalDays > 0 && (
                <QRPaymentModal
                    open={showPaymentModal}
                    onOpenChange={setShowPaymentModal}
                    amount={additionalPrice}
                    bookingId={modificationId}
                    daycareName={`${daycareName} (Booking Extension)`}
                    onPaymentComplete={handlePaymentComplete}
                />
            )}
        </>
    )
}
