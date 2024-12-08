import React from "react";
import logo from "../../../assets/epic_coin.png";
function Logo() {
  return (
    <div className="flex  lg:flex-1">
      <a
        href="/"
        className="-m-1.5 p-1.5 pb-4 flex items-center justify-between space-x-2"
      >
        <img className="h-8 w-auto" src={logo} alt="" />
        <span className="font-bold">Epic</span>
      </a>
    </div>
  );
}

export default Logo;
