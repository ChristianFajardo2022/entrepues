"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import CategoriaSelected from "./CategoriaSelected";
import { Content } from "../home/Content";

// Variantes para el contenedor de las tarjetas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Variantes para cada tarjeta individual (entrada)
const itemVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export const Menu = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoading(true), 2500);
  }, []);

  const handleSelect = (title) => setSelectedCategory(title);

  return (
    <motion.div
      initial={{ width: "100%", paddingTop: 0 }}
      animate={{ width: "80%", paddingTop: "7.8rem" }}
      transition={{ delay: 2.3, duration: 0.5, ease: "easeInOut" }}
      className={`w-full h-dvh mx-auto flex flex-col items-center justify-start z-50 ${
        selectedCategory ? "overflow-auto no-scrollbar" : "overflow-hidden"
      } relative bg-[#0b0b0b] gap-12`}
    >
      {/* Renderiza Content después de la animación inicial */}
      <Content loading={loading} onlyHomeTwo={false} />

      {/* HERO VIDEO: animación inicial EXACTA; luego colapsa a height: 0 al seleccionar */}
      <motion.div
        className="size-full relative overflow-hidden z-10"
        initial={{ height: "100%", borderRadius: 0 }}
        animate={
          selectedCategory
            ? { height: 0, borderRadius: "1rem" } // colapso suave
            : { height: "45%", borderRadius: "1rem" } // animación inicial intacta
        }
        transition={
          selectedCategory
            ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
            : { delay: 2, duration: 0.5, ease: "easeInOut" }
        }
        style={{ willChange: "height" }}
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

      <div className="w-full z-50">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              className="w-full flex justify-between items-center text-[#FFF6EA]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {cards.map((card, index) => {
                const isActive = selectedCategory === card.title;
                const isDimmed = !!selectedCategory && !isActive;
                return (
                  <CardCategories
                    key={index}
                    onClick={() => handleSelect(card.title)}
                    isActive={isActive}
                    isDimmed={isDimmed}
                  >
                    <figure className="size-full inline-block hover:scale-105 overflow-hidden rounded-xl mb-2 transition-all duration-300 select-none">
                      <img
                        className="size-full object-cover"
                        src={card.image}
                        alt={card.title}
                      />
                    </figure>
                    {card.title}
                  </CardCategories>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CategoriaSelected solo aparece tras seleccionar una card */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              key={`cat-${selectedCategory}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-6"
            >
              <CategoriaSelected category={selectedCategory} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const CardCategories = ({ children, onClick, isActive, isDimmed }) => {
  return (
    <motion.div
      variants={itemVariants}
      // Opacidad dinámica con animación suave; la activa resalta, las demás se atenúan
      animate={{ opacity: isActive ? 1 : isDimmed ? 0.35 : 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`w-6/12 sm:w-4/12 md:w-2/12 px-2 text-start text-2xl font-medium cursor-pointer ${
        isActive ? "" : "hover:opacity-60 -scale-80 rotate-180"
      }`}
      onClick={onClick}
      aria-selected={isActive}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
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
