'use client';

import { useEffect, useRef } from "react";
import { createGsapContext } from "@/lib/animations";

const badges = [
  { title: "SEC Clase A", description: "Habilitación vigente y respaldo normativo" },
  { title: "Protocolos EPC", description: "Prevención de riesgos y control de energía" },
  { title: "ISO 45001", description: "Gestión de seguridad y salud ocupacional" }
];

const checklist = [
  "Coordinación de protecciones y memorias de cálculo",
  "Protocolos de bloqueo y etiquetado (LOTO)",
  "Planos as-built y documentación digital",
  "Ensayos eléctricos con instrumentación calibrada",
  "Aplicación de la normativa RIC 2021 en todos los proyectos"
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cleanup = createGsapContext(sectionRef.current, (gsapInstance) => {
      const scope = sectionRef.current;
      if (!scope) return;
      gsapInstance.from(scope.querySelectorAll("[data-badge]"), {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1
      });
      gsapInstance.from(scope.querySelectorAll("[data-check]"), {
        opacity: 0,
        x: -20,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.2
      });
    });
    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} id="certificaciones" className="bg-white py-20 sm:py-24">
      <div className="container-grid">
        <div className="lg:col-span-5">
          <span className="badge text-primary">Normativa</span>
          <h2 className="section-title mt-4 text-primary">Certificaciones y protocolos activos</h2>
          <p className="section-intro text-ink/80">
            Cada proyecto es auditado por expertos en seguridad eléctrica, cumpliendo normativa chilena e internacional
            y aplicando de manera transversal la normativa RIC 2021 para respaldar la continuidad y trazabilidad.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            {badges.map((badge) => (
              <span key={badge.title} data-badge className="badge border-info/20 bg-white text-primary shadow">
                <span className="text-lg" aria-hidden="true">
                  ⚡
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-semibold">{badge.title}</span>
                  <span className="text-xs text-ink/60">{badge.description}</span>
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="card-surface h-full rounded-3xl bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-primary">Checklist de seguridad</h3>
            <ul className="mt-6 space-y-4 text-sm text-ink/80">
              {checklist.map((item) => (
                <li key={item} data-check className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-1 text-info">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl bg-surface px-5 py-4 text-sm text-primary">
              Todos los entregables incluyen matrices de riesgo, actas de prueba y respaldo fotográfico con trazabilidad
              SEC.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
