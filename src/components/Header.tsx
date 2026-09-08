"use client";

import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/plans", label: "Plans" },
  { href: "/menu", label: "15-Day Menu" },
  { href: "/whats-cooking-tomorrow", label: "Tomorrow" },
  { href: "/regional-food-stories", label: "Regional Stories" },
  { href: "/chefs-corner", label: "Chef's Corner" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Fixed, not sticky: the header takes no space in flow, so the page background (the
  // hero's cream) runs behind it, and a 100svh hero really is one screen.
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="mx-auto flex max-w-[1720px] items-center justify-between rounded-[28px] border border-brand-red/10 bg-paper/95 px-4 py-2.5 shadow-[0_10px_30px_-12px_rgba(175,20,17,0.18)] backdrop-blur-md sm:px-6">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo-dabbawala.png"
            alt="Mumbai Dabbawala — since 1890"
            width={614}
            height={149}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[15px] px-3.5 py-2 text-sm font-semibold text-ink/75 transition-colors hover:bg-brand-cream hover:text-brand-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <Link
            href="/contact"
            className="rounded-[15px] px-4 py-2 text-sm font-semibold text-ink/75 transition-colors hover:text-brand-red"
          >
            Contact
          </Link>
          <Button href="/plans" variant="red" size="sm">
            Order Your Dabba
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-[15px] text-brand-red xl:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-[1720px] rounded-[24px] border border-brand-red/10 bg-paper p-3 shadow-xl xl:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-ink/80 hover:bg-brand-cream hover:text-brand-red"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-semibold text-ink/80 hover:bg-brand-cream hover:text-brand-red"
            >
              Contact
            </Link>
            <Button
              href="/plans"
              onClick={() => setOpen(false)}
              variant="red"
              size="md"
              className="mt-1 w-full"
            >
              Order Your Dabba
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
