import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductPopup = ({ open, onClose, producto, onAdd }) => {
  const [cantidad, setCantidad] = useState(1);

  if (!producto) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/20 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-black rounded-2xl shadow-2xl flex md:flex-row flex-col items-center w-[90vw] max-w-[850px] md:h-[80vh] h-full md:max-h-[780px] md:min-h-[340px] overflow-hidden"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Imagen */}
            <div className=" flex md:flex-row flex-col w-full md:h-[80%] h-full relative md:pt-0 pt-30 overflow-auto">
              <div className=" md:w-1/2 w-full px-8 py-10 md:h-full h-[35%] flex items-center justify-center">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="object-cover w-full h-full rounded-2xl"
                />
              </div>
              {/* Info */}
              <div className="md:w-1/2 w-full flex flex-col justify-between h-auto md:py-10 py-5 md:pr-10 px-5">
                <button
                  className="text-[#FFF6EA] text-xs absolute md:top-4 top-30 right-2 z-50 cursor-pointer"
                  onClick={onClose}
                >
                  <img
                    className="w-4 h-4"
                    src="/imagenes/cerrarPopup.svg"
                    alt="Cerrar"
                  />
                </button>
                <div className=" w-full h-full">
                  <span className=" text-3xl RovelleUnoBold text-[#FFF6EA] mb-2">
                    {producto.nombre}
                  </span>
                  <div className="flex justify-between items-center border-b border-[#fff6ea62] py-8 mb-5">
                    <span className=" text-[#FFF6EA] RovelleUnoBold flex items-end">
                      <span className="mr-1 text-md">$</span>
                      <span className="text-2xl">
                        {new Intl.NumberFormat("es-CO", {
                          maximumFractionDigits: 0,
                        }).format(producto.precio)}
                      </span>
                    </span>
                    <div className="flex items-center gap-10">
                      <button
                        className="border border-[#FFF6EA] text-white rounded-lg w-10 h-10 flex items-center justify-center font-bold text-lg"
                        onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                      >
                        -
                      </button>
                      <span className="text-[#FFF6EA] RovelleUnoBold">
                        {cantidad}
                      </span>
                      <button
                        className="border border-[#FFF6EA] text-white rounded-lg w-10 h-10 flex items-center justify-center font-bold text-lg"
                        onClick={() => setCantidad((c) => c + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-[#FFF6EA] md:text-xl text-lg mb-4 RovelleUnoRegular">
                    {producto.descripcion || "Descripción del producto..."}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button
                    className="bg-[#FFF6EA] text-black font-bold rounded-lg py-3 w-[70%] hover:bg-[#ffe5c2] transition cursor-pointer"
                    onClick={() => {
                      onAdd?.(producto, cantidad);
                      onClose?.();
                    }}
                  >
                    Marchar el plato
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductPopup;
