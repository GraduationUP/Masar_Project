import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SearchBar from "@/components/ui/searchBar";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import ManageStoreDialog from "./ManageStoreDialog";

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
  handleStoresSearch: (term: string, status: string) => void;
}

const StoreManagementTab: React.FC<StoreManagementTabProps> = ({
  storeData,
  searchTerm,
  storeStatusFilter,
  storeStatusOptions,
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
            <CardFooter className="p-4 pt-0 flex justify-between">
              <span className="text-xs text-muted-foreground">
                رقم مالك المتجر: {store.user.id}
              </span>
              <div className="flex gap-2">
                <ManageStoreDialog store={store} />
                <Button asChild size="sm">
                  <Link href={`/stores/${store.id}`}>عرض</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoreManagementTab;
