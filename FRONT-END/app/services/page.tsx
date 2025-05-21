"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Clock, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Service = {
  id: string
  name: string
  description: string
  category: string
  isEmergency: boolean
  isOpen: boolean
  image: string
  rating?: number
  location: { address: string }
  contactInfo: { phone: string }
  openingHours: { monday: string }
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "مركز صحي المدينة",
    description: "يقدم خدمات طبية على مدار الساعة.",
    category: "الصحة",
    isEmergency: true,
    isOpen: true,
    image: "/clinic.jpg",
    rating: 4.5,
    location: { address: "شارع النصر، غزة" },
    contactInfo: { phone: "0599123456" },
    openingHours: { monday: "Open 24 Hours" },
  },
  {
    id: "2",
    name: "صيانة سيارات الأمل",
    description: "خدمة صيانة سريعة وفعالة لجميع أنواع السيارات.",
    category: "صيانة",
    isEmergency: false,
    isOpen: false,
    image: "/garage.jpg",
    rating: 4.2,
    location: { address: "شارع الصناعة، خان يونس" },
    contactInfo: { phone: "0599988776" },
    openingHours: { monday: "9:00 AM - 5:00 PM" },
  },
  // أضف المزيد من الخدمات هنا حسب الحاجة
]

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    // بدلاً من التخزين، استخدم البيانات الوهمية مباشرة
    setServices(mockServices)

    const uniqueCategories = Array.from(new Set(mockServices.map((service) => service.category)))
    setCategories(uniqueCategories)
  }, [])

  const filteredServices =
    selectedCategory === "all" ? services : services.filter((service) => service.category === selectedCategory)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">الخدمات</h1>
          <p className="text-muted-foreground mt-1">اعثر على الخدمات الأساسية في منطقتك</p>
        </div>
        <Link href="/services/emergency">
          <Button variant="destructive">خدمات الطوارئ</Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>
            جميع الأقسام
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Link href={`/services/${service.id}`} key={service.id}>
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader className="relative p-0">
                <div className="h-48 w-full relative">
                  <Image
                    src={service.image || "/placeholder.svg?height=200&width=400&query=service"}
                    alt={service.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                {service.isEmergency && (
                  <Badge variant="destructive" className="absolute top-2 right-2">
                    الطوارئ
                  </Badge>
                )}
                {service.isOpen ? (
                  <Badge
                    variant="outline"
                    className="absolute top-2 left-2 bg-green-100 text-green-800 border-green-300"
                  >
                    مفتوح
                  </Badge>
                ) : (
                  <Badge variant="outline" className="absolute top-2 left-2 bg-red-100 text-red-800 border-red-300">
                    مغلق
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="text-xl mb-2">{service.name}</CardTitle>
                <CardDescription className="line-clamp-2 mb-4">{service.description}</CardDescription>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="truncate">{service.location.address}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Phone className="h-4 w-4 mr-1" />
                  <span>{service.contactInfo.phone}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="truncate">
                    {service.openingHours.monday === "Open 24 Hours" ? "مفتوح 24 ساعة" : service.openingHours.monday}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Badge>{service.category}</Badge>
                {service.rating && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{service.rating.toFixed(1)}</span>
                  </div>
                )}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">لم يتم ايجاد اي خدمة</h3>
          <p className="text-muted-foreground mt-1">حاول اختيار قسم خدمات اخر او قم بالعودة لاحقاً</p>
        </div>
      )}
    </div>
  )
}
