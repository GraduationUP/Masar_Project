import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CustomAlert } from "../customAlert";

interface SendAllUsersNotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SendAllUsersNotificationDialog: React.FC<
  SendAllUsersNotificationDialogProps
> = ({ open, onOpenChange }) => {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handelAllUsersNotify = async () => {
    setSubmitting(true);
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const response = await fetch(
          `${BASE_API_URL}/api/admin/notifications/send`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: type,
              message: message,
              target: "all",
            }),
          }
        );

        if (response.ok) {
          console.log("Notification sent to all users");
          setSuccess(true);
          onOpenChange(false);
        } else {
          setFailure(true);
          onOpenChange(false);
          const errorData = await response.json();
          console.error("Error sending notification to all users:", errorData);
        }
      } catch (error) {
        setFailure(true);
        onOpenChange(false);
        console.error("Error sending notification to all users:", error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <>
      <CustomAlert
        message={"تم الارسال بنجاح"}
        show={success}
        onClose={() => setSuccess(false)}
        success
      />
      <CustomAlert
        message={"حدث خطأ ما"}
        show={failure}
        onClose={() => setFailure(false)}
        success={false}
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button className="w-fit">ارسال اشعارات لكافة المستخدمين</Button>
        </DialogTrigger>
        <form onSubmit={(e) => e.preventDefault()}>
          <DialogContent>
            <DialogTitle>ارسال اشعارات لكافة المستخدمين</DialogTitle>
            <DialogDescription>
              تنويه، جميع المستخدمين على المنصة سوف يتلقون هذه الرسالة هل أنت
              متأكد من إرسال الإشعار ؟
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
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">الغاء</Button>
              </DialogClose>
              <Button onClick={handelAllUsersNotify} type="submit">
                {submitting ? "ارسال" : "ارسال"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default SendAllUsersNotificationDialog;
