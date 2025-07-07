import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FeaturedStores from "./featured-stores";

export default function FeaturedStoresSection() {
  return (
    <section className="bg-muted/30">
      <div className="container px-4 md:px-6 section-padding">
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col gap-2 max-w-[800px]">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
              الأعلى تقييماً
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                اكتشف أفضل البائعين تقييمًا
              </h2>
              <Button
                variant="ghost"
                className="hidden md:flex items-center gap-1 hover:bg-transparent hover:text-primary"
                asChild
              >
                <Link href="/stores">
                  اعرض جميع المتاجر
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <p className="text-muted-foreground text-lg">
              استكشف المتاجر الأكثر شهرةً وأعلى تقييمًا في منطقتك.
            </p>
          </div>
          <FeaturedStores />
          <div className="md:hidden flex justify-center">
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/stores">اعرض جميع المتاجر</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
