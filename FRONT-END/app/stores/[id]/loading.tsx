import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Loading() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8 animate-pulse">
        {/* Store Header */}
        <div className="relative h-64 w-full rounded-lg bg-muted"></div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <div className="h-10 w-24 bg-muted rounded-lg"></div>
          <div className="h-10 w-24 bg-muted rounded-lg"></div>
          <div className="h-10 w-32 bg-muted rounded-lg ml-auto"></div>
        </div>

        {/* Store Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList>
                <TabsTrigger value="about" disabled>
                  About
                </TabsTrigger>
                <TabsTrigger value="products" disabled>
                  Products
                </TabsTrigger>
                <TabsTrigger value="reviews" disabled>
                  Reviews
                </TabsTrigger>
              </TabsList>
              <div className="mt-6 space-y-6">
                <div>
                  <div className="h-6 w-1/3 bg-muted rounded-lg mb-2"></div>
                  <div className="h-4 w-full bg-muted rounded-lg"></div>
                  <div className="h-4 w-5/6 bg-muted rounded-lg mt-1"></div>
                </div>

                <div>
                  <div className="h-6 w-1/4 bg-muted rounded-lg mb-2"></div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-6 w-20 bg-muted rounded-full"></div>
                    <div className="h-6 w-24 bg-muted rounded-full"></div>
                    <div className="h-6 w-16 bg-muted rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="h-6 w-1/3 bg-muted rounded-lg mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-1/2 bg-muted rounded-lg"></div>
                    <div className="h-4 w-2/3 bg-muted rounded-lg"></div>
                    <div className="h-4 w-1/2 bg-muted rounded-lg"></div>
                  </div>
                </div>
              </div>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="h-6 w-1/2 bg-muted rounded-lg mb-2"></div>
                <div className="h-64 bg-muted rounded-lg mb-4"></div>
                <div className="h-4 w-full bg-muted rounded-lg"></div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="h-6 w-2/3 bg-muted rounded-lg mb-2"></div>
                <div className="h-4 w-full bg-muted rounded-lg"></div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="h-6 w-1/2 bg-muted rounded-lg mb-2"></div>
                <div className="space-y-2">
                  <div className="h-10 w-full bg-muted rounded-lg"></div>
                  <div className="h-10 w-full bg-muted rounded-lg"></div>
                  <div className="h-10 w-full bg-muted rounded-lg"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
