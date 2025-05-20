import styles from './hero.module.css';
import Tab from './ui/tab';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Hero() {
    return (
        <section className={styles.map}>
            <div className={styles.hero}>
                <h1 className="text-7xl font-bold text-gray-800">
                    مسارك الصحيح للمنتجات والخدمات المحلية المرغوبة
                </h1>

                <p className="text-lg text-gray-600">موقع  مسار  يساعدك  على  إيجاد  الأماكن  التجارية  ونقاط الخدمات  المحلية  بسهولة  بعد  التواصل  مع  اصحابها  </p>
                <div className="flex">
                    <Tab link='/market' white>
                        ابدأ التسوق
                        <LocalMallIcon />
                    </Tab>
                    <Tab link='/map' blue>
                        تصفح الخريطة
                        <LocationOnIcon />
                    </Tab>
                </div>
            </div>
        </section>
    )
}