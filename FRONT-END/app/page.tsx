import Hero from "@/components/hero";
import styles from "./page.module.css";
import HowToUse from "@/components/howToUse";
import MarketSection from "@/components/MarketSection";
import FindService from "@/components/FindService";
import CTA from "@/components/CTA";
import ServiceCategories from "@/components/ServiceCategories";
// import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.page}>
        <Hero />
        <ServiceCategories />
        <FindService />
        <MarketSection />
        <HowToUse />
        <CTA />
      </div>
    </>
  );
}
