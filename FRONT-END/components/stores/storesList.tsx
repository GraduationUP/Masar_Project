"use client";

import { Label } from "../ui/label";
import { Store } from "@/types/store";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import StoreCard_Map from "@/components/stores/storeCardAndMap";
import { useMemo, useState } from "react";
import SearchFilter from "./searchFilter";

export default function StoreList({ StoreData }: { StoreData: Store[] }) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [expandedStoreId, setExpandedStoreId] = useState<number | null>(null);
  const toggleMap = (storeId: number) => {
    setExpandedStoreId(expandedStoreId === storeId ? null : storeId);
  };
  const filteredAndSortedStores = useMemo(() => {
    let currentStores = StoreData.filter(
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
  }, [StoreData, searchQuery, sortBy]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1 space-y-6">
        <SearchFilter
          searchQuery={searchQuery}
          setExpandedStoreId={setExpandedStoreId}
          setSearchQuery={setSearchQuery}
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
      </div>
      <div className="md:col-span-3">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 md:hidden">
            <Label htmlFor="mobile-sort-stores" className="sr-only">
              ترتيب
            </Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="mobile-sort-stores" className="w-[180px]">
                <SelectValue placeholder="ترتيب بواسطة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">الأحدث</SelectItem>
                <SelectItem value="name-asc">الاسم: تصاعدي (أ-ي)</SelectItem>
                <SelectItem value="name-desc">الاسم: تنازلي (ي-أ)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {filteredAndSortedStores.map((store) => (
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
      </div>
    </div>
  );
}
