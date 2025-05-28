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
import { logoutAction } from "@/lib/actions"

export default function AdminProfilePage() {
  const router = useRouter()
  const { user } = useAuth()
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
    }
    // } else if (user.role !== "admin") {
    //   router.push("/profile")
    // } else {
    //   setProfileData({
    //     name: user.name,
    //     email: user.email,
    //     phone: "+962 7 1234 5678", // Mock data
    //     department: "Platform Management",
    //     role: "Senior Administrator",
    //     bio: "Responsible for overseeing the Masar platform operations and ensuring quality service.",
    //   })
    // }
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

  // if (!user || user.role !== "admin") {
  //   return null // Will redirect in useEffect
  //  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ملف المدير</h1>
            <p className="text-muted-foreground">إدارة حسابك كمدير والمضاعفات النصية</p>
          </div>
          <div className="flex gap-2">
            <form action={logoutAction}>
              <Button type="submit" variant="outline" className="rounded-full">
                <LogOut className="mr-2 h-4 w-4" />
                خروج
              </Button>
            </form>
            <Button asChild className="rounded-full">
              <Link href="/admin/dashboard">
                <Settings className="mr-2 h-4 w-4" />
                لوحة تحكم المدير
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
                    <AvatarImage src={"/ProfilePlaceholder.jpg"} alt={'user.name'} />
                    <AvatarFallback className="text-2xl">{'user.name.charAt(0)'}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold mt-2">{'user.name'}</h2>
                <Badge className="mt-1 bg-red-500 hover:bg-red-600">مدير</Badge>
                <p className="text-sm text-muted-foreground mt-2">مدير منذ يناير 2023</p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">إدارة المستخدمين</p>
                    <p className="text-sm text-muted-foreground">إدارة مستخدمي المنصة</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">البيانات</p>
                    <p className="text-sm text-muted-foreground">إحصاءات أداء المنصة</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">إعدادات النظام</p>
                    <p className="text-sm text-muted-foreground">تكوين إعدادات المنصة</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">تقرير الأخطاء</p>
                    <p className="text-sm text-muted-foreground">معالجة تقارير الأخطاء</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">دعم المدير</p>
                    <p className="text-sm text-muted-foreground">الحصول على مساعدة في المهام الإدارية</p>
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
                  الحساب
                </TabsTrigger>
                <TabsTrigger value="permissions" className="rounded-md">
                  الصلاحيات
                </TabsTrigger>
                <TabsTrigger value="security" className="rounded-md">
                  الأمن
                </TabsTrigger>
                <TabsTrigger value="activity" className="rounded-md">
                  النشاط
                </TabsTrigger>
              </TabsList>

              {/* Account Tab */}
              <TabsContent value="account" className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>المعلومات الشخصية</CardTitle>
                      <CardDescription>إدارة التفاصيل الشخصية الخاصة بك</CardDescription>
                    </div>
                    <Button
                      variant={isEditing ? "ghost" : "outline"}
                      size="sm"
                      className="rounded-full"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "إلغاء" : <Edit className="mr-2 h-4 w-4" />}
                      {isEditing ? "إلغاء" : "تحرير"}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">الاسم الكامل</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          disabled={!isEditing}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني</Label>
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
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          disabled={!isEditing}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">القسم</Label>
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
                      <Label htmlFor="role">دور المسؤول</Label>
                      <Input
                        id="role"
                        value={profileData.role}
                        onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                        disabled={!isEditing}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">السيرة الذاتية</Label>
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
                            حفظ التغييرات...
                          </>
                        ) : (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            حفظ التغييرات
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  )}
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>معلومات المدير</CardTitle>
                    <CardDescription>معلوماتك الإدارية والوصول الكامل</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                          <ShieldCheck className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <p className="font-medium">حالة المدير</p>
                          <p className="text-xs text-muted-foreground">وصول كامل إلى المنصة</p>
                        </div>
                      </div>
                      <Badge className="bg-red-500 hover:bg-red-600">فعال</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg border">
                        <p className="text-sm font-medium">آخر دخول</p>
                        <p className="text-sm text-muted-foreground">13 أبريل 2023 في 10:45 ص</p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <p className="text-sm font-medium">تاريخ إنشاء الحساب</p>
                        <p className="text-sm text-muted-foreground">15 يناير 2023</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Permissions Tab */}
              <TabsContent value="permissions" className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>صلاحيات المدير</CardTitle>
                    <CardDescription>إدارة مستويات الوصول الإدارية الخاصة بك</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">إدارة المستخدمين</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-user-view" className="flex-1">
                            عرض كل المستخدمين
                          </Label>
                          <Switch id="perm-user-view" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-user-edit" className="flex-1">
                            تعديل معلومات المستخدم
                          </Label>
                          <Switch id="perm-user-edit" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-user-delete" className="flex-1">
                            حذف المستخدمين
                          </Label>
                          <Switch id="perm-user-delete" defaultChecked disabled />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">إدارة المتاجر</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-store-view" className="flex-1">
                            عرض كل المتاجر
                          </Label>
                          <Switch id="perm-store-view" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-store-edit" className="flex-1">
                            تعديل معلومات المتجر
                          </Label>
                          <Switch id="perm-store-edit" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-store-delete" className="flex-1">
                            حذف المتاجر
                          </Label>
                          <Switch id="perm-store-delete" defaultChecked disabled />
                        </div>
                      </div>
                    </div>
                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">إعدادات المنصة</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-settings-view" className="flex-1">
                            عرض إعدادات المنصة
                          </Label>
                          <Switch id="perm-settings-view" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-settings-edit" className="flex-1">
                            تعديل إعدادات المنصة
                          </Label>
                          <Switch id="perm-settings-edit" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-maintenance" className="flex-1">
                            وصول إلى وضع الصيانة
                          </Label>
                          <Switch id="perm-maintenance" defaultChecked disabled />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      هذه الصلاحيات يتم تعيينها من قبل مدير النظام ولا يمكن تعديلها.
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>كلمة المرور</CardTitle>
                    <CardDescription>تغيير كلمة المرور</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                      <Input id="current-password" type="password" className="rounded-lg" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                        <Input id="new-password" type="password" className="rounded-lg" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">تأكيد كلمة المرور الجديدة</Label>
                        <Input id="confirm-password" type="password" className="rounded-lg" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto rounded-full">تحديث كلمة المرور</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>تأكيد المصادقة الثنائية</CardTitle>
                    <CardDescription>إضافة طبقة أمان إضافية إلى حسابك</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">تأكيد المصادقة الثنائية</p>
                          <p className="text-sm text-muted-foreground">
                            أمن حسابك بتأكيد المصادقة الثنائية
                          </p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>جلسات الحساب</CardTitle>
                    <CardDescription>إدارة جلسات الحساب النشطة</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">جلسة حالية</p>
                            <p className="text-xs text-muted-foreground">عمان، الأردن • 13 أبريل 2023</p>
                          </div>
                        </div>
                        <Badge>مفعلة</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full rounded-full">
                      <Lock className="mr-2 h-4 w-4" />
                      خروج من جميع الجلسات
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>سجل نشاط المشرف</CardTitle>
                    <CardDescription>أحداث إدارية حديثة قمت بها</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Bell className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">تم تحديث إشعار النظام</span>
                          </div>
                          <Badge variant="outline">13 أبريل 2023</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          تم تحديث إشعار النظام لصيانة النظام.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">تم تأكيد حساب المستخدم</span>
                          </div>
                          <Badge variant="outline">12 أبريل 2023</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">تم تأكيد حساب البائع للهوية #12345.</p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">تم تحديث إعدادات النظام</span>
                          </div>
                          <Badge variant="outline">10 أبريل 2023</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          تم تحديث إعدادات النظام ل processo التسجيل.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">تم حل التقرير</span>
                          </div>
                          <Badge variant="outline">8 أبريل 2023</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          تم حل التقرير #789 لوجود محتوى غير لائق.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full rounded-full">
                      عرض سجل النشاط الكامل
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>تنبيهات النظام</CardTitle>
                    <CardDescription>تنبيهات النظام الهامة التي تتطلب الاهتمام</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                          <span className="font-medium">يجب تحديث النظام</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          من المقرر تحديث النظام في 15 أبريل 2023. يرجى مراجعة وموافقة.
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" className="rounded-full">
                            عرض التفاصيل
                          </Button>
                          <Button size="sm" className="rounded-full">
                            موافقة
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