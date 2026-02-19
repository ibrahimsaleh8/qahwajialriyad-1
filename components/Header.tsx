"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { HeaderData } from "@/lib/responseType";

const navLinks = [
  { href: "#home", label: "الرئيسية" },
  { href: "#about", label: "من نحن" },
  { href: "#services", label: "خدماتنا" },
  { href: "#why-us", label: "لماذا نحن" },
  { href: "#gallery", label: "معرض الصور" },
  { href: "#contact", label: "تواصل معنا" },
];

export function Header({
  brandName,
  telephone,
}: HeaderData & { telephone?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white backdrop-blur-md shadow text-[hsl(var(--foreground)/0.8)]"
          : "bg-transparent text-white"
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 text-2xl font-bold">
            {brandName}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[hsl(var(--primary))] transition-colors font-medium">
                {link.label}
              </a>
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
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setTimeout(() => {
                      setIsMobileMenuOpen(false);
                    }, 600);
                  }}
                  className="text-[hsl(var(--foreground)/0.8)] hover:text-[hsl(var(--primary))] transition-colors font-medium text-lg py-2">
                  {link.label}
                </a>
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
