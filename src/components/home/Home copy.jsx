import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Header } from "../header/Header";
import { Titulo } from "../ui/Titulo";
import { easing } from "../../constants/easing";
import { CallToActions } from "../common/CallToAction/CallToActions";

export const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header loading={true} />
      <main
        style={{
          backgroundImage: isMobile
            ? 'url("/imagenes/background-home.jpg")'
            : 'url("/imagenes/background-home.jpg")',
        }}
        className="size-full flex flex-col items-center justify-center max-md:gap-12 max-md:pt-18 relative "
      >
        <div className="size-full relative z-10 flex flex-col items-center justify-center md:pt-28 md:gap-8 gap-12">
          <Titulo />
          {/* Carne PNG (z-10) */}
          <motion.img
            className="w-120 scale-170 h-fit object-cover z-10 pointer-events-none"
            src="/imagenes/fondo-carne.png"
            alt=""
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              opacity: { duration: 1.5, ease: easing, delay: 0 },
              scale: { duration: 3, ease: "linear", delay: 0 },
            }}
            style={{ willChange: "transform, opacity" }}
          />
          <CallToActions />
        </div>

        <motion.div className="absolute size-full overflow-hidden z-0 pointer-events-none">
          {/* Fondo */}
          <motion.img
            className="w-full h-full object-cover z-0"
            src="/imagenes/fondo-home.jpg"
            alt=""
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.25 }}
            transition={{
              opacity: { duration: 1.5, ease: easing, delay: 0 },
              scale: { duration: 3, ease: "linear", delay: 0 },
            }}
            style={{ willChange: "transform, opacity" }}
          />
        </motion.div>
        {/* Humo (arriba de todo) */}
        <video
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] md:w-full h-full object-cover z-30 mix-blend-screen pointer-events-none"
          src={"/imagenes/humo.mp4"}
          autoPlay
          loop
          muted
          playsInline
        />
      </main>
    </>
  );
};
