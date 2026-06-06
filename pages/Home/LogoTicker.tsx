"use client"
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
            {/* Missing Images commented out
            <Image
              src={Partner1}
              alt="Acme Logo"
              className="logo-ticker-image"
            />
            */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

