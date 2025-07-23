"use client";
// TODO : Add isSubmitting instead of Loading
import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Settings } from "lucide-react";
import Loading from "./loading";
import { CustomAlert } from "@/components/customAlert";
import AdminOverviewCards from "@/components/admin/AdminOverViewCards";
import UserManagementTab from "@/components/admin/UserMangmentTab";
import StoreManagementTab from "@/components/admin/StoreManagmentTab";
import ProductManagementTab from "@/components/admin/ProductManagmentTab";
import Header from "@/components/main_layout/header";

// Import your interfaces here
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
interface UserData {
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
interface StoreUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}
interface StoreData {
  id: number;
  user_id: number;
  store_name: string;
  id_card_photo: string;
  phone: string;
  location_address: string;
  active: number;
  is_banned: boolean;
  created_at: string;
  updated_at: string;
  latitude: string | null;
  longitude: string | null;
  user: StoreUser;
}
interface UserInfo {
  id: number;
  username: string;
  email: string;
  role: string;
}
interface ServiceData {
  city: string;
  aids: [];
  markets: [];
  GasStations: [];
}
interface ProductStore {
  id: number;
  store_name: string;
}
interface ProductData {
  id: number;
  store_id: number;
  name: string;
  description: string;
  photo: null;
  category_id: number;
  price: string;
  latitude: null;
  longitude: null;
  show_location: number;
  created_at: string;
  updated_at: string;
  store: ProductStore;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState<string>("all");
  const [storeStatusFilter, setStoreStatusFilter] = useState<string>("all");
  const [userData, setUserData] = useState<UserData[]>([]);
  const [storeData, setStoreData] = useState<StoreData[]>([]);
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [servicesData, setServicesData] = useState<ServiceData>({
    city: "",
    aids: [],
    markets: [],
    GasStations: [],
  });

  const userRoleOptions = [
    { value: "all", label: "الكل" },
    { value: "seller", label: "بائع" },
    { value: "user", label: "مستخدم" },
  ];

