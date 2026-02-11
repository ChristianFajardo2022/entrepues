import React from "react";
import { IncremenAndDecrementComponent } from "../common/IncrementAndDrecrement";
import { Cat, Dog, DogIcon } from "lucide-react";

const PasoCantidad = ({
  adults = 1,
  children = 0,
  mascotas = 0,
  setAdults,
  setChildren,
  setMascotas,
}) => {
  // Asegurar que los valores sean números válidos
  const adultsNum = Number(adults) || 1;
  const childrenNum = Math.max(0, Number(children) === 0 ? 0 : (Number(children) || 0));
  const mascotasNum = Math.max(0, Number(mascotas) === 0 ? 0 : (Number(mascotas) || 0));

  return (
    <div className="py-8">
      <div className="flex max-w-xs mx-auto flex-col z-10 items-center md:w-full text-[#fff6ea] text-sm space-y-8 ">
        {/* Adultos */}
        <div className="w-full flex justify-between items-center">
          <div>
            <p className="mb-1">Adultos</p>
          </div>
          <div className="flex items-center gap-4">
            <IncremenAndDecrementComponent
              item={adultsNum}
              increaseQuantity={() => setAdults(adultsNum + 1)}
              decreaseQuantity={() => setAdults(Math.max(adultsNum - 1, 1))}
            />
          </div>
        </div>

        {/* Niños */}
        <div className="w-full flex justify-between items-center">
          <div>
            <p className="mb-1">Niños</p>
            <p className="mb-3 text-xs">(Hasta 17 años):</p>
          </div>
          <div className="flex items-center gap-4">
            <IncremenAndDecrementComponent
              item={childrenNum}
              increaseQuantity={() => setChildren(childrenNum + 1)}
              decreaseQuantity={() => setChildren(Math.max(childrenNum - 1, 0))}
            />
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div>
            <p className="mb-1">Mascotas</p>
          </div>
          <div className="flex items-center gap-4">
            <IncremenAndDecrementComponent
              item={mascotasNum}
              increaseQuantity={() => setMascotas(mascotasNum + 1)}
              decreaseQuantity={() => setMascotas(Math.max(mascotasNum - 1, 0))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasoCantidad;
