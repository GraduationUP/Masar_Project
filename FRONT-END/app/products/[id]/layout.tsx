import { Metadata } from "next";

export const metadata: Metadata = {
  title: `السوق - البضائع`,
  description: "تصفح العديد من البضائع المحلية عالية الجودة",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
