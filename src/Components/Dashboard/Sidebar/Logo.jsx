import React from "react";

function Logo() {
  return (
    <div className="flex  lg:flex-1">
      <a
        href="/"
        className="-m-1.5 p-1.5 pb-4 flex items-center justify-between space-x-2"
      >
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          alt=""
        />
        <span className="font-bold">Epic</span>
      </a>
    </div>
  );
}

export default Logo;
