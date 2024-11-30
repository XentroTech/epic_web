import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useGetWinnersInfoQuery,
  usePrizeDistributeMutation,
} from "../../../features/game/prizeApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GameDistribution = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [type, setType] = useState("");
  let isPrizeSent = false;
  // Format date as 'YYYY-MM-DD'
  const formattedDate = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : null;

  // Fetch leaderboard data
  const { data, error, isLoading } = useGetWinnersInfoQuery({
    date: formattedDate,
    type: type,
  });

  const [prizeDistribute] = usePrizeDistributeMutation();

  //prize distribute handler
  const handleDistribute = async () => {
    try {
      await prizeDistribute({ date: formattedDate, type: type }).unwrap();
      isPrizeSent = true;
      toast.success("Prize has been distributed to winners!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
        Winners List
      </h1>

      {/* Date Picker */}
      <div className="mb-6 flex justify-center">
        <div className="flex-1">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            className="p-2 text-lg border rounded-md border-gray-300"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="type" className="text-slate-400 p-2">
            Select type
          </label>
          <select
            value={type}
            id="type"
            onChange={(e) => setType(e.target.value)}
            className="border rounded-md p-1 "
            placeholder="Select Type"
          >
            <option value="select" className="text-slate-400">
              select
            </option>
            <option value="game" className="text-slate-400">
              game
            </option>
            <option value="competition" className="text-slate-400">
              competition
            </option>
          </select>
        </div>
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
      ) : data?.leaderboard?.length > 0 ? (
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
          {data.leaderboard.map((item, index) => (
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
          <div className="div">
            <button
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2 transform hover:scale-105 transition duration-300"
              onClick={handleDistribute}
              disabled={isPrizeSent === true}
            >
              Distribute Prize
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">
          No results found for the selected date.
        </p>
      )}
    </div>
  );
};

export default GameDistribution;
