"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  Search,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  MapPinOff,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/main_layout/header";
import dynamic from "next/dynamic";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import PageTitle from "@/components/main_layout/PageTitle";
import PageBanner from "@/components/main_layout/PageBanner";

const MapWithNoSSR = dynamic(() => import("@/components/mapWithNoSSR"), {
  ssr: false,
  loading: () => null,
});

interface Store {
  id: number;
  user_id: number;
  store_name: string;
  id_card_photo: string;
  phone: string;
  location_address: string;
  status: number;
  created_at: string;
  updated_at: string;
  latitude: string;
  longitude: string;
  store_image: string;
}

interface ApiResponse {
  status: boolean;
  data: Store[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest"); // 'newest', 'name-asc', 'name-desc'
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedStoreId, setExpandedStoreId] = useState<number | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/guest/stores`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json: ApiResponse = await response.json();
        if (json.status && Array.isArray(json.data)) {
          setStores(json.data);
        } else {
          setError(
            "API returned an unexpected data structure or status false."
          );
        }
      } catch (e: any) {
        setError(`Failed to fetch stores: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [API_URL]);

  const filteredAndSortedStores = useMemo(() => {
    let currentStores = stores.filter(
      (store) =>
        store.store_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.location_address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort stores
    currentStores.sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else if (sortBy === "name-asc") {
        return a.store_name.localeCompare(b.store_name);
      } else if (sortBy === "name-desc") {
        return b.store_name.localeCompare(a.store_name);
      }
      return 0;
    });

    return currentStores;
  }, [stores, searchQuery, sortBy]);

  const toggleMap = (storeId: number) => {
    setExpandedStoreId(expandedStoreId === storeId ? null : storeId);
  };

  return (
    <>
      <Header />
      <PageBanner>
        مش عارف ايش مكتوب هنا بستنى النت يفتحلي ملف الفيجما
      </PageBanner>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-6">
          <PageTitle MainTitle="المتاجر" Subtitle="تصفح قائمة المتاجر المحلية المتاجة"/>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filter/Sidebar Section */}
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>تصفية المتاجر</CardTitle>
                  <CardDescription>قم بتحسين بحثك عن المتاجر</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search-stores">ابحث</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search-stores"
                        type="search"
                        placeholder="ابحث عن متجر أو عنوان..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sort-stores">ترتيب بواسطة</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger id="sort-stores">
                        <SelectValue placeholder="ترتيب بواسطة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">الأحدث</SelectItem>
                        <SelectItem value="name-asc">
                          الاسم: تصاعدي (أ-ي)
                        </SelectItem>
                        <SelectItem value="name-desc">
                          الاسم: تنازلي (ي-أ)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSearchQuery("");
                        setSortBy("newest");
                        setExpandedStoreId(null);
                      }}
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      إعادة ضبط الفلتر
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content: Store Cards */}
            <div className="md:col-span-3">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 md:hidden">
                  <Label htmlFor="mobile-sort-stores" className="sr-only">
                    ترتيب
                  </Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger
                      id="mobile-sort-stores"
                      className="w-[180px]"
                    >
                      <SelectValue placeholder="ترتيب بواسطة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">الأحدث</SelectItem>
                      <SelectItem value="name-asc">
                        الاسم: تصاعدي (أ-ي)
                      </SelectItem>
                      <SelectItem value="name-desc">
                        الاسم: تنازلي (ي-أ)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-lg font-medium">جارٍ تحميل المتاجر...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-red-500">
                  <p className="text-lg font-medium">خطأ: {error}</p>
                </div>
              ) : filteredAndSortedStores.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">لا يوجد أي متجر</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    حاول تعديل بحثك أو فلترتك للعثور على ما تبحث عنه.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {filteredAndSortedStores.map((store) => (
                    <Card
                      key={store.id}
                      className="overflow-hidden h-full flex flex-col"
                    >
                      <Link href={`/stores/${store.id}`} className="w-full">
                        <CardHeader className="flex-grow">
                          <CardTitle className="text-lg">
                            <div className="flex gap-2 items-center">
                              <Avatar>
                                <AvatarImage
                                  src={store.store_image}
                                  alt={store.store_name}
                                />
                                <AvatarFallback>
                                  <Image
                                    src={"/placeholder-store.png"}
                                    alt={store.store_name}
                                    height={50}
                                    width={50}
                                    className="rounded-full"
                                  />
                                </AvatarFallback>
                              </Avatar>
                              {store.store_name}
                            </div>
                          </CardTitle>
                          <CardDescription>
                            {store.location_address}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">
                            <strong>الهاتف:</strong> {store.phone}
                          </p>
                          <Badge
                            className="mt-2"
                            variant={
                              store.status === 1 ? "default" : "secondary"
                            }
                          >
                            {store.status === 1 ? "مفتوح" : "مغلق"}
                          </Badge>
                        </CardContent>
                      </Link>
                      <CardFooter className="flex flex-col items-start pt-4 border-t">
                        {store.latitude !== null ? (
                          <Button
                            variant="outline"
                            className="w-full flex justify-center items-center gap-2"
                            onClick={() => toggleMap(store.id)}
                          >
                            {expandedStoreId === store.id ? (
                              <>
                                إخفاء الخريطة <ChevronUp className="h-4 w-4" />
                              </>
                            ) : (
                              <>
                                عرض على الخريطة
                                <ChevronDown className="h-4 w-4" />
                              </>
                            )}
                          </Button>
                        ) : (
                          <MapPinOff className="h-4 w-4 text-muted-foreground" />
                        )}
                        {expandedStoreId === store.id &&
                          store.latitude &&
                          store.longitude && (
                            <div className="w-full h-64 mt-4 rounded-md overflow-hidden z-0">
                              <MapWithNoSSR
                                center={[
                                  parseFloat(store.latitude),
                                  parseFloat(store.longitude),
                                ]}
                                zoom={15}
                                markers={[
                                  {
                                    position: [
                                      parseFloat(store.latitude),
                                      parseFloat(store.longitude),
                                    ],
                                    title: store.store_name,
                                    type: "store",
                                  },
                                ]}
                              />
                            </div>
                          )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
