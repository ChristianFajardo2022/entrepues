import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="w-full fixed h-auto bg-black z-[200] top-0 left-0 text-secondary flex flex-col items-center justify-between pt-8"
        >
          <div className={`w-[80%] flex items-start  ${onlyHomeTwo ? "justify-center" : "justify-between"}`}>
            {/* solo para Menu: se ocultan con opacity */}
            
            <figure
              className={`h-20 w-[33.33%] bg-amber-50  cursor-pointer transition-opacity duration-300 ${
                onlyHomeTwo ? " hidden pointer-events-none" : " inline-block"
              }`}
              onClick={() => !onlyHomeTwo && navigate("/")}
            >
              <img
                className="w-4 object-contain"
                src="/imagenes/atrasMenu.svg"
                alt="regresar"
              />
            </figure>
            <figure className=" md:h-20 w-[33.33%] bg-amber-50 h-12 inline-block">
              <img
                className="size-full object-contain"
                src="/entrepues.svg"
                alt=""
              />
            </figure>
            <div className="  flex gap-10 bg-amber-50 w-[33.33%]">
              <figure  className={` h-5 w-auto  transition-opacity duration-300 ${
                onlyHomeTwo ? " hidden pointer-events-none" : " inline-block"
              }`}>
              <img
                className="size-full object-contain"
                src="/imagenes/carritoEntrepues.svg"
                alt="logo pues"
              />  
              </figure>

            <figure
              className={`h-10 w-auto transition-opacity duration-300 ${
                onlyHomeTwo ? " hidden pointer-events-none" : " inline-block"
              }`}
            >
              <img
                className="w-8 object-contain"
                src="/imagenes/hamburguesaMenu.svg"
                alt=""
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
  );
};
