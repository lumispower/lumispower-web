import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

type GsapContext = ReturnType<typeof gsap.context>;
type TweenOptions = gsap.TweenVars;

const ensureRegistration = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (!isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
  return true;
};

export const prefersReducedMotion = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const createGsapContext = (
  scope: gsap.DOMTarget,
  callback: (contextGsap: typeof gsap) => void
): (() => void) | undefined => {
  if (!ensureRegistration() || prefersReducedMotion()) {
    return undefined;
  }
  if (!scope) {
    return undefined;
  }
  const context = gsap.context(() => callback(gsap), scope);
  return () => context.revert();
};

export const fadeUp = (
  target: gsap.DOMTarget,
  options: TweenOptions & { delay?: number } = {}
): GsapContext | null => {
  if (!ensureRegistration() || prefersReducedMotion() || !target) {
    return null;
  }
  const context = gsap.context(() => {
    gsap.from(target, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      ...options,
      stagger: options.stagger ?? 0.15
    });
  }, target);
  return context;
};

export const fadeUpScroll = (
  target: gsap.DOMTarget,
  options: TweenOptions = {}
): GsapContext | null => {
  if (!ensureRegistration() || prefersReducedMotion() || !target) {
    return null;
  }
  const context = gsap.context(() => {
    gsap.fromTo(
      target,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: target,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        ...options
      }
    );
  }, target);
  return context;
};

export const parallax = (
  target: gsap.DOMTarget,
  { y = 80, scrub = 0.6 }: { y?: number; scrub?: number } = {}
): GsapContext | null => {
  if (!ensureRegistration() || prefersReducedMotion() || !target) {
    return null;
  }
  const context = gsap.context(() => {
    gsap.to(target, {
      yPercent: y,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        start: "top bottom",
        end: "bottom top",
        scrub
      }
    });
  }, target);
  return context;
};
