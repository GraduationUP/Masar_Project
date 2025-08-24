import ServiceCard from "./ServiceCard";
import {
  Fuel,
  ShoppingBag,
  Utensils,
  Car,
  Flame,
  Package,
  Wifi,
  Truck,
} from "lucide-react";
import ServicesTitle from "./ServicesTitle";

const categories = [
  {
    name: "اماكن توزيع المساعدات",
    icon: Package,
    searchTerm: "aids",
    description: "يمكنك الاطلاع على جميع نقاط توزيع المساعدات في منطقتك",
  },
  {
     name: "الأسواق الشعبية",
    icon: ShoppingBag,
    searchTerm: "market",
    description: "الأسواق الشعبية هي وجهتك اليومية، يمكنك الاطلاع على اماكن تواجدها",
  },
  {
   name: "نقاط توزيع الغاز",
    icon: Flame,
    searchTerm:"gas_station",
    description:
      "تعد نقاط توزيع الغاز من اهم الأماكن لمساعتك في توفير غاز الطهي",
  },
  {
    name: "المطاعم",
    icon: Utensils,
    searchTerm: "restaurants",
    description: "تتواجد العديد من المطاعم في منطقتك يمكنك التعرف عليها",
  },
  {
    name: "خدمات السيارات",
    icon: Car,
    searchTerm: "car_services",
    description: "متاح ورشات اصلاح وتعديل لجميع انواع السيارات",
  },
  {
    name: "محطات الوقود",
    icon: Fuel,
    searchTerm: "petrol_station",
    description: "تذكر دائما التزود بالوقود خلال رحلاتك الطويلة",
  },
  {
      name: "نقاط الانترنت",
    icon: Wifi,
    searchTerm: "internet",
    description:
      "تقدم نقاط الانرنت خدمة الانترنت فائق السرغة والكهرباء للجميع.",
  },
  {
   name: "خدمات التوصيل",
    icon: Truck,
    searchTerm: "delivery",
    description: "التوصيل لكافة مناطق المناطق وبكفاءة عالية.",
  },
];

export default function OurServicesSection() {
  return (
    <div className="container">
      <ServicesTitle SubTitle="خدماتنا" MainTitle="نقدم أفضل جودة" centralize />
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <ServiceCard
            key={category.name}
            name={category.name}
            icon={category.icon}
            searchTerm={category.searchTerm}
          >
            {category.description}
          </ServiceCard>
        ))}
      </div>
    </div>
  );
}
