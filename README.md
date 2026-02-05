# Lumispower · Landing de instalaciones eléctricas

Landing page profesional construida con Next.js 14 (App Router), Tailwind CSS y GSAP para **Ingeniería Eléctrica Lumispower SPA**. Incluye animaciones non-blocking, optimización SEO, enfoque en accesibilidad y carga de imágenes optimizada.

## Características principales
- Hero con CTA dual, patrón dinámico y efecto parallax controlado por GSAP.
- Sección “Nosotros” con misión y visión animadas con GSAP.
- Servicios, certificaciones, proyectos (lightbox), proceso, cobertura y testimonios con animaciones progresivas.
- Barra de contacto fija en móviles y CTA final con datos comerciales actualizados.
- Animaciones respetan `prefers-reduced-motion` y solo se ejecutan cuando es seguro.
- Tipografía Inter con `next/font` y paleta sobria alineada al briefing.

## Stack
- [Next.js 14](https://nextjs.org/) con App Router y componentes server/client.
- [React 18](https://react.dev/).
- [Tailwind CSS 3](https://tailwindcss.com/) con configuración personalizada de colores y sombreado.
- [GSAP + ScrollTrigger](https://greensock.com/scrolltrigger/) para animaciones de entrada y parallax.

## Requisitos previos
- Node.js 18.17 o superior.
- npm 9+ (incluido con Node) o pnpm/yarn si se prefiere, ajustando los comandos.

## Instalación
```bash
npm install
```

## Scripts disponibles
- `npm run dev` – Ejecuta la app en modo desarrollo (http://localhost:3000).
- `npm run build` – Genera el build de producción.
- `npm run start` – Sirve el build generado.
- `npm run lint` – Ejecuta las reglas ESLint (`next/core-web-vitals`).
- `npm run format` – Verifica formato con Prettier.

## Animaciones y accesibilidad
- Animaciones definidas en `lib/animations.ts` con utilidades para fade-up, scroll y parallax.
- Las animaciones se omiten cuando el usuario tiene activo “reducir movimiento”.
- El carrusel de testimonios pausa al pasar el cursor y ofrece control manual accesible por teclado.

## Estructura relevante
- `app/layout.tsx` – Layout raíz, metadata SEO, navbar y barra móvil.
- `app/(marketing)/page.tsx` – Página principal que orquesta los módulos.
- `components/` – Hero, About, Services, Certifications, Projects (con lightbox), Process, Coverage, Testimonials, CTA y Footer.
- `styles/globals.css` – Tailwind y estilos globales.
- `lib/animations.ts` y `lib/company.ts` – Utilidades GSAP y constantes corporativas.
- `public/images/proyectos/` – Imágenes utilizadas en las secciones.

## Ejecutar pruebas Lighthouse básicas
1. Ejecuta `npm run dev` y abre `http://localhost:3000` en Chrome.
2. Abre DevTools (`Ctrl+Shift+I`), selecciona la pestaña **Lighthouse**.
3. Marca las categorías **Performance**, **Accessibility**, **Best practices** y **SEO**.
4. Elige el modo **Mobile** y haz clic en **Analyze page load**.
5. Repite en modo **Desktop** si necesitas ambos reportes.

> Tip: Para automatizar, instala `npm install -D @lhci/cli` y ejecuta `npx lhci autorun` con un `.lighthouserc.js`.

## Despliegue
- Ejecuta `npm run build` para generar la versión optimizada.
- Despliega en plataformas compatibles con Next.js (Vercel, Netlify, AWS Amplify). Configura Node 18+.

---
Si necesitas ajustes adicionales, integraciones o nuevas secciones, reutiliza la estructura modular y las utilidades de animación existentes.
