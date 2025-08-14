import { create } from "zustand";
import { guardarReservaEnFirestore } from "../firebase/firestore";

const STORAGE_KEY = "reserva:payload:v1";

export const useReservaStore = create((set, get) => {
  let datosGuardados = null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) datosGuardados = JSON.parse(saved);
  } catch (_) {
    datosGuardados = null;
  }

  return {
    datos: datosGuardados,
    modoServicio: "Preparar y servir cuando llegue al restaurante",
    isSending: false,
    lastSentAt: null,

    /** Guarda el objeto completo en localStorage y en estado */
    guardarDatos: (payload) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        set({ datos: payload });
      } catch (error) {
        console.error("Error guardando en storage", error);
      }
    },

    /** Establece el modo de servicio (desde los radios) */
    setModoServicio: (valor) => {
      set({ modoServicio: valor });
    },

    /** Envía los datos a Firestore y limpia el storage si es exitoso */
    enviarDatos: async (extras = {}) => {
      const { datos, modoServicio } = get();
      if (!datos) return { ok: false, error: "No hay datos para enviar" };

      const payload = {
        ...datos,
        productos: extras.productos || {},
        servicio: modoServicio,
      };

      set({ isSending: true });
      try {
        const res = await guardarReservaEnFirestore(payload);
        if (!res.ok) throw new Error(res.error);

        localStorage.removeItem(STORAGE_KEY);
        set({
          datos: null,
          isSending: false,
          lastSentAt: new Date().toISOString(),
        });

        return { ok: true, id: res.id, data: payload };
      } catch (error) {
        set({ isSending: false });
        return { ok: false, error: error.message || "Error desconocido" };
      }
    },

    /** Enviar directamente a Firestore sin pasar por storage */
    enviarDirecto: async (payload) => {
      set({ isSending: true });
      try {
        const res = await guardarReservaEnFirestore(payload);
        if (!res.ok) throw new Error(res.error);

        set({ isSending: false, lastSentAt: new Date().toISOString() });
        return { ok: true, id: res.id };
      } catch (error) {
        set({ isSending: false });
        return { ok: false, error: error.message || "Error desconocido" };
      }
    },

    /** Limpia el localStorage manualmente */
    limpiarStorage: () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (_) {}
      set({ datos: null });
    },
  };
});
