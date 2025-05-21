import { Skeleton } from "@/components/ui/skeleton"

export default function ServiceDetailLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Skeleton className="h-10 w-24 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-64 md:h-96 w-full mb-6 rounded-lg" />

          <div className="mb-8">
            <Skeleton className="h-10 w-3/4 mb-2" />
            <div className="flex mb-4">
              <Skeleton className="h-6 w-20 mr-2" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="border rounded-lg mb-8">
            <div className="p-4 border-b">
              <Skeleton className="h-6 w-1/3" />
            </div>
            <div className="p-4">
              <Skeleton className="h-64 w-full mb-4 rounded-md" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        </div>

        <div>
          <div className="border rounded-lg mb-6">
            <div className="p-4 border-b">
              <Skeleton className="h-6 w-2/3" />
            </div>
            <div className="p-4 space-y-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <div className="border-t my-4"></div>
              <Skeleton className="h-5 w-1/2 mb-2" />
              <div className="space-y-2">
                {Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="border rounded-lg">
            <div className="p-4 border-b">
              <Skeleton className="h-6 w-2/3" />
            </div>
            <div className="p-4">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
