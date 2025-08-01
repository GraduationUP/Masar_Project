import ReportSection from "@/components/admin/ReportSection";
import Header from "@/components/main_layout/header";

export default function reportsPage() {
  return (
    <>
      <Header />
        <ReportSection title="معلقة">.</ReportSection>
        <ReportSection title="جار العمل عليها">.</ReportSection>
        <ReportSection title="تم حلها">.</ReportSection>
    </>
  );
}
