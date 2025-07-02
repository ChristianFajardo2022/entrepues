import React from "react";
import { useNavigate } from "react-router-dom";

const PasoResumen = ({
  name,
  selectedDate,
  hour,
  minute,
  amPm,
  adults,
  children,
  onConfirm,
}) => {
  const navigate = useNavigate();

  const formatDate = () => {
    const options = { weekday: "long", day: "numeric", month: "long" };
    return selectedDate.toLocaleDateString("es-CO", options);
  };

  return (
    <div className="flex flex-col z-10 gap-6 w-full text-[#fff6ea] RovelleUnoRegular">
      <p className="text-sm font-medium">Verifica la información:</p>

      <p className="text-md RovelleUnoRegular">
        {name || "Usuario"}, estás reservando una mesa para{" "}
        <strong>{adults}</strong> adulto{adults !== 1 && "s"}
        {children > 0 &&
          ` y ${children} niño${children !== 1 ? "s" : ""}`} el{" "}
        <strong>{formatDate()}</strong> a la{" "}
        <strong>
          {hour}:{minute.toString().padStart(2, "0")} {amPm}
        </strong>
        .
      </p>

      <div className="flex gap-4 justify-between mt-6 RovelleUnoRegular">
        <button
          onClick={() => navigate("/carta")}
          className="flex-1 p-6 h-52 border rounded-xl text-left hover:bg-[#fff6ea] hover:text-black transition"
        >
          <div className=" h-[40%]">
            <img className=" w-12" src="/videos/tapa-09.svg" />
          </div>
          <div className=" h-[60%]">
            <p className="text-md RovelleUnoBold">Reservar<br/> con menú</p>
            <p className="text-sm RovelleUnoRegular">Escoger los platos de una vez.</p>
          </div>
        </button>

        <button
          onClick={onConfirm}
          className="flex-1 p-6 h-52 border rounded-xl text-left hover:bg-[#fff6ea] hover:text-black transition"
        >
          <div className=" h-[40%]">
            <img className=" w-8" src="/videos/libro-10.svg" />
          </div>
          <div className=" h-[60%]">
            <p className="text-md RovelleUnoBold">Reservar<br/> sin menú</p>
            <p className="text-sm RovelleUnoRegular">Escoger en el restaurante.</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PasoResumen;
