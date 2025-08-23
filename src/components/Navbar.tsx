"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "#layanan", label: "Layanan" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#pricing", label: "Pricing" },
  { href: "#kontak", label: "Kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on route change/hash click
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all bg-myprimary`}
      role="banner"
    >
      <nav className="px-5 md:py-0 md:px-0 container lg:w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 py-7"
          aria-label="Tech Craft Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon text-white icon-tabler icons-tabler-outline icon-tabler-tools"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" />
            <path d="M14.5 5.5l4 4" />
            <path d="M12 8l-5 -5l-4 4l5 5" />
            <path d="M7 8l-1.5 1.5" />
            <path d="M16 12l5 5l-4 4l-5 -5" />
            <path d="M16 17l-1.5 1.5" />
          </svg>
          <span className="font-semibold tracking-tight text-white">
            Tech <span className="text-mysecondary">Craft</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-white py-7 px-7 block hover:text-mysecondary transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/login"
            className="inline-flex items-center rounded-lg bg-mysecondary px-10 py-3 text-white text-sm font-medium hover:bg-mysecondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="icon icon-tabler icons-tabler-filled icon-tabler-user mr-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
              <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
            </svg>
            Login
          </Link>
        </div>

        {/* Mobile */}
        <button
          aria-label="Buka menu"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg"
        >
          <span className="sr-only">Menu</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="white"
            className="text-white"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-myprimary">
          <ul className="container space-y-2 pb-5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block rounded-lg px-5 py-2 text-white"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="px-5">
              <Link
                href="/login"
                className="mt-1 inline-flex w-full justify-center rounded-xl bg-mysecondary px-4 py-2 text-white font-medium"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
