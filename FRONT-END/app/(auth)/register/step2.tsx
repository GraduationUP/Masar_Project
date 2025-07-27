"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RegistrationResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface RegisterStep2Props {
  role: "user" | "seller";
  onPrevious: () => void;
}

export default function RegisterStep2({
  role,
  onPrevious,
}: RegisterStep2Props) {
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
  const [onFocus, setOnFocus] = useState(false);

  const isAnyFieldEmpty =
    [firstName, lastName, username, email, password].some(
      (field) => field === ""
    ) || confirmPassword === "";

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

    if (password !== confirmPassword) {
      setRegistrationError("كلمة المرور غير متطابقة");
      setIsSubmitting(false);
      return;
    }

    const registrationData = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: password,
      role: role,
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
        router.push("/login");
      } else {
        const errorData = await response.json();
        setRegistrationError(errorData.message || "Registration failed");
      }
    } catch (error) {
      setRegistrationError("An unexpected error occurred");
      console.error("Error during registration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      router.push("/");
    }
  }, [router]);

  return (
    <Card className="mx-auto w-full">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Button
            variant="ghost"
            onClick={onPrevious}
            className="absolute top-4 left-4"
          >
            <ArrowLeft className="text-primary" />
            العودة
          </Button>
          <h2 className="text-2xl font-bold text-center mb-6 pt-10">
            تسجيل حساب جديد ({role === "user" ? "فردي" : "تجاري"})
          </h2>
          <div className="space-y-2">
            <Label htmlFor="firstName">الاسم الأول</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="الاسم الأول"
              required
              value={firstName}
              onChange={handleInputChange}
            />
            <Label htmlFor="lastName">اسم العائلة</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="اسم العائلة"
              required
              value={lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">اسم المستخدم</Label>
            <Input
              id="username"
              name="username"
              placeholder="اسم المستخدم"
              required
              value={username}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">الايميل</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={handleInputChange}
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
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnFocus(false)}
            />
          </div>
          {password !== confirmPassword && onFocus && (
            <p className="font-bold text-red-400">كلمة المرور غير متطابقة</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={
              isAnyFieldEmpty || password !== confirmPassword || isSubmitting
            }
          >
            {isSubmitting ? "جاري انشاء الحساب..." : "انشاء حساب"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-primary hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </CardFooter>
      </form>
      {registrationMessage && (
        <p className="mt-4 text-green-500 text-center">{registrationMessage}</p>
      )}
      {registrationError && (
        <p className="mt-4 text-red-500 text-center">{registrationError}</p>
      )}
    </Card>
  );
}
