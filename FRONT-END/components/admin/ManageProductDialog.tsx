import React from "react";
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
}

const ManageProductDialog: React.FC<ManageProductDialogProps> = ({
  product,
}) => {
  const handelProductDelete = (id: number) => {
    console.log(`Deleting product with ID: ${id}`);
    // Your delete logic here
  };

  return (
    <Dialog>
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
          type="submit"
          variant={"destructive"}
        >
          حذف المنتج
        </Button>
        <Link
          href={`/products/${product.id}`}
          className="py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          عرض
        </Link>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>الغاء</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageProductDialog;
