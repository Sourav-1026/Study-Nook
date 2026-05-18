import { Button } from "@heroui/react";
import Image from "next/image";
import React from "react";
import RoomCard from "./RoomCard";

const AvailableStudyRooms = async () => {
  const res = await fetch("http://localhost:5000/rooms");

  const rooms = await res.json();

  console.log(rooms);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="text-4xl font-bold text-center mb-6">Available Study Rooms</h1>
      <div className="grid grid-cols-3 gap-3">
        {rooms.slice(0, 3).map((r) => (
          <RoomCard key={r._id} r={r} />
        ))}
      </div>
    </div>
  );
};

export default AvailableStudyRooms;
