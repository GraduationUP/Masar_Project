import Image from "next/image"
import HeroMap from "./hero-map"
import { Button } from "./ui/button"
import { MapPinIcon, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
    return (
        <section className="relative min-h-[600px] md:min-h-[700px] flex items-center">
            <div className="absolute inset-0 w-full h-full">
                <HeroMap />
            </div>
            <div className="absolute inset-0 bg-gradient-to-l from-background/95 via-background/80 to-background/30 flex items-center">
                <div className="container px-4 md:px-6">
                    <div className="max-w-lg space-y-6 animate-slide-up">
                        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                            استكشف محيطك
                        </div>
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                            استكشف <span className="gradient-heading">الخدمات و المنتجات</span> المحلية
                        </h1>
                        <p className="text-muted-foreground md:text-xl">
                            ابحث عن البائعين والخدمات الأساسية القريبة منك على مسار - منصتك الشاملة للسوق المحلي.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                asChild
                                size="lg"
                                className="bg-gradient-to-r from-[#4bbae6] to-[#4682B4] rounded-full"
                            >
                                <Link href="/map">
                                    <MapPinIcon className="mr-2 h-4 w-4" />
                                    استكشف الخريطة
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="rounded-full">
                                <Link href="/marketplace">
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                    زيارة المتجر
                                </Link>
                            </Button>
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
    )
}