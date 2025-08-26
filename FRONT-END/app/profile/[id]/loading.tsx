import Header from "@/components/main_layout/header";
import PageBanner from "@/components/main_layout/PageBanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
    <Header />
    <PageBanner>{" "}</PageBanner>
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[250px] mt-2" />
          </div>
          <div className="hidden md:block">
            <Skeleton className="h-10 w-[150px] rounded-full" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Main Content */}
          <div className="flex-grow space-y-6 w-full">
          <Card className="w-full h-fit">
            <CardContent className="p-6">
              <div className="flex justify-center">
                <Skeleton className="h-24 w-24 rounded-full" />
              </div>
              <div className="flex flex-col items-center text-center mt-4">
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-4 w-[100px] mt-2" />
              </div>
              <Separator className="my-6" />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5" />
                  <div>
                    <Skeleton className="h-4 w-[80px]" />
                    <Skeleton className="h-3 w-[120px] mt-1" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5" />
                  <div>
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-3 w-[90px] mt-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
            <Card>
              <CardHeader>
                <CardTitle><Skeleton className="h-6 w-[100px]" /></CardTitle>
                <CardDescription><Skeleton className="h-4 w-[150px]" /></CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-8 w-full rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-8 w-full rounded-lg" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-8 w-full rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-8 w-full rounded-lg" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle><Skeleton className="h-6 w-[100px]" /></CardTitle>
                <CardDescription><Skeleton className="h-4 w-[150px]" /></CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-8 w-full rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-8 w-full rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-8 w-full rounded-lg" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle><Skeleton className="h-6 w-[100px]" /></CardTitle>
                <CardDescription><Skeleton className="h-4 w-[180px]" /></CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-6 w-12 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-[130px]" />
                    <Skeleton className="h-6 w-12 rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle><Skeleton className="h-6 w-[100px]" /></CardTitle>
                <CardDescription><Skeleton className="h-4 w-[160px]" /></CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-40 w-full rounded-md" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
 </> );
}