import Header from "@/components/main_layout/header";
import PageTitle from "@/components/main_layout/PageTitle";

export default function EditProduct() {
  return (
    <>
      <Header />
      <PageTitle MainTitle="تعديل المنتجات" Subtitle={`تعديل المنتج {حط اسم المنتج}`} />
    </>
  );
}