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
  Heart,
  HelpCircle,
  Lock,
  LogOut,
  Star,
  User,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { logoutAction } from "@/lib/actions"

export default function ProfilePage() {

  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetch("/db.json").
      then((res) => res.json()).
      then((data) => {
        setUsers(data.users);
      })
  }, [])

  return (
    <>
      {user ? (
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">الملف الشخصي</h1>
                <p className="text-muted-foreground">قم بادارة اعدادت ملفك الشخصي</p>
              </div>
              <div className="flex gap-2">
                <form action={logoutAction}>
                  <Button type="submit" variant="outline" className="rounded-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    تسجيل الخروج
                  </Button>
                </form>
                {/* {user.role === "user" && (
                  <Button asChild className="rounded-full">
                    <a href="/register?role=seller">Become a Seller</a>
                  </Button>
                )} */}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar */}
              <Card className="lg:col-span-1 h-fit">
                <CardContent className="p-6">
                  <Badge>صاحب متجر</Badge>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <Avatar className="h-24 w-24 border-4 border-background">
                        <AvatarImage src={"/ProfilePlaceholder.jpg"} alt={"user.name"} />
                        <AvatarFallback className="text-2xl">الاسم هنا</AvatarFallback>
                      </Avatar>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <h2 className="text-xl font-bold mt-2">اسم هنا</h2>
                    {/* <Badge className="mt-1">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Badge> */}
                    <p className="text-sm text-muted-foreground mt-2">عضو منذ ابريل 2023</p>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">المفضلة</p>
                        <p className="text-sm text-muted-foreground">المتاجر والبضائع المفضلة</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">التقييمات</p>
                        <p className="text-sm text-muted-foreground">تقييماتك للمتاجر</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">مركز المساعدة</p>
                        <p className="text-sm text-muted-foreground">احصل على المساعدة والدعم</p>
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
                    <TabsTrigger value="security" className="rounded-md">
                      الأمان
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-md">
                      الاشعارات
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
                          <CardDescription>قم بادارة معلوماتك الشخصية</CardDescription>
                        </div>
                        <Button
                          variant={isEditing ? "ghost" : "outline"}
                          size="sm"
                          className="rounded-full"
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          {isEditing ? "الغاء" : <Edit className="mr-2 h-4 w-4" />}
                          {isEditing ? "" : "تعديل"}
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">الاسم الكامل</Label>
                            <Input
                              id="name"
                              value='user.name'
                              disabled={!isEditing}
                              className="rounded-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">الايميل</Label>
                            <Input
                              id="email"
                              type="email"
                              value='user.email'
                              disabled={!isEditing}
                              className="rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">رقم الجوال</Label>
                            <Input
                              id="phone"
                              value='user.phone'
                              disabled={!isEditing}
                              className="rounded-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address">العنوان</Label>
                            <Input
                              id="address"
                              value='user.address'
                              disabled={!isEditing}
                              className="rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">نبذة</Label>
                          <Textarea
                            id="bio"
                            value='user.bio'
                            disabled={!isEditing}
                            className="min-h-[100px] rounded-lg"
                          />
                        </div>
                      </CardContent>
                      {isEditing && (
                        <CardFooter>
                          <Button
                            className="ml-auto rounded-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700"
                          >
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              حفظ التغييرات
                            </>
                          </Button>
                        </CardFooter>
                      )}
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
                          <Label htmlFor="current-password">الكلمة الحالية</Label>
                          <Input id="current-password" type="password" className="rounded-lg" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-password">الكلمة الجديدة</Label>
                            <Input id="new-password" type="password" className="rounded-lg" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">تأكيد الكلمة الجديدة</Label>
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
                        <CardTitle>حالة الحساب</CardTitle>
                        <CardDescription>ادارة حالة الحساب</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">الحالة</p>
                                <p className="text-xs text-muted-foreground">فلسطين . غزة - ابريل 13, 2023</p>
                              </div>
                            </div>
                            <Badge>نشط</Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <form action={logoutAction}>
                          <Button type="submit" variant="outline" className="w-full rounded-full">
                            <Lock className="mr-2 h-4 w-4" />
                            تسجيل الخروج من الحساب
                          </Button>
                        </form>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  {/* Notifications Tab */}
                  <TabsContent value="notifications" className="space-y-6 animate-fade-in">
                    <Card>
                      <CardHeader>
                        <CardTitle>الاشعارات</CardTitle>
                        <CardDescription>ادارة الاشعارات الواردة</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">اشعارات الايميل</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="email-promotions" className="flex-1">
                                العروض والصفقات
                              </Label>
                              <Switch id="email-promotions" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="email-security" className="flex-1">
                                تنبيهات الأمان
                              </Label>
                              <Switch id="email-security" defaultChecked />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">اشعارات فورية</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="push-promotions" className="flex-1">
                                العروض والصفقات
                              </Label>
                              <Switch id="push-promotions" />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="push-messages" className="flex-1">
                                رسائل من البائعين
                              </Label>
                              <Switch id="push-messages" defaultChecked />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="ml-auto rounded-full">حفظ</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  {/* Activity Tab */}
                  <TabsContent value="activity" className="space-y-6 animate-fade-in">
                    <Card>
                      <CardHeader>
                        <CardTitle>المتاجر المفضلة</CardTitle>
                        <CardDescription>متاجر قمت بحفظها</CardDescription>
                      </CardHeader>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>تقييماتك</CardTitle>
                        <CardDescription>التقييمات التي قمت بنشرها</CardDescription>
                      </CardHeader>
                      {/* <CardContent> */}
                      {/* {userReviews.length === 0 ? (
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
                                        className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
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
                      </CardContent> */}
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      ) : (router.push("/login"))}
    </>
  )
}
