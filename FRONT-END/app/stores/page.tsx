"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  Search,
  ShoppingBag,
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
import PageTitle from "@/components/main_layout/PageTitle";
import PageBanner from "@/components/main_layout/PageBanner";
// Import the new component
import StoreCard_Map from "@/components/stores/storeCardAndMap";
import { Store } from "@/types/store";

interface ApiResponse {
  status: boolean;
  data: Store[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // State for controlling the expanded map, moved here
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
          // Convert status to number if it's not already
          const formattedStores = json.data.map(store => ({
            ...store,
            status: typeof store.status === 'string' ? (store.status === 'active' ? 1 : 0) : store.status
          }));
          setStores(formattedStores);
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

  // Function to toggle map, passed down to child component
  const toggleMap = (storeId: number) => {
    setExpandedStoreId(expandedStoreId === storeId ? null : storeId);
  };

  return (
    <>
      <Header />
      <PageBanner>استكشف عالمًا من المتاجر </PageBanner>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-6">
          <PageTitle
            MainTitle="المتاجر"
            Subtitle="تصفح قائمة المتاجر المحلية المتاحة"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                    // Use the new component here
                    <StoreCard_Map
                      key={store.id}
                      id={store.id}
                      store_name={store.store_name}
                      store_image={store.store_image}
                      location_address={store.location_address}
                      phone={store.phone}
                      status={store.status === 1 ? "active" : "inactive"}
                      latitude={store.latitude}
                      longitude={store.longitude}
                      expandedStoreId={expandedStoreId}
                      toggleMap={toggleMap}
                    />
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