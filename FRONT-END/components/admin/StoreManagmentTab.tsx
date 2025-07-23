import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import SearchBar from "@/components/ui/searchBar";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface storeUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface storeData {
  id: number;
  user_id: number;
  store_name: string;
  id_card_photo: string;
  phone: string;
  location_address: string;
  active: number;
  is_banned: boolean;
  created_at: string;
  updated_at: string;
  latitude: string | null;
  longitude: string | null;
  user: storeUser;
}

interface StoreManagementTabProps {
  storeData: storeData[];
  searchTerm: string;
  storeStatusFilter: string;
  storeStatusOptions: { value: string; label: string }[];
  handelStoreBan: (id: number) => Promise<void>;
  handelStoreUnban: (id: number) => Promise<void>;
  handelStoreDelete: (id: number) => Promise<void>;
  handelStoreStatusUpdate: (id: number, status: number) => Promise<void>;
  handleStoresSearch: (term: string, status: string) => void;
}

const StoreManagementTab: React.FC<StoreManagementTabProps> = ({
  storeData,
  searchTerm,
  storeStatusFilter,
  storeStatusOptions,
  handelStoreBan,
  handelStoreUnban,
  handelStoreDelete,
  handelStoreStatusUpdate,
  handleStoresSearch,
}) => {
  const filteredStores = storeData.filter((store) => {
    const storeNameLower = store.store_name.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    const statusMatch =
      storeStatusFilter === "all" ||
      (storeStatusFilter === "active" && store.active === 1) ||
      (storeStatusFilter === "inactive" && store.active === 0);
    return storeNameLower.includes(searchLower) && statusMatch;
  });

  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const [banLoading, setBanLoading] = useState<number | null>(null);
  const [unbanLoading, setUnbanLoading] = useState<number | null>(null);
  const [statusLoading, setStatusLoading] = useState<{
    id: number;
    status: number;
  } | null>(null);

  const handleBanClick = async (id: number) => {
    setBanLoading(id);
    await handelStoreBan(id);
    setBanLoading(null);
  };

  const handleUnbanClick = async (id: number) => {
    setUnbanLoading(id);
    await handelStoreUnban(id);
    setUnbanLoading(null);
  };

  const handleDeleteClick = async (id: number) => {
    setDeleteLoading(id);
    await handelStoreDelete(id);
    setDeleteLoading(null);
  };

  const handleStatusUpdateClick = async (id: number) => {
    const newStatus =
      storeData.find((store) => store.id === id)?.active === 1 ? 0 : 1;
    setStatusLoading({ id, status: newStatus });
    await handelStoreStatusUpdate(id, newStatus);
    setStatusLoading(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">إدارة المتاجر</h2>
      </div>
      <SearchBar
        placeholder="ابحث عن متجر"
        onSearch={handleStoresSearch}
        roleFilterOptions={storeStatusOptions}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <Card key={store.id} className="overflow-hidden">
            <div className="relative h-32 w-full">
              <img
                src={"/storeBanner.svg"}
                alt={store.store_name}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-full p-1">
                <img
                  src={"/placeholder-store.png"}
                  alt={`${store.store_name} logo`}
                  className="h-12 w-12 rounded-full border-2 border-background"
                />
              </div>
              <div className="absolute bottom-1 right-1 text-xs">
                <MapPin className="inline size-5" />
                {store.location_address}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{store.store_name}</h3>
                  {store.active === 1 ? (
                    <Badge>نشط</Badge>
                  ) : (
                    <Badge variant="destructive">معطل</Badge>
                  )}
                  {store.is_banned && (
                    <Badge variant="destructive">محظور</Badge>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex flex-col md:flex-row justify-between gap-2">
              <span className="text-xs text-muted-foreground md:block hidden">
                رقم مالك المتجر: {store.user.id}
              </span>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleDeleteClick(store.id)}
                  variant={"destructive"}
                  size="sm"
                  disabled={
                    deleteLoading === store.id ||
                    banLoading === store.id ||
                    unbanLoading === store.id ||
                    statusLoading?.id === store.id
                  }
                >
                  {deleteLoading === store.id ? "جاري الحذف..." : "حذف"}
                </Button>
                <Button
                  onClick={() =>
                    store.is_banned
                      ? handleUnbanClick(store.id)
                      : handleBanClick(store.id)
                  }
                  variant={"outline"}
                  size="sm"
                  disabled={
                    deleteLoading === store.id ||
                    banLoading === store.id ||
                    unbanLoading === store.id ||
                    statusLoading?.id === store.id
                  }
                >
                  {banLoading === store.id || unbanLoading === store.id
                    ? store.is_banned
                      ? "جاري الغاء الحظر..."
                      : "جاري الحظر..."
                    : store.is_banned
                    ? "الغاء الحظر"
                    : "حظر"}
                </Button>
                <Button
                  onClick={() => handleStatusUpdateClick(store.id)}
                  variant={"outline"}
                  size="sm"
                  disabled={
                    deleteLoading === store.id ||
                    banLoading === store.id ||
                    unbanLoading === store.id ||
                    statusLoading?.id === store.id
                  }
                >
                  {statusLoading?.id === store.id
                    ? "جاري تغيير الحالة..."
                    : "تغيير الحالة"}
                </Button>
                <Button asChild size="sm">
                  <Link href={`/stores/${store.id}`}>عرض</Link>
                </Button>
              </div>
              <span className="text-xs text-muted-foreground block md:hidden">
                رقم مالك المتجر: {store.user.id}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoreManagementTab;
