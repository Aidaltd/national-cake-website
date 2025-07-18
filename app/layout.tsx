import { Plus_Jakarta_Sans } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import HeaderBar from "@/constants/HeaderBar";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get Started | National Cake",
  description: "Join National Cake's Community and take part in baking a better nation.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Plain layout without global Header/Footer so the page can be completely custom
  return (
  <html lang="en">
    <body
      className={`${plusJakartaSans.className} bg-white antialiased`}
    >
      <HeaderBar /> 
      {children}
    </body>
  </html>
  );
}
