import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);
const CATEGORIAS = [
  "bebidas",
  "desayunos",
  "entradas",
  "platos_fuertes",
  "postres",
];

/**
 * Parsear productos desde un documento
 * @private
 */
const parsearProductos = (subcategoriaData, nombreSubcategoria) => {
  const productos = [];

  Object.entries(subcategoriaData).forEach(
    ([nombreProducto, datosProducto]) => {
      if (
        datosProducto &&
        typeof datosProducto === "object" &&
        datosProducto.precio
      ) {
        productos.push({
          id: nombreProducto,
          nombre: datosProducto.nombre || nombreProducto,
          precio: datosProducto.precio,
          descripcion: datosProducto.descripcion || "",
          img: datosProducto.img || "/imagenes/default.jpg",
          subcategoria: nombreSubcategoria,
        });
      }
    }
  );

  return productos;
};

/**
 * Obtener todas las categorías con subcategorías y productos
 * @returns {Promise<Object>} Estructura: {categoria: {nombre, subcategorias: {subcategoria: {nombre, productos}}}}
 */
export const obtenerTodasLasCategorias = async () => {
  try {
    const estructuraCategorias = {};

    for (const nombreCategoria of CATEGORIAS) {
      const categoriaRef = collection(db, nombreCategoria);
      const subcategoriasSnapshot = await getDocs(categoriaRef);

      const subcategorias = {};

      for (const subcategoriaDoc of subcategoriasSnapshot.docs) {
        const nombreSubcategoria = subcategoriaDoc.id;
        const productos = parsearProductos(
          subcategoriaDoc.data(),
          nombreSubcategoria
        );

        subcategorias[nombreSubcategoria] = {
          nombre: nombreSubcategoria,
          productos: productos,
        };
      }

      estructuraCategorias[nombreCategoria] = {
        nombre: nombreCategoria,
        subcategorias: subcategorias,
      };
    }

    return estructuraCategorias;
  } catch (error) {
    console.error("❌ Error al obtener categorías:", error);
    throw error;
  }
};

/**
 * Obtener una categoría específica
 * @param {string} nombreCategoria
 * @returns {Promise<Object>} {nombre, subcategorias: {subcategoria: {nombre, productos}}}
 */
export const obtenerCategoriaPorNombre = async (nombreCategoria) => {
  try {
    const categoriaRef = collection(db, nombreCategoria);
    const subcategoriasSnapshot = await getDocs(categoriaRef);

    const subcategorias = {};

    for (const subcategoriaDoc of subcategoriasSnapshot.docs) {
      const nombreSubcategoria = subcategoriaDoc.id;
      const productos = parsearProductos(
        subcategoriaDoc.data(),
        nombreSubcategoria
      );

      subcategorias[nombreSubcategoria] = {
        nombre: nombreSubcategoria,
        productos: productos,
      };
    }

    return {
      nombre: nombreCategoria,
      subcategorias: subcategorias,
    };
  } catch (error) {
    console.error(`❌ Error al obtener categoría ${nombreCategoria}:`, error);
    throw error;
  }
};

/**
 * Obtener productos de una subcategoría específica
 * @param {string} nombreCategoria
 * @param {string} nombreSubcategoria
 * @returns {Promise<Object>} {categoria, subcategoria, productos}
 */
export const obtenerProductosPorSubcategoria = async (
  nombreCategoria,
  nombreSubcategoria
) => {
  try {
    const subcategoriaRef = doc(db, nombreCategoria, nombreSubcategoria);
    const subcategoriaSnap = await getDoc(subcategoriaRef);

    if (!subcategoriaSnap.exists()) {
      return {
        categoria: nombreCategoria,
        subcategoria: nombreSubcategoria,
        productos: [],
      };
    }

    const productos = parsearProductos(
      subcategoriaSnap.data(),
      nombreSubcategoria
    );

    return {
      categoria: nombreCategoria,
      subcategoria: nombreSubcategoria,
      productos: productos,
    };
  } catch (error) {
    console.error(
      `❌ Error al obtener productos de ${nombreSubcategoria}:`,
      error
    );
    throw error;
  }
};

/**
 * Obtener un producto específico de una subcategoría
 * @param {string} nombreCategoria
 * @param {string} nombreSubcategoria
 * @param {string} productoId - ID del producto en el mapa
 * @returns {Promise<Object|null>} Producto o null si no existe
 */
export const obtenerProductoPorId = async (
  nombreCategoria,
  nombreSubcategoria,
  productoId
) => {
  try {
    const subcategoriaRef = doc(db, nombreCategoria, nombreSubcategoria);
    const subcategoriaSnap = await getDoc(subcategoriaRef);

    if (!subcategoriaSnap.exists()) {
      return null;
    }

    const subcategoriaData = subcategoriaSnap.data();
    const datosProducto = subcategoriaData[productoId];

    if (!datosProducto || typeof datosProducto !== "object") {
      return null;
    }

    return {
      id: productoId,
      nombre: datosProducto.nombre || productoId,
      precio: datosProducto.precio,
      descripcion: datosProducto.descripcion || "",
      img: datosProducto.img || "/imagenes/default.jpg",
      subcategoria: nombreSubcategoria,
      ...datosProducto,
    };
  } catch (error) {
    console.error(
      `❌ Error al obtener producto ${productoId}:`,
      error
    );
    throw error;
  }
};

/**
 * Guardar productos seleccionados en una reserva existente
 * @param {string} firestoreId - ID del documento de la reserva
 * @param {Array} platosSeleccionados - Array con estructura: [{asistente, asistenteIndex, platos: [{id, nombre, precio, ...}], totalPlatos}]
 * @returns {Promise<{success: boolean, message: string, total: number}>}
 */
export const guardarProductosEnReserva = async (
  firestoreId,
  platosSeleccionados
) => {
  try {
    // Calcular el total sumando los precios de todos los platos
    let totalMonto = 0;
    let totalProductos = 0;

    platosSeleccionados.forEach((asistenteData) => {
      asistenteData.platos.forEach((plato) => {
        totalMonto += parseFloat(plato.precio) || 0;
        totalProductos += 1;
      });
    });

    // Referencia al documento de la reserva
    const reservaRef = doc(db, "reservas", firestoreId);

    // Estructura de datos a guardar
    const productosData = {
      totalProductos: totalProductos,
      total: totalMonto,
      detalleAsistentes: platosSeleccionados,
      fechaActualizacion: new Date().toISOString(),
    };

    // Actualizar el documento
    await updateDoc(reservaRef, {
      productos: productosData,
    });

    console.log(
      `✅ Productos guardados exitosamente. Total: $${totalMonto.toLocaleString(
        "es-CO"
      )}`
    );

    return {
      success: true,
      message: "Productos guardados con éxito",
      total: totalMonto,
      totalProductos: totalProductos,
    };
  } catch (error) {
    console.error("❌ Error al guardar productos en reserva:", error);
    throw error;
  }
};

