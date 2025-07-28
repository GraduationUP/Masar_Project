import Image from "next/image";
import { Button } from "../ui/button";
import { MapPinIcon, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={"/images/mapBG.png"}
          alt="Background"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-l from-background/95 via-background/80 to-background/30 flex pt-5">
        <div className="container px-4 md:px-6 py-12">
          <div className="max-w-4xl space-y-6 animate-slide-up mb-12">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              استكشف محيطك
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              المسار الصحيح للمنتجات والخدمات المحلية المرغوبة
            </h1>
            <p className="text-muted-foreground md:text-xl">
              موقع مسار يساعدك على إيجاد الأماكن التجارية ونقاط الخدمات المحلية
              بسهولة بعد التواصل مع أصحابها
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#4bbae6] to-[#4682B4] rounded-full"
              >
                <Link href="/map">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  تصفح الخريطة
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full"
              >
                <Link href="/marketplace">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  تسوق الآن
                </Link>
              </Button>
            </div>
          </div>
          <div
            className="flex py-5 gap-10"
          >
            {/* Right Column */}
            <div className="pr-5">
              <div className="flex items-center border-t-2 py-3">
                <span className="text-blue-700 ml-2 text-xl">✓</span>
                <p className="m-0 text-base text-muted-foreground">
                  أدوات بديهية للتعاون الفعال بين الفريق.
                </p>
              </div>
              <div className="flex items-center border-t-2 border-b-2 py-3">
                <span className="text-blue-700 ml-2 text-xl">✓</span>
                <p className="m-0 text-base text-muted-foreground">
                  قابل للتكيف مع الأعمال من أي مكان.
                </p>
              </div>
            </div>

            {/* Left Column */}
            <div className="pl-5">
              <div className="flex items-center border-t-2 py-3">
                <span className="text-blue-700 ml-2 text-xl">✓</span>
                <p className="m-0 text-base text-muted-foreground">
                 حلول متطورة للبحث عن الاماكن لمناسبة لك
                </p>
              </div>
              <div className="flex items-center border-t-2 border-b-2 py-3">
                <span className="text-blue-700 ml-2 text-xl">✓</span>
                <p className="m-0 text-base text-muted-foreground">
                  دقيق لتحقيق تنفيذ خالٍ من العيوب.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="rounded-full bg-background/80 backdrop-blur-md p-4 shadow-lg">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
        </div>
      </div>
    </section>
  );
}
