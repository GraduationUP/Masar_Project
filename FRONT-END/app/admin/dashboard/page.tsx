"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, BarChart3, Bell, MapPin, Package, Settings, StoreIcon, Users } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { type Product, type Service, type Store, getProducts, getServices, getStores } from "@/lib/storage-utils"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stores, setStores] = useState<Store[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalProducts: 0,
    totalServices: 0,
  })

  // Redirect if not logged in or not an admin
  if (!user) {
    redirect("/login")
  }

  if (user.role !== "admin") {
    redirect(`/${user.role}/dashboard`)
  }

  useEffect(() => {
    // Initialize storage with mock data
    const initStorage = async () => {
      const { initializeStorage } = await import("@/lib/storage-utils")
      initializeStorage()

      // Get all stores, products, and services
      const allStores = getStores()
      const allProducts = getProducts()
      const allServices = getServices()

      setStores(allStores)
      setProducts(allProducts)
      setServices(allServices)

      // Calculate stats
      setStats({
        totalUsers: 25, // Mock user count
        totalStores: allStores.length,
        totalProducts: allProducts.length,
        totalServices: allServices.length,
      })
    }

    initStorage()
  }, [])

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage the Masar platform</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Platform Settings
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/map">
                <MapPin className="mr-2 h-4 w-4" />
                Manage Map
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
              <StoreIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStores}</div>
              <p className="text-xs text-muted-foreground">Active stores</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">Listed products</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Services</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalServices}</div>
              <p className="text-xs text-muted-foreground">Available services</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="stores">Stores</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">User Management</h2>
            <Card>
              <CardHeader>
                <CardTitle>Platform Users</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">User Management Dashboard</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-md">
                    View and manage all user accounts on the platform. Control permissions, verify sellers, and handle
                    user reports.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/admin/users">Manage Users</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="stores" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">Store Management</h2>
              <Button asChild size="sm" variant="outline">
                <Link href="/admin/stores">View All Stores</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stores.slice(0, 3).map((store) => (
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
                    <span className="text-xs text-muted-foreground">Owner ID: {store.ownerId}</span>
                    <div className="flex gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/stores/${store.id}`}>Manage</Link>
                      </Button>
                      <Button asChild size="sm" variant="destructive">
                        <Link href={`/admin/stores/${store.id}/block`}>Block</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="services" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">Service Management</h2>
              <Button asChild size="sm">
                <Link href="/admin/services/new">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Add Emergency Service
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.slice(0, 3).map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <div className="relative h-32 w-full">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={service.isEmergency ? "bg-red-500" : "bg-green-500"}>
                        {service.isEmergency ? "Emergency" : "Regular"}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
                      </div>
                      <Badge variant={service.isOpen ? "default" : "secondary"}>
                        {service.isOpen ? "Open" : "Closed"}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <Badge variant="outline" className="text-xs">
                        {service.category}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <span className="text-xs text-muted-foreground">{service.location.address}</span>
                    <Button asChild size="sm">
                      <Link href={`/admin/services/${service.id}`}>Manage</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Platform Analytics</h2>
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>View platform-wide analytics and metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-md">
                    Track platform usage, user engagement, and business metrics. Monitor system performance and identify
                    growth opportunities.
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
