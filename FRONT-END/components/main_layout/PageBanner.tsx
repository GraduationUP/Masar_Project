import React from "react";

export default function PageBanner({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-no-repeat bg-center bg-cover h-[412px] flex justify-center items-center text-5xl text-white font-bold text-center"
      style={{ backgroundImage: 'url("/Banner.svg")' }}
    >
      {children}
    </div>
  );
}
