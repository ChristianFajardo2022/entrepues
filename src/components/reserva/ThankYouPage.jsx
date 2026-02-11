import { motion } from "framer-motion";
import { Check, Home, Notebook, X } from "lucide-react";
import { Button } from "../ui/Button";

/**
 * Página de agradecimiento después de confirmar la reserva
 */
export default function ThankYouPage({
  onClose,
  reservaResult,
  isMobile,
  handleAbrirMenu,
}) {
  const numeroReserva = reservaResult?.["numero-de-reserva"] || "N/A";
  const email = reservaResult?.email || "";
  const fecha = reservaResult?.fecha || "";
  const hora = reservaResult?.hora || "";

  return (
    <div className="w-full px-2 md:max-w-xl mx-auto py-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="text-center space-y-6"
      >
        {/* Título */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-5xl scale-y-75 mb-8">
            Gracias por tu reserva
          </h2>
          <p className="">
            Aquí te esperamos con el sabor de Colombia <br /> servido como en
            casa.
          </p>
        </motion.div>

        {/* Detalles de la reserva */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div>
            <p className="text-secondary/70">N° de reserva</p>

            <p className="text-3xl md:text-4xl scale-y-75 font-bold">
              {numeroReserva}
            </p>
          </div>
          <p>Te enviamos los detalles al correo</p>

          <hr className="border-secondary/30 my-10 w-11/12 mx-auto" />
          <p>¿Quieres elegir tus platos ahora o prefieres hacerlo al llegar?</p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center items-center gap-14 w-11/12 mx-auto"
          >
            <Button
              type="button-primary"
              onClick={handleAbrirMenu}
              Icon={Notebook}
              title="Si, elegir ahora"
              width="full"
              fontSize={isMobile ? "xs" : "lg"}
            />
            <Button
              type="button-thirty"
              onClick={onClose}
              Icon={X}
              title="No, finalizar"
              width="full"
              fontSize={isMobile ? "xs" : "lg"}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
