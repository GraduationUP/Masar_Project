import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Package, StoreIcon, Users } from "lucide-react";

interface AdminOverviewCardsProps {
  userCount: number;
  storeCount: number;
  productCount: number;
  servicesCount: number;
}

const AdminOverviewCards: React.FC<AdminOverviewCardsProps> = ({
  userCount,
  storeCount,
  productCount,
  servicesCount,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            مجموع المستخدمين
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userCount}</div>
          <p className="text-xs text-muted-foreground">المستخدمين المسجلين</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">مجموع المتاجر</CardTitle>
          <StoreIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{storeCount}</div>
          <p className="text-xs text-muted-foreground">
            المتاجر النشطة وغير النشطة
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">مجموع المنتجات</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{productCount}</div>
          <p className="text-xs text-muted-foreground">المنتجات المدرجة</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي الخدمات</CardTitle>
          <Map className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{servicesCount}</div>
          <p className="text-xs text-muted-foreground">
            الخدمات المتاحة على الخريطة
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverviewCards;
