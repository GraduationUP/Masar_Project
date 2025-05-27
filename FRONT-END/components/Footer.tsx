import Link from "next/link"
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-2xl gradient-heading">مسار</span>
            </Link>
            <p className="text-muted-foreground">
              اكتشف البائعين المحليين والخدمات الاساسية في محيطك.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider">المنصة</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/map"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/70"></span>
                  الخريطة
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/70"></span>
                  السوق
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/70"></span>
                  الخدمات
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider">المراجع</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/help"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/70"></span>
                  مركز المساعدة
                </Link>
              </li>
              <li>
                <Link
                  href="/seller-guide"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/70"></span>
                  دليل البائع
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/70"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-1">
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider">ابقى على اتصال</h3>
            <p className="text-sm text-muted-foreground mb-4">
              اشترك لتصلك احدث العروض والأخبار.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input type="email" placeholder="email" className="rounded-full" />
              <Button className="rounded-full bg-gradient-to-r from-[#4bbae6] to-[#4682B4]">
                اشترك
              </Button>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>غزة، فلسطين</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@masar.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>00970 123456789</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()}مسار، جميع الحقوق محفوظة</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
