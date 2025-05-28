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
import { logoutAction } from "@/lib/actions"

export default function SellerProfilePage() {
  const router = useRouter()
  const { user } = useAuth()
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

  // if (!user || user.role !== "seller") {
  //   return null // Will redirect in useEffect
  // }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ملفك الشخصي كبائع</h1>
            <p className="text-muted-foreground">ادارة حسابك كبائع وبيانات عملك</p>
          </div>
          <div className="flex gap-2">
            <form action={logoutAction}>
              <Button type="submit" variant="outline" className="rounded-full">
                <LogOut className="mr-2 h-4 w-4" />
                خروج
              </Button>
            </form>
            <Button asChild className="rounded-full">
              <Link href="/seller/dashboard">
                <StoreIcon className="mr-2 h-4 w-4" />
                لوحة التحكم
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
                <Badge className="mt-1">بائع</Badge>
                <p className="text-sm text-muted-foreground mt-2">بائع منذ ابريل 2023</p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <StoreIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">متجري</p>
                    <p className="text-sm text-muted-foreground">ادارة متجراتك</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">المنتجات</p>
                    <p className="text-sm text-muted-foreground">ادارة منتجاتك</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">الطلبات</p>
                    <p className="text-sm text-muted-foreground">معرفة طلبات الزبائن</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">الاحصائيات</p>
                    <p className="text-sm text-muted-foreground">معرفة مبيعاتك والاداء</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium"> دعم البائع</p>
                  <p className="text-sm text-muted-foreground">الحصول على مساعدة مع حساب البائع الخاص بك</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-lg mb-6">
              <TabsTrigger value="account" className="rounded-md">
                الحساب
              </TabsTrigger>
              <TabsTrigger value="business" className="rounded-md">
                الاعمال
              </TabsTrigger>
              <TabsTrigger value="security" className="rounded-md">
                الامن
              </TabsTrigger>
              <TabsTrigger value="notifications" className="rounded-md">
                الاشعارات
              </TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>معلومات شخصية</CardTitle>
                    <CardDescription>ادارة معلوماتك الشخصية</CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "ghost" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "الغاء" : <Edit className="mr-2 h-4 w-4" />}
                    {isEditing ? "الغاء" : "تعديل"}
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
                      <Label htmlFor="email">البريد الالكتروني</Label>
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
                  <CardTitle>متاجرك</CardTitle>
                  <CardDescription>إدارة ملفات متاجرك</CardDescription>
                </CardHeader>
                <CardContent>
                  {stores.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <StoreIcon className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">لا يوجد متاجر حتى الآن</h3>
                      <p className="text-sm text-muted-foreground mt-1 max-w-md">
                        أنشئ متجرك الأول لبدء البيع على مسار.
                      </p>
                      <Button asChild className="mt-4 rounded-full">
                        <Link href="/seller/stores/new">أنشئ متجر</Link>
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
                            <Link href={`/seller/stores/${store.id}`}>إدارة</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                {stores.length > 0 && (
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full rounded-full">
                      <Link href="/seller/stores/new">أنشئ متجر جديد</Link>
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
                    <CardTitle>معلومات الأعمال</CardTitle>
                    <CardDescription>إدارة معلومات أعمالك</CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "ghost" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? <span className="text-xs">إلغاء</span> : <Edit className="mr-2 h-4 w-4" />}
                    {isEditing ? <span className="text-xs">إلغاء</span> : "تحرير"}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">اسم الأعمال</Label>
                    <Input
                      id="business-name"
                      value={profileData.businessName}
                      onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                      disabled={!isEditing}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-address">عنوان الأعمال</Label>
                    <Input
                      id="business-address"
                      value={profileData.businessAddress}
                      onChange={(e) => setProfileData({ ...profileData, businessAddress: e.target.value })}
                      disabled={!isEditing}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">رقم تسجيل الأعمال / رقم التعريف الضريبي</Label>
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
                          جاري الحفظ...
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
                  <CardTitle>إعدادات الدفع</CardTitle>
                  <CardDescription>إدارة طرق الدفع وإعدادات السحب</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">طريقة السحب</h3>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">حساب بنكي</p>
                          <p className="text-xs text-muted-foreground">**** **** **** 1234</p>
                        </div>
                      </div>
                      <Badge>رئيسي</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">جدول السحب</h3>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="payout-weekly" className="flex-1">
                        السحب الأسبوعي
                      </Label>
                      <Switch id="payout-weekly" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="rounded-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    إضافة طريقة دفع
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* تبويب الأمان */}
            <TabsContent value="security" className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>كلمة المرور</CardTitle>
                  <CardDescription>تغيير كلمة المرور الخاصة بك</CardDescription>
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
                  <CardTitle>المصادقة الثنائية</CardTitle>
                  <CardDescription>أضف طبقة حماية إضافية إلى حسابك</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">المصادقة الثنائية</p>
                        <p className="text-sm text-muted-foreground">
                          قم بتأمين حسابك باستخدام المصادقة الثنائية
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
                  <CardDescription>إدارة الجلسات النشطة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">الجلسة الحالية</p>
                          <p className="text-xs text-muted-foreground">عمان، الأردن • 13 أبريل 2023</p>
                        </div>
                      </div>
                      <Badge>نشط</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full rounded-full">
                    <Lock className="mr-2 h-4 w-4" />
                    تسجيل الخروج من جميع الجلسات
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>تفضيلات الإشعارات</CardTitle>
                  <CardDescription>إدارة كيفية استلامك للإشعارات</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">إشعارات البريد الإلكتروني</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-orders" className="flex-1">
                          الطلبات الجديدة
                        </Label>
                        <Switch id="email-orders" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-messages" className="flex-1">
                          رسائل العملاء
                        </Label>
                        <Switch id="email-messages" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-reviews" className="flex-1">
                          المراجعات الجديدة
                        </Label>
                        <Switch id="email-reviews" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-platform" className="flex-1">
                          تحديثات المنصة
                        </Label>
                        <Switch id="email-platform" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">إشعارات الدفع</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-orders" className="flex-1">
                          الطلبات الجديدة
                        </Label>
                        <Switch id="push-orders" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-messages" className="flex-1">
                          رسائل العملاء
                        </Label>
                        <Switch id="push-messages" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-reviews" className="flex-1">
                          المراجعات الجديدة
                        </Label>
                        <Switch id="push-reviews" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto rounded-full">حفظ التفضيلات</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>

  )
}
