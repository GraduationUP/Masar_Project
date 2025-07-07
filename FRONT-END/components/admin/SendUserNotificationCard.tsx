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
interface SendUserNotificationDialogProps {
  user: userData;
  onNotify: (id: number) => Promise<void>;
}

const SendUserNotificationDialog: React.FC<SendUserNotificationDialogProps> = ({
  user,
  onNotify,
}) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button size="sm">إرسال إشعار</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              ارسال اشعار للمستخدم {user.first_name} {user.last_name}
            </DialogTitle>
            <DialogDescription>سيصل الاشعار اليه فقط</DialogDescription>
          </DialogHeader>
          <Textarea placeholder="اكتب الرسالة هنا" />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">الغاء</Button>
            </DialogClose>
            <Button onClick={() => onNotify(user.id)} type="submit">
              ارسال الاشعار
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default SendUserNotificationDialog;
