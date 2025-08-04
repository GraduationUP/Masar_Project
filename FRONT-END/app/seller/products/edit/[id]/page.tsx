"use client";

import Header from "@/components/main_layout/header";
import PageTitle from "@/components/main_layout/PageTitle";
import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Loading from "./loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LeafletMap from "@/components/LeafLetMap";
import { Loader } from "lucide-react";

interface originalProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  photo: string;
  store_id: number;
  store_name: string;
  store_phone: string;
  store_photo: string;
  category_name: string;
  latitude: number;
  longitude: number;
  show_location: number;
  location_address: string;
  created_at: string;
}

interface product {
  name: string;
  description: string;
  price: string;
  photo: File | null;
  category_id: number;
  latitude: number;
  longitude: number;
  show_location: number;
}

export default function EditProduct() {
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [originalProduct, setOriginalProduct] = useState<originalProduct>();
  const [product, setProduct] = useState<product>({
    name: "",
    description: "",
    price: "",
    photo: null,
    category_id: 1,
    latitude: 31.53157982870554,
    longitude: 34.46717173572411,
    show_location: 0,
  });
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_API_URL}/api/guest/products/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOriginalProduct(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, BASE_API_URL]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/api/guest/categories`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status) {
          setCategories(data.data);
        } else {
          console.error("API returned status false for categories:", data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    })();
  }, [BASE_API_URL]);

  async function handelProductUpdate({ id }: { id: number }) {
    setLoading(true);
    try {
      const Auth_Token = localStorage.getItem("authToken");
      if (!Auth_Token) {
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      if (product.photo) formData.append("photo", product.photo);
      formData.append("category_id", product.category_id.toString());
      formData.append("latitude", product.latitude.toString());
      formData.append("longitude", product.longitude.toString());
      formData.append("show_location", product.show_location.toString());
      const response = await fetch(
        `${BASE_API_URL}/api/seller/products/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${Auth_Token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOriginalProduct(data.data);
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      event.target.name === "id_card_photo" &&
      event.target instanceof HTMLInputElement &&
      event.target.files
    ) {
      setProduct((prev) => ({
        ...prev,
        id_card_photo: event.target.files[0],
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setProduct((prevData) => ({
      ...prevData,
      latitude: lat,
      longitude: lng,
    }));
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <PageTitle
        MainTitle="تعديل المنتجات"
        Subtitle={`تعديل المنتج {حط اسم المنتج}`}
      />
      <Card>
        <CardHeader>
          <CardTitle>البضاعة ({originalProduct?.name})</CardTitle>
          <CardDescription>رقم المنتج: {originalProduct?.id}</CardDescription>
        </CardHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handelProductUpdate({ id: originalProduct?.id as number });
          }}
        >
          <CardContent>
            <label htmlFor="name">اسم المنتج</label>
            <Input
              type="text"
              id="name"
              placeholder={originalProduct?.name}
              value={product.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="price">سعر المنتج</label>
            <Input
              type="number"
              id="price"
              placeholder={`${originalProduct?.price}`}
              value={product.price}
              onChange={handleChange}
              required
            />

            <label htmlFor="discription">وصف المنتج</label>
            <Input
              type="text"
              id="discription"
              placeholder={`${originalProduct?.description}`}
              value={product.description}
              onChange={handleChange}
              required
            />

            <label htmlFor="category_id">فئة المنتج</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <label htmlFor="show_location">عرض الموقع</label>
            <Switch id="show_location" />

            <label htmlFor="coordinats">الاحداثيات</label>
            <Suspense fallback={<Loader />}>
              <LeafletMap
                latitude={product.latitude}
                longitude={product.longitude}
                onLocationChange={(lat: number, lng: number) =>
                  handleLocationChange(lat, lng)
                }
              />
            </Suspense>
          </CardContent>
          <CardFooter>
            <Button type="submit">ارسال</Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
