import React from "react";

const PasoCantidad = ({ adults, children, setAdults, setChildren }) => {
  return (
    <div className="flex flex-col z-10 items-center md:w-full my-10 gap-10 text-[#fff6ea] text-sm ">
      {/* Adultos */}
      <div className="w-full flex justify-between">
        <div>
          <p className="text-base RovelleUnoBold mb-1">Adultos</p>
          <p className="mb-3 text-xs RovelleUnoRegular">(Mayor de 17 años):</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAdults((prev) => Math.max(prev - 1, 0))}
            className="w-18 h-8 border border-[#fff6ea50] text-lg rounded-lg hover:bg-[#fff6ea] hover:text-black transition"
          >
            -
          </button>
          <span className="w-6 text-center text-lg RovelleUnoRegular">{adults}</span>
          <button
            onClick={() => setAdults((prev) => prev + 1)}
            className="w-18 h-8 border border-[#fff6ea50] text-lg rounded-lg hover:bg-[#fff6ea] hover:text-black transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Niños */}
      <div className="w-full flex justify-between">
        <div>
          <p className="text-base RovelleUnoBold mb-1">Niños</p>
          <p className="mb-3 text-xs RovelleUnoRegular">(Hasta 17 años):</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setChildren((prev) => Math.max(prev - 1, 0))}
            className="w-18 h-8 border border-[#fff6ea50] text-lg rounded-lg hover:bg-[#fff6ea] hover:text-black transition"
          >
            -
          </button>
          <span className="w-6 text-center text-lg RovelleUnoRegular">{children}</span>
          <button
            onClick={() => setChildren((prev) => prev + 1)}
            className="w-18 h-8 border border-[#fff6ea50] text-lg rounded-lg hover:bg-[#fff6ea] hover:text-black transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasoCantidad;
