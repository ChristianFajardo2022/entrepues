import { Outlet } from "react-router-dom";

import MenuModal from "../Pop-ups/MenuModal";

import CartModalWrapper from "../Pop-ups/CartModalWrapper";
import BookingModal from "../Pop-ups/BookingModal";
import { useScrollLock } from "../../hooks/useScrollLock";

/**
 * Layout principal de la aplicación
 * Contiene header y otros componentes que aparecen en todas las páginas
 * Los modales se renderizan aquí según el estado global
 */
export default function MainLayout() {
  // Bloquea el scroll del home cuando algún modal está abierto
  useScrollLock();

  return (
    <div className="h-full bg-black overflow-hidden">
      {/* Contenido de las páginas */}
      <>
        <Outlet />
      </>

      {/* Modal del menú - Controlado por estado global */}
      <MenuModal />

      {/* Modal del carrito - Controlado por estado global */}
      <CartModalWrapper />

      {/* Modal de reserva - Controlado por estado global */}
      <BookingModal />
    </div>
  );
}
