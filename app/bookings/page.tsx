"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookingCard } from "@/components/booking-card"
import { getAllBookings } from "@/lib/booking-data"
import { useState } from "react"
import Link from "next/link"

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState("current")
    const allBookings = getAllBookings()

    const ongoingBookings = allBookings.filter((booking) => booking.status === "ongoing")
    const upcomingBookings = allBookings.filter((booking) => booking.status === "upcoming")
    const pastBookings = allBookings.filter((booking) => booking.status === "completed")

    return (
        <div className="container py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">My Bookings</h1>
                    <p className="text-muted-foreground">Manage your daycare bookings and check on your children</p>
                </div>
                <div className="flex gap-2">
                    {/*<Button variant="outline" size="sm" className="gap-1">*/}
                    {/*    <Calendar className="h-4 w-4" />*/}
                    {/*    Calendar View*/}
                    {/*</Button>*/}
                    {/*<Button variant="outline" size="sm" className="gap-1">*/}
                    {/*    <Filter className="h-4 w-4" />*/}
                    {/*    Filter*/}
                    {/*</Button>*/}
                </div>
            </div>

            <div className="w-full">
                <Tabs defaultValue="current" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="current">
                            Current
                            {ongoingBookings.length > 0 && (
                                <Badge variant="secondary" className="ml-2">
                                    {ongoingBookings.length}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="upcoming">
                            Upcoming
                            {upcomingBookings.length > 0 && (
                                <Badge variant="secondary" className="ml-2">
                                    {upcomingBookings.length}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="past">
                            Past
                            {pastBookings.length > 0 && (
                                <Badge variant="secondary" className="ml-2">
                                    {pastBookings.length}
                                </Badge>
                            )}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="current" className="mt-6">
                        {ongoingBookings.length > 0 ? (
                            <div className="space-y-4">
                                {ongoingBookings.map((booking) => (
                                    <BookingCard key={booking.id} booking={booking} />
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="text-center py-8">
                                    <p className="text-muted-foreground mb-4">You have no current bookings</p>
                                    <Link href="/daycares">
                                        <Button>Book a Daycare</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                    <TabsContent value="upcoming" className="mt-6">
                        {upcomingBookings.length > 0 ? (
                            <div className="space-y-4">
                                {upcomingBookings.map((booking) => (
                                    <BookingCard key={booking.id} booking={booking} />
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="text-center py-8">
                                    <p className="text-muted-foreground mb-4">You have no upcoming bookings</p>
                                    <Link href="/daycares">
                                        <Button>Book a Daycare</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                    <TabsContent value="past" className="mt-6">
                        {pastBookings.length > 0 ? (
                            <div className="space-y-4">
                                {pastBookings.map((booking) => (
                                    <BookingCard key={booking.id} booking={booking} />
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="text-center py-8">
                                    <p className="text-muted-foreground">No past bookings found</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
