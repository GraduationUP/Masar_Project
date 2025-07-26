"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RegistrationResponse } from "@/lib/types";
import { redirect, useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";

export default function RegisterPage() {
  const [role, setRole] = useState<"user" | "seller">("user");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [onFocus, setOnFocues] = useState(false);
  const isAnyFieldEmpty = [
    firstName,
    lastName,
    username,
    email,
    password,
  ].every((field) => field === "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    setIsSubmitting(true);
    event.preventDefault();
    setRegistrationMessage("");
    setRegistrationError("");

    const registrationData = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: password,
      account_type: role,
    };

    try {
      const response = await fetch(`${BASE_API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        const data: RegistrationResponse = await response.json();
        setRegistrationMessage(data.message);
        setIsSubmitting(false);
        // Optionally redirect the user or clear the form
      } else {
        const errorData = await response.json();
        setRegistrationError(errorData.message || "Registration failed");
      }
    } catch (error) {
      setRegistrationError("An unexpected error occurred");
      console.error("Error during registration:", error);
      setIsSubmitting(false);
    } finally {
      redirect("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      router.push("/");
    }
  });

  return (
    <AuthLayout title="سجل حساب جديد!" Subtitle="لأغراض تنظيم حسابك، مطلوب تفاصيلك.">
      <div className="min-h-[calc(100vh-8rem)]">
        <Card className="mx-auto max-w-md w-full">
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">الاسم الأول</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="الاسم الأول"
                  required
                  value={firstName} // Added value prop
                  onChange={handleInputChange} // Added onChange prop
                />
                <Label htmlFor="lastName">اسم العائلة</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="اسم العائلة"
                  required
                  value={lastName} // Added value prop
                  onChange={handleInputChange} // Added onChange prop
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">اسم المستخدم</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="اسم المستخدم"
                  required
                  value={username} // Added value prop
                  onChange={handleInputChange} // Added onChange prop
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">ايميل</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@gmail.com"
                  required
                  value={email} // Added value prop
                  onChange={handleInputChange} // Added onChange prop
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password} // Added value prop
                  onChange={handleInputChange} // Added onChange prop
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setOnFocues(true)}
                  onBlur={() => setOnFocues(false)}
                />
              </div>
              {password !== confirmPassword && onFocus && (
                <p className="font-bold text-red-400">
                  كلمة المرور غير متطابقة
                </p>
              )}
              <div className="space-y-2">
                <Label>نوع الحساب</Label>
                <RadioGroup
                  defaultValue="user"
                  value={role}
                  onValueChange={(value) => setRole(value as "user" | "seller")}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user" className="cursor-pointer">
                      مستكشف
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seller" id="seller" />
                    <Label htmlFor="seller" className="cursor-pointer">
                      بائع
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full"
                disabled={
                  isAnyFieldEmpty ||
                  password !== confirmPassword ||
                  isSubmitting
                }
              >
                {isSubmitting ? "جاري انشاء الحساب..." : "انشاء حساب"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                لديك حساب بالفعل?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  تسجيل الدخول
                </Link>
              </p>
            </CardFooter>
          </form>
          {registrationMessage && (
            <p className="mt-4 text-green-500">{registrationMessage}</p>
          )}
          {registrationError && (
            <p className="mt-4 text-red-500">{registrationError}</p>
          )}
        </Card>
      </div>
    </AuthLayout>
  );
}
