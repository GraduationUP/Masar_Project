"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] py-12 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">حدث خطأ ما!</h1>
        <p className="text-muted-foreground">
          نعتذر عن أي إزعاج. حدث خطأ غير متوقع.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => reset()}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            حاول مجدداً
          </Button>
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-[#3a5f8a] to-[#699ecb] hover:from-[#2f4d6d] hover:to-[#5a8ec0]"
          >
            <Link href="/">الرجوع للصفحة الرئيسية</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
