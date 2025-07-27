"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Backpack, PersonStandingIcon } from "lucide-react";

interface RegisterStep1Props {
  onNext: () => void;
  onSelectRole: (role: "user" | "seller") => void;
  selectedRole: "user" | "seller";
}

export default function RegisterStep1({
  onNext,
  onSelectRole,
  selectedRole,
}: RegisterStep1Props) {
  return (
    <div className="flex flex-col gap-10">
      {/* User Role Card */}
      <Button
        onClick={() => onSelectRole("user")}
        className={`flex flex-col group justify-center p-6 rounded-lg border-2 transition-all duration-200 ease-in-out ${
          selectedRole === "user"
            ? "border-blue-500 shadow-lg"
            : "border-gray-200 hover:border-blue-300"
        } h-full`}
        variant="outline"
      >
        <div className="flex justify-between w-full">
          <div className="size-14 [clip-path:polygon(50%_0%,_100%_38%,_82%_100%,_18%_100%,_0%_38%)] flex items-center justify-center bg-blue-100 text-blue-600 mb-4">
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
              selectedRole === "user" && "opacity-100"
            }`}
          >
            <Button onClick={onNext} variant={"outline"}>
              <ArrowLeft className={`text-primary`} />
            </Button>
          </div>
        </div>
      </Button>

      <Button
        onClick={() => onSelectRole("seller")}
        className={`flex flex-col group justify-center p-6 rounded-lg border-2 transition-all duration-200 ease-in-out ${
          selectedRole === "seller"
            ? "border-blue-500 shadow-lg"
            : "border-gray-200 hover:border-blue-300"
        } h-full`}
        variant="outline"
      >
        <div className="flex w-full justify-between">
          <div className="size-14 [clip-path:polygon(50%_0%,_100%_38%,_82%_100%,_18%_100%,_0%_38%)] flex items-center justify-center bg-green-100 text-green-600 mb-4">
            <Backpack size={48} />
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">تجاري</div>
            <div className="text-sm text-gray-500 mt-1 flex flex-col">
              <span>إذا كنت تمتلك شركة أو تنتمي إليها،</span>
              <span>فهذا هو الخيار المناسب لك.</span>
            </div>
          </div>

          <div
            className={`mt-4 opacity-0 ${
              selectedRole === "seller" && "opacity-100"
            }`}
          >
            <Button onClick={onNext} variant={"outline"}>
              <ArrowLeft className={`text-primary`} />
            </Button>
          </div>
        </div>
      </Button>
    </div>
  );
}
