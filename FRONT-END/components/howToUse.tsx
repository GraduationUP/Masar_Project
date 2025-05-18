import HowToUseCard from "./howToUseCard";
import Span from "./ui/Span";
import Tab from "./ui/tab";

export default function HowToUse() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center">خطوات التواصل مع الخدمات المحلية</h2>
            <Span className="block text-center mt-2 mb-4">مسار يوفر لك طرق التوصل للخدمات والتواصل معها بسهولة</Span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <HowToUseCard title="حدد الخدمة المرغوبة" description="يمكنك تحديد الخدمات والمتاجر المحلية التي ترغبها من خلال خريطة الخدمات التفاعلية" muiIcon="" />
                <HowToUseCard title="تواصل مع البائع" description="بعد قراءة التقييمات الخاصة بالمنتج , تواصل مع البائع من خلال مسار" muiIcon="" />
                <HowToUseCard title="حقق هدفك" description="الخدمات والمنتجات التي تحتاجها , ستجدها في مكان واحد" muiIcon="" />
            </div>
            <div className="flex justify-center mt-4">
                <Tab link="/sgin-up" blue>انضم لعائلة مسار</Tab>
            </div>
        </div>
    )
}
