"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MapPin, Phone, Clock, Star, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Service = {
  id: string
  name: string
  description: string
  isEmergency: boolean
  isOpen: boolean
  image?: string
  location: {
    address: string
  }
  contactInfo: {
    phone: string
  }
  openingHours: {
    monday: string
  }
  category: string
  rating?: number
}

const emergencyServices: Service[] = [
  {
    id: "1",
    name: "مستشفى الحياة",
    description: "مستشفى يقدم خدمات طوارئ على مدار الساعة.",
    isEmergency: true,
    isOpen: true,
    image: "/images/hospital.jpg",
    location: { address: "شارع النصر، غزة" },
    contactInfo: { phone: "123456789" },
    openingHours: { monday: "Open 24 Hours" },
    category: "مستشفى",
    rating: 4.5,
  },
  {
    id: "2",
    name: "دفاع مدني الرمال",
    description: "خدمات الإنقاذ والإطفاء الفوري.",
    isEmergency: true,
    isOpen: false,
    image: "/images/fire.jpg",
    location: { address: "حي الرمال، غزة" },
    contactInfo: { phone: "987654321" },
    openingHours: { monday: "7:00 AM - 5:00 PM" },
    category: "دفاع مدني",
    rating: 4.2,
  },
]

export default function EmergencyServicesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-red-600">خدمات الطوارئ</h1>
        <p className="text-muted-foreground mt-1">الخدمات الحيوية المتاحة على مدار الساعة</p>
      </div>

      <Alert variant="destructive" className="mb-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>مهم</AlertTitle>
        <AlertDescription>
          في حالات الطوارئ التي تهدد الحياة، يرجى الاتصال برقم الطوارئ الوطني فوراً.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emergencyServices.map((service) => (
          <Link href={`/services/${service.id}`} key={service.id}>
            <Card className="h-full transition-all hover:shadow-md border-red-200">
              <CardHeader className="relative p-0">
                <div className="h-48 w-full relative">
                  <Image
                    src={service.image || "/placeholder.svg?height=200&width=400&query=emergency+service"}
                    alt={service.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <Badge variant="destructive" className="absolute top-2 right-2">
                  طوارئ
                </Badge>
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
                <div className="flex items-center text-sm font-bold text-red-600 mb-2">
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

      {emergencyServices.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">لم يتم العثور على خدمات طوارئ</h3>
          <p className="text-muted-foreground mt-1">يرجى التحقق لاحقاً أو الاتصال برقم الطوارئ الوطني</p>
        </div>
      )}
    </div>
  )
}