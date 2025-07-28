"use client";

import { MapPinIcon, ShoppingBag, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

export default function HowItWorksSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <section className="container px-4 md:px-6 section-padding">
      <div className="flex flex-col gap-8 items-center text-center">
        <div className="max-w-[800px]">
          <div className="inline-block rounded-full px-3 py-1 text-xl text-primary mb-4">
            كيف تستخدم مسار ؟
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            خطوات التواصل مع الخدمات المحلية
          </h2>
          <p className="text-muted-foreground text-lg mt-4">
            مسار يوفر لك طرق التوصل للخدمات والتواصل معها بسهولة
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full staggered-animation">
          <div className="flex flex-col items-center gap-4 p-8 bg-background rounded-xl border shadow-sm card-hover">
            <div className="bg-primary/10 p-4 rounded-full">
              <MapPinIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">حدد الخدمة المرغوبة</h3>
            <p className="text-muted-foreground text-center">
              يمكنك تحديد الخدمات والمتاجر المحلية التي ترغبها من خلال خريطة
              الخدمات التفاعلية.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 p-8 bg-background rounded-xl border shadow-sm card-hover">
            <div className="bg-primary/10 p-4 rounded-full">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">تواصل مع البائع</h3>
            <p className="text-muted-foreground text-center">
              بعد قراءة التقييمات بعناية، يمكنك التواصل مع البائع للحصول على
              مزيد من المعلومات التفصيلية حول المنتج.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 p-8 bg-background rounded-xl border shadow-sm card-hover">
            <div className="bg-primary/10 p-4 rounded-full">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">حقق هدفك</h3>
            <p className="text-muted-foreground text-center">
              ستجد جميع الخدمات والمنتجات التي تحتاجها في مكان واحد، مما يسهل
              عليك الوصول إليها واختيار ما يناسبك.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
