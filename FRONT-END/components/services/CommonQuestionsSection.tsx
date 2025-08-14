import Image from "next/image";
import ServicesTitle from "./ServicesTitle";

export default function CommonQuestionsSection() {
  return (
    <div className="flex">
      <div className="relative flex-1">
        <Image
          src={"/images/Services.png"}
          alt="Staff"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0">
          <Image
            src={"/ui/Rectangle.svg"}
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex-1">
        <ServicesTitle
          SubTitle="اطلع على الأسئلة الشائعة"
          MainTitle="حافظ على أمان عملك وضمان توفر عالي"
        />
      </div>
    </div>
  );
}