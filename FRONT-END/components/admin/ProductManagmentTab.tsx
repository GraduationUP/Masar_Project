"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import SearchBar from "@/components/ui/searchBar";
import ManageProductDialog from "./ManageProductDialog";
import Link from "next/link";
import { Plus, Store } from "lucide-react";
import { Button } from "../ui/button";

interface productData {
  id: number;
  store_id: number;
  name: string;
  description: string;
  photo: null;
  category_id: number;
  price: string;
  latitude: null;
  longitude: null;
  show_location: number;
  created_at: string;
  updated_at: string;
  store: {
    id: number;
    store_name: string;
  };
}

interface ProductManagementTabProps {
  productData: productData[];
  searchTerm: string;
  handleProductSearch: (term: string) => void;
  onProductDeleted: (id: number) => void;
}

const ProductManagementTab: React.FC<ProductManagementTabProps> = ({
  productData,
  searchTerm,
  handleProductSearch,
  onProductDeleted,
}) => {
  const filteredProducts = productData.filter((product) => {
    const productNameLower = product.name.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return productNameLower.includes(searchLower);
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold tracking-tight">إدارة المنتجات</h2>
        <Link href={"/admin/categories"}>
          <Button>
            {" "}
            <Plus />
            ادارة الفئات
          </Button>
        </Link>
      </div>
      <SearchBar placeholder="ابحث عن منتج" onSearch={handleProductSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>
                <Link
                  href={`/store/${product.store_id}`}
                  className="text-blue-500"
                >
                  <Store className="inline" />
                  {product.store?.store_name}
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground truncate">
                {product.description}
              </p>
              <p className="font-semibold mt-2">السعر: {product.price}</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <ManageProductDialog
                product={product}
                onProductDeleted={onProductDeleted}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductManagementTab;
