import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Loading() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-4 w-[200px] mt-2" />
          </div>
          <div className="hidden md:block">
            <Skeleton className="h-10 w-[150px] rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Skeleton className="h-4 w-[120px]" />
              </CardTitle>
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-[50px]" />
              <Skeleton className="h-4 w-[100px] mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Skeleton className="h-4 w-[80px]" />
              </CardTitle>
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-[50px]" />
              <Skeleton className="h-4 w-[150px] mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="stores">
          <TabsList>
            <TabsTrigger value="stores"><Skeleton className="h-6 w-[80px]" /></TabsTrigger>
            <TabsTrigger value="products"><Skeleton className="h-6 w-[80px]" /></TabsTrigger>
            <TabsTrigger value="analytics"><Skeleton className="h-6 w-[80px]" /></TabsTrigger>
          </TabsList>
          <TabsContent value="stores" className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-[100px]" />
            </div>
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                <Skeleton className="h-8 w-8 mb-2" />
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-4 w-[200px] mt-1" />
                <Skeleton className="h-10 w-[120px] mt-4 rounded-full" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="products" className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="h-10 w-[150px] rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="relative h-40 w-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardContent className="p-4">
                    <Skeleton className="h-5 w-full" />
                    <div className="flex items-center justify-between mt-2">
                      <Skeleton className="h-5 w-[80px]" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Skeleton className="h-8 w-[80px] rounded-full" />
                    <Skeleton className="h-8 w-[80px] rounded-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Skeleton className="h-6 w-[100px]" />
            <Card>
              <CardHeader>
                <CardTitle><Skeleton className="h-6 w-[120px]" /></CardTitle>
                <CardDescription><Skeleton className="h-4 w-[250px]" /></CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <Skeleton className="h-16 w-16 mb-4" />
                  <Skeleton className="h-6 w-[200px]" />
                  <Skeleton className="h-4 w-[300px] mt-2" />
                  <Skeleton className="h-4 w-[280px] mt-1" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}