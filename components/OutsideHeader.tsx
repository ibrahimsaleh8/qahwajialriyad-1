"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { HeaderData } from "@/lib/responseType";
import Link from "next/link";

const navLinks = [
  { href: "/outside-saudi/#home", label: "الرئيسية" },
  { href: "/outside-saudi/#about", label: "من نحن" },
  { href: "/outside-saudi/#services", label: "خدماتنا" },
  { href: "/blog", label: "خدمات الضيافة" },
  { href: "/outside-saudi/#why-us", label: "لماذا نحن" },
  { href: "/outside-saudi/#gallery", label: "معرض الصور" },
  { href: "/outside-saudi/#contact", label: "تواصل معنا" },
];

export function OutsideHeader({
  brandName,
  telephone,
}: HeaderData & { telephone?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white backdrop-blur-md shadow text-[hsl(var(--foreground)/0.8)]}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/#home"
            className="flex items-center gap-3 text-2xl font-bold">
            {brandName}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[hsl(var(--primary))] transition-colors font-medium">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              target="_blank"
              href={`tel:${telephone}`}
              className="bg-main-color hover:opacity-75 text-white px-6 py-3 rounded-lg shadow-[0_4px_20px_hsl(var(--shadow-gold))] transition-all">
              احجز الآن
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="toggle mobile menu"
            className="lg:hidden text-[hsl(var(--foreground))] cursor-pointer p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#F8F6F1] text-black border-t border-[hsl(var(--border))]">
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setTimeout(() => {
                      setIsMobileMenuOpen(false);
                    }, 600);
                  }}
                  className="text-[hsl(var(--foreground)/0.8)] hover:text-[hsl(var(--primary))] transition-colors font-medium text-lg py-2">
                  {link.label}
                </Link>
              ))}
              <a
                target="_blank"
                href={`tel:${telephone}`}
                className="bg-main-color hover:opacity-80 text-white mt-4 w-full py-3 rounded-lg shadow-[0_4px_20px_hsl(var(--shadow-gold))] text-center">
                احجز الآن
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
