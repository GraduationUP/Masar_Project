import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Loading() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8 animate-pulse">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 bg-muted rounded-lg"></div>
          <div className="h-4 w-4 bg-muted rounded-full"></div>
          <div className="h-4 w-24 bg-muted rounded-lg"></div>
          <div className="h-4 w-4 bg-muted rounded-full"></div>
          <div className="h-4 w-32 bg-muted rounded-lg"></div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="rounded-xl overflow-hidden bg-muted aspect-square"></div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="h-6 w-20 bg-muted rounded-full mb-2"></div>
              <div className="h-8 w-3/4 bg-muted rounded-lg"></div>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-4 w-24 bg-muted rounded-lg"></div>
              </div>
            </div>

            <div className="h-4 w-full bg-muted rounded-lg"></div>
            <div className="h-4 w-5/6 bg-muted rounded-lg"></div>

            <div className="pt-4 border-t">
              <div className="h-8 w-1/4 bg-muted rounded-lg"></div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-10 w-32 bg-muted rounded-full"></div>
              <div className="h-10 flex-1 bg-muted rounded-full"></div>
              <div className="h-10 w-10 bg-muted rounded-full"></div>
              <div className="h-10 w-10 bg-muted rounded-full"></div>
            </div>

            {/* Store Quick Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-muted rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-5 w-1/3 bg-muted rounded-lg mb-1"></div>
                    <div className="h-4 w-1/2 bg-muted rounded-lg"></div>
                  </div>
                  <div className="h-8 w-24 bg-muted rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-lg mb-6">
              <TabsTrigger value="details" disabled>
                Details
              </TabsTrigger>
              <TabsTrigger value="reviews" disabled>
                Reviews
              </TabsTrigger>
              <TabsTrigger value="shipping" disabled>
                Shipping
              </TabsTrigger>
            </TabsList>
            <Card>
              <CardContent className="p-6 h-64">
                <div className="h-6 w-1/4 bg-muted rounded-lg mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-muted rounded-lg"></div>
                    <div className="h-4 w-full bg-muted rounded-lg"></div>
                    <div className="h-4 w-full bg-muted rounded-lg"></div>
                    <div className="h-4 w-full bg-muted rounded-lg"></div>
                  </div>
                  <div className="h-full bg-muted rounded-lg"></div>
                </div>
              </CardContent>
            </Card>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div className="h-7 w-1/4 bg-muted rounded-lg"></div>
            <div className="h-9 w-24 bg-muted rounded-lg hidden md:block"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="overflow-hidden h-full">
                <div className="h-48 bg-muted"></div>
                <CardContent className="p-4">
                  <div className="h-5 w-3/4 bg-muted rounded-lg mb-2"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-1/4 bg-muted rounded-lg"></div>
                    <div className="h-5 w-1/6 bg-muted rounded-lg"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
