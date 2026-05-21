"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="container mx-auto bg-linear-to-r from-[#0d1f3c] via-black to-[#101d42] my-10">
      <div className="p-5 text-center space-y-6 py-20">
        <motion.h1 className="text-4xl text-white font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          Find Your Perfect Study Room
        </motion.h1>

        <motion.p className="text-gray-500 font-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
          Browse and book quiet, private study rooms in your library. <br /> List your own room and earn.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
          <Link href="/rooms">
            <Button className="rounded-md bg-transparent text-white border border-white">
              Explore
              <FaArrowRightLong />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
