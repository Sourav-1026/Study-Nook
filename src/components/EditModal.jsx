"use client";

import React, { useState } from "react";
import { Button, Card, Checkbox, FieldError, Input, Label, Modal, Surface, TextArea, TextField } from "@heroui/react";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EditModal = ({ room }) => {
  const router = useRouter();
  const { _id, description, imageUrl, capacity, rate, floor, roomName } = room;

  const [amenities, setAmenities] = useState([]);

  const handleAmenityChange = (value, checked) => {
    setAmenities((prev) => (checked ? [...prev, value] : prev.filter((a) => a !== value)));
  };

  //   const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const room = Object.fromEntries(formData.entries());

    const finalRoom = {
      ...room,
      amenities: [...amenities],
    };

    console.log(finalRoom);

    try {
      const res = await fetch(`http://localhost:5000/rooms/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(finalRoom),
      });

      const data = await res.json();
      console.log(data);

      if (data) {
        console.log("Room added successfully!", data.insertedId);
        toast.success("Room Updated Successfully", {
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
    <Modal>
      <Button className="font-body flex-1 rounded-none bg-transparent text-[#d4a853] border border-[#d4a853] text-[0.65rem] tracking-[0.2em] uppercase">Edit Room</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-3xl bg-[#0d1f3c] rounded-none">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <FaRegEdit />
              </Modal.Icon>
              <Modal.Heading className="text-center text-2xl font-semibold text-white">Edit Room</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <Card className=" rounded-none bg-[#0d1f3c]">
                  <form onSubmit={onSubmit} className="p-10 space-y-8 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Room Name */}
                      <div className="md:col-span-2">
                        <TextField name="roomName" isRequired defaultValue={roomName}>
                          <Label className="text-white">Room Name</Label>
                          <Input placeholder="Enter the room name" className="rounded-none" />
                          <FieldError />
                        </TextField>
                      </div>

                      {/* Floor */}
                      <TextField name="floor" type="number" isRequired defaultValue={floor}>
                        <Label className="text-white">Floor</Label>
                        <Input placeholder="Enter the floor number" className="rounded-none" />
                        <FieldError />
                      </TextField>

                      {/* Hourly Rate */}
                      <TextField name="rate" type="number" isRequired defaultValue={rate}>
                        <Label className="text-white">Hourly Rate (USD)</Label>
                        <Input type="number" placeholder="Enter the hourly rate" className="rounded-none" />
                        <FieldError />
                      </TextField>

                      {/* Capacity */}
                      <div className="md:col-span-2">
                        <TextField name="capacity" type="number" isRequired defaultValue={capacity}>
                          <Label className="text-white">Capacity</Label>
                          <Input placeholder="Enter the number of people" className="rounded-none" />
                          <FieldError />
                        </TextField>
                      </div>

                      {/* Image URL - Removed preview */}
                      <div className="md:col-span-2">
                        <TextField name="imageUrl" isRequired defaultValue={imageUrl}>
                          <Label className="text-white">Image URL</Label>
                          <Input type="url" placeholder="https://example.com/library-room.jpg" className="rounded-none" />
                          <FieldError />
                        </TextField>
                      </div>

                      {/* Description */}
                      <div className="md:col-span-2">
                        <TextField name="description" isRequired defaultValue={description}>
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
                    <Modal.Footer>
                      <Button slot="close" className="text-[#0d1f3c] bg-white">
                        Cancel
                      </Button>
                      <Button type="submit" slot="close" className=" text-[#0d1f3c] bg-white ">
                        Update Room
                      </Button>
                    </Modal.Footer>
                  </form>
                </Card>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditModal;
