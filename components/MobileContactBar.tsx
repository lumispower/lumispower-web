'use client';

import Link from "next/link";
import { COMPANY } from "@/lib/company";

export default function MobileContactBar() {
  const primaryPhone = COMPANY.primaryPhone;

  return (
    <div
      className="mobile-contact-bar"
      role="complementary"
      aria-label="Accesos rápidos de contacto Lumispower"
    >
      <Link
        href={primaryPhone.whatsappHref}
        className="flex flex-col items-center gap-1 text-sm font-semibold text-white"
        aria-label={`Abrir WhatsApp con ${COMPANY.brandName}`}
      >
        <span className="text-base" aria-hidden="true">
          💬
        </span>
        WhatsApp
      </Link>
      <Link
        href={primaryPhone.telHref}
        className="flex flex-col items-center gap-1 text-sm font-semibold text-white"
        aria-label={`Llamar a ${COMPANY.brandName}`}
      >
        <span className="text-base" aria-hidden="true">
          📞
        </span>
        Llamar
      </Link>
    </div>
  );
}
