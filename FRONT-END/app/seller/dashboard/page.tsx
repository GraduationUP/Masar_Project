"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Package, Plus, Star, StoreIcon, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Loading from "./loading";
import Image from "next/image";
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
import { CustomAlert } from "@/components/customAlert";

interface Store {
  id: number;
  name: string;
  owner_phone: string;
  status: string;
  created_at: string;
  average_rating: number;
  latitude: string;
  longitude: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  created_at: string;
}

interface Data {
  store: Store;
  recent_products: Product[];
  recent_ratings: {
    user: string;
    score: number;
    created_at: string;
  }[];
  recent_comments: {
    user: string;
    comment: string;
    created_at: string;
  }[];
}

export default function SellerDashboard() {
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [open, setOpen] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [data, setData] = useState<Data>({
    recent_comments: [],
    recent_products: [],
    recent_ratings: [],
    store: {
      id: 0,
      name: "",
      owner_phone: "",
      status: "",
      created_at: "",
      average_rating: 0,
      latitude: "34",
      longitude: "31",
    },
  });
  const [user, setUser] = useState(null);
  const [store, setStore] = useState<Store>({
    id: 0,
    name: "",
    owner_phone: "",
    status: "",
    created_at: "",
    average_rating: 0,
    latitude: "34",
    longitude: "31",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState(0);

  const [loading, setLoading] = useState(true); // Add a loading state

  const [activeTab, setActiveTab] = useState("التعليقات");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("userInfo");
    if (authToken) {
      setUser(JSON.parse(authToken));
    }
    setLoading(false); // Set loading to false after attempting to get user info
  }, []);

  // Redirect if not logged in or role is undefined, but only after loading is complete
  useEffect(() => {
    if (!loading && (user === null || (user as any)?.role !== "seller")) {
      redirect("/");
    }
  }, [user, loading]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Set loading to true before the fetch

      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${BASE_API_URL}/api/seller/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch completes (success or failure)
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setStore(data.store as Store);
    setProducts(data.recent_products);
    setStats(data.recent_comments.length + data.recent_ratings.length);
  }, [data]);

  const handleSendReport = async (id:number) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${BASE_API_URL}/api/comments/${id}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData?.message || "Failed to send report. Please try again."
        );
      }
      console.log("Report sent successfully:", response);
      setOpen(false);
      setSuccessAlert(true);
    } catch (error: any) {
      console.error("Error sending report:", error);
      // You might want to set an error state here to display an error message to the user
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              لوحة التحكم للبائع
            </h1>
            <p className="text-muted-foreground">إدارة متاجرك و منتجاتك</p>
          </div>
          <div className="flex gap-2">
            {!store.name ? (
              <Button asChild>
                <Link href="/seller/create-store">
                  <StoreIcon className="mr-2 h-4 w-4" />
                  إنشاء متجر
                </Link>
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link href="/seller/products/new">
                  <Package className="mr-2 h-4 w-4" />
                  إضافة منتج
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {store.name && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    إجمالي المنتجات
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>

                  <p className="text-xs text-muted-foreground">
                    المنتجات المدرجة
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    الاحصاءات
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats}</div>
                  <p className="text-xs text-muted-foreground">
                    التقييمات والتعليقات
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <Tabs defaultValue="stores">
          <TabsList>
            <TabsTrigger value="stores">متجري</TabsTrigger>
            <TabsTrigger value="products">منتجاتي</TabsTrigger>
            <TabsTrigger value="analytics">الإحصاءات</TabsTrigger>
          </TabsList>
          <TabsContent value="stores" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">متجري</h2>
            </div>

            {!store.name ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                  <StoreIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium">لا يوجد متجر بعد</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    أنشئ متجرك لبدء بيع المنتجات.
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/seller/create-store">أنشئ متجر</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <Card key={store.id} className="overflow-hidden">
                  <div className="relative h-32 w-full">
                    <img
                      src={"/storeBanner.svg"}
                      alt={store.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-full p-1">
                      <img
                        src={"/placeholder-store.png"}
                        alt={`${store.name} logo`}
                        className="h-12 w-12 rounded-full border-2 border-background"
                      />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{store.name}</h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {store.average_rating?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {data.recent_products
                        .reduce((uniqueCategories, product) => {
                          if (
                            !uniqueCategories.includes(
                              product.category as never
                            )
                          ) {
                            uniqueCategories.push(product.category as never);
                          }
                          return uniqueCategories;
                        }, [])
                        .slice(0, 3)
                        .map((category) => (
                          <Badge
                            key={category}
                            variant="secondary"
                            className="text-xs"
                          >
                            {category}
                          </Badge>
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <span className="text-xs text-muted-foreground">
                      منتجات ({products.length})
                    </span>
                    <div className="flex gap-2">
                      <Button asChild size="sm">
                        <Link href={`/stores/${store.id}`}>عرض</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            )}
          </TabsContent>
          <TabsContent value="products" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">منتجاتي</h2>
              {store.name && (
                <Button asChild size="sm">
                  <Link href="/seller/products/new">
                    <Plus className="mr-2 h-4 w-4" />
                    إضافة منتج
                  </Link>
                </Button>
              )}
            </div>

            {products.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                  <Package className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium">لا يوجد منتجات بعد</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    أضف منتجات إلى متجرك لبدء البيع.
                  </p>
                  {store.name && (
                    <Button asChild className="mt-4">
                      <Link href="/seller/products/new">إضافة منتج</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="relative h-40 w-full">
                      <img
                        src={"/boxes.png"}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-background/80 hover:bg-background/80 backdrop-blur-sm text-foreground">
                          {product.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold line-clamp-1">{product.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold">
                          {parseFloat(product.price).toFixed(2)} شيكل
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/seller/products/${product.id}/edit`}>
                          تعديل
                        </Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href={`/products/${product.id}`}>عرض</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">الإحصاءات</h2>
            <Card>
              <CardHeader>
                <CardTitle>أداء المتجر</CardTitle>
                <CardDescription>
                  عرض مؤشرات أداء متجرك من خلال آراء وتقييمات الزبائن
                </CardDescription>
              </CardHeader>
              {stats === 0 ? (
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="flex flex-col items-center text-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">لوحة تحكم الإحصاءات</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">
                      تتبع أداء متجرك، ومشاركة العملاء، وبيانات المبيعات.
                      الإحصاءات التفصيلية تساعدك على اتخاذ قرارات مدروسة لتنمية
                      عملك.
                    </p>
                  </div>
                </CardContent>
              ) : (
                // TODO : Style this section
                <div className="space-y-6">
                  <div className="tabs flex border-b border-gray-100">
                    <button
                      className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                        activeTab === "التعليقات"
                          ? "text-primary-500 border-b-2 border-primary-500"
                          : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-200"
                      }`}
                      onClick={() => handleTabClick("التعليقات")}
                    >
                      التعليقات
                    </button>
                    <button
                      className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                        activeTab === "التقييمات"
                          ? "text-primary-500 border-b-2 border-primary-500"
                          : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-200"
                      }`}
                      onClick={() => handleTabClick("التقييمات")}
                    >
                      التقييمات
                    </button>
                  </div>

                  <div className="rounded-lg bg-white p-4 shadow-xs">
                    {activeTab === "التعليقات" && (
                      <div className="tab-content">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800">
                          التعليقات الأخيرة
                        </h3>
                        <ul className="divide-y divide-gray-100">
                          {data.recent_comments.map((comment) => (
                            <li
                              key={comment.created_at}
                              className="py-3 border rounded-sm"
                            >
                              <div className="flex">
                                <div className="mx-3 w-full">
                                  <div className="flex justify-between">
                                    <div className="flex items-center gap-1">
                                      <Avatar className="size-8">
                                        <AvatarFallback>
                                          {comment.user
                                            .slice(0, 2)
                                            .toUpperCase()}
                                        </AvatarFallback>
                                      </Avatar>
                                      <p className="text-sm font-medium text-gray-900">
                                        {comment.user}
                                      </p>
                                    </div>
                                    <Dialog open={open} onOpenChange={setOpen}>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant={"outline"}
                                          title="ابلاغ"
                                        >
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
                                          <DialogTitle>
                                            الابلاغ عن تعليق مسيء
                                          </DialogTitle>
                                          <DialogDescription>
                                            هل انت متأكد انك تريد الابلاغ عن هذا التعليق؟
                                          </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                          <DialogClose asChild>
                                            <Button variant="secondary">
                                              الغاء
                                            </Button>
                                          </DialogClose>
                                          <Button
                                            onClick={() =>
                                              handleSendReport(comment.id) // TODO
                                            }
                                          >
                                            ارسال الابلاغ
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </div>

                                  <p className="text-sm text-gray-600">
                                    {comment.comment}
                                  </p>
                                  <p className="mt-1 text-xs text-gray-500">
                                    {comment.created_at}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeTab === "التقييمات" && (
                      <div className="tab-content">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800">
                          التقييمات الأخيرة
                        </h3>
                        <ul className="divide-y divide-gray-100">
                          {data.recent_ratings.map((rating) => (
                            <li key={rating.created_at} className="py-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">
                                      {rating.user}
                                    </p>
                                    <div className="flex items-center mt-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < rating.score
                                              ? "text-yellow-400"
                                              : "text-gray-300"
                                          }`}
                                          fill="currentColor"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {rating.created_at}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
