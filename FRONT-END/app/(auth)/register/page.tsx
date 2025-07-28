"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RegisterStep1 from "./step1";
import RegisterStep2 from "./step2";
import AuthLayout from "@/components/auth/AuthLayout";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.3,
    },
  }),
};

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<"user" | "seller">("user");
  const [direction, setDirection] = useState(0);

  const handleNextStep = () => {
    setDirection(1); 
    setCurrentStep(2);
  };

  const handlePreviousStep = () => {
    setDirection(-1); 
    setCurrentStep(1);
  };

  const handleSelectRole = (selectedRole: "user" | "seller") => {
    setRole(selectedRole);
  };

  return (
    <AuthLayout title="تسجيل جديد!" Subtitle="للبدء في هذه الرحلة، أخبرنا بنوع الحساب الذي ترغب في فتحه.">
      <div className="relative overflow-hidden min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          {currentStep === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full max-w-md p-4"
            >
              <RegisterStep1
                onNext={handleNextStep}
                onSelectRole={handleSelectRole}
                selectedRole={role}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full max-w-md p-4"
            >
              <RegisterStep2 role={role} onPrevious={handlePreviousStep} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthLayout>
  );
}
