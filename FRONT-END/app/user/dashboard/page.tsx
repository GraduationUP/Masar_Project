"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, CreditCard, Download, History, Home, Package, ShoppingBag, Star, StoreIcon, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import ProductChart from "@/components/product-chart"

export default function UserDashboard() {
  const { user } = useAuth()
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [favoriteStores, setFavoriteStores] = useState<any[]>([])
  const [productStats, setProductStats] = useState({
    labels: ["Electronics", "Clothing", "Groceries", "Home Goods", "Other"],
    values: [12, 8, 15, 5, 3],
    colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
  })

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setRecentOrders([
        {
          id: "ORD-001",
          date: new Date(2023, 3, 15),
          store: "Electronics Hub",
          total: 299.99,
          status: "Delivered",
          items: 2,
        },
        {
          id: "ORD-002",
          date: new Date(2023, 3, 10),
          store: "Fashion Store",
          total: 89.95,
          status: "Processing",
          items: 1,
        },
        {
          id: "ORD-003",
          date: new Date(2023, 3, 5),
          store: "Grocery Market",
          total: 45.5,
          status: "Delivered",
          items: 8,
        },
      ])

      setFavoriteStores([
        {
          id: "ST-001",
          name: "Electronics Hub",
          category: "Electronics",
          rating: 4.8,
          image: "/circuit-cityscape.png",
        },
        {
          id: "ST-002",
          name: "Fashion Store",
          category: "Clothing",
          rating: 4.5,
          image: "/diverse-city-street-style.png",
        },
        {
          id: "ST-003",
          name: "Grocery Market",
          category: "Groceries",
          rating: 4.7,
          image: "/colorful-grocery-aisle.png",
        },
      ])
    }, 500)
  }, [])

  if (!user) {
    return (
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-3xl font-bold mb-4">Please log in</h1>
          <p className="text-muted-foreground mb-6">You need to be logged in to view your dashboard</p>
          <Button asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your recent purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{order.store}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items} {order.items === 1 ? "item" : "items"} · ${order.total.toFixed(2)}
                        </p>
                      </div>
                      <Badge variant={order.status === "Delivered" ? "default" : "outline"}>{order.status}</Badge>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <ShoppingBag className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No recent orders</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/user/orders">View All Orders</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Favorite Stores</CardTitle>
              <CardDescription>Stores you've favorited</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {favoriteStores.length > 0 ? (
                  favoriteStores.map((store) => (
                    <div key={store.id} className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={store.image || "/placeholder.svg"} alt={store.name} />
                        <AvatarFallback>{store.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{store.name}</p>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <p className="text-xs text-muted-foreground">
                            {store.rating} · {store.category}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/stores/${store.id}`}>
                          <StoreIcon className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <StoreIcon className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No favorite stores</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/marketplace">Explore Stores</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Frequently used pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto flex-col py-4 justify-start items-start" asChild>
                  <Link href="/profile">
                    <User className="h-5 w-5 mb-2" />
                    <span className="text-sm font-medium">Profile</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 justify-start items-start" asChild>
                  <Link href="/user/orders">
                    <Package className="h-5 w-5 mb-2" />
                    <span className="text-sm font-medium">Orders</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 justify-start items-start" asChild>
                  <Link href="/user/addresses">
                    <Home className="h-5 w-5 mb-2" />
                    <span className="text-sm font-medium">Addresses</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 justify-start items-start" asChild>
                  <Link href="/user/payment">
                    <CreditCard className="h-5 w-5 mb-2" />
                    <span className="text-sm font-medium">Payment</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 justify-start items-start" asChild>
                  <Link href="/user/notifications">
                    <Bell className="h-5 w-5 mb-2" />
                    <span className="text-sm font-medium">Notifications</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 justify-start items-start" asChild>
                  <Link href="/user/activity">
                    <History className="h-5 w-5 mb-2" />
                    <span className="text-sm font-medium">Activity</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductChart
            data={productStats}
            title="Products by Category"
            description="Distribution of products you've purchased"
          />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">You reviewed Electronics Hub</p>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">You purchased Wireless Headphones</p>
                    <p className="text-sm text-muted-foreground">5 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <StoreIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">You favorited Fashion Store</p>
                    <p className="text-sm text-muted-foreground">1 week ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/user/activity">View All Activity</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Download Reports</CardTitle>
              <CardDescription>Export your data and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="#">
                    <Download className="h-4 w-4 mr-2" />
                    Order History
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="#">
                    <Download className="h-4 w-4 mr-2" />
                    Purchase Summary
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="#">
                    <Download className="h-4 w-4 mr-2" />
                    Account Data
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
