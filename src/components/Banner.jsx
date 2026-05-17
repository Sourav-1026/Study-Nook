import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="container mx-auto bg-linear-to-r from-[#0d1f3c] via-black to-[#101d42] my-10">
      <div className="p-5 text-center space-y-6 py-20">
        <h1 className="text-4xl text-white font-bold">Find Your Perfect Study Room</h1>
        <p className="text-gray-500 font-lg">
          Browse and book quiet, private study rooms in your library. <br /> List your own room and earn.
        </p>
        <Link href="/rooms">
          <Button className="rounded-none bg-transparent text-white border border-white">Explore</Button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
