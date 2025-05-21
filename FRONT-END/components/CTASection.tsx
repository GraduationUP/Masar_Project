import { Button } from "./ui/button"
import Link from "next/link"

export default function CTASection() {
    return (
        <section className="container px-4 md:px-6 section-padding">
            <div className="rounded-2xl bg-gradient-to-r from-[#4bbae6] to-[#4682B4] p-8 md:p-12 lg:p-16 text-white">
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="max-w-lg">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">مستعد لإستكشاف محيطك؟</h2>
                        <p className="text-white/80 text-lg">
                            انضم الى مسار الان واستكشف المنتجات والخدمات المحلية بالقرب منك.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" variant="secondary" className="rounded-full" asChild>
                            <Link href="/login">تسجيل الدخول</Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="default"
                            className="rounded-full bg-white text-[#4682B4] hover:bg-white/90"
                            asChild
                        >
                            <Link href="/register">انشاء حساب</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}