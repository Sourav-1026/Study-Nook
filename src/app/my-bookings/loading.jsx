import { Spinner } from "@heroui/react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-screen justify-center items-center gap-4">
      <Spinner size="lg" className="text-[#0d1f3c]" />
    </div>
  );
};

export default Loading;
