"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

const RoomCard = ({ r }) => {
  return (
    <motion.div
      className="rounded-xl overflow-hidden flex flex-col border border-white/10 shadow-xl"
      style={{ backgroundColor: "#0d1f3c" }}
      key={r._id}
      whileHover={{ y: -8, scale: 1.02, boxShadow: "0px 20px 40px rgba(0,0,0,0.4)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Image with overlay gradient */}
      <div className="relative">
        <Image src={r.imageUrl} alt={r.roomName} width={400} height={400} className="w-full h-52 object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0d1f3c] to-transparent" />
        {/* Floor & Capacity badges overlaid on image */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/20">Floor {r.floor}</span>
          <span className="bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/20">{r.capacity} people</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <h3 className="text-white text-lg font-bold tracking-tight">{r.roomName}</h3>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{r.description}</p>

        {/* Rate */}
        <div className="flex items-end gap-1">
          <span className="text-amber-400 text-2xl font-bold">${r.rate}</span>
          <span className="text-white/40 text-sm mb-0.5">/hr</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 flex-1 content-start">
          {r.amenities.map((a, ind) => (
            <span key={ind} className="text-xs text-white/70 bg-white/10 border border-white/10 px-2.5 py-1 rounded-full">
              {a}
            </span>
          ))}
        </div>

        {/* Button */}
        <Link href={`/rooms/${r._id}`} className="mt-4 block">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button className="w-full rounded-lg bg-amber-400 text-[#0d1f3c] font-semibold hover:bg-amber-300 transition-colors flex items-center justify-center gap-2">
              View Details
              <FaArrowRightLong />
            </Button>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default RoomCard;
