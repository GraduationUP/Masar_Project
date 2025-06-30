"use client";

// TODO : Add a whatsapp button

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MapPin,
  MessageSquare,
  ShoppingBag,
  Star,
  StoreIcon,
  Share2,
  ChevronRight,
  Plus,
  Minus,
  Loader2,
} from "lucide-react";
import dynamic from "next/dynamic";


const MapWithNoSSR = dynamic(() => import("@/components/mapWithNoSSR"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-muted/30 animate-pulse flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
      <span className="sr-only">جار تحميل الخريطة...</span>
    </div>
  ),
})

interface Products {
  status: Boolean;
  data: {
    id: Number;
    store_id: Number;
    name: String;
    description: String;
    price: String;
    photo: String;
    store_name: String;
    category_name: String;
    latitude: any;
    longitude: any;
    show_location: any;
    created_at: String;
    location_address: String;
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
      category_name: "",
      latitude: 0,
      longitude: 0,
      show_location: null,
      created_at: "",
      location_address: "",
    },
  });
  const [similerProducts, SetSimilerProducts] = useState();
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
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-muted rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-muted rounded-lg"></div>
              <div className="h-6 w-1/4 bg-muted rounded-lg"></div>
              <div className="h-4 w-full bg-muted rounded-lg"></div>
              <div className="h-4 w-5/6 bg-muted rounded-lg"></div>
              <div className="h-10 w-full bg-muted rounded-lg mt-8"></div>
              <div className="flex gap-4 mt-4">
                <div className="h-10 w-1/2 bg-muted rounded-lg"></div>
                <div className="h-10 w-1/2 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="rounded-xl overflow-hidden shadow-md bg-background">
            <div className="relative aspect-square">
              <img
                src={products.data.photo || "/boxes.png"}
                alt={products.data.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{products.data.category_name}</Badge>
              <h1 className="text-3xl font-bold">{products.data.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">•</span>
                {/* <Link
                  href={`/stores/${store.id}`}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <StoreIcon className="h-3.5 w-3.5" />
                  <span>{store.name}</span>
                </Link> TODO */}
              </div>
            </div>

            <p className="text-muted-foreground">{products.data.description}</p>

            <div className="pt-4 border-t">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold">
                  ${Number(products.data.price).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Store Quick Info */}
            <Card className="mt-6 card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={"/placeholder-store.png"}
                    alt={`${products.data.store_name} logo`}
                    className="h-12 w-12 rounded-full border"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">{products.data.store_name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="truncate">
                        {products.data.location_address}
                      </span>
                    </div>
                  </div>
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
            <TabsList className="grid w-full grid-cols-1 rounded-lg mb-6">
              <TabsTrigger value="details" className="rounded-md">
                التفاصيل
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="animate-fade-in">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-bold mb-4">تفاصيل المنتج</h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 py-2 border-b">
                          <span className="text-muted-foreground">القسم</span>
                          <span>{products.data.category_name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 py-2 border-b">
                          <span className="text-muted-foreground">المتجر</span>
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
                              products.data.created_at
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4">موقع المنتج</h3>
                      <div className="h-64 rounded-lg overflow-hidden">
                        {/* <MapWithNoSSR
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
                              title: products.data.store_name,
                              type: "store",
                            },
                          ]}
                        /> TODO */}
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
            <TabsContent value="shipping" className="animate-fade-in">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">
                    Shipping & Delivery
                  </h3>
                  <div className="space-y-4">
                    <div className="pb-4 border-b">
                      <h4 className="font-medium mb-2">Delivery Options</h4>
                      <p className="text-sm text-muted-foreground">
                        This product is available for pickup from{" "}
                        {products.data.store_name}. Please check the store's
                        opening hours for pickup availability.
                      </p>
                    </div>
                    <div className="pb-4 border-b">
                      <h4 className="font-medium mb-2">Store Hours</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monday</span>
                          {/* <span>{store.openingHours.monday}</span> */}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tuesday</span>
                          {/* <span>{store.openingHours.tuesday}</span> */}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Wednesday
                          </span>
                          {/* <span>{store.openingHours.wednesday}</span> */}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Thursday
                          </span>
                          {/* <span>{store.openingHours.thursday}</span> */}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Friday</span>
                          {/* <span>{store.openingHours.friday}</span> */}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Saturday
                          </span>
                          {/* <span>{store.openingHours.saturday}</span> */}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sunday</span>
                          {/* <span>{store.openingHours.sunday}</span> */}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {/* <span>{store.location.address}</span> TODO */}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            Today:{" "}
                            {
                              // store.openingHours[
                              //   ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][
                              //     new Date().getDay()
                              //   ] as keyof typeof store.openingHours
                              // ]
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products TODO */}
        {/* {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Related Products</h2>
              <Button asChild variant="ghost" className="hidden md:flex">
                <Link href={`/stores/${store.id}`}>
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 staggered-animation">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  href={`/products/${relatedProduct.id}`}
                  key={relatedProduct.id}
                >
                  <Card className="overflow-hidden h-full card-hover">
                    <div className="relative h-48 w-full">
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="glass-effect text-foreground">
                          {relatedProduct.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold">
                          ${relatedProduct.price.toFixed(2)}
                        </span>
                        {relatedProduct.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {relatedProduct.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex justify-center md:hidden">
              <Button asChild variant="outline" className="rounded-full">
                <Link href={`/stores/${store.id}`}>View All Products</Link>
              </Button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
