"use client";

import React from "react";
import { AlertDialog, Button } from "@heroui/react";
import { toast } from "react-toastify";
import { LiaMinusSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";

const CancelModal = ({ b }) => {
  const router = useRouter();

  const handleCancel = async () => {
    const res = await fetch(`http://localhost:5000/bookings/${b._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ roomStatus: "Cancelled" }),
    });

    const data = await res.json();
    console.log(data);
    if (data) {
      toast.warning("You Room Booking is successfully cancelled");
      router.refresh();
    }
  };

  return (
    <AlertDialog>
      {b.roomStatus == "Cancelled" ? (
        <LiaMinusSolid size={40} className="text-yellow-400" />
      ) : (
        <Button className="bg-transparent rounded-none text-black text-[0.7rem] tracking-[0.15em] uppercase px-4 py-2 border border-[#1a1714] hover:bg-[#1a1714] hover:text-white transition-colors duration-200">
          Cancel
        </Button>
      )}

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel room booking permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently cancel the booking of room <strong>{b.roomName}</strong>. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button onClick={handleCancel} slot="close" variant="danger">
                Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default CancelModal;
