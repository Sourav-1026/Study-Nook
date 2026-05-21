"use client";

import { authClient } from "@/lib/auth-client";
import { FieldError, Input, Label, ListBox, TextField, Select, TextArea, Button, Card, SelectItem, Checkbox } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddRoomPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const [amenities, setAmenities] = useState([]);

  const handleAmenityChange = (value, checked) => {
    setAmenities((prev) => (checked ? [...prev, value] : prev.filter((a) => a !== value)));
  };

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const room = Object.fromEntries(formData.entries());

    const finalRoom = {
      ...room,
      amenities: [...amenities],
      userId: user?.id,
    };

    console.log(finalRoom);

    try {
      const { data: tokenData } = await authClient.token();
      console.log(tokenData);
      const res = await fetch("http://localhost:5000/rooms", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(finalRoom),
      });

      const data = await res.json();

      if (data) {
        console.log("Room added successfully!", data.insertedId);
        toast.success("Room Added Successfully", {
          position: "top-center",
        });
        router.push("/rooms");

        // e.g. router.push("/rooms") or show a toast
      } else {
        console.error("Failed to add room:", data.message);
        toast.error("Failed to add room:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="text-5xl font-bold mb-6">Add Room</h1>
      <Card className="border border-gray-300 rounded-none bg-[#0d1f3c]">
        <form onSubmit={onSubmit} className="p-10 space-y-8 w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Room Name */}
            <div className="md:col-span-2">
              <TextField name="roomName" isRequired>
                <Label className="text-white">Room Name</Label>
                <Input placeholder="Enter the room name" className="rounded-none" />
                <FieldError />
              </TextField>
            </div>

            {/* Floor */}
            <TextField name="floor" type="number" isRequired>
              <Label className="text-white">Floor</Label>
              <Input placeholder="Enter the floor number" className="rounded-none" />
              <FieldError />
            </TextField>

            {/* Hourly Rate */}
            <TextField name="rate" type="number" isRequired>
              <Label className="text-white">Hourly Rate (USD)</Label>
              <Input type="number" placeholder="Enter the hourly rate" className="rounded-none" />
              <FieldError />
            </TextField>

            {/* Capacity */}
            <div className="md:col-span-2">
              <TextField name="capacity" type="number" isRequired>
                <Label className="text-white">Capacity</Label>
                <Input placeholder="Enter the number of people" className="rounded-none" />
                <FieldError />
              </TextField>
            </div>

            {/* Image URL - Removed preview */}
            <div className="md:col-span-2">
              <TextField name="imageUrl" isRequired>
                <Label className="text-white">Image URL</Label>
                <Input type="url" placeholder="https://example.com/library-room.jpg" className="rounded-none" />
                <FieldError />
              </TextField>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <TextField name="description" isRequired>
                <Label className="text-white">Description</Label>
                <TextArea placeholder="Describe the room details..." className="rounded-none" />
                <FieldError />
              </TextField>
            </div>
          </div>

          <div className="">
            <Label className="text-white mb-3">Amenities</Label>

            <div className="border-t border-gray-300 my-4"></div>

            <div className="grid grid-cols-3 gap-1.5">
              <div className="p-1.5 bg-blue-950">
                <Checkbox id="whiteboard" onChange={(checked) => handleAmenityChange("Whiteboard", checked)}>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Content>
                    <Label className="text-white" htmlFor="whiteboard">
                      Whiteboard
                    </Label>
                  </Checkbox.Content>
                </Checkbox>
              </div>

              <div className="p-1.5 bg-blue-950">
                <Checkbox id="projector" onChange={(checked) => handleAmenityChange("Projector", checked)}>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Content>
                    <Label className="text-white" htmlFor="projector">
                      Projector
                    </Label>
                  </Checkbox.Content>
                </Checkbox>
              </div>

              <div className="p-1.5 bg-blue-950">
                <Checkbox id="wifi" onChange={(checked) => handleAmenityChange("Wi-Fi", checked)}>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Content>
                    <Label className="text-white" htmlFor="wifi">
                      Wi-Fi
                    </Label>
                  </Checkbox.Content>
                </Checkbox>
              </div>

              <div className="p-1.5 bg-blue-950">
                <Checkbox id="power-outlets" onChange={(checked) => handleAmenityChange("Power Outlets", checked)}>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Content>
                    <Label className="text-white" htmlFor="power-outlets">
                      Power Outlets
                    </Label>
                  </Checkbox.Content>
                </Checkbox>
              </div>

              <div className="p-1.5 bg-blue-950">
                <Checkbox id="quiet-zone" onChange={(checked) => handleAmenityChange("Quiet Zone", checked)}>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Content>
                    <Label className="text-white" htmlFor="quiet-zone">
                      Quiet Zone
                    </Label>
                  </Checkbox.Content>
                </Checkbox>
              </div>

              <div className="p-1.5 bg-blue-950">
                <Checkbox id="air-conditioning" onChange={(checked) => handleAmenityChange("Air Conditioning", checked)}>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Content>
                    <Label className="text-white" htmlFor="air-conditioning">
                      Air Conditioning
                    </Label>
                  </Checkbox.Content>
                </Checkbox>
              </div>
            </div>
          </div>

          {/* Buttons */}

          <Button type="submit" variant="ghost" className=" rounded-none w-full bg-transparent text-white border border-white">
            Add Room
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddRoomPage;
