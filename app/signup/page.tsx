import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SignupPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">Join TinyCareHub to find and book trusted daycare services</p>
        </div>

        <Tabs defaultValue="parent" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="parent">Parent</TabsTrigger>
            <TabsTrigger value="daycare">Daycare Provider</TabsTrigger>
          </TabsList>
          <TabsContent value="parent">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Children</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="childName" className="text-xs">
                          Name
                        </Label>
                        <Input id="childName" placeholder="Child's name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="childAge" className="text-xs">
                          Age
                        </Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select age" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="infant">Infant (0-1)</SelectItem>
                            <SelectItem value="toddler">Toddler (1-3)</SelectItem>
                            <SelectItem value="preschool">Preschool (3-5)</SelectItem>
                            <SelectItem value="school-age">School Age (5+)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      Add Another Child
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                        privacy policy
                      </Link>
                    </label>
                  </div>
                  <Button className="w-full">Create Account</Button>
                </div>
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
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="daycareName">Daycare Name</Label>
                    <Input id="daycareName" placeholder="Sunshine Daycare Center" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="daycareEmail">Business Email</Label>
                    <Input id="daycareEmail" type="email" placeholder="business@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="daycarePhone">Business Phone</Label>
                    <Input id="daycarePhone" placeholder="(123) 456-7890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="daycareAddress">Address</Label>
                    <Input id="daycareAddress" placeholder="123 Main St" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="daycareCity">City</Label>
                      <Input id="daycareCity" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="daycareZip">ZIP Code</Label>
                      <Input id="daycareZip" placeholder="10001" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="daycarePassword">Password</Label>
                    <Input id="daycarePassword" type="password" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="daycareTerms" />
                    <label
                      htmlFor="daycareTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                        privacy policy
                      </Link>
                    </label>
                  </div>
                  <Button className="w-full">Register Daycare</Button>
                </div>
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
