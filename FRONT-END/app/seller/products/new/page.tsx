"use client";
import type React from "react";

import { useState, useEffect, lazy, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, Loader2, Package, Upload } from "lucide-react";
import { redirect } from "next/navigation";
import { CustomAlert } from "@/components/customAlert";
import Header from "@/components/main_layout/header";

// Dynamically import Leaflet with ssr: false
const LeafletMap = lazy(() =>
  import("@/components/LeafletMap").then((module) => ({
    default: module.default,
  }))
);

interface DashboardData {
  recent_comments: any[]; // Replace 'any' with the actual type
  recent_products: Product[];
  recent_ratings: any[]; // Replace 'any' with the actual type
  store: any; // Replace 'any' with the actual type
}

interface Product {
  id?: number;
  name: string;
  description: string;
  category_id: number;
  price: number;
  latitude: number;
  longitude: number;
  show_location: boolean;
}

export default function NewProductPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading to true
  const [showSuccess, setShowSuccess] = useState(false);
  const [productData, setProductData] = useState<Product>({
    name: "",
    description: "",
    category_id: 1,
    price: 0,
    latitude: 31.53157982870554,
    longitude: 34.46717173572411,
    show_location: false,
  });

  const [data, setData] = useState<DashboardData>({
    recent_comments: [],
    recent_products: [],
    recent_ratings: [],
    store: {},
  });
  const [storeCategories, setStoreCategories] = useState<{
    status: boolean;
    data: { id: number; name: string }[]; // Assuming the category object has an 'id' and 'name'
  }>({
    status: false,
    data: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("userInfo");
    if (authToken) {
      setUser(JSON.parse(authToken));
    }
    setLoading(false); // Set loading to false after attempting to get user info
  }, []); // Redirect if not logged in or role is undefined, but only after loading is complete

  useEffect(() => {
    if (!loading && (user === null || user.role !== "seller")) {
      redirect("/");
    }
  }, [user, loading]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Set loading to true before the fetch

      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          "http://127.0.0.1:8000/api/seller/dashboard",
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
    async function fetchCategories() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          "http://127.0.0.1:8000/api/guest/categories",
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
        setStoreCategories(
          responseData as {
            status: boolean;
            data: { id: number; name: string }[];
          } // Type assertion here
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleLocationChange = (lat: number, lng: number) => {
    setProductData((prevData) => ({
      ...prevData,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/seller/products",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        console.log(productData);
        const errorData = await response.json();
        console.error("Error creating product:", errorData);
      } else {
        const successData = await response.json();
        console.log("Product created successfully:", successData);
        setShowSuccess(true);
        setProductData({
          name: "",
          description: "",
          category_id: 1,
          price: 0,
          latitude: 31.53157982870554,
          longitude: 34.46717173572411,
          show_location: false,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full"
            >
              <Link
                href={
                  data.recent_products?.id
                    ? `/seller/stores/${data.recent_products.id}`
                    : "/seller/dashboard"
                }
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                إضافة منتج جديد
              </h1>
              <p className="text-muted-foreground">أضف منتجًا إلى متجرك</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <CustomAlert
              message="تم اضافة المنتج بنجاح"
              show={showSuccess}
              onClose={() => setShowSuccess(false)}
              success
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات المنتج</CardTitle>
                    <CardDescription>تفاصيل أساسية عن منتجك</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">اسم المنتج *</Label>
                      <Input
                        id="name"
                        placeholder="أدخل اسم منتجك"
                        value={productData.name}
                        onChange={(e) =>
                          setProductData({
                            ...productData,
                            name: e.target.value,
                          })
                        }
                        required
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">وصف المنتج *</Label>
                      <Textarea
                        id="description"
                        placeholder="وصف منتجك بالتفصيل"
                        value={productData.description}
                        onChange={(e) =>
                          setProductData({
                            ...productData,
                            description: e.target.value,
                          })
                        }
                        required
                        className="min-h-[120px] rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">الفئة *</Label>
                      <Select
                        value={productData.category_id.toString()} // ← Convert number to string for UI
                        onValueChange={(value) => {
                          setProductData({
                            ...productData,
                            category_id: parseInt(value, 10), // ← Convert string back to number for state
                          });
                        }}
                        required
                      >
                        <SelectTrigger id="category" className="rounded-lg">
                          <SelectValue placeholder="اختر فئة" />
                        </SelectTrigger>
                        <SelectContent>
                          {storeCategories.data.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">السعر (بالشيكل) *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          value={productData.price}
                          onChange={(e) =>
                            setProductData({
                              ...productData,
                              price: parseFloat(e.target.value),
                            })
                          }
                          required
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 gap-1">
                      <Switch
                        id="show-location"
                        checked={productData.show_location}
                        onCheckedChange={(checked) =>
                          setProductData({
                            ...productData,
                            show_location: checked,
                          })
                        }
                        className="flex flex-row-reverse"
                      />
                      <Label htmlFor="show-location">عرض الموقع</Label>
                    </div>
                    {productData.show_location && (
                      <div className="space-y-4 mt-4">
                        <Label>اختر موقع المنتج</Label>
                        <Suspense fallback={<>جار تحميل الخريطة...</>}>
                          <LeafletMap
                            latitude={productData.latitude}
                            longitude={productData.longitude}
                            onLocationChange={handleLocationChange}
                          />
                        </Suspense>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div>
                            <Label htmlFor="latitude">Latitude:</Label>
                            <Input
                              type="number"
                              id="latitude"
                              value={productData.latitude}
                              readOnly
                              className="rounded-lg"
                            />
                          </div>
                          <div>
                            <Label htmlFor="longitude">Longitude:</Label>
                            <Input
                              type="number"
                              id="longitude"
                              value={productData.longitude}
                              readOnly
                              className="rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>معاينة المنتج</CardTitle>
                    <CardDescription>كيف سيكون شكل منتجك</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border overflow-hidden">
                      <div className="h-48 bg-muted/50 relative">
                        <div className="h-full w-full flex items-center justify-center">
                          <Package className="h-12 w-12 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold">
                          {productData.name || "اسم المنتج"}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {productData.description || "وصف المنتج سوف يعرض هنا"}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold">
                            $
                            {Number.parseFloat(
                              productData.price || "0"
                            ).toFixed(2)}
                          </span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            {storeCategories.data.find(
                              (cat) => cat.id === productData.category_id
                            )?.name || "القسم"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <Button
                type="button"
                variant="outline"
                asChild
                className="rounded-full"
              >
                <Link
                  href={
                    data.recent_products?.id
                      ? `/seller/stores/${data.recent_products.id}`
                      : "/seller/dashboard"
                  }
                >
                  الغاء
                </Link>
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600"
                disabled={loading}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جار اضافة المنتج...
                  </>
                ) : (
                  <>
                    <Package className="mr-2 h-4 w-4" />
                    اضف المنتج
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
