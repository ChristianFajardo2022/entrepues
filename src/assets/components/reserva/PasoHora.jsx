import React from "react";

const PasoHora = ({ hour, minute, amPm, setHour, setMinute, setAmPm }) => {
  return (
    <div className="flex flex-col z-10 items-center justify-center w-full my-16 RovelleUnoRegular">
      <div className="flex items-center justify-center gap-2 text-[1rem] relative">
        <div className="absolute border border-[#fff6ea50] w-11/12 h-8 rounded-xl"></div>

        {/* HORA */}
        <div className="flex flex-col items-center justify-center gap-3 w-16 h-40 overflow-hidden">
          <button onClick={() => setHour((prev) => (prev < 12 ? prev + 1 : 1))}>
            <img className="w-4" src="/flecha-despliegue.svg" alt="up" />
          </button>
          <div className="text-sm text-[#ffffff55]">
            {(hour === 1 ? 12 : hour - 1).toString().padStart(2, "0")}
          </div>
          <div className="rounded px-4 py-1 text-white">
            {hour.toString().padStart(2, "0")}
          </div>
          <div className="text-sm text-[#ffffff55]">
            {(hour === 12 ? 1 : hour + 1).toString().padStart(2, "0")}
          </div>
          <button onClick={() => setHour((prev) => (prev > 1 ? prev - 1 : 12))}>
            <img className="w-4 rotate-180" src="/flecha-despliegue.svg" alt="down" />
          </button>
        </div>

        <span className="text-white">:</span>

        {/* MINUTOS */}
        <div className="flex flex-col items-center justify-center gap-3 w-16 h-40 overflow-hidden">
          <button onClick={() => setMinute((prev) => (prev === 0 ? 30 : 0))}>
            <img className="w-4" src="/flecha-despliegue.svg" alt="up" />
          </button>
          <div className="text-sm text-[#ffffff55]">{minute === 0 ? "30" : "00"}</div>
          <div className="rounded px-4 py-1 text-white">
            {minute.toString().padStart(2, "0")}
          </div>
          <div className="text-sm text-[#ffffff55]">{minute === 0 ? "30" : "00"}</div>
          <button onClick={() => setMinute((prev) => (prev === 30 ? 0 : 30))}>
            <img className="w-4 rotate-180" src="/flecha-despliegue.svg" alt="down" />
          </button>
        </div>

        {/* AM/PM */}
        <div className="flex flex-col items-center justify-center gap-3 w-16 h-40 overflow-hidden">
          <button onClick={() => setAmPm((prev) => (prev === "am" ? "pm" : "am"))}>
            <img className="w-4" src="/flecha-despliegue.svg" alt="up" />
          </button>
          <div className="text-sm text-[#ffffff55]">{amPm === "am" ? "pm" : "am"}</div>
          <div className="rounded px-4 py-1 text-white uppercase">{amPm}</div>
          <div className="text-sm text-[#ffffff55]">{amPm === "am" ? "pm" : "am"}</div>
          <button onClick={() => setAmPm((prev) => (prev === "am" ? "pm" : "am"))}>
            <img className="w-4 rotate-180" src="/flecha-despliegue.svg" alt="down" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasoHora;
