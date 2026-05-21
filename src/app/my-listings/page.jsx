import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import RoomCard from "@/components/RoomCard";

const MyListingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  console.log(user);
  // console.log(session);
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`http://localhost:5000/rooms/user/${user?.id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const listingsRoom = await res.json();
  console.log(listingsRoom);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1>This is my listing page</h1>
      <div className="grid grid-cols-3 gap-3">
        {listingsRoom.map((r, ind) => (
          <RoomCard key={ind} r={r} />
        ))}
      </div>
    </div>
  );
};

export default MyListingPage;
