"use client";

import dynamic from "next/dynamic";
import { Loader2, Plus } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Header from "@/components/main_layout/header";

const LeafletMap = dynamic(() =>
  import("@/components/LeafLetMap").then((module) => ({
    default: module.default,
  }))
);

// Dynamically import the map component to avoid SSR issues
const GazaMap = dynamic(() => import("@/components/AdminMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-muted/30 animate-pulse flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
      <span className="sr-only">جار تحميل الخريطة...</span>
    </div>
  ),
});
interface Coordinates {
  [index: number]: number;
}

interface Aid {
  name: string;
  coordinates: [Coordinates];
}

interface Market {
  name: string;
  coordinates: [Coordinates, Coordinates?, Coordinates?];
}

interface GasStation {
  name: string;
  coordinates: [Coordinates];
}

interface Store {
  name: string;
  coordinates: Coordinates;
}

export interface GazaData {
  city: string;
  aids: Aid[];
  markets: Market[];
  GasStations: GasStation[];
  stores: Store[];
}

export default function AdminMapPage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
  const [currentLatitude, setCurrentLatitude] = useState<number>(31.4167);
  const [currentLongitude, setCurrentLongitude] = useState<number>(34.3333);
  const [status, setStaus] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [mapData, setMapData] = useState<GazaData>({
    city: "",
    aids: [],
    markets: [],
    GasStations: [],
    stores: [],
  });

  useEffect(() => {
    async function fetchStoresData() {
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
        setMapData(responseData);
      } catch (error) {
        console.error("Error fetching stores data:", error);
      }
    }
    fetchStoresData();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    setCoordinates([]);
    setCurrentLatitude(31.4167);
    setCurrentLongitude(34.3333);
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setCurrentLatitude(lat);
    setCurrentLongitude(lng);
    if (type !== "market") {
      setCoordinates([[lat, lng]]);
    } else {
      setCoordinates((prev) => [...prev, [lat, lng]]);
    }
  };

  const handleStatusChange = (checked: boolean) => {
    setIsLocationEnabled(checked);
    setStaus(checked ? true : false);
  };

  const handelAddService = async () => {
    const token = localStorage.getItem("authToken");
    let formattedCoordinates = coordinates;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/map`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          type,
          coordinates: formattedCoordinates,
          status: isLocationEnabled ? true : false,
        }),
      });
      if (!response.ok) {
        setFail(true);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Success:", data);
      setSuccess(true);
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const showStates = () => {
    console.log({ name, type, coordinates, status });
  };

  if (!mapData) return <Loading />;
  return (
    <>
      <Header />
      <div className="container px-4 md:px-6 py-8 section-padding">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            خريطة الخدمات التفاعلية للأدمن
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                اضافة خدمة
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handelAddService();
                }}
                className="grid gap-4 py-2"
              >
                <DialogHeader>
                  <DialogTitle>إضافة خدمة الى الخريطة</DialogTitle>
                  <DialogDescription>
                    قم بتحديد الاسم والنوع والاحداثيات واضف الحالة للخدمة
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="grid gap-1">
                      <Label htmlFor="name">اسم الخدمة</Label>
                      <Input
                        placeholder="اكتب الاسم هنا"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="type">نوع الخدمة</Label>
                      <Select onValueChange={handleTypeChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="نوع الخدمة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="market">سوق</SelectItem>
                          <SelectItem value="aid">مركز مساعدات</SelectItem>
                          <SelectItem value="gas_station">محطة غاز</SelectItem>
                          <SelectItem value="store">محل تجاري</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-1">
                    <Label htmlFor="location">الاحداثيات</Label>
                    <Suspense fallback={<>جار تحميل الخريطة...</>}>
                      <div className="relative border rounded-md">
                        <LeafletMap
                          latitude={currentLatitude}
                          longitude={currentLongitude}
                          onLocationChange={handleLocationChange}
                        />
                      </div>
                    </Suspense>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <div>
                        <Label htmlFor="latitude">Latitude:</Label>
                        <Input
                          type="number"
                          id="latitude"
                          value={currentLatitude}
                          readOnly
                          className="rounded-lg"
                        />
                      </div>
                      <div>
                        <Label htmlFor="longitude">Longitude:</Label>
                        <Input
                          type="number"
                          id="longitude"
                          value={currentLongitude}
                          readOnly
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ltr">
                    <Switch
                      id="location-status"
                      checked={isLocationEnabled}
                      onCheckedChange={handleStatusChange}
                    />
                    <Label htmlFor="location-status">مفعل</Label>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary" type="button">
                      الغاء
                    </Button>
                  </DialogClose>
                  <Button type="submit">اضافة الخدمة</Button>
                </DialogFooter>
                {success && (
                  <p className="text-green-500">تم اضافة الخدمة بنجاح</p>
                )}
                {fail && <p className="text-red-500">حدث خطأ ما حاول مجدداً</p>}
              </form>
              <Button onClick={showStates}>print</Button>
            </DialogContent>
          </Dialog>
        </div>
        <GazaMap data={mapData} />
      </div>
    </>
  );
}
