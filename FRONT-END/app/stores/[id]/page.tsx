"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/starRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, MessageSquare, Phone, ShoppingBag, Star } from "lucide-react";
import dynamic from "next/dynamic";
import Loading from "./loading";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { CustomAlert } from "@/components/customAlert";
import Header from "@/components/main_layout/header";

interface userFeedback {
  score: number | null;
  score_id: number | null;
  content: string | null;
  content_id: number | null;
}

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
  store_image: string;
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
  feedback: Feedback[]; // This is the array we need to update
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
  const [isUser, setIsUser] = useState(false); // Initialize with false
  const [notOwner, setNotOwner] = useState(true); // Initialize with true
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openUserUpdate, setOpenUserUpdate] = useState(false);
  const [categories, setCategories] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [userfeedback, setUserFeedback] = useState<userFeedback>({
    score: null,
    score_id: null,
    content: null,
    content_id: null,
  });

  // Fetch feedback status
  useEffect(() => {
    async function fetchFeedbackStatus() {
      // setLoading(true); // Only set loading for initial store data fetch, not for every feedback status check
      try {
        const Auth_Token = localStorage.getItem("authToken");
        if (!Auth_Token) return; // Only fetch if authenticated

        const response = await fetch(
          `${BASE_API_URL}/api/store/${id}/feedback-status`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${Auth_Token}`,
            },
          }
        );

        if (!response.ok) {
          // Handle cases like 401 Unauthorized if token is invalid/expired
          console.warn("Failed to fetch feedback status or not authorized.");
          return;
        }

        const responseData = await response.json();
        console.log("Feedback status:", responseData);
        setUserFeedback(responseData);
      } catch (error) {
        console.error("Error fetching feedback status:", error);
      } // finally { setLoading(false); }
    }
    fetchFeedbackStatus();
  }, [id, BASE_API_URL]);

  // Fetch store data
  useEffect(() => {
    async function fetchStoreData() {
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

    fetchStoreData();
  }, [id, BASE_API_URL, router]);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
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
      } // finally { setLoading(false); }
    }
    fetchCategories();
  }, [BASE_API_URL]);

  const storeCategories = data?.products?.reduce((acc, product) => {
    if (Array.isArray(categories)) {
      const category = categories.find((c) => c.id === product.category_id);
      if (category && !acc.some((c) => c.id === category.id)) {
        acc.push(category);
      }
    }
    return acc;
  }, [] as Array<{ id: number; name: string }>);

  // Determine if the current user is the store owner or just a user
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
    } else {
      setIsUser(false);
      setNotOwner(true); // If no user logged in, they are not the owner
    }
  }, [data]); // Re-run when data changes (store data is fetched)

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
      const responseData = await response.json();
      console.log("Rating added successfully:", responseData);
      setSuccess(true);
      setSubmitting(false);

      // --- START: Update state for rating ---
      // Assuming the API response for adding a rating gives back the user's name
      // or you can retrieve it from localStorage
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const userName = userInfo.name || "Unknown User";
      const newRatingFeedback: Feedback = {
        user_name: userName,
        score: score,
        content: userfeedback.content || "", // Keep existing comment if any
        created_at: new Date().toLocaleDateString("en-US"), // Or use a timestamp from API
      };

      // Update the user's own feedback status
      setUserFeedback((prev) => ({
        ...prev,
        score: score,
        score_id: responseData.id,
      })); // Assuming responseData.id is the score_id

      // Update the main 'data' state to show the new rating
      setData((prevData) => {
        if (!prevData) return null;

        const updatedFeedback = prevData.feedback.map((item) => {
          if (item.user_name === userName) {
            return { ...item, score: score }; // Update existing user's feedback
          }
          return item;
        });

        // If user's feedback wasn't in the list, add it
        const userHasFeedback = updatedFeedback.some(
          (item) => item.user_name === userName
        );
        if (!userHasFeedback) {
          updatedFeedback.unshift(newRatingFeedback); // Prepend for immediate visibility
        }

        return { ...prevData, feedback: updatedFeedback };
      });
      // --- END: Update state for rating ---
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async () => {
    setSubmitting(true);
    try {
      const Auth_Token = localStorage.getItem("authToken");
      if (!Auth_Token) {
        setFailure(true);
        setSubmitting(false);
        return;
      }
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
      setContent(""); // Clear the textarea after successful submission

      // --- START: Update state for new comment ---
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const userName = userInfo.name || "Unknown User";

      // Create the new feedback object
      const newCommentFeedback: Feedback = {
        user_name: userName,
        score: userfeedback.score || 0, // Use existing score if available, otherwise 0 or null
        content: content,
        created_at: new Date().toLocaleDateString("en-US"), // Use actual timestamp from API if available
      };

      // Update the user's own feedback status
      setUserFeedback((prev) => ({
        ...prev,
        content: content,
        content_id: responseData.id,
      })); // Assuming responseData.id is the comment_id

      // Update the main 'data' state
      setData((prevData) => {
        if (!prevData) return null; // If data is null, cannot update

        // Check if the user already has an entry in the feedback array
        const userHasFeedback = prevData.feedback.some(
          (item) => item.user_name === userName
        );

        let updatedFeedback: Feedback[];
        if (userHasFeedback) {
          // If the user already has feedback, update their existing entry
          updatedFeedback = prevData.feedback.map((item) =>
            item.user_name === userName
              ? { ...item, content: content } // Only update content
              : item
          );
        } else {
          // If the user does not have feedback, add the new entry to the array
          updatedFeedback = [newCommentFeedback, ...prevData.feedback]; // Prepend for immediate visibility
        }

        // Return the new StoreData object with the updated feedback array
        return { ...prevData, feedback: updatedFeedback };
      });
      // --- END: Update state for new comment ---
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
      const responseData = await response.json();
      console.log("Comment edited successfully:", responseData);
      setSuccess(true);
      setSubmitting(false);
      setContent(updatedContent); // Update local content state

      // --- START: Update state for comment update ---
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const userName = userInfo.name || "Unknown User";

      // Update the user's own feedback status
      setUserFeedback((prev) => ({ ...prev, content: updatedContent }));

      // Update the main 'data' state
      setData((prevData) => {
        if (!prevData) return null;
        const updatedFeedback = prevData.feedback.map((item) => {
          if (item.user_name === userName) {
            return { ...item, content: updatedContent };
          }
          return item;
        });
        return { ...prevData, feedback: updatedFeedback };
      });
      // --- END: Update state for comment update ---
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
      const responseData = await response.json();
      console.log("Rating edited successfully:", responseData);
      setSuccess(true);
      setSubmitting(false);
      setScore(updatedScore); // Update local score state

      // --- START: Update state for rating update ---
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const userName = userInfo.name || "Unknown User";

      // Update the user's own feedback status
      setUserFeedback((prev) => ({ ...prev, score: updatedScore }));

      // Update the main 'data' state
      setData((prevData) => {
        if (!prevData) return null;
        const updatedFeedback = prevData.feedback.map((item) => {
          if (item.user_name === userName) {
            return { ...item, score: updatedScore };
          }
          return item;
        });
        return { ...prevData, feedback: updatedFeedback };
      });
      // --- END: Update state for rating update ---
    } catch (error) {
      console.error("Error editing rating:", error);
      setFailure(true);
    }
  };

  const handelRatingDelete = async (id: number) => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setFailure(true);
        setSubmitting(false);
        return;
      }
      const response = await fetch(`${BASE_API_URL}/api/ratings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting rating:", errorData);
        setFailure(true);
        return;
      }
      setSuccess(true);
      setSubmitting(false);

      // --- START: Update state for rating deletion ---
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const userName = userInfo.name || "Unknown User";

      // Clear the user's own score and score_id
      setUserFeedback((prev) => ({ ...prev, score: null, score_id: null }));

      // Remove the rating from the main 'data' state or update its score to null
      setData((prevData) => {
        if (!prevData) return null;
        const updatedFeedback = prevData.feedback
          .map((item) => {
            if (item.user_name === userName) {
              return { ...item, score: 0 }; // Set score to 0 or null
            }
            return item;
          })
          // Optional: filter out if both score and content are null for a user
          .filter((item) => item.score !== 0 || item.content);
        return { ...prevData, feedback: updatedFeedback };
      });
      // --- END: Update state for rating deletion ---
    } catch (error) {
      console.error("Error deleting rating:", error);
      setFailure(true);
    } finally {
      // No reload here
    }
  };

  const handelCommentDelete = async (id: number) => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setFailure(true);
        setSubmitting(false);
        return;
      }
      const response = await fetch(`${BASE_API_URL}/api/comments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting comment:", errorData);
        setFailure(true);
        return;
      }
      setSuccess(true);
      setSubmitting(false);
      setContent(""); // Clear content input

      // --- START: Update state for comment deletion ---
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const userName = userInfo.name || "Unknown User";

      // Clear the user's own content and content_id
      setUserFeedback((prev) => ({ ...prev, content: null, content_id: null }));

      // Remove the comment from the main 'data' state or update its content to empty
      setData((prevData) => {
        if (!prevData) return null;
        const updatedFeedback = prevData.feedback
          .map((item) => {
            if (item.user_name === userName) {
              return { ...item, content: "" }; // Set content to empty string
            }
            return item;
          })
          // Optional: filter out if both score and content are null/empty for a user
          .filter((item) => item.score !== 0 || item.content !== "");
        return { ...prevData, feedback: updatedFeedback };
      });
      // --- END: Update state for comment deletion ---
    } catch (error) {
      console.error("Error deleting comment:", error);
      setFailure(true);
    } finally {
      // No reload here
    }
  };

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
              src={"/Banner.svg"}
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
                              <Button
                                variant={"link"}
                                onClick={handelRatingSend}
                              >
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
                      <Card className="card-hover">
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
                                          localStorage.getItem("userInfo") ||
                                            "{}"
                                        ).name
                                      }
                                    </h3>
                                    <div className="flex">
                                      {userfeedback.score !== null &&
                                        Array.from({ length: 5 }).map(
                                          (_, i) => (
                                            <Star
                                              key={i}
                                              className={`h-4 w-4 ${
                                                i < (userfeedback.score ?? 0)
                                                  ? "fill-yellow-400 text-yellow-400"
                                                  : "text-muted-foreground"
                                              }`}
                                            />
                                          )
                                        )}
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
                              {userfeedback.content && (
                                <Button
                                  variant={"destructive"}
                                  onClick={() =>
                                    handelCommentDelete(
                                      userfeedback.content_id as number
                                    )
                                  }
                                >
                                  حذف التعليق
                                </Button>
                              )}
                              {userfeedback.score && (
                                <Button
                                  variant={"destructive"}
                                  onClick={() =>
                                    handelRatingDelete(
                                      userfeedback.score_id as number
                                    )
                                  }
                                >
                                  حذف التقييم
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
                      message="حدث خطأ ما حاول مجدداً!"
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
                        {data?.feedback.map((review, index) => (
                          <Card
                            key={review.user_name + index}
                            className="card-hover"
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between gap-4">
                                <div className="flex gap-2">
                                  <Avatar>
                                    {/* Consider getting user avatar from backend */}
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
          </div>
        </div>
      </div>
    </>
  );
}
