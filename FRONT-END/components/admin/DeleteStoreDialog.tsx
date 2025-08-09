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
import { CustomAlert } from "../customAlert";

interface StoreUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}
interface StoreData {
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
  user: StoreUser;
}
interface DeleteStoreDialogProps {
  store: StoreData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStoreDeleted: (id: number) => void;
}

const DeleteStoreDialog: React.FC<DeleteStoreDialogProps> = ({
  store,
  open,
  onOpenChange,
  onStoreDeleted,
}) => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const handelStoreDelete = async (id: number) => {
    setDeleteLoading(true);
    setSuccess(false);
    setFailure(false);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/api/admin/stores/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting store:", errorData);
        setFailure(true);
      } else {
        setSuccess(true);
        // Notify parent component to update the store list
        onStoreDeleted(id);
      }
    } catch (error) {
      console.error("Error deleting store:", error);
      setFailure(true);
    } finally {
      setDeleteLoading(false);
      onOpenChange(false);
    }
  };

  return (
    <>
      <CustomAlert
        message={"تم حذف المتجر بنجاح"}
        show={success}
        onClose={() => setSuccess(false)}
        success
      />
      <CustomAlert
        message={"حدث خطأ اثناء حذف المتجر"}
        show={failure}
        onClose={() => setFailure(false)}
        success={false}
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm">
            حذف
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>حذف المتجر</DialogTitle>
            <DialogDescription>
              هل تود حذف المتجر "{store.store_name}"؟ لا يمكنك التراجع عن هذه
              الخطوة
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"} disabled={deleteLoading}>
                الغاء
              </Button>
            </DialogClose>
            <Button
              onClick={() => handelStoreDelete(store.id)}
              variant={"destructive"}
              disabled={deleteLoading}
            >
              {deleteLoading ? "جاري الحذف..." : "حذف"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteStoreDialog;