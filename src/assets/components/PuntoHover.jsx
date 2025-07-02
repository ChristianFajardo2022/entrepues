import React from "react";

export const PuntoHover = ({ img, handleUbicacion, ubicacion }) => {
  return (
    <span
      onClick={handleUbicacion}
      className={`${ubicacion}    group inline-block  xs:w-4 xs:h-4 lg:w-6 lg:h-6  hover:scale-[4] transition-all border-2  rounded-full overflow-hidden cursor-pointer`}
    >
      <img
        className="object-cover h-full  rounded-full group-hover:scale-100 transition-all w-full"
        src={img}
        alt=""
      />
    </span>
  );
};
