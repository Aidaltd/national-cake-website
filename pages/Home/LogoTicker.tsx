"use client"
import Partner1 from '@/assets/11.jpg'
import Partner2 from '@/assets/12.jpg'
import Partner3 from '@/assets/13.jpg'
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

