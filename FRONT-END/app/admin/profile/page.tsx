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
  Edit,
  HelpCircle,
  Loader2,
  Lock,
  LogOut,
  Settings,
  ShieldCheck,
  User,
  Users,
  BarChart3,
  AlertTriangle,
  Bell,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function AdminProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    bio: "",
  })

  // Redirect if not logged in or not an admin
  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (user.role !== "admin") {
      router.push("/profile")
    } else {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: "+962 7 1234 5678", // Mock data
        department: "Platform Management",
        role: "Senior Administrator",
        bio: "Responsible for overseeing the Masar platform operations and ensuring quality service.",
      })
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

  if (!user || user.role !== "admin") {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Profile</h1>
            <p className="text-muted-foreground">Manage your administrator account and platform settings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
            <Button asChild className="rounded-full">
              <Link href="/admin/dashboard">
                <Settings className="mr-2 h-4 w-4" />
                Admin Dashboard
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
                <Badge className="mt-1 bg-red-500 hover:bg-red-600">Administrator</Badge>
                <p className="text-sm text-muted-foreground mt-2">Admin since January 2023</p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">User Management</p>
                    <p className="text-sm text-muted-foreground">Manage platform users</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Analytics</p>
                    <p className="text-sm text-muted-foreground">Platform performance metrics</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">System Settings</p>
                    <p className="text-sm text-muted-foreground">Configure platform settings</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Reports & Issues</p>
                    <p className="text-sm text-muted-foreground">Handle user reports</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Admin Support</p>
                    <p className="text-sm text-muted-foreground">Get help with admin tasks</p>
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
                <TabsTrigger value="permissions" className="rounded-md">
                  Permissions
                </TabsTrigger>
                <TabsTrigger value="security" className="rounded-md">
                  Security
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
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={profileData.department}
                          onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                          disabled={!isEditing}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Admin Role</Label>
                      <Input
                        id="role"
                        value={profileData.role}
                        onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
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
                    <CardTitle>Admin Information</CardTitle>
                    <CardDescription>Your administrator status and information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                          <ShieldCheck className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <p className="font-medium">Administrator Status</p>
                          <p className="text-xs text-muted-foreground">Full platform access</p>
                        </div>
                      </div>
                      <Badge className="bg-red-500 hover:bg-red-600">Active</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg border">
                        <p className="text-sm font-medium">Last Login</p>
                        <p className="text-sm text-muted-foreground">April 13, 2023 at 10:45 AM</p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <p className="text-sm font-medium">Account Created</p>
                        <p className="text-sm text-muted-foreground">January 15, 2023</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Permissions Tab */}
              <TabsContent value="permissions" className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Permissions</CardTitle>
                    <CardDescription>Manage your administrative access levels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">User Management</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-user-view" className="flex-1">
                            View all users
                          </Label>
                          <Switch id="perm-user-view" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-user-edit" className="flex-1">
                            Edit user information
                          </Label>
                          <Switch id="perm-user-edit" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-user-delete" className="flex-1">
                            Delete users
                          </Label>
                          <Switch id="perm-user-delete" defaultChecked disabled />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Store Management</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-store-view" className="flex-1">
                            View all stores
                          </Label>
                          <Switch id="perm-store-view" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-store-edit" className="flex-1">
                            Edit store information
                          </Label>
                          <Switch id="perm-store-edit" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-store-delete" className="flex-1">
                            Delete stores
                          </Label>
                          <Switch id="perm-store-delete" defaultChecked disabled />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Platform Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-settings-view" className="flex-1">
                            View platform settings
                          </Label>
                          <Switch id="perm-settings-view" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-settings-edit" className="flex-1">
                            Edit platform settings
                          </Label>
                          <Switch id="perm-settings-edit" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-maintenance" className="flex-1">
                            Maintenance mode access
                          </Label>
                          <Switch id="perm-maintenance" defaultChecked disabled />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      These permissions are set by the system administrator and cannot be modified.
                    </p>
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

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Activity Log</CardTitle>
                    <CardDescription>Recent administrative actions performed by you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Bell className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">System Notification Updated</span>
                          </div>
                          <Badge variant="outline">April 13, 2023</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Updated system notification for platform maintenance.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">User Account Verified</span>
                          </div>
                          <Badge variant="outline">April 12, 2023</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Verified seller account for user ID #12345.</p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">System Settings Updated</span>
                          </div>
                          <Badge variant="outline">April 10, 2023</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Updated platform settings for user registration process.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Report Resolved</span>
                          </div>
                          <Badge variant="outline">April 8, 2023</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Resolved user report #789 for inappropriate content.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full rounded-full">
                      View Full Activity Log
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                    <CardDescription>Important system notifications requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                          <span className="font-medium">System Update Required</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Platform update scheduled for April 15, 2023. Please review and approve.
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" className="rounded-full">
                            View Details
                          </Button>
                          <Button size="sm" className="rounded-full">
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
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
