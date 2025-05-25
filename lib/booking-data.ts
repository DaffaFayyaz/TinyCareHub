// This file serves as a mock database for booking information

import { daycareDetails, extractPrice } from "./daycare-data"

export interface Booking {
    id: string
    daycareId: number
    childName: string
    childAge: string
    startDate: string
    endDate: string
    schedule: string
    status: "ongoing" | "upcoming" | "completed" | "cancelled"
    specialInstructions?: string
    checkInTime?: string
    checkOutTime?: string
    dailyActivities?: {
        id: number
        time: string
        activity: string
        notes?: string
    }[]
}

// Sample booking data
export const bookings: Booking[] = [
    {
        id: "book-1001",
        daycareId: 1,
        childName: "Emma Johnson",
        childAge: "toddler",
        startDate: "2025-05-01",
        endDate: "2025-05-15",
        schedule: "full-day",
        status: "ongoing",
        specialInstructions: "Emma has a mild dairy allergy. Please provide dairy-free snacks.",
        checkInTime: "7:45 AM",
        dailyActivities: [
            {
                id: 1,
                time: "8:30 AM",
                activity: "Breakfast",
                notes: "Ate well, had dairy-free oatmeal with fruit",
            },
            {
                id: 2,
                time: "9:15 AM",
                activity: "Morning Circle",
                notes: "Participated enthusiastically in songs",
            },
            {
                id: 3,
                time: "10:30 AM",
                activity: "Art Project",
                notes: "Created a colorful painting of her family",
            },
        ],
    },
    {
        id: "book-1002",
        daycareId: 3,
        childName: "Noah Johnson",
        childAge: "preschool",
        startDate: "2025-05-03",
        endDate: "2025-05-17",
        schedule: "full-day",
        status: "ongoing",
        specialInstructions: "Noah needs his inhaler if he shows signs of wheezing during physical activity.",
        checkInTime: "8:15 AM",
        dailyActivities: [
            {
                id: 1,
                time: "8:45 AM",
                activity: "Breakfast",
                notes: "Ate most of his meal",
            },
            {
                id: 2,
                time: "9:30 AM",
                activity: "Early Literacy",
                notes: "Showed interest in letter recognition activities",
            },
            {
                id: 3,
                time: "10:45 AM",
                activity: "Mathematics Exploration",
                notes: "Worked on counting and sorting activities",
            },
        ],
    },
    {
        id: "book-1003",
        daycareId: 2,
        childName: "Olivia Smith",
        childAge: "infant",
        startDate: "2025-05-10",
        endDate: "2025-05-20",
        schedule: "morning",
        status: "upcoming",
        specialInstructions: "Olivia is still being breastfed. Please use the provided breast milk in the labeled bottles.",
    },
    {
        id: "book-1004",
        daycareId: 5,
        childName: "Emma Johnson",
        childAge: "toddler",
        startDate: "2025-04-15",
        endDate: "2025-04-20",
        schedule: "full-day",
        status: "completed",
        specialInstructions: "Emma has a mild dairy allergy. Please provide dairy-free snacks.",
    },
    {
        id: "book-1005",
        daycareId: 4,
        childName: "Noah Johnson",
        childAge: "preschool",
        startDate: "2025-04-10",
        endDate: "2025-04-14",
        schedule: "afternoon",
        status: "completed",
        specialInstructions: "Noah needs his inhaler if he shows signs of wheezing during physical activity.",
    },
    {
        id: "book-1006",
        daycareId: 6,
        childName: "Emma Johnson",
        childAge: "toddler",
        startDate: "2025-03-01",
        endDate: "2025-03-15",
        schedule: "full-day",
        status: "completed",
        specialInstructions: "Emma has a mild dairy allergy. Please provide dairy-free snacks.",
    },
    {
        id: "book-1007",
        daycareId: 1,
        childName: "Liam Wilson",
        childAge: "infant",
        startDate: "2025-05-25",
        endDate: "2025-06-10",
        schedule: "full-day",
        status: "upcoming",
        specialInstructions: "Liam is on a specific nap schedule. Please try to maintain it as closely as possible.",
    },
]

// Function to get bookings by status
export function getBookingsByStatus(status: Booking["status"]) {
    return bookings.filter((booking) => booking.status === status)
}

// Function to get all bookings
export function getAllBookings() {
    return bookings
}

// Function to get a booking by ID
export function getBookingById(id: string) {
    return bookings.find((booking) => booking.id === id)
}

// Function to get daycare name by ID
export function getDaycareName(id: number) {
    return daycareDetails[id]?.name || "Unknown Daycare"
}

// Function to get daycare price by ID
export function getDaycarePrice(id: number) {
    return daycareDetails[id]?.price || "Rp 0/hari"
}

// Function to get numeric price for calculations
export function getDaycarePriceNumeric(id: number): number {
    const priceString = getDaycarePrice(id)
    return extractPrice(priceString)
}

// Function to get children currently in daycare (ongoing bookings for today)
export function getChildrenInDaycare() {
    const today = new Date().toISOString().split("T")[0]
    return bookings.filter(
        (booking) => booking.status === "ongoing" && booking.startDate <= today && booking.endDate >= today,
    )
}

// Function to calculate total booking price
export function calculateBookingPrice(daycareId: number, startDate: string, endDate: string): number {
    const dailyPrice = getDaycarePriceNumeric(daycareId)
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    return dailyPrice * days
}
