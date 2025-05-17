import styles from './hero.module.css';
import Tab from './ui/tab';

export default function Hero() {
    return (
        <section className={styles.map}>
            <div className={styles.hero}>
                <h1 className="text-4xl font-bold text-gray-800">مسارك الصحيح
                    للمنتجات والخدمات المحلية المرغوبة
                </h1>
               
             <p className="text-lg text-gray-600">موقع  مسار  يساعدك  على  إيجاد  الأماكن  التجارية  ونقاط الخدمات  المحلية  بسهولة  بعد  التواصل  مع  اصحابها  </p>
                <Tab link='/' blue>ابدأ التسوق</Tab>
            </div>
        </section>
    )
}