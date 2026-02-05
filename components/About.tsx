'use client';

import { useEffect, useRef } from "react";
import { createGsapContext } from "@/lib/animations";

const aboutCards = [
  {
    title: "Misión",
    description:
      "Nos comprometemos a proporcionar soluciones eléctricas integrales, eficientes y seguras, adaptadas a las necesidades de cada cliente. Nuestro objetivo es ofrecer instalaciones de alta calidad y servicios de asesoría técnica, basados en innovación, tecnología avanzada y el cumplimiento de normativas vigentes."
  },
  {
    title: "Visión",
    description:
      "Ser una empresa líder en el sector de la ingeniería eléctrica, reconocida por nuestra capacidad de ofrecer soluciones de calidad en proyectos de diversa envergadura. Aspiramos a expandir nuestra presencia en el mercado nacional, siendo el socio estratégico preferido por nuestros clientes."
  }
];

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cleanup = createGsapContext(sectionRef.current, (gsapInstance) => {
      const cards = sectionRef.current?.querySelectorAll("[data-about-card]");
      if (!cards?.length) return;
      gsapInstance.from(cards, {
        opacity: 0,
        y: 50,
        rotateX: -6,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%"
        }
      });
    });
    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} id="nosotros" className="bg-white py-20 sm:py-24">
      <div className="container-grid gap-12">
        <div className="lg:col-span-4">
          <span className="badge text-primary">Nosotros</span>
          <h2 className="section-title mt-4 text-primary">Ingeniería Eléctrica Lumispower</h2>
          <p className="section-intro text-ink/80">
            Somos un equipo especializado dedicado a brindar soluciones integrales con altos estandares de seguridad,
            eficiencia y calidad.
          </p>
        </div>
        <div className="grid gap-6 lg:col-span-8 lg:grid-cols-2">
          {aboutCards.map((card) => (
            <article
              key={card.title}
              data-about-card
              className="group relative overflow-hidden rounded-3xl border border-surface bg-white p-8 shadow-soft"
            >
              <div className="relative flex h-full flex-col gap-4">
                <h3 className="text-2xl font-semibold text-primary">{card.title}</h3>
                <p className="text-sm text-ink/70">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
