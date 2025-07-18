import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { Header } from "@/constants/Header";
import { Footer } from "@/constants/Footer";
import HeaderBar from "@/constants/HeaderBar";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "National Cake",
  description: "Changing the Narrative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.className} bg-white antialiased`}
      >
        <HeaderBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
