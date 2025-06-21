'use client';

import { MapPinIcon, ShoppingBag, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
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
                    <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                        كيف يعمل الموقع؟
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        خطوات بسيطة للاتصال بالخدمات المحلية
                    </h2>
                    <p className="text-muted-foreground text-lg mt-4">
                        مسار يسهل العثور والاتصال بالخدمات والمنتجات التي تحتاجها.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full staggered-animation">
                    <div className="flex flex-col items-center gap-4 p-8 bg-background rounded-xl border shadow-sm card-hover">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <MapPinIcon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">البحث عن خدمة</h3>
                        <p className="text-muted-foreground text-center">
                            اكتشف الخدمات والمتاجر المحلية على خريطتنا التفاعلية
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4 p-8 bg-background rounded-xl border shadow-sm card-hover">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <ShoppingBag className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">الاتصال بالبائعين</h3>
                        <p className="text-muted-foreground text-center">
                            تصفح المنتجات، اقرأ التعليقات، واتصل بالبائعين مباشرة من خلال منصتنا.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4 p-8 bg-background rounded-xl border shadow-sm card-hover">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Zap className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">احصل على ما تحتاجه</h3>
                        <p className="text-muted-foreground text-center">
                            اكتشف الخدمات والمنتجات الأساسية عندما تحتاجها، كلها في مكان واحد.
                        </p>
                    </div>
                </div>
                {!isLoggedIn &&
                    <Button
                        asChild
                        size="lg"
                        className="mt-8 rounded-full bg-gradient-to-r from-[#4bbae6] to-[#4682B4]"
                    >
                        <Link href="/register">انضم إلى مسار الان</Link>
                    </Button>
                }
            </div>
        </section>
    )
}
