"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart3, CircleDollarSign, Package, Plus, Star, StoreIcon, Users } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { type Product, type Store, getProductsByStore, getStoresByOwner } from "@/lib/storage-utils"

export default function SellerDashboard() {
  const { user } = useAuth()
  const [stores, setStores] = useState<Store[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [stats, setStats] = useState({
    totalStores: 0,
    totalProducts: 0,
    totalViews: 0,
    totalRevenue: 0,
  })

  // Redirect if not logged in or not a seller
  if (!user) {
    redirect("/login")
  }

  // if (user.role !== "seller") {
  //   redirect(`/${user.role}/dashboard`)
  // }

  useEffect(() => {
    // Initialize storage with mock data
    const initStorage = async () => {
      const { initializeStorage } = await import("@/lib/storage-utils")
      initializeStorage()

      // Get seller's stores
      const sellerStores = getStoresByOwner(user.id)
      setStores(sellerStores)

      // Get all products from seller's stores
      let allProducts: Product[] = []
      sellerStores.forEach((store) => {
        const storeProducts = getProductsByStore(store.id)
        allProducts = [...allProducts, ...storeProducts]
      })
      setProducts(allProducts)

      // Calculate stats
      setStats({
        totalStores: sellerStores.length,
        totalProducts: allProducts.length,
        totalViews: Math.floor(Math.random() * 1000) + 100,
        totalRevenue: allProducts.reduce(
          (sum, product) => sum + product.price * (Math.floor(Math.random() * 10) + 1),
          0,
        ),
      })
    }

    initStorage()
  }, [user.id])

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">لوحة التحكم للبائع</h1>
            <p className="text-muted-foreground">إدارة متاجرك و منتجاتك</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/seller/products/new">
                <Package className="mr-2 h-4 w-4" />
                إضافة منتج
              </Link>
            </Button>
            <Button asChild>
              <Link href="/seller/stores/new">
                <StoreIcon className="mr-2 h-4 w-4" />
                إنشاء متجر
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">المنتجات المدرجة</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">مشاهدات المتجر</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews}</div>
              <p className="text-xs text-muted-foreground">مشاهدات هذا الشهر</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="stores">
          <TabsList>
            <TabsTrigger value="stores">متجري</TabsTrigger>
            <TabsTrigger value="products">منتجاتي</TabsTrigger>
            <TabsTrigger value="analytics">الإحصاءات</TabsTrigger>
          </TabsList>
          <TabsContent value="stores" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">متجري</h2>
            </div>

            {stores.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                  <StoreIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium">لا يوجد متجر بعد</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    أنشئ متجرك لبدء بيع المنتجات.
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/seller/stores/new">أنشئ متجر</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stores.map((store) => (
                  <Card key={store.id} className="overflow-hidden">
                    <div className="relative h-32 w-full">
                      <img
                        src={store.coverImage || "/placeholder.svg"}
                        alt={store.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-full p-1">
                        <img
                          src={store.logo || "/placeholder.svg"}
                          alt={`${store.name} logo`}
                          className="h-12 w-12 rounded-full border-2 border-background"
                        />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{store.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{store.description}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{store.rating?.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {store.categories.slice(0, 3).map((category) => (
                          <Badge key={category} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <span className="text-xs text-muted-foreground">
                        منتجات ({getProductsByStore(store.id).length})
                      </span>
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/seller/stores/${store.id}`}>إدارة</Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link href={`/stores/${store.id}`}>عرض</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="products" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">منتجاتي</h2>
              <Button asChild size="sm">
                <Link href="/seller/products/new">
                  <Plus className="mr-2 h-4 w-4" />
                  إضافة منتج
                </Link>
              </Button>
            </div>

            {products.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                  <Package className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium">لا يوجد منتجات بعد</h3>
                  <p className="text-sm text-muted-foreground mt-1">أضف منتجات إلى متجرك لبدء البيع.</p>
                  <Button asChild className="mt-4">
                    <Link href="/seller/products/new">إضافة منتج</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="relative h-40 w-full">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-background/80 hover:bg-background/80 backdrop-blur-sm text-foreground">
                          {product.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold line-clamp-1">{product.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold">{product.price.toFixed(2)} جنيه</span>
                        <Badge variant={product.inStock ? "default" : "destructive"}>
                          {product.inStock ? "متوفر" : "غير متوفر"}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/seller/products/${product.id}/edit`}>تعديل</Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href={`/products/${product.id}`}>عرض</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">الإحصاءات</h2>
            <Card>
              <CardHeader>
                <CardTitle>أداء المتجر</CardTitle>
                <CardDescription>عرض مؤشرات أداء متجرك</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">لوحة تحكم الإحصاءات</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-md">
                    تتبع أداء متجرك، ومشاركة العملاء، وبيانات المبيعات. الإحصاءات التفصيلية تساعدك على اتخاذ قرارات
                    مدروسة لتنمية عملك.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

