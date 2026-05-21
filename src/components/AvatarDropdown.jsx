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
      <button onClick={() => setOpen(!open)}>
        <Avatar className="cursor-pointer">
          <Avatar.Image alt={user?.name} src={user?.image} />
          <Avatar.Fallback delayMs={600}>{user?.name.charAt(0)}</Avatar.Fallback>
        </Avatar>
      </button>

      {open && (
        <>
          {/* backdrop to close on outside click */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-12 z-20 w-48 bg-white shadow-lg border border-black/10">
            <div className="px-4 py-3 border-b border-black/10">
              <p className="text-sm font-medium leading-5">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <Link href="/add-room" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm hover:bg-black/5">
              Add Room
            </Link>
            <Link href="/my-listings" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm hover:bg-black/5">
              My Listings
            </Link>
            <Link href="/my-bookings" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm hover:bg-black/5">
              My Bookings
            </Link>
            <button onClick={handleLogOut} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-black/5">
              Log Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AvatarDropdown;
