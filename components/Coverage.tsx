'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import { createGsapContext } from "@/lib/animations";
import { COMPANY } from "@/lib/company";

const coverageAreas = [
  { region: "Coquimbo · La Serena", detail: "Proyectos comerciales y residenciales de alta demanda." },
  { region: "Región Metropolitana", detail: "Oficina central, monitoreo y soporte para industrias críticas." },
  { region: "O'Higgins · Maule", detail: "Infraestructura agroindustrial, logística y retail." },
  { region: "Biobío · Los Lagos", detail: "Plantas productivas, campus educativos y hospitales." }
];

export default function Coverage() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cleanup = createGsapContext(sectionRef.current, (gsapInstance) => {
      const targets = sectionRef.current?.querySelectorAll("[data-coverage]");
      if (!targets) return;
      gsapInstance.from(targets, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%"
        }
      });
    });
    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} id="cobertura" className="bg-white py-20 sm:py-24">
      <div className="container-grid items-center">
        <div className="lg:col-span-5">
          <span className="badge text-primary">Cobertura Lumispower</span>
          <h2 className="section-title mt-4">Zona central y sur de Chile</h2>
          <p className="section-intro">{COMPANY.locationSummary}</p>
          <ul className="mt-6 space-y-3 text-sm text-ink/70">
            {coverageAreas.map((area) => (
              <li
                key={area.region}
                data-coverage
                className="flex items-start gap-3 rounded-2xl bg-surface px-5 py-4"
              >
                <span className="font-medium text-primary">{area.region}</span>
                <span className="text-ink/70">{area.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 flex justify-center lg:col-span-7 lg:mt-0">
          <div
            className="w-full max-w-[340px] bg-white shadow-2xl ring-1 ring-black/5"
            data-coverage
          >
            <div className="relative aspect-[2/3] overflow-hidden bg-[#061b3c]">
              <Image
                src="/images/coverage.png"
                alt="Mapa de cobertura Lumispower"
                fill
                sizes="(min-width: 1024px) 340px, 85vw"
                className="object-contain object-center"
                priority
              />
            </div>
            <div className="px-6 pb-6 pt-4 text-sm text-primary">
              <p className="font-semibold text-primary">Cobertura Operativa Nacional</p>
              <p className="text-ink/70">
                Trabajamos de manera continua desde la Región de Coquimbo hasta la Región de Los Lagos, asegurando coordinación y monitoreo en tiempo real en todo el territorio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


