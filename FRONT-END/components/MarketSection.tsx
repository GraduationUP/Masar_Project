import ProductCard from "./ui/ProductCard";

export default function MarketSection() {
    const products = [  // replaceing it later with backend api
        {
            id: 1,
            title: "Product Name",
            discription: "Product Description",
            rating: 4.5,
            image: "/images/logo.png",
        },
        {
            id: 2,
            title: "Product Name",
            discription: "Product Description",
            rating: 4.5,
            image: "/images/logo.png",
        },
        {
            id: 3,
            title: "Product Name",
            discription: "Product Description",
            rating: 4.5,
            image: "/images/logo.png",
        },
    ];
    return (
        <section className="grid grid-cols-3 gap-4 container">
            {products.map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </section>
    )
}