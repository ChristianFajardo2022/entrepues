import React from "react";

const PasoHora = ({ hour, minute, amPm, setHour, setMinute, setAmPm }) => {
  // Helpers para avanzar/reducir horas y minutos en formato string
  const incrementarHora = () => {
    const next = Number(hour) < 12 ? Number(hour) + 1 : 1;
    setHour(String(next).padStart(2, "0"));
  };

  const decrementarHora = () => {
    const prev = Number(hour) > 1 ? Number(hour) - 1 : 12;
    setHour(String(prev).padStart(2, "0"));
  };

  const incrementarMinuto = () => {
    const next = Number(minute) === 0 ? 30 : 0;
    setMinute(String(next).padStart(2, "0"));
  };

  const decrementarMinuto = () => {
    const prev = Number(minute) === 30 ? 0 : 30;
    setMinute(String(prev).padStart(2, "0"));
  };

  const cambiarAmPm = () => {
    setAmPm((prev) => (prev === "am" ? "pm" : "am"));
  };

  const horaAnterior = String(Number(hour) === 1 ? 12 : Number(hour) - 1).padStart(2, "0");
  const horaSiguiente = String(Number(hour) === 12 ? 1 : Number(hour) + 1).padStart(2, "0");
  const minutoAlterno = minute === "00" ? "30" : "00";
  const amPmAlterno = amPm === "am" ? "pm" : "am";

  return (
    <div className="flex flex-col z-10 items-center justify-center w-full my-16 RovelleUnoRegular">
      <div className="flex items-center justify-center gap-2 text-[1rem] relative">
        <div className="absolute border border-[#fff6ea50] w-11/12 h-8 rounded-xl"></div>

        {/* HORA */}
        <div className="flex flex-col items-center justify-center gap-3 w-16 h-40 overflow-hidden">
          <button onClick={incrementarHora}>
            <img className="w-4" src="/flecha-despliegue.svg" alt="up" />
          </button>
          <div className="text-sm text-[#ffffff55]">{horaAnterior}</div>
          <div className="rounded px-4 py-1 text-white">{hour}</div>
          <div className="text-sm text-[#ffffff55]">{horaSiguiente}</div>
          <button onClick={decrementarHora}>
            <img className="w-4 rotate-180" src="/flecha-despliegue.svg" alt="down" />
          </button>
        </div>

        <span className="text-white">:</span>

        {/* MINUTOS */}
        <div className="flex flex-col items-center justify-center gap-3 w-16 h-40 overflow-hidden">
          <button onClick={incrementarMinuto}>
            <img className="w-4" src="/flecha-despliegue.svg" alt="up" />
          </button>
          <div className="text-sm text-[#ffffff55]">{minutoAlterno}</div>
          <div className="rounded px-4 py-1 text-white">{minute}</div>
          <div className="text-sm text-[#ffffff55]">{minutoAlterno}</div>
          <button onClick={decrementarMinuto}>
            <img className="w-4 rotate-180" src="/flecha-despliegue.svg" alt="down" />
          </button>
        </div>

        {/* AM/PM */}
        <div className="flex flex-col items-center justify-center gap-3 w-16 h-40 overflow-hidden">
          <button onClick={cambiarAmPm}>
            <img className="w-4" src="/flecha-despliegue.svg" alt="up" />
          </button>
          <div className="text-sm text-[#ffffff55]">{amPmAlterno}</div>
          <div className="rounded px-4 py-1 text-white uppercase">{amPm}</div>
          <div className="text-sm text-[#ffffff55]">{amPmAlterno}</div>
          <button onClick={cambiarAmPm}>
            <img className="w-4 rotate-180" src="/flecha-despliegue.svg" alt="down" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasoHora;
