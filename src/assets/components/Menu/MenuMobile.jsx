import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Content } from "../home/Content";
import ProductPopup from "./ProductPopup";
import useCartStore from "../../../store/cartStore"; // ⬅️ ajusta la ruta si aplica

// Helpers y data (puedes extraerlos si ya los tienes en otro archivo)
const normalize = (s = "") =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
const softKey = (s = "") => normalize(s).replace(/\bs\b/g, "").replace(/s\b/g, "");

const categorias = [
  { nombre: "Desayunos", subcategorias: ["Desayunos"] },
  { nombre: "Entradas", subcategorias: ["Frías", "Calientes", "Vegetarianas"] },
  { nombre: "Platos fuertes", subcategorias: ["Carne", "Pollo", "Pescado", "Vegetariano"] },
  { nombre: "Bebidas", subcategorias: ["Sin alcohol", "Con alcohol"] },
  { nombre: "Postres", subcategorias: ["Tortas", "Helados", "Frutas"] },
];

const bannerPorCategoria = {
  Desayunos: "/imagenes/categorias/bannerDesayunos.jpg",
  Entradas: "/imagenes/categorias/bannerDesayunos.jpg",
  "Platos fuertes": "/imagenes/categorias/bannerDesayunos.jpg",
  Bebidas: "/imagenes/categorias/bannerDesayunos.jpg",
  Postres: "/imagenes/categorias/bannerDesayunos.jpg",
};

