import React from "react";
import { Link } from "react-router-dom";

const Iconoprincipal = () => {
  return (
    <div className=" md:w-38 w-20 h-auto absolute top-14 left-10 z-[900]">
      <Link className="" to="/">
        <img className="md:w-38 w-20 z-50" src="/entrepues.svg" alt="Logo" />
      </Link>
    </div>
  );
};

export default Iconoprincipal;
