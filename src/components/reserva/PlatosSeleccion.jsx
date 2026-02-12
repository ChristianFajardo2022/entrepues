import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { capitalizeFirst } from "../../constants/firsLetterUppercase";
import { obtenerTodasLasCategorias, guardarProductosEnReserva } from "../../firebase/actions";

/**
 * Componente para la selección de platos por asistente
 */
export default function PlatosSeleccion({
  asistentes,
  firestoreId,
  onConfirmar,
  onVolver,
}) {
  const [asistenteActual, setAsistenteActual] = useState(0);
  const [platosSeleccionados, setPlatosSeleccionados] = useState({});
  const [categoriaActual, setCategoriActual] = useState("desayunos");
  const [subcategoriaActual, setSubcategoriaActual] = useState(null);
  const [categoriesData, setCategoriesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);

  // Normalizar nombres para comparación
  const normalize = (s = "") =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

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

  // Obtener subcategorías de la categoría seleccionada
  const subcategorias = useMemo(() => {
    const catKey = Object.keys(categoriesData).find(
      (key) => normalize(key) === normalize(categoriaActual)
    );
    if (!catKey) return [];
    return Object.keys(categoriesData[catKey]?.subcategorias || {});
  }, [categoriaActual, categoriesData]);

  // Resetear subcategoría cuando cambie la categoría
  useEffect(() => {
    setSubcategoriaActual(null);
  }, [categoriaActual]);

  // Establecer la primera subcategoría como activa cuando cambien las subcategorías
  useEffect(() => {
    if (subcategorias.length > 0 && !subcategoriaActual) {
      setSubcategoriaActual(subcategorias[0]);
    }
  }, [subcategorias, subcategoriaActual]);

  // Obtener productos de la subcategoría activa
  const platosActuales = useMemo(() => {
    if (!subcategoriaActual) return [];

    const catKey = Object.keys(categoriesData).find(
      (key) => normalize(key) === normalize(categoriaActual)
    );

    if (!catKey) return [];

    const subcatigoriesData = categoriesData[catKey]?.subcategorias || {};
    const productsData = subcatigoriesData[subcategoriaActual]?.productos || [];

    // Agregar ID único a cada producto
    return productsData.map((plato, index) => ({
      id: `${categoriaActual}__${subcategoriaActual}__${plato.id}__${index}`,
      originalId: plato.id,
      nombre: plato.nombre,
      descripcion: plato.descripcion || "",
      precio: parseFloat(String(plato.precio).replace(/\D/g, "")),
      categoria: categoriaActual,
      subcategoria: subcategoriaActual,
      img: plato.img,
    }));
  }, [categoriaActual, subcategoriaActual, categoriesData]);

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
        return {
          ...prev,
          [asistenteActual]: [...actual, plato],
        };
      }
    });
  };

  const esPlatoSeleccionado = (platoId) => {
    return (platosSeleccionados[asistenteActual] || []).some(
      (p) => p.id === platoId
    );
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

  const generarJSON = () => {
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
            categoria: p.categoria,
            subcategoria: p.subcategoria,
          })),
          totalPlatos: platos.length,
        })
      ),
    };
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

    const datosJSON = generarJSON();
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

  const asistenteNombre = asistentes[asistenteActual];
  const platosDelAsistente = platosSeleccionados[asistenteActual] || [];

  return (
    <div className="w-full h-full flex flex-col">
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
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-dark mb-2">
              Selecciona platos para {asistenteNombre}
            </h3>
            <p className="text-sm text-dark/60">
              Asistente {asistenteActual + 1} de {asistentes.length}
            </p>
          </div>

        {/* Contenido principal: 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
          {/* Columna izquierda: Asistentes */}
          <div className="flex flex-col">
            <h4 className="font-semibold mb-4 text-dark">Asistentes</h4>
            <div className="space-y-2 overflow-y-auto flex-1">
              {asistentes.map((asistente, index) => (
                <motion.button
                  key={index}
                  onClick={() => setAsistenteActual(index)}
                  className={`p-3 rounded-lg text-left transition-all w-full ${
                    asistenteActual === index
                      ? "bg-secondary text-dark shadow-lg"
                      : "bg-dark/10 hover:bg-dark/20 text-dark"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{asistente}</span>
                    <span className="text-xs bg-dark/20 px-2 py-1 rounded">
                      {(platosSeleccionados[index] || []).length}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Columna derecha: Platos por categorías */}
          <div className="flex flex-col overflow-hidden">
            {/* Categorías */}
            {categorias.length > 0 && (
              <div className="mb-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categorias.map((categoria) => (
                    <Button
                      key={categoria}
                      type="button-thirty"
                      onClick={() => setCategoriActual(categoria)}
                      title={capitalizeFirst(categoria.replace(/_/g, " "))}
                      fontSize="base"
                      customClass={`flex-shrink-0 ${
                        categoriaActual === categoria
                          ? "opacity-100"
                          : "opacity-40 hover:opacity-80"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Subcategorías */}
            {subcategorias.length > 0 && (
              <div className="mb-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {subcategorias.map((subcategoria) => (
                    <button
                      key={subcategoria}
                      onClick={() => setSubcategoriaActual(subcategoria)}
                      className={`px-3 py-1.5 rounded text-sm font-medium flex-shrink-0 transition-all ${
                        subcategoriaActual === subcategoria
                          ? "bg-dark/30 text-dark"
                          : "bg-dark/10 text-dark/60 hover:bg-dark/20"
                      }`}
                    >
                      {capitalizeFirst(subcategoria.replace(/_/g, " "))}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Platos de la categoría */}
            <div className="space-y-2 overflow-y-auto flex-1">
              {platosActuales.length > 0 ? (
                platosActuales.map((plato) => (
                  <motion.div
                    key={plato.id}
                    className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      esPlatoSeleccionado(plato.id)
                        ? "border-secondary bg-secondary/10"
                        : "border-dark/20 bg-dark/5 hover:bg-dark/10"
                    }`}
                    onClick={() => handleSeleccionarPlato(plato)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={esPlatoSeleccionado(plato.id)}
                        onChange={() => handleSeleccionarPlato(plato)}
                        className="mt-1 cursor-pointer accent-secondary"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-dark">
                          {plato.nombre}
                        </p>
                        <p className="text-xs text-dark/60 line-clamp-1">
                          {plato.descripcion}
                        </p>
                        <p className="text-xs font-semibold text-dark mt-1">
                          ${plato.precio.toLocaleString("es-CO")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center text-dark/60 py-8">
                  <p className="text-sm">No hay platos en esta categoría</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resumen del asistente */}
        <div className="mt-6 p-4 bg-dark/10 rounded-lg border border-dark/20">
          <p className="text-sm font-semibold text-dark mb-2">
            Platos seleccionados para {asistenteNombre}:
          </p>
          {platosDelAsistente.length > 0 ? (
            <div className="space-y-1">
              {platosDelAsistente.map((plato) => (
                <p key={plato.id} className="text-xs text-dark/60">
                  • {plato.nombre}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-xs text-dark/60 italic">
              Sin platos seleccionados
            </p>
          )}
        </div>

        {/* Botones de navegación */}
        <div className="flex gap-3 mt-6 justify-between">
          <div className="flex gap-2">
            <Button
              onClick={irAlAnterior}
              title="Anterior"
              type="button-dark"
              customClass={`py-1.5 px-4 ${
                asistenteActual === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={asistenteActual === 0}
            />
            <Button
              onClick={irAlSiguiente}
              title="Siguiente"
              type="button-dark"
              customClass={`py-1.5 px-4 ${
                asistenteActual === asistentes.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={asistenteActual === asistentes.length - 1}
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onVolver}
              title="Volver"
              type="button-dark"
              customClass="py-1.5 px-4"
              disabled={guardando}
            />
            <Button
              onClick={handleConfirmar}
              title={guardando ? "Guardando..." : "Confirmar pedido"}
              type="button-dark"
              customClass="py-1.5 px-4"
              disabled={guardando}
            />
          </div>
        </div>
      </motion.div>
      )}
    </div>
  );
}
