import React, { useState, useEffect } from "react";
import coinImg from "../../../assets/epic_coin.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useCreatePrizeInfoMutation,
  useDeletePrizeInfoMutation,
  useGetPrizeInfoQuery,
  useUpdatePrizeInfoMutation,
} from "../../../features/game/prizeApi";
import { BiPlus } from "react-icons/bi";
function Prize() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState("");

  const { data, refetch } = useGetPrizeInfoQuery();
  const prizeInfo = data?.prizeInfo || [];
  const displayedPrizeInfo = showAll ? prizeInfo : prizeInfo.slice(0, 3);

  const [
    createPrizeInfo,
    { isError: createIsError, error: createError, isLoading: createIsLoading },
  ] = useCreatePrizeInfoMutation();
  const [deletePrizeInfo] = useDeletePrizeInfoMutation();
  const [updatePrizeInfo] = useUpdatePrizeInfoMutation();

  //handle create
  const handleCreate = async () => {
    if (title && position && imageFile) {
      const newPrizeInfo = new FormData();
      newPrizeInfo.append("title", title);
      newPrizeInfo.append("position", position);
      if (imageFile) {
        newPrizeInfo.append("image_url", imageFile);
      }
      try {
        if (editingIndex !== null) {
          await updatePrizeInfo({
            id: editingId,
            data: newPrizeInfo,
          }).unwrap();
          toast.success("Prize Info Updated Successfully!", {
            position: "top-right",
          });
        } else {
          await createPrizeInfo(newPrizeInfo).unwrap();
          toast.success("Prize Info Created!", { position: "top-right" });
        }

        setTitle("");
        setPosition("");
        setImageFile(null);
        setShowModal(false);
        setEditingIndex(null);
        setEditingId(null);
        refetch();
      } catch (error) {
        toast.error(`${error.message}`, { position: "top-right" });
        setError(error.message);
      }
    }
  };
  // handle delete
  const handleDelete = async (id) => {
    await deletePrizeInfo(id).unwrap();
    toast.success("Prize Info Deleted!", { position: "top-right" });
    refetch();
  };
  //handle update
  const handleUpdate = (index, id) => {
    setEditingIndex(index);
    setEditingId(id);
    setTitle(prizeInfo[index].title);
    setPosition(prizeInfo[index].position);
    setImageFile(null);
    setShowModal(true);
  };
  //handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setTitle("");
    setPosition("");
    setImageFile(null);
  };
  // handle image change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-green-600 p-4">
        Prize Management
      </h1>
      <div className="flex justify-center items-center mx-auto">
        <button
          onClick={() => setShowModal(true)}
          className="text-xl  text-green-600 font-bold border border-green-600 rounded px-8 py-4 hover:bg-green-600 hover:text-white  transform hover:scale-105 transition duration-500"
        >
          <span>Create Prize</span> +
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {error && <p className="bg-red-500 text-white">{error}</p>}
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              {editingIndex !== null ? "Update" : "Create"} Prize
            </h2>

            <div className="mb-4">
              <input
                type="file"
                name="image_url"
                id="file-input"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => document.getElementById("file-input").click()}
                className="mx-auto border hover:text-white p-4 rounded-md hover:bg-green-700 flex items-center justify-center"
              >
                Image
                <BiPlus />
              </button>
              {imageFile && (
                <p className="mt-2 text-gray-600">{imageFile.name}</p>
              )}
            </div>

            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <input
              type="text"
              placeholder="Enter Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
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
      <div className="mt-6 overflow-x-auto shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Image
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Title
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Position
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedPrizeInfo.map((prize, index) => (
              <tr key={prize._id}>
                <td className="px-6 py-4 border-b border-gray-200">
                  <img
                    src={prize.image_url}
                    alt="Prize"
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {prize.title}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-500">
                  {prize.position}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <button
                    onClick={() => handleUpdate(index, prize._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-700 transform hover:scale-105 transition duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(prize._id)}
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
      {prizeInfo.length > 3 && !showAll && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(true)}
            className="text-green-600 font-bold hover:text-green-700"
          >
            Show More
          </button>
        </div>
      )}
      {showAll && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(false)}
            className="text-green-600 font-bold hover:text-green-700"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
}

export default Prize;
