import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RoomCard = ({ r }) => {
  return (
    <div className="shadow-md rounded-md border border-gray-300 flex flex-col" key={r._id}>
      <Image src={r.imageUrl} alt={r.roomName} width={400} height={400} className="w-full object-cover rounded-md" />

      <div className="p-5 space-y-4 flex-1">
        <p className="text-lg font-semibold">Room Name: {r.roomName}</p>
        <p className="text-shadow-md">Description: {r.description}</p>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-blue-950 px-3">
            <p className="text-lg font-semibold  text-white">Floor: {r.floor}</p>
          </div>
          <div className="bg-blue-950 px-3">
            <p className="text-lg font-semibold text-white">Capacity: {r.capacity} people</p>
          </div>
        </div>
        <p className="font-semibold">
          Rate:
          <span className="text-2xl font-semibold"> ${r.rate}</span>/hr
        </p>
        <p className="text-lg font-semibold">Amenities:</p>
        <div className="flex flex-wrap gap-1.5 ">
          {r.amenities.map((a, ind) => (
            <div className="p-3 bg-blue-900 text-white rounded-md" key={ind}>
              {a}
            </div>
          ))}
        </div>
      </div>
      <Link href={`/rooms/${r._id}`}>
        <Button className="rounded none w-full bg-[#0d1f3c] mt-auto">View Details</Button>
      </Link>
    </div>
  );
};

export default RoomCard;