// Usa tus productos reales aquí
const productos = [
  // DESAYUNOS
  {
    id: "des-1",
    categoria: "Desayunos",
    subcategoria: "Desayunos",
    nombre: "Calentado con huevo",
    precio: 18000,
    imagen: "/imagenes/categorias/desayunos.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "des-2",
    categoria: "Desayunos",
    subcategoria: "Desayunos",
    nombre: "Arepa con queso",
    precio: 12000,
    imagen: "/imagenes/categorias/desayunos.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "des-3",
    categoria: "Desayunos",
    subcategoria: "Desayunos",
    nombre: "Pancakes con miel",
    precio: 22000,
    imagen: "/imagenes/categorias/desayunos.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "des-4",
    categoria: "Desayunos",
    subcategoria: "Desayunos",
    nombre: "Bowl de frutas",
    precio: 20000,
    imagen: "/imagenes/categorias/desayunos.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "des-5",
    categoria: "Desayunos",
    subcategoria: "Desayunos",
    nombre: "Bowl de frutas",
    precio: 20000,
    imagen: "/imagenes/categorias/desayunos.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "des-6",
    categoria: "Desayunos",
    subcategoria: "Desayunos",
    nombre: "Bowl de frutas",
    precio: 20000,
    imagen: "/imagenes/categorias/desayunos.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "des-7",
    categoria: "Desayunos",
    subcategoria: "Desayunos",
    nombre: "Bowl de frutas",
    precio: 20000,
    imagen: "/imagenes/categorias/desayunos.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "des-8",
    categoria: "Desayunos",
    subcategoria: "Desayunos",
    nombre: "Bowl de frutas",
    precio: 20000,
    imagen: "/imagenes/categorias/desayunos.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },

  // ENTRADAS
  {
    id: "ent-1",
    categoria: "Entradas",
    subcategoria: "Frías",
    nombre: "Ceviche de camarón",
    precio: 26000,
    imagen: "/imagenes/categorias/entradas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "ent-2",
    categoria: "Entradas",
    subcategoria: "Calientes",
    nombre: "Palitos de queso",
    precio: 16000,
    imagen: "/imagenes/categorias/entradas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "ent-3",
    categoria: "Entradas",
    subcategoria: "Vegetarianas",
    nombre: "Hummus con crudités",
    precio: 18000,
    imagen: "/imagenes/categorias/entradas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "ent-4",
    categoria: "Entradas",
    subcategoria: "Vegetarianas",
    nombre: "Hummus con crudités",
    precio: 18000,
    imagen: "/imagenes/categorias/entradas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "ent-5",
    categoria: "Entradas",
    subcategoria: "Vegetarianas",
    nombre: "Hummus con crudités",
    precio: 18000,
    imagen: "/imagenes/categorias/entradas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "ent-6",
    categoria: "Entradas",
    subcategoria: "Vegetarianas",
    nombre: "Hummus con crudités",
    precio: 18000,
    imagen: "/imagenes/categorias/entradas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "ent-7",
    categoria: "Entradas",
    subcategoria: "Vegetarianas",
    nombre: "Hummus con crudités",
    precio: 18000,
    imagen: "/imagenes/categorias/entradas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "ent-8",
    categoria: "Entradas",
    subcategoria: "Vegetarianas",
    nombre: "Hummus con crudités",
    precio: 18000,
    imagen: "/imagenes/categorias/entradas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },

  // PLATOS FUERTES
  // PLATOS FUERTES
  // PLATOS FUERTES
  // PLATOS FUERTES
  // PLATOS FUERTES
  {
    id: "pf-1",
    categoria: "Platos fuertes",
    subcategoria: "Carne",
    nombre: "Churrasco",
    precio: 38000,
    imagen: "/imagenes/categorias/plato-fuerte.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "pf-2",
    categoria: "Platos fuertes",
    subcategoria: "Pollo",
    nombre: "Pechuga a la plancha",
    precio: 32000,
    imagen: "/imagenes/categorias/plato-fuerte.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "pf-3",
    categoria: "Platos fuertes",
    subcategoria: "Pescado",
    nombre: "Salmón grillado",
    precio: 42000,
    imagen: "/imagenes/categorias/plato-fuerte.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "pf-4",
    categoria: "Platos fuertes",
    subcategoria: "Pescado",
    nombre: "Salmón grillado",
    precio: 42000,
    imagen: "/imagenes/categorias/plato-fuerte.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "pf-5",
    categoria: "Platos fuertes",
    subcategoria: "Vegetariano",
    nombre: "Pasta al pesto",
    precio: 30000,
    imagen: "/imagenes/categorias/plato-fuerte.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "pf-6",
    categoria: "Platos fuertes",
    subcategoria: "Vegetariano",
    nombre: "Pasta al pesto",
    precio: 30000,
    imagen: "/imagenes/categorias/plato-fuerte.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "pf-7",
    categoria: "Platos fuertes",
    subcategoria: "Vegetariano",
    nombre: "Pasta al pesto",
    precio: 30000,
    imagen: "/imagenes/categorias/plato-fuerte.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "pf-8",
    categoria: "Platos fuertes",
    subcategoria: "Vegetariano",
    nombre: "Pasta al pesto",
    precio: 30000,
    imagen: "/imagenes/categorias/plato-fuerte.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },

  // BEBIDAS
  {
    id: "beb-1",
    categoria: "Bebidas",
    subcategoria: "Sin alcohol",
    nombre: "Limonada natural",
    precio: 9000,
    imagen: "/imagenes/categorias/bebidas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "beb-2",
    categoria: "Bebidas",
    subcategoria: "Sin alcohol",
    nombre: "Limonada natural",
    precio: 9000,
    imagen: "/imagenes/categorias/bebidas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "beb-3",
    categoria: "Bebidas",
    subcategoria: "Con alcohol",
    nombre: "Mojito",
    precio: 18000,
    imagen: "/imagenes/categorias/bebidas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "beb-4",
    categoria: "Bebidas",
    subcategoria: "Con alcohol",
    nombre: "Mojito",
    precio: 18000,
    imagen: "/imagenes/categorias/bebidas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "beb-5",
    categoria: "Bebidas",
    subcategoria: "Con alcohol",
    nombre: "Mojito",
    precio: 18000,
    imagen: "/imagenes/categorias/bebidas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "beb-6",
    categoria: "Bebidas",
    subcategoria: "Con alcohol",
    nombre: "Mojito",
    precio: 18000,
    imagen: "/imagenes/categorias/bebidas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "beb-7",
    categoria: "Bebidas",
    subcategoria: "Con alcohol",
    nombre: "Mojito",
    precio: 18000,
    imagen: "/imagenes/categorias/bebidas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "beb-8",
    categoria: "Bebidas",
    subcategoria: "Con alcohol",
    nombre: "Mojito",
    precio: 18000,
    imagen: "/imagenes/categorias/bebidas.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },

  // POSTRES
  {
    id: "pos-1",
    categoria: "Postres",
    subcategoria: "Tortas",
    nombre: "Torta de chocolate",
    precio: 15000,
    imagen: "/imagenes/categorias/postres.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "pos-2",
    categoria: "Postres",
    subcategoria: "Helados",
    nombre: "Helado artesanal",
    precio: 12000,
    imagen: "/imagenes/categorias/postres.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "pos-3",
    categoria: "Postres",
    subcategoria: "Frutas",
    nombre: "Macedonia de frutas",
    precio: 11000,
    imagen: "/imagenes/categorias/postres.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "pos-4",
    categoria: "Postres",
    subcategoria: "Frutas",
    nombre: "Macedonia de frutas",
    precio: 11000,
    imagen: "/imagenes/categorias/postres.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "pos-5",
    categoria: "Postres",
    subcategoria: "Frutas",
    nombre: "Macedonia de frutas",
    precio: 11000,
    imagen: "/imagenes/categorias/postres.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "pos-6",
    categoria: "Postres",
    subcategoria: "Frutas",
    nombre: "Macedonia de frutas",
    precio: 11000,
    imagen: "/imagenes/categorias/postres.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "pos-7",
    categoria: "Postres",
    subcategoria: "Frutas",
    nombre: "Macedonia de frutas",
    precio: 11000,
    imagen: "/imagenes/categorias/postres.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
  {
    id: "pos-8",
    categoria: "Postres",
    subcategoria: "Frutas",
    nombre: "Macedonia de frutas",
    precio: 11000,
    imagen: "/imagenes/categorias/postres.jpg",
    descripcion:
      "Omelette cremoso, que se abre revelando queso fundido, mientras nuestra salsa de tomate, cebolla y pimentón lo abraza con sabor intenso. Cada bocado se mezcla con papas que crujen por fuera y se deshacen por dentro.Un delicioso calentado con huevo, ideal para empezar el día.",
  },
];

const ANIMATION_DELAY = 2.3;

const MenuMobile = () => {
  const [loading, setLoading] = useState(false);
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);
  const [categoriaActiva, setCategoriaActiva] = useState(categorias[0].nombre);
  const [subcategoriaActiva, setSubcategoriaActiva] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [isFixed, setIsFixed] = useState(false);
  const scrollHastaAcaRef = useRef(null);
  const TOGGLE_ICON = "/imagenes/triangulo.svg";

  // === Cart (Zustand) ===
  const addToCart = useCartStore((s) => s.addToCart);
  const cartItems = useCartStore((s) => s.cartItems);
  const toCartItem = (p) => ({
    id: p.id,
    title: p.nombre,      // tu store compara por "title"
    price: p.precio,
    image: p.imagen,
    description: p.descripcion,
  });

  // Logs reactivos del carrito
  useEffect(() => {
    console.log("[MenuMobile] cartItems cambió:", cartItems);
  }, [cartItems]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollHastaAcaRef.current) return;
      const rect = scrollHastaAcaRef.current.getBoundingClientRect();
      setIsFixed(rect.top <= 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filtro de productos según categoría, subcategoría y búsqueda (tolerante)
  const activeCatObj = categorias.find(
    (c) => softKey(c.nombre) === softKey(categoriaActiva)
  );
  const activeCatName = activeCatObj ? activeCatObj.nombre : categorias[0].nombre;
  const bannerSrc =
    bannerPorCategoria[activeCatName] ?? bannerPorCategoria[categorias[0].nombre];

  const productosFiltrados = useMemo(() => {
    const q = normalize(busqueda);
    const active = softKey(activeCatName);
    const subActive = subcategoriaActiva ? softKey(subcategoriaActiva) : null;

    return productos.filter((p) => {
      const matchCat = softKey(p.categoria) === active;
      const matchSub = subActive ? softKey(p.subcategoria) === subActive : true;
      const matchSearch = q ? normalize(p.nombre).includes(q) : true;
      return matchCat && matchSub && matchSearch;
    });
  }, [activeCatName, subcategoriaActiva, busqueda]);

  // Popup handlers
  const handleOpenPopup = (producto) => {
    setProductoSeleccionado(producto);
    setPopupOpen(true);
  };
  const handleClosePopup = () => {
    setPopupOpen(false);
    setTimeout(() => setProductoSeleccionado(null), 200);
  };

  const formatoCOP = (n) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(n);


return (
    <motion.div
      initial={{ width: "100%", paddingTop: 0 }}
      animate={{ width: "100%", paddingTop: "7.8rem" }}
      transition={{ delay: ANIMATION_DELAY, duration: 0.5, ease: "easeInOut" }}
      className="w-full h-dvh mx-auto px-8 flex flex-col items-center justify-start z-50 relative bg-[#0b0b0b] overflow-y-auto"
    >
      <Content loading={loading} onlyHomeTwo={false} />

      {/* Animación inicial y video */}
      <motion.div
        className="size-full relative z-10"
        initial={{ height: "100%", borderRadius: 0 }}
        animate={{ height: "45%", borderRadius: "1rem" }}
        transition={{ delay: 2, duration: 0.5, ease: "easeInOut" }}
        style={{ willChange: "height" }}
      >
        <video
          className="size-full object-cover z-50 pointer-events-none"
          src={"/video/menu-intro.mp4"}
          autoPlay
          loop
          muted
          playsInline
        />
      </motion.div>

      {/* Blur de fondo cuando el popup está abierto */}
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />
        )}
      </AnimatePresence>

      {/* Popup de producto */}
      <ProductPopup
        open={popupOpen}
        onClose={handleClosePopup}
        producto={productoSeleccionado}
        onAdd={(producto, cantidad) => {
          // Aquí puedes manejar el "marchar el plato"
        }}
      />

      {loading && (
        <>
          {/* Sección sticky */}
          <div className="w-full flex flex-col my-8 scrollHastaAca bg-black sticky -top-5 z-50">
            {/* Sidebar filtros */}
            <div className="w-full gap-12 flex flex-col px-4 py-2">
              <input
                type="text"
                placeholder=" Buscar"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="RovelleUnoLight border border-[#FFF6EA] rounded-lg w-full py-2 text-[#FFF6EA] pl-5 bg-transparent placeholder-[#FFF6EA]/60"
              />

              <div className="h-full">
                <h2 className="RovelleUnoBold text-[#FFF6EA] mb-2">Categorías</h2>
                <ul className="flex gap-2 overflow-x-auto w-auto scrollbar-thin scrollbar-thumb-[#FFF6EA]/40 scrollbar-track-transparent">
                  {categorias.map((cat) => {
                    const isOpen = categoriaAbierta === cat.nombre;
                    const isActive = softKey(activeCatName) === softKey(cat.nombre);

                    return (
                      <li key={cat.nombre} className="w-auto">
                        <div className="flex items-center whitespace-nowrap">
                          <button
                            className={`RovelleUnoRegular hover:underline cursor-pointer ${
                              isActive ? "text-[#FFF6EA] underline" : "text-[#8C8C8C]"
                            }`}
                            onClick={() => {
                              setCategoriaActiva(cat.nombre);
                              setSubcategoriaActiva(null);
                            }}
                          >
                            {cat.nombre}
                          </button>
                          <button
                            className="ml-2 px-2 py-1 text-[#FFF6EA] rounded hover:bg-[#444] transition"
                            onClick={() =>
                              setCategoriaAbierta(isOpen ? null : cat.nombre)
                            }
                            aria-label={`Toggle ${cat.nombre}`}
                            aria-expanded={isOpen}
                          >
                            <img
                              src={TOGGLE_ICON}
                              alt=""
                              aria-hidden="true"
                              className={`w-3 h-3 inline-block transition-transform duration-200 ease-out transform ${
                                isOpen ? "rotate-0" : "rotate-90"
                              }`}
                            />
                          </button>
                        </div>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="ml-6 mt-2 list-disc pl-6"
                            >
                              {cat.subcategorias.map((sub, idx) => {
                                const subActive =
                                  subcategoriaActiva === sub && isActive;
                                return (
                                  <li key={sub + idx}>
                                    <button
                                      className={`RovelleUnoLight text-[#FFF6EA] hover:underline ${
                                        subActive ? "underline" : ""
                                      }`}
                                      onClick={() => {
                                        setCategoriaActiva(cat.nombre);
                                        setSubcategoriaActiva(sub);
                                      }}
                                    >
                                      {sub}
                                    </button>
                                  </li>
                                );
                              })}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Cards de productos, fuera del sticky */}
          <div className="w-full cardsImagenes mt-8">
            <div
              className="
                grid 
                grid-cols-2
                auto-rows-fr 
                gap-6 w-full px-2
              "
            >
              {productosFiltrados.length === 0 ? (
                <div className="col-span-full flex items-center justify-center text-[#FFF6EA]/80">
                  No encontramos resultados para tu búsqueda.
                </div>
              ) : (
                productosFiltrados.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg shadow-lg flex flex-col w-full h-full min-w-0 transition-transform duration-200 cursor-default"
                  >
                    {/* Imagen (única parte clickeable para abrir el popup) */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => handleOpenPopup(item)}
                      onKeyDown={(e) => e.key === "Enter" && handleOpenPopup(item)}
                      className="w-full h-50 overflow-hidden rounded-md mb-3 cursor-pointer"
                    >
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                      />
                    </div>

                    {/* Datos + botón carrito (no abren el popup) */}
                    <div className="w-full flex flex-col items-start">
                      <span className="text-[#FFF6EA] font-semibold text-base mb-1">
                        {item.nombre}
                      </span>

                      <div className="flex w-full justify-between items-center">
                        <span className="text-[#FFF6EA] text-sm mb-2">
                          {formatoCOP(item.precio)}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation(); // por si acaso
                            const payload = toCartItem(item);
                            console.log("[click] Intentando agregar al carrito:", payload);
                            addToCart(payload);
                            console.log(
                              "[store] cartItems ahora:",
                              useCartStore.getState().cartItems
                            );
                          }}
                          className="rounded-full p-2 flex items-center justify-center hover:scale-110 transition-transform"
                          aria-label={`Agregar ${item.nombre} al carrito`}
                        >
                          <img
                            src="/imagenes/carritoEntrepues.svg"
                            alt="Agregar al carrito"
                            className="w-5 h-5"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );};

export default MenuMobile;
