import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مسار - الخريطة",
  description: "استكشف الخدمات المتاحة في المدينة من خلال الخريطة التفاعلية",
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
