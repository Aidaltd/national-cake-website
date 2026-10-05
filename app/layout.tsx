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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nationalcake.ng";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "National Cake – Nigeria's Premier Civic History Board Game & Movement",
    template: "%s | National Cake Nigeria",
  },
  description:
    "Nigeria's premier civic history board game, book, and nationwide education movement. Learn Nigerian history, build civic intelligence, and participate in nation-building.",
  keywords: [
    "National Cake",
    "National Cake Board Game",
    "National Cake Book",
    "Nigeria Civic Board Game",
    "Victor Prince Dickson",
    "Project GIANT Nigeria",
    "Nigerian History Game",
    "Civic Education Nigeria",
    "Educational Games Africa",
    "Buy National Cake Game",
    "Abuja Board Games",
    "Donate to Nigerian Schools",
    "Patriotic Board Game",
    "Nigerian Emotional Map",
  ],
  authors: [
    {
      name: "Victor Prince Dickson",
      url: "https://www.victorprincedickson.com",
    },
    {
      name: "National Cake Initiative",
      url: siteUrl,
    },
  ],
  creator: "Victor Prince Dickson",
  publisher: "El-Spice Media Limited",
  alternates: {
    canonical: "/",
    languages: {
      "en-NG": "/",
      "en-US": "/",
      "en-GB": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "National Cake",
    title: "National Cake – Nigeria's Premier Civic History Board Game & Movement",
    description:
      "Join the movement rewriting Nigeria's story through play, dialogue, and civic intelligence. Order with free delivery nationwide.",
    images: [
      {
        url: cloudinaryUrl("logo1", { width: 1200 }),
        width: 1200,
        height: 630,
        alt: "National Cake Renaissance Edition Board Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "National Cake – Nigeria's Premier Civic Board Game",
    description:
      "Nigeria's premier civic board game that teaches history, citizenship, and nation-building.",
    images: [cloudinaryUrl("logo1", { width: 1200 })],
    creator: "@AlphaKultureNG",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Education & Civic Games",
} as const;

export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "National Cake Initiative",
        legalName: "El-Spice Media Limited",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: cloudinaryUrl("logo1", { width: 600 }),
          caption: "National Cake Logo",
        },
        founder: {
          "@type": "Person",
          name: "Victor Prince Dickson",
          jobTitle: "Founder & Creative Director",
          url: "https://www.victorprincedickson.com",
        },
        foundingLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Abuja",
            addressRegion: "Federal Capital Territory",
            addressCountry: "NG",
          },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Abuja",
          addressRegion: "FCT",
          addressCountry: "NG",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+2348168378999",
            contactType: "customer service",
            areaServed: "NG",
            availableLanguage: ["English", "Hausa", "Yoruba", "Igbo"],
          },
        ],
        sameAs: [
          "https://x.com/AlphaKultureNG",
          "https://web.facebook.com/alphakulture.ng",
          "https://www.instagram.com/alphakulture.ng",
          "https://www.linkedin.com/company/alphakulture",
        ],
        description:
          "The National Cake Initiative creates neuroscience-backed civic learning tools, games, and books that teach Nigerian history, active citizenship, and national cohesion.",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "National Cake",
        description: "Official portal for the National Cake Civic Board Game & Project GIANT",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "en-NG",
      },
    ],
  };

  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        {/* GEO & Location Targeting */}
        <meta name="geo.region" content="NG-FC" />
        <meta name="geo.placename" content="Abuja, Federal Capital Territory, Nigeria" />
        <meta name="geo.position" content="9.0765;7.3986" />
        <meta name="ICBM" content="9.0765, 7.3986" />

        {/* Dublin Core Metadata */}
        <meta name="DC.title" content="National Cake – Nigeria's Premier Civic History Board Game" />
        <meta name="DC.creator" content="Victor Prince Dickson" />
        <meta name="DC.subject" content="Civic Education, Nigerian History, Board Games, Patriotism, Project GIANT" />
        <meta name="DC.description" content="Official website of the National Cake Board Game, Book, and Civic Intelligence Movement in Nigeria." />
        <meta name="DC.publisher" content="El-Spice Media Limited" />
        <meta name="DC.coverage" content="Nigeria, West Africa, Global Diaspora" />
        <meta name="DC.language" content="en-NG" />

        {/* Structured Knowledge Graph */}
        <Script
          id="knowledge-graph-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
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
