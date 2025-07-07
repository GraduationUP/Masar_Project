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
}

const DisableUserDialog: React.FC<DisableUserDialogProps> = ({
  user,
  onBlock,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          تعطيل الحساب
        </Button>
      </DialogTrigger>
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
          <Button onClick={() => onBlock(user.id)} type="submit">
            تعطيل الحساب
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DisableUserDialog;
