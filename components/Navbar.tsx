'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { COMPANY } from "@/lib/company";
import clsx from "clsx";
import logo from "@/recursos/logo.png";

const navLinks = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#certificaciones", label: "Certificaciones" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#cobertura", label: "Cobertura" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const primaryPhone = COMPANY.primaryPhone;

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition ${
        isScrolled ? "bg-white/95 shadow-soft backdrop-blur" : "bg-transparent backdrop-blur-none"
      }`}
      aria-label="Barra de navegación principal"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={COMPANY.brandName}>
          <div className="relative h-12 w-12 shrink-0 rounded-full border border-primary/20 bg-white p-1 shadow-soft">
            <Image
              src={logo}
              alt={`${COMPANY.brandName} logo`}
              priority
              className="h-full w-full rounded-full object-contain"
              sizes="48px"
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-primary">{COMPANY.brandName}</p>
            <p className="text-sm text-ink/70">{COMPANY.tagline}</p>
          </div>
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition hover:text-info"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href={primaryPhone.whatsappHref}
            className="btn-primary"
            aria-label="Contactar por WhatsApp"
          >
            Cotizar ahora
          </Link>
        </div>
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Abrir menú de navegación"
            className="inline-flex items-center justify-center rounded-full border border-surface bg-white px-4 py-2 text-sm font-semibold text-primary shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
          >
            Menú
          </button>
        </div>
      </nav>
      <div
        className={clsx(
          "lg:hidden",
          "fixed inset-0 z-30 bg-primary/70 backdrop-blur-sm transition-opacity",
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
      />
      <div
        className={clsx(
          "lg:hidden",
          "fixed inset-x-0 top-0 z-40 origin-top rounded-b-3xl border-b border-white/20 bg-white/95 px-6 py-6 shadow-2xl transition-transform duration-200",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
        role="dialog"
        aria-modal="true"
      >
        <nav className="space-y-4 text-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/20 bg-white p-1 shadow-soft">
                <Image
                  src={logo}
                  alt={`${COMPANY.brandName} logo`}
                  fill
                  sizes="40px"
                  className="h-full w-full rounded-full object-contain"
                />
              </div>
              <div>
                <p className="text-base font-semibold text-primary">{COMPANY.brandName}</p>
                <p className="text-xs text-ink/70">{COMPANY.tagline}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full border border-primary/20 bg-white p-2 text-primary shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
              aria-label="Cerrar menú"
            >
              ✕
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-2xl border border-primary/10 bg-white px-4 py-3 text-sm font-medium text-primary shadow-sm transition hover:border-primary/30 hover:bg-primary/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href={primaryPhone.whatsappHref}
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-full bg-info px-6 py-3 text-center text-sm font-semibold text-white shadow transition hover:bg-info/90"
              aria-label="Contactar por WhatsApp"
            >
              Cotizar ahora
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}




