"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect, useState } from "react"
import type { DateRange } from "react-day-picker"
import { format, differenceInDays } from "date-fns"
import { daycareDetails } from "@/lib/daycare-data"
import { notFound } from "next/navigation"

const formSchema = z.object({
    childName: z.string().min(1, "Child's name is required"),
    childAge: z.string().min(1, "Please select your child's age"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    schedule: z.string().min(1, "Please select a schedule"),
    specialInstructions: z.string().optional(),
})

export default function BookingPage({ params }: { params: { id: string } }) {
    const daycare = daycareDetails[Number(params.id)]

    // If the daycare ID doesn't exist, show 404
    if (!daycare) {
        notFound()
    }

    const [dateRange, setDateRange] = useState<DateRange | undefined>()
    const [numberOfDays, setNumberOfDays] = useState<number>(0)

    // Extract price from daycare price string (e.g., "$45/day" -> 45)
    const dailyPrice = Number(daycare.price.replace(/[^0-9.]/g, ""))

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            childName: "",
            childAge: "",
            startDate: "",
            endDate: "",
            schedule: "",
            specialInstructions: "",
        },
    })

    // Update number of days and form values when date range changes
    useEffect(() => {
        if (dateRange?.from) {
            const formattedStartDate = format(dateRange.from, "yyyy-MM-dd")
            form.setValue("startDate", formattedStartDate)

            if (dateRange.to) {
                const formattedEndDate = format(dateRange.to, "yyyy-MM-dd")
                form.setValue("endDate", formattedEndDate)

                // Calculate days including both start and end date
                const days = differenceInDays(dateRange.to, dateRange.from) + 1
                setNumberOfDays(days)
            } else {
                // If only start date is selected, it's a single day booking
                form.setValue("endDate", formattedStartDate)
                setNumberOfDays(1)
            }
        } else {
            setNumberOfDays(0)
        }
    }, [dateRange, form])

    // Update date range when form values change manually
    const updateDateRangeFromInputs = (startDateStr: string, endDateStr: string) => {
        if (startDateStr) {
            const startDate = new Date(startDateStr)

            if (endDateStr) {
                const endDate = new Date(endDateStr)
                setDateRange({ from: startDate, to: endDate })
            } else {
                setDateRange({ from: startDate, to: startDate })
            }
        } else {
            setDateRange(undefined)
        }
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        // This would handle the form submission
        console.log(values)
    }

    return (
        <div className="container py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Book {daycare.name}</h1>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Booking Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Booking Details</CardTitle>
                            <CardDescription>Fill out the form to book a spot for your child.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="childName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Child's Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your child's name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="childAge"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Child's Age</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select age" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="infant">Infant (0-1 years)</SelectItem>
                                                        <SelectItem value="toddler">Toddler (1-3 years)</SelectItem>
                                                        <SelectItem value="preschool">Preschool (3-5 years)</SelectItem>
                                                        <SelectItem value="school-age">School Age (5+ years)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="startDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Start Date</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="date"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e)
                                                                updateDateRangeFromInputs(e.target.value, form.getValues("endDate"))
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="endDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>End Date</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="date"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e)
                                                                updateDateRangeFromInputs(form.getValues("startDate"), e.target.value)
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="schedule"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Schedule</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select schedule" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="full-day">Full Day (7AM-6PM)</SelectItem>
                                                        <SelectItem value="morning">Morning (7AM-12PM)</SelectItem>
                                                        <SelectItem value="afternoon">Afternoon (1PM-6PM)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="specialInstructions"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Special Instructions</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Any allergies, medical conditions, or special requirements"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Please include any information that the daycare staff should know.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Link href={`/daycares/${params.id}`}>
                                <Button variant="outline">Cancel</Button>
                            </Link>
                            <Button onClick={form.handleSubmit(onSubmit)}>Confirm Booking</Button>
                        </CardFooter>
                    </Card>

                    {/* Calendar and Summary */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Select Dates</CardTitle>
                                <CardDescription>
                                    {dateRange?.from ? (
                                        dateRange.to ? (
                                            <>
                                                {format(dateRange.from, "PPP")} - {format(dateRange.to, "PPP")}
                                            </>
                                        ) : (
                                            format(dateRange.from, "PPP")
                                        )
                                    ) : (
                                        "Please select a date range"
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Calendar
                                    mode="range"
                                    selected={dateRange}
                                    onSelect={setDateRange}
                                    className="rounded-md border"
                                    numberOfMonths={1}
                                    disabled={{ before: new Date() }}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Booking Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Daycare Fee</span>
                                        <span>{daycare.price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Number of Days</span>
                                        <span>{numberOfDays}</span>
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>${(dailyPrice * numberOfDays).toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
