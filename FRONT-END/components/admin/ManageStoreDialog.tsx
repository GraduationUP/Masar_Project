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
interface ManageStoreDialogProps {
  store: storeData;
}

const ManageStoreDialog: React.FC<ManageStoreDialogProps> = ({ store }) => {
  const handelStoreDelete = (id: number) => {
    console.log(`Deleting store with ID: ${id}`);
    // Your delete logic here
  };

  const handelStoreBan = (id: number) => {
    console.log(`Banning store with ID: ${id}`);
    // Your ban logic here
  };

  const handelStoreStatus = (id: number) => {
    console.log(`Changing status of store with ID: ${id}`);
    // Your status change logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          ادارة المتجر
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ادارة المتجر</DialogTitle>
          <DialogDescription>
            ادارة المتجر صاحب الاسم "{store.store_name}"
          </DialogDescription>
        </DialogHeader>
        <Button
          onClick={() => handelStoreDelete(store.id)}
          type="submit"
          variant={"destructive"}
          className="block"
        >
          حذف
        </Button>
        <Button
          onClick={() => handelStoreBan(store.id)}
          type="submit"
          variant={"outline"}
        >
          حظر
        </Button>
        <div className="flex items-center gap-1">
          <Button
            onClick={() => handelStoreStatus(store.id)}
            type="submit"
            variant={"outline"}
          >
            تغيير الحالة
          </Button>
          {store.active === 1 && (
            <>
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>نشط</span>
            </>
          )}
          {store.active === 0 && (
            <>
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span>غير نشط</span>
            </>
          )}
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={"secondary"}>الغاء</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageStoreDialog;
