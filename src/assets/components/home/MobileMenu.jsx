
import { Link } from "react-router-dom";
import ReservaButton from "./ReservaButton";

const MobileMenu = ({ onClose, onReservaClick }) => (
  <div className="fixed inset-0 w-full h-full z-[300] backdrop-blur-md">
    <div className="h-[55%] rounded-b-4xl bg-black text-white px-10 pt-14 flex flex-col md:hidden">
      <div className="flex justify-between items-center">
        <img src="/entrepues.svg" alt="Logo" className="w-20 opacity-0" />
        <button onClick={onClose}>
          <span className="text-3xl text-white">&times;</span>
        </button>
      </div>

      <nav className="mt-20 flex flex-col gap-15 text-2xl tracking-[0.2em] DansonBold">
        <p className="border-b border-white/30 pb-2">BIENVENIDOS</p>
        <Link to="/video" onClick={onClose}>VISITA 360°</Link>
        <Link to="/cartam" onClick={onClose}>CARTA</Link>
      </nav>
    </div>

    <div className="w-full h-[40%] items-center justify-center flex">
      <div className="absolute bottom-30 z-[400] w-50 flex items-center justify-center">
        <ReservaButton hiddenOnDesktop onClick={onReservaClick} />
      </div>
    </div>
  </div>
);



export default MobileMenu;
