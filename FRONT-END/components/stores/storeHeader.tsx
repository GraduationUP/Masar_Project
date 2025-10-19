import { Star } from "lucide-react";
import Image from "next/image";

export default function StoreHeader({data} : any) {
  return (
    <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-md">
      <Image
        src={"/Banner.svg"}
        alt={data?.name || ""}
        className="object-cover"
        fill
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-end">
        <div className="p-6 flex items-center gap-4">
          <div className="bg-background rounded-full p-1 shadow-lg">
            <Image
              src={data?.store_image || "/placeholder-store.png"}
              alt={`${data?.name} logo`}
              className="h-20 w-20 rounded-full border-2 border-background"
              height={80}
              width={80}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{data?.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                {[...Array(5).keys()].map((i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(data?.average_rating as number)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted-foreground text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {data?.location_address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
