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
import {
  AlertTriangle,
  BarChart3,
  Bell,
  MapPin,
  Package,
  Settings,
  StoreIcon,
  Users,
} from "lucide-react";
import Loading from "./loading";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

// TODO : Complete store data

interface UserManagementCardProps {
  userData: User[];
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Roles {
  id: number;
  name: string;
}

interface Admin {
  id: number;
  username: string;
}

interface Ban {
  id: number;
  target_id: number;
  reason: string;
  banned_by: number;
  created_at: string;
  updated_at: string;
  admin: Admin | null;
}

interface userData {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  roles: Roles[];
  ban: Ban | null;
}

interface storeUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface storeData {
  id: number;
  user_id: number;
  store_name: string;
  id_card_photo: string;
  phone: string;
  location_address: string;
  status: number;
  created_at: string;
  updated_at: string;
  latitude: string | null;
  longitude: string | null;
  user: storeUser;
}

interface UserInfo {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface serviceData {
  city: string;
  aids: [];
  markets: [];
  GasStations: [];
}

export default function AdminDashboard() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [updatedUserData, setUpdatedUserData] = useState([]);
  const [userData, setUserData] = useState<userData[]>([
    {
      id: 0,
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      created_at: "",
      updated_at: "",
      roles: [],
      ban: null,
    },
  ]);
  const [storeData, setStoreData] = useState<storeData[]>([
    {
      id: 0,
      user_id: 0,
      store_name: "",
      id_card_photo: "",
      phone: "",
      location_address: "",
      status: 0,
      created_at: "",
      updated_at: "",
      latitude: "",
      longitude: "",
      user: {
        id: 0,
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        created_at: "",
        updated_at: "",
      },
    },
  ]);

  const [productData, setProductData] = useState([]);
  const [servicesData, setServicesData] = useState<serviceData>({
    city: "",
    aids: [],
    markets: [],
    GasStations: [],
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Set loading to false after attempting to get user info
  }, []);

  // Redirect if not logged in or role is undefined, but only after loading is complete
  useEffect(() => {
    if (!loading && (user === null || user.role !== "admin")) {
      // Assuming you only want to show this dashboard to 'admin' roles
      redirect("/");
    }
  }, [user, loading]);

