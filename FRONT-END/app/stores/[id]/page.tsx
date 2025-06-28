"use client";

// TODO : Handele redirect if there was no store

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Info,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShoppingBag,
  Star,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

interface StoreData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  products: {
    id: number;
    store_id: number;
    name: string;
    description: string | null;
    photo: string | null;
    category_id: number;
    price: string;
    latitude: number | null;
    longitude: number | null;
    show_location: number;
    created_at: string;
    updated_at: string;
  }[];
  reviews: {}[];
  comments: {}[];
}
// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-muted/30 animate-pulse flex items-center justify-center">
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
});

export default function StorePage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<StoreData | null>(null);
  const [categories, setCategories] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Set loading to true before the fetch

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/guest/stores/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/guest/categories`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        if (responseData && Array.isArray(responseData.data)) {
          setCategories(responseData.data);
        } else if (Array.isArray(responseData)) {
          setCategories(responseData);
        } else {
          console.error(
            "Unexpected API response for categories:",
            responseData
          );
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const storeCategories = data?.products?.reduce((acc, product) => {
    if (Array.isArray(categories)) {
      const category = categories.find((c) => c.id === product.category_id);
      if (category && !acc.some((c) => c.id === category.id)) {
        acc.push(category);
      }
    }
    return acc;
  }, [] as Array<{ id: number; name: string }>);

  if (loading) {
    return (
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8 animate-pulse">
          <div className="h-64 bg-muted rounded-lg"></div>
          <div className="h-8 w-1/3 bg-muted rounded-lg"></div>
          <div className="h-4 w-2/3 bg-muted rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="h-32 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        {/* Store Header */}
        <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-md">
          <img
            src={"/storeBanner.svg"}
            alt={data?.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-end">
            <div className="p-6 flex items-center gap-4">
              <div className="bg-background rounded-full p-1 shadow-lg">
                <img
                  src={"/placeholder-store.png"}
                  alt={`${data?.name} logo`}
                  className="h-20 w-20 rounded-full border-2 border-background"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{data?.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">
                      {/* {store.rating?.toFixed(1)} TODO */}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    {/* {store.location.address} TODO */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="gap-2 rounded-full">
            <MessageSquare className="h-4 w-4" />
            <span>Contact</span>
          </Button>
          <Button className="gap-2 ml-auto rounded-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600">
            <ShoppingBag className="h-4 w-4" />
            <span>تصفح البضائع</span>
          </Button>
        </div>

        {/* Store Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-lg mb-6">
                <TabsTrigger value="about" className="rounded-md">
                  نبذة
                </TabsTrigger>
                <TabsTrigger value="products" className="rounded-md">
                  البضائع
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-md">
                  التقييمات
                </TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    نبذة عن {data?.name}
                  </h2>
                  {/* <p className="text-muted-foreground">{store.description}</p> TODO */}
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">الأقسام</h3>
                  <div className="flex flex-wrap gap-2">
                    {storeCategories?.map((category) => (
                      <Badge
                        key={category.id}
                        variant="secondary"
                        className="rounded-full"
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">معلومات التواصل</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {/* <span>{store.contactInfo.phone}</span> TODO */}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="products"
                className="space-y-6 animate-fade-in"
              >
                <div>
                  <h2 className="text-xl font-bold mb-4">البضائع</h2>
                  {data?.products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">لا يوجد بضائع</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        هذا المتجر لا يحتوي على بضائع بعد.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 staggered-animation">
                      {data?.products.map((product) => (
                        <Link href={`/products/${product.id}`} key={product.id}>
                          <Card className="overflow-hidden h-full card-hover">
                            <div className="relative h-48 w-full">
                              <div className="flex items-center justify-center w-full h-full">
                                <img
                                  src={product.photo || "/boxes.png"}
                                  alt={product.name}
                                  className="size-1/2 object-cover"
                                />
                              </div>
                              <div className="absolute top-4 left-4">
                                {storeCategories?.map((category) => (
                                  <Badge
                                    key={category.id}
                                    variant="secondary"
                                    className="rounded-full"
                                  >
                                    {category.name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="text-lg font-bold">
                                {product.name}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {product.description}
                              </p>
                              <div className="flex items-center justify-between mt-3">
                                <span className="font-bold">
                                  ₪{Number(product.price).toFixed(2)} {/* TODO : adjust styles */}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent
                value="reviews"
                className="space-y-6 animate-fade-in"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">التقييمات</h2>
                    {/* {user && <Button className="rounded-full">اكتب تقييم</Button>} */}
                  </div>

                  {[].length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">لا تقييمات بعد</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        كن اول من يقيم المتجر.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {" "}
                      {/* TODO : add reviews */}
                      {[].map((review) => (
                        <Card key={review.id} className="card-hover">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <Avatar>
                                <AvatarImage
                                  src={"/placeholder.svg"}
                                  alt={review.userName}
                                />
                                <AvatarFallback>
                                  {review.userName.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">
                                      {review.userName}
                                    </h3>
                                    <div className="flex">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${
                                            i < review.rating
                                              ? "fill-yellow-400 text-yellow-400"
                                              : "text-muted-foreground"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(
                                      review.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm mt-2">{review.comment}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="card-hover">
              <CardContent className="p-4">
                <h3 className="font-bold mb-2">موقع المتجر</h3>
                <div className="h-64 rounded-lg overflow-hidden mb-4">
                  <MapWithNoSSR
                    center={[data?.latitude, data?.longitude]}
                    zoom={15}
                    markers={[
                      {
                        position: [data?.latitude, data?.longitude],
                        title: data?.name,
                        type: "store",
                      },
                    ]}
                  />
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  {/* <span>{store.location.address}</span> TODO */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
