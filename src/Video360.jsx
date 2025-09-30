import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { VideoSphere } from "./assets/components/VideoSphere";
import RotatingGroup from "./assets/components/RotatingGroup";
import { puntos } from "./assets/helpers/Puntos";

export default function Video360({
  visibleIndex,
  setVisibleIndex,
  setShowReserva, // <-- necesario para el botón Reservar
}) {
  // Define aquí las redes (o pásalas por props si prefieres)
  const redes = [
    { url: "https://maps.app.goo.gl/w3ARr68Ps4bvSYrp7", icon: "map" },
    {
      url: "https://www.facebook.com/profile.php?id=100063785760156&mibextid=eHce3h",
      icon: "facebook",
    },
    { url: "https://www.instagram.com/entrepues/", icon: "instagram" },
  ];

  const cameraRef = useRef();
  const { contextSafe } = useGSAP({ scope: cameraRef });

  const handlePointClick = contextSafe((newIndex) => {
    if (!cameraRef.current) return;
    const tl = gsap.timeline();
    tl.to(cameraRef.current.position, { x: 0, y: 0, z: 500, duration: 1 })
      .to(
        cameraRef.current.rotation,
        { x: 0, y: 0, z: 0, duration: 1 },
        "<"
      )
      .add(() => setVisibleIndex?.(newIndex), "<");
  });

  return (
    <>
      <Canvas className="z-10">
        <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 500]} />
        <OrbitControls />
        <RotatingGroup>
          {puntos.map((punto, index) =>
            visibleIndex === index ? (
              <VideoSphere
                key={index}
                videoUrl={punto.videoUrl}
                visible={index}
                handleUbicacion={handlePointClick}
                img={punto.img}
                ubicacion3d={punto.ubicacion3d}
              />
            ) : null
          )}
        </RotatingGroup>
      </Canvas>

      {/* Botones de acción y redes */}
      <div className=" absolute bottom-0 z-[80] w-full flex flex-col gap-10 text-2xl pb-15">
        <div className="flex md:flex-row flex-col justify-center items-center gap-4 font-medium overflow-hidden">
          <motion.a
            href="/"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.5, ease: "easeInOut" }}
            className="cursor-pointer text-center text-secondary hover:bg-secondary hover:text-black border border-secondary rounded-md min-w-52 py-1 pb-2"
          >
            Volver
          </motion.a>

          <motion.button
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.7, ease: "easeInOut" }}
            className="cursor-pointer text-center bg-secondary text-black border border-secondary rounded-md min-w-52 py-1 pb-2"
            onClick={() => setShowReserva?.(true)}
          >
            Reservar
          </motion.button>

          <motion.a
            href="/carta"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 2, ease: "easeInOut" }}
            className="cursor-pointer text-center text-secondary hover:bg-secondary hover:text-black border border-secondary rounded-md min-w-52 py-1 pb-2"
          >
            Menú
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, ease: "easeInOut" }}
          className="flex justify-center items-center gap-12"
        >
          {redes.map((i, inx) => (
            <a
              key={inx}
              href={i.url}
              target="_blank"
              rel="noreferrer"
              className="w-6 h-6 inline-block"
            >
              <img
                className="size-full object-contain"
                src={`/${i.icon}.svg`}
                alt={i.icon}
              />
            </a>
          ))}
        </motion.div>
      </div>
        <div
        className=" absolute bottom-0 w-full h-58  z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to top, black 5%, transparent 100%)",
        }}
      ></div>
    </>
  );
}
