import ProductCard from "./ui/ProductCard";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";

export default function MarketSection() {
    const products = [  // replaceing it later with backend api
        {
            id: 1,
            title: "اسم المتجر",
            discription: "الوصف",
            rating: 4.5,
            image: "/images/logo.png",
        },
        {
            id: 2,
            title: "اسم المتجر",
            discription: "الوصف",
            rating: 4.5,
            image: "/images/logo.png",
        },
        {
            id: 3,
            title: "اسم المتجر",
            discription: "الوصف",
            rating: 4.5,
            image: "/images/logo.png",
        },
    ];
    return (
        <section className="container">
            <SectionTag content="اشهر المتاجر"/>
            <SectionTitle title="اكتشف أفضل البائعين تقييماً" discription="استكشف المتاجر الأكثر شهرةً وأعلى تقييمًا في منطقتك."/>
            <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
            </div>
        </section>
    )
}