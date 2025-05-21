import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] py-12 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <div className="relative mx-auto w-40 h-40">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full animate-pulse"></div>
          <div className="absolute inset-4 bg-gradient-to-r from-pink-500/40 to-purple-600/40 rounded-full animate-pulse animation-delay-300"></div>
          <div className="absolute inset-8 bg-gradient-to-r from-pink-500/60 to-purple-600/60 rounded-full animate-pulse animation-delay-500"></div>
          <div className="absolute inset-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            404
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
        <p className="text-muted-foreground text-lg">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Link
            href="/map"
            className="flex flex-col items-center p-4 rounded-lg border bg-background hover:bg-muted/50 transition-all duration-300 hover:shadow-md"
          >
            <MapPin className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm font-medium">Explore Map</span>
          </Link>
          <Link
            href="/marketplace"
            className="flex flex-col items-center p-4 rounded-lg border bg-background hover:bg-muted/50 transition-all duration-300 hover:shadow-md"
          >
            <Search className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm font-medium">Marketplace</span>
          </Link>
          <Link
            href="/services"
            className="flex flex-col items-center p-4 rounded-lg border bg-background hover:bg-muted/50 transition-all duration-300 hover:shadow-md sm:col-span-1 col-span-2"
          >
            <Search className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm font-medium">Services</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
