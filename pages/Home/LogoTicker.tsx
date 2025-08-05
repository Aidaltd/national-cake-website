"use client"
import Partner1 from "@/public/partner1.png";
import Partner2 from "@/public/partner2.png";
import Partner3 from "@/public/partner3.png";
import Partner4 from "@/public/partner4.png";
import Partner5 from "@/public/partner5.png";
import Partner6 from "@/public/partner6.png";
import Image from "next/image";
import { motion } from "framer-motion";


 export default function LogoTicker() {
  return (
    <div className="py-8 bg-custom-primary">
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 flex-none pr-14"
            animate={{
              translateX: "-50%",
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop", 
            }}
          >
            <Image
              src={Partner1}
              alt="Acme Logo"
              className="logo-ticker-image"
            />
            <Image
              src={Partner2}
              alt="Quantum Logo"
              className="logo-ticker-image"
            />
            <Image
              src={Partner3}
              alt="Echo Logo"
              className="logo-ticker-image"
            />
            {/* <Image
              src={Partner4}
              alt="Celestial Logo"
              className="logo-ticker-image"
            />
            <Image
              src={Partner5}
              alt="Pulse Logo"
              className="logo-ticker-image"
            />
            <Image
              src={Partner6}
              alt="Apex Logo"
              className="logo-ticker-image"
            /> */}
            {/* Second setof logos for animation */}
            <Image
              src={Partner1}
              alt="Acme Logo"
              className="logo-ticker-image"
            />
            <Image
              src={Partner2}
              alt="Quantum Logo"  
              className="logo-ticker-image"
            />
            <Image
              src={Partner3}
              alt="Echo Logo"
              className="logo-ticker-image"
            />
            {/* <Image
              src={Partner4}
              alt="Celestial Logo"
              className="logo-ticker-image"
            />
            <Image
              src={Partner5}
              alt="Pulse Logo"  
              className="logo-ticker-image"
            />
            <Image
              src={Partner6}
              alt="Apex Logo" 
              className="logo-ticker-image"
            />  */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

