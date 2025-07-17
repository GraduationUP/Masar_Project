import { Fuel, ShoppingBag, Utensils, AmbulanceIcon as FirstAid, Car, Home, Wifi, Truck } from "lucide-react"

const categories = [
  {
    name: "محطات وقود",
    icon: Fuel,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
  },
  {
    name: "متجر بقالة",
    icon: ShoppingBag,
    color: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
  },
  {
    name: "مطاعم",
    icon: Utensils,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400",
  },
  {
    name: "خدمات طبية",
    icon: FirstAid,
    color: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
  },
  {
    name: "خدمات السيارات",
    icon: Car,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  },
  {
    name: "خدمات منزلية",
    icon: Home,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
  },
  {
    name: "الانترنت والتكنولوجيا",
    icon: Wifi,
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
  },
  {
    name: "التوصيل",
    icon: Truck,
    color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400",
  },
]

export default function ServiceCategories() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <div
          key={category.name}
          className="flex flex-col items-center gap-3 p-6 rounded-xl border bg-background hover:bg-muted/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
        >
          <div className={`p-4 rounded-full ${category.color} transition-transform duration-300 group-hover:scale-110`}>
            <category.icon className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium text-center">{category.name}</span>
        </div>
      ))}
    </div>
  )
}

