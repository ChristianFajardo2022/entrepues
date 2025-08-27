import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Content } from "./home/Content";
import SectionReserva from "./SectionReserva";
import SectionReservaMobile from "./SectionReservaMobile";

const easing = [0.22, 1, 0.36, 1];

// Variantes por palabra
const wordVariants = {
  initial: { opacity: 0, filter: "blur(10px)" },
  show: (delay = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay, duration: 1.6, ease: easing },
  }),
};

// Palabra que se anima SOLO una vez y luego queda fija
function WordOnce({ children, d = 0 }) {
  const [played, setPlayed] = useState(false);

  return (
    <motion.span
      className="inline-block align-top mr-4"
      variants={wordVariants}
      custom={d}
      initial={played ? false : "initial"}
      animate={played ? undefined : "show"}
      inherit={false}
      onAnimationComplete={() => setPlayed(true)}
      style={{ willChange: played ? "auto" : "filter, opacity" }}
    >
      {children}
    </motion.span>
  );
}

export const HomeTwo = () => {
  const [loading, setloading] = useState(false);
  const [showReserva, setShowReserva] = useState(false);

  const titleControls = useAnimation();

  useEffect(() => {
    const t = setTimeout(() => setloading(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // SOLO mueve el H1 en Y cuando loading=true
  useEffect(() => {
    if (loading) {
      titleControls.start({
        y: -130,
        transition: { duration: 3, ease: "easeOut" },
      });
    }
  }, [loading, titleControls]);

  return (
    <main className="w-full h-dvh relative overflow-hidden">
      <motion.div className="size-full relative overflow-hidden z-10">
        {/* Humo (arriba de todo) */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-50 mix-blend-screen pointer-events-none"
          src={"/imagenes/humo.mp4"}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* H1 (solo traslada en Y al cargar) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-fit flex justify-center items-center z-10">
          <motion.h1
            animate={titleControls}
            className="-translate-y-0 text-secondary text-center text-7xl font-black leading-12 "
            style={{ willChange: "transform" }}
          >
            {/* Línea 1 */}
            <WordOnce d={0.0}>La cocina</WordOnce> <br />
            <WordOnce d={0.5}>de nuestro país</WordOnce>
            <br />
            {/* Línea 2 */}
            <WordOnce d={1.5}>preparada para tí</WordOnce>
            <br />
          </motion.h1>
        </div>

        {/* Overlay: visible al inicio; al cargar, se va hacia arriba */}
        <AnimatePresence initial={false}>
          {!loading && (
            <motion.div
              key="overlay"
              className="absolute inset-0 bg-black z-[5]"
              initial={{ y: "0%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 1, ease: easing }}
            />
          )}
        </AnimatePresence>

        {/* Fondo */}
        <motion.img
          className="w-full h-full object-cover z-0 pointer-events-none"
          src="/imagenes/fondo-home.jpg"
          alt=""
          animate={
            loading ? { opacity: 1, scale: 1.25 } : { opacity: 0, scale: 1 }
          }
          transition={{
            opacity: { duration: 1, ease: easing },
            scale: { duration: 3, ease: "linear" },
          }}
          style={{ willChange: "transform, opacity" }}
        />

        {/* Carne PNG (z-10) */}
        <motion.img
          className="absolute w-auto h-fit object-cover z-10 -bottom-26 scale-75 opacity-0 pointer-events-none"
          src="/imagenes/fondo-carne.png"
          alt=""
          animate={
            loading ? { opacity: 1, scale: 0.8 } : { opacity: 0, scale: 0.75 }
          }
          transition={{
            opacity: { duration: 1, ease: easing },
            scale: { duration: 3, ease: "linear" },
          }}
          style={{ willChange: "transform, opacity" }}
        />
      </motion.div>
      <Content loading={loading} setShowReserva={setShowReserva} />

      {showReserva && (
        <>
          <div className="hidden md:block absolute inset-0 z-[500]">
            <SectionReserva onClose={() => setShowReserva(false)} />
          </div>
          <div className="block md:hidden absolute inset-0 z-[500]">
            <SectionReservaMobile onClose={() => setShowReserva(false)} />
          </div>
        </>
      )}
    </main>
  );
};
