import React from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

const Navbar = () => {
  const links = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/">Rooms</Link>
      </li>
      <li>
        <Link href="/">Add Room</Link>
      </li>
      <li>
        <Link href="/">My Listings</Link>
      </li>
      <li>
        <Link href="/">My Bookings</Link>
      </li>
    </>
  );

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <p className="font-bold">StudyNook</p>
        </div>
        <ul className="flex items-center gap-4">{links}</ul>
        <div className="flex items-center gap-1.5">
          <Button className="rounded-none bg-transparent text-[#0d1f3c] border border-[#0d1f3c]">Login</Button>
          <Button className="rounded-none bg-[#0d1f3c]">Register</Button>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
