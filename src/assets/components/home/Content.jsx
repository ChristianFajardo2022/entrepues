import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
export const Content = ({ loading, setShowReserva }) => {
  const redes = [
    { url: "https://maps.app.goo.gl/w3ARr68Ps4bvSYrp7", icon: "map" },
    {
      url: "https://www.facebook.com/profile.php?id=100063785760156&mibextid=eHce3h",
      icon: "facebook",
    },
    { url: "https://www.instagram.com/entrepues/", icon: "instagram" },
  ];
  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="w-full h-dvh absolute top-0 left-0 z-20 text-secondary flex flex-col items-center justify-between py-16"
        >
          <figure className="h-26 w-auto inline-block">
            <img
              className="size-full object-contain"
              src="/entrepues.svg"
              alt=""
            />
          </figure>
          <div className="w-full flex flex-col gap-10 text-2xl">
            <div className="flex justify-center items-center gap-4 font-medium overflow-hidden">
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
                onClick={() => setShowReserva(true)}
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
                    alt={i}
                  />
                </Link>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
