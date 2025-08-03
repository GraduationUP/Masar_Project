import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
};

type Report = {
  id: number;
  user_id: number;
  reported_user_id: number;
  message: string;
  status: "pending" | "resolved" | "in_progress";
  created_at: string;
  updated_at: string;
  user: User;
  reported_user: User;
};

type ReportCardProps = {
  report: Report;
  children: React.ReactNode;
};

export function ReportCard({ report, children }: ReportCardProps) {
  const reporterName = `${report.user.first_name} ${report.user.last_name}`;
  const reportedName = `${report.reported_user.first_name} ${report.reported_user.last_name}`;

  const formattedDate = new Date(report.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Card className="w-[350px] relative">
      <CardHeader>
        <div className="absolute left-2 top-2 flex gap-2">
            {children}
        </div>
        <CardTitle>البلاغ رقم: {report.id}</CardTitle>
        <CardDescription>
          الحالة: <span className="font-semibold">{report.status}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">صاحب البلاغ</p>
            <p className="text-sm text-muted-foreground">
              {reporterName} (@{report.user.username})
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">المبلغ عنه</p>
            <p className="text-sm text-muted-foreground">
              {reportedName} (@{report.reported_user.username})
            </p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">رسالة البلاغ</p>
          <p className="text-sm text-muted-foreground">{report.message}</p>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          تم الرسال في: {formattedDate}
        </p>
      </CardFooter>
    </Card>
  );
}
