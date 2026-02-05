"use client";

import { useCallback, useEffect, useState } from "react";
import { COMPANY } from "@/lib/company";

const STORAGE_KEY = "lp:first-visit-modal:v2";

export default function FirstVisitModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const alreadySeen = window.sessionStorage.getItem(STORAGE_KEY);

      if (!alreadySeen) {
        // Delay slightly so the hero content appears first.
        const timeout = window.setTimeout(() => setIsOpen(true), 600);
        return () => window.clearTimeout(timeout);
      }
    } catch {
      setIsOpen(true);
    }
  }, []);

  const persistDismissal = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.sessionStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // Ignore storage errors; the modal will reappear on future visits.
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    persistDismissal();
  }, [persistDismissal]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen) {
    return null;
  }

  const { brandName, primaryPhone } = COMPANY;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-primary/70 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-white/40 bg-white p-8 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface/80 text-primary transition hover:bg-surface/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
          aria-label="Cerrar anuncio de bienvenida"
        >
          &times;
        </button>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          ¡Bienvenido a {brandName}!
        </div>

        <h2 className="text-3xl font-semibold text-primary">
          Primera visita técnica{" "}
          <span className="text-info font-semibold uppercase">GRATIS</span>
        </h2>

        <p className="mt-4 text-base text-ink/80">
          Evaluamos tu proyecto en terreno sin costo para que tomes decisiones
          con confianza. Agenda hoy mismo y un ingeniero certificado irá a tu
          ubicación en la fecha que más te acomode.
        </p>

        <div className="mt-6">
          <a
            href={primaryPhone.whatsappHref}
            target="_blank"
            rel="noreferrer"
            onClick={closeModal}
            className="block w-full rounded-full bg-gradient-to-r from-primary via-primary/90 to-info px-6 py-3 text-center text-base font-semibold text-white shadow-soft transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
          >
            Agenda por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
