import React from "react";
import bg from "../assets/bg.png";
const Banner = () => {
  return (
    <div className="flex h-96 relative overflow-hidden">
      <div className="flex-1 bg-gray-100 p-8 clip-path-triangle">
        <h1 className="text-4xl font-bold mb-4">
          Unlock Your Photography Potential
        </h1>
        <p className="text-lg">
          Your talent captures the beauty of life.We handle the logistics,
          empowering you to chase your creative dreams.
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img
          src={bg}
          alt="Description of image"
          className="max-w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Banner;
