"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Servicios" },
    { href: "#portfolio", label: "Proyectos" },
    { href: "#lab", label: "Lab" },
    { href: "#about", label: "Sobre mí" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-4 bg-black/80 backdrop-blur-[24px] border-b border-[rgba(59,130,246,0.1)] shadow-lg" : "py-6"}`}>
        <div className="max-w-[1440px] mx-auto px-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/generated/logo.png" alt="Rogelio De La Rosa" width={48} height={48} className="object-contain" />
          </Link>

          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-medium text-[var(--text-secondary)] hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-[-4px] left-0 h-[2px] bg-[var(--primary-500)] w-0 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#cta"
                className="inline-block bg-[var(--primary-600)] hover:bg-[var(--primary-500)] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Contacto
              </Link>
            </li>
          </ul>

          <button
            className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
          >
            <span className={`w-[30px] h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`w-[30px] h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`w-[30px] h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[var(--bg-tertiary)] z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-400 ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <Link href="#services" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-white">Servicios</Link>
        <Link href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-white">Proyectos</Link>
        <Link href="#about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-white">Sobre mí</Link>
        <Link href="#cta" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-white bg-[var(--primary-600)] px-6 py-3 rounded-lg">Contacto</Link>
      </div>
    </>
  );
}
