"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CTASection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <>
      {!isLoggedIn && (
        <section className="container px-4 md:px-6 section-padding">
          <div className="text-center rounded-2xl bg-[url('/Banner.svg')] bg-no-repeat bg-cover p-8 md:p-12 lg:p-16 text-white">
            <div className=" flex flex-col gap-8 items-center justify-between">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ينتابك الفضول حول المتاجر القريبة ؟
              </h2>
              <p className="text-white/80 text-lg">
                انضم لمسار حتى يوفر لك كل التحديثات الخاصة بالمتاجر المحلية
                القريبة منك
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-lg text-primary"
                asChild
              >
                <Link href="/login">انضم الآن</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
