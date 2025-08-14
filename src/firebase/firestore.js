import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

// Guarda la reserva en la colección 'reservas'
export const guardarReservaEnFirestore = async (payload) => {
  try {
    const docRef = await addDoc(collection(db, "reservas"), {
      ...payload,
      createdAt: serverTimestamp(),
    });
    return { ok: true, id: docRef.id };
  } catch (error) {
    console.error("Error guardando en Firestore:", error);
    return { ok: false, error: error.message };
  }
};
