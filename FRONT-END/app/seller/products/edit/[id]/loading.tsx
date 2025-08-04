import React from "react";
import Header from "@/components/main_layout/header";
import { Loader2 } from "lucide-react";
import PageTitle from "@/components/main_layout/PageTitle";

export default function Loading() {
  return (
    <>
      <Header />
      <PageTitle
        MainTitle="تعديل المنتجات"
        Subtitle={`تعديل المنتج {حط اسم المنتج}`}
      />
      <div className="h-screen flex items-center justify-center">
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
        </div>
      </div>
    </>
  );
}
