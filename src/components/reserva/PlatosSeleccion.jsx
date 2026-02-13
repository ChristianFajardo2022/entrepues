import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { capitalizeFirst } from "../../constants/firsLetterUppercase";
import {
  obtenerTodasLasCategorias,
  guardarProductosEnReserva,
} from "../../firebase/actions";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../Pop-ups/slider/styleVertical.css";
import { Check, ChevronLeft, Trash } from "lucide-react";
import { IncremenAndDecrementComponent } from "../common/IncrementAndDrecrement";

// ===========================
// FUNCIONES UTILITARIAS
// ===========================

/**
 * Normalizar nombres para comparación
 */
const normalize = (s = "") =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

/**
 * Generar JSON con los datos de la reserva
 */
const generarJSON = (firestoreId, platosSeleccionados, asistentes) => {
  return {
    firestoreId,
    fecha: new Date().toISOString(),
    platosSeleccionados: Object.entries(platosSeleccionados).map(
      ([asistenteIndex, platos]) => ({
        asistente: asistentes[asistenteIndex],
        asistenteIndex: parseInt(asistenteIndex),
        platos: platos.map((p) => ({
          id: p.originalId || p.id, // Usar el ID original para Firestore
          nombre: p.nombre,
          precio: p.precio,
          cantidad: p.cantidad,
          categoria: p.categoria,
          subcategoria: p.subcategoria,
          subtotal: p.precio * p.cantidad,
        })),
        totalPlatos: platos.reduce((sum, p) => sum + p.cantidad, 0),
        totalPrecio: platos.reduce((sum, p) => sum + p.precio * p.cantidad, 0),
      })
    ),
  };
};

// ===========================
// COMPONENTE PRINCIPAL
// ===========================

/**
 * Componente para la selección de platos por asistente
 */
