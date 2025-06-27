"use client";

// TODO : Solve api token issue

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Check,
  Edit,
  HelpCircle,
  Lock,
  LogOut,
  Star,
  User,
} from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SuccessAlert } from "@/components/successAlert";
import { set } from "react-hook-form";

export default function ProfilePage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [successAlert, setSucssesAlert] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  interface Store {
    id: any;
    user_id: any;
    store_name: string;
    id_card_photo: string;
    phone: string;
    location_address: string;
    status: any;
    latitude: number | null;
    longitude: number | null;
  }

  interface Data {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    username: string;
    store: Store | null;
    comments: [];
    ratings: [];
    email: string;
  }

  const [ownerData, setOwnerData] = useState<Data>({
    id: Number,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    role: "",
    store: {
      id: null,
      user_id: null,
      store_name: "",
      id_card_photo: "",
      phone: "",
      location_address: "",
      status: null,
      latitude: null,
      longitude: null,
    },
    comments: [],
    ratings: [],
  });

  const [data, setData] = useState<Data>({
    id: Number,
    first_name: "",
    last_name: "",
    username: "",
    store: {
      id: null,
      user_id: null,
      store_name: "",
      id_card_photo: "",
      phone: "",
      location_address: "",
      status: null,
      latitude: null,
      longitude: null,
    },
  });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });

  // For the page owner
  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Set loading to true before the fetch

      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `http://127.0.0.1:8000/api/users/${params.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setOwnerData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function HandelLogout() {
    localStorage.removeItem("tokenType");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("authToken");
    redirect("/");
  }

  // Fetch for visitors
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/guest/users/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  async function handleUserInfoEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/${params.id}`,
        {
          method: "PUT",
          body: JSON.stringify(formData), 
          headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      const data = await response.json();
      // Update state with new data if needed
      setOwnerData(data);
      setSucssesAlert(true);
    } catch (error) {
      console.error(error);
      // Show error to user
    } finally {
      setIsEditing(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    setFormData({
      first_name: ownerData.first_name,
      last_name: ownerData.last_name,
      username: ownerData.username,
      email: ownerData.email,
    });
  }, [ownerData]);

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">الملف الشخصي</h1>
            <p className="text-muted-foreground">
              قم بادارة اعدادت ملفك الشخصي
            </p>
          </div>
          {ownerData.first_name !== "" && (
            <div className="flex gap-2">
              <form onSubmit={HandelLogout}>
                <Button
                  type="submit"
                  variant="outline"
                  className="rounded-full"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  تسجيل الخروج
                </Button>
              </form>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-8">
            <SuccessAlert
              message="تم تحديث البيانات بنجاح"
              show={successAlert}
              onClose={() => setSucssesAlert(false)}
            />
          {/* Sidebar */}
          <Card className="w-full md:w-1/3 h-fit">
            <CardContent className="p-6">
              <div className="flex">
                {data.store !== null && <Badge>صاحب متجر</Badge>}
                <Image
                  src={"/reportFlag.svg"}
                  alt={"report flag"}
                  width={30}
                  height={30}
                />{" "}
                {/* TODO : add a report button */}
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarFallback className="text-2xl">
                      {data.first_name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {ownerData.first_name !== "" && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <h2 className="text-xl font-bold mt-2">
                  {data.first_name} {data.last_name}
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  عضو منذ ابريل 2023
                </p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">التقييمات</p>
                    <p className="text-sm text-muted-foreground">
                      تقييماتك للمتاجر
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">مركز المساعدة</p>
                    <p className="text-sm text-muted-foreground">
                      احصل على المساعدة والدعم
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="flex-grow space-y-6 w-full md:w-2/3">
            {ownerData.first_name !== "" && (
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
                <TabsContent
                  value="account"
                  className="space-y-6 animate-fade-in"
                >
                  {/* ... Account Tab Content ... */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>المعلومات الشخصية</CardTitle>
                        {ownerData.first_name !== "" && (
                          <CardDescription>
                            قم بادارة معلوماتك الشخصية
                          </CardDescription>
                        )}
                      </div>
                      <Button
                        variant={isEditing ? "ghost" : "outline"}
                        size="sm"
                        className="rounded-full"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? (
                          "الغاء"
                        ) : (
                          <Edit className="mr-2 h-4 w-4" />
                        )}
                        {isEditing ? "" : "تعديل"}
                      </Button>
                    </CardHeader>
                    <form onSubmit={handleUserInfoEdit}>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">الاسم الأول</Label>
                            <Input
                              id="first_name"
                              value={formData.first_name}
                              disabled={!isEditing}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  first_name: e.target.value,
                                })
                              }
                              className="rounded-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">الاسم الأخير</Label>
                            <Input
                              id="last_name"
                              value={formData.last_name}
                              disabled={!isEditing}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  last_name: e.target.value,
                                })
                              }
                              className="rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">الايميل</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              disabled={!isEditing}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              className="rounded-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="username">اسم المتسخدم</Label>
                            <Input
                              id="username"
                              value={formData.username}
                              disabled={!isEditing}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  username: e.target.value,
                                })
                              }
                              className="rounded-lg"
                            />
                          </div>
                        </div>
                      </CardContent>
                      {isEditing && (
                        <CardFooter>
                          <Button
                            className="ml-auto rounded-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700"
                            type="submit"
                          >
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              حفظ التغييرات
                            </>
                          </Button>
                        </CardFooter>
                      )}
                    </form>
                  </Card>
                </TabsContent>

                {/* ... Security Tab Content ... TODO : Make this form works */}
                <TabsContent
                  value="security"
                  className="space-y-6 animate-fade-in"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>كلمة المرور</CardTitle>
                      <CardDescription>تغيير كلمة المرور</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">الكلمة الحالية</Label>
                        <Input
                          id="current-password"
                          type="password"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-password">الكلمة الجديدة</Label>
                          <Input
                            id="new-password"
                            type="password"
                            className="rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            تأكيد الكلمة الجديدة
                          </Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto rounded-full">
                        تحديث كلمة المرور
                      </Button>
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
                            </div>
                          </div>
                          <Badge>نشط</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <form onSubmit={HandelLogout}>
                        <Button
                          type="submit"
                          variant="outline"
                          className="w-full rounded-full"
                        >
                          <Lock className="mr-2 h-4 w-4" />
                          تسجيل الخروج من الحساب
                        </Button>
                      </form>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* ... Notifications Tab Content ... */}
                <TabsContent
                  value="notifications"
                  className="space-y-6 animate-fade-in"
                >
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
                            <Label
                              htmlFor="email-promotions"
                              className="flex-1"
                            >
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

                {/* ... Activity Tab Content ... */}
                <TabsContent
                  value="activity"
                  className="space-y-6 animate-fade-in"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>تقييماتك</CardTitle>
                      <CardDescription>
                        التقييمات التي قمت بنشرها
                      </CardDescription>
                    </CardHeader>
                    {/* ... Activity Tab Content ... */}
                  </Card>
                </TabsContent>
              </Tabs>
            )}
            {data.store !== null && (
              <div className={`grid grid-cols-1 gap-6`}>
                {/* ... Store Card ... */}
                <Card key={data.store?.id} className="overflow-hidden">
                  <div className="relative h-32 w-full">
                    <img
                      src={"/storeBanner.svg"}
                      alt={data.store?.store_name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-full p-1">
                      <img
                        src={"/placeholder-store.png"}
                        alt={`${data.store?.store_name} logo`}
                        className="h-12 w-12 rounded-full border-2 border-background"
                      />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{data.store?.store_name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {data.store?.location_address}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <div className="flex gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/seller/stores/${data.store?.id}`}>
                          إدارة
                        </Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href={`/stores/${data.store?.id}`}>عرض</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
