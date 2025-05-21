"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Filter, Search, ShoppingBag, Star } from "lucide-react"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: string
  rating?: number
  createdAt: string
  storeId: string
}

type Store = {
  id: string
  name: string
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "سوار يدوى",
    description: "سوار رائع مصنوع من الفولاذ المقاوم للصدأ.",
    price: 25.5,
    image: "/images/bracelet.jpg",
    category: "اكسسوارات",
    rating: 4.7,
    createdAt: "2024-12-01",
    storeId: "a1",
  },
  {
    id: "2",
    name: "ماوس لاسلكى",
    description: "ماوس لاسلكى مريح ومستجيب.",
    price: 18.0,
    image: "/images/mouse.jpg",
    category: "اجهزة الكترونية",
    rating: 4.3,
    createdAt: "2025-01-15",
    storeId: "a2",
  },
  {
    id: "3",
    name: "دفتر ملاحظات من الجلد",
    description: "دفتر ملاحظات من الجلد من نوعية ممتازة.",
    price: 12.99,
    image: "/images/notebook.jpg",
    category: "قرطاسية",
    rating: 4.3,
    createdAt: "2025-02-10",
    storeId: "a1",
  },
]

const initialStores: Store[] = [
  { id: "a1", name: "Osama's Store" },
  { id: "a2", name: "Tech World" },
]

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [stores, setStores] = useState<Store[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    setProducts(initialProducts)
    setStores(initialStores)
  }, [])

  const allCategories = [
    ...new Set(products.map((product) => product.category)),
  ].sort()

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      categoryFilter === "" ||
      categoryFilter === "all" ||
      product.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "price-low") {
      return a.price - b.price
    } else if (sortBy === "price-high") {
      return b.price - a.price
    } else if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0)
    }
    return 0
  })

  const getStoreName = (storeId: string) => {
    const store = stores.find((s) => s.id === storeId)
    return store ? store.name : "Unknown Store"
  }
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">السوق</h1>
          <p className="text-muted-foreground">تصفح البضائع من الباعة المحليين</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تصفية نتائج البحث</CardTitle>
                <CardDescription>قم بتحسين بحثك عن المنتجات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">ابحث</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      type="search"
                      placeholder="ابحث عن بضائع..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">القسم</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="جميع الأقسام" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأقسام</SelectItem>
                      {allCategories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sort">ترتيب بواسطة</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort">
                      <SelectValue placeholder="ترتيب بواسطة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">الأحدث</SelectItem>
                      <SelectItem value="price-low">السعر: الأقل الى الأعلى</SelectItem>
                      <SelectItem value="price-high">السعر: الأعلى للأقل</SelectItem>
                      <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSearchQuery("")
                      setCategoryFilter("")
                      setSortBy("newest")
                    }}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    اعادة ضبط الفلتر
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          {sortedProducts.length === 0 ? "جار تحميل البضائع..." :
            <div className="md:col-span-3">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="mobile-sort" className="sr-only">
                    رتب
                  </Label>
                  <Select value={sortBy} onValueChange={setSortBy} className="md:hidden">
                    <SelectTrigger id="mobile-sort" className="w-[180px]">
                      <SelectValue placeholder="ترتيب بواسطة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">الأحدث</SelectItem>
                      <SelectItem value="price-low">السعر: الأقل الى الأعلى</SelectItem>
                      <SelectItem value="price-high">السعر: الأعلى الى الأقل</SelectItem>
                      <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {sortedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">لا يوجد اي بضاعة</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    حاول تعديل بحثك أو فلترتك للعثور على ما تبحث عنه.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <Link href={`/products/${product.id}`} key={product.id}>
                      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                        <div className="relative h-48 w-full">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-background/80 hover:bg-background/80 backdrop-blur-sm text-foreground">
                              {product.category}
                            </Badge>
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
                        <CardFooter className="p-4 pt-0 border-t">
                          <span className="text-xs text-muted-foreground">{getStoreName(product.storeId)}</span>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>}
        </div>
      </div>
    </div>
  )
}
