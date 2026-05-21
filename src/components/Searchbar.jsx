"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const amenitiesList = ["Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "Air Conditioning"];

export default function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");

  console.log(search, selectedAmenities, minRate, maxRate);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedAmenities.length > 0) params.set("amenities", selectedAmenities.join(","));
    if (minRate) params.set("minRate", minRate);
    if (maxRate) params.set("maxRate", maxRate);

    router.push(`/rooms?${params.toString()}`);
  };

  const handleReset = () => {
    setSearch("");
    setSelectedAmenities([]);
    setMinRate("");
    setMaxRate("");
    router.push("/rooms");
  };

  return (
    <div className="px-4 md:px-0">
      <div className="bg-[#0d1f3c] rounded-2xl p-7 w-full lg:max-w-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className=""></div>
          <div className="flex items-center gap-3">
            <button onClick={handleReset} className="text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <button onClick={handleReset} className="text-slate-400 hover:text-white text-sm transition-colors bg-transparent border-none cursor-pointer">
              Reset
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <label className="block text-slate-400 text-xs mb-2">Search by room name</label>
          <div className="relative flex flex-col gap-2">
            <svg
              className="absolute left-3 top-5 -translate-y-1/2 text-slate-500 w-4 h-4 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="e.g. Digital Learning Room"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#162d4a] border border-[#1e3a5f] rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <Button onClick={handleSearch} className={"rounded-md bg-amber-500 hover:bg-amber-400 text-[#0d1f3c]"}>
              Search
            </Button>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <p className="text-slate-400 text-xs mb-4">Amenities</p>
          <div className="flex flex-col gap-3">
            {amenitiesList.map((amenity) => {
              const checked = selectedAmenities.includes(amenity);
              return (
                <label key={amenity} onClick={() => handleAmenityChange(amenity)} className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center shrink-0 transition-colors ${checked ? "bg-amber-500" : "bg-transparent"}`}>
                    {checked && (
                      <svg
                        className="w-3 h-3 text-[#0d1f3c]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-sm select-none">{amenity}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Hourly Rate */}
        <div>
          <p className="text-slate-400 text-xs mb-3">Hourly rate ($)</p>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Min"
              value={minRate}
              onChange={(e) => setMinRate(e.target.value)}
              className="flex-1 w-1/2 bg-[#162d4a] border border-[#1e3a5f] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxRate}
              onChange={(e) => setMaxRate(e.target.value)}
              className="flex-1 w-1/2 bg-[#162d4a] border border-[#1e3a5f] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
