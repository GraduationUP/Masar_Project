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
import Image from "next/image";

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
          <div
            key={category.name}
            className="flex flex-col items-center gap-3 p-6 rounded-xl border bg-background hover:bg-[url('/BannerCard.svg')] hover:bg-no-repeat hover:bg-center hover:bg-cover transition-all duration-300 hover:shadow-md group"
          >
            <div className="p-4 rounded-full bg-[#F5F6FF] text-primary">
              <category.icon className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium text-center group-hover:text-white">
              {category.name}
            </span>
          </div>
        ))}
      </div>
  );
}
