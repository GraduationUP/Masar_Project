import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
  title,
  Subtitle,
}: {
  children: React.ReactNode,
  title: string,
  Subtitle: string
}) {
  const router = useRouter();
  return (
    <div className="relative min-h-screen flex">
      {/* Left Half: Image */}
      <div className="hidden lg:block w-1/3 relative">
        <Image
          src={"/AuthPage.svg"}
          alt="صفحة تسجيل الدخول"
          layout="fill"
          objectFit="cover"
          className="object-center"
        />
      </div>

      {/* Right Half: Form */}
      <div className="w-full lg:w-2/3 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="w-full max-w-md mx-auto">
          <div className="my-8">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground mt-2">
              {Subtitle}
            </p>
            <Button
              variant={"ghost"}
              className="absolute rgiht-2 top-5 md:right-16 md:top-14 flex gap-2"
              onClick={() => router.push("/")}
            >
              <ArrowRight />
              <div>الصفحة الرئيسية</div>
            </Button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
