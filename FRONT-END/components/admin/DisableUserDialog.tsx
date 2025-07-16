import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Roles {
  id: number;
  name: string;
}

interface Admin {
  id: number;
  username: string;
}

interface Ban {
  id: number;
  target_id: number;
  reason: string;
  banned_by: number;
  created_at: string;
  updated_at: string;
  admin: Admin | null;
}

interface userData {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  roles: Roles[];
  ban: Ban | null;
}

interface DisableUserDialogProps {
  user: userData;
  onBlock: (id: number) => Promise<void>;
  open: boolean; // Add this prop
  onOpenChange: (open: boolean) => void; // Add this prop
}

const DisableUserDialog: React.FC<DisableUserDialogProps> = ({
  user,
  onBlock,
  open,
  onOpenChange,
}) => {
  const handleDisable = async () => {
    await onBlock(user.id);
    onOpenChange(false); // Call onOpenChange to close the dialog
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            تعطيل حساب المستخدم {user.first_name} {user.last_name}
          </DialogTitle>
          <DialogDescription>
            يرجى الانتباه، تعطيل حساب المستخدم يعني حذفه بالكامل هل تريد
            الاستمرار بهذا الاجراء؟
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">الغاء</Button>
          </DialogClose>
          <Button onClick={handleDisable} type="button">
            تعطيل الحساب
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DisableUserDialog;