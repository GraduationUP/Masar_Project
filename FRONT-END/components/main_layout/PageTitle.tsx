"use client";

import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

export default function PageTitle({
  MainTitle,
  Subtitle,
  Arrow,
}: {
  MainTitle: string;
  Subtitle?: string;
  Arrow?: boolean;
}) {
  return (
    <div className="flex">
      {Arrow && (
        <Button
          variant={"ghost"}
          onClick={() => window.history.back()}
          className="rounded-full"
        >
          <ChevronRight />
        </Button>
      )}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{MainTitle}</h1>
        {Subtitle && <p className="text-muted-foreground">{Subtitle}</p>}
      </div>
    </div>
  );
}
