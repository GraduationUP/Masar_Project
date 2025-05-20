import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import { Button } from "./ui/button";
import { MapPinIcon, ShoppingBag, Zap } from "lucide-react";
import Link from "next/link";

export default function HowToUse() {
    return (
        <section className="container px-4 md:px-6 section-padding">
            <div className="flex flex-col gap-8 items-center text-center">
                <div className="max-w-[800px]">
                    <SectionTag content="كيف يعمل" />
                    <SectionTitle title="خطوات بسيطة للتواصل مع الخدمات المحلية" discription="يُسهّل عليك مسار البحث عن الخدمات والمنتجات التي تحتاجها والتواصل معها." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full staggered-animation">
                    <div className="flex flex-col items-center gap-4 p-8 bg-background rounded-xl border shadow-sm card-hover">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <MapPinIcon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">ابحث عن الخدمات</h3>
                        <p className="text-muted-foreground text-center">
                            اكتشف الخدمات والمتاجر المحلية على خريطتنا التفاعلية مع إمكانية الفلترة الفورية.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4 p-8 bg-background rounded-xl border shadow-sm card-hover">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <ShoppingBag className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">تواصل مع البائعين</h3>
                        <p className="text-muted-foreground text-center">
                            تصفح المنتجات، واقرأ التقييمات، وتواصل مع البائعين مباشرةً عبر منصتنا.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4 p-8 bg-background rounded-xl border shadow-sm card-hover">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Zap className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">احصل على ما تحتاجه
                        </h3>
                        <p className="text-muted-foreground text-center">
                            اعثر على الخدمات والمنتجات الأساسية التي تحتاجها، كل ذلك في مكان واحد.
                        </p>
                    </div>
                </div>
                <div className="text-white">
                    <Button
                        asChild
                        size="lg"
                        className="mt-8 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#4A90E2]"
                    >
                        <Link href="/register">انضم الى مسار</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
