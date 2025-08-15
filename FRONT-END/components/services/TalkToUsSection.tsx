import Image from "next/image";
import ServicesTitle from "./ServicesTitle";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function TalkToUsSection() {
  return (
    <div className="flex container bg-primary text-white p-16 rounded-lg">
      <div
        className="flex-1 hidden md:block"
        style={{
          background: 'url("/OurServices/shape-img.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Image
          src="/OurServices/contact-img.png"
          alt="TalkToUs"
          width={500}
          height={500}
        />
      </div>
      <div className="flex-1">
        <ServicesTitle
          SubTitle="تحدث الينا"
          MainTitle="كيف يمكننا مساعدتك"
          white
        />
        <form className="flex flex-col gap-4">
          <div className="flex w-full gap-4">
            <div className="flex-1">
              <Label htmlFor="email">بريدك الالكتروني*</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="بريدك الالكتروني"
                required
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="name">اسمك*</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="اسمك"
                required
              />
            </div>
          </div>
          <Label htmlFor="message">رسالتك*</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="رسالتك"
            required
          ></Textarea>
          <Button variant={"secondary"} type="submit">
            ارسال الرسالة
          </Button>
        </form>
      </div>
    </div>
  );
}
