import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";

import { useGSAP } from "@gsap/react";
import { VideoSphere } from "./assets/components/VideoSphere";
import RotatingGroup from "./assets/components/RotatingGroup";
import { puntos } from "./assets/helpers/Puntos";
import { Link } from "react-router-dom";

export default function Video360({ visibleIndex, setVisibleIndex }) {
  const [videoUrls] = useState([
    "https://res.cloudinary.com/dhqkfhlnr/video/upload/v1722633171/video/ehi84pmwdnfmavtgigit.mp4",
  ]);

  const cameraRef = useRef();
  const { contextSafe } = useGSAP({ scope: cameraRef });

  const handlePointClick = contextSafe((newIndex) => {
    if (cameraRef.current) {
      const tl = gsap.timeline();
      tl.to(cameraRef.current.position, {
        x: 0,
        y: 0,
        z: 500,
        duration: 1,
      });

      tl.to(
        cameraRef.current.rotation,
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
        },
        "<"
      );
      tl.add(() => {
        setVisibleIndex(newIndex);
      }, "<");
    }
  });

  return (
    <>
      <Canvas className="z-10">
        <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 500]} />
        <OrbitControls />
        <RotatingGroup>
          {puntos.map((punto, index) => (
            <React.Fragment key={index}>
              {visibleIndex === index && (
                <VideoSphere
                  key={index}
                  videoUrl={punto.videoUrl}
                  visible={index}
                  handleUbicacion={handlePointClick}
                  img={punto.img}
                  ubicacion3d={punto.ubicacion3d}
                />
              )}
            </React.Fragment>
          ))}
        </RotatingGroup>
      </Canvas>
      <div className=" z-50 absolute bottom-20 md:gap-30 gap-10 flex w-full justify-center">
        <Link
          className="  w-44 h-10 border border-[#ffffff] flex items-center justify-between px-8 rounded-3xl Inter text-[#ffffff] hover:bg-[#000000]"
          to="/"
        > <img className=" w-6" src="/casita-volver-09.svg" />
          Volver
        </Link>
        <Link
          className=" w-44 h-10 border flex items-center justify-between px-8 rounded-3xl Inter text-[#ffffff] hover:bg-[#000000]"
          to="/carta"
          > 
          Carta
          <img className=" w-6" src="/casita-carta-10.svg" />
        </Link>
      </div>
      <div
        className=" absolute bottom-0 w-full h-32  z-50 pointer-events-none"
        style={{
          background: "linear-gradient(to top, black 5%, transparent 100%)",
        }}
      ></div>
    </>
  );
}
