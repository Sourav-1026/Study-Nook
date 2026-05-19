import RoomCard from "@/components/RoomCard";
import React from "react";

const RoomPage = async () => {
  const res = await fetch("http://localhost:5000/rooms");

  const rooms = await res.json();

  // console.log(rooms);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="text-4xl font-bold text-center mb-6">All Room</h1>
      <div className="grid grid-cols-3 gap-3">
        {rooms.map((r) => (
          <RoomCard key={r._id} r={r} />
        ))}
      </div>
    </div>
  );
};

export default RoomPage;
