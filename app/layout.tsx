import "./globals.css";
import { ReactNode } from "react";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import HeaderBar from "@/constants/HeaderBar";
import Header from "@/constants/Header";
import { cloudinaryUrl } from "@/lib/cloudinary";
import Footer from "@/constants/Footer";
import LenisProvider from "@/components/LenisProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nationalcake.ng"),
  title: {
    default: "National-cake – Nigeria's First Civic Board Game",
    template: "%s | National-cake",
  },
  description:
    "Join National-cake's community and take part in baking a better nation. Nigeria's first civic board game that teaches history, citizenship, and nation-building.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "National-cake",
    title: "National-cake – Nigeria's First Civic Board Game",
    description:
      "Join National-cake's community and take part in baking a better nation. The game that builds a nation.",
    images: [
      {
        url: cloudinaryUrl("logo1", { width: 1200 }),
        width: 1200,
        height: 630,
        alt: "National-cake – Civic Board Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "National-cake – Nigeria's First Civic Board Game",
    description:
      "Join National-cake's community and take part in baking a better nation.",
    images: [cloudinaryUrl("logo1", { width: 1200 })],
  },
  authors: [
    {
      name: "Victor Prince Dickson",
      url: "https://www.victorprincedickson.com",
    },
  ],
} as const;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <Script id="org-jsonld" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "National-cake",
            url: (process.env.NEXT_PUBLIC_SITE_URL || "https://nationalcake.ng"),
            sameAs: [],
          })}
        </Script>
      </head>
      <body className="bg-white antialiased font-sans">
        <LenisProvider>
          <HeaderBar />
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
