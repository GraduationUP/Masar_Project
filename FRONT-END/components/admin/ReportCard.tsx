import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
};

export function ReportCard({ report }: ReportCardProps) {
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
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Report ID: {report.id}</CardTitle>
        <CardDescription>
          Status: <span className="font-semibold">{report.status}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Reporter</p>
            <p className="text-sm text-muted-foreground">
              {reporterName} (@{report.user.username})
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Reported User</p>
            <p className="text-sm text-muted-foreground">
              {reportedName} (@{report.reported_user.username})
            </p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Message</p>
          <p className="text-sm text-muted-foreground">{report.message}</p>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Filed on: {formattedDate}
        </p>
      </CardFooter>
    </Card>
  );
}
