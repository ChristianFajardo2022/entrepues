import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Header } from "../header/Header";
import { Titulo } from "../ui/Titulo";
import { easing } from "../../constants/easing";
import { CallToActions } from "../common/CallToAction/CallToActions";
import useReservaStore from "../../store/reservaStore";
import ArcScrollReveal from "../ScrollSvg";
import { Logo } from "../ui/Logo";

export const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { reservaResult } = useReservaStore();

  return (
    <>
      <Header loading={true} />
      <main className="w-full relative bg-black text-brown">
        <CallToActions />

        <ArcScrollReveal />
        <SectionTwo />
        <SectionThree />
        <Footer />
      </main>
    </>
  );
};

const SectionTwo = () => {
  return (
    <>
      <section
        className="hide-logo-section h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/imagenes/backgroundTwo.webp')" }}
      >
        <div className="w-1/2 h-full flex justify-center items-center">
          <div className="max-w-lg text-center">
            <Logo color="brown" />
            <h2 className="text-8xl font-parkson text-start mt-16 mb-6">
              LOREM IPSUM DOLOR
            </h2>
            <p className="text-start text-2xl ">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat.{" "}
            </p>
          </div>
        </div>
        <div className="w-1/2"></div>
      </section>
    </>
  );
};
const SectionThree = () => {
  return (
    <>
      <section
        className="hide-logo-section h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/imagenes/background_texture.webp')" }}
      >
        <div className="w-full h-full flex flex-col justify-center gap-4 items-center">
          <div className="max-w-full text-center">
            <h2 className="text-8xl font-parkson pt-16">ajiaco lovers</h2>
            <p className="text-2xl my-6">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            </p>
          </div>
          <div className="flex-1 w-full flex justify-between">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundImage: `url(/imagenes/section-four/la-cocina-más-rica-del-país-${
                    i + 1
                  }.webp)`,
                }}
                className="bg-cover bg-center bg-no-repeat w-full h-full flex justify-center items-end pb-8 relative"
              >
                <div className="bg-gradient-to-t from-black/60 pointer-events-none absolute top-0 left-0 size-full" />
                <h4 className="max-w-xl flex flex-col gap-2 font-parkson text-secondary text-center z-10 relative">
                  <span className="flex justify-center items-center gap-4">
                    <span className="flex-1 h-1 rounded-full bg-secondary" />
                    <span className="w-fit">La casa de la cocina</span>
                    <span className="flex-1 h-1 rounded-full bg-secondary" />
                  </span>
                  <span className="!text-7xl">más rica del país</span>
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
const Footer = () => {
  return (
    <>
      <footer
        className="hide-logo-section h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/imagenes/background_texture.webp')" }}
      >
        <div className="size-full flex justify-center items-center">
          <div className="max-w-2xl text-center space-y-14">
            <p>CHÍA, CUNDINAMARCA, 1987</p>
            <h2 className="text-8xl font-parkson">Inspiración</h2>
            <picture className="h-20 w-auto inline-block">
              <img
                className="size-full object-contain inline-block"
                src="/imagenes/vectorOne.svg"
                alt="vector decorativo"
              />
            </picture>
            <p className="text-2xl">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat.
            </p>
          </div>
        </div>
        <div className="w-1/2"></div>
      </footer>
    </>
  );
};
