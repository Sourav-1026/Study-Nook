"use client";

import { authClient } from "@/lib/auth-client";
import { FieldError, Input, Label, TextField, TextArea, Button, Card, Checkbox } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const amenitiesList = [
  { id: "whiteboard", label: "Whiteboard" },
  { id: "projector", label: "Projector" },
  { id: "wifi", label: "Wi-Fi" },
  { id: "power-outlets", label: "Power Outlets" },
  { id: "quiet-zone", label: "Quiet Zone" },
  { id: "air-conditioning", label: "Air Conditioning" },
];

const AddRoomPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [amenities, setAmenities] = useState([]);
  const router = useRouter();

  const handleAmenityChange = (value, checked) => {
    setAmenities((prev) => (checked ? [...prev, value] : prev.filter((a) => a !== value)));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const room = Object.fromEntries(formData.entries());
    const finalRoom = { ...room, amenities: [...amenities], userId: user?.id };

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(finalRoom),
      });
      const data = await res.json();
      if (data) {
        toast.success("Room Added Successfully", { position: "top-center" });
        router.push("/rooms");
      } else {
        toast.error("Failed to add room: " + data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-950">Add Room</h1>
        <p className="text-slate-700 text-sm mt-1">Fill in the details below to list a new room.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Section: Basic Info */}
        <div className="bg-[#0d1f3c] rounded-2xl p-6 sm:p-8 border border-white/10">
          <h2 className="text-white text-sm font-semibold tracking-widest uppercase mb-6 pb-3 border-b border-white/10">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Room Name */}
            <div className="sm:col-span-2">
              <TextField name="roomName" isRequired>
                <Label className="text-slate-400 text-xs tracking-widest uppercase mb-1.5 block">Room Name</Label>
                <Input
                  placeholder="e.g. Digital Learning Room"
                  className="w-full bg-[#162d4a] border border-[#1e3a5f] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <FieldError className="text-red-400 text-xs mt-1" />
              </TextField>
            </div>

            {/* Floor */}
            <TextField name="floor" type="number" isRequired>
              <Label className="text-slate-400 text-xs tracking-widest uppercase mb-1.5 block">Floor</Label>
              <Input
                placeholder="e.g. 3"
                className="w-full bg-[#162d4a] border border-[#1e3a5f] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            {/* Hourly Rate */}
            <TextField name="rate" type="number" isRequired>
              <Label className="text-slate-400 text-xs tracking-widest uppercase mb-1.5 block">Hourly Rate (USD)</Label>
              <Input
                placeholder="e.g. 25"
                className="w-full bg-[#162d4a] border border-[#1e3a5f] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            {/* Capacity */}
            <div className="sm:col-span-2">
              <TextField name="capacity" type="number" isRequired>
                <Label className="text-slate-400 text-xs tracking-widest uppercase mb-1.5 block">Capacity (people)</Label>
                <Input
                  placeholder="e.g. 10"
                  className="w-full bg-[#162d4a] border border-[#1e3a5f] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <FieldError className="text-red-400 text-xs mt-1" />
              </TextField>
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <TextField name="imageUrl" isRequired>
                <Label className="text-slate-400 text-xs tracking-widest uppercase mb-1.5 block">Image URL</Label>
                <Input
                  type="url"
                  placeholder="https://example.com/room.jpg"
                  className="w-full bg-[#162d4a] border border-[#1e3a5f] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <FieldError className="text-red-400 text-xs mt-1" />
              </TextField>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <TextField name="description" isRequired>
                <Label className="text-slate-400 text-xs tracking-widest uppercase mb-1.5 block">Description</Label>
                <TextArea
                  placeholder="Describe the room — layout, features, ideal use..."
                  rows={4}
                  className="w-full bg-[#162d4a] border border-[#1e3a5f] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
                <FieldError className="text-red-400 text-xs mt-1" />
              </TextField>
            </div>
          </div>
        </div>

        {/* Section: Amenities */}
        <div className="bg-[#0d1f3c] rounded-2xl p-6 sm:p-8 border border-white/10">
          <h2 className="text-white text-sm font-semibold tracking-widest uppercase mb-1">Amenities</h2>
          <p className="text-slate-400 text-xs mb-6 pb-3 border-b border-white/10">Select all that apply to this room.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {amenitiesList.map(({ id, label }) => (
              <div
                key={id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${
                  amenities.includes(label) ? "border-amber-500 bg-amber-500/10" : "border-[#1e3a5f] bg-[#162d4a] hover:border-slate-500"
                }`}
              >
                <Checkbox id={id} isSelected={amenities.includes(label)} onChange={(checked) => handleAmenityChange(label, checked)}>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Content>
                    <Label className="text-white text-sm cursor-pointer" htmlFor={id}>
                      {label}
                    </Label>
                  </Checkbox.Content>
                </Checkbox>
              </div>
            ))}
          </div>
          {amenities.length > 0 && (
            <p className="text-amber-400 text-xs mt-4">
              {amenities.length} amenit{amenities.length === 1 ? "y" : "ies"} selected
            </p>
          )}
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-[#0d1f3c] font-semibold text-sm py-3 rounded-xl transition-colors">
          Add Room
        </Button>
      </form>
    </div>
  );
};

export default AddRoomPage;
