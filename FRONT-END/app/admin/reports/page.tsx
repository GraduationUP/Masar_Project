"use client";

import ReportSection from "@/components/admin/ReportSection";
import Header from "@/components/main_layout/header";
import { Button } from "@/components/ui/button";
import { Loader} from "lucide-react";
import Image from "next/image";
import { ReportCard } from "@/components/admin/ReportCard";
import { useEffect, useState } from "react";
import { Check, Hourglass, Clock, Trash } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import PageTitle from "@/components/main_layout/PageTitle";
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
  const [sending, setSending] = useState(false);
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Function to fetch reports from the API
  const fetchReports = async () => {
    setLoading(true);
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
        throw new Error("Failed to fetch reports");
      }

      const responseData = await response.json();
      setReports(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  async function HandelUpdateReportStatus({
    report,
    status,
  }: {
    report: Report;
    status: string;
  }) {
    setSending(true);
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${BASE_API_URL}/api/reports/${report.id}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update report status");
      }
      // Re-fetch reports to update the UI
      fetchReports();
    } catch (error) {
      console.error("Error updating report status:", error);
    } finally {
      setSending(false);
    }
  }

  async function HandelDeleteReportStatus({ report }: { report: Report }) {
    setSending(true);
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${BASE_API_URL}/api/reports/${report.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete report");
      }
      // Re-fetch reports to update the UI
      fetchReports();
    } catch (error) {
      console.error("Error deleting report:", error);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Header />
      {loading && (
        <Alert className="fixed bottom-4 right-4 max-w-sm">
          <Loader className="animate-spin" />
          <AlertTitle>جار التحميل</AlertTitle>
        </Alert>
      )}
      <div className="container">
        <PageTitle
          MainTitle="ادارة البلاغات"
          Subtitle="ادارة بلاغات منصة مسار"
        />
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
                  <Button
                    variant={"ghost"}
                    onClick={() => HandelDeleteReportStatus({ report })}
                    disabled={sending}
                  >
                    <Trash className="text-red-400" />
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      HandelUpdateReportStatus({
                        report,
                        status: "in_progress",
                      })
                    }
                    disabled={sending}
                  >
                    <Hourglass />
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      HandelUpdateReportStatus({ report, status: "resolved" })
                    }
                    disabled={sending}
                  >
                    <Check />
                  </Button>
                </ReportCard>
              ))
          )}
        </ReportSection>
        <ReportSection title="جار العمل عليها">
          {reports.filter((report) => report.status === "in_progress")
            .length === 0 ? (
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
                  <Button
                    variant={"ghost"}
                    onClick={() => HandelDeleteReportStatus({ report })}
                    disabled={sending}
                  >
                    <Trash className="text-red-400" />
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      HandelUpdateReportStatus({ report, status: "pending" })
                    }
                    disabled={sending}
                  >
                    <Clock />
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      HandelUpdateReportStatus({ report, status: "resolved" })
                    }
                    disabled={sending}
                  >
                    <Check />
                  </Button>
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
                  <Button
                    variant={"ghost"}
                    onClick={() => HandelDeleteReportStatus({ report })}
                    disabled={sending}
                  >
                    <Trash className="text-red-400" />
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      HandelUpdateReportStatus({ report, status: "pending" })
                    }
                    disabled={sending}
                  >
                    <Clock />
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      HandelUpdateReportStatus({
                        report,
                        status: "in_progress",
                      })
                    }
                    disabled={sending}
                  >
                    <Hourglass />
                  </Button>
                </ReportCard>
              ))
          )}
        </ReportSection>
      </div>
    </>
  );
}
