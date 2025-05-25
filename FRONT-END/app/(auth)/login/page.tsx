import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn } from "lucide-react"
import { signInAction } from "@/lib/actions"

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-heading">مرحباً</h1>
          <p className="text-muted-foreground mt-2">سجل الدخول في حسابك في مسار</p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <form action={signInAction}>
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
              <CardDescription>ادخل بياناتك لتتمكن من الدخول لحسابك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">ايميل</Label>
                <Input
                 id="email" name="email" type="email" placeholder="Enter your email" required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password" name="password" type="password" placeholder="Enter your password" required
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-sm font-medium mb-2">حساب تجريبي:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    ahmed@example.com / 123456
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    lina@example.com / mypassword
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    tariq@example.com / pass123
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pt-2">
              <Button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-[#4bbae6] to-[#4682B4]"
              >
                  <div className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    <span>تسجيل الدخول</span>
                  </div>
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                ليس لديك حساب?{" "}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  انشاء حساب
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
