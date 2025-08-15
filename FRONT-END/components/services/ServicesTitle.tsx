import Image from "next/image";

export default function ServicesTitle({
  MainTitle,
  SubTitle,
  centralize = false,
  white = false
}: {
  MainTitle: string;
  SubTitle: string;
  centralize?: boolean;
  white?: boolean;
}) {
  return (
    <div className={`flex flex-col ${centralize ? "items-center" : ""} my-12`}>
      <div className="flex items-center">
        <Image
          src="/ui/Arrow.svg"
          alt="Arrow"
          width={50}
          height={50}
          className={white ? "filter grayscale" : ""}
          style={{ filter: white ? "brightness(500%) contrast(500%)" : "" }}
        />
        <span className={`${white ? "text-white" : "text-primary"}`}>{SubTitle}</span>
        <Image
          src="/ui/Arrow.svg"
          alt="Arrow"
          width={50}
          height={50}
          className={white ? "filter grayscale rotate-180" : "rotate-180"}
          style={{ filter: white ? "brightness(500%) contrast(500%)" : "" }}
        />
      </div>
      <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
        {MainTitle}
      </h2>
    </div>
  );
}
