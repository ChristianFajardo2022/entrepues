const ReservaButton = ({ className = "", hiddenOnDesktop = false, onClick }) => (
  <button
    onClick={onClick}
    className={`RovelleUnoBold text-[#FFF7EC] border border-[#FFF7EC] cursor-pointer rounded-3xl w-40 h-10 flex justify-center items-center ${
      hiddenOnDesktop ? "md:hidden" : "md:flex"
    } ${className}`}
  >
    Reservar
  </button>
);

export default ReservaButton;
