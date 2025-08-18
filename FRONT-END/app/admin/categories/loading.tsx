import Header from "@/components/main_layout/header";
import PageTitle from "@/components/main_layout/PageTitle";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <>
      <Header />
      <PageTitle MainTitle="ادارة الفئات" Arrow />
      <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
    </>
  );
}
