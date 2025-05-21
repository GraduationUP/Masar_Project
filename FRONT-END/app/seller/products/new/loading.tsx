export default function Loading() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8 animate-pulse">
        <div className="h-10 w-1/3 bg-muted rounded-lg"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="h-64 bg-muted rounded-lg"></div>
          </div>
          <div className="space-y-6">
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="h-64 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
