import React, { useState, useRef, useEffect } from "react";
import menuData from "../data/menu.json";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useCartStore from "../../../src/store/cartStore";
import CartButton from "./CartButton";
import CartModal from "./CartModal";
import SectionReserva from "./SectionReserva"; // Asegúrate de tener este componente
import Iconoprincipal from "./Iconoprincipal";

const regionColors = {
  orinoquía: "#e89726",
  andina: "#c19e6a",
  caribe: "#9e493f",
  insular: "#6a897b",
  pacífica: "#a5e8fb",
  amazonía: "#75bf7b",
};

const regionVideos = {
  orinoquía: "/video/orinoquia.mp4",
  andina: "/video/andina.mp4",
  caribe: "/video/caribe.mp4",
  insular: "/video/insular.mp4",
  pacífica: "/video/pacifico.mp4",
  amazonía: "/video/amazonia.mp4",
};

const Carta = () => {
  const location = useLocation();
  const [showReserva, setShowReserva] = useState(
    location.state?.showReserva || false
  );

  const addToCart = useCartStore((state) => state.addToCart);
  const [showCart, setShowCart] = useState(false);
  const [openRegion, setOpenRegion] = useState(null);
  const entradasRef = useRef(null);
  const platosRef = useRef(null);

  const regions = Object.keys(menuData);
  const [activeRegion, setActiveRegion] = useState(regions[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("todos");

  useEffect(() => {
  const shouldBlockScroll = showReserva || showCart;

  if (shouldBlockScroll) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  // Limpieza opcional por seguridad
  return () => {
    document.body.style.overflow = "";
  };
}, [showReserva, showCart]);

  const handleRegionClick = (region) => {
    setActiveRegion(region);
    setSearchTerm("");
    setFilterCategory("todos");
  };

  const regionData = menuData[activeRegion];
  const filteredEntradas =
    filterCategory === "todos" || filterCategory === "entradas"
      ? regionData.entradas.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const filteredPlatosFuertes =
    filterCategory === "todos" || filterCategory === "platosFuertes"
      ? regionData.platosFuertes.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const color = regionColors[activeRegion] || "#E89726";

  const handleReserva = () => {
    setShowReserva(true);
    setShowCart(false);
  };

  return (
    <div className="relative w-full h-full text-white">
      <Iconoprincipal />
      <CartModal isOpen={showCart} onClose={() => setShowCart(false)} handleReserva={handleReserva}/>

      <div className="absolute top-0 left-0 w-full h-screen">
        <video
          className=" hidden md:block absolute top-0 left-0 w-full h-screen object-cover  z-0 object-left-top"
          src={regionVideos[activeRegion] || "/video/default.mp4"}
          autoPlay
          muted
          loop
        />
        <img
          className="block md:hidden fixed top-0 left-0 w-full h-full object-cover"
          src="/carta-mobile-entreopues.jpg"
          alt="Fondo móvil"
        />

        <span
          className=" hidden md:block absolute bottom-0 w-full h-48 amarillo"
          style={{
            background: "linear-gradient(to top, black 50%, transparent 100%)",
          }}
        ></span>
      </div>

      <div className="relative z-10 bg-transparent">
        {/*         <Link to="/">
          <img
            className="md:w-38 w-20 absolute md:left-40 left-10 top-10"
            src="/entrepues.svg"
            alt="Logo"
          />
        </Link>
 */}
        <div className="w-full mx-auto px-4 py-8">
          <div className="flex flex-col gap-4 mb-8 mt-52 md:fixed md:pl-[9rem]">
            <div className="flex items-center pb-5 justify-between w-72">
              <input
                type="text"
                placeholder=" Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="RovelleUnoLight font-light border border-white rounded-lg w-[80%] py-2 text-white pl-5"
              />
              <CartButton onClick={() => setShowCart(true)} color={color} />
            </div>

            <nav className="flex flex-col w-72 items-start gap-5 border-r border-[#ffffff66] DansonRegular">
              {regions.map((region) => {
                const regionColor = regionColors[region] || "#E89726";
                const isActiveRegion = activeRegion === region;
                const isOpen = openRegion === region;

                return (
                  <div key={region} className="flex flex-col w-full">
                    <div className="flex w-full justify-between pr-5 cursor-pointer">
                      <button
                        onClick={() => {
                          handleRegionClick(region);
                          if (openRegion !== region) {
                            setOpenRegion(region);
                          }
                        }}
                        className={`uppercase text-lg py-2 tracking-[0.5rem] flex items-center justify-between cursor-pointer transition-colors duration-300 button-underline-animated ${
                          isActiveRegion ? "active-region" : ""
                        }`}
                        style={{
                          color: isActiveRegion ? regionColor : "white",
                          borderBottom: isActiveRegion
                            ? `2px solid ${regionColor}`
                            : "none",
                          "--hover-color": regionColor,
                        }}
                      >
                        {region}
                      </button>

                      <button
                        className="cursor-pointer transition-transform duration-300"
                        onClick={() =>
                          setOpenRegion((prev) =>
                            prev === region ? null : region
                          )
                        }
                      >
                        <img
                          className={`w-4 transform transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          src="/abrirRegionFlecha-21.svg"
                          alt="Toggle"
                        />
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-start gap-2 mt-2 overflow-hidden"
                        >
                          <button
                            onClick={() => {
                              setActiveRegion(region);
                              setOpenRegion(null);
                              setTimeout(() => {
                                entradasRef.current?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }, 100);
                            }}
                            className="text-sm font-medium cursor-pointer"
                            style={{ color: regionColor }}
                          >
                            Entradas
                          </button>

                          <button
                            onClick={() => {
                              setActiveRegion(region);
                              setOpenRegion(null);
                              setTimeout(() => {
                                platosRef.current?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }, 100);
                            }}
                            className="text-sm font-medium cursor-pointer"
                            style={{ color: regionColor }}
                          >
                            Platos Fuertes
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="w-full flex md:justify-end ">
            <div className="md:w-[70vw] w-full">
              <div className="w-full md:h-[70vh]"></div>
              <section className="min-h-[600px] mb-12 flex flex-col justify-center text-center pb-40">
                {(filterCategory === "todos" ||
                  filterCategory === "entradas") && (
                  <>
                    <p
                      ref={entradasRef}
                      className="text-3xl mt-12 mb-8 DansonRegular tracking-[0.5rem]"
                      style={{ color }}
                    >
                      Entradas
                    </p>
                    {filteredEntradas.length > 0 ? (
                      <div className="md:px-[9rem] grid md:grid-cols-1 grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredEntradas.map((item, index) => (
                          <div
                            key={item.title + index}
                            className="relative group md:h-80 h-70 w-full rounded-lg overflow-hidden shadow-lg"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:blur-sm transition duration-500"
                            />
                            <div className="absolute bottom-0 z-20 w-full bg-black bg-opacity-60 p-2 text-white text-start flex justify-between items-center">
                              <h3 className="text-sm font-semibold">
                                {item.title}
                              </h3>
                              <p
                                style={{ color }}
                                className="text-sm font-bold w-28 text-center"
                              >
                                ${" "}
                                {Number(
                                  item.price.replace(/\./g, "")
                                ).toLocaleString("es-CO")}
                              </p>
                            </div>
                            <div className="absolute inset-0 z-30 flex flex-col justify-center items-center bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition duration-500 p-4 text-center">
                              <p className="text-sm mb-4 RovelleUnoBold">
                                {item.description ||
                                  "Una deliciosa opción de nuestra carta regional."}
                              </p>
                              <button
                                onClick={() => addToCart(item)}
                                className="px-4 py-2 border font-bold rounded-3xl transition border-white text-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
                                style={{ color }}
                              >
                                Agregar al carrito
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400">
                        No hay entradas para mostrar.
                      </p>
                    )}
                  </>
                )}

                {(filterCategory === "todos" ||
                  filterCategory === "platosFuertes") && (
                  <>
                    <p
                      ref={platosRef}
                      className="text-3xl mt-12 mb-8 DansonRegular tracking-[0.5rem]"
                      style={{ color }}
                    >
                      Platos Fuertes
                    </p>
                    {filteredPlatosFuertes.length > 0 ? (
                      <div className="px-[9rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredPlatosFuertes.map((item, index) => (
                          <div
                            key={item.title + index}
                            className="relative group h-80 w-full rounded-lg overflow-hidden shadow-lg"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:blur-sm transition duration-500"
                            />
                            <div className="absolute bottom-0 z-20 w-full bg-black bg-opacity-60 p-2 text-white text-start flex justify-between items-center">
                              <h3 className="text-sm font-semibold">
                                {item.title}
                              </h3>
                              <p
                                style={{ color }}
                                className="text-sm font-bold w-28 text-center"
                              >
                                ${" "}
                                {Number(
                                  item.price.replace(/\./g, "")
                                ).toLocaleString("es-CO")}
                              </p>
                            </div>
                            <div className="absolute inset-0 z-30 flex flex-col justify-center items-center bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition duration-500 p-4 text-center">
                              <p className="text-sm mb-4 RovelleUnoBold">
                                {item.description ||
                                  "Una deliciosa opción de nuestra carta regional."}
                              </p>
                              <button
                                onClick={() => addToCart(item)}
                                className="px-4 py-2 border font-bold rounded-3xl transition border-white text-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
                                style={{ color }}
                              >
                                Agregar al carrito
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400">
                        No hay platos fuertes para mostrar.
                      </p>
                    )}
                  </>
                )}
              </section>
            </div>
          </div>
        </div>

        {showReserva && (
          <SectionReserva menu={true} onClose={() => setShowReserva(false)} />
        )}
      </div>
    </div>
  );
};

export default Carta;
