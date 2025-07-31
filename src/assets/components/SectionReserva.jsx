import React, { useState } from "react";
import { Link } from "react-router-dom";
import PasoFecha from "./reserva/PasoFecha";
import PasoHora from "./reserva/PasoHora";
import PasoCantidad from "./reserva/PasoCantidad";
import PasoContacto from "./reserva/PasoContacto";
import PasoResumen from "./reserva/PasoResumen";
import PasoConfirmacion from "./reserva/PasoConfirmacion";
import Iconoprincipal from "./Iconoprincipal";

const SectionReserva = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);
  const [amPm, setAmPm] = useState("am");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex md:flex-row flex-col items-end">
      <Iconoprincipal />
      {/* Lado izquierdo con blur */}
      <div className="md:w-[60%] w-full md:h-full h-[25%]  bg-black/30 backdrop-blur-sm">
        {/*         <Link className="absolute  left-40 top-10 md:block hidden" to="/">
          <img className="w-38 z-50" src="/entrepues.svg" alt="Logo" />
        </Link>
 */}{" "}
      </div>

      {/* Lado derecho */}
      <div className="md:w-[40%] w-full md:h-full h-[75%] text-[#fff6ea] p-10 relative flex flex-col items-center">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/fondoReserva.jpg"
          alt="Fondo"
        />
        <div className="relative z-10 flex md:w-[27.5rem] md:h-[20rem] w-full h-60 items-end">
          <p
            className={`text-[1.7rem] z-10 mb-6 tracking-[0.2em] DansonSemiBold border-b border-[#fff6ea50] text-start w-full ${
              confirmed ? "hidden" : ""
            }`}
          >
            {step === 5 ? "TU RESERVA" : "DATOS DE LA RESERVA"}
          </p>

          <button
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              }
            }}
            className={`text-xl absolute -left-5 top-10 cursor-pointer ${
              step === 1 || confirmed ? "hidden" : ""
            }`}
          >
            <img className="w-4" src="/videos/icono atras-09.svg" />
          </button>
          <button
            onClick={onClose}
            className="text-xl absolute -right-5 top-10 cursor-pointer"
          >
            <img className=" w-4" src="/videos/cerrarReserva-09.svg" />
          </button>
        </div>

        {/* Contenedor de pasos (fondo ámbar) */}
        <div className="flex flex-col items-center justify-center h-full z-10 md:w-[27.5rem] w-full">
          {confirmed ? (
            <PasoConfirmacion />
          ) : (
            <>
              {step === 1 && (
                <PasoFecha
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              )}
              {step === 2 && (
                <PasoHora
                  hour={hour}
                  minute={minute}
                  amPm={amPm}
                  setHour={setHour}
                  setMinute={setMinute}
                  setAmPm={setAmPm}
                />
              )}
              {step === 3 && (
                <PasoCantidad
                  adults={adults}
                  children={children}
                  setAdults={setAdults}
                  setChildren={setChildren}
                />
              )}
              {step === 4 && (
                <PasoContacto
                  name={name}
                  email={email}
                  whatsapp={whatsapp}
                  setName={setName}
                  setEmail={setEmail}
                  setWhatsapp={setWhatsapp}
                />
              )}
              {step === 5 && (
                <PasoResumen
                  name={name}
                  selectedDate={selectedDate}
                  hour={hour}
                  minute={minute}
                  amPm={amPm}
                  adults={adults}
                  children={children}
                  onConfirm={() => setConfirmed(true)}
                />
              )}
            </>
          )}
        </div>

        {/* Línea de progreso con dots conectados */}
        <div className=" mb-20 w-full flex items-center justify-center z-20">
          <div className="relative w-[4rem] flex items-center justify-between">
            {/* Línea base */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#fff6ea30] -translate-y-1/2"></div>

            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full border-2 z-10 ${
                  step >= i ? "bg-[#918e8b]" : "bg-transparent"
                } border-[#918e8b]`}
              ></div>
            ))}
          </div>
        </div>

        {/* Botón "Siguiente" FUERA del div bg-amber-700 */}
        {/* Botón inferior: dinámico según paso o confirmación */}
        <div className="z-10 h-[10rem] w-full flex items-start justify-center">
          {confirmed ? (
            <button
              className="px-6 py-2 border w-[27.5rem] border-[#fff6ea41] RovelleUnoBold rounded-full hover:bg-[#fff6ea] hover:text-black transition cursor-pointer"
              onClick={onClose}
            >
              Salir
            </button>
          ) : (
            step < 5 && (
              <button
                className="px-6 py-2 border md:w-[27.5rem] w-full border-[#fff6ea41] RovelleUnoBold rounded-full hover:bg-[#fff6ea] hover:text-black transition cursor-pointer"
                disabled={step === 1 && !selectedDate}
                onClick={() => {
                  if (step === 1 && selectedDate) setStep(2);
                  else if (step === 2) setStep(3);
                  else if (step === 3) setStep(4);
                  else if (step === 4) setStep(5);
                }}
              >
                Siguiente
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionReserva;
