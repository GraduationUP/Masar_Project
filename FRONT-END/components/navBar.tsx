'use client'

import Link from "next/link"
import styles from "./navBar.module.css"
import SearchBar from "./ui/searchBar"
import Image from "next/image"

export default function NavBar() {
    return(
        <nav className={styles.nav}>
            <Link href='/' className="logo">
                <Image src="/images/logo.png" alt="logo" width={50} height={50}/>
            </Link>
            <ul className={styles.ul}>
                <li><Link href='/'>الرئيسية</Link></li>
                <li><Link href='/map'>الخريطة</Link></li>
                <li><Link href='/market'>السوق</Link></li>
            </ul>
            <SearchBar />
            <ul className={styles.ul}>
                <li><Link href='/login'>تسجيل الدخول</Link></li>
                <li><Link href='/sgin-up'>انشاء حساب</Link></li>
            </ul>
        </nav>
    )
}