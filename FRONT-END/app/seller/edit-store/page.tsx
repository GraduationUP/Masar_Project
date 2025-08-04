"use client";

import Header from "@/components/main_layout/header";
import PageTitle from "@/components/main_layout/PageTitle";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";

interface OriginalStroe {
  id: number;
  name: string;
  owner_phone: string;
  status: "active" | "inactive";
  created_at: string;
  average_rating: number;
  latitude: string;
  longitude: string;
  id_card_photo_url: string;
}

interface store {
  store_name: string;
  id_card_photo: string;
  phone: string;
  location_address: string;
  status: "active" | "inactive";
  latitude: number;
  longitude: number;
}

export default function EditStore() {
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [originalStore, setOriginalStore] = useState<OriginalStroe>();
  const [store, setStore] = useState<store>({
    store_name: "",
    id_card_photo: "",
    phone: "",
    location_address: "",
    status: "active",
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
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
          return;
        }

        const responseData = await response.json();
        setOriginalStore(responseData.store);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handelStoreUpdate() {}

  return (
    <>
      <Header />
      <div className="container">
        <PageTitle MainTitle="تعديل المتجر" />
        <Card className="w-full mt-5">
          <form>
            <CardHeader>
              <CardTitle>{originalStore?.name}</CardTitle>
              <CardDescription>الحالة: {originalStore?.status}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium leading-none text-muted-foreground mb-2">
                  صورة المتجر
                </h3>
                <Avatar>
                  <AvatarImage>
                    <Image
                      src={originalStore?.id_card_photo_url || "/placeholder-store.png"}
                      alt={`ID card for ${originalStore?.name}`}
                      width={100}
                      height={100}
                    />
                  </AvatarImage>
                  <AvatarFallback>
                    <Image
                      src={"/placeholder-store.png"}
                      alt={`ID card for ${originalStore?.name}`}
                      width={100}
                      height={100}
                    />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h3 className="text-sm font-medium leading-none text-muted-foreground mb-2">
                  رقم التواصل
                </h3>
                <p className="text-base">{originalStore?.owner_phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium leading-none text-muted-foreground mb-2">
                  الموقع
                </h3>
                <p className="text-base"></p>
                <p className="text-sm text-muted-foreground mt-1">
                  Lat: {Number(originalStore?.latitude).toFixed(4)}, Long:{" "}
                  {Number(originalStore?.longitude).toFixed(4)}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">ارسال</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
