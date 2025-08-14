import Header from "@/components/main_layout/header";
import PageBanner from "@/components/main_layout/PageBanner";
import CommonQuestionsSection from "@/components/services/CommonQuestionsSection";
import OurServicesSection from "@/components/services/OurServicesSection";

export default function Services() {
  return (
    <>
      <Header />
      <PageBanner>اكتشف الخدمات واستمتع بلحظات استرخاء!</PageBanner>
      <OurServicesSection />
      <CommonQuestionsSection />
    </>
  );
}
