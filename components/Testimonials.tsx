'use client';

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/animations";

type Testimonial = {
  name: string;
  role: string;
  message: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Marcelo Fuentes",
    role: "Gerente de Operaciones · Planta embotelladora",
    message:
      "Lumispower integró nuestros sistemas de distribución sin detenciones productivas. La documentación SEC y los protocolos EPC fueron entregados completos y auditables."
  },
  {
    name: "Viviana Orellana",
    role: "Directora Técnica · Clínica privada",
    message:
      "Coordinaron permisos, pruebas y planos en plazos críticos. La puesta en marcha se realizó con reportes claros para auditorías hospitalarias y soporte post entrega."
  },
  {
    name: "Rodrigo Sánchez",
    role: "Administrador inmobiliario · Condominio premium",
    message:
      "Regularizaron instalaciones heredadas e incorporaron domótica sin afectar a los residentes. La continuidad operativa y soporte preventivo destacan."
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused]);

  useEffect(() => {
    listRef.current?.scrollTo({
      left: activeIndex * (listRef.current.clientWidth + 24),
      behavior: prefersReducedMotion() ? "auto" : "smooth"
    });
  }, [activeIndex]);

  return (
    <section id="testimonios" className="bg-surface/60 py-20 sm:py-24">
      <div className="container-grid">
        <div className="lg:col-span-4">
          <span className="badge text-primary">Confían en nosotros</span>
          <h2 className="section-title mt-4">Testimonios de clientes</h2>
          <p className="section-intro">
            Gerencias técnicas, operaciones y administración valoran el acompañamiento integral y la calidad de nuestro
            trabajo eléctrico.
          </p>
        </div>
        <div className="lg:col-span-8">
          <div
            ref={listRef}
            className="relative flex gap-6 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-live="polite"
            aria-atomic="true"
          >
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className="min-w-full rounded-3xl border border-surface bg-white p-8 shadow-soft transition lg:min-w-[calc(50%-12px)]"
                aria-hidden={index !== activeIndex}
              >
                <p className="text-lg font-medium leading-relaxed text-primary">{testimonial.message}</p>
                <div className="mt-6 border-t border-surface pt-4">
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-ink/70">{testimonial.role}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-3 w-3 rounded-full transition ${
                  index === activeIndex ? "bg-info shadow-soft" : "bg-surface"
                }`}
                aria-label={`Mostrar testimonio ${index + 1}`}
                aria-pressed={index === activeIndex}
              />
            ))}
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className="ml-6 rounded-full border border-surface px-4 py-2 text-sm font-semibold text-primary transition hover:border-info"
              aria-pressed={isPaused}
              aria-label={isPaused ? "Reanudar carrusel" : "Pausar carrusel"}
            >
              {isPaused ? "Reanudar" : "Pausar"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
