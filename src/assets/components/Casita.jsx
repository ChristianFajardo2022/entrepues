import gsap from "gsap";
import Lottie from "lottie-react";
import React, { useEffect, useRef } from "react";
import icono from "../../assets/data/Reserva.json";

export const Casita = () => {
  const lottieIcon = useRef(null);
  useEffect(() => {
    lottieIcon.current.setSpeed(0.7);
  }, [lottieIcon]);

  return (
    <div className="w-6 ml-2 flex flex-col items-center justify-center">
      <span className="w-6 h-auto inline-block">
        <Lottie
          lottieRef={lottieIcon}
          animationData={icono}
          className="w-full h-full"
        />
      </span>
    </div>
  );
};
