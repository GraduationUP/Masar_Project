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
  Camera,
  Check,
  CreditCard,
  Edit,
  Heart,
  HelpCircle,
  Loader2,
  Lock,
  LogOut,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Star,
  User,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { type Review, type Store, getReviews, getStores } from "@/lib/storage-utils"

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [favoriteStores, setFavoriteStores] = useState<Store[]>([])
  const [userReviews, setUserReviews] = useState<Review[]>([])
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: "+962 7 1234 5678", // Mock data
        address: "Amman, Jordan", // Mock data
        bio: "I love exploring local stores and finding great deals in my neighborhood.",
      })

      // Initialize storage with mock data
      const initStorage = async () => {
        const { initializeStorage } = await import("@/lib/storage-utils")
        initializeStorage()

        // Get favorite stores (mock data)
        const allStores = getStores()
        const randomStores = [...allStores].sort(() => 0.5 - Math.random()).slice(0, 2)
        setFavoriteStores(randomStores)

        // Get user reviews
        const allReviews = getReviews()
        const reviews = allReviews.filter((review) => review.userId === user.id)
        setUserReviews(reviews)
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

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
            {user.role === "user" && (
              <Button asChild className="rounded-full">
                <a href="/register?role=seller">Become a Seller</a>
              </Button>
            )}
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
                <Badge className="mt-1">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Badge>
                <p className="text-sm text-muted-foreground mt-2">Member since April 2023</p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Orders</p>
                    <p className="text-sm text-muted-foreground">View your order history</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Favorites</p>
                    <p className="text-sm text-muted-foreground">Stores and products you love</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Reviews</p>
                    <p className="text-sm text-muted-foreground">Your reviews and ratings</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Help Center</p>
                    <p className="text-sm text-muted-foreground">Get support and assistance</p>
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
                <TabsTrigger value="security" className="rounded-md">
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="rounded-md">
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="activity" className="rounded-md">
                  Activity
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          disabled={!isEditing}
                          className="rounded-lg"
                        />
                      </div>
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
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment options</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No payment methods yet</h3>
                      <p className="text-sm text-muted-foreground mt-1 max-w-md">
                        Add a payment method to make checkout faster and easier.
                      </p>
                      <Button className="mt-4 rounded-full">Add Payment Method</Button>
                    </div>
                  </CardContent>
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
                      <Switch />
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
                            Order updates
                          </Label>
                          <Switch id="email-orders" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-promotions" className="flex-1">
                            Promotions and deals
                          </Label>
                          <Switch id="email-promotions" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-security" className="flex-1">
                            Security alerts
                          </Label>
                          <Switch id="email-security" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Push Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-orders" className="flex-1">
                            Order updates
                          </Label>
                          <Switch id="push-orders" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-promotions" className="flex-1">
                            Promotions and deals
                          </Label>
                          <Switch id="push-promotions" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-messages" className="flex-1">
                            Messages from sellers
                          </Label>
                          <Switch id="push-messages" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto rounded-full">Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Stores</CardTitle>
                    <CardDescription>Stores you've saved</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {favoriteStores.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No favorite stores yet</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Explore the marketplace and save stores you like.
                        </p>
                        <Button asChild className="mt-4 rounded-full">
                          <a href="/marketplace">Browse Marketplace</a>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {favoriteStores.map((store) => (
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
                                <MapPin className="h-3 w-3" />
                                <span className="truncate">{store.location.address}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="ml-1 text-sm font-medium">{store.rating?.toFixed(1)}</span>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <Heart className="h-4 w-4 fill-current text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Your Reviews</CardTitle>
                    <CardDescription>Reviews you've posted</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userReviews.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <Star className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No reviews yet</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Share your experiences by reviewing stores and products.
                        </p>
                        <Button asChild className="mt-4 rounded-full">
                          <a href="/marketplace">Browse Marketplace</a>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userReviews.map((review) => (
                          <div key={review.id} className="p-4 rounded-lg border">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
                                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{review.userName}</span>
                              </div>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm">{review.comment}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                              <Button variant="ghost" size="sm" className="h-8 rounded-full">
                                <Edit className="h-3.5 w-3.5 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
