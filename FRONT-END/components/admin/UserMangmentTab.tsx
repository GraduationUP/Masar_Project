import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SearchBar from "@/components/ui/searchBar";
import { Users } from "lucide-react";
import SendAllUsersNotificationDialog from "./SendAllUsersNotificationDialog";
import UserCard from "./UserCard";

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
interface UserManagementTabProps {
  userData: userData[];
  searchTerm: string;
  userRoleFilter: string;
  userRoleOptions: { value: string; label: string }[];
  handleUsersSearch: (term: string, role: string) => void;
  handelUserBan: (
    id: number,
    reason: string,
    durationValue: number,
    durationUnit: string
  ) => Promise<void>;
  handelUserBlock: (id: number) => Promise<void>;
  handelUserNotify: (
    type: string,
    message: string,
    target: string,
    target_id: number
  ) => Promise<void>;
}

const UserManagementTab: React.FC<UserManagementTabProps> = ({
  userData,
  searchTerm,
  userRoleFilter,
  userRoleOptions,
  handleUsersSearch,
  handelUserBan,
  handelUserBlock,
  handelUserNotify,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
   const handleOpenChange = (newOpenState: boolean) => {
    setIsDialogOpen(newOpenState);
  };
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [selectedUserForBan, setSelectedUserForBan] = useState<userData | null>(
    null
  );

  const [isDisableDialogOpen, setIsDisableDialogOpen] = useState(false);
  const [selectedUserForDisable, setSelectedUserForDisable] =
    useState<userData | null>(null);

  const [isSendNotificationDialogOpen, setIsSendNotificationDialogOpen] =
    useState(false);
  const [selectedUserForNotification, setSelectedUserForNotification] =
    useState<userData | null>(null);

  const openBanDialog = (user: userData) => {
    setSelectedUserForBan(user);
    setIsBanDialogOpen(true);
  };

  const closeBanDialog = () => {
    setIsBanDialogOpen(false);
  };

  const openDisableDialog = (user: userData) => {
    setSelectedUserForDisable(user);
    setIsDisableDialogOpen(true);
  };

  const closeDisableDialog = () => {
    setIsDisableDialogOpen(false);
  };

  const openSendNotificationDialog = (user: userData) => {
    setSelectedUserForNotification(user);
    setIsSendNotificationDialogOpen(true);
  };

  const closeSendNotificationDialog = () => {
    setIsSendNotificationDialogOpen(false);
  };

  const filteredUsers = userData.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const username = user.username.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    const userRole = user.roles[0]?.name?.toLowerCase() || "";

    const nameOrUsernameMatch =
      fullName.includes(searchLower) || username.includes(searchLower);
    const roleMatch = userRoleFilter === "all" || userRole === userRoleFilter;

    return nameOrUsernameMatch && roleMatch;
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold tracking-tight">إدارة المستخدمين</h2>
      <Card>
        <CardHeader>
          <CardTitle>مستخدمو المنصة</CardTitle>
          <CardDescription>إدارة حسابات المستخدمين والأذونات</CardDescription>
          <SearchBar
            placeholder="ابحث عن مستخدم"
            onSearch={handleUsersSearch}
            roleFilterOptions={userRoleOptions}
          />
          <SendAllUsersNotificationDialog
            open={isDialogOpen}
            onOpenChange={handleOpenChange}
          />
        </CardHeader>
        <CardContent className="min-h-[20rem] flex items-center justify-center">
          {userData.length === 0 ? (
            <div className="flex flex-col items-center text-center">
              <Users className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">لوحة إدارة المستخدمين</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-md">
                عرض وإدارة جميع حسابات المستخدمين على المنصة. التحكم في
                الأذونات، والتحقق من البائعين، ومعالجة تقارير المستخدمين.
              </p>
            </div>
          ) : (
            <div className="w-full">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onBan={handelUserBan}
                  onBlock={handelUserBlock}
                  onNotify={handelUserNotify}
                  // Ban Dialog Props
                  openBanDialog={openBanDialog}
                  isBanDialogOpen={
                    selectedUserForBan?.id === user.id && isBanDialogOpen
                  }
                  closeBanDialog={closeBanDialog}
                  // Disable Dialog Props
                  openDisableDialog={openDisableDialog}
                  isDisableDialogOpen={
                    selectedUserForDisable?.id === user.id &&
                    isDisableDialogOpen
                  }
                  closeDisableDialog={closeDisableDialog}
                  // Send Notification Dialog Props
                  openSendNotificationDialog={openSendNotificationDialog}
                  isSendNotificationDialogOpen={
                    selectedUserForNotification?.id === user.id &&
                    isSendNotificationDialogOpen
                  }
                  closeSendNotificationDialog={closeSendNotificationDialog}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementTab;
