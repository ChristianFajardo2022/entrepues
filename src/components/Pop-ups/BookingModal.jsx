import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import useReservaStore from "../../store/reservaStore";
import useCartStore from "../../store/cartStore";
import useMenuStore from "../../store/menuStore";

import { ModalLayout } from "../layout/ModalLayout";
import PasoFecha from "../reserva/PasoFecha";
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
} from "lucide-react";
import { p } from "framer-motion/client";
import SliderVertical from "./slider/SliderVertical";

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
    setCompletedSteps,
    reservaData,
    updateReservaData,
    originOpen,
    showResumen,
    showThankYou,
    markResumenAsShown,
    editarReserva,
    enviarDatos,
    isSending,
    reservaResult,
    showThankYouPage,
    closeThankYou,
  } = useReservaStore();
  const { cartItems, removeFromCart, openSidebarCart, closeSidebarCart } =
    useCartStore();
  const { openMenuWithContext } = useMenuStore();
  const isMobile = useIsMobile();

  // Estados derivados del store
  const stepRefs = useRef([]);
  const scrollModalRef = useRef(null);
  const [isContactValid, setIsContactValid] = useState(false);

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
  const email = reservaData.email;
  const whatsapp = reservaData.whatsapp;

  // Configuración de pasos - 4 pasos separados
  const pasos = [
    {
      titulo: "Elige una Fecha",
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
      titulo: "Personas",
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
      titulo: "Datos de contacto",
      icon: ListChecks,
      descripcion: completedSteps[3] ? name : "",
    },
  ];

  // Funciones helper para actualizar datos
  const updateReservaField = (field, value) => {
    updateReservaData({ [field]: value });
  };

  const setSelectedDate = (date) => {
    // Convertir Date a ISO string para almacenamiento
    const isoString = date instanceof Date ? date.toISOString() : date;
    updateReservaField("selectedDate", isoString);
  };
  const setHour = (hour) => updateReservaField("hour", hour);
  const setMinute = (minute) => updateReservaField("minute", minute);
  const setAdults = (adults) => updateReservaField("adults", adults);
  const setChildren = (children) => updateReservaField("children", children);
  const setMascotas = (mascotas) => updateReservaField("mascotas", mascotas);
  const setName = (name) => updateReservaField("name", name);
  const setEmail = (email) => updateReservaField("email", email);
  const setWhatsapp = (whatsapp) => updateReservaField("whatsapp", whatsapp);

  // Confirmar paso actual y pasar al siguiente
  const confirmarPaso = () => {
    const newCompleted = [...completedSteps];
    newCompleted[currentStep] = true;
    setCompletedSteps(newCompleted);

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Al completar el último paso, marcar resumen como mostrado
      markResumenAsShown();
    }
  };

  // Volver al paso anterior
  const voltearPaso = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Editar reserva (volver a pasos)
  const handleEditarReserva = () => {
    // Encontrar el último paso completado para volver a ese
    const lastCompletedStep = completedSteps.reduce(
      (lastIndex, completed, index) => {
        return completed ? index : lastIndex;
      },
      0
    );
    editarReserva(lastCompletedStep);
  };

  // Confirmar la reserva
  const handleConfirmarReserva = async () => {
    if (!name.trim() || !email.trim() || !whatsapp.trim()) {
      alert("Por favor completa todos los datos de contacto");
      return;
    }

    // Enviar datos a Firestore
    const result = await enviarDatos();

    if (result.ok) {
      //confirmarPaso();
      showThankYouPage();
    } else {
      alert("Error al confirmar la reserva: " + result.error);
    }
  };

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

  if (isSending) {
    return (
      <ModalLayout
        ref={scrollModalRef}
        activeModal={isBookingOpen}
        closeModal={closeBooking}
        Title="Confirmando tu reserva..."
        close={false}
      >
        <div className="w-full px-2 md:max-w-xl mx-auto select-none py-8">
          <p className="text-center">
            Por favor espera mientras confirmamos tu reserva.
          </p>
        </div>
      </ModalLayout>
    );
  }

  if (showThankYou) {
    // Si mostrar Thank You Page
    return (
      <ModalLayout
        ref={scrollModalRef}
        activeModal={isBookingOpen}
        closeModal={handleCloseThankYou}
        //Title="¡Reserva confirmada!"
        header={true}
        close={false}
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

  return (
    <ModalLayout
      ref={scrollModalRef}
      activeModal={isBookingOpen}
      closeModal={closeBooking}
      originBack={originOpen}
      close
      full
    >
      <div className="size-full flex">
        <div className="w-1/2 h-full space-y-6 pr-42">
          <h2 className="text-5xl font-bold">Realiza una reserva</h2>
          <h3 className="text-secondary/80">
            Te invitamos a realizar el proceso de reserva en unos simples pasos
          </h3>
          <AnimatePresence>
            {pasos.map((paso, index) => {
              const isExpanded = currentStep === index;
              const isCompleted = completedSteps[index];

              return (
                <motion.div
                  ref={(el) => (stepRefs.current[index] = el)}
                  key={index}
                  className=" text-secondary/80"
                >
                  {/* Header del paso */}
                  <HeaderPaso
                    index={index}
                    paso={paso}
                    content={
                      <>
                        {paso.descripcion === "" ? (
                          <></>
                        ) : (
                          <>
                            <paso.icon className="size-5" />
                            <p className="ml-2">
                              {paso.descripcion || "-- /--"}
                            </p>
                          </>
                        )}
                      </>
                    }
                    isExpanded={isExpanded}
                    isCompleted={isCompleted}
                    currentStep={currentStep}
                    onClick={() => {
                      if (isCompleted || index < currentStep) {
                        setCurrentStep(index);
                      }
                    }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <SliderVertical />
      </div>
    </ModalLayout>
  );
}
