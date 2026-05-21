import RoomCard from "@/components/RoomCard";
import Searchbar from "@/components/Searchbar";
import React from "react";

const RoomPage = async ({ searchParams }) => {
  const sParams = await searchParams;
  console.log(sParams);

  const params = new URLSearchParams();
  if (sParams.search) params.set("search", sParams.search);
  if (sParams.amenities) params.set("amenities", sParams.amenities);
  if (sParams.minRate) params.set("minRate", sParams.minRate);
  if (sParams.maxRate) params.set("maxRate", sParams.maxRate);

  const fetchUrl = `http://localhost:5000/rooms?${params.toString()}`;
  console.log(fetchUrl);
  const res = await fetch(fetchUrl, { cache: "no-store" });
  const rooms = await res.json();

  // console.log(rooms);

  return (
    <div className="container mx-auto my-10">
      <div>
        <h1 className="text-4xl font-bold text-center mb-6">All Room</h1>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-auto">
            <Searchbar />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 px-4 md:px-0">
            {rooms.map((r) => (
              <RoomCard key={r._id} r={r} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
