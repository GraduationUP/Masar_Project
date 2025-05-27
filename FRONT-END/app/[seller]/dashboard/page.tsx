"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CreditCard, Download, History, Home, Package, ShoppingBag, Star, StoreIcon, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function UserDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // fetching data from db.json, replacing it later with actual api
    fetch('/db.json')
      .then(response => response.json())
      .then(data => {
        setUsers(data.users);
      })
  }, [])

  const { user } = useAuth();

  return (
    <>
      {user ?
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">لوحة التحكم</h1>
              <p className="text-muted-foreground">مرحباً</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your recent purchases</CardDescription>
                </CardHeader>
                <CardContent>
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
        :
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-3xl font-bold mb-4">رجاءً قم بتسجيل الدخول</h1>
            <p className="text-muted-foreground mb-6">عليك تسجيل الدخول للوصول الى لوحة التحكم</p>
            <Button asChild>
              <Link href="/login">تسجيل الدخول</Link>
            </Button>
          </div>
        </div>
      }
    </>
  )
}
