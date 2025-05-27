"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { signUpAction } from "@/lib/actions"

export default function RegisterPage() {
  const [role, setRole] = useState<"user" | "seller">("user")

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">انشئ حساب جديد</CardTitle>
          <CardDescription>ادخل بياناتك لتنشئ حساب في مسار</CardDescription>
        </CardHeader>
        <form action={signUpAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">الاسم الأول</Label>
              <Input
                id="firstName" name="firstName" placeholder="الاسم الأول" required
              />
              <Label htmlFor="lastName">اسم العائلة</Label>
              <Input
                id="lastName" name="lastName" placeholder="اسم العائلة" required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">اسم المستخدم</Label>
              <Input id="username" name="username" placeholder="اسم المستخدم" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">ايميل</Label>
              <Input
                id="email" name="email" type="email" placeholder="name@gmail.com" required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password" name="password" type="password" required
              />
            </div>
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
            <Button type="submit" className="w-full">
              انشاء حساب
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              لديك حساب بالفعل?{" "}
              <Link href="/login" className="text-primary hover:underline">
                تسجيل الدخول
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
