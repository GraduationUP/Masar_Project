import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BanUserDialog from "./BanUserDialog";
import DisableUserDialog from "./DisableUserDialog";
import SendUserNotificationDialog from "./SendUserNotificationCard";
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

interface UserCardProps {
  user: userData;
  onBan: (
    id: number,
    reason: string,
    duration: number,
    durationType: string
  ) => Promise<void>;
  onUnBan: (id: number) => Promise<void>;
  onBlock: (id: number) => Promise<void>;
  onNotify: (
    type: string,
    message: string,
    target: string,
    target_id: number
  ) => Promise<void>;
  // Props to control Ban Dialog
  openBanDialog: (user: userData) => void;
  isBanDialogOpen: boolean;
  closeBanDialog: () => void;
  // Props to control Disable Dialog
  openDisableDialog: (user: userData) => void;
  isDisableDialogOpen: boolean;
  closeDisableDialog: () => void;
  // Props to control Send Notification Dialog
  openSendNotificationDialog: (user: userData) => void;
  isSendNotificationDialogOpen: boolean;
  closeSendNotificationDialog: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onBan,
  onUnBan,
  onBlock,
  onNotify,
  openBanDialog,
  isBanDialogOpen,
  closeBanDialog,
  openDisableDialog,
  isDisableDialogOpen,
  closeDisableDialog,
  openSendNotificationDialog,
  isSendNotificationDialogOpen,
  closeSendNotificationDialog,
}) => {
  return (
    <Card className="w-full flex flex-col md:flex-row md:justify-between md:items-center md:space-x-2 mb-2 md:mb-0 items-start">
      <CardHeader>
        <CardTitle>
          <div>
            {user.first_name} {user.last_name}
          </div>
          <span className="text-sm text-muted-foreground">{user.username}</span>
          {user.roles[0]?.name === "seller" && <Badge>بائع</Badge>}
          {user.ban !== null && <Badge variant="destructive">محظور</Badge>}
        </CardTitle>
      </CardHeader>
      {/* ... other CardContent */}
      <CardFooter className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={() => onUnBan(user.id)}>
          الغاء الحظر
        </Button>
        <Button variant="outline" size="sm" onClick={() => openBanDialog(user)}>
          حظر
        </Button>
        {isBanDialogOpen && (
          <BanUserDialog
            user={user}
            onBan={onBan}
            open={isBanDialogOpen}
            onOpenChange={closeBanDialog}
          />
        )}
        <Button
          variant="destructive"
          size="sm"
          onClick={() => openDisableDialog(user)}
        >
          تعطيل الحساب
        </Button>
        {isDisableDialogOpen && (
          <DisableUserDialog
            user={user}
            onBlock={onBlock}
            open={isDisableDialogOpen}
            onOpenChange={closeDisableDialog}
          />
        )}
        <Button size="sm" onClick={() => openSendNotificationDialog(user)}>
          إرسال إشعار
        </Button>
        {isSendNotificationDialogOpen && (
          <SendUserNotificationDialog
            user={user}
            onNotify={onNotify}
            open={isSendNotificationDialogOpen}
            onOpenChange={closeSendNotificationDialog}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default UserCard;
