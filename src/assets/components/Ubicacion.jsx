import React, { useEffect, useRef } from "react";
import imagencerrar from "/abrirRegionFlecha-21.svg";

const Ubicacion = ({ onClose, showUbicacion }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!showUbicacion) return;

    // Verificación en consola
    console.log("Google:", window.google);

    if (!window.google || !window.google.maps) {
      console.warn("Google Maps no está disponible.");
      return;
    }

    const center = { lat: 11.2950751, lng: -73.8920037 };

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 2,
      mapTypeId: window.google.maps.MapTypeId.HYBRID,
    });

    markerRef.current = new window.google.maps.Marker({
      position: center,
      map,
      animation: window.google.maps.Animation.BOUNCE,
      title: "Ubicación destacada",
    });

    // Animación de zoom progresiva
    let currentZoom = 2;
    const targetZoom = 18;
    const zoomInterval = setInterval(() => {
      if (currentZoom < targetZoom) {
        currentZoom++;
        map.setZoom(currentZoom);
      } else {
        clearInterval(zoomInterval);
      }
    }, 200);

    // Limpieza
    return () => {
      clearInterval(zoomInterval);
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    };
  }, [showUbicacion]);

  return (
    <div
      className={`${
        showUbicacion ? "pointer-events-auto" : "pointer-events-none"
      } fixed top-0 left-0 w-full h-full z-[55] flex items-center justify-center backdrop-blur-xl bg-gray-900 bg-opacity-35 transition-opacity duration-300`}
    >
      <button
        onClick={onClose}
        className="absolute top-[22vh] md:top-4 right-4 md:right-8"
      >
        <img src={imagencerrar} className="w-8 md:w-12 cerrar" alt="Cerrar" />
      </button>

      <div className="flex flex-col items-center w-full max-w-[90%] md:max-w-[70%] relative rounded-2xl">
        <div className="w-full h-[300px] md:h-[500px] relative flex items-center justify-center rounded-2xl overflow-hidden">
          <div ref={mapRef} className="w-full h-full rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Ubicacion;
