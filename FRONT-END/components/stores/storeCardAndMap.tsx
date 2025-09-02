"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, MapPinOff } from "lucide-react";
import dynamic from "next/dynamic";
// Remove useState import, as the state is now in the parent.

const MapWithNoSSR = dynamic(() => import("@/components/maps/mapWithNoSSR"), {
  ssr: false,
  loading: () => null,
});

interface StoreCardProps {
  id: number;
  store_name: string;
  phone: string;
  location_address: string;
  status: string;
  latitude: string;
  longitude: string;
  store_image: string;
  expandedStoreId: number | null;
  toggleMap: (storeId: number) => void;
}

export default function StoreCard_Map({
  id,
  store_name,
  store_image,
  location_address,
  phone,
  status,
  latitude,
  longitude,
  expandedStoreId,
  toggleMap,
}: StoreCardProps) {
  return (
    <Card key={id} className="overflow-hidden h-full flex flex-col">
      <Link href={`/stores/${id}`} className="w-full">
        <CardHeader className="flex-grow">
          <CardTitle className="text-lg">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={store_image} alt={store_name} className="h-12 w-12" />
                <AvatarFallback>
                  <Image
                    src={"/placeholder-store.png"}
                    alt={store_name}
                    height={50}
                    width={50}
                    className="rounded-full"
                  />
                </AvatarFallback>
              </Avatar>
              {store_name}
            </div>
          </CardTitle>
          <CardDescription>{location_address}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            <strong>الهاتف:</strong> {phone}
          </p>
          <Badge
            className="mt-2"
            variant={status === "active" ? "default" : "secondary"}
          >
            {status === "active" ? "مفتوح" : "مغلق"}
          </Badge>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col items-start pt-4 border-t">
        {latitude !== null ? (
          <Button
            variant="outline"
            className="w-full flex justify-center items-center gap-2"
            // Use the toggleMap prop
            onClick={() => toggleMap(id)}
          >
            {/* Check the prop instead of local state */}
            {expandedStoreId === id ? (
              <>
                إخفاء الخريطة <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                عرض على الخريطة
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        ) : (
          <MapPinOff className="h-4 w-4 text-muted-foreground" />
        )}
        {/* Check the prop instead of local state */}
        {expandedStoreId === id && latitude && longitude && (
          <div className="w-full h-64 mt-4 rounded-md overflow-hidden z-0">
            <MapWithNoSSR
              center={[parseFloat(latitude), parseFloat(longitude)]}
              zoom={15}
              markers={[
                {
                  position: [parseFloat(latitude), parseFloat(longitude)],
                  title: store_name,
                  type: "store",
                },
              ]}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}