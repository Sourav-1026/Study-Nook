"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { FaFacebookSquare, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter, FaRegEnvelope } from "react-icons/fa6";

const linkMap = {
  Rooms: "/rooms",
  "Add Room": "/add-room",
  "My Listings": "/my-listings",
  "My Bookings": "/my-bookings",
};

const Footer = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const allLinks = ["Rooms", "Add Room", "My Listings", "My Bookings"];
  const publicLinks = ["Rooms"];
  const privateLinks = ["Add Room", "My Listings", "My Bookings"];

  const visibleLinks = user ? allLinks : publicLinks;

  return (
    <footer className="relative overflow-hidden bg-[#0d1f3c] text-[#e8edf5]">
      {/* Glow effects */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(99,160,255,0.12)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -left-16 bottom-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(77,220,180,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-10 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left gap-10">
          {/* Brand */}
          <div>
            <p className="mb-1.5 flex justify-center md:justify-start items-center gap-2 text-xl font-bold tracking-tight text-white text-center md:text-left">StudyNook</p>

            <p className="mt-3.5 text-sm font-light leading-relaxed text-[rgba(232,237,245,0.55)]">
              A secure, user-friendly library management platform. Add study rooms, book available spaces, and manage your schedule in one organized environment.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[2px] text-[rgba(232,237,245,0.35)]">Useful Links</p>
            <ul className="flex flex-col  gap-3">
              {visibleLinks.map((link) => (
                <li key={link} className="group flex justify-center md:justify-start cursor-pointer items-center gap-2 text-sm text-[rgba(232,237,245,0.65)] transition-colors hover:text-white">
                  <span className="h-px w-3.5 bg-[rgba(99,160,255,0.4)] transition-all duration-300 group-hover:w-5 group-hover:bg-[#63a0ff]" />
                  <Link href={linkMap[link]}>{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[2px] text-[rgba(232,237,245,0.35)]">Contact</p>
            <div className="flex flex-col  gap-3.5">
              {[
                { Icon: FaRegEnvelope, label: "studynook@gmail.com" },
                { Icon: FaPhoneAlt, label: "01954 844 656" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center justify-center md:justify-start gap-2.5 text-sm text-[rgba(232,237,245,0.65)]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center md:justify-left rounded-lg border border-[rgba(99,160,255,0.2)] bg-[rgba(99,160,255,0.1)] text-sm">
                    <Icon className="text-base" />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[2px] text-[rgba(232,237,245,0.35)]">Socials</p>
            <div className="flex flex-col gap-2.5">
              {[
                { Icon: FaFacebookSquare, label: "Facebook" },
                { Icon: FaSquareXTwitter, label: "Twitter / X" },
                { Icon: FaLinkedin, label: "LinkedIn" },
                { Icon: FaSquareInstagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm text-[rgba(232,237,245,0.6)] transition-all hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.07)] hover:text-white"
                >
                  <Icon className="text-base" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14  border-t border-[rgba(232,237,245,0.08)] py-5">
          <p className="font-mono text-center text-xs text-[rgba(232,237,245,0.3)]">© {new Date().getFullYear()} StudyNook — All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
