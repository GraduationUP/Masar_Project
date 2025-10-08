import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { userFeedback } from "@/types/store";

interface Props {
  isUser: boolean;
  notOwner: boolean;
  userfeedback: userFeedback;
  addFav: () => void;
  data: any;
}

export default function StoreActionButtons({
  isUser,
  notOwner,
  userfeedback,
  addFav,
  data,
}: Props) {
  return (
    <div className="flex flex-wrap gap-1 items-center">
      <Button variant="outline" className="gap-2 rounded-full">
        <Image
          src="/whatsapp.svg"
          alt="whatsapp logo"
          className="h-4 w-4"
          width={50}
          height={50}
        />
        <Link
          href={`https://wa.me/${data?.phone.replace(/\D|\+/g, "")}`}
          target="_blank"
        >
          WhatsApp
        </Link>
      </Button>
      {isUser && notOwner && (
        <Button variant="outline" className="rounded-full" onClick={addFav}>
          {userfeedback.is_favorite ? (
            <Image
              src={"/ui/Heart-full.svg"}
              alt="heart"
              width={50}
              height={50}
              className="h-5 w-5"
            />
          ) : (
            <Image
              src={"/ui/Heart-empty.svg"}
              alt="heart"
              width={50}
              height={50}
              className="h-5 w-5"
            />
          )}
        </Button>
      )}
    </div>
  );
}
