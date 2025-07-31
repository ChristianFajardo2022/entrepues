import React, { useState, useRef } from "react";
import menuData from "../data/menu.json";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useCartStore from "../../../src/store/cartStore";
import CartButton from "./CartButton";
import CartModal from "./CartModal";
import SectionReserva from "./SectionReserva"; // Asegúrate de tener este componente
import Iconoprincipal from "./Iconoprincipal";
import MobileMenu from "./home/MobileMenu";

const regionColors = {
  orinoquía: "#e89726",
  andina: "#c19e6a",
  caribe: "#9e493f",
  insular: "#6a897b",
  pacífica: "#a5e8fb",
  amazonía: "#75bf7b",
};

const CartaMobile = () => {
  const location = useLocation();
  const [showReserva, setShowReserva] = useState(
    location.state?.showReserva || false
  );
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const [showCart, setShowCart] = useState(false);
  const [openRegion, setOpenRegion] = useState(null);
  const entradasRef = useRef(null);
  const platosRef = useRef(null);

  const regions = Object.keys(menuData);
  const [activeRegion, setActiveRegion] = useState(regions[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("todos");

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

  // Estado para controlar qué card está activa
  const [activeCardIndexEntradas, setActiveCardIndexEntradas] = useState(null);
  const [activeCardIndexPlatos, setActiveCardIndexPlatos] = useState(null);

  return (
    <div className="relative w-full h-full text-white bg-black">
      <Iconoprincipal />
      <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />
      {showMobileMenu && (
        <MobileMenu
          onClose={() => setShowMobileMenu(false)}
          onReservaClick={() => {
            setShowReserva(true);
            setShowMobileMenu(false);
          }}
        />
      )}
      <div className="absolute top-14 md:px-30 px-10 w-full flex">
        <button
          className="block md:hidden absolute top-2 right-10"
          onClick={() => setShowMobileMenu(true)}
        >
          <img
            className="w-8 md:hidden"
            src="/menumobile-09.svg"
            alt="Abrir menú"
          />
        </button>
      </div>
      {/* Fondo negro, sin video ni imagen */}
      {/* <div className="absolute top-0 left-0 w-full h-screen">
        <video ... />
        <img ... />
        <span ... ></span>
      </div> */}

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
            <div className="flex items-center pb-5 justify-between w-full">
              <input
                type="text"
                placeholder=" Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="RovelleUnoLight font-light border border-white rounded-lg w-full py-2 text-white pl-5"
              />
              <CartButton onClick={() => setShowCart(true)} color={color} />
            </div>

            {/* NAV REGIONES HORIZONTAL CON SCROLL */}
            <nav className="flex flex-row w-full gap-4 overflow-x-auto pb-2 border-b border-[#ffffff66] DansonRegular scrollbar-thin scrollbar-thumb-[#ffffff33]">
              {regions.map((region) => {
                const regionColor = regionColors[region] || "#E89726";
                const isActiveRegion = activeRegion === region;

                return (
                  <button
                    key={region}
                    onClick={() => handleRegionClick(region)}
                    className={`uppercase text-base py-2 px-2 tracking-[0.3rem] flex items-center justify-center cursor-pointer transition-colors duration-300 button-underline-animated ${
                      isActiveRegion ? "active-region" : ""
                    }`}
                    style={{
                      color: isActiveRegion ? regionColor : "white",
                      borderBottom: isActiveRegion
                        ? `2px solid ${regionColor}`
                        : "none",
                      "--hover-color": regionColor,
                      width: "auto", // El ancho se ajusta al texto
                      minWidth: "fit-content", // Asegura que el botón no sea más pequeño que el texto
                    }}
                  >
                    {region}
                  </button>
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
                      <div className="flex flex-row gap-6 overflow-x-auto md:px-[9rem] px-2 scrollbar-thin scrollbar-thumb-[#ffffff33]">
                        {filteredEntradas.map((item, index) => (
                          <div
                            key={item.title + index}
                            className="relative group md:h-80 h-70 min-w-[220px] max-w-[260px] w-[70vw] rounded-lg overflow-hidden shadow-lg flex-shrink-0"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition duration-500"
                              onClick={() =>
                                setActiveCardIndexEntradas(
                                  activeCardIndexEntradas === index ? null : index
                                )
                              }
                              style={{ cursor: "pointer" }}
                            />
                            <div className="absolute bottom-0 z-20 w-full h-12 bg-black bg-opacity-60 p-2 text-start text-white flex justify-between items-center">
                              <h3 className="text-sm font-semibold">{item.title}</h3>
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
                            {activeCardIndexEntradas === index && (
                              <div className="absolute inset-0 z-30 flex flex-col justify-center items-center bg-black/80 bg-opacity-80 text-white transition duration-500 p-4 text-center">
                                <div className="mb-4 w-full flex justify-between items-center">
                                <p>
                                  <span className="text-lg font-bold">
                                    {item.title}
                                  </span>
                                </p>
                                <p>
                                  {item.price
                                    ? `$ ${Number(item.price.replace(/\./g, "")).toLocaleString("es-CO")}`
                                    : "Precio no disponible"}
                                </p>
                                
                                  </div>
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
                                <button
                                  onClick={() => setActiveCardIndexEntradas(null)}
                                  className="mt-2 text-xs underline"
                                >
                                  Cerrar
                                </button>
                              </div>
                            )}
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
                      <div className="flex flex-row gap-6 overflow-x-auto px-2 scrollbar-thin scrollbar-thumb-[#ffffff33]">
                        {filteredPlatosFuertes.map((item, index) => (
                          <div
                            key={item.title + index}
                            className="relative group h-80 min-w-[220px] max-w-[260px] w-[70vw] rounded-lg overflow-hidden shadow-lg flex-shrink-0"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition duration-500"
                              onClick={() =>
                                setActiveCardIndexPlatos(
                                  activeCardIndexPlatos === index ? null : index
                                )
                              }
                              style={{ cursor: "pointer" }}
                            />
                            <div className="absolute bottom-0 z-20 w-full h-12 bg-black bg-opacity-60 p-2 text-white text-start flex justify-between items-center">
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
                            {activeCardIndexPlatos === index && (
                              <div className="absolute inset-0 z-30 flex flex-col justify-center items-center bg-black bg-opacity-80 text-white transition duration-500 p-4 text-center">
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
                                <button
                                  onClick={() => setActiveCardIndexPlatos(null)}
                                  className="mt-2 text-xs underline"
                                >
                                  Cerrar
                                </button>
                              </div>
                            )}
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
          <SectionReserva onClose={() => setShowReserva(false)} />
        )}
      </div>
    </div>
  );
};

export default CartaMobile;
