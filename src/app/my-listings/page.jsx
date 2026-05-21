import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import RoomCard from "@/components/RoomCard";
import Link from "next/link";
import { Button } from "@heroui/react";
import { BsCalendarX } from "react-icons/bs";

export const metadata = {
  title: "StudyNook | My Listings",
  description: "...",
};

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/user/${user?.id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const listingsRoom = await res.json();
  console.log(listingsRoom);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="text-4xl text-center font-bold mb-6">My Listings</h1>
      {listingsRoom.length == 0 ? (
        <div className="container mx-auto mt-6 flex flex-col justify-center items-center py-20 gap-4">
          <div className="bg-[#0d1f3c] p-6 rounded-full">
            <BsCalendarX className="text-amber-400 text-5xl" />
          </div>
          <h2 className="text-2xl font-bold text-[#0d1f3c]">No Listings Room Yet</h2>
          <p className="text-gray-500 text-sm">You haven't add any room for listings. Start by adding rooms.</p>
          <Link href="/rooms">
            <Button className="bg-[#0d1f3c] text-white hover:bg-amber-400 hover:text-[#0d1f3c] font-semibold px-6 rounded-lg transition-colors">Browse Rooms</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {listingsRoom.map((r, ind) => (
            <RoomCard key={ind} r={r} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListingPage;
