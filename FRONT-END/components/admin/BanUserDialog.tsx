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
  onBan: (id: number) => Promise<void>;
}

const BanUserDialog: React.FC<BanUserDialogProps> = ({ user, onBan }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          حظر
        </Button>
      </DialogTrigger>
      <form>
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
          <Textarea placeholder="اكتب السبب هنا" id="reason"></Textarea>
          <label htmlFor="duration">مدة الحظر</label>
          <Input type="number" id="duration" />
          <Select>
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
            <Button onClick={() => onBan(user.id)} type="submit">
              حظر المستخدم
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default BanUserDialog;
