import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function PageTitle({
  MainTitle,
  Subtitle,
}: {
  MainTitle: string;
  Subtitle?: string;
}) {
  return (
    <div className="flex">
      <Button
        variant={"ghost"}
        onClick={() => window.history.back()}
        className="rounded-full"
      >
        <ArrowRight />
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{MainTitle}</h1>
        {Subtitle && <p className="text-muted-foreground">{Subtitle}</p>}
      </div>
    </div>
  );
}

