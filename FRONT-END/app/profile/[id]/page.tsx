"use client";

// TODO : Fix page layout

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
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Store,
  User,
} from "lucide-react";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CustomAlert } from "@/components/customAlert";
import Loading from "./loading";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/main_layout/header";
import PageBanner from "@/components/main_layout/PageBanner";
export default function ProfilePage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [successAlert, setSucssesAlert] = useState(false);
  const [failure, setFailure] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showFormError, setShowFormError] = useState(false);
  const [isUser, setISUser] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  interface Store {
    id: any;
    user_id: any;
    store_name: string;
    store_image: string;
    phone: string;
    location_address: string;
    status: any;
    latitude: number | null;
    longitude: number | null;
  }

  interface comment {
    id: number;
    store_id: number;
    store_name: string;
    comment: string;
    created_at: string;
  }

  interface rating {
    id: number;
    store_id: number;
    store_name: string;
    rating: number;
    created_at: string;
  }

  interface Data {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    store: Store | null;
  }

  interface OwnerData {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    role: string;
    store: Store | null;
    comments: [comment] | [];
    ratings: [rating] | [];
  }

  const [ownerData, setOwnerData] = useState<OwnerData>({
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    role: "",
    store: {
      id: null,
      user_id: null,
      store_name: "",
      store_image: "",
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
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
    store: {
      id: null,
      user_id: null,
      store_name: "",
      store_image: "",
      phone: "",
      location_address: "",
      status: null,
      latitude: 0,
      longitude: 0,
    },
  });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });

  const [passwordFromData, setPasswordFormData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  // For the page owner

  async function fetchData() {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          return;
        }

        const responseData = await response.json();
        setOwnerData(responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function HandelLogout() {
    localStorage.removeItem("tokenType");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("authToken");
    window.location.href = "/";
  }

  // Fetch for visitors
  async function fetchDataForVisitors() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/guest/users/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchData();
    fetchDataForVisitors();
    setLoading(false);
  }, []);

  async function handleUserInfoEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/api/users/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setFailure(true);
        throw new Error("Failed to submit the data. Please try again.");
      }

      const data = await response.json();
      // Update state with new data if needed
      setSucssesAlert(true);
      setShowFormError(false);
      fetchData();
      fetchDataForVisitors();
    } catch (error) {
      console.error(error);
      setShowFormError(true);
      setFailure(true);
    } finally {
      setIsEditing(false);
    }
  }

  async function handlePasswordChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${API_BASE_URL}/api/users/change-password`,
        {
          method: "POST",
          body: JSON.stringify(passwordFromData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setFailure(true);
        throw new Error("Failed to change password. Please try again.");
      }
      setPasswordFormData({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
      setSucssesAlert(true);
      setShowFormError(false);
    } catch (error) {
      console.error(error);
      setShowFormError(true);
      setFailure(true);
    } finally {
      setIsEditing(false);
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

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setISUser(true);
    }
  });

  const handleSendReport = async (message: string) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/api/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reported_user_id: params.id,
          message: message,
        }),
      });

      if (!response.ok) {
        setFailure(true);
        const errorData = await response.json();
        throw new Error(
          errorData?.message || "Failed to send report. Please try again."
        );
      }
      setOpen(false);
      setMessage("");
      setSucssesAlert(true);
    } catch (error: any) {
      setFailure(true);
      console.error("Error sending report:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <PageBanner>
        {ownerData.username === data.username && "مرحباً"} {data.first_name}{" "}
        {data.last_name}
      </PageBanner>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col w-full gap-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                الملف الشخصي
              </h1>
              <p className="text-muted-foreground">
                قم بادارة اعدادت ملفك الشخصي
              </p>
            </div>
            {ownerData.username === data.username && (
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
          <div className={"flex flex-col md:flex-row gap-8"}>
            <CustomAlert
              message="تم تحديث البيانات بنجاح"
              show={successAlert}
              onClose={() => setSucssesAlert(false)}
              success
            />
            <CustomAlert
              message="حدث خطأ ما! يرجى المحاولة مرة أخرى"
              show={failure}
              onClose={() => setFailure(false)}
              success={false}
            />
            {/* Sidebar */}

            {/* Main Content */}
            <div className={`flex-grow space-y-6 w-full md:w-2/3`}>
              <Card className="w-full h-fit">
                <CardContent className="p-6">
                  <div className="flex" title="ابلاغ">
                    {ownerData.role === "seller" && (
                      <Badge className="mb-2">صاحب متجر</Badge>
                    )}
                  </div>
                  {isUser && ownerData.username !== data.username && (
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button variant={"outline"} title="ابلاغ">
                          <Image
                            src={"/reportFlag.svg"}
                            alt={"report flag"}
                            width={30}
                            height={30}
                          />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>الابلاغ عن مستخدم</DialogTitle>
                          <DialogDescription>
                            رجاء اكتب سبب كتابة الابلاغ بدقة
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label
                              htmlFor="message"
                              className="text-right text-sm font-medium leading-none text-muted-foreground"
                            >
                              الرسالة
                            </label>
                            <div className="col-span-3">
                              <Textarea
                                id="message"
                                placeholder="اكتب رسالة الابلاغ هنا!"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="secondary">الغاء</Button>
                          </DialogClose>
                          <Button onClick={() => handleSendReport(message)}>
                            ارسال الابلاغ
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <Avatar className="h-24 w-24 border-4 border-background">
                        <AvatarFallback className="text-2xl">
                          {data.first_name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {ownerData.username === data.username && (
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
              {ownerData.username === data.username && (
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
                          {ownerData.username === data.username && (
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
                          {showFormError && (
                            <span className="text-sm text-muted-foreground text-red-400">
                              حدث خطأ ما اعد المحاولة لاحقاً!
                            </span>
                          )}
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

                  <TabsContent
                    value="security"
                    className="space-y-6 animate-fade-in"
                  >
                    <Card>
                      <form onSubmit={handlePasswordChange}>
                        <CardHeader>
                          <CardTitle>كلمة المرور</CardTitle>
                          <CardDescription>تغيير كلمة المرور</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {showFormError && (
                            <span className="text-sm text-muted-foreground text-red-400">
                              حدث خطاء ما اعد المحاولة لاحقاً!
                            </span>
                          )}
                          <div className="space-y-2">
                            <Label htmlFor="current-password">
                              الكلمة الحالية
                            </Label>
                            <Input
                              id="current-password"
                              type="password"
                              className="rounded-lg"
                              value={passwordFromData.current_password}
                              onChange={(e) =>
                                setPasswordFormData({
                                  ...passwordFromData,
                                  current_password: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="new-password">
                                الكلمة الجديدة
                              </Label>
                              <Input
                                id="new-password"
                                type="password"
                                className="rounded-lg"
                                value={passwordFromData.password}
                                onChange={(e) =>
                                  setPasswordFormData({
                                    ...passwordFromData,
                                    password: e.target.value,
                                  })
                                }
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
                                value={passwordFromData.password_confirmation}
                                onChange={(e) =>
                                  setPasswordFormData({
                                    ...passwordFromData,
                                    password_confirmation: e.target.value,
                                  })
                                }
                                onFocus={() => {
                                  if (
                                    passwordFromData.password !==
                                    passwordFromData.password_confirmation
                                  ) {
                                    setShowErrorMessage(true);
                                  }
                                }}
                                onBlur={() => setShowErrorMessage(false)}
                              />
                              {showErrorMessage &&
                                passwordFromData.password !==
                                  passwordFromData.password_confirmation && (
                                  <p className="text-xs text-muted-foreground text-red-600">
                                    الكلمة الجديدة غير متطابقة
                                  </p>
                                )}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="ml-auto rounded-full"
                            type="submit"
                          >
                            تحديث كلمة المرور
                          </Button>
                        </CardFooter>
                      </form>
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
                        <CardDescription>
                          ادارة الاشعارات الواردة
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">
                            اشعارات الايميل
                          </h3>
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
                              <Label
                                htmlFor="email-security"
                                className="flex-1"
                              >
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
                              <Label
                                htmlFor="push-promotions"
                                className="flex-1"
                              >
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
                      <Tabs defaultValue="user_comments" className="w-full p-4">
                        <TabsList>
                          <TabsTrigger value="user_comments">
                            التعليقات
                          </TabsTrigger>
                          <TabsTrigger value="user_ratings">
                            التقييمات
                          </TabsTrigger>
                          <TabsTrigger value="user_favorites">
                            المفضلة
                          </TabsTrigger>
                        </TabsList>
                        {/* Tabs content: Yeah this is Osama not AI you dumbass */}
                        {/* Comments Tab */}
                        <TabsContent value="user_comments">
                          {ownerData.comments.map((comment) => (
                            <div
                              className="relative flex gap-3 items-start border rounded-md p-4"
                              key={comment.id}
                            >
                              <Avatar>
                                <AvatarFallback>
                                  {ownerData.first_name.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col w-full">
                                <div className="flex justify-between">
                                  <div>
                                    {ownerData.first_name} {ownerData.last_name}
                                  </div>
                                  <div>
                                    <div>
                                      {new Date(
                                        comment.created_at
                                      ).toLocaleString("en", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div>{comment.comment}</div>
                                  <div className="text-primary text-sm">
                                    <Link
                                      href={`/stores/${comment.store_id}`}
                                      className="flex gap-2"
                                    >
                                      <Store />
                                      {comment.store_name}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </TabsContent>
                        {/* Ratings Tab */}
                        <TabsContent value="user_ratings">
                          {ownerData.ratings.map((rating) => (
                            <div
                              className="relative flex gap-3 items-start border rounded-md p-4"
                              key={rating.id}
                            >
                              <Avatar>
                                <AvatarFallback>
                                  {ownerData.first_name.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col w-full">
                                <div className="flex justify-between">
                                  <div>
                                    {ownerData.first_name} {ownerData.last_name}
                                  </div>
                                  <div>
                                    <div>
                                      {new Date(
                                        rating.created_at
                                      ).toLocaleString("en", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        fill={
                                          i < rating.rating ? "yellow" : "gray"
                                        }
                                        className="h-5 w-5"
                                      />
                                    ))}
                                  </div>
                                  <div className="text-primary text-sm">
                                    <Link
                                      href={`/store/${rating.store_id}`}
                                      className="flex gap-2"
                                    >
                                      <Store />
                                      {rating.store_name}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </TabsContent>
                        {/* Favorites Tab */}
                        <TabsContent value="user_favorites"></TabsContent>
                      </Tabs>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}
              {data.store !== null && (
                <div className={`grid grid-cols-1 gap-6`}>
                  <Card key={data.store?.id} className="overflow-hidden">
                    <div className="relative h-32 w-full">
                      <img
                        src={"/Banner.svg"}
                        alt={data.store?.store_image}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-full p-1">
                        {data.store?.store_image !== "" && (
                          <img
                            src={data.store?.store_image}
                            alt={`${data.store?.store_name} logo`}
                            className="h-12 w-12 rounded-full border-2 border-background"
                          />
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">
                            {data.store?.store_name}
                          </h3>
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
                        {ownerData.username === data.username && (
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/seller/dashboard`}>إدارة</Link>
                          </Button>
                        )}
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
    </>
  );
}
