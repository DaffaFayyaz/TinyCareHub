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

    const vaNumber = "8277601234567890"

    const formatCountdown = () => {
        const minutes = Math.floor(countdown / 60)
        const seconds = countdown % 60
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(vaNumber)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const checkPaymentStatus = () => {
        setPaymentStatus("processing")

        setTimeout(() => {
            const isCompleted = Math.random() > 0.3

            if (isCompleted) {
                setPaymentStatus("completed")
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

    // Auto-check payment stiap 10 detik
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
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Payment</DialogTitle>
                    <DialogDescription>
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
                            Your payment of ${amount.toFixed(2)} has been received.
                        </p>
                        <Button className="mt-4 w-full" onClick={onPaymentComplete}>
                            Continue
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium">Amount Due</p>
                                <p className="text-2xl font-bold">${amount.toFixed(2)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Time Remaining</p>
                                <p className={`font-medium ${countdown < 60 ? "text-red-500" : ""}`}>{formatCountdown()}</p>
                            </div>
                        </div>

                        <Tabs defaultValue="qris" value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="qris">QRIS</TabsTrigger>
                                <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                            </TabsList>

                            <TabsContent value="qris" className="mt-4">
                                <div className="flex flex-col items-center">
                                    <div className="relative border-8 border-white rounded-lg shadow-md mb-4">
                                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                                    <Image src="/placeholder.svg?height=40&width=40" alt="QRIS Logo" width={40} height={40} />
                                                </div>
                                                <p className="text-sm font-medium">QRIS Payment</p>
                                            </div>
                                        </div>
                                        <Image
                                            src="/placeholder.svg?height=250&width=250"
                                            alt="QRIS Code"
                                            width={250}
                                            height={250}
                                            className="rounded-lg"
                                        />
                                    </div>

                                    <div className="text-center space-y-2 w-full">
                                        <p className="text-sm text-muted-foreground">
                                            Scan this QR code using any QRIS-supported payment app
                                        </p>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <Image src="/placeholder.svg?height=30&width=30" alt="GoPay" width={30} height={30} />
                                            <Image src="/placeholder.svg?height=30&width=30" alt="OVO" width={30} height={30} />
                                            <Image src="/placeholder.svg?height=30&width=30" alt="DANA" width={30} height={30} />
                                            <Image src="/placeholder.svg?height=30&width=30" alt="LinkAja" width={30} height={30} />
                                            <Image src="/placeholder.svg?height=30&width=30" alt="ShopeePay" width={30} height={30} />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="bank" className="mt-4">
                                <div className="space-y-4">
                                    <div className="rounded-lg border p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-2">
                                                <Image src="/placeholder.svg?height=30&width=30" alt="Bank Logo" width={30} height={30} />
                                                <span className="font-medium">Virtual Account</span>
                                            </div>
                                            <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={handleCopy}>
                                                {copied ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                                                {copied ? "Copied" : "Copy"}
                                            </Button>
                                        </div>
                                        <div className="font-mono text-lg font-medium text-center py-2 bg-muted rounded-md">{vaNumber}</div>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            Transfer exactly ${amount.toFixed(2)} to this account number
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">Payment Instructions:</p>
                                        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                                            <li>Log in to your mobile banking app or internet banking</li>
                                            <li>Select "Transfer" or "Virtual Account" payment</li>
                                            <li>Enter the virtual account number: {vaNumber}</li>
                                            <li>Confirm the payment details and amount: ${amount.toFixed(2)}</li>
                                            <li>Complete the payment using your preferred authentication method</li>
                                        </ol>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>

                        {paymentStatus === "processing" ? (
                            <Alert className="bg-blue-50 border-blue-200">
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                                    <AlertDescription className="text-blue-700">Verifying your payment...</AlertDescription>
                                </div>
                            </Alert>
                        ) : (
                            <Alert className="bg-yellow-50 border-yellow-200">
                                <AlertDescription className="text-yellow-700">
                                    Please complete your payment within the time limit. The booking will be automatically cancelled if
                                    payment is not received.
                                </AlertDescription>
                            </Alert>
                        )}

                        <Separator />

                        <DialogFooter className="flex flex-col sm:flex-row gap-2">
                            <Button
                                variant="outline"
                                className="gap-1"
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
                            <Button variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel Payment
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
