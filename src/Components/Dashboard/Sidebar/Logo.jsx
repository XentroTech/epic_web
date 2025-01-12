import React from "react";
import logo from "../../../assets/logo1.png";
function Logo() {
  return (
    <div className="flex  lg:flex-1">
      <a
        href="/"
        className="-m-1.5 p-1.5 pb-4 flex items-center justify-between space-x-1"
      >
        <img className="h-16 w-auto" src={logo} alt="" />
        <span className="font-bold text-[#016655] text-xl">Epic</span>
      </a>
    </div>
  );
}

export default Logo;
