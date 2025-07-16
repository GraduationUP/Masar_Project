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
interface ManageStoreDialogProps {
  store: StoreData;
}

const ManageStoreDialog: React.FC<ManageStoreDialogProps> = ({ store }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [banLoading, setBanLoading] = useState(false);
  const [unbanLoading, setUnbanLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false); // New loading state for status
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const handelStoreDelete = async (id: number) => {
    setDeleteLoading(true);
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
        alert("Failed to delete store.");
        return;
      }
      alert("Store deleted successfully!");
    } catch (error) {
      console.error("Error deleting store:", error);
      alert("An unexpected error occurred while deleting the store.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handelStoreBan = async (id: number) => {
    setBanLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${API_BASE_URL}/api/admin/stores/${id}/ban`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error banning store:", errorData);
        alert("Failed to ban store.");
        return;
      }
      alert("Store banned successfully!");
    } catch (error) {
      console.error("Error banning store:", error);
      alert("An unexpected error occurred while trying to ban the store.");
    } finally {
      setBanLoading(false);
    }
  };

  const handelStoreUnban = async (id: number) => {
    setUnbanLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${API_BASE_URL}/api/admin/stores/${id}/unban`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error unbanning store:", errorData);
        alert("Failed to unban store.");
        return;
      }
      alert("Store unbanned successfully!");
    } catch (error) {
      console.error("Error unbanning store:", error);
      alert("An unexpected error occurred while trying to unban the store.");
    } finally {
      setUnbanLoading(false);
    }
  };

  const handelStoreUpdateStatus = async (id: number, isActive: boolean) => {
    setStatusLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${API_BASE_URL}/api/admin/stores/${id}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            active: isActive ? 1 : 0, // Assuming your backend uses 1 for active and 0 for inactive
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating store status:", errorData);
        alert(`Failed to ${isActive ? "activate" : "deactivate"} store.`);
        return;
      }
      alert(`Store ${isActive ? "activated" : "deactivated"} successfully!`);
    } catch (error) {
      console.error("Error updating store status:", error);
      alert(
        `An unexpected error occurred while trying to ${
          isActive ? "activate" : "deactivate"
        } the store.`
      );
    } finally {
      setStatusLoading(false);
    }
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
          type="button"
          variant={"destructive"}
          className="block"
          disabled={
            deleteLoading || banLoading || unbanLoading || statusLoading
          }
        >
          {deleteLoading ? "جاري الحذف..." : "حذف"}
        </Button>
        <Button
          onClick={() =>
            store.is_banned
              ? handelStoreUnban(store.id)
              : handelStoreBan(store.id)
          }
          type="button"
          variant={"outline"}
          disabled={
            deleteLoading || banLoading || unbanLoading || statusLoading
          }
        >
          {banLoading || unbanLoading
            ? store.is_banned
              ? "جاري الغاء الحظر..."
              : "جاري الحظر..."
            : store.is_banned
            ? "الغاء الحظر"
            : "حظر"}
        </Button>
        <div className="flex items-center gap-1">
          <Button
            onClick={() => handelStoreUpdateStatus(store.id, !store.active)} // Toggle active status
            type="button"
            variant={"outline"}
            disabled={
              deleteLoading || banLoading || unbanLoading || statusLoading
            }
          >
            {statusLoading ? "جاري تغيير الحالة..." : "تغيير الحالة"}
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
            <Button
              variant={"secondary"}
              disabled={
                deleteLoading || banLoading || unbanLoading || statusLoading
              }
            >
              الغاء
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageStoreDialog;
