"use client";

import React from "react";
import { useState, useMemo } from "react";
import { Button } from "@heroui/react";
import EditModal from "@/components/EditModal";
import DeleteModal from "@/components/DeleteModal";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const TIME_SLOTS = Array.from({ length: 13 }, (_, i) => {
  const hour = 8 + i;
  return { value: String(hour), label: `${String(hour).padStart(2, "0")}:00` };
});

const BookingCard = ({ room }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user);

  const { _id, roomName, floor, capacity, rate, imageUrl, amenities } = room;

  const [date, setDate] = useState(null);
  const [startHour, setStartHour] = useState(null);
  const [endHour, setEndHour] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //   console.log(new Date(date));
  //   console.log(startHour, endHour);

  const totalCost = useMemo(() => {
    if (!startHour || !endHour) return null;
    return (Number(endHour) - Number(startHour)) * rate;
  }, [startHour, endHour, rate]);

  const handleBooking = async () => {
    setIsLoading(true);

    try {
      const bookingData = {
        userId: user?.id,
        userEmail: user?.email,
        userImage: user?.image,
        userName: user?.name,
        roomId: _id,
        roomName,
        price: totalCost,
        roomImage: imageUrl,
        roomCapacity: capacity,
        roomFloor: floor,
        roomAmenities: amenities,
        bookingDate: new Date(date),
        bookingStartHour: startHour,
        bookingEndHour: endHour,
        roomStatus: "Confirmed",
      };

      const { data: tokenData } = await authClient.token();

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Booking failed. Please try again.");
        return;
      }

      toast.success("Room booked successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:pt-2">
      <div className="sticky top-8 bg-[#1a1714] text-[#f7f4ef] p-8">
        {/* Rate */}
        <p className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-[#a09880] mb-1">Hourly Rate</p>
        <div className="flex items-end gap-1 mb-1">
          <span className="font-display text-6xl font-normal leading-none text-[#f7f4ef]">${rate}</span>
        </div>

        <div className="w-full h-px bg-white/10 mb-8 mt-4" />

        {/* Date */}
        <div className="flex flex-col gap-1 mb-5">
          <label className="text-[0.6rem] tracking-[0.22em] uppercase text-[#a09880]">Date</label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={date ?? ""}
            onChange={(e) => setDate(e.target.value)}
            className="h-11 px-3 bg-white/5 border border-white/10 text-[#f7f4ef] rounded-none text-sm focus:outline-none focus:border-[#c9a96e] hover:border-white/30 transition-colors scheme-dark"
          />
        </div>

        {/* Start / End Time */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          {/* Start Time */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.6rem] tracking-[0.22em] uppercase text-[#a09880]">Start Time</label>
            <select
              value={startHour ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                setStartHour(val);
                if (endHour && Number(endHour) <= Number(val)) setEndHour(null);
              }}
              className="h-11 px-3 bg-white/5 border border-white/10 text-[#f7f4ef] rounded-none text-sm focus:outline-none focus:border-[#c9a96e] hover:border-white/30 transition-colors"
            >
              <option value="" disabled className="bg-[#1a1714]">
                08:00
              </option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot.value} value={slot.value} className="bg-[#1a1714] text-[#f7f4ef]">
                  {slot.label}
                </option>
              ))}
            </select>
          </div>

          {/* End Time */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.6rem] tracking-[0.22em] uppercase text-[#a09880]">End Time</label>
            <select
              value={endHour ?? ""}
              disabled={!startHour}
              onChange={(e) => setEndHour(e.target.value)}
              className="h-11 px-3 bg-white/5 border border-white/10 text-[#f7f4ef] rounded-none text-sm focus:outline-none focus:border-[#c9a96e] hover:border-white/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="" disabled className="bg-[#1a1714]">
                09:00
              </option>
              {TIME_SLOTS.filter((s) => Number(s.value) > Number(startHour)).map((slot) => (
                <option key={slot.value} value={slot.value} className="bg-[#1a1714] text-[#f7f4ef]">
                  {slot.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Total Cost */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-[#a09880] mb-1">Total Cost</p>
            {startHour && endHour && (
              <p className="font-body text-[0.65rem] text-[#6b6358]">
                {Number(endHour) - Number(startHour)}h × ${rate}
              </p>
            )}
          </div>
          <span className="font-display text-5xl font-normal leading-none text-[#f7f4ef] transition-all duration-300">{totalCost !== null ? `$${totalCost}` : "—"}</span>
        </div>

        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Details */}
        <div className="space-y-4 mb-8">
          {[
            { key: "Room", val: roomName },
            { key: "Floor", val: floor },
            { key: "Capacity", val: `${capacity} People` },
          ].map(({ key, val }) => (
            <div key={key} className="flex justify-between items-center">
              <span className="font-body text-[0.6rem] tracking-[0.18em] uppercase text-[#6b6358]">{key}</span>
              <span className="font-display text-base text-[#c8bfb0]">{val}</span>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Book Now Button */}

        <Button
          onClick={handleBooking}
          disabled={isLoading}
          className="font-body block w-full  text-center text-[0.7rem] tracking-[0.28em] uppercase font-medium bg-[#d4a853] text-[#1a1714] hover:bg-[#f7f4ef] hover:tracking-[0.35em] transition-all duration-300"
        >
          Book Now
        </Button>

        {/* Edit & Delete Buttons */}
        <div className="flex gap-3 mt-4">
          <EditModal room={room} />
          <DeleteModal room={room} />
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
