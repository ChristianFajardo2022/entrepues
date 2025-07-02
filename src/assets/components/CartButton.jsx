import React from "react";
import useCartStore from "../../store/cartStore";
import cartIcon from "/ENTREPUES-PAGINA-21.svg"; // Usa tu imagen aquí

const CartButton = ({ onClick, color = "#E89726" }) => {
  const cartItems = useCartStore((state) => state.cartItems);
  const itemCount = cartItems.length;

  return (
    <button
      onClick={onClick}
      className=" ml-5 z-50 w-8 cursor-pointer"
    >
      <div className="relative">
        <img src={cartIcon} alt="Carrito" className="w-12 h-12" />
        {itemCount > 0 && (
          <span className="absolute -bottom-1 -right-4 text-black text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
            {itemCount}
          </span>
        )}
      </div>
    </button>
  );
};

export default CartButton;
