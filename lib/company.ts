const phones = [
  {
    display: "+56 9 3876 8780",
    telHref: "tel:+56938768780",
    whatsappHref: "https://wa.me/56938768780"
  }
] as const;

export const COMPANY = {
  brandName: "Lumispower",
  corporateName: "Ingeniería Eléctrica Lumispower SPA",
  tagline: "Ingeniería Eléctrica Certificada",
  rut: "77.640.373-3",
  email: "lumispowerspa@gmail.com",
  phones,
  primaryPhone: phones[0],
  locationSummary:
    "Operamos en la zona central y sur de Chile, desde Coquimbo hasta Puerto Montt, con oficina central en Santiago, Región Metropolitana."
} as const;

export const SEO_CONTENT = {
  defaultTitle: "Instalaciones eléctricas certificadas SEC A | Lumispower",
  titleTemplate: "%s | Lumispower",
  description:
    "Ingeniería Eléctrica Lumispower SPA desarrolla proyectos de instalaciones eléctricas en baja y media tensión con certificaciones SEC, equipos especializados y protocolos de seguridad integrales.",
  keywords: [
    "Lumispower",
    "instalaciones eléctricas",
    "certificación SEC",
    "mantención eléctrica",
    "baja tensión",
    "media tensión",
    "ingeniería eléctrica"
  ],
  ogDescription:
    "Lumispower ejecuta proyectos eléctricos con ingeniería aplicada, certificaciones SEC y equipos expertos para industrias, comercios y residencias.",
  twitterDescription:
    "Soluciones eléctricas certificadas SEC, proyectos a medida y soporte especializado en la zona central y sur de Chile."
};
