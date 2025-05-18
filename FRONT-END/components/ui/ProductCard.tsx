import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
    id: number,
    title: string,
    discription: string,
    rating: number,
    image: string,
}
export default function ProductCard({title, discription, rating, image, id}: ProductCardProps) {
    return(
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg border border-gray-200 w-[370px]">
            <Image src={image} alt="Product" className="w-full" width={50} height={50} />
            <h3 className="text-lg font-semibold mt-2">{title}</h3>
            <p className="text-gray-600">{discription}</p>
            <span>{rating}</span>
            <Link href={"/product/"+id} className="mt-2 text-blue-500 hover:underline">View Details</Link>
        </div>
    )
}