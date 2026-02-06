import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import FirstVisitModal from "@/components/FirstVisitModal";
import { SEO_CONTENT } from "@/lib/company";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumispower.cl"),
  title: {
    default: SEO_CONTENT.defaultTitle,
    template: SEO_CONTENT.titleTemplate,
  },
  description: SEO_CONTENT.description,
  keywords: SEO_CONTENT.keywords,
  icons: {
    icon: "/icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1E3A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T82QWNZR');
            `,
          }}
        />
      </head>

      <body className="relative bg-surface/30 text-ink">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T82QWNZR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Navbar />
        <FirstVisitModal />
        {children}
      </body>
    </html>
  );
}
