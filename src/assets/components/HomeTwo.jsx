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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const titleControls = useAnimation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] md:w-full h-full object-cover z-50 mix-blend-screen pointer-events-none"
          src={"/imagenes/humo.mp4"}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* H1 (solo traslada en Y al cargar) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 md:w-fit w-full flex justify-center items-center z-10">
          <motion.h1
            animate={titleControls}
            className="-translate-y-0 text-secondary text-center md:text-7xl text-4xl font-black leading-8 md:leading-[3rem] px-4"
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
          className="absolute w-auto h-fit object-cover z-10 md:-bottom-26 bottom-80 scale-75 opacity-0 pointer-events-none"
          src="/imagenes/fondo-carne.png"
          alt=""
          animate={
            loading
              ? { opacity: 1, scale: isMobile ? 3 : 0.8 }
              : { opacity: 0, scale: 0.75 }
          }
          transition={{
            opacity: { duration: 1, ease: easing },
            scale: { duration: 3, ease: "linear" },
          }}
          style={{ willChange: "transform, opacity" }}
        />
      </motion.div>
      {/* SOLO muestra los links y botones en HomeTwo */}
      <Content loading={loading} setShowReserva={setShowReserva} />
      {loading && (
        <div className="w-full flex flex-col gap-10 text-2xl absolute left-0 bottom-0 z-[201] mb-16">
          <div className="flex md:flex-row flex-col justify-center items-center gap-4 font-medium RovelleUnoBold overflow-hidden">
            <motion.a
              href="/carta"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.5, ease: "easeInOut" }}
              className="cursor-pointer text-[color:var(--secondary)] text-center hover:bg-[#fff6ea] hover:text-black border border-secondary rounded-md min-w-52 py-1 pb-2"
            >
              Menú
            </motion.a>
            <motion.button
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.7, ease: "easeInOut" }}
              className="cursor-pointer text-center bg-secondary text-black border border-secondary rounded-md min-w-52 py-1 pb-2"
              onClick={() => setShowReserva?.(true)}
            >
              Reservar
            </motion.button>
            <motion.a
              href="/descubrenos"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 2, ease: "easeInOut" }}
              className="cursor-pointer text-[color:var(--secondary)] hover:bg-[#fff6ea] hover:text-black text-center border border-secondary rounded-md min-w-52 py-1 pb-2"
            >
              Descúbrenos
            </motion.a>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, ease: "easeInOut" }}
            className="flex justify-center items-center gap-12"
          >
            {/*
              { url: "https://maps.app.goo.gl/w3ARr68Ps4bvSYrp7", icon: "map" },
              {
                url: "https://www.facebook.com/profile.php?id=100063785760156&mibextid=eHce3h",
                icon: "facebook",
              },
              { url: "https://www.instagram.com/entrepues/", icon: "instagram" },
            */}
            {["map", "facebook", "instagram"].map((icon, inx) => (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="#"
                className="w-6 h-6 inline-block"
                key={inx}
              >
                <img
                  className="size-full object-contain"
                  src={`/${icon}.svg`}
                  alt={icon}
                />
              </a>
            ))}
          </motion.div>
        </div>
      )}

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
