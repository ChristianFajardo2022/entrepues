import React from "react";
import useCartStore from "../../store/cartStore";

const CartModal = ({ isOpen, onClose }) => {
  const {
    cartItems,
    reservation,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price.replace(/\./g, "")) * (item.quantity || 1),
    0
  );

  const handlePay = () => {
    if (!reservation.name || !reservation.email || !reservation.whatsapp) {
      alert("Por favor inicia una reserva antes de pagar.");
      return;
    }
    console.log("Ir a pagar con:", reservation, cartItems);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex md:flex-row flex-col items-end">
      {/* Fondo desenfocado (lado izquierdo como SectionReserva) */}
      <div className="md:w-[60%]  w-full md:h-full h-[25%] bg-black/30 backdrop-blur-sm" />

      {/* Contenedor derecho con fondo e imagen */}
      <div className="md:w-[40%] w-full md:h-full h-[75%] text-[#fff6ea] p-10 relative flex flex-col items-center">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/fondoReserva.jpg"
          alt="Fondo"
        />

        {/* Encabezado */}
        <div className="relative z-10 flex md:w-[27.5rem] w-full h-[8rem] items-end">
          <p className="text-[1.7rem] z-10 mb-6 tracking-[0.2em] DansonSemiBold border-b border-[#fff6ea50] text-start w-full">
            TU ORDEN
          </p>

          <button
            onClick={onClose}
            className="text-xl absolute -right-5 top-10 cursor-pointer"
          >
            <img
              className="w-4"
              src="/videos/cerrarReserva-09.svg"
              alt="Cerrar"
            />
          </button>
        </div>

        {/* Contenido del carrito */}
        {/* Contenido del carrito */}
        <div className="flex flex-col justify-center h-full z-10 md:w-[27.5rem] RovelleUnoRegular">
          {cartItems.length === 0 ? (
            <p className="text-center mt-6">
              Aún no has agregado platos al carrito.
            </p>
          ) : (
            <div className=" md:block relative">
              {/* Lista de ítems */}
              <div className="flex flex-col gap-15 RovelleUnoRegular overflow-y-auto max-h-[22rem] pb-10 border-b border-white/20">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between  text-sm"
                  >
                    {/* Nombre del plato */}
                    <p className="w-[40%]">{item.title}</p>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => decreaseQuantity(item.title)}
                        className="border border-white/40 rounded-md w-12 h-6 flex items-center justify-center"
                      >
                        −
                      </button>
                      <span>{item.quantity || 1}</span>
                      <button
                        onClick={() => increaseQuantity(item.title)}
                        className="border border-white/40 rounded-md w-12 h-6 flex items-center justify-center"
                      >
                        ＋
                      </button>
                    </div>

                    {/* Precio */}
                    <p className="w-[5rem] text-right RovelleUnoRegular">
                      $
                      {Number(item.price.replace(/\./g, "")).toLocaleString(
                        "es-CO"
                      )}
                    </p>

                    {/* Botón eliminar */}
                    <button
                      onClick={() => removeFromCart(item.title)}
                      className="ml-2"
                    >
                      <img
                        className="w-4"
                        src="/videos/cerrarReserva-09.svg"
                        alt="Cerrar"
                      />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-4 mb-8 flex justify-between text-sm RovelleUnoBold">
                <span>Total:</span>
                <span>${total.toLocaleString("es-CO")}</span>
              </div>

              {/* Opciones de servicio */}
              <div className="flex flex-col gap-2 text-sm mt-4 RovelleUnoRegular">
                <label className="flex items-start gap-2">
                  <input type="radio" name="opcion" defaultChecked />
                  Preparar y servir cuando llegue al restaurante.
                </label>
                <label className="flex items-start gap-2">
                  <input type="radio" name="opcion" />
                  Llegar al restaurante y que ya esté el plato en la mesa.
                </label>
              </div>

              {/* Botón de acción */}
              <div className=" absolute md:w-[27.5rem] w-full md:-bottom-40 -bottom-20 ">
                <button
                  className="w-full py-2 bg-[#fff6ea] text-black rounded-full RovelleUnoBold cursor-pointer"
                  onClick={handlePay}
                >
                  Pagar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
