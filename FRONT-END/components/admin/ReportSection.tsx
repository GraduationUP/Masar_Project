import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Status = "معلقة" | "جار العمل عليها" | "تم حلها";

interface RportProps {
  title: Status;
  children: React.ReactNode;
}

export default function ReportSection({ title, children }: RportProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
