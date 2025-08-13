import React from "react";

const PasoContacto = ({
  name,
  email,
  whatsapp,
  setName,
  setEmail,
  setWhatsapp,
  
}) => {
  return (
    <div className="flex flex-col z-10 md:w-full my-10 text-[#fff6ea] text-sm gap-8 RovelleUnoBold">
      <p className="text-sm mb-1">Tus datos:</p>

      {/* Nombre completo */}
      <div className="flex flex-col w-full RovelleUnoBold">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent border-b border-[#fff6ea50] outline-none py-1 text-[#fff6ea] placeholder:text-[#fff6ea]"
          placeholder="Nombre completo: "
          required
        />
      </div>

      {/* Correo y Whatsapp */}
      <div className="flex gap-6 w-full RovelleUnoBold">
        <div className="flex flex-col w-1/2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border-b border-[#fff6ea50] outline-none py-1 text-[#fff6ea] placeholder:text-[#fff6ea]"
            placeholder="Correo:"
          />
        </div>

        <div className="flex flex-col w-1/2 RovelleUnoBold">
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="bg-transparent border-b border-[#fff6ea50] outline-none py-1 text-[#fff6ea] placeholder:text-[#fff6ea]"
            placeholder="Whatsapp:"
          />
        </div>
      </div>
    </div>
  );
};

export default PasoContacto;
