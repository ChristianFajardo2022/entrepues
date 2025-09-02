import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Variantes para el contenedor de las tarjetas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Retraso secuencial entre los hijos
    },
  },
};

// Variantes para cada tarjeta individual
const itemVariants = {
  hidden: { x: 50, opacity: 0 }, // Movimiento hacia abajo y opacidad 0
  visible: { x: 0, opacity: 1 }, // Regreso a la posición original y opacidad 1
};
export const Menu = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Establece loading en true para mostrar las tarjetas
    // He reducido el tiempo para una prueba más rápida
    setTimeout(() => {
      setLoading(true);
    }, 2500);
  }, []);

  return (
    <motion.div
      initial={{ width: "100%", paddingTop: 0 }}
      animate={{ width: "80%", paddingTop: "6rem" }}
      transition={{ delay: 2.3, duration: 0.5, ease: "easeInOut" }}
      className="w-full h-dvh mx-auto flex flex-col items-center justify-start z-50 overflow-hidden relative bg-[#0b0b0b] gap-12"
    >
      <motion.div
        initial={{ height: "100%", borderRadius: 0 }}
        animate={{ height: "50%", borderRadius: "1rem" }}
        transition={{ delay: 2, duration: 0.5, ease: "easeInOut" }}
        className="size-full relative overflow-hidden z-10"
      >
        <video
          className="size-full object-cover z-50 pointer-events-none"
          src={"/video/menu-intro.mp4"}
          autoPlay
          loop
          muted
          playsInline
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            className="w-full flex justify-between items-center text-white"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cards.map((card, index) => (
              <CardCategories key={index}>
                <figure className="size-full inline-block overflow-hidden rounded-lg mb-2 hover:scale-105 hover:brightness-110 transition-all duration-300 select-none">
                  <img
                    className="size-full object-cover"
                    src={card.image}
                    alt={card.title}
                  />
                </figure>
                {card.title}
              </CardCategories>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CardCategories = ({ children }) => {
  return (
    <motion.div
      variants={itemVariants} // Usa las variantes del componente padre
      className="w-6/12 sm:w-4/12 md:w-2/12 px-2 text-start text-sm font-medium cursor-pointer "
    >
      {children}
    </motion.div>
  );
};

const cards = [
  { title: "Desayunos", image: "/imagenes/categorias/desayunos.jpg" },
  { title: "Entradas", image: "/imagenes/categorias/entradas.jpg" },
  { title: "Plato fuerte", image: "/imagenes/categorias/plato-fuerte.jpg" },
  { title: "Bebidas", image: "/imagenes/categorias/bebidas.jpg" },
  { title: "Postres", image: "/imagenes/categorias/postres.jpg" },
];
