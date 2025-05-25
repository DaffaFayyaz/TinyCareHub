"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, Upload, X, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface ReviewFormModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    daycareId: number
    daycareName: string
    bookingId?: string
}

const reviewSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
    content: z
        .string()
        .min(10, "Review must be at least 10 characters")
        .max(1000, "Review cannot exceed 1000 characters"),
    rating: z.number().min(1, "Please select a rating").max(5),
})

export function ReviewFormModal({ open, onOpenChange, daycareId, daycareName, bookingId }: ReviewFormModalProps) {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [uploadedImages, setUploadedImages] = useState<string[]>([])

    const form = useForm<z.infer<typeof reviewSchema>>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            title: "",
            content: "",
            rating: 0,
        },
    })

    const handleStarClick = (selectedRating: number) => {
        setRating(selectedRating)
        form.setValue("rating", selectedRating)
    }

    const handleStarHover = (hoveredRating: number) => {
        setHoverRating(hoveredRating)
    }

    const handleStarLeave = () => {
        setHoverRating(0)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setUploadedImages((prev) => [...prev, ...newImages])
        }
    }

    const removeImage = (index: number) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index))
    }

    const onSubmit = (data: z.infer<typeof reviewSchema>) => {
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            console.log("Review submitted:", {
                ...data,
                daycareId,
                daycareName,
                bookingId,
                images: uploadedImages,
            })

            setIsSubmitting(false)
            setIsSuccess(true)

            // Reset form after success
            setTimeout(() => {
                setIsSuccess(false)
                form.reset()
                setRating(0)
                setUploadedImages([])
                onOpenChange(false)
            }, 2000)
        }, 1500)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                    <DialogDescription>
                        Share your experience at {daycareName}
                        {bookingId ? ` (Booking ID: ${bookingId})` : ""}
                    </DialogDescription>
                </DialogHeader>

                {isSuccess ? (
                    <div className="py-6 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <Star className="h-6 w-6 text-green-600 fill-green-600" />
                        </div>
                        <h3 className="text-lg font-medium text-green-800">Thank you for your review!</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            Your feedback helps other parents make informed decisions.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col min-h-0 overflow-hidden">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col min-h-0 overflow-hidden">
                                {/* Scrollable Content */}
                                <div className="flex-1 overflow-y-auto pr-1 space-y-4">
                                    {/* Star Rating */}
                                    <div className="space-y-2">
                                        <Label htmlFor="rating">Rating</Label>
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => handleStarClick(star)}
                                                    onMouseEnter={() => handleStarHover(star)}
                                                    onMouseLeave={handleStarLeave}
                                                    className="focus:outline-none"
                                                >
                                                    <Star
                                                        className={`h-7 w-7 ${
                                                            star <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        {form.formState.errors.rating && (
                                            <p className="text-sm font-medium text-destructive">{form.formState.errors.rating.message}</p>
                                        )}
                                    </div>

                                    {/* Review Title */}
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Review Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Summarize your experience" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Review Content */}
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Review</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Share details about your experience at this daycare"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Photo Upload */}
                                    <div className="space-y-2">
                                        <Label>Add Photos (Optional)</Label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {uploadedImages.map((image, index) => (
                                                <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                                                    <img
                                                        src={image || "/placeholder.svg"}
                                                        alt={`Uploaded ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                                                    >
                                                        <X className="h-3 w-3 text-white" />
                                                    </button>
                                                </div>
                                            ))}
                                            {uploadedImages.length < 4 && (
                                                <label className="border border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer aspect-square hover:bg-muted/50">
                                                    <Upload className="h-4 w-4 text-muted-foreground mb-1" />
                                                    <span className="text-xs text-muted-foreground">Upload</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleImageUpload}
                                                        multiple={uploadedImages.length < 3}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground">You can upload up to 4 photos</p>
                                    </div>

                                    <Alert className="bg-blue-50 border-blue-200">
                                        <AlertDescription className="text-blue-700 text-sm">
                                            Your review will be publicly visible to help other parents make informed decisions.
                                        </AlertDescription>
                                    </Alert>
                                </div>

                                {/* Fixed Footer */}
                                <div className="flex-shrink-0 pt-4 border-t mt-4">
                                    <DialogFooter>
                                        <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                "Submit Review"
                                            )}
                                        </Button>
                                    </DialogFooter>
                                </div>
                            </form>
                        </Form>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
