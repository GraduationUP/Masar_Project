"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Menu,
  Moon,
  Search,
  Sun,
  Check,
  AlertTriangle,
  UserCheck,
  Megaphone,
  Shield,
  Star,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserInfo } from "@/lib/types";

interface Notifications {
  id: number;
  message: string;
  type_name: string;
  is_read: boolean;
  sent_at: string;
}

export default function Header() {
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    // Check for authToken in localStorage on component mount
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      try {
        setUserInfo(JSON.parse(userInfoString));
      } catch (error) {
        console.error("Error parsing userInfo from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetch(`${BASE_API_URL}/api/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setNotifications(data.notifications));
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "الرئيسية", href: "/" },
    { name: "الخريطة", href: "/map" },
    { name: "السوق", href: "/marketplace" },
  ];

  function HandelLogout() {
    localStorage.removeItem("tokenType");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("authToken");
    redirect("/");
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm"
          : "bg-background/0 border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
          </Link>
          <nav className="hidden md:flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary relative group ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex md:flex-1 md:justify-center px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ابحث عن بضاعة، خدمة او متجر..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px] transition-all duration-300 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isMounted && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-2 rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">تبديل السمة</span>
            </Button>
          )}

          {isLoggedIn ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Notifications"
                    className="relative rounded-full"
                  >
                    <Bell className="h-5 w-5" />
                    {notifications.length !== 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                        {notifications.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-1" align="end">
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id}>
                      <span className="flex items-center gap-1">
                        {(() => {
                          switch (notification.type_name) {
                            case "report":
                              return <AlertTriangle className="h-5 w-5" />;
                            case "notification":
                            case "maintenance":
                            case "update":
                              return <Bell className="h-5 w-5" />;
                            case "account_approved":
                            case "account_suspended":
                              return <UserCheck className="h-5 w-5" />;
                            case "promotion":
                            case "feedback_request":
                            case "policy_update":
                              return <Megaphone className="h-5 w-5" />;
                            case "general_announcement":
                            case "security_alert":
                              return <Shield className="h-5 w-5" />;
                            case "rating":
                            case "comment":
                              return <Star className="h-5 w-5" />;
                            default:
                              return <Check className="h-5 w-5" />;
                          }
                        })()}
                        {notification.message}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(notification.sent_at).toLocaleString(
                          "en-US",
                          {
                            calendar: "gregory",
                          }
                        )}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-background"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {userInfo?.name?.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 mt-1"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userInfo?.name ?? ""}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userInfo?.email ?? ""}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userInfo?.role !== "user" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/${userInfo?.role}/dashboard`}
                        className="cursor-pointer flex items-center"
                      >
                        لوحة التحكم
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/profile/${userInfo?.id}`}
                      className="cursor-pointer"
                    >
                      الملف الشخصي
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <form onSubmit={HandelLogout}>
                    <Button
                      type="submit"
                      variant="ghost"
                      className="cursor-pointer text-left w-full"
                    >
                      تسجيل الخروج
                    </Button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" asChild className="rounded-full">
                <Link href="/login">تسجيل الدخول</Link>
              </Button>
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-[#4bbae6] to-[#4682B4]"
              >
                <Link href="/register">انشاء حساب</Link>
              </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">قائمة التنقل</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-effect">
              <div className="grid gap-6 py-6">
                <div className="space-y-3">
                  <h4 className="font-medium">التنقل</h4>
                  <nav className="grid gap-3">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`text-sm font-medium transition-colors hover:text-primary ${
                          pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">الحساب</h4>
                  <div className="grid gap-3">
                    {isLoggedIn ? (
                      <>
                        <Link
                          href={`/${userInfo?.id ?? ""}/dashboard`}
                          className="text-sm font-medium transition-colors hover:text-primary"
                        >
                          لوحة التحكم
                        </Link>
                        <Link
                          href={`/profile/${userInfo?.id}`}
                          className="text-sm font-medium transition-colors hover:text-primary"
                        >
                          الملف الشخصي
                        </Link>
                        <form onSubmit={HandelLogout}>
                          <button
                            type="submit"
                            className="text-sm font-medium transition-colors hover:text-primary text-left"
                          >
                            تسجيل الخروج
                          </button>
                        </form>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="text-sm font-medium transition-colors hover:text-primary"
                        >
                          تسجيل الدخول
                        </Link>
                        <Link
                          href="/register"
                          className="text-sm font-medium transition-colors hover:text-primary"
                        >
                          انشاء حساب
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
