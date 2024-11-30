import React, { useState, useEffect } from "react";
import Prizes from "./Prizes";
import LeaderBoard from "./LeaderBoard";
import GameTime from "./GameTime";
import PrizeDistribution from "./PrizeDistribution";
const GameManagement = () => {
  return (
    <div>
      <GameTime />
      <LeaderBoard />
      <Prizes />
      <PrizeDistribution />
    </div>
  );
};

export default GameManagement;
