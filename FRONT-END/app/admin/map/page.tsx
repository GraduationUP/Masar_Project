"use client";

import dynamic from "next/dynamic";
import { Loader2, PencilIcon, Plus, Trash2Icon } from "lucide-react";
import { Suspense, useEffect, useMemo, useState } from "react";
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
import { MapData_Market, Mapdata, Coordinates } from "@/types/admin";

const LeafletMap = dynamic(() =>
  import("@/components/LeafLetMap").then((module) => ({
    default: module.default,
  }))
);

type Coordinate = [number, number];

const LeafletMapWithNoSSR = dynamic(
  () => import("@/components/MultipointMap"),
  {
    ssr: false,
  }
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

export interface GazaData {
  city: string;
  aids: Mapdata[];
  gas_station: Mapdata[];
  stores: MapData_Market[];
  market: Mapdata[];
  restaurants: Mapdata[];
  car_services: Mapdata[];
  petrol_station: Mapdata[];
  internet: Mapdata[];
  delivery: Mapdata[];
}

export default function AdminMapPage() {
  const [parentCoordinates, setParentCoordinates] = useState<Coordinate[]>([]);
  const handleCoordinatesChange = (newCoordinates: Coordinate[]) => {
    setParentCoordinates(newCoordinates);
    setCoordinates(parentCoordinates);
  };
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
  const [submitting, isSubmitting] = useState(false);
  const [mapData, setMapData] = useState<GazaData>({
    city: "",
    aids: [],
    market: [],
    gas_station: [],
    stores: [],
    restaurants: [],
    car_services: [],
    petrol_station: [],
    internet: [],
    delivery: [],
  });

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
      setMapData(responseData.services);
    } catch (error) {
      console.error("Error fetching stores data:", error);
    }
  }

  useEffect(() => {
    fetchStoresData();
  });

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
    isSubmitting(true);
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
      setSuccess(true);
      fetchStoresData();
    } catch (error) {
      setFail(true);
      console.error("Error adding service:", error);
    } finally {
      isSubmitting(false);
    }
  };

  const handleDeleteService = async (id: number) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/api/admin/map/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.error("Error deleting product");
        setFail(true);
        return;
      }
      setSuccess(true);
      fetchStoresData();
    } catch (error) {
      console.error("Error deleting product:", error);
      setFail(true);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // 'all', 'markets', 'aids', 'stores', 'gasstations'
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'active', 'inactive'

  // Combine all services into a single array with their type
  const allServices = useMemo(() => {
    const services: any[] = [];
    mapData.market.forEach((s) =>
      services.push({ ...s, type: "markets", typeName: "سوق" })
    );
    mapData.aids.forEach((s) =>
      services.push({ ...s, type: "aids", typeName: "مخزن مساعدات" })
    );
    mapData.stores.forEach((s) =>
      services.push({ ...s, type: "stores", typeName: "متجر" })
    );
    mapData.gas_station.forEach((s) =>
      services.push({ ...s, type: "gas_stations", typeName: "محطة غاز" })
    );
    mapData.restaurants.forEach((s) =>
      services.push({ ...s, type: "restaurants", typeName: "مطعم" })
    );
    mapData.car_services.forEach((s) =>
      services.push({ ...s, type: "car_services", typeName: "خدمات سيارات" })
    );
    mapData.petrol_station.forEach((s) =>
      services.push({ ...s, type: "petrol_station", typeName: "محطة وقود" })
    );
    mapData.internet.forEach((s) =>
      services.push({ ...s, type: "internet", typeName: "انترنت" })
    );
    mapData.delivery.forEach((s) =>
      services.push({ ...s, type: "delivery", typeName: "توصيل" })
    );
    return services;
  }, [mapData]);

  // Filter and search logic
  const filteredServices = useMemo(() => {
    return allServices.filter((service) => {
      // Type filter
      if (filterType !== "all" && service.type !== filterType) {
        return false;
      }
      // Status filter
      if (filterStatus === "active" && !service.status) {
        return false;
      }
      if (filterStatus === "inactive" && service.status) {
        return false;
      }
      // Search term filter
      if (
        searchTerm &&
        !service.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [allServices, filterType, filterStatus, searchTerm]);

  const renderServiceItem = (service: Mapdata | MapData_Market) => (
    <div
      key={`${service.coordinates}`}
      className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 gap-3"
    >
      <div className="flex flex-col flex-grow">
        <span className="font-bold text-lg text-gray-800">{service.name}</span>
      </div>
      <div className="flex flex-col items-center mx-4">
        <span className="font-bold text-gray-800">الإحداثيات</span>
        <span className="text-sm text-gray-600">
          {Array.isArray(service.coordinates[0])
            ? `${service.coordinates[0][0]}, ${service.coordinates[0][1]}`
            : service.coordinates.join(", ")}
        </span>
      </div>
      <div className="flex flex-col items-center mr-4">
        <span
          className={`text-sm ${
            service.status ? "text-green-600" : "text-red-600"
          }`}
        >
          {service.status ? "مفعل" : "غير مفعل"}
        </span>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="text-blue-500 hover:text-blue-700"
        >
          <PencilIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="text-red-500 hover:text-red-700"
          onClick={() => handleDeleteService(service.id)}
        >
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  if (!mapData) return <Loading />;
  return (
    <>
      <Header />
      <div className="container px-4 md:px-6 py-8 section-padding">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            خريطة الخدمات التفاعلية للأدمن
          </h1>
          <div className="flex gap-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
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
                            <SelectItem value="aids">مركز مساعدات</SelectItem>
                            <SelectItem value="gas_station">
                              محطة غاز
                            </SelectItem>
                            <SelectItem value="restaurants">مطعم</SelectItem>
                            <SelectItem value="car_services">
                              خدمات سيارات
                            </SelectItem>
                            <SelectItem value="petrol_station">
                              محطة بنزين
                            </SelectItem>
                            <SelectItem value="internet">
                              شبكة انترنت
                            </SelectItem>
                            <SelectItem value="delivery">خدمة توصيل</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-1">
                      <Label htmlFor="location">الاحداثيات</Label>
                      <Suspense fallback={<>جار تحميل الخريطة...</>}>
                        <div className="relative border rounded-md overflow-hidden">
                          {type === "market" ? (
                            <div className="h-96">
                              <LeafletMapWithNoSSR
                                onCoordinatesChange={handleCoordinatesChange}
                              />
                            </div>
                          ) : (
                            <LeafletMap
                              latitude={currentLatitude}
                              longitude={currentLongitude}
                              onLocationChange={handleLocationChange}
                            />
                          )}
                        </div>
                      </Suspense>

                      {type !== "market" && (
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
                      )}
                    </div>

                    <div className="flex gap-1 items-center space-x-2">
                      <Switch
                        id="location-status"
                        checked={isLocationEnabled}
                        onCheckedChange={handleStatusChange}
                        style={{ direction: "ltr" }}
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
                    {submitting ? (
                      <Button disabled variant={"ghost"}>
                        جار اضافة الخدمة...
                      </Button>
                    ) : (
                      <Button type="submit">اضافة الخدمة</Button>
                    )}
                  </DialogFooter>
                  {success && (
                    <p className="text-green-500">تم اضافة الخدمة بنجاح</p>
                  )}
                  {fail && (
                    <p className="text-red-500">حدث خطأ ما حاول مجدداً</p>
                  )}
                </form>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button>عرض جميع الخدمات</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-right">
                    جميع خدمات المنصة
                  </DialogTitle>
                  <DialogDescription className="text-right">
                    يمكنك البحث والتصفية بين جميع خدمات المنصة للتعديل والحذف.
                  </DialogDescription>
                </DialogHeader>

                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-4 items-center justify-end">
                  <Input
                    type="text"
                    placeholder="البحث بالاسم..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3 text-right"
                  />
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full md:w-1/4 text-right">
                      <SelectValue placeholder="تصفية حسب النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأنواع</SelectItem>
                      <SelectItem value="markets">الأسواق</SelectItem>
                      <SelectItem value="aids">مخازن المساعدات</SelectItem>
                      <SelectItem value="stores">المتاجر</SelectItem>
                      <SelectItem value="gas_stations">محطات الوقود</SelectItem>
                      <SelectItem value="restaurants">مطاعم</SelectItem>
                      <SelectItem value="car_services">خدمات السيارات</SelectItem>
                      <SelectItem value="petrol_station">محطة وقود</SelectItem>
                      <SelectItem value="internet">خدمات الانترنت</SelectItem>
                      <SelectItem value="delivery">خدمات التوصيل</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-1/4 text-right">
                      <SelectValue placeholder="تصفية حسب الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="active">مفعل</SelectItem>
                      <SelectItem value="inactive">غير مفعل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Display Filtered Services */}
                <div className="flex flex-col space-y-2">
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service) =>
                      renderServiceItem(service)
                    )
                  ) : (
                    <p className="text-center text-gray-600 py-8">
                      لا توجد خدمات مطابقة لعملية البحث أو التصفية.
                    </p>
                  )}
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary" type="button">
                      إلغاء
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <GazaMap data={mapData} />
      </div>
    </>
  );
}
