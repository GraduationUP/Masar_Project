import Link from "next/link"
import styles from "./navBar.module.css"

export default function NavBar() {
    return(
        <nav className={styles.nav}>
            <Link href='/' className="logo"></Link>
            <ul className={styles.ul}>
                <li><Link href='/'>الرئيسية</Link></li>
                <li><Link href='/map'>الخريطة</Link></li>
                <li><Link href='/market'>السوق</Link></li>
            </ul>
            <input type="text" placeholder="ابحث عن متجر، مكان او سلعة..."/>
            <ul className={styles.ul}>
                <li><Link href='/login'>تسجيل الدخول</Link></li>
                <li><Link href='/sgin-up'>انشاء حساب</Link></li>
            </ul>
        </nav>
    )
}