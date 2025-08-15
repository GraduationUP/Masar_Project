"use client";

import Image from "next/image";
import ServicesTitle from "./ServicesTitle";
import { useState } from "react";
import Link from "next/link";

export default function CommonQuestionsSection() {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const toggleQuestion = (question: string) => {
    setExpandedQuestion(expandedQuestion === question ? null : question);
  };
  return (
    <div className="flex md:h-[750px] lg:min-w-[1400px]">
      <div className="relative flex-1 md:block hidden" style={{ background: 'url("/ui/Rectangle.svg")', backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        <Image
          src={"/OurServices/Services.png"}
          alt="Staff"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 mx-auto px-4 md:px-16 py-12">
        <ServicesTitle
          SubTitle="اطلع على الأسئلة الشائعة"
          MainTitle="حافظ على أمان عملك وضمان توفر عالي"
        />
        <div className="flex flex-col gap-4">
          <div className="bg-[#F3F7FB] rounded-md border border-gray-300 overflow-hidden">
            <div
              className={`py-3 px-4 font-medium flex justify-between items-center cursor-pointer ${
                expandedQuestion === "من نحن؟"
                  ? "bg-[#F3F7FB] text-primary"
                  : "bg-background text-foreground"
              }`}
              onClick={() => toggleQuestion("من نحن؟")}
            >
              من نحن؟
              <span
                className={`text-gray-600 ${
                  expandedQuestion === "من نحن؟"
                    ? "-rotate-90 text-primary"
                    : ""
                }`}
              >
                {"»"}
              </span>
            </div>
            {expandedQuestion === "من نحن؟" && (
              <div className="py-4 px-6 text-gray-600 whitespace-pre-line">
                منصة شاملة تجمع بين خريطة تفاعلية، وسوق إلكتروني، وخدمات طوارئ
                لمساعدالمتضريين من الحرب في غزة
              </div>
            )}
          </div>
          <div className="bg-[#F3F7FB] rounded-md border border-gray-300 overflow-hidden">
            <div
              className={`py-3 px-4 font-medium flex justify-between items-center cursor-pointer ${
                expandedQuestion === "كيف نقدم الخدمات؟"
                  ? "bg-[#F3F7FB] text-primary"
                  : "bg-background text-foreground"
              }`}
              onClick={() => toggleQuestion("كيف نقدم الخدمات؟")}
            >
              كيف نقدم الخدمات؟
              <span
                className={`text-gray-600 ${
                  expandedQuestion === "كيف نقدم الخدمات؟"
                    ? "-rotate-90 text-primary"
                    : ""
                }`}
              >
                {"»"}
              </span>
            </div>
            {expandedQuestion === "كيف نقدم الخدمات؟" && (
              <div className="py-4 px-6 text-gray-600 whitespace-pre-line">
                نقدم خدمات الطوارئ من خلال منصتنا وخدمات محلية اخرى من خلال
                عرضها على{" "}
                <Link href={"/map"} className="text-primary hover:underline">
                  الخريطة التفاعلية
                </Link>
              </div>
            )}
          </div>
          <div className="bg-[#F3F7FB] rounded-md border border-gray-300 overflow-hidden">
            <div
              className={`py-3 px-4 font-medium flex justify-between items-center cursor-pointer ${
                expandedQuestion ===
                "كيف يمكنني البحث عن خدمة محددة على الخريطة؟"
                  ? "bg-[#F3F7FB] text-primary"
                  : "bg-background text-foreground"
              }`}
              onClick={() =>
                toggleQuestion("كيف يمكنني البحث عن خدمة محددة على الخريطة؟")
              }
            >
              كيف يمكنني البحث عن خدمة محددة على الخريطة؟
              <span
                className={`text-gray-600 ${
                  expandedQuestion ===
                  "كيف يمكنني البحث عن خدمة محددة على الخريطة؟"
                    ? "-rotate-90 text-primary"
                    : ""
                }`}
              >
                {"»"}
              </span>
            </div>
            {expandedQuestion ===
              "كيف يمكنني البحث عن خدمة محددة على الخريطة؟" && (
              <div className="py-4 px-6 text-gray-600 whitespace-pre-line">
                من خلال الانتقال الى صفحة{" "}
                <Link href={"/map"} className="text-primary hover:underline">
                  الخريطة التفاعلية
                </Link>{" "}
                وتصفية البحث ليناسب الخدمة المطلوبة
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
