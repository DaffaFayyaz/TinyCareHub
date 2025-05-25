"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle2, Loader2, Eye, EyeOff } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().default(false),
})

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema) as any,
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true)
    setLoginError("")

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (values.email === "hci@gmail.com" && values.password === "password") {
            resolve(true)
          } else {
            reject(new Error("Invalid email or password"))
          }
        }, 1500)
      })

      setIsSuccess(true)
      setIsLoading(false)

      setTimeout(() => {
        router.push("/bookings")
      }, 2000)
    } catch (error) {
      setIsLoading(false)
      setLoginError(error instanceof Error ? error.message : "Login failed. Please try again.")
    }
  }

  if (isSuccess) {
    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
                  <CheckCircle2 className="h-10 w-10 text-green-600 animate-bounce" />
                </div>
                <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-20"></div>
                <div className="absolute inset-2 rounded-full bg-green-300 animate-ping opacity-30 animation-delay-200"></div>
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight text-green-800">Welcome back!</h1>
                <p className="text-sm text-green-600">Login successful. Redirecting to your bookings...</p>
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
      <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
          </div>
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {loginError && (
                      <Alert className="bg-red-50 border-red-200">
                        <AlertDescription className="text-red-700">{loginError}</AlertDescription>
                      </Alert>
                  )}

                  <FormField
                      control={form.control}
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
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Password</FormLabel>
                              <Link
                                  href="/forgot-password"
                                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                              >
                                Forgot password?
                              </Link>
                            </div>
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
                      control={form.control}
                      name="remember"
                      render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Remember me
                              </FormLabel>
                            </div>
                          </FormItem>
                      )}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                    ) : (
                        "Sign In"
                    )}
                  </Button>
                </form>
              </Form>

              {/*<div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">*/}
              {/*  <p className="text-xs text-blue-700 font-medium mb-1">Demo Credentials:</p>*/}
              {/*  <p className="text-xs text-blue-600">Email: hci@gmail.com</p>*/}
              {/*  <p className="text-xs text-blue-600">Password: password</p>*/}
              {/*</div>*/}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="text-sm text-center w-full text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="font-medium text-primary underline-offset-4 hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
  )
}
