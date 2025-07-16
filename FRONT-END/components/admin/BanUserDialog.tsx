import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface BanUserDialogProps {
  user: userData;
  onBan: (
    id: number,
    reason: string,
    durationValue: number,
    durationUnit: string
  ) => Promise<void>;
  open: boolean; // Add this prop
  onOpenChange: (open: boolean) => void; // Add this prop
}

const BanUserDialog: React.FC<BanUserDialogProps> = ({
  user,
  onBan,
  open,
  onOpenChange,
}) => {
  const [banReason, setBanReason] = useState("");
  const [banDuration, setBanDuration] = useState<number | undefined>(undefined);
  const [banDurationType, setBanDurationType] = useState<string>("");

  const handleBanSubmit = () => {
    if (banDuration && banDurationType) {
      onBan(user.id, banReason, banDuration, banDurationType);
      onOpenChange(false); // Call onOpenChange to close the dialog
    } else {
      alert("Please specify the ban duration and type.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form onSubmit={(e) => e.preventDefault()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              حظر المستخدم {user.first_name} {user.last_name}
            </DialogTitle>
            <DialogDescription>
              رجاء قم بتحديد مدة وسبب حظر المستخدم
            </DialogDescription>
          </DialogHeader>
          <label htmlFor="reason">سبب الحظر</label>
          <Textarea
            placeholder="اكتب السبب هنا"
            id="reason"
            value={banReason}
            onChange={(e) => setBanReason(e.target.value)}
          ></Textarea>
          <label htmlFor="duration">مدة الحظر</label>
          <Input
            type="number"
            id="duration"
            value={banDuration}
            onChange={(e) =>
              setBanDuration(parseInt(e.target.value) || undefined)
            }
          />
          <Select onValueChange={setBanDurationType}>
            <SelectTrigger>
              <SelectValue placeholder="نوع مدة الحظر" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minutes">دقائق</SelectItem>
              <SelectItem value="hours">ساعات</SelectItem>
              <SelectItem value="days">ايام</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">الغاء</Button>
            </DialogClose>
            <Button onClick={handleBanSubmit} type="button">
              حظر المستخدم
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default BanUserDialog;