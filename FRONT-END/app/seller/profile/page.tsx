"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Camera,
  Check,
  CreditCard,
  Edit,
  HelpCircle,
  Loader2,
  Lock,
  LogOut,
  Package,
  ShieldCheck,
  ShoppingBag,
  StoreIcon,
  User,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { type Store, getStoresByOwner } from "@/lib/storage-utils"
import Link from "next/link"

export default function SellerProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [stores, setStores] = useState<Store[]>([])
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessAddress: "",
    taxId: "",
    bio: "",
  })

  // Redirect if not logged in or not a seller
  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (user.role !== "seller") {
      router.push("/profile")
    } else {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: "+962 7 1234 5678", // Mock data
        businessName: "Local Marketplace Seller",
        businessAddress: "Amman, Jordan",
        taxId: "TAX123456789",
        bio: "Passionate about providing quality products to my local community.",
      })

      // Initialize storage with mock data
      const initStorage = async () => {
        const { initializeStorage } = await import("@/lib/storage-utils")
        initializeStorage()

        // Get seller's stores
        const sellerStores = getStoresByOwner(user.id)
        setStores(sellerStores)
      }

      initStorage()
    }
  }, [user, router])

  const handleSaveProfile = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEditing(false)
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    }, 1000)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user || user.role !== "seller") {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Seller Profile</h1>
            <p className="text-muted-foreground">Manage your seller account and business information</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
            <Button asChild className="rounded-full">
              <Link href="/seller/dashboard">
                <StoreIcon className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold mt-2">{user.name}</h2>
                <Badge className="mt-1">Seller</Badge>
                <p className="text-sm text-muted-foreground mt-2">Seller since April 2023</p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <StoreIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">My Stores</p>
                    <p className="text-sm text-muted-foreground">Manage your stores</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Products</p>
                    <p className="text-sm text-muted-foreground">Manage your products</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Orders</p>
                    <p className="text-sm text-muted-foreground">View customer orders</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Analytics</p>
                    <p className="text-sm text-muted-foreground">View sales and performance</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Seller Support</p>
                    <p className="text-sm text-muted-foreground">Get help with your seller account</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-4 rounded-lg mb-6">
                <TabsTrigger value="account" className="rounded-md">
                  Account
                </TabsTrigger>
                <TabsTrigger value="business" className="rounded-md">
                  Business
                </TabsTrigger>
                <TabsTrigger value="security" className="rounded-md">
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="rounded-md">
                  Notifications
                </TabsTrigger>
              </TabsList>

              {/* Account Tab */}
              <TabsContent value="account" className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Manage your personal details</CardDescription>
                    </div>
                    <Button
                      variant={isEditing ? "ghost" : "outline"}
                      size="sm"
                      className="rounded-full"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : <Edit className="mr-2 h-4 w-4" />}
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          disabled={!isEditing}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          disabled={!isEditing}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        disabled={!isEditing}
                        className="min-h-[100px] rounded-lg"
                      />
                    </div>
                  </CardContent>
                  {isEditing && (
                    <CardFooter>
                      <Button
                        className="ml-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                        onClick={handleSaveProfile}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  )}
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Your Stores</CardTitle>
                    <CardDescription>Manage your store profiles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {stores.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <StoreIcon className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No stores yet</h3>
                        <p className="text-sm text-muted-foreground mt-1 max-w-md">
                          Create your first store to start selling on Masar.
                        </p>
                        <Button asChild className="mt-4 rounded-full">
                          <Link href="/seller/stores/new">Create Store</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {stores.map((store) => (
                          <div
                            key={store.id}
                            className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                          >
                            <div className="h-12 w-12 rounded-full overflow-hidden">
                              <img
                                src={store.logo || "/placeholder.svg"}
                                alt={store.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{store.name}</h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-xs">
                                  {store.categories[0]}
                                </Badge>
                                <span>•</span>
                                <span className="truncate">{store.location.address}</span>
                              </div>
                            </div>
                            <Button asChild variant="outline" size="sm" className="rounded-full">
                              <Link href={`/seller/stores/${store.id}`}>Manage</Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  {stores.length > 0 && (
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full rounded-full">
                        <Link href="/seller/stores/new">Create New Store</Link>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>

              {/* Business Tab */}
              <TabsContent value="business" className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Business Information</CardTitle>
                      <CardDescription>Manage your business details</CardDescription>
                    </div>
                    <Button
                      variant={isEditing ? "ghost" : "outline"}
                      size="sm"
                      className="rounded-full"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : <Edit className="mr-2 h-4 w-4" />}
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Business Name</Label>
                      <Input
                        id="business-name"
                        value={profileData.businessName}
                        onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                        disabled={!isEditing}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-address">Business Address</Label>
                      <Input
                        id="business-address"
                        value={profileData.businessAddress}
                        onChange={(e) => setProfileData({ ...profileData, businessAddress: e.target.value })}
                        disabled={!isEditing}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax-id">Tax ID / Business Registration Number</Label>
                      <Input
                        id="tax-id"
                        value={profileData.taxId}
                        onChange={(e) => setProfileData({ ...profileData, taxId: e.target.value })}
                        disabled={!isEditing}
                        className="rounded-lg"
                      />
                    </div>
                  </CardContent>
                  {isEditing && (
                    <CardFooter>
                      <Button
                        className="ml-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                        onClick={handleSaveProfile}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  )}
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Settings</CardTitle>
                    <CardDescription>Manage your payment methods and payout settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Payout Method</h3>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Bank Account</p>
                            <p className="text-xs text-muted-foreground">**** **** **** 1234</p>
                          </div>
                        </div>
                        <Badge>Primary</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Payout Schedule</h3>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="payout-weekly" className="flex-1">
                          Weekly payouts
                        </Label>
                        <Switch id="payout-weekly" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="rounded-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" className="rounded-lg" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" className="rounded-lg" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" className="rounded-lg" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto rounded-full">Update Password</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">
                            Secure your account with two-factor authentication
                          </p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Sessions</CardTitle>
                    <CardDescription>Manage your active sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-xs text-muted-foreground">Amman, Jordan • April 13, 2023</p>
                          </div>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full rounded-full">
                      <Lock className="mr-2 h-4 w-4" />
                      Log Out of All Sessions
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Email Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-orders" className="flex-1">
                            New orders
                          </Label>
                          <Switch id="email-orders" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-messages" className="flex-1">
                            Customer messages
                          </Label>
                          <Switch id="email-messages" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-reviews" className="flex-1">
                            New reviews
                          </Label>
                          <Switch id="email-reviews" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-platform" className="flex-1">
                            Platform updates
                          </Label>
                          <Switch id="email-platform" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Push Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-orders" className="flex-1">
                            New orders
                          </Label>
                          <Switch id="push-orders" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-messages" className="flex-1">
                            Customer messages
                          </Label>
                          <Switch id="push-messages" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-reviews" className="flex-1">
                            New reviews
                          </Label>
                          <Switch id="push-reviews" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto rounded-full">Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
