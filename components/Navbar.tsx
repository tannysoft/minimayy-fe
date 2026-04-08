"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Sparkle from "./Sparkle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/category/facial-care-review", label: "Facial Care" },
  { href: "/category/moisturizer-review", label: "Moisturizer" },
  { href: "/tags", label: "Tags" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Disclosure
      as="header"
      className={`sticky top-0 z-40 backdrop-blur-md transition-colors ${
        scrolled
          ? "bg-cream-100/85 border-b border-sand-300/40"
          : "bg-cream-100/60"
      }`}
    >
      {({ open }) => (
        <>
          <nav className="mx-auto max-w-7xl px-5 lg:px-10 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="Minimayy Blog"
            >
              <Sparkle
                size={18}
                className="text-gold animate-twinkle group-hover:text-taupe-600 transition-colors"
              />
              <span className="font-display text-2xl tracking-tight text-taupe-700">
                Minimayy
              </span>
              <span className="text-[10px] uppercase tracking-luxe text-taupe-600 hidden sm:inline mt-1">
                Blog
              </span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-9">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] uppercase tracking-luxe text-taupe-700 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="hidden lg:block">
              <Link
                href="/about#contact"
                className="inline-flex items-center gap-2 border border-taupe-700 text-taupe-700 px-5 py-2 text-[11px] uppercase tracking-luxe hover:bg-taupe-700 hover:text-cream-100 transition-colors rounded-full"
              >
                Collaborate
                <Sparkle size={10} />
              </Link>
            </div>

            {/* Mobile toggle */}
            <DisclosureButton className="lg:hidden text-taupe-700 p-2">
              <span className="sr-only">Toggle navigation</span>
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {open ? (
                  <path d="M6 6 L18 18 M6 18 L18 6" strokeLinecap="round" />
                ) : (
                  <path
                    d="M4 7 H20 M4 12 H20 M4 17 H20"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </DisclosureButton>
          </nav>

          <DisclosurePanel className="lg:hidden border-t border-sand-300/40 bg-cream-100/95 backdrop-blur-md">
            <ul className="px-5 py-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block py-2 text-sm uppercase tracking-luxe text-taupe-700 hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href="/about#contact"
                  className="inline-flex items-center gap-2 border border-taupe-700 text-taupe-700 px-5 py-2 text-[11px] uppercase tracking-luxe rounded-full"
                >
                  Collaborate
                  <Sparkle size={10} />
                </Link>
              </li>
            </ul>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
