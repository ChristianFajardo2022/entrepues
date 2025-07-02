import { create } from "zustand";

const useCartStore = create((set) => ({
  reservation: {
    name: "",
    email: "",
    whatsapp: "",
    selectedDate: null,
    hour: null,
    minute: null,
    amPm: null,
    adults: 0,
    children: 0,
  },
  cartItems: [],

  // Métodos
  setReservation: (data) => set({ reservation: { ...data } }),

  addToCart: (item) =>
    set((state) => {
      const exists = state.cartItems.find((i) => i.title === item.title);
      if (exists) return state;
      return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
    }),
  
  removeFromCart: (title) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.title !== title),
    })),

  clearCart: () => set({ cartItems: [] }),

  increaseQuantity: (title) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.title === title
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      ),
    })),
  
  decreaseQuantity: (title) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.title === title
            ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
            : item
        ),
    })),
  
}));
export default useCartStore;
