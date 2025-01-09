import React from "react";
import MovingComponent from "react-moving-text";
function DashboardWelcome() {
  return (
    <div className=" flex justify-center items-center mx-auto text-center pt-5 text-green-600 text-5xl font-bold">
      <MovingComponent
        type="popIn"
        duration="100ms"
        delay="1s"
        direction="normal"
        timing="linear"
        iteration="1"
        fillMode="backwards"
      >
        Welcome to Epic Dashboard!
      </MovingComponent>
    </div>
  );
}

export default DashboardWelcome;
