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
import ServiceCard from "../services/ServiceCard";

const categories = [
  {
    name: "محطات وقود",
    icon: Fuel,
  },
  {
    name: "متجر بقالة",
    icon: ShoppingBag,
  },
  {
    name: "مطاعم",
    icon: Utensils,
  },
  {
    name: "خدمات طبية",
    icon: FirstAid,
  },
  {
    name: "خدمات السيارات",
    icon: Car,
  },
  {
    name: "خدمات منزلية",
    icon: Home,
  },
  {
    name: "الانترنت والتكنولوجيا",
    icon: Wifi,
  },
  {
    name: "التوصيل",
    icon: Truck,
  },
];

export default function ServiceCategories() {
  return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <ServiceCard key={category.name} name={category.name} icon={category.icon} />
        ))}
      </div>
  );
}
