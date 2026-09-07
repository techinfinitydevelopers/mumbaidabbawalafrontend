"use client";

import Image from "next/image";
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
          className="flex items-center gap-2.5 sm:gap-3"
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
          {/* the mark carries "Since 1890"; Perth is the part this launch adds */}
          <span className="hidden border-l border-brand-red/15 pl-2.5 font-body text-phi-0 font-bold tracking-[0.2em] text-ink/55 sm:block">
            PERTH
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-ink/75 transition-colors hover:bg-brand-cream hover:text-brand-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <Link
            href="/contact"
            className="rounded-full px-4 py-2 text-sm font-semibold text-ink/75 transition-colors hover:text-brand-red"
          >
            Contact
          </Link>
          <Link
            href="/plans"
            className="rounded-full bg-brand-red px-5 py-2.5 text-sm font-bold text-brand-cream shadow-[0_8px_20px_-6px_rgba(175,20,17,0.6)] transition-transform hover:-translate-y-0.5 hover:bg-brand-orange"
          >
            Order Your Dabba
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-full text-brand-red xl:hidden"
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
            <Link
              href="/plans"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-brand-red px-4 py-3 text-center text-sm font-bold text-brand-cream"
            >
              Order Your Dabba
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
