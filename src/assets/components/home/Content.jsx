import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Content = ({ loading, setShowReserva, onlyHomeTwo = false }) => {
  const redes = [
    { url: "https://maps.app.goo.gl/w3ARr68Ps4bvSYrp7", icon: "map" },
    {
      url: "https://www.facebook.com/profile.php?id=100063785760156&mibextid=eHce3h",
      icon: "facebook",
    },
    { url: "https://www.instagram.com/entrepues/", icon: "instagram" },
  ];

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="w-full fixed h-auto bg-black z-[200] top-0 left-0 text-secondary flex flex-col items-center justify-between pt-8"
          >
            <div
              className={`w-[80%] flex items-start  ${
                onlyHomeTwo ? "justify-center" : "justify-between"
              }`}
            >
              {/* solo para Menu: se ocultan con opacity */}
              <div className=" flex justify-start w-[33.33%]">
                <figure
                  className={`h-20 w-auto  cursor-pointer transition-opacity duration-300 ${
                    onlyHomeTwo
                      ? " hidden pointer-events-none"
                      : " inline-block"
                  }`}
                  onClick={() => !onlyHomeTwo && navigate("/")}
                >
                  <img
                    className="w-4 object-contain"
                    src="/imagenes/atrasMenu.svg"
                    alt="regresar"
                  />
                </figure>
              </div>

              <div className=" flex justify-center w-[33.33%]">
                <figure className=" md:h-20 w-auto h-12 inline-block">
                  <img
                    className="size-full object-contain"
                    src="/entrepues.svg"
                    alt=""
                  />
                </figure>
              </div>

              <div className="  flex md:gap-10 gap-4 justify-end w-[33.33%]">
                <figure
                  className={` h-5 w-auto  transition-opacity duration-300 ${
                    onlyHomeTwo
                      ? " hidden pointer-events-none"
                      : " inline-block"
                  }`}
                >
                  <img
                    className="size-full object-contain"
                    src="/imagenes/carritoEntrepues.svg"
                    alt="logo pues"
                  />
                </figure>

                {/* === HAMBURGUESA: ABRE MODAL === */}
                <figure
                  className={`h-10 w-auto transition-opacity duration-300 cursor-pointer ${
                    onlyHomeTwo
                      ? " hidden pointer-events-none"
                      : " inline-block"
                  }`}
                  onClick={() => setMenuOpen(true)}
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? setMenuOpen(true) : null
                  }
                  aria-label="Abrir menú"
                  role="button"
                >
                  <img
                    className="w-8 object-contain"
                    src="/imagenes/hamburguesaMenu.svg"
                    alt="Abrir menú"
                  />
                </figure>
              </div>
            </div>

            {/* SOLO muestra los links y botones si onlyHomeTwo es true */}
            {onlyHomeTwo && (
              <div className="w-full flex flex-col gap-10 text-2xl">
                <div className=" flex  md:flex-row flex-col justify-center items-center gap-4 font-medium overflow-hidden">
                  <motion.a
                    href="/carta"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 1.5, ease: "easeInOut" }}
                    className="cursor-pointer text-center border border-secondary rounded-md min-w-52 py-1 pb-2"
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
                    href="/video"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 2, ease: "easeInOut" }}
                    className="cursor-pointer text-center border border-secondary rounded-md min-w-52 py-1 pb-2"
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
                  {redes.map((i, inx) => (
                    <Link
                      target="_blank"
                      to={i.url}
                      className="w-6 h-6 inline-block"
                      key={inx}
                    >
                      <img
                        className="size-full object-contain"
                        src={`/${i.icon}.svg`}
                        alt={i.icon}
                      />
                    </Link>
                  ))}
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== MODAL PANTALLA COMPLETA ===================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu-modal"
            className="fixed inset-0 z-[400] flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Fondo (clic para cerrar) */}
            <motion.div
              className="absolute inset-0 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Contenido del modal --------------------------------------------------------------------------------- */}
            <motion.div
              className="relative z-[401] w-full h-full  text-secondary flex"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 1, ease: "easeInOut" }}
              role="dialog"
              aria-modal="true"
              aria-label="Menú principal"
            >
              <div className="md:w-[60%] w-0  backdrop-blur-sm"></div>
              <div className="md:w-[40%] w-full bg-black flex flex-col">
                {/* CONTENIDO (logo + links + redes en un solo bloque) */}
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full border border-secondary/50 hover:bg-secondary hover:text-black transition"
                  aria-label="Cerrar menú"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-2 w-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </button>

                <div className="flex-1 w-full RovelleUnoBold max-w-xl mx-auto px-6 py-6 flex flex-col items-center justify-center gap-20 text-2xl">
                  {/* Logo integrado al contenido */}
                  <figure className="h-auto w-auto">
                    <img
                      className="h-15 w-auto object-contain"
                      src="/entrepues.svg"
                      alt="Entrepues"
                    />
                  </figure>

                  {/* Links (hover con borde del tamaño del texto) */}
                  <div className="flex h-[40%] RovelleUnoBold flex-col justify-around items-center gap-6 text-2xl">

                  <a
                    href="/video"
                    className="self-center inline-block py-3 border-b-2 border-transparent hover:border-white transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Visitar 360°
                  </a>

                  <a
                    href="/carta"
                    className="self-center inline-block py-3 border-b-2 border-transparent hover:border-white transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Menú
                  </a>

                  <button
                    className="self-center inline-block text-white py-3 border-b-2 border-transparent hover:border-white transition-colors duration-200"
                    onClick={() => {
                      setMenuOpen(false);
                      setShowReserva?.(true);
                    }}
                  >
                    Reservar
                  </button>
                  </div>

                  {/* Redes (antes en el footer) ahora dentro del contenido */}
                  <div className="pt-6 flex items-center justify-center gap-8">
                    {redes.map((i, inx) => (
                      <Link
                        target="_blank"
                        to={i.url}
                        className="w-6 h-6 inline-block"
                        key={inx}
                        onClick={() => setMenuOpen(false)}
                      >
                        <img
                          className="size-full object-contain"
                          src={`/${i.icon}.svg`}
                          alt={i.icon}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* =================================================================== */}
    </>
  );
};
