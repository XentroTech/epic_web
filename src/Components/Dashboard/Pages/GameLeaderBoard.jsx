import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetGameLeaderBoardQuery } from "../../../features/game/gameTimeApi";

const GameLeaderBoard = () => {
  let now = new Date();
  const [selectedDate, setSelectedDate] = useState(now);
  // Format date as 'YYYY-MM-DD'
  const formattedDate = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : null;

  // Fetch leaderboard data
  const { data, error, isLoading } = useGetGameLeaderBoardQuery({
    date: formattedDate,
  });
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
        Game Leaderboard
      </h1>

      {/* Date Picker */}
      <div className="mb-6 flex justify-center">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          className="p-2 text-lg border rounded-md border-gray-300"
        />
      </div>

      {/* Loading or Error Messages */}
      {isLoading ? (
        <p className="text-center text-xl text-gray-500">
          Loading leaderboard...
        </p>
      ) : error ? (
        <p className="text-center text-xl text-red-500">
          No results found for the selected date: {error.message}
        </p>
      ) : data?.leaderBoard?.length > 0 ? (
        <div className="space-y-4">
          {/* Leaderboard Table Header */}
          <div className="flex items-center bg-gray-100 p-4 rounded-lg text-gray-700 font-semibold">
            <div className="flex justify-start items-center flex-grow text-center">
              Rank
            </div>
            <div className="flex items-center flex-grow">Name</div>
            <div className="flex justify-center items-center flex-grow text-center">
              Time/Completion
            </div>
          </div>

          {/* Leaderboard Content */}
          {data?.leaderBoard.map((item, index) => (
            <div
              key={item._id}
              className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-all"
            >
              {/* Rank */}
              <div className="flex justify-start items-center flex-grow text-center text-2xl font-bold text-gray-700">
                {index + 1}
              </div>

              {/* Profile Image and Name */}
              <div className="flex items-center flex-grow ml-4">
                <img
                  src={item.user?.profile_pic || "default.jpg"}
                  alt={`${item.user?.name}'s profile`}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <p className="font-semibold text-lg text-gray-800">
                  {item.user?.name || "Unknown User"}
                </p>
              </div>

              {/* Duration */}
              <div className="flex justify-start items-center flex-grow text-center text-gray-600">
                {item.duration} seconds
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">
          No results found for the selected date.
        </p>
      )}
    </div>
  );
};

export default GameLeaderBoard;
