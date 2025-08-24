import {
  Fuel,
  ShoppingBag,
  Utensils,
  AmbulanceIcon as FirstAid,
  Car,
  Home,
  Package,
  MapPinned,
  Flame,
  Wifi,
  Truck,
} from "lucide-react";
import ServiceCard from "../services/ServiceCard";

const categories = [
  {
    name: "اماكن توزيع المساعدات",
    icon: Package,
    searchTerm: "aids",
  },
  {
    name: "الأسواق الشعبية",
    icon: ShoppingBag,
    searchTerm: "market",
  },
  {
    name: "نقاط توزيع الغاز",
    icon: Flame,
    searchTerm:"gas_station"
  },
  {
    name: "المطاعم",
    icon: Utensils,
    searchTerm: "restaurants"
  },
  {
    name: "خدمات السيارات",
    icon: Car,
    searchTerm: "car_services"
  },
  {
    name: "محطات الوقود",
    icon: Fuel,
    searchTerm: "petrol_station"
  },
  {
    name: "نقاط الانترنت",
    icon: Wifi,
    searchTerm: "internet"
  },
  {
    name: "خدمات التوصيل",
    icon: Truck,
    searchTerm: "delivery",
  },
];

export default function ServiceCategories() {
  return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <ServiceCard key={category.name} name={category.name} icon={category.icon} searchTerm={category.searchTerm}/>
        ))}
      </div>
  );
}
