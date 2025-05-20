import Link from "next/link"
import { Fuel, ShoppingBag, Utensils, AmbulanceIcon as FirstAid, Car, Home, Wifi, Truck } from "lucide-react"

const categories = [
  {
    name: "محطات الوقود",
    icon: Fuel,
    color: "bg-amber-50 text-amber-600 dark:bg-amber-500/40 dark:text-amber-400",
    href: "/services/gas-stations",
  },
  {
    name: "متاجر البقالة",
    icon: ShoppingBag,
    color: "bg-green-50 text-green-600 dark:bg-green-500/40 dark:text-green-400",
    href: "/services/grocery-stores",
  },
  {
    name: "مطاعم",
    icon: Utensils,
    color: "bg-orange-50 text-orange-600 dark:bg-orange-500/40 dark:text-orange-400",
    href: "/services/restaurants",
  },
  {
    name: "خدمات طبية",
    icon: FirstAid,
    color: "bg-red-50 text-red-600 dark:bg-red-500/40 dark:text-red-400",
    href: "/services/medical",
  },
  {
    name: "خدمات السيارات",
    icon: Car,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-500/40 dark:text-blue-400",
    href: "/services/auto",
  },
  {
    name: "خدمات منزلية",
    icon: Home,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-500/40 dark:text-purple-400",
    href: "/services/home",
  },
  {
    name: "الانترنت والتكنولوجيا",
    icon: Wifi,
    color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/40 dark:text-indigo-400",
    href: "/services/tech",
  },
  {
    name: "التوصيل",
    icon: Truck,
    color: "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/40 dark:text-yellow-400",
    href: "/services/delivery",
  },
]

export default function ServiceList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="flex flex-col items-center gap-3 p-6 rounded-xl border bg-background hover:bg-muted/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
        >
          <div className={`p-4 rounded-full ${category.color} transition-transform duration-300 group-hover:scale-110`}>
            <category.icon className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium text-center">{category.name}</span>
        </Link>
      ))}
    </div>
  )
}

