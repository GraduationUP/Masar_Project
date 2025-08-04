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
import { Select } from "@/components/ui/select";
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

export default function EditProduct() {
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [originalProduct, setOriginalProduct] = useState<originalProduct>();
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
        <form>
          <CardContent>
            <label htmlFor="name">اسم المنتج</label>
            <Input type="text" id="name" placeholder={originalProduct?.name} />

            <label htmlFor="price">سعر المنتج</label>
            <Input
              type="number"
              id="price"
              placeholder={`${originalProduct?.price}`}
            />

            <label htmlFor="discription">وصف المنتج</label>
            <Input
              type="text"
              id="discription"
              placeholder={`${originalProduct?.description}`}
            />

            <label htmlFor="category_id">فئة المنتج</label>
            <Select></Select>

            <label htmlFor="show_location">عرض الموقع</label>
            <Switch id="show_location" />

            <label htmlFor="coordinats">الاحداثيات</label>
            <Suspense fallback={<Loader />}>
              <LeafletMap
                latitude={parseFloat(storeData.latitude)}
                longitude={parseFloat(storeData.longitude)}
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
