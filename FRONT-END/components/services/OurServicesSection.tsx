import ServiceCard from "./ServiceCard";
import {
  Fuel,
  ShoppingBag,
  Utensils,
  AmbulanceIcon as FirstAid,
  Car,
  Home,
  Wifi,
  Truck,
} from "lucide-react";
import ServicesTitle from "./ServicesTitle";

const categories = [
  {
    name: "محطات الغاز",
    icon: Fuel,
    description: "تتميز محطات الغاز بتقديم خدمة للزبائن 24/7",
  },
  {
    name: "متاجر خضار",
    icon: ShoppingBag,
    description: "تعد متاجر الخضار وجهات مفضلة للمنتجات الطازجة.",
  },
  {
    name: "مطاعم",
    icon: Utensils,
    description:
      "تعتبر المطاعم هي الواجهة الرئيسية لكل الشباب حيث المأكولات الشهية.",
  },
  {
    name: "خدمات طبية",
    icon: FirstAid,
    description: "خدمات طبية متاحة 24/7 حتى باب منزلك",
  },
  {
    name: "خدمات السيارات",
    icon: Car,
    description: "متاح ورشات اصلاح وتعديل لجميع انواع السيارات",
  },
  {
    name: "خدمات منزلية",
    icon: Home,
    description: "متوفر خدمات منزلية لكافة المناطق",
  },
  {
    name: "الانترنت والتكنولوجيا",
    icon: Wifi,
    description:
      "تقدم نقاط الانرنت خدمة الانترنت فائق السرغة والكهرباء للجميع.",
  },
  {
    name: "التوصيل",
    icon: Truck,
    description: "التوصيل لكافة مناطق الدولة.",
  },
];

export default function OurServicesSection() {
  return (
    <div className="container">
      <ServicesTitle SubTitle="خدماتنا" MainTitle="نقدم أفضل جودة" centralize />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <ServiceCard
            key={category.name}
            name={category.name}
            icon={category.icon}
          >
            {category.description}
          </ServiceCard>
        ))}
      </div>
    </div>
  );
}
