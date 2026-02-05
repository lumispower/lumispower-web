'use client';

import Link from "next/link";
import { COMPANY } from "@/lib/company";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-lg font-semibold text-primary">{COMPANY.corporateName}</p>
          <p className="text-sm text-ink/60">{COMPANY.tagline}</p>
          <p className="text-sm text-ink/60">© {currentYear} {COMPANY.brandName}. Todos los derechos reservados.</p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-ink/70 sm:items-end">
          <Link href={`mailto:${COMPANY.email}`} className="hover:text-info">
            {COMPANY.email}
          </Link>
          <div className="flex flex-wrap items-center gap-4 sm:justify-end">
            {COMPANY.phones.map((phone) => (
              <Link key={phone.telHref} href={phone.whatsappHref} className="hover:text-info">
                WhatsApp - {phone.display}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
