"use client";

import Header from "@/components/main_layout/header";
import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {}

const FAQ: React.FC<FAQProps> = () => {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const toggleQuestion = (question: string) => {
    setExpandedQuestion(expandedQuestion === question ? null : question);
  };

  const faqItems: FAQItem[] = [
    // أسئلة عامة
    {
      question: "ما هو مسار؟",
      answer:
        "مسار هو منصة شاملة تجمع بين خريطة تفاعلية، وسوق إلكتروني، وخدمات طوارئ لمساعدالمتضريين من الحرب في غزة.",
    },
    {
      question: "هل استخدام مسار مجاني؟",
      answer:
        "نعم، الاستخدام الأساسي لمسار مجاني. قد تتوفر بعض الميزات المتقدمة أو الخدمات الاختيارية برسوم إضافية.",
    },
    {
      question: "كيف يمكنني التواصل مع فريق الدعم؟",
      answer:
        'يمكنك التواصل مع فريق الدعم الخاص بنا عبر صفحة "اتصل بنا" الموجودة اسفل الصفحة.',
    },
    {
      question: "كيف يمكنني البحث عن مكان محدد على الخريطة؟",
      answer:
        "يمكنك استخدام شريط البحث الموجود أعلى الخريطة. اكتب اسم المكان أو العنوان الذي تبحث عنه، وسيتم عرضه على الخريطة.",
    },
    {
      question: "ماذا تعني العلامات المختلفة على الخريطة؟",
      answer:
        "تمثل العلامات المختلفة على الخريطة أنواعًا مختلفة من الأماكن أو الخدمات. يمكنك الاطلاع على مفتاح الخريطة (إذا كان متوفرًا) لفهم معنى كل علامة.",
    },
    {
      question: "كيف يمكنني البحث عن منتج أو خدمة في المتجر؟",
      answer:
        "يمكنك تصفح الفئات أو استخدام شريط البحث الموجود في صفحة المتجر لإيجاد ما تبحث عنه.",
    },
    {
      question: "كيف يمكنني التواصل مع البائع؟",
      answer:
        "عادةً ما تتوفر خيارات للتواصل مع البائع مباشرة من صفحة المنتج أو الإعلان، مثل إرسال رسالة أو الاتصال به.",
    },
    {
      question: "ما هي طرق الدفع المتاحة؟",
      answer: "لا يوجد طرق دفع في منصتنا، نساعدك بالتواصل مع البائع",
    },

    // أسئلة حول خدمات الطوارئ
    {
      question: "كيف يمكنني طلب المساعدة في حالة الطوارئ؟",
      answer:
        "يمكنك طلب المساعدة في حالة الطوارئ من خلال صفحة الخدمات ثم خدمات الطوارئ.",
    },
    {
      question: "ما هي المعلومات التي يجب أن أقدمها عند طلب المساعدة؟",
      answer:
        "عند طلب المساعدة، يرجى تقديم معلومات واضحة حول موقعك، ونوع الحالة الطارئة، وأي تفاصيل أخرى قد تكون مفيدة.",
    },
  ];

  return (
    <>
      <Header />
      <div className="bg-gray-100 py-8 px-4 md:px-8 lg:px-16">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          الأسئلة الشائعة
        </h1>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-md shadow-md overflow-hidden"
            >
              <div
                className="bg-gray-200 py-3 px-4 font-medium text-gray-700 flex justify-between items-center cursor-pointer"
                onClick={() => toggleQuestion(item.question)}
              >
                {item.question}
                <span className="text-gray-600">
                  {expandedQuestion === item.question ? "-" : "+"}
                </span>
              </div>
              {expandedQuestion === item.question && (
                <div className="py-4 px-6 text-gray-600 whitespace-pre-line">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
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

export default FAQ;
