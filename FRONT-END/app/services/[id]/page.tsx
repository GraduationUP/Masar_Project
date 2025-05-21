"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, Globe, Star, ArrowLeft, Calendar, AlertTriangle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Map from "@/components/map"

// Dummy services array
const services = [
  {
    id: "1",
    name: "خدمات السباكة في المدينة",
    category: "سباكة",
    isOpen: true,
    rating: 4.7,
    description: "خدمات سباكة خبيرة لمنازل والشركات.",
    image: "/images/plumbing.jpg",
    isEmergency: true,
    contactInfo: {
      phone: "123-456-7890",
      email: "info@cityplumbing.com",
      website: "cityplumbing.com"
    },
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: "123 شارع الرئيسي، نيويورك، نيويورك"
    },
    openingHours: {
      monday: "9 صباحا - 6 مساء",
      tuesday: "9 صباحا - 6 مساء",
      wednesday: "9 صباحا - 6 مساء",
      thursday: "9 صباحا - 6 مساء",
      friday: "9 صباحا - 6 مساء",
      saturday: "10 صباحا - 4 مساء",
      sunday: "مغلق"
    }
  },
  {
    id: "2",
    name: "خدمات الكهربائية في المدينة",
    category: "كهربائي",
    isOpen: true,
    rating: 4.9,
    description: "خدمات كهربائية خبيرة لمنازل والشركات.",
    image: "/images/electrician.jpg",
    isEmergency: false,
    contactInfo: {
      phone: "123-456-7890",
      email: "info@cityelectric.com",
      website: "cityelectric.com"
    },
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: "123 شارع الرئيسي، سان فرانسيسكو، كاليفورنيا"
    },
    openingHours: {
      monday: "9 صباحا - 6 مساء",
      tuesday: "9 صباحا - 6 مساء",
      wednesday: "9 صباحا - 6 مساء",
      thursday: "9 صباحا - 6 مساء",
      friday: "9 صباحا - 6 مساء",
      saturday: "10 صباحا - 4 مساء",
      sunday: "مغلق"
    }
  },
  // Add more services as needed
]

type Service = typeof services[number]

export default function ServiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const fetchService = () => {
        const found = services.find((s) => s.id === params.id)
        setService(found || null)
        setLoading(false)

        if (!found) {
          router.push("/not-found")
        }
      }

      fetchService()
    }
  }, [params.id, router])

  if (loading) return null
  if (!service) return null

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-64 md:h-96 w-full mb-6">
            <Image
              src={service.image || "/placeholder.svg?height=400&width=800&query=service"}
              alt={service.name}
              fill
              className="object-cover rounded-lg"
            />
            {service.isEmergency && (
              <Badge variant="destructive" className="absolute top-4 right-4 text-lg py-1 px-3">
                Emergency Service
              </Badge>
            )}
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">{service.name}</h1>
            <div className="flex items-center mb-4">
              <Badge className="mr-2">{service.category}</Badge>
              {service.isOpen ? (
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                  مفتوح
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                  مغلق
                </Badge>
              )}
              {service.rating && (
                <div className="flex items-center ml-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{service.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            <p className="text-lg">{service.description}</p>
          </div>

          {service.isEmergency && (
            <Card className="mb-8 border-red-200">
              <CardHeader className="bg-red-50">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                  <CardTitle className="text-red-600">معلومات الطوارئ</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4">هذه الخدمة متاحة طوال الوقت 24/7 في حالات الطوارئ.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    اتصل بالخدمة حالاً عبر: <span className="font-bold">{service.contactInfo.phone}</span>
                  </li>
                  <li>قدم معلومات واضحة عن حالتك الطارئة</li>
                  <li>شارك موقعك الدقيق</li>
                  <li>اتبع التعليمات المعطاة من قبل مشغل الطوارئ</li>
                </ul>
              </CardContent>
            </Card>
          )}

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>الموقع</CardTitle>
              <CardDescription>يمكنك ايجاد هذه الخدمة على الخريطة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-4 rounded-md overflow-hidden">
                <Map
                  center={[service.location.lat, service.location.lng]}
                  zoom={15}
                  markers={[
                    {
                      position: [service.location.lat, service.location.lng],
                      popup: service.name,
                    },
                  ]}
                />
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{service.location.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6 sticky top-6">
            <CardHeader>
              <CardTitle>معلومات جهة الاتصال</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">{service.contactInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span>{service.contactInfo.email}</span>
              </div>
              {service.contactInfo.website && (
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-primary" />
                  <Link
                    href={`https://${service.contactInfo.website}`}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    {service.contactInfo.website}
                  </Link>
                </div>
              )}
              <Separator />
              <div>
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium">الأيام المفتوحة</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pl-8">
                  <div className="text-sm text-muted-foreground">الاثنين</div>
                  <div className="text-sm">{service.openingHours.monday}</div>
                  <div className="text-sm text-muted-foreground">الثلاثاء</div>
                  <div className="text-sm">{service.openingHours.tuesday}</div>
                  <div className="text-sm text-muted-foreground">الأربعاء</div>
                  <div className="text-sm">{service.openingHours.wednesday}</div>
                  <div className="text-sm text-muted-foreground">الخميس</div>
                  <div className="text-sm">{service.openingHours.thursday}</div>
                  <div className="text-sm text-muted-foreground">الجمعة</div>
                  <div className="text-sm">{service.openingHours.friday}</div>
                  <div className="text-sm text-muted-foreground">السبت</div>
                  <div className="text-sm">{service.openingHours.saturday}</div>
                  <div className="text-sm text-muted-foreground">الأحد</div>
                  <div className="text-sm">{service.openingHours.sunday}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get Directions</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <MapPin className="mr-2 h-4 w-4" />
                قم بفتح الخريطة
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
