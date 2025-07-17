"use client";

import { Suspense, useState, lazy } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Header from "@/components/main_layout/header";

const LeafletMap = lazy(() =>
  import("@/components/LeafletMap").then((module) => ({
    default: module.default,
  }))
);

interface StoreData {
  store_name: string;
  phone: string;
  location_address: string;
  id_card_photo: string;
  latitude: string;
  longitude: string;
}

export default function CreateStorePage() {
  const [storeData, setStoreData] = useState<StoreData>({
    store_name: "",
    phone: "",
    location_address: "",
    id_card_photo: "",
    latitude: "34",
    longitude: "31",
  });

  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

  async function handleCreateStore(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${BASE_API_URL}/api/seller/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(storeData),
      });

      if (!response.ok) {
        throw new Error("Failed to create store");
      }

      const data = await response.json();
      console.log("Store created successfully:", data);
      // Optionally, redirect the user or show a success message
    } catch (error) {
      console.error("Error creating store:", error);
      // Optionally, display an error message to the user
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStoreData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLocationChange = (lat: string, lng: string) => {
    setStoreData((prevData) => ({
      ...prevData,
      latitude: lat,
      longitude: lng,
    }));
  };

  const showStates = () => {
    console.log(storeData);
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="container mx-6">
          <CardContent>
            <h3 className="mb-4 text-xl">انشاء متجرك الخاص</h3>
            <form onSubmit={handleCreateStore} className="space-y-4">
              <div>
                <label htmlFor="store_name">اسم المتجر:</label>
                <Input
                  type="text"
                  id="store_name"
                  name="store_name"
                  value={storeData.store_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone">الهاتف الجوال</label>
                <Input
                  type="text"
                  id="phone"
                  name="phone"
                  value={storeData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="location_address">العنوان</label>
                <Input
                  type="text"
                  id="location_address"
                  name="location_address"
                  value={storeData.location_address}
                  onChange={handleChange}
                />
              </div>
              <label>اختر موقع المنتج</label>
              <Suspense fallback={<Loader />}>
                <LeafletMap
                  latitude={parseFloat(storeData.latitude)}
                  longitude={parseFloat(storeData.longitude)}
                  onLocationChange={(lat: number, lng: number) => handleLocationChange(`${lat}`, `${lng}`)}
                />
              </Suspense>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label htmlFor="latitude">Latitude:</label>
                  <Input
                    type="number"
                    id="latitude"
                    value={storeData.latitude}
                    readOnly
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <label htmlFor="longitude">Longitude:</label>
                  <Input
                    type="number"
                    id="longitude"
                    value={storeData.longitude}
                    readOnly
                    className="rounded-lg"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                انشئ متجراً
              </Button>
            </form>
          </CardContent>
        </Card>
        <Button onClick={showStates}>اطبع</Button>
      </div>
    </>
  );
}
