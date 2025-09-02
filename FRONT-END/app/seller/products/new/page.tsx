"use client";
import { Suspense, useState, lazy, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Package, ChevronRight } from "lucide-react";
import Link from "next/link";
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
import { CustomAlert } from "@/components/ui/customAlert";
import Header from "@/components/main_layout/header";
import { Product_form as Product } from "@/types/seller";

const LeafletMap = lazy(() =>
  import("@/components/maps/LeafLetMap").then((module) => ({
    default: module.default,
  }))
);

export default function NewProductPage() {
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productData, setProductData] = useState<Product>({
    name: "",
    description: "",
    photo: null,
    category_id: 1,
    price: 0,
    latitude: 31.53157982870554,
    longitude: 34.46717173572411,
    show_location: 0,
  });
  const [storeCategories, setStoreCategories] = useState<{
    status: boolean;
    data: { id: number; name: string }[]; // Assuming the category object has an 'id' and 'name'
  }>({
    status: false,
    data: [],
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setErrorMessage("Authentication token missing");
      setFailure(true);
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    if (productData.photo) {
      formData.append("photo", productData.photo);
    }
    formData.append("category_id", productData.category_id.toString());
    formData.append("price", productData.price.toString());
    formData.append("latitude", productData.latitude.toString());
    formData.append("longitude", productData.longitude.toString());
    formData.append("show_location", productData.show_location.toString());

    try {
      const response = await fetch(`${BASE_API_URL}/api/seller/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData?.message || "Failed to create product");
        setFailure(true);
        throw new Error(errorData?.message || "Failed to create product");
      }

      setSuccess(true);
      // Reset form after successful submission
      setProductData({
        name: "",
        description: "",
        photo: null,
        category_id: 1,
        price: 0,
        latitude: 31.53157982870554,
        longitude: 34.46717173572411,
        show_location: 0,
      });
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    } catch (error: any) {
      console.error("Error creating product:", error);
      setErrorMessage(error.message);
      setFailure(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | string // Add string to the type definition
  ) => {
    if (typeof e === "string") {
      // Handle Select component's onValueChange
      setProductData((prev) => ({
        ...prev,
        category_id: parseInt(e, 10), // Convert the string value back to a number
      }));
    } else if (e?.target) {
      // Handle Input and Textarea components' onChange
      const { name, value } = e.target;
      setProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductData((prev) => ({
        ...prev,
        photo: file,
      }));
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${BASE_API_URL}/api/guest/categories`, {
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
    setProductData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
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
              <Link href="/seller/dashboard">
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                إضافة منتج جديد
              </h1>
              <p className="text-muted-foreground">أضف منتجًا إلى متجرك</p>
            </div>
          </div>

          <CustomAlert
            message="تم اضافة المنتج بنجاح"
            show={success}
            onClose={() => setSuccess(false)}
            success
          />
          <CustomAlert
            message={errorMessage || "حدث خطأ في اضافة المنتج"}
            show={failure}
            onClose={() => {
              setFailure(false);
              setErrorMessage(null);
            }}
            success={false}
          />

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
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
                      name="name"
                      placeholder="أدخل اسم منتجك"
                      value={productData.name}
                      onChange={handleChange}
                      required
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">وصف المنتج *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="وصف منتجك بالتفصيل"
                      value={productData.description}
                      onChange={handleChange}
                      required
                      className="min-h-[120px] rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">الفئة *</Label>
                    <Select
                      value={productData.category_id.toString()} // ← Convert number to string for UI
                      onValueChange={handleChange}
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
                  <div className="space-y-2">
                    <Label htmlFor="price">السعر (بالشيكل) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={productData.price}
                      onChange={handleChange}
                      required
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex items-center space-x-2 gap-1">
                    <Switch
                      id="show-location"
                      checked={productData.show_location === 0 ? false : true}
                      onCheckedChange={(checked) =>
                        setProductData({
                          ...productData,
                          show_location: checked === true ? 1 : 0,
                        })
                      }
                      className="flex flex-row-reverse"
                    />
                    <Label htmlFor="show-location">عرض الموقع</Label>
                  </div>
                  {productData.show_location && (
                    <div className="space-y-4 mt-4">
                      <Label>اختر موقع المنتج</Label>
                      <Suspense fallback={<div>جار تحميل الخريطة...</div>}>
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
                  <CardTitle>صورة المنتج</CardTitle>
                  <CardDescription>ارفع صورة منتجك</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-40 w-full bg-muted/50 rounded-lg flex items-center justify-center overflow-hidden">
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="صورة المنتج"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Package className="h-12 w-12 text-muted-foreground" />
                        )}
                      </div>
                      <label className="inline-flex items-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium cursor-pointer hover:bg-accent hover:text-accent-foreground">
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                          required
                        />
                        <Package className="h-4 w-4 ml-2" />
                        رفع الصورة
                      </label>
                      <p className="text-xs text-muted-foreground">
                        الحجم الموصى: 800x800px
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-full mt-8 flex justify-between">
              <Button
                type="button"
                variant="outline"
                asChild
                className="rounded-full"
              >
                <Link href="/seller/dashboard">الغاء</Link>
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600"
                disabled={isSubmitting}
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
