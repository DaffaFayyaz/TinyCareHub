"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { DaycareCard } from "@/components/daycare-card"
import { Search, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { daycareListings, extractPrice } from "@/lib/daycare-data"

export default function DaycaresPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredDaycares, setFilteredDaycares] = useState(daycareListings)
  const [location, setLocation] = useState("all")
  const [minRating, setMinRating] = useState("4")
  const [maxPrice, setMaxPrice] = useState(800000) // 800,000 IDR

  // Filter daycares based on search query and filters
  useEffect(() => {
    let results = daycareListings

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
          (daycare) => daycare.name.toLowerCase().includes(query) || daycare.location.toLowerCase().includes(query),
      )
    }

    if (location !== "all") {
      results = results.filter((daycare) => daycare.location.toLowerCase() === location.toLowerCase())
    }

    // Filter by minimum rating
    if (minRating) {
      results = results.filter((daycare) => daycare.rating >= Number.parseFloat(minRating))
    }

    // Filter by maximum price
    if (maxPrice) {
      results = results.filter((daycare) => {
        const price = extractPrice(daycare.price)
        return price <= maxPrice
      })
    }

    setFilteredDaycares(results)
  }, [searchQuery, location, minRating, maxPrice])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const applyFilters = () => {}

  return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Find the Perfect Daycare</h1>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search by name or location..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
            />
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
                  <Select value={location} onValueChange={setLocation}>
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
                    <Slider
                        defaultValue={[800000]}
                        max={1000000}
                        min={400000}
                        step={50000}
                        value={[maxPrice]}
                        onValueChange={(value) => setMaxPrice(value[0])}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Rp 400.000</span>
                    <span>Rp {maxPrice.toLocaleString("id-ID")}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Minimum Rating</Label>
                  <Select value={minRating} onValueChange={setMinRating}>
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
                <Button onClick={applyFilters}>Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Daycare Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDaycares.length > 0 ? (
              filteredDaycares.map((daycare) => <DaycareCard key={daycare.id} daycare={daycare} />)
          ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                <h3 className="text-lg font-medium mb-2">No daycares found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters to find more options.</p>
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setLocation("all")
                      setMinRating("4")
                      setMaxPrice(800000)
                    }}
                >
                  Reset Filters
                </Button>
              </div>
          )}
        </div>
      </div>
  )
}
