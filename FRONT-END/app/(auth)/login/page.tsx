"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginSuccessResponse, LoginErrorResponse } from "@/lib/types";
import AuthLayout from "@/components/auth/AuthLayout";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData: LoginErrorResponse = await response.json();
        setError(
          errorData.message || "Login failed. Please check your credentials."
        );
        return;
      }

      const data: LoginSuccessResponse = await response.json();

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("tokenType", data.token_type);
      localStorage.setItem("userInfo", JSON.stringify(data.user_info));

      router.push("/");
    } catch (err: any) {
      console.error("Error during sign-in:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authToken")) {
      router.push("/");
    }
  }, [router]);

  return (
    <AuthLayout title="مرحباً" Subtitle="أدخل بياناتك لتتمكن من الدخول لحسابك">
      <Card className="border-border/50 shadow-lg">
        <form onSubmit={handleLogin}>
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
            <CardDescription>
              ادخل بياناتك لتتمكن من الدخول لحسابك
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">ايميل</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">كلمة المرور</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-2">
            <Button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-[#4bbae6] to-[#4682B4]"
              disabled={loading} // Disable button while loading
            >
              <div className="flex items-center gap-2">
                {loading ? (
                  "جاري تسجيل الدخول..."
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    <span>تسجيل الدخول</span>
                  </>
                )}
              </div>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ليس لديك حساب?
              <Link
                href="/register"
                className="text-primary hover:underline font-medium"
              >
                انشاء حساب
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </AuthLayout>
  );
};

export default LoginPage;
