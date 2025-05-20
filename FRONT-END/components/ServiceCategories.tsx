import ServiceList from "./ServiceList";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";

export default function ServiceCategories() {
    return (
        <section className="container px-4 md:px-6 section-padding">
            <div className="flex flex-col gap-6 mb-10">
                <div className="flex flex-col gap-2 max-w-[800px]">
                    <SectionTag content="الخدمات الأساسية"/>
                    <SectionTitle title="اعثر على الخدمات التي تحتاجها" discription="اكتشف وتواصل مع مقدمي الخدمات المحليين لتلبية جميع احتياجاتك الأساسية."/>
                </div>
                <ServiceList />
            </div>
        </section>
    )
}