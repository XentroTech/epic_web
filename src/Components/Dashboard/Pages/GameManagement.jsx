import React, { useState, useEffect } from "react";
import Prizes from "./Prizes";
import LeaderBoard from "./LeaderBoard";
import GameTime from "./GameTime";

const GameManagement = () => {
  return (
    <div>
      <Prizes />
      <LeaderBoard />
      <GameTime />
    </div>
  );
};

export default GameManagement;
