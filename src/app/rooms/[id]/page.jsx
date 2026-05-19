import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import EditModal from "@/components/EditModal";
import DeleteModal from "@/components/DeleteModal";

const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/rooms/${id}`);
  const room = await res.json();

  const { description, imageUrl, capacity, rate, floor, roomName, amenities } = room;

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#1a1714]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* ── Hero Image ── */}
      <div className="relative h-[90vh] w-full overflow-hidden">
        <Image
          src={imageUrl || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80"}
          alt={roomName}
          fill
          priority
          className="object-cover brightness-[0.6] scale-105 hover:scale-100 transition-transform duration-8000 ease-out"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-[#f7f4ef]" />

        {/* Hero Text */}
        <div className="absolute bottom-0 left-0 px-8 md:px-16 pb-0">
          <h1 className="font-display text-blue-950 text-6xl md:text-8xl font-normal leading-[0.92] tracking-tight">
            {roomName?.split(" ").slice(0, -1).join(" ")} <em className="text-[#d4a853]">{roomName?.split(" ").slice(-1)}</em>
          </h1>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-350 mx-auto px-8 md:px-16 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
          {/* ── Left Column ── */}
          <div>
            {/* Description */}
            <div className="mb-12">
              <div className="w-12 h-px bg-[#d4a853] mb-6" />
              <p className="font-body text-[0.65rem] tracking-[0.25em] uppercase text-[#d4a853] mb-4">About This Room</p>
              <p className="font-display text-xl font-normal leading-relaxed text-[#4a4540] max-w-150">{description}</p>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-10 mb-14 pb-14 border-b border-[#1a1714]/10">
              {[
                { value: capacity, label: "People" },
                { value: `${floor}`, label: "Floor" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="font-display text-5xl font-normal text-[#1a1714] leading-none">{value}</span>
                  <span className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-[#a09880]">{label}</span>
                </div>
              ))}
            </div>

            {/* Amenities — mapped from array */}
            <div>
              <p className="font-body text-[0.65rem] tracking-[0.25em] uppercase text-[#d4a853] mb-6">Room Amenities</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
                {amenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 py-3 border-b border-black/6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4a853] shrink-0" />
                    <span className="font-body text-sm text-[#6b6358]">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column — Booking Card ── */}
          <div className="lg:pt-2">
            <div className="sticky top-8 bg-[#1a1714] text-[#f7f4ef] p-8">
              {/* Rate */}
              <p className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-[#a09880] mb-1">Hourly Rate</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="font-display text-6xl font-normal leading-none text-[#f7f4ef]">${rate}</span>
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
              <Link
                href={`/rooms/${id}/book`}
                className="font-body block w-full py-4 text-center text-[0.7rem] tracking-[0.28em] uppercase font-medium bg-[#d4a853] text-[#1a1714] hover:bg-[#f7f4ef] hover:tracking-[0.35em] transition-all duration-300"
              >
                Book Now
              </Link>

              {/* Edit & Delete Buttons */}
              <div className="flex gap-3 mt-4">
                <EditModal room={room} />

                <DeleteModal room={room} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
