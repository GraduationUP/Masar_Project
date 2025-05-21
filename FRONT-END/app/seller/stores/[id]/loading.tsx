import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Loading() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8 animate-pulse">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-20 bg-muted rounded-lg"></div>
          <div className="h-4 w-4 bg-muted rounded-full"></div>
          <div className="h-4 w-24 bg-muted rounded-lg"></div>
          <div className="h-4 w-4 bg-muted rounded-full"></div>
          <div className="h-4 w-32 bg-muted rounded-lg"></div>
        </div>

        {/* Store Header */}
        <div className="relative h-48 md:h-64 w-full rounded-xl bg-muted"></div>

        {/* Store Management Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-lg mb-6">
            <TabsTrigger value="overview" disabled>
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" disabled>
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" disabled>
              Orders
            </TabsTrigger>
            <TabsTrigger value="settings" disabled>
              Settings
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="h-6 w-1/3 bg-muted rounded-lg"></div>
                  <div className="h-4 w-1/2 bg-muted rounded-lg"></div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="h-24 bg-muted rounded-lg"></div>
                    <div className="h-24 bg-muted rounded-lg"></div>
                    <div className="h-24 bg-muted rounded-lg"></div>
                  </div>
                  <div className="mt-6 h-64 bg-muted rounded-lg"></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-6 w-1/3 bg-muted rounded-lg"></div>
                  <div className="h-4 w-1/2 bg-muted rounded-lg"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4 p-3">
                        <div className="h-16 w-16 bg-muted rounded-md"></div>
                        <div className="flex-1">
                          <div className="h-5 w-1/3 bg-muted rounded-lg mb-2"></div>
                          <div className="h-4 w-1/2 bg-muted rounded-lg"></div>
                        </div>
                        <div className="h-8 w-8 bg-muted rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="h-6 w-1/2 bg-muted rounded-lg"></div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="h-10 w-full bg-muted rounded-lg"></div>
                  <div className="h-10 w-full bg-muted rounded-lg"></div>
                  <div className="h-10 w-full bg-muted rounded-lg"></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-6 w-1/2 bg-muted rounded-lg"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-6 w-full bg-muted rounded-lg"></div>
                  <div className="h-1 w-full bg-muted rounded-lg"></div>
                  <div className="h-6 w-full bg-muted rounded-lg"></div>
                  <div className="h-1 w-full bg-muted rounded-lg"></div>
                  <div className="h-6 w-full bg-muted rounded-lg"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
