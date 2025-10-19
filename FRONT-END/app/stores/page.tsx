import Header from "@/components/main_layout/header";
import PageTitle from "@/components/main_layout/PageTitle";
import PageBanner from "@/components/main_layout/PageBanner";
import StoreList from "@/components/stores/storesList";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function StoresPage() {
  const response = await fetch(`${API_URL}/api/guest/stores`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const StoreData = await response.json();

  return (
    <>
      <Header />
      <PageBanner>استكشف عالمًا من المتاجر</PageBanner>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-6">
          <PageTitle
            MainTitle="المتاجر"
            Subtitle="تصفح قائمة المتاجر المحلية المتاحة"
          />
        </div>
        <StoreList StoreData={StoreData.data} />
      </div>
    </>
  );
}
