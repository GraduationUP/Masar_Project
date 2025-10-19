"use client";

import Image from "next/image";
import ServicesTitle from "./ServicesTitle";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { sendEmail } from "@/lib/resend";
import { CustomAlert } from "../ui/customAlert";
import { useState } from "react";

export default function TalkToUsSection() {
  function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    sendEmail(name, email, message);
    setSuccess(true);
  }
  const [success, setSuccess] = useState(false);
  return (
    <div className="flex container bg-primary text-white p-16 rounded-lg">
      <CustomAlert
        message="تم ارسال رسالتك بنجاح"
        show={success}
        onClose={() => setSuccess(false)}
        success
      />
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
        <form className="flex flex-col gap-4" onSubmit={send}>
          <div className={`md:flex md:w-full md:gap-4`}>
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
            className="text-foreground"
          />
          <Button variant={"secondary"} type="submit">
            ارسال الرسالة
          </Button>
        </form>
      </div>
    </div>
  );
}
