"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import AvatarDropdown from "./AvatarDropdown";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { MdLogin } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
    ...(user
      ? [
          { href: "/add-room", label: "Add Room" },
          { href: "/my-listings", label: "My Listings" },
          { href: "/my-bookings", label: "My Bookings" },
        ]
      : []),
  ];

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <p className="font-bold text-lg">StudyNook</p>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`text-sm transition-colors pb-1 ${isActive(link.href) ? "border-b-2 border-[#0d1f3c] text-[#0d1f3c] font-medium" : "hover:text-[#0d1f3c]"}`}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-1.5">
          {user ? (
            <AvatarDropdown user={user} />
          ) : (
            <>
              <Link href="/login">
                <Button className="rounded-none bg-transparent text-[#0d1f3c] border border-[#0d1f3c]">
                  Login
                  <MdLogin />
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="rounded-none bg-[#0d1f3c] text-white">
                  Register
                  <MdLogin />
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-3">
          {user && <AvatarDropdown user={user} />}
          <button onClick={() => setMenuOpen((prev) => !prev)} className="text-[#0d1f3c] text-2xl focus:outline-none" aria-label="Toggle menu">
            {menuOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </button>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-separator bg-background/95 backdrop-blur-lg px-6 py-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium transition-colors block py-1 ${isActive(link.href) ? "border-l-2 border-[#0d1f3c] pl-3 text-[#0d1f3c]" : "hover:text-[#0d1f3c]"}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {!user && (
            <div className="flex flex-col gap-2 pt-2 border-t border-separator">
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <Button className="rounded-none bg-transparent text-[#0d1f3c] border border-[#0d1f3c] hover:bg-[#0d1f3c] hover:text-white w-full">
                  Login
                  <BiLogIn />
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)}>
                <Button className="rounded-none bg-[#0d1f3c] text-white w-full hover:bg-white hover:text-[#0d1f3c]">Register</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
