"use client";

import { Suspense, useState, lazy } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Header from "@/components/main_layout/header";
import { Label } from "@/components/ui/label";
import { CustomAlert } from "@/components/customAlert";
import { redirect } from "next/navigation";

const LeafletMap = lazy(() =>
  import("@/components/LeafLetMap").then((module) => ({
    default: module.default,
  }))
);

interface StoreData {
  store_name: string;
  phone: string;
  location_address: string;
  id_card_photo: File | null;
  latitude: string;
  longitude: string;
}

export default function CreateStorePage() {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [storeData, setStoreData] = useState<StoreData>({
    store_name: "",
    phone: "",
    location_address: "",
    id_card_photo: null,
    latitude: "31.518", // Adjusted initial latitude for Gaza
    longitude: "34.466", // Adjusted initial longitude for Gaza
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

  async function handleCreateStore(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    const authToken = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("store_name", storeData.store_name);
    formData.append("phone", storeData.phone);
    formData.append("location_address", storeData.location_address);
    if (storeData.id_card_photo) {
      formData.append("id_card_photo", storeData.id_card_photo);
    }
    formData.append("latitude", storeData.latitude);
    formData.append("longitude", storeData.longitude);

    try {
      const response = await fetch(`${BASE_API_URL}/api/seller/store`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFailure(true);
        throw new Error(errorData?.message || "Failed to create store");
      }
      setSuccess(true);
      redirect("/seller/dashboard");
    } catch (error: any) {
      setErrorMessage(error.message);
      setFailure(true);
    } finally {
      setIsSubmitting(false);
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
      setStoreData((prev) => ({
        ...prev,
        id_card_photo: event.target.files[0],
      }));
    } else {
      setStoreData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setStoreData((prevData) => ({
      ...prevData,
      latitude: `${lat}`,
      longitude: `${lng}`,
    }));
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <CustomAlert
          message="تم انشاء المتجر بنجاح"
          show={success}
          onClose={() => setSuccess(false)}
          success
        />
        <CustomAlert
          message="حدث خطأ ما"
          show={failure}
          onClose={() => setFailure(false)}
          success={false}
        />
        <Card className="container mx-6">
          <CardContent>
            <h3 className="mb-4 text-xl">انشاء متجرك الخاص</h3>
            {errorMessage && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">حدث خطأ:</span> {errorMessage}
              </div>
            )}
            <form onSubmit={handleCreateStore} className="space-y-4">
              <div>
                <Label htmlFor="store_name">اسم المتجر:</Label>
                <Input
                  type="text"
                  id="store_name"
                  name="store_name"
                  value={storeData.store_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">الهاتف الجوال</Label>
                <Input
                  type="text"
                  id="phone"
                  name="phone"
                  value={storeData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location_address">العنوان</Label>
                <Input
                  type="text"
                  id="location_address"
                  name="location_address"
                  value={storeData.location_address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="id_card_photo">صورة للمتجر</Label>
                <Input
                  type="file"
                  id="id_card_photo"
                  name="id_card_photo"
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>
              <Label>اختر موقع المتجر</Label>
              <Suspense fallback={<Loader />}>
                <LeafletMap
                  latitude={parseFloat(storeData.latitude)}
                  longitude={parseFloat(storeData.longitude)}
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
                    value={storeData.latitude}
                    readOnly
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude:</Label>
                  <Input
                    type="number"
                    id="longitude"
                    value={storeData.longitude}
                    readOnly
                    className="rounded-lg"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                انشئ متجراً
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
