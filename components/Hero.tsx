'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { createGsapContext, parallax } from "@/lib/animations";
import heroImage from "@/recursos/F14.png";

const heroHighlights = [
  {
    title: "+5 años de experiencia",
    description: "Equipos certificados SEC Clase A en baja y media tensión."
  },
  {
    title: "Supervisión SEC permanente",
    description: "Protocolos EPC, matrices de riesgo y control de calidad."
  },
  {
    title: "Garantía post proyecto",
    description: "Memorias técnicas, planos actualizados y seguimiento continuo."
  }
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cleanup = createGsapContext(sectionRef.current, (gsapInstance) => {
      const elements = sectionRef.current?.querySelectorAll("[data-animate]");
      if (!elements?.length) return;
      gsapInstance.from(elements, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15
      });
    });
    return cleanup;
  }, []);

  useEffect(() => {
    if (!mediaRef.current) return;
    const context = parallax(mediaRef.current, { y: 20, scrub: 0.4 });
    return () => context?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative isolate overflow-hidden bg-hero-gradient pb-16 pt-24 text-white sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-radial-grid opacity-70" aria-hidden="true" />
      <div className="container-grid items-center">
        <div className="flex flex-col gap-5 lg:col-span-6" data-animate>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl" data-animate>
            Instalaciones eléctricas seguras y certificadas
          </h1>
          <p className="max-w-xl text-lg text-white/80 sm:text-xl" data-animate>
            Lumispower diseña, ejecuta y certifica proyectos eléctricos residenciales, comerciales e industriales,
            cumpliendo normativa SEC y asegurando la continuidad operativa de cada instalación.
          </p>
          <div className="w-fit" data-animate>
            <Link href="#contacto" className="btn-primary">
              Solicitar evaluación
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3" data-animate>
            {heroHighlights.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-4 text-sm text-white/80 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/8"
              >
                <div
                  className="pointer-events-none absolute inset-0 scale-[1.02] bg-gradient-to-br from-white/0 via-white/10 to-white/20 opacity-0 transition duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="relative space-y-1">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="relative mt-10 flex justify-center lg:col-span-6 lg:mt-0" ref={mediaRef} data-animate>
          <div className="relative w-full max-w-xl">
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-accent/40 blur-3xl" aria-hidden="true" />
            <div className="absolute -right-12 bottom-6 h-48 w-48 rounded-full bg-info/30 blur-3xl" aria-hidden="true" />
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur">
              <Image
                src={heroImage}
                alt="Infraestructura eléctrica destacada"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 90vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 z-10 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent"
                aria-hidden="true"
              />
            </div>
            <div className="absolute -bottom-12 left-1/2 w-56 -translate-x-1/2 rounded-2xl border border-white/20 bg-white/90 p-4 text-sm text-primary shadow-lg">
              <p className="font-semibold">Respuesta técnica en 48h</p>
              <p className="text-primary/70">Agenda inspecciones y evaluaciones con equipos SEC Clase A.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
