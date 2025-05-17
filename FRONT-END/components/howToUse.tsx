import HowToUseCard from "./howToUseCard";
import Span from "./ui/Span";
import Tab from "./ui/tab";

export default function HowToUse() {
    return (
        <div className="container">
            <h2 className="font-bold text-4xl">خطوات التواصل مع الخدمات المحلية</h2>
            <Span>مسار يوفر لك طرق التوصل للخدمات والتواصل معها بسهولة</Span>
            <div className="flex gap-8">
                <HowToUseCard title="حدد الخدمة المرغوبة" description="يمكنك تحديد الخدمات والمتاجر المحلية التي ترغبها من خلال خريطة الخدمات التفاعلية" muiIcon="" />
                <HowToUseCard title="تواصل مع البائع" description="بعد قراءة التقييمات الخاصة بالمنتج , تواصل مع البائع من خلال مسار" muiIcon="" />
                <HowToUseCard title="حقق هدفك" description="الخدمات والمنتجات التي تحتاجها , ستجدها في مكان واحد" muiIcon="" />
            </div>
            <Tab link="/sgin-up" blue>انضم لعائلة مسار</Tab>
        </div>
    )
}