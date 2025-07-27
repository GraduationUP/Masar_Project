"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";

interface Store {
  id: number;
  user_id: number;
  store_name: string;
  phone: string;
  location_address: string;
  status: 1;
  created_at: string;
  updated_at: string;
  latitude: number;
  longitude: number;
  store_image: string;
}

const storesData = [
  {
    id: "1",
    name: "بنز اند بنز",
    description:
      "بنز اند بنز، مكانك الأول والأخير لشراء الهدايا والقرطاسية ومستلزمات الدراسة",
    categories: ["قرطاسية", "المتاجر الكبرى"],
    location: {
      address: "غزة، الرمال، اسفل كابيتال مول",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    rating: 4.5,
    coverImage: "/any.jpg",
    logo: "/any-logo.svg",
  },
  {
    id: "2",
    name: "بنز اند بنز",
    description:
      "بنز اند بنز، مكانك الأول والأخير لشراء الهدايا والقرطاسية ومستلزمات الدراسة",
    categories: ["قرطاسية", "المتاجر الكبرى"],
    location: {
      address: "غزة، الرمال، اسفل كابيتال مول",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    rating: 4.5,
    coverImage: "/any.jpg",
    logo: "/any-logo.svg",
  },
  {
    id: "3",
    name: "بنز اند بنز",
    description:
      "بنز اند بنز، مكانك الأول والأخير لشراء الهدايا والقرطاسية ومستلزمات الدراسة",
    categories: ["قرطاسية", "المتاجر الكبرى"],
    location: {
      address: "غزة، الرمال، اسفل كابيتال مول",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    rating: 4.5,
    coverImage: "/any.jpg",
    logo: "/any-logo.svg",
  },
];

export default function FeaturedStores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStores = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guest/stores`);
        if (!response.ok) {
          throw new Error(`Failed to fetch stores, status: ${response.status}`);
        }
        const data = await response.json();
        setStores(data.data || []);
      } catch (error) {
        console.error('Error fetching stores:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden h-full animate-pulse">
            <div className="h-48 bg-muted"></div>
            <CardContent className="p-4">
              <div className="h-6 w-2/3 bg-muted rounded mb-2"></div>
              <div className="h-4 w-full bg-muted rounded mb-4"></div>
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-muted rounded"></div>
                <div className="h-5 w-16 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 staggered-animation">
      {stores.map((store) => (
        <Link href={`/stores/${store.id}`} key={store.id} className="group">
          <Card className="overflow-hidden h-full card-hover border-border/50">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={"/storeBanner.svg"}
                alt={store.store_name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-full p-1 border border-border/50 shadow-md">
                <img
                  src={store.store_image || "/placeholder.svg"}
                  alt={`${store.store_name} logo`}
                  className="h-12 w-12 rounded-full"
                />
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold">{store.store_name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {store.location_address}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center border-t border-border/50 mt-2">
              <div className="flex items-center gap-1 text-sm">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                  {store.location_address}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">
                  {/* {store.rating?.toFixed(1)} TODO */}
                </span>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
