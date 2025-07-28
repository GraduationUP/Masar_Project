"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Backpack, PersonStandingIcon } from "lucide-react";

interface RegisterStep1Props {
  onNext: () => void;
  onSelectAccount_type: (account_type: "user" | "seller") => void;
  selectedAccount_type: "user" | "seller";
}

export default function RegisterStep1({
  onNext,
  onSelectAccount_type,
  selectedAccount_type,
}: RegisterStep1Props) {
  return (
    <div className="flex flex-col gap-10">
      {/* User account_type Card */}
      <Button
        onClick={() => onSelectAccount_type("user")}
        className={`flex flex-col group justify-center p-6 rounded-lg border-2 transition-all duration-200 ease-in-out ${
          selectedAccount_type === "user"
            ? "border-blue-500 shadow-lg"
            : "border-gray-200 hover:border-blue-300"
        } h-full`}
        variant="outline"
      >
        <div className="flex justify-between w-full">
          <div className="hidden md:size-14 md:[clip-path:polygon(50%_0%,_100%_38%,_82%_100%,_18%_100%,_0%_38%)] md:flex md:items-center md:justify-center md:bg-green-100 md:text-blue-600 md:mb-4">
            <PersonStandingIcon />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-lg">فردي</div>
            <div className="text-sm text-gray-500 mt-1 group-hover:text-white">
              حساب شخصي لإدارة جميع أنشطتك
            </div>
          </div>
          <div
            className={`mt-4 opacity-0 ${
              selectedAccount_type === "user" && "opacity-100"
            }`}
          >
            <div
              onClick={onNext}
              className={`h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary`}
            >
              <ArrowLeft className="hover:text-white" />
            </div>
          </div>
        </div>
      </Button>

      <Button
        onClick={() => onSelectAccount_type("seller")}
        className={`flex flex-col group justify-center p-6 rounded-lg border-2 transition-all duration-200 ease-in-out ${
          selectedAccount_type === "seller"
            ? "border-blue-500 shadow-lg"
            : "border-gray-200 hover:border-blue-300"
        } h-full`}
        variant="outline"
      >
        <div className="flex w-full justify-between">
          <div className="hidden md:size-14 md:[clip-path:polygon(50%_0%,_100%_38%,_82%_100%,_18%_100%,_0%_38%)] md:flex md:items-center md:justify-center md:bg-green-100 md:text-green-600 md:mb-4">
            <Backpack size={48} />
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">تجاري</div>
            <div className="text-sm text-gray-500 mt-1 flex flex-col group-hover:text-white">
              <span>إذا كنت تمتلك شركة أو صاحب متجر،</span>
              <span>فهذا هو الخيار المناسب لك.</span>
            </div>
          </div>

          <div
            className={`mt-4 opacity-0 ${
              selectedAccount_type === "seller" && "opacity-100"
            }`}
          >
            <div
              onClick={onNext}
              className={`h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary`}
            >
              <ArrowLeft className="hover:text-white" />
            </div>
          </div>
        </div>
      </Button>
    </div>
  );
}
