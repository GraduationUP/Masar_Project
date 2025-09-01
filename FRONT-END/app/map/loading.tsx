import Header from "@/components/main_layout/header";
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <>
      <Header />
      <div className="container px-4 md:px-6 py-8 section-padding">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            خريطة الخدمات التفاعلية
          </h1>
          <p className="text-muted-foreground text-lg">
            استكشف الخدمات والمتاجر في محيطك
          </p>
        </div>
        <div className="flex justify-center">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      </div>
    </>
  );
}
