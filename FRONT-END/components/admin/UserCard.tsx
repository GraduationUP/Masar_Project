import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import BanUserDialog from "./BanUserDialog";
import DisableUserDialog from "./DisableUserDialog";
import SendUserNotificationDialog from "./SendUserNotificationCard";

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
  onBan: (id: number) => Promise<void>;
  onBlock: (id: number) => Promise<void>;
  onNotify: (id: number) => Promise<void>;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onBan,
  onBlock,
  onNotify,
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
      <CardContent>
        <div>
          <p className="text-sm font-semibold">البريد الإلكتروني:</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">تاريخ الإنشاء:</p>
          <p className="text-xs text-muted-foreground">
            {new Date(user.created_at).toLocaleString()}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <BanUserDialog user={user} onBan={onBan} />
        <DisableUserDialog user={user} onBlock={onBlock} />
        <SendUserNotificationDialog user={user} onNotify={onNotify} />
      </CardFooter>
    </Card>
  );
};

export default UserCard;
