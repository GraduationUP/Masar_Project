"use client";

// TODO prevent the user from addin a new feedback and show him his feedback for editing or deleting

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/starRating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, MessageSquare, Phone, ShoppingBag, Star } from "lucide-react";
import dynamic from "next/dynamic";
import Loading from "./loading";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { CustomAlert } from "@/components/customAlert";
import Header from "@/components/main_layout/header";

interface Feedback {
  user_name: string;
  score: number;
  content: string;
  created_at: string;
}
interface StoreData {
  id: number;
  seller_id: number;
  name: string;
  latitude: number;
  longitude: number;
  location_address: string;
  phone: string;
  average_rating: number;
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
  feedback: Feedback[];
}
// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("@/components/mapWithNoSSR"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-muted/30 animate-pulse flex items-center justify-center">
      <p className="text-muted-foreground">جار تحميل الخريطة...</p>
    </div>
  ),
});

export default function StorePage() {
  const { id } = useParams();
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [data, setData] = useState<StoreData | null>(null);
  const [content, setContent] = useState("");
  const [score, setScore] = useState(1);
  const [isUser, setIsUser] = useState(Boolean);
  const [notOwner, setNotOwner] = useState(Boolean);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Set loading to true before the fetch
      try {
        const response = await fetch(`${BASE_API_URL}/api/guest/stores/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          router.push("/");
          return;
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
        const response = await fetch(`${BASE_API_URL}/api/guest/categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

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

  const handelRatingSend = async () => {
    setSubmitting(true);
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`${BASE_API_URL}/api/stores/${id}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ score }),
      });
      if (!response.ok) {
        setFailure(true);
        setSubmitting(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("Rating added successfully:", responseData);
      setSuccess(true);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async () => {
    setSubmitting(true);
    try {
      const Auth_Token = localStorage.getItem("authToken");
      const response = await fetch(
        `${BASE_API_URL}/api/stores/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth_Token}`,
          },
          body: JSON.stringify({ content }),
        }
      );
      if (!response.ok) {
        setFailure(true);
        setSubmitting(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("Comment added successfully:", responseData);
      setSuccess(true);
      setSubmitting(false);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    const userData = user ? JSON.parse(user) : null;
    if (userData) {
      setIsUser(true);
      if (userData.id !== data?.seller_id) {
        setNotOwner(true);
      } else {
        setNotOwner(false);
      }
    }
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
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

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="gap-2 rounded-full">
              <Image
                src="/whatsapp.svg"
                alt="whatsapp logo"
                className="h-4 w-4"
                width={50}
                height={50}
              />
              <Link
                href={`https://wa.me/${data?.phone.replace(/\D|\+/g, "")}`}
                target="_blank"
              >
                Whatsapp
              </Link>
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
                <TabsContent
                  value="about"
                  className="space-y-6 animate-fade-in"
                >
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      نبذة عن {data?.name}
                    </h2>
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
                      <div>
                        <Phone className="h-4 w-4 text-muted-foreground inline" />
                        <span>{data?.phone}</span>
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
                          <Link
                            href={`/products/${product.id}`}
                            key={product.id}
                          >
                            <Card className="overflow-hidden h-full card-hover">
                              <div className="relative h-48 w-full">
                                <div className="flex items-center justify-center w-full h-full">
                                  <img
                                    src={product.photo || "/boxes.png"}
                                    alt={product.name}
                                    className="size-1/2 object-contain"
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
                                    ₪{Number(product.price).toFixed(2)}{" "}
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
                    </div>
                    {isUser && notOwner && (
                      <>
                        <div className="flex">
                          <StarRating
                            score={score}
                            setScore={setScore}
                            starSize={"30px"}
                          />
                          {submitting ? (
                            <Button variant={"secondary"} disabled>
                              ارسال
                            </Button>
                          ) : (
                            <Button variant={"link"} onClick={handelRatingSend}>
                              ارسال
                            </Button>
                          )}
                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                          <label htmlFor="content">تعليقك</label>
                          <Textarea
                            placeholder="اكتب تعليقك هنا"
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="mb-2"
                          ></Textarea>

                          {submitting ? (
                            <Button variant={"secondary"} disabled>
                              تعليق
                            </Button>
                          ) : (
                            <Button onClick={handleAddComment} type="submit">
                              تعليق
                            </Button>
                          )}
                        </form>
                      </>
                    )}
                    <CustomAlert
                      show={success}
                      onClose={() => setSuccess(false)}
                      message="تم الارسال بنجاح"
                      success
                    />
                    <CustomAlert
                      show={failure}
                      onClose={() => setFailure(false)}
                      message="حدث خطأ ما حاول مجدداً!"
                      success={false}
                    />
                    <br />
                    {data?.feedback.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">لا تقييمات بعد</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          كن اول من يقيم المتجر.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {data?.feedback.map((review) => (
                          <Card key={review.user_name} className="card-hover">
                            <CardContent className="p-4">
                              <div className="flex justify-between gap-4">
                                <div className="flex gap-2">
                                  <Avatar>
                                    <AvatarFallback>
                                      {review.user_name.slice(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex">
                                    <div className="flex flex-col">
                                      <div className="flex items-center">
                                        <h3 className="font-medium">
                                          {review.user_name}
                                        </h3>
                                        <div className="flex">
                                          {review.score !== null &&
                                            Array.from({ length: 5 }).map(
                                              (_, i) => (
                                                <Star
                                                  key={i}
                                                  className={`h-4 w-4 ${
                                                    i < review.score
                                                      ? "fill-yellow-400 text-yellow-400"
                                                      : "text-muted-foreground"
                                                  }`}
                                                />
                                              )
                                            )}
                                        </div>
                                      </div>
                                      <p className="text-sm mt-2">
                                        {review.content}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(
                                    review.created_at
                                  ).toLocaleDateString("en-US", {
                                    calendar: "gregory",
                                  })}
                                </span>
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
                    {data && (
                      <MapWithNoSSR
                        center={[data.latitude, data.longitude]}
                        zoom={15}
                        markers={[
                          {
                            position: [data.latitude, data.longitude],
                            title: data.name,
                            type: "store",
                          },
                        ]}
                      />
                    )}
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <span>{data?.location_address}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
