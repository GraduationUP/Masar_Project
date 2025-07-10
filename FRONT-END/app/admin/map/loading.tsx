import React from 'react';

export default function Loading() {
  return (
    <div className="container px-4 md:px-6 py-8 section-padding">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">تحميل الخريطة التفاعلية</h1>
        <p className="text-muted-foreground text-lg">جارٍ تحميل الخدمات والمتاجر...</p>
      </div>
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    </div>
  );
}