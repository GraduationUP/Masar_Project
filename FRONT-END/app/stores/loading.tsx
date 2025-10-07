import Header from "@/components/main_layout/header";
import PageBanner from "@/components/main_layout/PageBanner";
import PageTitle from "@/components/main_layout/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

export default function Loading() {
  return (
    <>
      <Header />
      <PageBanner>استكشف عالمًا من المتاجر </PageBanner>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-6">
          <PageTitle
            MainTitle="المتاجر"
            Subtitle="تصفح قائمة المتاجر المحلية المتاحة"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
            <Skeleton className="md:col-span-1 space-y-6">
              <Skeleton className="h-full w-full" />
            </Skeleton>
            <div className="md:col-span-3">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 md:hidden">
                  <Label htmlFor="mobile-sort-stores" className="sr-only">
                    ترتيب
                  </Label>
                  <Skeleton className="h-full w-full" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
