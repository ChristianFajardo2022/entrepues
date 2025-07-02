import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Casita } from "./Casita";

const Home = () => {
  const videoRef = useRef(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video solo en escritorio */}
      <video
        ref={videoRef}
        className="hidden md:block absolute top-0 left-0 w-full h-full object-cover"
        src="/video/VIDEO-HOME.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className=" absolute top-0 left-0 w-full h-full bg-black opacity-15"></div>

      {/* Imagen solo en móviles */}
      <img
        className="block md:hidden absolute top-0 left-0 w-full h-full object-cover"
        src="/Mobile-bghome-entrepues.jpg"
        alt="Fondo móvil"
      />

      {/* MENÚ MÓVIL */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black z-[300] text-white px-10 pt-14 flex flex-col md:hidden">
          <div className="flex justify-between items-center">
            <img src="/entrepues.svg" alt="Logo" className="w-20" />
            <button onClick={() => setShowMobileMenu(false)}>
              <span className="text-3xl text-white">&times;</span>
            </button>
          </div>

          <nav className="mt-20 flex flex-col gap-20 text-2xl tracking-[0.2em] DansonBold">
            <p className="border-b border-white/30 pb-2">BIENVENIDOS</p>
            <Link to="/video" onClick={() => setShowMobileMenu(false)}>
              VISITA 360°
            </Link>
            <Link to="/carta" onClick={() => setShowMobileMenu(false)}>
              CARTA
            </Link>
            <Link
              to="/carta"
              state={{ showReserva: true }}
              onClick={() => setShowMobileMenu(false)}
            >
              RESERVAR
            </Link>
          </nav>
        </div>
      )}

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        <div className="absolute top-14 md:px-30 px-10 w-full items-center justify-between flex">
          <Link to="/">
            <img
              className="md:w-38 w-20 z-50"
              src="/entrepues.svg"
              alt="Logo"
            />
          </Link>

          <button onClick={() => setShowMobileMenu(true)}>
            <img className="w-8 md:hidden" src="/menumobile-09.svg" alt="Abrir menú" />
          </button>

          <div className="RovelleUnoBold w-auto gap-30 md:flex hidden">
            <Link to="/video" className="text-[#FFF7EC] button-underline-animated">
              Visita 360°
            </Link>
            <Link className="text-[#FFF7EC] button-underline-animated" to="/carta">
              Carta
            </Link>
          </div>

          <Link
            className="group RovelleUnoBold text-[#FFF7EC] border border-[#FFF7EC] hover:bg-[#FFF7EC] hover:text-black hover:scale-x-110 transition duration-200 cursor-pointer w-42 h-12 rounded-3xl md:flex hidden items-center justify-center"
            to="/carta"
            state={{ showReserva: true }}
          >
            Reservar
            <div className="hidden group-hover:flex ml-2">
              <Casita />
            </div>
          </Link>
        </div>

        {/* Botón reservar solo en móviles */}
        <div className="absolute bottom-30 w-50 flex items-center justify-center">
          <Link
            className="RovelleUnoBold text-[#FFF7EC] border border-[#FFF7EC] cursor-pointer rounded-3xl w-40 h-10 flex justify-center items-center md:hidden"
            to="/carta"
            state={{ showReserva: true }}
          >
            Reservar
          </Link>
        </div>

        <h1 className="text-[#FFF7EC] px-10 text-center md:text-7xl text-3xl tracking-widest mt-32 mb-6">
          TODAS LAS REGIONES A TU MESA
        </h1>
      </div>
    </div>
  );
};

export default Home;
