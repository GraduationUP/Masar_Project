"use client";

import ReportSection from "@/components/admin/ReportSection";
import Header from "@/components/main_layout/header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function reportsPage() {
  return (
    <>
      <Header />
      <Button onClick={() => window.history.back()} className="rounded-full">
        <ArrowRight />
      </Button>
      <ReportSection title="معلقة">
        <Image
          src={"/admin/pending_report.svg"}
          alt="pending report"
          width={200}
          height={200}
          className={"m-auto"}
        />
      </ReportSection>
      <ReportSection title="جار العمل عليها">
        <Image
          src={"/admin/in_progress_report.svg"}
          alt="in progress report"
          width={200}
          height={200}
          className={"m-auto"}
        />
      </ReportSection>
      <ReportSection title="تم حلها">
        <Image
          src={"/admin/done_report.svg"}
          alt="done report"
          width={200}
          height={200}
          className={"m-auto"}
        />
      </ReportSection>
    </>
  );
}
