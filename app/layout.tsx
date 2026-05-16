import "./globals.css";
import { ReactNode } from "react";
import Script from "next/script";
import HeaderBar from "@/constants/HeaderBar";
import ClickSpark from "@/components/Animations/click-spark";
import Header from "@/constants/Header";
import Footer from "@/constants/Footer";
import LenisProvider from "@/components/LenisProvider";

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
        url: "/logo1.png",
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
    images: ["/logo1.png"],
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
    <html lang="en">
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
          <ClickSpark 
            sparkColor='green'
            sparkSize={20}
            sparkRadius={35}
            sparkCount={14}
            duration={400}
          >   
            <HeaderBar />
            <Header />
            {children}
            <Footer />
          </ClickSpark>
        </LenisProvider>
      </body>
    </html>
  );
}
