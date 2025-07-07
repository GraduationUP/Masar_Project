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

interface SendAllUsersNotificationDialogProps {}

const SendAllUsersNotificationDialog: React.FC<
  SendAllUsersNotificationDialogProps
> = () => {
  const handelAllUsersNotify = () => {
    // Placeholder for sending notification to all users
    console.log("Sending notification to all users");
    // You'll likely want to trigger a state update or call an API here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">ارسال اشعارات لكافة المستخدمين</Button>
      </DialogTrigger>
      <form>
        <DialogContent>
          <DialogTitle>ارسال اشعارات لكافة المستخدمين</DialogTitle>
          <DialogDescription>
            تنويه، جميع المستخدمين على المنصة سوف يتلقون هذه الرسالة هل أنت
            متأكد من إرسال الإشعار ؟
            <Textarea />
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">الغاء</Button>
            </DialogClose>
            <Button onClick={handelAllUsersNotify} type="submit">
              ارسل
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default SendAllUsersNotificationDialog;
