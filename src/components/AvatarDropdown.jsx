import React, { useState } from "react";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

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
    // <Dropdown>
    //   <Dropdown.Trigger className="rounded-full">
    //     <Avatar>
    //       <Avatar.Image alt={user?.name} src={user?.image} />
    //       <Avatar.Fallback delayMs={600}>{user?.name.charAt(0)}</Avatar.Fallback>
    //     </Avatar>
    //   </Dropdown.Trigger>
    //   <Dropdown.Popover>
    //     <div className="px-3 pt-3 pb-1">
    //       <div className="flex items-center gap-2">
    //         <Avatar size="sm">
    //           <Avatar.Image alt={user?.name} src={user?.image} />
    //           <Avatar.Fallback delayMs={600}>{user?.name.charAt(0)}</Avatar.Fallback>
    //         </Avatar>
    //         <div className="flex flex-col gap-0">
    //           <p className="text-sm leading-5 font-medium">{user?.name}</p>
    //           <p className="text-xs leading-none text-muted">{user?.email}</p>
    //         </div>
    //       </div>
    //     </div>
    //     <Dropdown.Menu
    //       onAction={(key) => {
    //         setTimeout(() => {
    //           if (key === "add-room") router.push("/add-room");
    //           if (key === "my-listings") router.push("/my-listings");
    //           if (key === "my-bookings") router.push("/my-bookings");
    //           if (key === "logout") handleLogOut();
    //         }, 100);
    //       }}
    //     >
    //       <Dropdown.Item id="dashboard" textValue="Dashboard">
    //         <Link href="/add-room">
    //           <Label>Add Room</Label>
    //         </Link>
    //       </Dropdown.Item>
    //       <Dropdown.Item id="my-listings" textValue="My Listngs">
    //         <Link href="/my-listings">
    //           <Label>My Listings</Label>
    //         </Link>
    //       </Dropdown.Item>
    //       <Dropdown.Item id="my-bookings" textValue="My Bookings">
    //         <Link href="/my-bookings">
    //           <Label>My Bookings</Label>
    //         </Link>
    //       </Dropdown.Item>

    //       <Dropdown.Item id="logout" textValue="Logout" variant="danger">
    //         <div className="flex w-full items-center justify-between gap-2" onClick={handleLogOut}>
    //           <Label>Log Out</Label>
    //           <FaArrowUpRightFromSquare className="size-3.5 text-danger" />
    //         </div>
    //       </Dropdown.Item>
    //     </Dropdown.Menu>
    //   </Dropdown.Popover>
    // </Dropdown>
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="focus:outline-none">
        <Avatar className="cursor-pointer ring-2 ring-amber-500/40 hover:ring-amber-500 transition-all rounded-full">
          <Avatar.Image alt={user?.name} src={user?.image} />
          <Avatar.Fallback delayMs={600} className="bg-[#162d4a] text-white font-medium">
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
              <p className="text-sm font-medium text-white leading-5">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>

            {/* Links */}
            <div className="py-1">
              <Link href="/add-room" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                Add Room
              </Link>
              <Link href="/my-listings" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                My Listings
              </Link>
              <Link href="/my-bookings" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                My Bookings
              </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-white/10 py-1">
              <button onClick={handleLogOut} className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors">
                Log Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AvatarDropdown;
