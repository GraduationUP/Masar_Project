"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Info, Mail, MapPin, MessageSquare, Phone, ShoppingBag, Star } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

// Define your types
type Product = {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: string
  rating?: number
  storeId: string
}

type Review = {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  createdAt: string
  storeId: string
}

type Store = {
  id: string
  name: string
  description: string
  categories: string[]
  logo?: string
  coverImage?: string
  rating?: number
  contactInfo: {
    phone: string
    email: string
    website?: string
  }
  location: {
    address: string
    lat: number
    lng: number
  }
  openingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
}

// Mock data arrays
const mockStores: Store[] = [
  {
    id: "1",
    name: "بنز اند بنز",
    description: "محل حلو تعال جربه.",
    categories: ["Clothing", "Accessories", "Footwear"],
    logo: "/store-logos/fashion-haven.png",
    coverImage: "/store-covers/fashion-haven.jpg",
    rating: 4.5,
    contactInfo: {
      phone: "+1 (555) 123-4567",
      email: "info@fashionhaven.com",
      website: "fashionhaven.com",
    },
    location: {
      address: "123 Fashion St, Trendy District, NY 10001",
      lat: 40.7128,
      lng: -74.006,
    },
    openingHours: {
      monday: "9:00 AM - 8:00 PM",
      tuesday: "9:00 AM - 8:00 PM",
      wednesday: "9:00 AM - 8:00 PM",
      thursday: "9:00 AM - 9:00 PM",
      friday: "9:00 AM - 9:00 PM",
      saturday: "10:00 AM - 8:00 PM",
      sunday: "11:00 AM - 6:00 PM",
    },
  },
  // Add more stores as needed
]

const mockProducts: Product[] = [
  {
    id: "101",
    name: "Premium Denim Jeans",
    description: "High-quality denim jeans with a perfect fit for all body types.",
    price: 89.99,
    image: "/products/jeans.jpg",
    category: "Clothing",
    rating: 4.7,
    storeId: "1",
  },
  {
    id: "102",
    name: "Leather Crossbody Bag",
    description: "Elegant leather bag with multiple compartments for your essentials.",
    price: 129.99,
    image: "/products/bag.jpg",
    category: "Accessories",
    rating: 4.9,
    storeId: "1",
  },
  // Add more products as needed
]

const mockReviews: Review[] = [
  {
    id: "201",
    userId: "user1",
    userName: "Alex Johnson",
    userAvatar: "/avatars/alex.jpg",
    rating: 5,
    comment: "Great store with amazing selection and friendly staff!",
    createdAt: "2023-05-15T10:30:00Z",
    storeId: "1",
  },
  {
    id: "202",
    userId: "user2",
    userName: "Sam Wilson",
    rating: 4,
    comment: "Good quality products but a bit pricey.",
    createdAt: "2023-05-10T14:45:00Z",
    storeId: "1",
  },
  // Add more reviews as needed
]

// Helper functions to work with the mock data
const getStoreById = (id: string): Store | undefined => {
  return mockStores.find(store => store.id === id)
}

const getProductsByStore = (storeId: string): Product[] => {
  return mockProducts.filter(product => product.storeId === storeId)
}

const getReviews = (storeId?: string): Review[] => {
  if (storeId) {
    return mockReviews.filter(review => review.storeId === storeId)
  }
  return mockReviews
}

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-muted/30 animate-pulse flex items-center justify-center">
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
})

export default function StorePage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [store, setStore] = useState<Store | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof id === "string") {
      // Get store details
      const storeData = getStoreById(id)
      if (storeData) {
        setStore(storeData)

        // Get store products
        const storeProducts = getProductsByStore(id)
        setProducts(storeProducts)

        // Get reviews for this store
        const storeReviews = getReviews(id)
        setReviews(storeReviews)
      } else {
        // Store not found, redirect to 404
        router.push("/not-found")
      }
    }

    setLoading(false)
  }, [id, router])

  if (loading) {
    return (
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8 animate-pulse">
          <div className="h-64 bg-muted rounded-lg"></div>
          <div className="h-8 w-1/3 bg-muted rounded-lg"></div>
          <div className="h-4 w-2/3 bg-muted rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="h-32 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!store) {
    return null // Will redirect to not-found in the useEffect
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        {/* Store Header */}
        <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-md">
          <img src={store.coverImage || "/placeholder.svg"} alt={store.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-end">
            <div className="p-6 flex items-center gap-4">
              <div className="bg-background rounded-full p-1 shadow-lg">
                <img
                  src={store.logo || "/placeholder.svg"}
                  alt={`${store.name} logo`}
                  className="h-20 w-20 rounded-full border-2 border-background"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{store.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{store.rating?.toFixed(1)}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{store.location.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="gap-2 rounded-full">
            <MessageSquare className="h-4 w-4" />
            <span>Contact</span>
          </Button>
          <Button className="gap-2 ml-auto rounded-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600">
            <ShoppingBag className="h-4 w-4" />
            <span>تصفح البضائع</span>
          </Button>
        </div>

        {/* Store Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-lg mb-6">
                <TabsTrigger value="about" className="rounded-md">
                  نبذة
                </TabsTrigger>
                <TabsTrigger value="products" className="rounded-md">
                  البضائع
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-md">
                  التقييمات
                </TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold mb-2">نبذة عن {store.name}</h2>
                  <p className="text-muted-foreground">{store.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">الأقسام</h3>
                  <div className="flex flex-wrap gap-2">
                    {store.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="rounded-full">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">معلومات التواصل</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{store.contactInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{store.contactInfo.email}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="products" className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold mb-4">البضائع</h2>
                  {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">لا يوجد بضائع</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        هذا المتجر لا يحتوي على بضائع بعد.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 staggered-animation">
                      {products.map((product) => (
                        <Link href={`/products/${product.id}`} key={product.id}>
                          <Card className="overflow-hidden h-full card-hover">
                            <div className="relative h-48 w-full">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute top-4 left-4">
                                <Badge className="glass-effect text-foreground">{product.category}</Badge>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="text-lg font-bold">{product.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
                              <div className="flex items-center justify-between mt-3">
                                <span className="font-bold">${product.price.toFixed(2)}</span>
                                {product.rating && (
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-6 animate-fade-in">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">التقييمات</h2>
                    {user && <Button className="rounded-full">اكتب تقييم</Button>}
                  </div>

                  {reviews.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">لا تقييمات بعد</h3>
                      <p className="text-sm text-muted-foreground mt-1">كن اول من يقيم المتجر.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <Card key={review.id} className="card-hover">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <Avatar>
                                <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
                                <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">{review.userName}</h3>
                                    <div className="flex">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${
                                            i < review.rating
                                              ? "fill-yellow-400 text-yellow-400"
                                              : "text-muted-foreground"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm mt-2">{review.comment}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="card-hover">
              <CardContent className="p-4">
                <h3 className="font-bold mb-2">موقع المتجر</h3>
                <div className="h-64 rounded-lg overflow-hidden mb-4">
                  <MapWithNoSSR
                    center={[store.location.lat, store.location.lng]}
                    zoom={15}
                    markers={[
                      {
                        position: [store.location.lat, store.location.lng],
                        title: store.name,
                        type: "store",
                      },
                    ]}
                  />
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span>{store.location.address}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
