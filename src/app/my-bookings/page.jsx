import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import CancelModal from "@/components/CancelModal";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`http://localhost:5000/bookings/${user?.id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const bookings = await res.json();

  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-4xl font-bold text-center">My Bookings</h1>
      <p className="text-sm text-gray-500 mt-3 text-center">Manage your upcoming and past room reservations.</p>

      {bookings.length === 0 ? (
        <div className="mt-6">
          <p>You have no bookings yet.</p>
        </div>
      ) : (
        <>
          {/* Desktop table - lg and above */}
          <div className="hidden lg:block mt-6">
            <table className="w-[80%] border border-gray-200 mx-auto bg-[#0d1f3c] rounded-xl overflow-hidden">
              <thead>
                <tr className="border-b border-white/10">
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
                  <tr key={b._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Image src={b.roomImage} alt={b.roomName} width={60} height={60} className="object-cover rounded" />
                        <span className="font-medium text-sm text-white">{b.roomName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-300">{new Date(b.bookingDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</td>
                    <td className="px-4 py-4 text-sm text-slate-300">
                      {String(b.bookingStartHour).padStart(2, "0")}:00 – {String(b.bookingEndHour).padStart(2, "0")}:00
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-white">${b.price}</td>
                    <td className={`px-4 py-4 text-sm ${b.roomStatus == "Cancelled" ? "text-red-500" : "text-green-600"}`}>{b.roomStatus}</td>
                    <td className="px-4 py-4">
                      <CancelModal b={b} user={user} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout - sm and md */}
          <div className="lg:hidden mt-6 flex flex-col gap-4">
            {bookings.map((b) => (
              <div key={b._id} className="bg-[#0d1f3c] rounded-xl p-4 border border-white/10">
                {/* Room info */}
                <div className="flex items-center gap-3 mb-4">
                  <Image src={b.roomImage} alt={b.roomName} width={60} height={60} className="object-cover rounded" />
                  <span className="font-semibold text-white text-base">{b.roomName}</span>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mb-4">
                  <div>
                    <p className="text-[0.65rem] tracking-widest uppercase text-[#a09880] mb-0.5">Date</p>
                    <p className="text-slate-300">{new Date(b.bookingDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] tracking-widest uppercase text-[#a09880] mb-0.5">Time</p>
                    <p className="text-slate-300">
                      {String(b.bookingStartHour).padStart(2, "0")}:00 – {String(b.bookingEndHour).padStart(2, "0")}:00
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] tracking-widest uppercase text-[#a09880] mb-0.5">Cost</p>
                    <p className="text-white font-medium">${b.price}</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] tracking-widest uppercase text-[#a09880] mb-0.5">Status</p>
                    <p className="text-slate-300">{b.roomStatus}</p>
                  </div>
                </div>

                {/* Action */}
                <div className="border-t border-white/10 pt-3">
                  <CancelModal b={b} user={user} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyBookingsPage;