export default function PlatosSeleccion({
  asistentes,
  firestoreId,
  onConfirmar,
  onVolver,
}) {
  // ===========================
  // ESTADOS
  // ===========================
  const [asistenteActual, setAsistenteActual] = useState(0);
  const [platosSeleccionados, setPlatosSeleccionados] = useState({});
  const [categoriaActual, setCategoriActual] = useState("desayunos");
  const [subcategoriaActual, setSubcategoriaActual] = useState(null);
  const [categoriesData, setCategoriesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const swiperRef = useRef(null);

  // ===========================
  // EFECTOS Y MEMOS
  // ===========================

  // Inicializar estructura de asistentes
  useEffect(() => {
    const inicial = {};
    asistentes.forEach((asistente, index) => {
      inicial[index] = [];
    });
    setPlatosSeleccionados(inicial);
  }, [asistentes]);

  // Cargar datos de Firebase
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await obtenerTodasLasCategorias();
        setCategoriesData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando categorías:", error);
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  // Obtener categorías ordenadas
  const categorias = useMemo(() => {
    const categoryOrder = [
      "desayunos",
      "entradas",
      "platos_fuertes",
      "bebidas",
      "postres",
    ];

    return categoryOrder.filter((cat) =>
      Object.keys(categoriesData).some(
        (key) => normalize(key) === normalize(cat)
      )
    );
  }, [categoriesData]);

  // ===========================
  // FUNCIONES DE UTILIDAD DEL COMPONENTE
  // ===========================

  // Obtener productos por categoría específica
  const getProductosPorCategoria = (categoria) => {
    const catKey = Object.keys(categoriesData).find(
      (key) => normalize(key) === normalize(categoria)
    );

    if (!catKey) return [];

    const subcategoriesData = categoriesData[catKey]?.subcategorias || {};
    const todosLosProductos = [];

    // Iterar sobre todas las subcategorías para obtener todos los productos
    Object.entries(subcategoriesData).forEach(([subcategoria, data]) => {
      const productos = data?.productos || [];

      productos.forEach((plato, index) => {
        todosLosProductos.push({
          id: `${categoria}__${subcategoria}__${plato.id}__${index}`,
          originalId: plato.id,
          nombre: plato.nombre,
          descripcion: plato.descripcion || "",
          precio: parseFloat(String(plato.precio).replace(/\D/g, "")),
          categoria: categoria,
          subcategoria: subcategoria,
          img: plato.img,
        });
      });
    });

    return todosLosProductos;
  };

  const esPlatoSeleccionado = (platoId) => {
    return (platosSeleccionados[asistenteActual] || []).some(
      (p) => p.id === platoId
    );
  };

  // ===========================
  // MANEJADORES DE EVENTOS
  // ===========================

  // Manejar cambio de categoría y slider
  const handleCategoriaChange = (categoria) => {
    const categoriaIndex = categorias.indexOf(categoria);
    setCategoriActual(categoria);

    // Cambiar el slide del swiper
    if (swiperRef.current && categoriaIndex >= 0) {
      swiperRef.current.swiper.slideTo(categoriaIndex);
    }
  };

  // Manejar cambio de slide
  const handleSlideChange = (swiper) => {
    const categoriaSeleccionada = categorias[swiper.activeIndex];
    if (categoriaSeleccionada && categoriaSeleccionada !== categoriaActual) {
      setCategoriActual(categoriaSeleccionada);
    }
  };

  const handleSeleccionarPlato = (plato) => {
    setPlatosSeleccionados((prev) => {
      const actual = prev[asistenteActual] || [];
      const existe = actual.some((p) => p.id === plato.id);

      if (existe) {
        return {
          ...prev,
          [asistenteActual]: actual.filter((p) => p.id !== plato.id),
        };
      } else {
        // Agregar plato con cantidad por defecto de 1
        const platoConCantidad = {
          ...plato,
          cantidad: 1,
        };
        return {
          ...prev,
          [asistenteActual]: [...actual, platoConCantidad],
        };
      }
    });
  };

  const handleIncrementarCantidad = (platoId) => {
    setPlatosSeleccionados((prev) => {
      const actual = prev[asistenteActual] || [];
      const actualizado = actual.map((p) =>
        p.id === platoId ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      return {
        ...prev,
        [asistenteActual]: actualizado,
      };
    });
  };

  const handleDisminuirCantidad = (platoId) => {
    setPlatosSeleccionados((prev) => {
      const actual = prev[asistenteActual] || [];
      const actualizado = actual.map((p) => {
        if (p.id === platoId) {
          const nuevaCantidad = p.cantidad - 1;
          // Si la cantidad llega a 0, mantener el plato pero con cantidad 1
          return { ...p, cantidad: nuevaCantidad < 1 ? 1 : nuevaCantidad };
        }
        return p;
      });
      return {
        ...prev,
        [asistenteActual]: actualizado,
      };
    });
  };

  const irAlSiguiente = () => {
    if (asistenteActual < asistentes.length - 1) {
      setAsistenteActual(asistenteActual + 1);
    }
  };

  const irAlAnterior = () => {
    if (asistenteActual > 0) {
      setAsistenteActual(asistenteActual - 1);
    }
  };

  const handleConfirmar = async () => {
    // Validar que todos los asistentes tienen al menos un plato
    const asistentesSinPlatos = [];
    for (let i = 0; i < asistentes.length; i++) {
      if (!platosSeleccionados[i] || platosSeleccionados[i].length === 0) {
        asistentesSinPlatos.push(asistentes[i]);
      }
    }

    // Si hay asistentes sin platos, mostrar alerta
    if (asistentesSinPlatos.length > 0) {
      const asistentesTexto = asistentesSinPlatos.join(", ");
      alert(
        `⚠️ Los siguientes asistentes no tienen platos seleccionados:\n\n${asistentesTexto}\n\nPor favor, agrega al menos un plato para cada asistente antes de continuar.`
      );
      return; // No continuar
    }

    const datosJSON = generarJSON(firestoreId, platosSeleccionados, asistentes);
    console.log("Datos finales:", datosJSON);

    setGuardando(true);
    try {
      // Llamar a la función para guardar en Firestore
      const resultado = await guardarProductosEnReserva(
        firestoreId,
        datosJSON.platosSeleccionados
      );

      // Si fue exitoso, llamar a onConfirmar con los datos
      if (onConfirmar) {
        onConfirmar({
          ...datosJSON,
          exitoso: true,
          total: resultado.total,
          totalProductos: resultado.totalProductos,
        });
      }
    } catch (error) {
      console.error("Error al guardar productos:", error);
      // Aquí podrías mostrar un toast o mensaje de error
      alert("Error al guardar los productos. Por favor, intenta de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  // ===========================
  // VARIABLES DERIVADAS
  // ===========================
  const asistenteNombre = asistentes[asistenteActual];
  const platosDelAsistente = platosSeleccionados[asistenteActual] || [];

  // Calcular totales para el asistente actual
  const totalCantidad = platosDelAsistente.reduce(
    (sum, plato) => sum + plato.cantidad,
    0
  );
  const totalPrecio = platosDelAsistente.reduce(
    (sum, plato) => sum + plato.precio * plato.cantidad,
    0
  );

  // Calcular totales generales de toda la reserva
  const totalGeneralCantidad = Object.values(platosSeleccionados).reduce(
    (total, platos) =>
      total + platos.reduce((sum, plato) => sum + plato.cantidad, 0),
    0
  );
  const totalGeneralPrecio = Object.values(platosSeleccionados).reduce(
    (total, platos) =>
      total +
      platos.reduce((sum, plato) => sum + plato.precio * plato.cantidad, 0),
    0
  );

  // ===========================
  // RENDER
  // ===========================

  return (
    <div className="w-full h-full flex flex-col">
      <button
        type="button"
        onClick={onVolver}
        disabled={guardando}
        className="text-dark flex items-center gap-2 mb-4 transition-opacity opacity-80 hover:opacity-100"
      >
        <ChevronLeft className="text-dark transition-colors" />
        Volver
      </button>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-center text-dark"
          >
            <p className="text-lg font-semibold">Cargando platos...</p>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-hidden flex flex-col"
        >
          {/* Contenido principal: 2 columnas */}
          <div className="flex items-center gap-8 flex-1 overflow-hidden">
            {/* Columna izquierda: Asistente Actual */}
            <div className="h-full flex flex-col bg-white/20 w-1/3 p-6 rounded-lg">
              <h4 className="font-semibold mb-4 text-dark">
                Selecciona los platos por persona
              </h4>

              {/* Asistente Actual */}
              <div className="text-dark rounded-lg mb-4 flex-1 flex flex-col min-h-0 overflow-hidden">
                <div className="flex flex-col overflow-hidden">
                  <div className="font-medium text-lg my-4">
                    <span className="block">{asistenteNombre}</span>
                  </div>

                  {/* Lista de platos con scroll */}
                  <div className="flex-1 min-h-0">
                    <div className="h-full overflow-y-auto max-h-[60vh]">
                      {platosDelAsistente.length > 0 ? (
                        <div className="space-y-4 pr-2">
                          {platosDelAsistente.map((plato) => (
                            <motion.div
                              key={plato.id}
                              className={`bg-secondary flex items-center gap-3 px-3 py-4 rounded-lg transition-all cursor-pointer relative`}
                            >
                              <picture className="w-auto h-14 inline-block">
                                <img
                                  className="size-full object-cover inline-block rounded-lg"
                                  src={plato.img}
                                  alt={plato.nombre}
                                />
                              </picture>
                              <div className="flex-1 space-y-2">
                                <div className="w-full flex items-center justify-between">
                                  <p className="max-w-52 font-medium text-dark text-start line-clamp-1">
                                    {plato.nombre}
                                  </p>
                                  <span
                                    onClick={() =>
                                      handleSeleccionarPlato(plato)
                                    }
                                    className="size-8 flex items-center justify-end rounded-full"
                                  >
                                    <Trash className="text-dark/20 hover:text-red-500" />
                                  </span>
                                </div>

                                <div className="w-full flex items-center justify-between">
                                  <div className="flex flex-col">
                                    <p className="text-xs font-semibold text-dark text-start">
                                      ${plato.precio.toLocaleString("es-CO")}{" "}
                                      c/u
                                    </p>
                                  </div>

                                  <IncremenAndDecrementComponent
                                    item={plato.cantidad}
                                    increaseQuantity={() =>
                                      handleIncrementarCantidad(plato.id)
                                    }
                                    decreaseQuantity={() =>
                                      handleDisminuirCantidad(plato.id)
                                    }
                                  />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-dark/60 italic">
                          Sin platos seleccionados
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navegación entre asistentes - Fija en la parte inferior */}
              <div className="flex flex-col gap-2 mt-4 flex-shrink-0">
                {totalCantidad > 0 && (
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center">
                      <p className="text-dark/40">Productos seleccionados</p>
                      <span>{totalCantidad}</span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <p className="font-bold">Subtotal total</p>
                      <p>
                        <span>{totalPrecio.toLocaleString("es-CO")}</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Resumen Total de la Reserva */}
                {asistenteActual === asistentes.length - 1 &&
                  totalGeneralCantidad > 0 && (
                    <div className="flex flex-col w-full mt-4 pt-4 border-t border-dark/20">
                      <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Total a pagar</p>
                        <p className="font-bold">
                          <span>
                            ${totalGeneralPrecio.toLocaleString("es-CO")}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                <div className="flex justify-between items-center gap-4 mt-4">
                  {asistenteActual !== 0 && (
                    <Button
                      onClick={irAlAnterior}
                      title="Anterior"
                      type="button-dark"
                      customClass={`flex-1 py-1 px-3 ${
                        asistenteActual === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={asistenteActual === 0}
                      gap-4
                    />
                  )}

                  {asistenteActual === asistentes.length - 1 ? (
                    <Button
                      onClick={handleConfirmar}
                      title={guardando ? "Guardando..." : "Confirmar pedido"}
                      type="button-dark"
                      customClass="flex-1 py-1 px-3"
                      disabled={guardando}
                    />
                  ) : (
                    <Button
                      onClick={irAlSiguiente}
                      title="Siguiente"
                      width=""
                      type="button-dark"
                      customClass={`flex-1 py-1 px-3 ${
                        asistenteActual === asistentes.length - 1
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={asistenteActual === asistentes.length - 1}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Columna derecha: Platos por categorías */}
            <MenuSelected
              categorias={categorias}
              categoriaActual={categoriaActual}
              handleCategoriaChange={handleCategoriaChange}
              swiperRef={swiperRef}
              handleSlideChange={handleSlideChange}
              getProductosPorCategoria={getProductosPorCategoria}
              esPlatoSeleccionado={esPlatoSeleccionado}
              handleSeleccionarPlato={handleSeleccionarPlato}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ===========================
// COMPONENTE MENU SELECTED
// ===========================

/**
 * Componente para mostrar el menú de categorías y platos
 */
const MenuSelected = ({
  categorias,
  categoriaActual,
  handleCategoriaChange,
  swiperRef,
  handleSlideChange,
  getProductosPorCategoria,
  esPlatoSeleccionado,
  handleSeleccionarPlato,
}) => {
  return (
    <div className="flex-1 flex h-full overflow-hidden bg-white/20 p-6 rounded-lg">
      {/* Nombres de Categorías */}
      {categorias.length > 0 && (
        <div className="flex-1 h-full mb-4">
          <div className="font-parkson h-full flex flex-col justify-between overflow-x-auto">
            <h2 className="text-7xl mb-4">Menú</h2>
            {categorias.map((categoria, index) => (
              <div
                className={`pl-3 size-full relative border-l-1 flex items-center justify-start border-dark/20 ${
                  index !== categorias.length - 1 ? "border-b-1" : ""
                }`}
                key={categoria}
              >
                {categoriaActual === categoria && (
                  <span className="absolute left-0 h-2/5 w-1 rounded-full bg-brown" />
                )}
                <Button
                  key={categoria}
                  type="button-thirty"
                  onClick={() => handleCategoriaChange(categoria)}
                  title={capitalizeFirst(categoria.replace(/_/g, " "))}
                  customClass={`!text-2xl text-start ${
                    categoriaActual === categoria
                      ? "opacity-100"
                      : "opacity-40 hover:opacity-80"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Platos de la categoría con Slider Vertical */}
      <div className="w-[32.6rem] h-full space-y-2 overflow-y-auto bg-secondary pl-4 rounded-lg">
        <Swiper
          ref={swiperRef}
          direction="vertical"
          pagination={false}
          modules={[]}
          className="mySwiper w-full h-full"
          onSlideChange={handleSlideChange}
          initialSlide={categorias.indexOf(categoriaActual)}
          allowTouchMove={true}
          simulateTouch={true}
          keyboard={false}
        >
          {categorias.map((categoria) => {
            const productosCategoria = getProductosPorCategoria(categoria);

            return (
              <SwiperSlide key={categoria} className="h-full">
                <div className="w-full h-full overflow-y-auto space-y-2 pr-2">
                  {productosCategoria.length > 0 ? (
                    productosCategoria.map((plato) => (
                      <motion.div
                        key={plato.id}
                        className={`flex items-center gap-2 p-3 rounded-lg transition-all cursor-pointer hover:bg-dark/10 relative`}
                        onClick={() => handleSeleccionarPlato(plato)}
                      >
                        <picture className="w-16 h-auto aspect-square inline-block">
                          <img
                            className="size-full object-cover inline-block"
                            src={plato.img}
                            alt={plato.nombre}
                          />
                        </picture>
                        <div className="flex flex-col items-start justify-center ">
                          {esPlatoSeleccionado(plato.id) && (
                            <span className="bg-green-100 size-8 flex items-center justify-center rounded-full absolute right-4 top-1/2 -translate-y-1/2">
                              <Check className="text-green-400" />
                            </span>
                          )}

                          <p className="font-medium text-sm text-dark text-start line-clamp-1 max-w-86">
                            {plato.nombre}
                          </p>

                          <p className="text-xs font-semibold text-dark mt-1 text-start">
                            ${plato.precio.toLocaleString("es-CO")}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center text-dark/60 py-8">
                      <p className="text-sm">No hay platos en esta categoría</p>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
