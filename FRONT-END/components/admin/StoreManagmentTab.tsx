import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import SearchBar from "@/components/ui/searchBar";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import DeleteStoreDialog from "./DeleteStoreDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  status: "pending" | "active" | "inactive" | "banned";
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
  handelStoreStatusUpdate: (id: number, status: "pending" | "active" | "inactive" | "banned") => Promise<void>;
  handleStoresSearch: (term: string, status: string) => void;
  onStoreDeleted: (id: number) => void;
}

const StoreManagementTab: React.FC<StoreManagementTabProps> = ({
  storeData,
  searchTerm,
  storeStatusFilter,
  storeStatusOptions,
  handelStoreStatusUpdate,
  handleStoresSearch,
  onStoreDeleted,
}) => {
  const [openDialogId, setOpenDialogId] = useState<number | null>(null);
  const [statusLoading, setStatusLoading] = useState<number | null>(null);

  const handleOpenChange = (storeId: number | null) => {
    setOpenDialogId(storeId);
  };

  const filteredStores = storeData.filter((store) => {
    const storeNameLower = store.store_name.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    const statusMatch =
      storeStatusFilter === "all" || store.status === storeStatusFilter;
    return storeNameLower.includes(searchLower) && statusMatch;
  });

   const handleStatusUpdateClick = async (id: number, status: string) => {
    setStatusLoading(id);
     await handelStoreStatusUpdate(id, status as "pending" | "active" | "inactive" | "banned");
    setStatusLoading(null);
  };

  const getStatusBadge = (status: storeData["status"]) => {
    switch (status) {
      case "active":
        return <Badge>نشط</Badge>;
      case "inactive":
        return <Badge variant="destructive">غير نشط</Badge>;
      case "pending":
        return <Badge variant="secondary">قيد المراجعة</Badge>;
      case "banned":
        return <Badge variant="destructive">محظور</Badge>;
      default:
        return null;
    }
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
                src={"/Banner.svg"}
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
                  {getStatusBadge(store.status)}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex flex-col md:flex-row justify-between gap-2">
              <span className="text-xs text-muted-foreground md:block hidden">
                رقم مالك المتجر: {store.user.id}
              </span>
              <div className="flex gap-2">
                <DeleteStoreDialog
                  store={store}
                  open={openDialogId === store.id}
                  onOpenChange={(open) =>
                    handleOpenChange(open ? store.id : null)
                  }
                  onStoreDeleted={onStoreDeleted}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={"outline"}
                      size="sm"
                      disabled={statusLoading === store.id}
                    >
                      {statusLoading === store.id
                        ? "جاري التحديث..."
                        : "تغيير الحالة"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {storeStatusOptions
                      .filter((option) => option.value !== "all")
                      .map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onSelect={() =>
                            handleStatusUpdateClick(store.id, option.value)
                          }
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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