"use client";

import Header from "@/components/main_layout/header";
import React, { useState } from "react";

interface HelpComponentProps {}

const HelpComponent: React.FC<HelpComponentProps> = () => {
  const [mapExpanded, setMapExpanded] = useState(false);
  const [storeExpanded, setStoreExpanded] = useState(false);
  const [emergencyExpanded, setEmergencyExpanded] = useState(false);
  const [faqExpanded, setFaqExpanded] = useState(false);

  const toggleSection = (section: string) => {
    switch (section) {
      case "map":
        setMapExpanded(!mapExpanded);
        break;
      case "store":
        setStoreExpanded(!storeExpanded);
        break;
      case "emergency":
        setEmergencyExpanded(!emergencyExpanded);
        break;
      case "faq":
        setFaqExpanded(!faqExpanded);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 py-8 px-4 md:px-8 lg:px-16">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          مركز المساعدة
        </h1>

        <section className="mb-4 bg-white rounded-md shadow-md overflow-hidden">
          <h2
            className="bg-gray-200 py-3 px-4 font-medium text-gray-700 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("map")}
          >
            الخريطة التفاعلية
            <span className="text-gray-600">{mapExpanded ? "-" : "+"}</span>
          </h2>
          {mapExpanded && (
            <div className="py-4 px-6 text-gray-600">
              <p className="mb-2">
                تعرف على كيفية استخدام الخريطة التفاعلية لاستكشاف المنطقة
                والعثور على الأماكن التي تبحث عنها.
              </p>
              <ul className="list-disc pl-5">
                <li className="mb-1">
                  <a href="#" className="text-blue-500 hover:underline">
                    كيف يمكنني البحث عن مكان محدد؟
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="text-blue-500 hover:underline">
                    ماذا تعني العلامات المختلفة على الخريطة؟
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="text-blue-500 hover:underline">
                    هل يمكنني حفظ المواقع المفضلة لدي؟
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    كيف يمكنني مشاركة موقع مع شخص آخر؟
                  </a>
                </li>
              </ul>
            </div>
          )}
        </section>

        <section className="mb-4 bg-white rounded-md shadow-md overflow-hidden">
          <h2
            className="bg-gray-200 py-3 px-4 font-medium text-gray-700 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("store")}
          >
            المتجر
            <span className="text-gray-600">{storeExpanded ? "-" : "+"}</span>
          </h2>
          {storeExpanded && (
            <div className="py-4 px-6 text-gray-600">
              <p className="mb-2">
                تعلم كيفية تصفح المنتجات والخدمات المعروضة، وكيفية إضافة إعلانك
                الخاص.
              </p>
              <ul className="list-disc pl-5">
                <li className="mb-1">
                  <a href="#" className="text-blue-500 hover:underline">
                    كيف يمكنني البحث عن منتج أو خدمة؟
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="text-blue-500 hover:underline">
                    كيف يمكنني التواصل مع البائع؟
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="text-blue-500 hover:underline">
                    ما هي طرق الدفع المتاحة؟
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    كيف يمكنني إضافة إعلان جديد؟
                  </a>
                </li>
              </ul>
            </div>
          )}
        </section>

        <section className="mb-4 bg-white rounded-md shadow-md overflow-hidden">
          <h2
            className="bg-gray-200 py-3 px-4 font-medium text-gray-700 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("emergency")}
          >
            خدمات الطوارئ
            <span className="text-gray-600">
              {emergencyExpanded ? "-" : "+"}
            </span>
          </h2>
          {emergencyExpanded && (
            <div className="py-4 px-6 text-gray-600">
              <p className="mb-2">
                دليل حول كيفية استخدام خدمات الطوارئ المتوفرة في التطبيق في
                حالات الضرورة.
              </p>
              <ul className="list-disc pl-5">
                <li className="mb-1">
                  <a href="#" className="text-blue-500 hover:underline">
                    كيف يمكنني طلب المساعدة في حالة الطوارئ؟
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="text-blue-500 hover:underline">
                    ما هي أنواع خدمات الطوارئ المتوفرة؟
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    ما هي المعلومات التي يجب أن أقدمها عند طلب المساعدة؟
                  </a>
                </li>
              </ul>
            </div>
          )}
        </section>

        <section className="mb-4 bg-white rounded-md shadow-md overflow-hidden">
          <h2
            className="bg-gray-200 py-3 px-4 font-medium text-gray-700 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("faq")}
          >
            الأسئلة الشائعة
            <span className="text-gray-600">{faqExpanded ? "-" : "+"}</span>
          </h2>
          {faqExpanded && (
            <div className="py-4 px-6 text-gray-600">
              <p className="mb-2">إجابات على بعض الأسئلة الأكثر شيوعًا.</p>
              <ul className="list-disc pl-5">
                <li className="mb-1">
                  ما هو مسار؟ (مسار هو منصة صممت في حرب غزة الأخيرة لمساعدة
                  المتضريين من الحرب)
                </li>
                <li className="mb-1">
                  كيف يمكنني إضافة إعلان جديد؟ (يمكنك انشاء متجرك الخاص بسهولة
                  والاعلان من خلاله)
                </li>
                <li>
                  كيف يمكنني الربح من خلال المنصة؟ (ليس هناك ربح مباشر من خلال
                  منصتنا لكننا نساعدك على ايجاد الزبائن والتواصل معهم)
                </li>
              </ul>
            </div>
          )}
        </section>

        <p className="text-gray-600 mt-6">
          إذا لم تجد إجابة لسؤالك، يمكنك{" "}
          <a href="#" className="text-blue-500 hover:underline">
            الاتصال بنا
          </a>{" "}
          للحصول على مزيد من المساعدة.
        </p>
      </div>
    </>
  );
};

export default HelpComponent;