  const storeStatusOptions = [
    { value: "all", label: "الكل" },
    { value: "active", label: "نشط" },
    { value: "inactive", label: "غير نشط" },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && (user === null || user.role !== "admin")) {
      redirect("/");
    }
  }, [user, loading]);

  useEffect(() => {
    async function fetchUsersData() {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
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
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_BASE_URL}/api/admin/stores`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
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
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
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
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
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

  async function handelUserBlock(id: number) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error fetching stores data:", error);
      setShowFailAlert(true);
    } finally {
      setLoading(false);
    }
  }

  async function handelUserBan(
    id: number,
    reason: string,
    durationValue: number,
    durationUnit: string
  ) {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${API_BASE_URL}/api/admin/users/${id}/ban`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason: reason,
            duration_value: durationValue,
            duration_unit: durationUnit,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error banning user:", errorData);
        setShowFailAlert(true);
        return;
      }
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error banning user:", error);
      setShowFailAlert(true);
    } finally {
      setLoading(false);
    }
  }

  async function handelUserNotify(
    type: string,
    message: string,
    target: string,
    target_id: number
  ) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${API_BASE_URL}/api/admin/notifications/send`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: type,
            message: message,
            target: "user",
            target_id: target_id,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error sending notification:", errorData);
        setShowFailAlert(true);
        return;
      }
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error sending notification:", error);
      setShowFailAlert(true);
    } finally {
      setLoading(false);
    }
  }

  async function handelProductDelete(id: number) {
    console.log(`Deleting product with ID: ${id}`);
    setShowSuccessAlert(true);
  }

  const handleUsersSearch = (term: string, role: string) => {
    setSearchTerm(term);
    setUserRoleFilter(role);
  };

  const handleStoresSearch = (term: string, status: string) => {
    setSearchTerm(term);
    setStoreStatusFilter(status);
  };

  const handleProductSearch = (term: string) => {
    setSearchTerm(term);
  };

  const servicesCount =
    servicesData.aids.length +
    servicesData.GasStations.length +
    servicesData.markets.length;

  const updateStoreData = (updatedStore: StoreData) => {
    setStoreData((prevData) =>
      prevData.map((store) =>
        store.id === updatedStore.id ? updatedStore : store
      )
    );
  };

  const handleBanStore = async (id: number) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${API_BASE_URL}/api/admin/stores/${id}/ban`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.error("Error banning store");
        setShowFailAlert(true);
        return;
      }
      const updatedStore = await response.json();
      updateStoreData(updatedStore);
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error banning store:", error);
      setShowFailAlert(true);
    }
  };

  const handleUnbanStore = async (id: number) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${API_BASE_URL}/api/admin/stores/${id}/unban`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.error("Error unbanning store");
        setShowFailAlert(true);
        return;
      }
      const updatedStore = await response.json();
      updateStoreData(updatedStore);
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error unbanning store:", error);
      setShowFailAlert(true);
    }
  };

  const handleDeleteStore = async (id: number) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/api/admin/stores/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.error("Error deleting store");
        setShowFailAlert(true);
        return;
      }
      setStoreData((prevData) => prevData.filter((store) => store.id !== id));
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error deleting store:", error);
      setShowFailAlert(true);
    }
  };

  const handleStatusUpdateStore = async (id: number, status: number) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${API_BASE_URL}/api/admin/stores/${id}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: status }),
        }
      );
      if (!response.ok) {
        console.error("Error updating store status");
        setShowFailAlert(true);
        return;
      }
      const updatedStore = await response.json();
      updateStoreData(updatedStore);
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error updating store status:", error);
      setShowFailAlert(true);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <CustomAlert
        message="تم تحديث البيانات بنجاح"
        onClose={() => setShowSuccessAlert(false)}
        show={showSuccessAlert}
        success
      />
      <CustomAlert
        message="حدث خطأ ما"
        onClose={() => setShowFailAlert(false)}
        show={showFailAlert}
        success={false}
      />
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                لوحة التحكم للإداري
              </h1>
              <p className="text-muted-foreground">إدارة منصة مسار</p>
            </div>
            <Button asChild>
              <Link href="/admin/map">
                <MapPin className="mr-2 h-4 w-4" />
                إدارة الخريطة
              </Link>
            </Button>
          </div>

          <AdminOverviewCards
            userCount={userData.length}
            storeCount={storeData.length}
            productCount={productData.length}
            servicesCount={servicesCount}
          />

          <Tabs defaultValue="users">
            <TabsList>
              <TabsTrigger value="users">المستخدمون</TabsTrigger>
              <TabsTrigger value="stores">المتاجر</TabsTrigger>
              <TabsTrigger value="products">البضائع</TabsTrigger>
            </TabsList>
            <TabsContent value="users" className="space-y-4">
              <UserManagementTab
                userData={userData}
                searchTerm={searchTerm}
                userRoleFilter={userRoleFilter}
                userRoleOptions={userRoleOptions}
                handleUsersSearch={handleUsersSearch}
                handelUserBan={handelUserBan}
                handelUserBlock={handelUserBlock}
                handelUserNotify={handelUserNotify}
              />
            </TabsContent>
            <TabsContent value="stores" className="space-y-4">
              <StoreManagementTab
                storeData={storeData}
                searchTerm={searchTerm}
                storeStatusFilter={storeStatusFilter}
                storeStatusOptions={storeStatusOptions}
                handleStoresSearch={handleStoresSearch}
                handelStoreBan={handleBanStore}
                handelStoreUnban={handleUnbanStore}
                handelStoreStatusUpdate={handleStatusUpdateStore}
              />
            </TabsContent>
            <TabsContent value="products" className="space-y-4">
              <ProductManagementTab
                productData={productData}
                searchTerm={searchTerm}
                handleProductSearch={handleProductSearch}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
