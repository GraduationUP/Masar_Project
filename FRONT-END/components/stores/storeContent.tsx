"use client";

import { MapPin, MessageSquare, Phone, ShoppingBag, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import StarRating from "./starRating";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import dynamic from "next/dynamic";
import { StoreData, userFeedback } from "@/types/store";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const MapWithNoSSR = dynamic(() => import("@/components/maps/mapWithNoSSR"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-muted/30 animate-pulse flex items-center justify-center">
      <p className="text-muted-foreground">جار تحميل الخريطة...</p>
    </div>
  ),
});

interface Props {
  data: StoreData | null;
  storeCategories: { id: number; name: string }[] | undefined;
  isUser: boolean;
  notOwner: boolean;
  userfeedback: any;
  openUserUpdate: boolean;
  setOpenUserUpdate: (open: boolean) => void;
}

export default function StoreContent({
  data,
  storeCategories,
  isUser,
  notOwner,
  userfeedback,
}: Props) {
  const { id } = useParams();
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [content, setContent] = useState("");
  const [score, setScore] = useState(1);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [openUserUpdate, setOpenUserUpdate] = useState(false);

  const handelRatingSend = async () => {
    setSubmitting(true);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setFailure(true);
        setSubmitting(false);
        return;
      }
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
      setSuccess(true);
      setMessage("تم التقييم بنجاح");
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
      setSuccess(true);
      setMessage("تم إضافة التعليق بنجاح");
      setSubmitting(false);
      setContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleUpdateComment = async (id: number, updatedContent: string) => {
    setSubmitting(true);
    try {
      const Auth_Token = localStorage.getItem("authToken");
      if (!Auth_Token) {
        setFailure(true);
        setSubmitting(false);
        return;
      }
      const response = await fetch(`${BASE_API_URL}/api/comments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth_Token}`,
        },
        body: JSON.stringify({ content: updatedContent }),
      });
      if (!response.ok) {
        setFailure(true);
        setSubmitting(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setSuccess(true);
      setMessage("تم تعديل التعليق بنجاح");
      setSubmitting(false);
      setContent(updatedContent);
    } catch (error) {
      console.error("Error editing comment:", error);
      setFailure(true);
    }
  };

  const handelRatingUpdate = async (id: number, updatedScore: number) => {
    setSubmitting(true);
    try {
      const Auth_Token = localStorage.getItem("authToken");
      if (!Auth_Token) {
        setFailure(true);
        setSubmitting(false);
        return;
      }
      const response = await fetch(`${BASE_API_URL}/api/ratings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth_Token}`,
        },
        body: JSON.stringify({ score: updatedScore }),
      });
      if (!response.ok) {
        setFailure(true);
        setSubmitting(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setSuccess(true);
      setMessage("تم تعديل التقييم بنجاح");
      setSubmitting(false);
      setScore(updatedScore);
    } catch (error) {
      console.error("Error editing rating:", error);
      setFailure(true);
    }
  };

  const handelDeleteFeedback = async (id: number) => {
    setSubmitting(true);
    try {
      const Auth_Token = localStorage.getItem("authToken");
      if (!Auth_Token) {
        setFailure(true);
        setSubmitting(false);
        return;
      }
      const response = await fetch(
        `${BASE_API_URL}/api/stores/${id}/feedback`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth_Token}`,
          },
        }
      );
      if (!response.ok) {
        setFailure(true);
        setSubmitting(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setSuccess(true);
      setMessage("تم حذف المراجعة بنجاح");
      setSubmitting(false);
    } catch (error) {
      console.error("Error editing rating:", error);
      setFailure(true);
    }
  };
  return (
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
              <h2 className="text-xl font-bold mb-2">نبذة عن {data?.name}</h2>
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
          <TabsContent value="products" className="space-y-6 animate-fade-in">
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
                              className="size-full object-contain"
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
                          <h3 className="text-lg font-bold">{product.name}</h3>
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
          <TabsContent value="reviews" className="space-y-6 animate-fade-in">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                  التقييمات ({data?.feedback?.length})
                </h2>
              </div>
              {isUser && notOwner && (
                <>
                  {userfeedback.score === null && (
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
                  )}
                  {userfeedback.content === null && (
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
                  )}
                </>
              )}

              {openUserUpdate && (
                <>
                  {userfeedback.score !== null && (
                    <div className="flex">
                      <StarRating
                        score={score}
                        setScore={setScore}
                        starSize={"30px"}
                      />
                      {submitting ? (
                        <Button variant={"secondary"} disabled>
                          تحديث
                        </Button>
                      ) : (
                        <Button
                          variant={"link"}
                          onClick={() =>
                            handelRatingUpdate(
                              userfeedback.score_id as number,
                              score
                            )
                          }
                        >
                          تحديث
                        </Button>
                      )}
                    </div>
                  )}
                  {userfeedback.content !== null && (
                    <form onSubmit={(e) => e.preventDefault()}>
                      <label htmlFor="content">تعليقك</label>
                      <Textarea
                        placeholder={userfeedback.content || ""}
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mb-2"
                      ></Textarea>

                      {submitting ? (
                        <Button variant={"secondary"} disabled>
                          تحديث
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            handleUpdateComment(
                              userfeedback.content_id as number,
                              content
                            )
                          }
                          type="submit"
                        >
                          تحديث
                        </Button>
                      )}
                    </form>
                  )}
                </>
              )}
              {(userfeedback.content || userfeedback.score) && (
                <Card className="card-hover bg-background border">
                  <span className="text-xs text-muted-foreground pt-4 pl-4">
                    مراجعتك الشخصية
                  </span>
                  <CardContent className="p-4">
                    <div className="flex justify-between gap-4">
                      <div className="flex gap-2">
                        <Avatar>
                          <AvatarImage>
                            {data?.store_image && (
                              <Image
                                src={data.store_image}
                                alt="صورة المتجر"
                                height={40}
                                width={40}
                              />
                            )}
                          </AvatarImage>
                          <AvatarFallback>
                            {JSON.parse(
                              localStorage.getItem("userInfo") || "{}"
                            ).name?.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <h3 className="font-medium">
                                {
                                  JSON.parse(
                                    localStorage.getItem("userInfo") || "{}"
                                  ).name
                                }
                              </h3>
                              <div className="flex">
                                {userfeedback.score !== null &&
                                  Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < (userfeedback.score ?? 0)
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                              </div>
                            </div>
                            {userfeedback.content !== null && (
                              <p className="text-sm mt-2">
                                {userfeedback.content}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant={"link"}
                          onClick={() => setOpenUserUpdate(true)}
                        >
                          تعديل
                        </Button>
                        {(userfeedback.content || userfeedback.score) && (
                          <Button
                            variant={"destructive"}
                            onClick={() => {
                              handelDeleteFeedback(data?.id as number);
                            }}
                          >
                            حذف
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
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
                  {data?.feedback
                    .filter((review) => !review.is_owner)
                    .map((review, index) => (
                      <Card
                        key={review.user_name + index}
                        className="card-hover"
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between gap-4">
                            <div className="flex gap-2">
                              <Link href={`/profile/${review.user_id}`}>
                                <Avatar>
                                  <AvatarFallback>
                                    {review.user_name.slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                              </Link>
                              <div className="flex">
                                <div className="flex flex-col">
                                  <div className="flex items-center">
                                    <Link href={`/profile/${review.user_id}`}>
                                      <h3 className="font-medium">
                                        {review.user_name}
                                      </h3>
                                    </Link>
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
  );
}
