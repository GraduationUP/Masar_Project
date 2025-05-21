import React from 'react';

interface SellerGuideProps {}

const SellerGuide: React.FC<SellerGuideProps> = () => {
  return (
    <div className="bg-gray-100 py-8 px-4 md:px-8 lg:px-16">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">دليل البائع</h1>

      <section className="mb-6 bg-white rounded-md shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">البدء كبائع</h2>
        <p className="text-gray-600 mb-3">تهانينا على قرارك بالانضمام إلى مجتمع البائعين لدينا! إليك بعض الخطوات الأساسية للبدء:</p>
        <ul className="list-disc pl-5 text-gray-600">
          <li className="mb-2"><b>إنشاء حساب:</b> إذا لم يكن لديك حساب بالفعل، قم بالتسجيل كبائع.</li>
          <li className="mb-2"><b>تجهيز ملفك الشخصي:</b> أضف صورة ملف شخصي ووصفًا موجزًا لنفسك أو لمتجرك.</li>
          <li className="mb-2"><b>فهم سياسات البيع:</b> تعرف على سياساتنا وشروط الاستخدام الخاصة بالبائعين.</li>
        </ul>
      </section>

      <section className="mb-6 bg-white rounded-md shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">إضافة قوائم المنتجات</h2>
        <p className="text-gray-600 mb-3">تعلم كيفية إضافة منتجاتك أو خدماتك لجعلها مرئية للمشترين:</p>
        <ul className="list-disc pl-5 text-gray-600">
          <li className="mb-2"><b>صور عالية الجودة:</b> استخدم صورًا واضحة وجذابة لمنتجاتك.</li>
          <li className="mb-2"><b>وصف تفصيلي:</b> قدم وصفًا دقيقًا ومفصلًا للمنتج أو الخدمة، بما في ذلك الميزات والمواصفات والحالة.</li>
          <li className="mb-2"><b>تحديد السعر:</b> حدد سعرًا تنافسيًا.</li>
          <li className="mb-2"><b>اختر الفئة المناسبة:</b> تأكد من إدراج منتجك في الفئة الصحيحة.</li>
          <li className="mb-2"><b>تحديد خيارات الشحن:</b> إذا كنت تقدم شحنًا، حدد خيارات الشحن والتكاليف.</li>
        </ul>
      </section>

      <section className="mb-6 bg-white rounded-md shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">إدارة قوائم المنتجات الخاصة بك</h2>
        <p className="text-gray-600 mb-3">نصائح حول كيفية إدارة قوائم المنتجات الخاصة بك بفعالية:</p>
        <ul className="list-disc pl-5 text-gray-600">
          <li className="mb-2"><b>تحديث المخزون:</b> حافظ على تحديث مستويات المخزون لتجنب بيع منتجات غير متوفرة.</li>
          <li className="mb-2"><b>تعديل القوائم:</b> قم بتحديث الأوصاف أو الأسعار أو الصور حسب الحاجة.</li>
          <li className="mb-2"><b>إزالة القوائم:</b> قم بإزالة المنتجات التي لم تعد متوفرة.</li>
        </ul>
      </section>

      <section className="mb-6 bg-white rounded-md shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">التواصل مع المشترين</h2>
        <p className="text-gray-600 mb-3">أفضل الممارسات للتفاعل مع المشترين:</p>
        <ul className="list-disc pl-5 text-gray-600">
          <li className="mb-2"><b>الرد بسرعة:</b> قم بالرد على استفسارات المشترين في أسرع وقت ممكن.</li>
          <li className="mb-2"><b>كن مهذبًا واحترافيًا:</b> حافظ على لهجة مهذبة واحترافية في جميع اتصالاتك.</li>
          <li className="mb-2"><b>تقديم معلومات إضافية:</b> كن مستعدًا لتقديم معلومات إضافية حول منتجاتك.</li>
        </ul>
      </section>

      <section className="mb-6 bg-white rounded-md shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">الدفع والرسوم</h2>
        <p className="text-gray-600 mb-3">معلومات حول عملية الدفع وأي رسوم مرتبطة بالبيع:</p>
        <ul className="list-disc pl-5 text-gray-600">
          <li className="mb-2"><b>طرق الدفع المقبولة:</b> تعرف على طرق الدفع التي يمكنك قبولها.</li>
          <li className="mb-2"><b>رسوم المعاملات:</b> فهم أي رسوم قد يتم تطبيقها على مبيعاتك.</li>
          <li className="mb-2"><b>عملية السحب:</b> معلومات حول كيفية سحب أرباحك.</li>
        </ul>
      </section>

      <section className="mb-6 bg-white rounded-md shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">إرشادات وسياسات البائع</h2>
        <p className="text-gray-600 mb-3">يرجى الالتزام بإرشاداتنا وسياساتنا للحفاظ على بيئة بيع آمنة وعادلة:</p>
        <ul className="list-disc pl-5 text-gray-600">
          <li className="mb-2"><a href="#" className="text-blue-500 hover:underline">سياسات البيع المحظورة</a></li>
          <li className="mb-2"><a href="#" className="text-blue-500 hover:underline">إرشادات جودة القوائم</a></li>
          <li><a href="#" className="text-blue-500 hover:underline">شروط خدمة البائع</a></li>
        </ul>
      </section>

      <p className="text-gray-600 mt-6">إذا كانت لديك أي أسئلة أخرى، يرجى <a href="#" className="text-blue-500 hover:underline">الاتصال بفريق الدعم</a>.</p>
    </div>
  );
};

export default SellerGuide;