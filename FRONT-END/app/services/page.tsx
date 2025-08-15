import Header from "@/components/main_layout/header";
import PageBanner from "@/components/main_layout/PageBanner";
import CommonQuestionsSection from "@/components/services/CommonQuestionsSection";
import OurServicesSection from "@/components/services/OurServicesSection";
import TalkToUsSection from "@/components/services/TalkToUsSection";

export default function Services() {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-20">
        <PageBanner>اكتشف الخدمات واستمتع بلحظات استرخاء!</PageBanner>
        <OurServicesSection />
        <CommonQuestionsSection />
        <TalkToUsSection />
      </div>
    </>
  );
}
