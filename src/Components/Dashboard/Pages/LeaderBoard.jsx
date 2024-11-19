import React from "react";
import GameLeaderBoard from "./GameLeaderBoard";
import CompetitionLeaderBoard from "./CompetitionLeaderBoard";

function LeaderBoard() {
  return (
    <div className=" mx-auto px-4 sm:px-8 py-8">
      <h3 className="text-3xl font-bold leading-tight pb-8 text-green-600 text-left">
        Leader Boards
      </h3>
      <div className="flex justify-between content-center">
        <div className="flex-1 game">
          <GameLeaderBoard />
        </div>
        <div className="flex-1">
          <CompetitionLeaderBoard />
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
