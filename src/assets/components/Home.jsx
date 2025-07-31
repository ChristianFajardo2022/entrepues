import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Iconoprincipal from "./Iconoprincipal";
import { Casita } from "./Casita";
import VideoBackground from "./home/VideoBackground";
import MobileBackgroundImage from "./home/MobileBackgroundImage";
import ReservaButton from "./home/ReservaButton";
import MobileMenu from "./home/MobileMenu";
import SectionReserva from "./SectionReserva";
import SectionReservaMobile from "./SectionReservaMobile";

const Home = () => {
  const videoRef = useRef(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showReserva, setShowReserva] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Iconoprincipal />
      <VideoBackground src="/video/VIDEO-HOME.mp4" />
      <MobileBackgroundImage src="/Mobile-bghome-entrepues.jpg" alt="Fondo móvil" />

      {showMobileMenu && (
        <MobileMenu
          onClose={() => setShowMobileMenu(false)}
          onReservaClick={() => {
            setShowReserva(true);
            setShowMobileMenu(false);
          }}
        />
      )}

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        <div className="absolute top-14 md:px-30 px-10 w-full items-center justify-between flex">
          <Link className="opacity-0" to="/">
            <img className="md:w-38 w-20 z-50" src="/entrepues.svg" alt="Logo" />
          </Link>

          <button className="block md:hidden" onClick={() => setShowMobileMenu(true)}>
            <img className="w-8 md:hidden" src="/menumobile-09.svg" alt="Abrir menú" />
          </button>

          <div className="RovelleUnoBold w-auto gap-30 md:flex hidden">
            <Link to="/video" className="text-[#FFF7EC] button-underline-animated">Visita 360°</Link>
            <Link to="/carta" className="text-[#FFF7EC] button-underline-animated">Carta</Link>
          </div>

          <div className="md:flex hidden items-center">
            <ReservaButton onClick={() => setShowReserva(true)} />
            <div className="hidden group-hover:flex ml-2">
              <Casita />
            </div>
          </div>
        </div>

        <div className="absolute bottom-30 z-[400] w-50 flex items-center justify-center">
          <ReservaButton hiddenOnDesktop onClick={() => setShowReserva(true)} />
        </div>

        <h1 className="text-[#FFF7EC] px-10 text-center md:text-7xl text-[2rem] tracking-widest mt-32 mb-6">
          TODAS LAS REGIONES A TU MESA
        </h1>
      </div>

      {/* Render dinámico según viewport */}
      {showReserva && (
        <>
          <div className="hidden md:block absolute inset-0 z-[500]">
            <SectionReserva onClose={() => setShowReserva(false)} />
          </div>
          <div className="block md:hidden absolute inset-0 z-[500]">
            <SectionReservaMobile onClose={() => setShowReserva(false)} />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
