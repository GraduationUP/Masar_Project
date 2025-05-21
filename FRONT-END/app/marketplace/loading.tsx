import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-1/3 bg-muted rounded-lg animate-pulse"></div>
          <div className="h-4 w-2/3 bg-muted rounded-lg animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card className="animate-pulse">
              <div className="p-6 space-y-4">
                <div className="h-6 w-1/2 bg-muted rounded-lg"></div>
                <div className="h-4 w-3/4 bg-muted rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-4 w-1/4 bg-muted rounded-lg"></div>
                  <div className="h-10 w-full bg-muted rounded-lg"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-1/4 bg-muted rounded-lg"></div>
                  <div className="h-10 w-full bg-muted rounded-lg"></div>
                </div>
                <div className="h-10 w-full bg-muted rounded-lg"></div>
              </div>
            </Card>
          </div>

          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <div className="h-4 w-1/4 bg-muted rounded-lg animate-pulse"></div>
              <div className="h-8 w-[180px] bg-muted rounded-lg animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden h-full animate-pulse">
                  <div className="h-48 bg-muted"></div>
                  <CardContent className="p-4">
                    <div className="h-6 w-3/4 bg-muted rounded-lg mb-2"></div>
                    <div className="h-4 w-full bg-muted rounded-lg mb-4"></div>
                    <div className="flex justify-between">
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
    </div>
  )
}
