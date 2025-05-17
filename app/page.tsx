import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle, Heart, Shield, Star, Video, MessageCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Trusted Childcare for Working Parents
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  TinyCareHub helps you find, book, and monitor trusted daycare services, giving you peace of mind while
                  you work.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/daycares">
                  <Button size="lg" className="gap-1">
                    Explore Daycares
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="outline">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <img
                src="/LandingPage.webp?height=500&width500"
                alt="Happy children at daycare"
                className="rounded-lg object-cover shadow-xl"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Problems We Solve</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                TinyCareHub addresses the key challenges faced by working parents
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="p-2 bg-primary/10 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Safety Concerns</h3>
              <p className="text-center text-muted-foreground">
                Our CCTV monitoring gives you peace of mind by letting you check on your child anytime.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="p-2 bg-primary/10 rounded-full">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Trustworthy Information</h3>
              <p className="text-center text-muted-foreground">
                Verified reviews and ratings help you make informed decisions about your child's care.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="p-2 bg-primary/10 rounded-full">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Work-Life Balance</h3>
              <p className="text-center text-muted-foreground">
                Easy booking and real-time activity reports help you balance work and parenting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to ensure quality childcare
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 mt-12">
            {[
              {
                title: "Verified Daycare Directory",
                description: "Browse through our curated list of verified daycare centers with detailed information.",
                icon: CheckCircle,
              },
              {
                title: "Real-time CCTV Monitoring",
                description: "Check on your child anytime with secure access to daycare CCTV feeds.",
                icon: Video,
              },
              {
                title: "Daily Activity Reports",
                description: "Stay updated with detailed reports about your child's day, meals, and activities.",
                icon: Star,
              },
              {
                title: "Direct Communication",
                description: "Chat directly with daycare staff for updates or special instructions.",
                icon: MessageCircle,
              },
            ].map((feature, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="p-2 bg-primary/10 rounded-full shrink-0">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Find the Perfect Daycare?
              </h2>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Join thousands of parents who trust TinyCareHub for their childcare needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/daycares">
                <Button size="lg" variant="secondary" className="gap-1">
                  Explore Daycares
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="bg-transparent">
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
