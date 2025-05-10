import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.page}>
        HELLO WORLD
        <Link href="/sgin-up">Sgin Up</Link>
        <Link href="/map">Map</Link>
      </div>
    </>
  );
}
