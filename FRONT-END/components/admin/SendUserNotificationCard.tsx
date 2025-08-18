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
  onNotify: (
    type: string,
    message: string,
    target: string,
    target_id: number
  ) => Promise<void>;
  open: boolean; // Add this prop
  onOpenChange: (open: boolean) => void; // Add this prop
}

const SendUserNotificationDialog: React.FC<SendUserNotificationDialogProps> = ({
  user,
  onNotify,
  open,
  onOpenChange,
}) => {
  const [message, setMessage] = useState(""); // Use useState from React
  const [type, setType] = useState("");   // Use useState from React

  const handleSendNotification = async () => {
    await onNotify(type, message, "user", user.id); // Target is "user"
    onOpenChange(false); // Call onOpenChange to close the dialog
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            ارسال اشعار للمستخدم {user.first_name} {user.last_name}
          </DialogTitle>
          <DialogDescription>سيصل الاشعار اليه فقط</DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">نوع الاشعار:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 w-full px-3 py-2 text-sm"
            >
              <option value="" disabled>
                اختر نوع الاشعار
              </option>
              <option value="report">ابلاغ</option>
              <option value="notification">إشعار</option>
              <option value="maintenance">صيانة</option>
              <option value="update">تحديث</option>
              <option value="account_approved">تأكيد الحساب</option>
              <option value="account_suspended">تعليق الحساب</option>
              <option value="promotion">ترويج</option>
              <option value="feedback_request">طلب ملاحظات</option>
              <option value="policy_update">تحديث سياسة</option>
              <option value="general_announcement">إعلان عام</option>
              <option value="security_alert">تنبيه أمني</option>
              <option value="rating">تقييم</option>
              <option value="comment">تعليق</option>
            </select>
          </div>
          <Textarea
            placeholder="اكتب الرسالة هنا"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <br />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">الغاء</Button>
            </DialogClose>
            <Button
              type="button" // Changed type to button to prevent form submission causing unexpected behavior
              onClick={handleSendNotification}
            >
              ارسال الاشعار
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SendUserNotificationDialog;