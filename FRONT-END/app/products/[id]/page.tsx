"use client";

// TODO : Add a whatsapp button

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronRight, Loader2, ShoppingBag } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Loading from "./loading";
import Header from "@/components/main_layout/header";

const MapWithNoSSR = dynamic(() => import("@/components/mapWithNoSSR"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-muted/30 animate-pulse flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
      <span className="sr-only">جار تحميل الخريطة...</span>
    </div>
  ),
});

interface Related_Products {
  id: number;
  name: string;
  price: string;
  photo: string;
}

interface Products {
  status: Boolean;
  data: {
    id: number;
    store_id: number;
    name: string;
    description: string;
    price: string;
    photo: string;
    store_name: string;
    store_phone: string;
    store_photo: string;
    category_name: string;
    latitude: any;
    longitude: any;
    show_location: any;
    created_at: string;
    location_address: string;
    related_products: Related_Products[];
  };
}

export default function ProductPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Products>({
    status: true,
    data: {
      id: 0,
      store_id: 0,
      name: "",
      description: "",
      price: "",
      photo: "",
      store_name: "",
      store_phone: "",
      store_photo: "",
      category_name: "",
      latitude: 0,
      longitude: 0,
      show_location: null,
      created_at: "",
      location_address: "",
      related_products: [],
    },
  });
  const [similerProducts, SetSimilerProducts] = useState<Related_Products[]>(
    []
  );
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const params = useParams();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/guest/products/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        SetSimilerProducts(data.data.related_products);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link
              href="/marketplace"
              className="hover:text-primary transition-colors"
            >
              السوق
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link
              href={`/stores/${products.data.store_id}`}
              className="hover:text-primary transition-colors"
            >
              {products.data.store_name}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground font-medium truncate">
              {products.data.name}
            </span>
          </nav>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product Image */}
            <div className="rounded-xl overflow-hidden shadow-md bg-background col-span-1">
              <div className="relative aspect-square">
                <Image
                  src={products.data.photo || "/boxes.png"}
                  width={500}
                  height={500}
                  alt={products.data.name as string}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 col-span-2">
              <div>
                <Badge className="mb-2">{products.data.category_name}</Badge>
                <h1 className="text-3xl font-bold">{products.data.name}</h1>
              </div>

              <p className="text-muted-foreground">
                {products.data.description}
              </p>

              <div className="pt-4 border-t">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold">
                    ₪{Number(products.data.price).toFixed(2)}
                  </span>
                  <Link
                    href={`https://wa.me/00${products.data.store_phone
                      .replace(/^\+/, "")
                      .replace(/-/g, "")}`}
                  >
                    <Button variant={"outline"} className="rounded-full">
                      اطلب الآن
                      <Image
                        src={"/whatsapp.svg"}
                        alt="whatsapp"
                        width={20}
                        height={20}
                      />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Store Quick Info */}
              <Card className="mt-6 card-hover">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={ products.data.store_photo || "/placeholder-store.png"}
                      alt={`${products.data.store_name} logo`}
                      className="h-12 w-12 rounded-full border"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{products.data.store_name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span
                          className="truncate max-w-[calc(100vw-12rem)]"
                          title={products.data.location_address}
                        >
                          {products.data.location_address}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 md:mt-0">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      <Link href={`/stores/${products.data.store_id}`}>
                        عرض المتجر
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-8">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-lg mb-6">
                <TabsTrigger value="details" className="rounded-md">
                  التفاصيل
                </TabsTrigger>
                <TabsTrigger value="related_products" className="rounded-md">
                  ذات صلة
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="animate-fade-in">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-bold mb-4">
                          تفاصيل المنتج
                        </h3>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2 py-2 border-b">
                            <span className="text-muted-foreground">القسم</span>
                            <span>{products.data.category_name}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 py-2 border-b">
                            <span className="text-muted-foreground">
                              المتجر
                            </span>
                            <Link
                              href={`/stores/${products.data.store_id}`}
                              className="text-primary hover:underline"
                            >
                              {products.data.store_name}
                            </Link>
                          </div>
                          <div className="grid grid-cols-2 gap-2 py-2 border-b">
                            <span className="text-muted-foreground">
                              تاريخ الاضافة
                            </span>
                            <span>
                              {new Date(
                                products.data.created_at as string
                              ).toLocaleDateString("en-US", {
                                calendar: "gregory",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-4">موقع المنتج</h3>
                        <div className="h-64 rounded-lg overflow-hidden">
                          <MapWithNoSSR
                            center={[
                              products.data.latitude,
                              products.data.longitude,
                            ]}
                            zoom={15}
                            markers={[
                              {
                                position: [
                                  products.data.latitude,
                                  products.data.longitude,
                                ],
                                title: products.data.store_name as string,
                                type: "store",
                              },
                            ]}
                          />
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{products.data.location_address}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="related_products" className="animate-fade-in">
                <h3 className="text-lg font-bold mb-4">منتجات ذات صلة</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  {similerProducts.length > 0 ? (
                    similerProducts.map((product) => (
                      <Link key={product?.id} href={`/products/${product?.id}`}>
                        <Card className="h-full p-4">
                          <CardContent className="h-full flex flex-col justify-between">
                            <Image
                              src={
                                product?.photo === null
                                  ? "/boxes.png"
                                  : product?.photo
                              }
                              alt={product?.name}
                              width={100}
                              height={100}
                              className="object-contain w-full h-[200px]"
                            />
                            <div className="flex flex-col justify-end">
                              <span className="text-lg font-bold">{product?.name}</span>
                              <span className="text-sm">{product?.price} ₪</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))
                  ) : (
                    <div className="relative flex justify-center">
                      <ShoppingBag className="size-80 text-gray-400" />
                      <span className="bg-background text-gray-400 absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        لا يوجد منتجات ذات صلة بعد
                      </span>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
