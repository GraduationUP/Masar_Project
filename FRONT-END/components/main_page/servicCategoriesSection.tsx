import ServiceCategories from "./service-categories"

export default function ServiceCategoriesSection() {
    return (
        <section className="container px-4 md:px-6 section-padding">
            <div className="flex flex-col gap-6 mb-10">
                <div className="flex flex-col gap-2 max-w-[800px]">
                    <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
                        الخدمات الأساسية
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">اعثر على الخدمة التي تحتاجها</h2>
                    <p className="text-muted-foreground text-lg">
                        اكتشف وتواصل مع مقدمي الخدمات المحليين لتلبية جميع احتياجاتك الأساسية.
                    </p>
                </div>
                <ServiceCategories />
            </div>
        </section>
    )
}