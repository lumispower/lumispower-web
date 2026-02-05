import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import FirstVisitModal from "@/components/FirstVisitModal";
import { COMPANY, SEO_CONTENT } from "@/lib/company";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://instalaciones-certificadas.cl"),
  title: {
    default: SEO_CONTENT.defaultTitle,
    template: SEO_CONTENT.titleTemplate
  },
  description: SEO_CONTENT.description,
  keywords: SEO_CONTENT.keywords,
  icons: {
    icon: "/icon.png"
  },
  openGraph: {
    title: "Instalaciones elÃ©ctricas seguras y certificadas",
    description: SEO_CONTENT.ogDescription,
    url: "https://instalaciones-certificadas.cl",
    siteName: COMPANY.brandName,
    locale: "es_CL",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Instalaciones elÃ©ctricas seguras y certificadas",
    description: SEO_CONTENT.twitterDescription
  },
  alternates: {
    canonical: "https://instalaciones-certificadas.cl"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1E3A"
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="relative bg-surface/30 text-ink">
        <Navbar />
        <FirstVisitModal />
        <div>{children}</div>
      </body>
    </html>
  );
}



