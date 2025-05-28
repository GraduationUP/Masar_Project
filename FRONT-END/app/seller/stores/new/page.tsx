"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Loader2, StoreIcon, Upload, Check } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { addStore } from "@/lib/storage-utils"

const categories = [
  "Groceries",
  "Bakery",
  "Dairy",
  "Meat",
  "Produce",
  "Convenience",
  "Pharmacy",
  "Electronics",
  "Clothing",
  "Home Goods",
  "Automotive",
  "Fuel",
  "Restaurant",
  "Cafe",
  "Other",
]

export default function NewStorePage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [storeData, setStoreData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    logo: "",
    coverImage: "",
  })

  const handleCategoryChange = (value: string) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== value))
    } else {
      if (selectedCategories.length < 5) {
        setSelectedCategories([...selectedCategories, value])
      } else {
        toast({
          title: "Category limit reached",
          description: "You can select up to 5 categories",
          variant: "destructive",
        })
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in as a seller to create a store",
        variant: "destructive",
      })
      return
    }

    if (selectedCategories.length === 0) {
      toast({
        title: "Categories required",
        description: "Please select at least one category for your store",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Generate random coordinates near Amman, Jordan
    const lat = 31.9539 + (Math.random() - 0.5) * 0.05
    const lng = 35.9106 + (Math.random() - 0.5) * 0.05

    // Create new store
    const newStore = {
      name: storeData.name,
      description: storeData.description,
      logo: storeData.logo || "/abstract-storefront.png",
      coverImage: storeData.coverImage || "/modern-clothing-boutique.png",
      ownerId: user.id,
      categories: selectedCategories,
      location: {
        address: storeData.address || "Amman, Jordan",
        lat,
        lng,
      },
      contactInfo: {
        phone: storeData.phone,
        email: storeData.email,
        website: storeData.website,
      },
      openingHours: {
        monday: "9:00 AM - 9:00 PM",
        tuesday: "9:00 AM - 9:00 PM",
        wednesday: "9:00 AM - 9:00 PM",
        thursday: "9:00 AM - 9:00 PM",
        friday: "9:00 AM - 10:00 PM",
        saturday: "10:00 AM - 10:00 PM",
        sunday: "10:00 AM - 8:00 PM",
      },
      rating: undefined,
      reviews: [],
    }

    // Simulate API call
    setTimeout(() => {
      try {
        const store = addStore(newStore)

        toast({
          title: "Store created successfully",
          description: "Your new store has been created",
        })

        // Redirect to store management page
        router.push(`/seller/stores/${store.id}`)
      } catch (error) {
        toast({
          title: "Error creating store",
          description: "There was an error creating your store. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/seller/dashboard">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">انئ متجراً جديداً</h1>
            <p className="text-muted-foreground">قم بانشاء متجرك على مسار</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>معلومات المتجر</CardTitle>
                  <CardDescription>المعلومات الاساسية عن متجرك</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">اسم المتجر *</Label>
                    <Input
                      id="name"
                      placeholder="ادخل اسم المتجر"
                      value={storeData.name}
                      onChange={(e) => setStoreData({ ...storeData, name: e.target.value })}
                      required
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">وصف المتجر *</Label>
                    <Textarea
                      id="description"
                      placeholder="قم بوصف متجرك"
                      value={storeData.description}
                      onChange={(e) => setStoreData({ ...storeData, description: e.target.value })}
                      required
                      className="min-h-[120px] rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>اقسام المتجر *</Label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          type="button"
                          variant={selectedCategories.includes(category) ? "default" : "outline"}
                          size="sm"
                          className="rounded-full"
                          onClick={() => handleCategoryChange(category)}
                        >
                          {selectedCategories.includes(category) && <Check className="mr-1 h-3 w-3" />}
                          {category}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">اختر 5 اقسام كحد اقصى</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>معلومات الاتصال</CardTitle>
                  <CardDescription>كيف يمكن للعملاء الاتصال بك</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف *</Label>
                      <Input
                        id="phone"
                        placeholder="+962 7 1234 5678"
                        value={storeData.phone}
                        onChange={(e) => setStoreData({ ...storeData, phone: e.target.value })}
                        required
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">عنوان البريد الالكتروني *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="store@example.com"
                        value={storeData.email}
                        onChange={(e) => setStoreData({ ...storeData, email: e.target.value })}
                        required
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">موقع الويب (اختياري)</Label>
                    <Input
                      id="website"
                      placeholder="www.yourstore.com"
                      value={storeData.website}
                      onChange={(e) => setStoreData({ ...storeData, website: e.target.value })}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">عنوان المحل *</Label>
                    <Input
                      id="address"
                      placeholder="123 شارع الرئيسي، عمان، الاردن"
                      value={storeData.address}
                      onChange={(e) => setStoreData({ ...storeData, address: e.target.value })}
                      required
                      className="rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>صور المحل</CardTitle>
                  <CardDescription>حمل صور لمحلك</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>شعار المحل</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-20 w-20 rounded-full bg-muted/50 flex items-center justify-center">
                          {storeData.logo ? (
                            <img
                              src={storeData.logo || "/placeholder.svg"}
                              alt="Store logo preview"
                              className="h-full w-full rounded-full object-cover"
                            />
                          ) : (
                            <StoreIcon className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        <Button type="button" variant="outline" size="sm" className="rounded-full">
                          <Upload className="h-4 w-4 mr-2" />
                          حمل الشعار
                        </Button>
                        <p className="text-xs text-muted-foreground">مطلوب: 200x200px</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>صورة الغلاف</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-32 w-full bg-muted/50 rounded-lg flex items-center justify-center overflow-hidden">
                          {storeData.coverImage ? (
                            <img
                              src={storeData.coverImage || "/placeholder.svg"}
                              alt="Cover image preview"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Upload className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        <Button type="button" variant="outline" size="sm" className="rounded-full">
                          <Upload className="h-4 w-4 mr-2" />
                          حمل صورة الغلاف
                        </Button>
                        <p className="text-xs text-muted-foreground">مطلوب: 1200x400px</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>عرض المحل</CardTitle>
                  <CardDescription>كيف سيظهر محلك</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border overflow-hidden">
                    <div className="h-32 bg-muted/50 relative">
                      {storeData.coverImage ? (
                        <img
                          src={storeData.coverImage || "/placeholder.svg"}
                          alt="Cover preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <p className="text-sm text-muted-foreground">صورة الغلاف</p>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 bg-background rounded-full p-1">
                        <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center overflow-hidden">
                          {storeData.logo ? (
                            <img
                              src={storeData.logo || "/placeholder.svg"}
                              alt=" معاينة الشعار"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <StoreIcon className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold">{storeData.name || "اسم متجرك"}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {storeData.description || "سيظهر وصف متجرك هنا"}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedCategories.length > 0 ? (
                          selectedCategories.map((category) => (
                            <span key={category} className="text-xs bg-muted px-2 py-1 rounded-full">
                              {category}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">لا يوجد تصنيفات محددة</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button type="button" variant="outline" asChild className="rounded-full">
              <Link href="/seller/dashboard">إلغاء</Link>
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري إنشاء المتجر...
                </>
              ) : (
                <>
                  <StoreIcon className="mr-2 h-4 w-4" />
                  إنشاء متجر
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

