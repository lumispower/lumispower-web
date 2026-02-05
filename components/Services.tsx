'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { createGsapContext } from "@/lib/animations";
import clsx from "clsx";

type Service = {
  title: string;
  description: string;
  icon: string;
  details: string[];
};

const services: Service[] = [
  {
    title: "Instalaciones Eléctricas Baja Tensión",
    description:
      "Diseño y ejecución de redes de baja tensión para residencias y comercios, cumpliendo normativa SEC y protocolos de seguridad.",
    icon: "⚡",
    details: [
      "Diseño de proyectos eléctricos.",
      "Normalización y mantención de sistemas eléctricos.",
      "Fabricación e instalación de tableros eléctricos certificados SEC.",
      "Canalización, protecciones y puesta a tierra.",
      "Pruebas, documentación técnica y certificaciones SEC."
    ]
  },
  {
    title: "Instalaciones Eléctricas Media Tensión",
    description:
      "Montaje de subestaciones, empalmes y maniobras en media tensión, asegurando continuidad operativa y mantenimiento especializado.",
    icon: "⚙️",
    details: [
      "Diseño y ejecución de proyectos en media tensión.",
      "Montaje de subestaciones, celdas y transformadores.",
      "Empalmes, maniobras y pruebas de aislamiento en sitio.",
      "Coordinación operativa con empresas distribuidoras."
    ]
  },
  {
    title: "Instalaciones y Mantenciones de Climatización",
    description:
      "Integración eléctrica para sistemas HVAC, salas de máquinas y automatización, con programas de mantenimiento preventivo.",
    icon: "❄️",
    details: [
      "Conexión y puesta en marcha de chillers, VRF, VRV y sistemas splits.",
      "Integración con tableros eléctricos, controladores y sistemas BMS.",
      "Monitoreo remoto y automatización de climatización.",
      "Mantenimiento preventivo, correctivo y certificación de funcionamiento."
    ]
  },
  {
    title: "Instalaciones de Corrientes Débiles",
    description:
      "Implementación de cableado estructurado, CCTV y control de accesos con estándares TIA/EIA y soporte continuo.",
    icon: "🔌",
    details: [
      "Tendido de redes de datos categoría 6/6A con certificación de canal.",
      "Implementación de CCTV, control de accesos, alarmas y domótica.",
      "Monitoreo y soporte remoto para asegurar continuidad operativa."
    ]
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selected, setSelected] = useState<Service | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const serviceCards = sectionRef.current.querySelectorAll("[data-service]");
    if (!serviceCards.length) return;
    const cleanup = createGsapContext(sectionRef.current, (gsapInstance) => {
      gsapInstance.from(serviceCards, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12
      });
    });
    return cleanup;
  }, []);

  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    if (selected) {
      window.addEventListener("keydown", handleKey);
    }
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, closeModal]);

  return (
    <>
      <section ref={sectionRef} id="servicios" className="bg-surface py-20 sm:py-24">
        <div className="container-grid">
          <div className="lg:col-span-4">
            <span className="badge text-primary">Servicios</span>
            <h2 className="section-title mt-4">Nuestros servicios</h2>
            <p className="section-intro">
              Comprometidos con entregar valor a través de servicios de calidad, innovación y eficiencia operativa.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {services.map((service) => (
                <button
                  key={service.title}
                  type="button"
                  data-service
                  className={clsx(
                    "card-surface group flex h-full flex-col rounded-2xl p-6 text-left transition-shadow duration-300",
                    "hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2"
                  )}
                  onClick={() => setSelected(service)}
                  aria-label={`Ver detalles del servicio ${service.title}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-white text-2xl">
                      <span role="img" aria-label={service.title}>
                        {service.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
                      <p className="mt-2 text-sm text-ink/70">{service.description}</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-info/80 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <span>Ver detalles</span>
                      <span aria-hidden="true">→</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 backdrop-blur-sm p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-dialog-title"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-primary/20 bg-white text-3xl">
                <span role="img" aria-label={selected.title}>
                  {selected.icon}
                </span>
              </div>
              <div className="space-y-3">
                <h3 id="service-dialog-title" className="text-2xl font-semibold text-primary">
                  {selected.title}
                </h3>
                <p className="text-base text-ink/80">{selected.description}</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-ink/80">
              {selected.details.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-info">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="btn-secondary bg-white"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