  useEffect(() => {
    async function fetchUsersData() {
      setLoading(true); // Set loading to true before the fetch

      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
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
        setUserData(responseData);
      } catch (error) {
        console.error("Error fetching users data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsersData();
  }, []);

  useEffect(() => {
    async function fetchStoresData() {
      setLoading(true); // Set loading to true before the fetch

      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_BASE_URL}/api/admin/stores`, {
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
        setStoreData(responseData.data);
      } catch (error) {
        console.error("Error fetching stores data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStoresData();
  }, []);

  useEffect(() => {
    async function fetchProductsData() {
      setLoading(true);

      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
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
        setProductData(responseData.data);
      } catch (error) {
        console.error("Error fetching stores data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductsData();
  }, []);

  useEffect(() => {
    async function fetchServicesData() {
      setLoading(true);

      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_BASE_URL}/api/admin/map`, {
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
        setServicesData(responseData);
      } catch (error) {
        console.error("Error fetching stores data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchServicesData();
  }, []);

  useEffect(() => {
    setUpdatedUserData(userData.shift());
  }, [userData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              لوحة التحكم للإداري
            </h1>
            <p className="text-muted-foreground">إدارة منصة مسار</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                إعدادات المنصة
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/map">
                <MapPin className="mr-2 h-4 w-4" />
                إدارة الخريطة
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                مجموع المستخدمين
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.length}</div>
              <p className="text-xs text-muted-foreground">
                المستخدمين المسجلين
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                مجموع المتاجر
              </CardTitle>
              <StoreIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storeData.length}</div>
              <p className="text-xs text-muted-foreground">المتاجر النشطة</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                مجموع المنتجات
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productData.length}</div>
              <p className="text-xs text-muted-foreground">المنتجات المدرجة</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                إجمالي الخدمات
              </CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {servicesData.aids.length +
                  servicesData.GasStations.length +
                  servicesData.markets.length}
              </div>
              <p className="text-xs text-muted-foreground">الخدمات المتاحة</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">المستخدمون</TabsTrigger>
            <TabsTrigger value="stores">المتاجر</TabsTrigger>
            <TabsTrigger value="services">الخدمات</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">
              إدارة المستخدمين
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>مستخدمو المنصة</CardTitle>
                <CardDescription>
                  إدارة حسابات المستخدمين والأذونات
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[20rem] flex items-center justify-center">
                {updatedUserData.length == 0 ? (
                  <div className="flex flex-col items-center text-center">
                    <Users className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">
                      لوحة إدارة المستخدمين
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">
                      عرض وإدارة جميع حسابات المستخدمين على المنصة. التحكم في
                      الأذونات، والتحقق من البائعين، ومعالجة تقارير المستخدمين.
                    </p>
                  </div>
                ) : (
                  <div className="w-full">
                    {userData.map((user) => (
                      <Card
                        key={user.id}
                        className="w-full flex justify-between mb-2 items-center"
                      >
                        <CardHeader>
                          <CardTitle>
                            <div>
                              {user.first_name} {user.last_name}
                            </div>
                            {user.roles[0].name === "seller" && (
                              <Badge>بائع</Badge>
                            )}
                            {user.ban !== null && (
                              <Badge variant="destructive">محظور</Badge>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div>
                            <p className="text-sm font-semibold">
                              البريد الإلكتروني:
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold">
                              تاريخ الإنشاء:
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(user.created_at).toLocaleString()}
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          <Button variant="outline" size="sm">
                            حظر
                          </Button>
                          <Button variant="destructive" size="sm">
                            تعطيل الحساب
                          </Button>
                          <Button size="sm">إرسال إشعار</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/admin/users">إدارة المستخدمين</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="stores" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">
                إدارة المتاجر
              </h2>
              <Button asChild size="sm" variant="outline">
                <Link href="/admin/stores">عرض جميع المتاجر</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {storeData.slice(0, 3).map((store) => (
                <Card key={store.id} className="overflow-hidden">
                  <div className="relative h-32 w-full">
                    <img
                      src={"/storeBanner.svg"}
                      alt={store.store_name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-full p-1">
                      <img
                        src={"/placeholder-store.png"}
                        alt={`${store.store_name} logo`}
                        className="h-12 w-12 rounded-full border-2 border-background"
                      />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{store.store_name}</h3>
                      </div>
                    </div>
                    {/* <div className="flex flex-wrap gap-2 mt-3">
                      {store.categories.slice(0, 3).map((category) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="text-xs"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div> */}
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <span className="text-xs text-muted-foreground">
                      رقم ملكية المتجر: {store.user.id}
                    </span>
                    <div className="flex gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/stores/${store.id}`}>
                          إدارة المتجر
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="destructive">
                        <Link href={`/admin/stores/${store.id}/block`}>
                          حظر
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="services" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">
                إدارة الخدمات
              </h2>
              <Button asChild size="sm">
                <Link href="/admin/services/new">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  إضافة خدمة طوارئ
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* {services.slice(0, 3).map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <div className="relative h-32 w-full">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={service.isEmergency ? "bg-red-500" : "bg-green-500"}>
                        {service.isEmergency ? "طوارئ" : "عادية"}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
                      </div>
                      <Badge variant={service.isOpen ? "default" : "secondary"}>
                        {service.isOpen ? "مفتوح" : "مغلق"}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <Badge variant="outline" className="text-xs">
                        {service.category}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <span className="text-xs text-muted-foreground">{service.location.address}</span>
                    <Button asChild size="sm">
                      <Link href={`/admin/services/${service.id}`}>إدارة</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))} */}
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">تحليلات المنصة</h2>
            <Card>
              <CardHeader>
                <CardTitle>أداء النظام</CardTitle>
                <CardDescription>
                  عرض التحليلات والمقاييس على مستوى المنصة
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">لوحة التحليلات</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-md">
                    تتبع استخدام المنصة، ومشاركة المستخدمين، والتقارير التجارية.
                    رصد أداء النظام واكتشاف فرص النمو.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
