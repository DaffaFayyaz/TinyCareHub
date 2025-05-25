"use client"

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
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, RefreshCw, CheckCircle2, Loader2 } from "lucide-react"
import Image from "next/image"

interface QRPaymentModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    amount: number
    bookingId: string
    daycareName: string
    onPaymentComplete: () => void
}

export function QRPaymentModal({
                                   open,
                                   onOpenChange,
                                   amount,
                                   bookingId,
                                   daycareName,
                                   onPaymentComplete,
                               }: QRPaymentModalProps) {
    const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "completed" | "failed">("pending")
    const [countdown, setCountdown] = useState(300) // 5 minutes in seconds
    const [activeTab, setActiveTab] = useState("qris")
    const [copied, setCopied] = useState(false)

    // Virtual account number for bank transfer
    const vaNumber = "8277601234567890"

    // Format countdown as MM:SS
    const formatCountdown = () => {
        const minutes = Math.floor(countdown / 60)
        const seconds = countdown % 60
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    // Handle copy VA number
    const handleCopy = () => {
        navigator.clipboard.writeText(vaNumber)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Simulate payment verification
    const checkPaymentStatus = () => {
        setPaymentStatus("processing")

        // Simulate API call with timeout
        setTimeout(() => {
            // For demo purposes, randomly succeed or stay pending
            const isCompleted = Math.random() > 0.3

            if (isCompleted) {
                setPaymentStatus("completed")
                // Call the onPaymentComplete callback after a short delay
                setTimeout(() => {
                    onPaymentComplete()
                }, 1500)
            } else {
                setPaymentStatus("pending")
            }
        }, 2000)
    }

    // Countdown timer
    useEffect(() => {
        if (!open) return

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [open])

    // Auto-check payment status every 10 seconds
    useEffect(() => {
        if (!open || paymentStatus === "completed") return

        const interval = setInterval(() => {
            if (paymentStatus !== "processing") {
                checkPaymentStatus()
            }
        }, 10000)

        return () => clearInterval(interval)
    }, [open, paymentStatus])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle>Payment</DialogTitle>
                    <DialogDescription className="text-sm">
                        Complete your payment for {daycareName} booking (ID: {bookingId})
                    </DialogDescription>
                </DialogHeader>

                {paymentStatus === "completed" ? (
                    <div className="py-6 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium text-green-800">Payment Successful!</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            Your payment of Rp {amount.toLocaleString("id-ID")} has been received.
                        </p>
                        <Button className="mt-4 w-full" onClick={onPaymentComplete}>
                            Continue
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col min-h-0 overflow-hidden">
                        {/* Amount and Timer - Fixed Header */}
                        <div className="flex justify-between items-center mb-4 flex-shrink-0">
                            <div>
                                <p className="text-sm font-medium">Amount Due</p>
                                <p className="text-xl font-bold">Rp {amount.toLocaleString("id-ID")}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Time Remaining</p>
                                <p className={`font-medium ${countdown < 60 ? "text-red-500" : ""}`}>{formatCountdown()}</p>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto">
                            <Tabs defaultValue="qris" value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-4">
                                    <TabsTrigger value="qris">QRIS</TabsTrigger>
                                    <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                                </TabsList>

                                <TabsContent value="qris" className="space-y-4">
                                    <div className="flex flex-col items-center">
                                        <div className="relative border-4 border-white rounded-lg shadow-md mb-3">
                                            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                                        <Image src="/placeholder.svg?height=30&width=30" alt="QRIS Logo" width={30} height={30} />
                                                    </div>
                                                    <p className="text-xs font-medium">QRIS Payment</p>
                                                </div>
                                            </div>
                                            <Image
                                                src="/placeholder.svg?height=200&width=200"
                                                alt="QRIS Code"
                                                width={200}
                                                height={200}
                                                className="rounded-lg"
                                            />
                                        </div>

                                        <div className="text-center space-y-2 w-full">
                                            <p className="text-xs text-muted-foreground">
                                                Scan this QR code using any QRIS-supported payment app
                                            </p>
                                            <div className="flex flex-wrap justify-center gap-1">
                                                <Image src="/placeholder.svg?height=24&width=24" alt="GoPay" width={24} height={24} />
                                                <Image src="/placeholder.svg?height=24&width=24" alt="OVO" width={24} height={24} />
                                                <Image src="/placeholder.svg?height=24&width=24" alt="DANA" width={24} height={24} />
                                                <Image src="/placeholder.svg?height=24&width=24" alt="LinkAja" width={24} height={24} />
                                                <Image src="/placeholder.svg?height=24&width=24" alt="ShopeePay" width={24} height={24} />
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="bank" className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="rounded-lg border p-3">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Image src="/placeholder.svg?height=24&width=24" alt="Bank Logo" width={24} height={24} />
                                                    <span className="font-medium text-sm">Virtual Account</span>
                                                </div>
                                                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={handleCopy}>
                                                    {copied ? <CheckCircle2 className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                                    {copied ? "Copied" : "Copy"}
                                                </Button>
                                            </div>
                                            <div className="font-mono text-base font-medium text-center py-2 bg-muted rounded-md">
                                                {vaNumber}
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Transfer exactly Rp {amount.toLocaleString("id-ID")} to this account number
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-sm font-medium">Payment Instructions:</p>
                                            <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                                                <li>Log in to your mobile banking app or internet banking</li>
                                                <li>Select "Transfer" or "Virtual Account" payment</li>
                                                <li>Enter the virtual account number: {vaNumber}</li>
                                                <li>Confirm the payment details and amount: Rp {amount.toLocaleString("id-ID")}</li>
                                                <li>Complete the payment using your preferred authentication method</li>
                                            </ol>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            {/* Status Alert */}
                            <div className="mt-4">
                                {paymentStatus === "processing" ? (
                                    <Alert className="bg-blue-50 border-blue-200">
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                                            <AlertDescription className="text-blue-700 text-sm">Verifying your payment...</AlertDescription>
                                        </div>
                                    </Alert>
                                ) : (
                                    <Alert className="bg-yellow-50 border-yellow-200">
                                        <AlertDescription className="text-yellow-700 text-sm">
                                            Please complete your payment within the time limit. The booking will be automatically cancelled if
                                            payment is not received.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        </div>

                        <Separator className="my-4" />

                        {/* Fixed Footer */}
                        <DialogFooter className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                            <Button
                                variant="outline"
                                className="gap-1 text-sm"
                                onClick={checkPaymentStatus}
                                disabled={paymentStatus === "processing"}
                            >
                                {paymentStatus === "processing" ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <RefreshCw className="h-4 w-4" />
                                )}
                                Check Payment Status
                            </Button>
                            <Button variant="outline" onClick={() => onOpenChange(false)} className="text-sm">
                                Cancel Payment
                            </Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
