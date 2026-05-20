import React from "react";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { BsPersonSquare } from "react-icons/bs";
import { GiEarbuds } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const AvatarDropdown = ({ user }) => {
  const router = useRouter();
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
    <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <Avatar>
          <Avatar.Image alt={user?.name} src={user?.image} />
          <Avatar.Fallback delayMs={600}>{user?.name.charAt(0)}</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image alt={user?.name} src={user?.image} />
              <Avatar.Fallback delayMs={600}>{user?.name.charAt(0)}</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">{user?.name}</p>
              <p className="text-xs leading-none text-muted">{user?.email}</p>
            </div>
          </div>
        </div>
        <Dropdown.Menu>
          <Dropdown.Item id="dashboard" textValue="Dashboard">
            <Link href="/add-room">
              <Label>Add Room</Label>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item id="my-listings" textValue="My Listngs">
            <Link href="/">
              <Label>My Listings</Label>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item id="my-bookings" textValue="My Bookings">
            <Link href="/">
              <Label>My Bookings</Label>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item id="logout" textValue="Logout" variant="danger">
            <div className="flex w-full items-center justify-between gap-2" onClick={handleLogOut}>
              <Label>Log Out</Label>
              <FaArrowUpRightFromSquare className="size-3.5 text-danger" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default AvatarDropdown;
