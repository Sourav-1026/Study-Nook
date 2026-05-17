"use client";

import { FieldError, Input, Label, ListBox, TextField, Select, TextArea, Button, Card } from "@heroui/react";
import React from "react";

const AddRoomPage = () => {
  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const room = Object.fromEntries(formData.entries());

    console.log(room);
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
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
