import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import useReservaStore from "../../store/reservaStore";
import useCartStore from "../../store/cartStore";
import useMenuStore from "../../store/menuStore";

import { ModalLayout } from "../layout/ModalLayout";
import PasoFecha from "../reserva/datepicker/PasoFecha";
import PasoHora from "../reserva/PasoHoraMain";
import PasoCantidad from "../reserva/PasoCantidad";
import PasoContacto from "../reserva/PasoContacto";
import ResumenCard from "../reserva/ResumenCard";
import ButtonNextAndBack from "../reserva/ButtonNextAndBack";
import HeaderPaso from "../reserva/HeaderPaso";
import ThankYouPage from "../reserva/ThankYouPage";
import { getAmPm, convertTo12Hour } from "../reserva/horaUtils";
import { useIsMobile } from "../../hooks/useIsMobile";
import { AbrirMenu } from "../common/AbrirMenu";
import { BackgroundCards } from "../ui/BackgroundCards";
import {
  Calendar,
  CornerDownLeft,
  ListChecks,
  Timer,
  User,
  X,
} from "lucide-react";
import { p } from "framer-motion/client";
import SliderVertical from "./slider/SliderVertical";
import { Logo } from "../ui/Logo";

/**
 * Modal de reserva con acordeón vertical (paso a paso)
 * Pasos: Fecha + Hora → Personas → Datos de contacto
 * Luego muestra un resumen en card separada
 */
export default function BookingModal() {
  const {
    isBookingOpen,
    closeBooking,
    currentStep,
    setCurrentStep,
    completedSteps,
    reservaData,
    originOpen,
    showThankYou,
    isSending,
    reservaResult,
    closeThankYou,
  } = useReservaStore();
  const { openSidebarCart, closeSidebarCart } = useCartStore();
  const { openMenuWithContext } = useMenuStore();
  const isMobile = useIsMobile();

  // Estados derivados del store
  const stepRefs = useRef([]);
  const scrollModalRef = useRef(null);

  // Estados derivados del store
  const selectedDate = reservaData.selectedDate
    ? new Date(reservaData.selectedDate)
    : new Date();
  const hour = reservaData.hour;
  const minute = reservaData.minute;
  const adults = reservaData.adults;
  const children = reservaData.children;
  const mascotas = reservaData.mascotas;
  const name = reservaData.name;

  // Configuración de pasos - 4 pasos separados
  const pasos = [
    {
      titulo: "Fecha",
      icon: Calendar,
      descripcion: completedSteps[0]
        ? selectedDate.toLocaleDateString("es-CO", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })
        : "",
    },
    {
      titulo: "Hora",
      icon: Timer,
      descripcion: completedSteps[1]
        ? `${convertTo12Hour(hour)}:${minute} ${getAmPm(hour)}`
        : "",
    },
    {
      titulo: "Visitantes",
      icon: User,
      descripcion: completedSteps[2]
        ? `${adults} adulto${adults !== 1 ? "s" : ""}${
            children > 0 ? `, ${children} niño${children !== 1 ? "s" : ""}` : ""
          }${
            mascotas > 0
              ? `, ${mascotas} mascota${mascotas !== 1 ? "s" : ""}`
              : ""
          }`
        : "",
    },
    {
      titulo: "Contacto",
      icon: ListChecks,
      descripcion: completedSteps[3] ? name : "",
    },
  ];

  // Abrir menú con contexto de reserva
  const handleAbrirMenu = () => {
    /* envia la activacion "true" a algun Estado para activar el sidebar del carrito */
    openSidebarCart();
    closeBooking();
    openMenuWithContext("reserva");
  };

  // Cerrar Thank You y volver al inicio
  const handleCloseThankYou = () => {
    closeSidebarCart();
    closeThankYou();
  };

  // Si mostrar Thank You Page
  return (
    <ModalLayout
      ref={scrollModalRef}
      activeModal={isBookingOpen}
      closeModal={handleCloseThankYou}
      close={false}
      header={<HeaderReserva closeBooking={closeBooking} close={false} />}
    >
      <ThankYouPage
        onClose={handleCloseThankYou}
        reservaResult={reservaResult}
        isMobile={isMobile}
        handleAbrirMenu={handleAbrirMenu}
      />
    </ModalLayout>
  );
}

const HeaderReserva = ({ closeBooking, close = true }) => {
  return (
    <div className="w-full flex justify-between items-center px-4 py-2 max-w-5xl mx-auto">
      <div />
      <Logo color="dark" size="md" />
      {close ? (
        <button onClick={closeBooking}>
          <X />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
};
