"use client";

import ReportSection from "@/components/admin/ReportSection";
import Header from "@/components/main_layout/header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ReportCard } from "@/components/admin/ReportCard";
import { useEffect, useState } from "react";
import { Check, Hourglass, Clock } from "lucide-react";

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

export default function reportsPage() {
  const [reports, setReports] = useState<Array<Report>>([]);
  const [loading, setLoading] = useState(true);
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Set loading to true before the fetch

      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${BASE_API_URL}/api/reports`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          return;
        }

        const responseData = await response.json();
        setReports(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>جار التحميل ...</div>;
  }

  return (
    <>
      <Header />
      <div className="flex">
        <Button
          variant={"ghost"}
          onClick={() => window.history.back()}
          className="rounded-full"
        >
          <ArrowRight />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ادارة البلاغات</h1>
          <p className="text-muted-foreground">إدارة بلاغات منصة مسار</p>
        </div>
      </div>

      <ReportSection title="معلقة">
        {reports.filter((report) => report.status === "pending").length ===
        0 ? (
          <Image
            src={"/admin/pending_report.svg"}
            alt="pending report"
            width={200}
            height={200}
            className={"m-auto"}
          />
        ) : (
          reports
            .filter((report) => report.status === "pending")
            .map((report) => (
              <ReportCard key={report.id} report={report}>
                <Hourglass />
                <Check />
              </ReportCard>
            ))
        )}
      </ReportSection>
      <ReportSection title="جار العمل عليها">
        {reports.filter((report) => report.status === "in_progress").length ===
        0 ? (
          <Image
            src={"/admin/in_progress_report.svg"}
            alt="in_progress report"
            width={200}
            height={200}
            className={"m-auto"}
          />
        ) : (
          reports
            .filter((report) => report.status === "in_progress")
            .map((report) => (
              <ReportCard key={report.id} report={report}>
                <Clock />
                <Check />
              </ReportCard>
            ))
        )}
      </ReportSection>
      <ReportSection title="تم حلها">
        {reports.filter((report) => report.status === "resolved").length ===
        0 ? (
          <Image
            src={"/admin/done_report.svg"}
            alt="resolved report"
            width={200}
            height={200}
            className={"m-auto"}
          />
        ) : (
          reports
            .filter((report) => report.status === "resolved")
            .map((report) => (
              <ReportCard key={report.id} report={report}>
                <Clock />
                <Hourglass />
              </ReportCard>
            ))
        )}
      </ReportSection>
    </>
  );
}
