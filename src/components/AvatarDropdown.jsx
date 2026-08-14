import React, { useState } from "react";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";

const AvatarDropdown = ({ user }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  if (!user) return null;
  // const {name, image, email} = user;
  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.warning("User Successfully logged out");
          router.push("/login"); // redirect to login page
        },
      },
    });
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="focus:outline-none">
        <Avatar className="cursor-pointer ring-2 ring-amber-500/40 hover:ring-amber-500 transition-all rounded-full">
          <Avatar.Image alt={user?.name} src={user?.image} />
          <Avatar.Fallback
            delayMs={600}
            className="bg-[#162d4a] text-white font-medium"
          >
            {user?.name.charAt(0)}
          </Avatar.Fallback>
        </Avatar>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-12 z-20 w-52 bg-[#0d1f3c] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            {/* User info */}
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-sm font-medium text-white leading-5">
                {user?.name}
              </p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>

            {/* Links */}
            <div className="py-1">
              <Link
                href="/add-room"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                Add Room
              </Link>
              <Link
                href="/my-listings"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                My Listings
              </Link>
              <Link
                href="/my-bookings"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                My Bookings
              </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-white/10 py-1">
              <button
                onClick={handleLogOut}
                className="w-full flex items-center gap-1.5 text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
              >
                Log Out
                <FiLogOut />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AvatarDropdown;
