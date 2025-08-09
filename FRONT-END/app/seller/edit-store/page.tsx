"use client";

import Header from "@/components/main_layout/header";
import PageTitle from "@/components/main_layout/PageTitle";
import { useState, useEffect, Suspense, lazy } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Loading from "./loading";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Loader } from "lucide-react";
import { CustomAlert } from "@/components/customAlert";

const LeafletMap = lazy(() =>
  import("@/components/LeafLetMap").then((module) => ({
    default: module.default,
  }))
);

interface OriginalStroe {
  id: number;
  name: string;
  owner_phone: string;
  status: "active" | "inactive" | "pending" | "banned";
  location_address: string;
  created_at: string;
  average_rating: number;
  latitude: string;
  longitude: string;
  id_card_photo_url: string;
}

interface store {
  store_name: string;
  id_card_photo: File | string; // Changed the type to accept both File and string
  phone: string;
  location_address: string;
  status: "active" | "inactive" | "pending" | "banned";
  latitude: number;
  longitude: number;
}

export default function EditStore() {
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failuer, setFailuer] = useState(false);
  const [originalStore, setOriginalStore] = useState<OriginalStroe>();
  const [store, setStore] = useState<store>({
    store_name: "",
    id_card_photo: "",
    phone: "",
    status: "active",
    location_address: "",
    latitude: 31.523502842999026,
    longitude: 34.43004945503749,
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

  // New useEffect to populate the store state with original data
  useEffect(() => {
    if (originalStore && store.store_name === "") {
      setStore({
        store_name: originalStore.name,
        id_card_photo: originalStore.id_card_photo_url,
        phone: originalStore.owner_phone,
        location_address: originalStore.location_address,
        status: originalStore.status,
        latitude: Number(originalStore.latitude) ?? 31.523502842999026,
        longitude: Number(originalStore.longitude) ?? 34.43004945503749,
      });
    }
  }, [originalStore]);

  async function handelStoreUpdate() {

    setSubmitting(true);

    if (!originalStore) return;

    const Auth_Token = localStorage.getItem("authToken");
    if (!Auth_Token) return;

    const formData = new FormData();
    formData.append("store_name", store.store_name);
    formData.append("latitude", String(store.latitude));
    formData.append("longitude", String(store.longitude));
    formData.append("_method", "PUT");
    formData.append("status", store.status);
    // Append the file only if it's a File object
    if (store.id_card_photo instanceof File) {
      formData.append("id_card_photo", store.id_card_photo);
    }
    formData.append("location_address", store.location_address);
    formData.append("phone", store.phone);

    const response = await fetch(`${BASE_API_URL}/api/seller/store`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Auth_Token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      setFailuer(true);
      return;
    }
    setSuccess(true);
    const responseData = await response.json();
    console.log("Store updated successfully:", responseData);
    setSubmitting(false);
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.name === "id_card_photo" && event.target.files?.[0]) {
      setStore((prev) => ({ ...prev, id_card_photo: event.target.files[0] }));
    } else {
      setStore((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setStore((prevData) => ({
      ...prevData,
      latitude: lat,
      longitude: lng,
    }));
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <CustomAlert
        message={"تم تحديث البيانات بنجاح"}
        show={success}
        onClose={() => setSuccess(false)}
        success
      />
      <CustomAlert
        message={"حدث خطأ ما!"}
        show={failuer}
        onClose={() => setFailuer(false)}
        success={false}
      />
      <div className="container">
        <PageTitle MainTitle="اعدادات المتجر" />
        <Card className="w-full mt-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handelStoreUpdate();
            }}
          >
            <CardHeader>
              <CardTitle>
                <Label htmlFor="name" className="mb-2">
                  اسم المتجر
                </Label>
                <Input
                  id="name"
                  name="store_name"
                  value={store.store_name}
                  onChange={handleChange}
                  placeholder={originalStore?.name}
                />
              </CardTitle>
              <Switch
                checked={store.status === "active"}
                onCheckedChange={(checked) =>
                  setStore((prev) => ({
                    ...prev,
                    status: checked ? "active" : "inactive",
                  }))
                }
                style={{ direction: "ltr" }}
              />
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium leading-none text-muted-foreground mb-2">
                  صورة المتجر
                </h3>
                <Input
                  type="file"
                  name="id_card_photo"
                  onChange={handleChange}
                  accept="image/*"
                  className="mt-1 block w-full px-3 py-2 text-base text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {store.id_card_photo &&
                  typeof store.id_card_photo === "string" && (
                    <Image
                      src={store.id_card_photo}
                      alt="Current ID card"
                      width={100}
                      height={100}
                      className="mt-2"
                    />
                  )}
              </div>
              <div>
                <Label htmlFor="phone">رقم التواصل</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={store.phone}
                  onChange={handleChange}
                  placeholder={originalStore?.owner_phone}
                />
              </div>

              <Label htmlFor="location_address"> عنوان المتجر</Label>
              <Input
                id="location_address"
                type="text"
                name="location_address"
                value={store.location_address}
                onChange={handleChange}
                placeholder={originalStore?.location_address}
              />

              <Label>موقع المتجر</Label>
              <Suspense fallback={<Loader />}>
                <LeafletMap
                  latitude={store.latitude}
                  longitude={store.longitude}
                  onLocationChange={(lat: number, lng: number) =>
                    handleLocationChange(lat, lng)
                  }
                />
              </Suspense>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <Label htmlFor="latitude">Latitude:</Label>
                  <Input
                    type="number"
                    id="latitude"
                    value={store.latitude}
                    readOnly
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude:</Label>
                  <Input
                    type="number"
                    id="longitude"
                    value={store.longitude}
                    readOnly
                    className="rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" variant={submitting ? "secondary" : "default"}>ارسال</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
