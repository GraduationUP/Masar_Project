import Image from "next/image";

export default function ServicesTitle({
  MainTitle,
  SubTitle,
  centralize = false,
}: {
  MainTitle: string;
  SubTitle: string;
  centralize?: boolean;
}) {
  return (
    <div className={`flex flex-col ${centralize ? "items-center" : ""}`}>
      <div className="flex items-center">
        <Image src="/ui/Arrow.svg" alt="Arrow" width={50} height={50} />
        <span className="text-primary">{SubTitle}</span>
        <Image
          src="/ui/Arrow.svg"
          alt="Arrow"
          width={50}
          height={50}
          className="rotate-180"
        />
      </div>
      <h2 className="text-5xl font-bold tracking-tight md:text-3xl">
        {MainTitle}
      </h2>
    </div>
  );
}
