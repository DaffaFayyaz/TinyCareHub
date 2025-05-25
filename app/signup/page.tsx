"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Loader2, Eye, EyeOff, Plus, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const parentSignupSchema = z
    .object({
      firstName: z.string().min(2, "First name must be at least 2 characters"),
      lastName: z.string().min(2, "Last name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
      children: z
          .array(
              z.object({
                name: z.string().min(2, "Child's name must be at least 2 characters"),
                age: z.string().min(1, "Please select child's age"),
              }),
          )
          .min(1, "Please add at least one child"),
      terms: z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    })

const daycareSignupSchema = z
    .object({
      daycareName: z.string().min(3, "Daycare name must be at least 3 characters"),
      email: z.string().email("Please enter a valid email address"),
      phone: z.string().min(10, "Please enter a valid phone number"),
      address: z.string().min(5, "Please enter a complete address"),
      city: z.string().min(2, "City is required"),
      zipCode: z.string().min(5, "Please enter a valid ZIP code"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
      terms: z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    })

export default function SignupPage() {
  const [activeTab, setActiveTab] = useState("parent")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [signupError, setSignupError] = useState("")
  const router = useRouter()

  const parentForm = useForm<z.infer<typeof parentSignupSchema>>({
    resolver: zodResolver(parentSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      children: [{ name: "", age: "" }],
      terms: false,
    },
  })

  const daycareForm = useForm<z.infer<typeof daycareSignupSchema>>({
    resolver: zodResolver(daycareSignupSchema),
    defaultValues: {
      daycareName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: parentForm.control,
    name: "children",
  })

  const onParentSubmit = async (values: z.infer<typeof parentSignupSchema>) => {
    setIsLoading(true)
    setSignupError("")

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simple validation for demo - in real app, this would be an API call
          if (values.email === "existing@example.com") {
            reject(new Error("An account with this email already exists"))
          } else {
            resolve(true)
          }
        }, 2000)
      })

      // Show success animation
      setIsSuccess(true)
      setIsLoading(false)

      // Wait for animation to complete, then redirect
      setTimeout(() => {
        router.push("/bookings")
      }, 2500)
    } catch (error) {
      setIsLoading(false)
      setSignupError(error instanceof Error ? error.message : "Signup failed. Please try again.")
    }
  }

  const onDaycareSubmit = async (values: z.infer<typeof daycareSignupSchema>) => {
    setIsLoading(true)
    setSignupError("")

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simple validation for demo - in real app, this would be an API call
          if (values.email === "existing@daycare.com") {
            reject(new Error("A daycare with this email already exists"))
          } else {
            resolve(true)
          }
        }, 2000)
      })

      // Show success animation
      setIsSuccess(true)
      setIsLoading(false)

      // Wait for animation to complete, then redirect
      setTimeout(() => {
        router.push("/bookings")
      }, 2500)
    } catch (error) {
      setIsLoading(false)
      setSignupError(error instanceof Error ? error.message : "Signup failed. Please try again.")
    }
  }

  if (isSuccess) {
    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="relative">
                {/* Success animation */}
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
                  <CheckCircle2 className="h-12 w-12 text-green-600 animate-bounce" />
                </div>
                {/* Ripple effect */}
                <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-20"></div>
                <div className="absolute inset-2 rounded-full bg-green-300 animate-ping opacity-30 animation-delay-200"></div>
                <div className="absolute inset-4 rounded-full bg-green-400 animate-ping opacity-20 animation-delay-400"></div>
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight text-green-800">Welcome to TinyCareHub!</h1>
                <p className="text-sm text-green-600">
                  Account created successfully.{" "}
                  {activeTab === "parent"
                      ? "Let's find the perfect daycare for your child!"
                      : "Your daycare registration is being reviewed."}
                </p>
                <p className="text-xs text-green-500">Redirecting to your dashboard...</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce animation-delay-400"></div>
              </div>
            </div>
          </div>
        </div>
    )
  }

  return (
      <div className="container py-8">
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-muted-foreground">Join TinyCareHub to find and book trusted daycare services</p>
          </div>

          <Tabs defaultValue="parent" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="parent" disabled={isLoading}>
                Parent
              </TabsTrigger>
              <TabsTrigger value="daycare" disabled={isLoading}>
                Daycare Provider
              </TabsTrigger>
            </TabsList>

            <TabsContent value="parent">
              <Card>
                <CardContent className="pt-6">
                  <Form {...parentForm}>
                    <form onSubmit={parentForm.handleSubmit(onParentSubmit)} className="space-y-4">
                      {signupError && (
                          <Alert className="bg-red-50 border-red-200">
                            <AlertDescription className="text-red-700">{signupError}</AlertDescription>
                          </Alert>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={parentForm.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John" disabled={isLoading} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={parentForm.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Doe" disabled={isLoading} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )}
                        />
                      </div>

                      <FormField
                          control={parentForm.control}
                          name="email"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="name@example.com" disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />

                      <FormField
                          control={parentForm.control}
                          name="password"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input type={showPassword ? "text" : "password"} disabled={isLoading} {...field} />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isLoading}
                                    >
                                      {showPassword ? (
                                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                                      ) : (
                                          <Eye className="h-4 w-4 text-muted-foreground" />
                                      )}
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />

                      <FormField
                          control={parentForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input type={showConfirmPassword ? "text" : "password"} disabled={isLoading} {...field} />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={isLoading}
                                    >
                                      {showConfirmPassword ? (
                                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                                      ) : (
                                          <Eye className="h-4 w-4 text-muted-foreground" />
                                      )}
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />

                      <div className="space-y-2">
                        <Label>Children</Label>
                        {fields.map((field, index) => (
                            <div key={field.id} className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <FormField
                                    control={parentForm.control}
                                    name={`children.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Input placeholder="Child's name" disabled={isLoading} {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-2">
                                  <FormField
                                      control={parentForm.control}
                                      name={`children.${index}.age`}
                                      render={({ field }) => (
                                          <FormItem className="flex-1">
                                            <FormControl>
                                              <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                                                <SelectTrigger>
                                                  <SelectValue placeholder="Age" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="infant">Infant (0-1)</SelectItem>
                                                  <SelectItem value="toddler">Toddler (1-3)</SelectItem>
                                                  <SelectItem value="preschool">Preschool (3-5)</SelectItem>
                                                  <SelectItem value="school-age">School Age (5+)</SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                      )}
                                  />
                                  {fields.length > 1 && (
                                      <Button
                                          type="button"
                                          variant="outline"
                                          size="icon"
                                          onClick={() => remove(index)}
                                          disabled={isLoading}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full gap-1"
                            onClick={() => append({ name: "", age: "" })}
                            disabled={isLoading}
                        >
                          <Plus className="h-4 w-4" />
                          Add Another Child
                        </Button>
                      </div>

                      <FormField
                          control={parentForm.control}
                          name="terms"
                          render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    I agree to the{" "}
                                    <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                                      terms of service
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                                      privacy policy
                                    </Link>
                                  </FormLabel>
                                </div>
                              </FormItem>
                          )}
                      />

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating Account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <div className="text-sm text-center w-full text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="daycare">
              <Card>
                <CardContent className="pt-6">
                  <Form {...daycareForm}>
                    <form onSubmit={daycareForm.handleSubmit(onDaycareSubmit)} className="space-y-4">
                      {signupError && (
                          <Alert className="bg-red-50 border-red-200">
                            <AlertDescription className="text-red-700">{signupError}</AlertDescription>
                          </Alert>
                      )}

                      <FormField
                          control={daycareForm.control}
                          name="daycareName"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Daycare Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Sunshine Daycare Center" disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />

                      <FormField
                          control={daycareForm.control}
                          name="email"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="business@example.com" disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />

                      <FormField
                          control={daycareForm.control}
                          name="phone"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="(123) 456-7890" disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />

                      <FormField
                          control={daycareForm.control}
                          name="address"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="123 Main St" disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={daycareForm.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                  <FormLabel>City</FormLabel>
                                  <FormControl>
                                    <Input placeholder="New York" disabled={isLoading} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={daycareForm.control}
                            name="zipCode"
                            render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ZIP Code</FormLabel>
                                  <FormControl>
                                    <Input placeholder="10001" disabled={isLoading} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )}
                        />
                      </div>

                      <FormField
                          control={daycareForm.control}
                          name="password"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input type={showPassword ? "text" : "password"} disabled={isLoading} {...field} />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isLoading}
                                    >
                                      {showPassword ? (
                                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                                      ) : (
                                          <Eye className="h-4 w-4 text-muted-foreground" />
                                      )}
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />

                      <FormField
                          control={daycareForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input type={showConfirmPassword ? "text" : "password"} disabled={isLoading} {...field} />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={isLoading}
                                    >
                                      {showConfirmPassword ? (
                                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                                      ) : (
                                          <Eye className="h-4 w-4 text-muted-foreground" />
                                      )}
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />

                      <FormField
                          control={daycareForm.control}
                          name="terms"
                          render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    I agree to the{" "}
                                    <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                                      terms of service
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                                      privacy policy
                                    </Link>
                                  </FormLabel>
                                </div>
                              </FormItem>
                          )}
                      />

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Registering Daycare...
                            </>
                        ) : (
                            "Register Daycare"
                        )}
                      </Button>
                    </form>
                  </Form>

                  {/*<div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">*/}
                  {/*  <p className="text-xs text-blue-700 font-medium mb-1">Demo Note:</p>*/}
                  {/*  <p className="text-xs text-blue-600">*/}
                  {/*    Use any email except "existing@example.com" or "existing@daycare.com" to test successful signup*/}
                  {/*  </p>*/}
                  {/*</div>*/}
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <div className="text-sm text-center w-full text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
  )
}
