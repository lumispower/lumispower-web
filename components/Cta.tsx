'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { createGsapContext } from "@/lib/animations";
import { COMPANY } from "@/lib/company";
import iconMail from "@/recursos/IC.png";
import iconInstagram from "@/recursos/II.png";
import iconLinkedin from "@/recursos/IL.png";
import iconWhatsapp from "@/recursos/IW.png";

export default function Cta() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cleanup = createGsapContext(sectionRef.current, (gsapInstance) => {
      const elements = sectionRef.current?.querySelectorAll("[data-cta]");
      if (!elements) return;
      gsapInstance.from(elements, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      });
    });
    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} id="contacto" className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-primary text-white shadow-2xl">
        <div className="relative grid gap-8 px-8 py-10 sm:px-10 sm:py-12 lg:py-14 md:grid-cols-2">
          <div className="absolute inset-0 bg-hero-gradient opacity-90" aria-hidden="true" />
          <div className="relative flex flex-col gap-4" data-cta>
            <span className="badge text-primary">Contacto</span>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Solicita tu evaluación eléctrica y obtén una propuesta personalizada en 48h
            </h2>
            <p className="text-white/80">
              Nuestro equipo analiza planos, cargas críticas y requerimientos normativos para diseñar la solución más
              eficiente y segura para tu operación.
            </p>
          </div>
          <div className="relative flex flex-col gap-4 text-primary" data-cta>
            <div className="rounded-2xl bg-white/95 p-6 text-primary shadow">
              <p className="text-lg font-semibold">Coordinemos tu proyecto</p>
              <p className="mt-2 text-sm text-ink/70">{COMPANY.tagline}</p>
              <ul className="mt-4 space-y-4 text-sm text-ink/80">
                <li className="flex flex-wrap items-center gap-3">
                  <Link
                    href={COMPANY.primaryPhone.whatsappHref}
                    aria-label={`Contactar por WhatsApp a ${COMPANY.primaryPhone.display}`}
                    className="inline-flex transition hover:opacity-90"
                  >
                    <Image
                      src={iconWhatsapp}
                      alt="WhatsApp"
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase text-ink/50">
                      Teléfono / WhatsApp
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={COMPANY.primaryPhone.telHref} className="text-info underline">
                        {COMPANY.primaryPhone.display}
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Link
                    href={`mailto:${COMPANY.email}`}
                    aria-label={`Escribir a ${COMPANY.email}`}
                    className="inline-flex transition hover:opacity-90"
                  >
                    <Image
                      src={iconMail}
                      alt="Correo electrónico"
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase text-ink/50">Correo</span>
                    <Link href={`mailto:${COMPANY.email}`} className="text-info underline">
                      {COMPANY.email}
                    </Link>
                  </div>
                </li>
                <li className="flex items-center gap-3 opacity-70">
                  <span className="inline-flex">
                    <Image
                      src={iconInstagram}
                      alt="Instagram"
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase text-ink/50">Instagram</span>
                    <span className="text-sm text-ink/60">Próximamente</span>
                  </div>
                </li>
                <li className="flex items-center gap-3 opacity-70">
                  <span className="inline-flex">
                    <Image
                      src={iconLinkedin}
                      alt="LinkedIn"
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase text-ink/50">LinkedIn</span>
                    <span className="text-sm text-ink/60">Próximamente</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

