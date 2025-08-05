import { Plus_Jakarta_Sans } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import HeaderBar from "@/constants/HeaderBar";
import ClickSpark from "@/components/Animations/click-spark";
import Header from "@/constants/Header";
import Footer from "@/constants/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "National Cake",
  description: [
    "Join National Cake's Community and take part in baking a better nation.",
    "Nigeria’s First Civic Board Game",
    "The Game That Builds a Nation",
  ].join(" || "),
  keywords: [
    "National Cake",
    "Nigerian Board Game",
    "Civic Education",
    "Learning",
    "Fun",
    "Games",
    "Community",
    "Nigeria",
    "Nigerians",
    "Africa",
    "Nation Building",
    "Education",
    "Gamification",
    "Citizenship",
    "Transformation",
    "Creative Learning",
    "Leadership",
    "Civic Education",
    "History",
    "Culture",
    "National Oven",
    "Experience",
  ],
  authors: [
    {
      name: "Victor Prince Dickson",
      url: "https://www.victorprincedickson.com",
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Plain layout without global Header/Footer so the page can be completely custom
  return (
  <html lang="en">
    <body
      className={`${plusJakartaSans.className} bg-white antialiased`}
    >
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
    </body>
  </html>
  );
}
