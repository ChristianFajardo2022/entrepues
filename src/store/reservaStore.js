import { create } from "zustand";

/**
 * Reserva Store - Versión simplificada
 * - Recibe un objeto completo desde fuera y lo guarda en localStorage
 * - Tiene función para limpiar localStorage
 * - Tiene función placeholder para enviar a la base de datos
 */

const STORAGE_KEY = "reserva:payload:v1";

export const useReservaStore = create((set, get) => {
  // Al iniciar el store, intenta cargar del localStorage
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

    /** Simula el envío a la base de datos y limpia si es exitoso */
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
        // TODO: Aquí conectas tu API real
        // await fetch('/api/reservas', { method: 'POST', body: JSON.stringify(payload) })
        await new Promise((r) => setTimeout(r, 300));

        localStorage.removeItem(STORAGE_KEY);
        set({
          datos: null,
          isSending: false,
          lastSentAt: new Date().toISOString(),
        });
        return { ok: true, data: payload };
      } catch (error) {
        set({ isSending: false });
        return { ok: false, error: error.message || "Error desconocido" };
      }
    },

    /** Enviar directamente a la base de datos sin guardar en localStorage */
    enviarDirecto: async (payload) => {
      set({ isSending: true });
      try {
        // TODO: Aquí conectas tu API real
        // await fetch('/api/reservas', { method: 'POST', body: JSON.stringify(payload) })
        await new Promise((r) => setTimeout(r, 300));
        set({ isSending: false, lastSentAt: new Date().toISOString() });
        return { ok: true };
      } catch (error) {
        set({ isSending: false });
        return { ok: false, error: error.message || "Error desconocido" };
      }
    },

    /** Limpia localStorage manualmente */
    limpiarStorage: () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (_) {}
      set({ datos: null });
    },
  };
});
