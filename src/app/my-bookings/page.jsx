import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { Button } from "@heroui/react";
import CancelModal from "@/components/CancelModal";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const res = await fetch(`http://localhost:5000/bookings/${user?.id}`);
  const bookings = await res.json();

  //   const handleCancel = () => {};

  return (
    <div className="container mx-auto my-10">
      <h1>My Bookings</h1>
      <p>Manage your upcoming and past room reservations.</p>

      {bookings.length == 0 ? (
        <div>
          <p>You have no bookings yet.</p>
        </div>
      ) : (
        <table className=" w-[80%] border border-gray-200 mx-auto mt-6">
          <thead>
            <tr className="border-b border-[#1a1714]/10">
              <th className="text-left text-[0.65rem] tracking-[0.2em] uppercase text-[#a09880] px-4 py-3">Room</th>
              <th className="text-left text-[0.65rem] tracking-[0.2em] uppercase text-[#a09880] px-4 py-3">Date</th>
              <th className="text-left text-[0.65rem] tracking-[0.2em] uppercase text-[#a09880] px-4 py-3">Time</th>
              <th className="text-left text-[0.65rem] tracking-[0.2em] uppercase text-[#a09880] px-4 py-3">Cost</th>
              <th className="text-left text-[0.65rem] tracking-[0.2em] uppercase text-[#a09880] px-4 py-3">Status</th>
              <th className="text-left text-[0.65rem] tracking-[0.2em] uppercase text-[#a09880] px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-b border-[#1a1714]/10 hover:bg-[#1a1714]/5 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Image src={b.roomImage} alt={b.roomName} width={60} height={60} className="object-cover" />
                    <span className="font-medium text-sm">{b.roomName}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-[#4a4540]">
                  {new Date(b.bookingDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-4 text-sm text-[#4a4540]">
                  {String(b.bookingStartHour).padStart(2, "0")}:00 – {String(b.bookingEndHour).padStart(2, "0")}:00
                </td>
                <td className="px-4 py-4 text-sm font-medium">${b.price}</td>
                <td className="px-4 py-4 text-sm">{b.roomStatus}</td>
                <td className="px-4 py-4">
                  <CancelModal b={b} user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBookingsPage;
