"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Loading from "./loading";
import { CustomAlert } from "@/components/ui/customAlert";
import Header from "@/components/main_layout/header";
import { userFeedback, StoreData } from "@/types/store";
import StoreContent from "@/components/stores/storeContent";
import StoreActionButtons from "@/components/stores/storeActionButtons";
import StoreHeader from "@/components/stores/storeHeader";

const MapWithNoSSR = dynamic(() => import("@/components/maps/mapWithNoSSR"), {
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
  const [isUser, setIsUser] = useState(false);
  const [notOwner, setNotOwner] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [message, setMessage] = useState("");
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
    is_favorite: false,
  });

  const fetchFeedbackStatus = async () => {
    try {
      const Auth_Token = localStorage.getItem("authToken");
      if (Auth_Token === null) return;
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
        return;
      }

      const responseData = await response.json();
      setUserFeedback(responseData);
    } catch (error) {
      console.error("Error fetching feedback status:", error);
    }
  };

  // Fetch store data
  const fetchStoreData = async () => {
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
    }
  };

  const addFav = async () => {
    try {
      const Auth_Token = localStorage.getItem("authToken");
      if (!Auth_Token) return;
      const response = await fetch(`${BASE_API_URL}/api/favourites/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth_Token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseMsg = await response.json();
      setSuccess(true);
      fetchFeedbackStatus();
      setMessage(responseMsg.message);
    } catch (error) {
      console.error("Error adding favorite:", error);
      setFailure(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchStoreData();
    fetchFeedbackStatus();
    setLoading(false);
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
      }
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
      setNotOwner(true);
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <CustomAlert
        show={success}
        onClose={() => setSuccess(false)}
        message={message}
        success
      />
      <CustomAlert
        show={failure}
        onClose={() => setFailure(false)}
        message="حدث خطأ ما حاول مجدداً!"
        success={false}
      />
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          {/* Store Header */}
          <StoreHeader data={data} />

          {/* Action Buttons */}
          <StoreActionButtons
            data={data}
            addFav={addFav}
            isUser={isUser}
            notOwner={notOwner}
            userfeedback={userfeedback}
          />

          {/* Store Content */}
          <StoreContent
            data={data}
            storeCategories={storeCategories}
            isUser={isUser}
            notOwner={notOwner}
            userfeedback={userfeedback}
            openUserUpdate={openUserUpdate}
            setOpenUserUpdate={setOpenUserUpdate}
          />
        </div>
      </div>
    </>
  );
}
