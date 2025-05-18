import Hero from "@/components/hero";
import styles from "./page.module.css";
import HowToUse from "@/components/howToUse";
import MarketSection from "@/components/MarketSection";
// import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.page}>
        <Hero />
        <HowToUse />
        <MarketSection />
      </div>
    </>
  );
}
