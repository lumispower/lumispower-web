'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createGsapContext } from "@/lib/animations";
import clsx from "clsx";

type Project = {
  cardImage: string;
  cardTitle: string;
  cardCategory: string;
  cardDescription: string;
  modalTitle: string;
  modalCategory: string;
  modalDescription: string;
  modalImages: string[];
  hashtags: string[];
};

const projects: Project[] = [
  {
    cardImage: "/images/proyectos/cecopac/F1.png",
    cardTitle: "CECOPAC",
    cardCategory: "Comercial",
    cardDescription:
      "Normalización sistema eléctrico en dependencias de Centro Conjunto para Operaciones de Paz de Chile",
    modalTitle: "Modernización del sistema eléctrico del CECOPAC",
    modalCategory: "COMERCIAL",
    modalDescription:
      "Modernización y normalización del sistema eléctrico del Centro Conjunto para Operaciones de Paz de Chile (CECOPAC), dependiente del Estado Mayor Conjunto.",
    modalImages: [
      "/images/proyectos/cecopac/F1.png",
      "/images/proyectos/cecopac/F2.png",
      "/images/proyectos/cecopac/F3.png"
    ],
    hashtags: ["#ModernizaciónEléctrica", "#CECOPAC", "#Santiago"]
  },
  {
    cardImage: "/images/proyectos/liceo-bicentenario/F5.jpg",
    cardTitle: "Liceo Bicentenario Araucanía",
    cardCategory: "Educacional",
    cardDescription: "Mejoramiento sistema eléctrico Liceo Bicentenario Araucanía de Villarrica",
    modalTitle: "Mejoramiento del sistema eléctrico del Liceo Bicentenario Araucanía",
    modalCategory: "EDUCACIONAL",
    modalDescription:
      "Modernización del sistema eléctrico del Liceo Bicentenario Araucanía de Villarrica, con actualización de tableros, canalizaciones y protecciones.",
    modalImages: [
      "/images/proyectos/liceo-bicentenario/F5.jpg",
      "/images/proyectos/liceo-bicentenario/F6.png",
      "/images/proyectos/liceo-bicentenario/F7.png"
    ],
    hashtags: ["#MejoramientoEléctrico", "#LiceoBicentenario", "#Villarrica"]
  },
  {
    cardImage: "/images/proyectos/hospital-el-pino/F8.png",
    cardTitle: "Hospital El Pino",
    cardCategory: "Hospitalario",
    cardDescription: "Instalación y puesta en marcha de tableros eléctricos para climatización",
    modalTitle: "Instalación de tableros eléctricos para climatización",
    modalCategory: "HOSPITALARIO",
    modalDescription:
      "Suministro, instalación y puesta en marcha de tableros eléctricos para climatización en el Hospital Sanatorio El Pino, San Bernardo.",
    modalImages: [
      "/images/proyectos/hospital-el-pino/F8.png",
      "/images/proyectos/hospital-el-pino/F9.png",
      "/images/proyectos/hospital-el-pino/F10.png"
    ],
    hashtags: ["#TablerosEléctricos", "#Climatización", "#HospitalElPino"]
  },
  {
    cardImage: "/images/proyectos/escuela-naval/F11.jpg",
    cardTitle: "Escuela Naval \"Arturo Pratt\"",
    cardCategory: "Residencial",
    cardDescription: "Normalización eléctrica de entrepuentes de la Escuela Naval \"Arturo Pratt\"",
    modalTitle: "Normalización eléctrica entrepuentes H-23 y H-33",
    modalCategory: "RESIDENCIAL",
    modalDescription:
      "Normalización eléctrica de los entrepuentes H-23 y H-33 en la Escuela Naval Arturo Prat, Valparaíso, con obras de tableros, canalizaciones y puesta a tierra.",
    modalImages: [
      "/images/proyectos/escuela-naval/F11.jpg",
      "/images/proyectos/escuela-naval/F12.jpg",
      "/images/proyectos/escuela-naval/F13.jpg"
    ],
    hashtags: ["#NormalizaciónEléctrica", "#EscuelaNaval", "#Valparaíso"]
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cleanup = createGsapContext(sectionRef.current, (gsapInstance) => {
      const cards = sectionRef.current?.querySelectorAll("[data-project]");
      if (!cards) return;
      gsapInstance.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%"
        }
      });
    });
    return cleanup;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const preload = projects.flatMap((project) => project.modalImages);
    preload.forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });
  }, []);

  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    setCurrentSlide(0);
  }, [selected]);

  const showPrev = useCallback(() => {
    if (!selected || selected.modalImages.length <= 1) return;
    setCurrentSlide((prev) => (prev === 0 ? selected.modalImages.length - 1 : prev - 1));
  }, [selected]);

  const showNext = useCallback(() => {
    if (!selected || selected.modalImages.length <= 1) return;
    setCurrentSlide((prev) => (prev === selected.modalImages.length - 1 ? 0 : prev + 1));
  }, [selected]);

  const goToSlide = useCallback(
    (index: number) => {
      if (!selected || selected.modalImages.length <= 1) return;
      setCurrentSlide(index);
    },
    [selected]
  );

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
      if (!selected) return;
      if (event.key === "ArrowLeft") {
        showPrev();
      } else if (event.key === "ArrowRight") {
        showNext();
      }
    };
    if (selected) {
      window.addEventListener("keydown", handleKey);
    }
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, closeModal, showPrev, showNext]);

  const currentImage = selected?.modalImages?.[currentSlide] ?? selected?.modalImages?.[0] ?? null;
  const hasMultipleImages = (selected?.modalImages?.length ?? 0) > 1;
  const currentObjectPosition = currentImage?.includes("F10") ? "center 15%" : "center";

  return (
    <section ref={sectionRef} id="proyectos" className="bg-surface py-20 sm:py-24">
      <div className="container-grid">
        <div className="lg:col-span-4">
          <span className="badge text-primary">Experiencia</span>
          <h2 className="section-title mt-4">Proyectos destacados</h2>
          <p className="section-intro">
            Ejecutamos obras en sectores críticos con ingeniería propia, cronogramas ajustados y equipos especializados
            en seguridad eléctrica.
          </p>
        </div>
        <div className="lg:col-span-8 mt-10 lg:mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:auto-rows-fr">
            {projects.map((project, index) => (
              <button
                key={project.cardTitle}
                type="button"
                data-project
                className={clsx(
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/15 bg-white text-left shadow-lg",
                  "transition hover:-translate-y-1.5 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2"
                )}
                onClick={() => setSelected(project)}
                aria-label={`Ver detalles del proyecto ${project.cardTitle}`}
              >
                <div className="relative aspect-[4/3] bg-surface">
                  <Image
                    src={project.cardImage}
                    alt={project.cardDescription}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={78}
                    priority={index < 2}
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent opacity-60 transition group-hover:opacity-90" />
                </div>
                <div className="flex flex-col gap-2 px-6 py-5 text-left text-primary">
                  <span className="text-xs font-semibold uppercase tracking-wide text-info">{project.cardCategory}</span>
                  <span className="text-lg font-semibold text-primary">{project.cardTitle}</span>
                  <span className="text-sm text-ink/70">{project.cardDescription}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 backdrop-blur-sm p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          onClick={closeModal}
        >
          <div
            className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[92vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative w-full flex-shrink-0 overflow-hidden bg-surface aspect-[4/3] sm:h-96 sm:aspect-auto">
              {currentImage && (
                <Image
                  key={currentImage}
                  src={currentImage}
                  alt={`${selected.modalTitle} - imagen ${currentSlide + 1}`}
                  fill
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, 768px"
                  quality={80}
                  className="object-contain sm:object-cover"
                  style={{ objectPosition: currentObjectPosition }}
                />
              )}
              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      showPrev();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-primary/70 p-2 text-white transition hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
                    aria-label="Ver imagen anterior"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      showNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-primary/70 p-2 text-white transition hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
                    aria-label="Ver imagen siguiente"
                  >
                    ›
                  </button>
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    {selected.modalImages.map((imagePath, index) => (
                      <button
                        key={imagePath}
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          goToSlide(index);
                        }}
                        aria-label={`Ver imagen ${index + 1} de ${selected.modalImages.length}`}
                        className={clsx(
                          "h-2.5 w-2.5 rounded-full border border-white transition",
                          index === currentSlide ? "bg-info border-info" : "bg-white/40 hover:bg-white/70"
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-6 text-primary sm:p-8">
              <h3 id="project-dialog-title" className="text-2xl font-semibold">
                {selected.modalTitle}
              </h3>
              <p className="text-sm uppercase tracking-widest text-info">{selected.modalCategory}</p>
              <p className="text-base text-ink/80">{selected.modalDescription}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                {selected.hashtags.map((tag) => (
                  <span key={tag} className="badge">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={closeModal}
                className={clsx("btn-secondary mt-4 self-end border-primary text-primary hover:border-primary/80")}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
