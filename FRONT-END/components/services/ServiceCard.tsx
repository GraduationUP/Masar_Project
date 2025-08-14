import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  name: string;
  icon: LucideIcon;
  children?: React.ReactNode;
}

export default function ServiceCard({ name, icon: Icon, children }: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded-xl border bg-background hover:bg-[url('/BannerCard.svg')] hover:bg-no-repeat hover:bg-center hover:bg-cover transition-all duration-300 hover:shadow-md group">
      <div className="p-4 rounded-full bg-[#F5F6FF] text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-sm font-medium text-center group-hover:text-white">
        {name}
      </span>
      <span className="text-muted-foreground text-center group-hover:text-white">{children}</span>
    </div>
  );
}