"use client";

import React from "react";
import { AlertDialog, Button } from "@heroui/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const DeleteModal = ({ room }) => {
  const router = useRouter();
  const { _id, roomName } = room;

  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();
    console.log(tokenData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
    });

    const data = await res.json();
    console.log(data);

    if (data) {
      toast.warning("Room deleted successfully");
      router.push("/rooms");
    }
  };

  return (
    <AlertDialog>
      <Button className="flex-1 rounded-xl bg-transparent text-red-400 border border-red-400 text-xs tracking-widest uppercase px-4 py-2 hover:bg-red-400/10 transition-colors">Delete</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="bg-[#0d1f3c] rounded-2xl border border-white/10 w-full max-w-sm mx-4 sm:mx-auto">
            <AlertDialog.CloseTrigger className="text-slate-400 hover:text-white" />

            <AlertDialog.Header className="px-6 pt-6 pb-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <AlertDialog.Icon status="danger" />
                </div>
                <AlertDialog.Heading className="text-lg font-semibold text-white">Delete Room?</AlertDialog.Heading>
              </div>
            </AlertDialog.Header>

            <AlertDialog.Body className="px-6 py-4">
              <p className="text-slate-400 text-sm leading-relaxed">
                This will permanently delete <span className="text-white font-medium">{roomName}</span> and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
              <Button slot="close" className="flex-1 bg-[#162d4a] hover:bg-[#1e3a5f] text-slate-300 text-sm font-medium py-2.5 rounded-xl border border-[#1e3a5f] transition-colors">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" className="flex-1 bg-red-500 hover:bg-red-400 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                Delete Room
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteModal;
