import React, { useState } from "react";
import {
  useCreateGameTimeMutation,
  useDeleteGameTimeMutation,
  useGetGameTimeQuery,
  useUpdateGameTimeMutation,
} from "../../../features/game/gameTimeApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GameTime() {
  const [showModal, setShowModal] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const { data, refetch } = useGetGameTimeQuery();
  const gameTimes = data?.gameTime || [];

  const [createGameTime] = useCreateGameTimeMutation();
  const [deleteGameTime] = useDeleteGameTimeMutation();
  const [updateGameTime, { error: updateError }] = useUpdateGameTimeMutation();

  //handle create
  const handleCreate = async () => {
    if (!gameTime) {
      toast.error("Game time cannot be empty!", { position: "top-right" });
      return;
    }

    // const dataToSend = gameTime;

    try {
      if (editingIndex !== null) {
        await updateGameTime({ id: editingId, data: { gameTime } }).unwrap();
        toast.success("Game time has been Updated", { position: "top-right" });
      } else {
        await createGameTime({ gameTime }).unwrap();
        toast.success("Game Time Created!", { position: "top-right" });
      }

      setGameTime("");
      setShowModal(false);
      setEditingIndex(null);
      setEditingId(null);
      setError("");
      refetch();
    } catch (error) {
      if (error.originalStatus === 404) {
        toast.error("Endpoint not found. Please check the API URL.", {
          position: "top-right",
        });
      } else if (error.status === "PARSING_ERROR") {
        toast.error("Invalid response from server.", { position: "top-right" });
      } else {
        toast.error(error?.data?.message || "Something went wrong", {
          position: "top-right",
        });
      }

      // setError(error.data.message);
    }
  };

  // handle delete
  const handleDelete = async (id) => {
    await deleteGameTime(id).unwrap();
    toast.success("Game time has been Deleted!", { position: "top-right" });
    refetch();
  };
  //handle update
  const handleUpdate = (index, id) => {
    setEditingIndex(index);
    setEditingId(id);
    setGameTime(gameTimes[index].gameTime);
    setShowModal(true);
  };
  //handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setGameTime("");
  };

  return (
    <div className="w-[50%] mx-auto px-4 sm:px-8 py-8 ">
      <h3 className="text-xl font-semibold leading-tight pb-4 text-slate-600 text-left"></h3>
      <div className="p-4">
        <div className="flex justify-center items-center mx-auto ">
          <button
            onClick={() => setShowModal(true)}
            className="text-xl  text-green-600 font-bold border border-green-600 rounded px-8 py-4 hover:bg-green-600 hover:text-white  transform  transition-colors duration-500"
          >
            <span>Set Game Time</span> +
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            {error && <p className="bg-red-500 text-white">{error}</p>}
            <div className="bg-white rounded-lg p-6 w-80">
              <h2 className="text-xl font-bold mb-4 text-green-600">
                {editingIndex !== null ? "Update" : "Create"} Game Time
              </h2>

              <input
                type="Number"
                placeholder="Enter Game Time"
                value={gameTime}
                onChange={(e) => setGameTime(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
              />

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleCreate}
                  className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-700"
                >
                  {editingIndex !== null ? "Update" : "Create"}
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table of coin management */}
        <div className="mt-6 overflow-x-auto shadow-md z-10">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                  Game Time
                </th>

                <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {gameTimes.map((time, index) => (
                <tr key={time._id}>
                  <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                    {time.gameTime}
                  </td>

                  <td className="px-6 py-4 border-b border-gray-200">
                    <button
                      onClick={() => handleUpdate(index, time._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-700 transform hover:scale-105 transition duration-300"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(time._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transform hover:scale-105 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GameTime;
