import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[150px] mt-2" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex flex-col gap-2 items-center justify-center">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-2 items-center justify-center">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-2 items-center justify-center">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-2 items-center justify-center">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardContent className="flex flex-col gap-4">
              <Skeleton className="h-8 w-[150px]" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-10 w-full" />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index}>
                    <Skeleton className="h-32 w-full" />
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Skeleton className="h-6 w-32" />
                          <Skeleton className="h-4 w-48 mt-2" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-20 mt-3" />
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-4">
              <Skeleton className="h-8 w-[150px]" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index}>
                    <Skeleton className="h-32 w-full" />
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-4 w-48 mt-2" />
                      <Skeleton className="h-4 w-20 mt-3" />
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-8 w-24" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48 mt-2" />
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="flex flex-col items-center text-center">
                <Skeleton className="h-16 w-16 mb-4" />
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-full mt-2 max-w-md" />
                <Skeleton className="h-4 w-full mt-1 max-w-md" />
                <Skeleton className="h-4 w-32 mt-1 max-w-md" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}