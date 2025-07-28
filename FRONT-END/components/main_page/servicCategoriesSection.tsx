import { ArrowLeft } from "lucide-react";
import ServiceCategories from "./service-categories";
import Link from "next/link";

export default function ServiceCategoriesSection() {
  return (
    <section className="container px-4 md:px-6 section-padding">
      <div className="inline-block rounded-full text-primary w-fit">
        الخدمات
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col gap-2 max-w-[800px]">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              مسار يوفر لك الخدمات التي تحتاجها
            </h2>
            <p className="text-muted-foreground text-lg">
              اكتشف و تواصل مع الخدمات المحلية التي تناسب احتياجاتك
            </p>
          </div>
        </div>
        <div className="flex">
          <Link href={"/map"}>
            <div className="flex gap-2 text-primary">
              اكتشف المزيد
              <ArrowLeft />
            </div>
          </Link>
        </div>
      </div>
      <ServiceCategories />
    </section>
  );
}
