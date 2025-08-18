import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

interface ManageProductDialogProps {
  product: productData;
  onProductDeleted: (id: number) => void;
}

const ManageProductDialog: React.FC<ManageProductDialogProps> = ({
  product,
  onProductDeleted,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, onOpenChange] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const handelProductDelete = async (id: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting product:", errorData);
        return;
      } else {
        onProductDeleted(id);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          ادارة المنتج
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ادارة المنتج</DialogTitle>
          <DialogDescription>
            ادارة المنتج "{product.name}" التابع للمتجر "
            {product.store?.store_name}"
          </DialogDescription>
        </DialogHeader>
        <Button
          onClick={() => handelProductDelete(product.id)}
          type="button"
          variant={"destructive"}
          disabled={loading}
        >
          {loading ? "جاري الحذف..." : "حذف المنتج"}
        </Button>
        <Link
          href={`/products/${product.id}`}
          className="py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          عرض
        </Link>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} disabled={loading}>
              الغاء
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageProductDialog;
