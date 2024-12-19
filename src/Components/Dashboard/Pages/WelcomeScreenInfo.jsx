import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BiPlus } from "react-icons/bi";
import {
  useCreateWelcomeScreenInfoMutation,
  useDeleteWelcomeScreenInfoMutation,
  useGetWelcomeScreenInfoQuery,
} from "../../../features/notification/welcomeScreenApi";
function WelcomeScreenInfo() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  // fetching data
  const { data, refetch } = useGetWelcomeScreenInfoQuery();
  const welcomeScreenInfo = data?.welcomeScreenInfo || [];

  const [createWelcomeScreenInfo, { error: createError }] =
    useCreateWelcomeScreenInfoMutation();
  const [deleteWelcomeScreenInfo] = useDeleteWelcomeScreenInfoMutation();
  //handle create
  const handleCreate = async () => {
    if (title && imageFile) {
      const newWelcomeInfo = new FormData();
      newWelcomeInfo.append("title", title);

      if (imageFile) {
        newWelcomeInfo.append("image_url", imageFile);
      }
      try {
        await createWelcomeScreenInfo(newWelcomeInfo).unwrap();
        toast.success(" Info Created!", { position: "top-right" });

        setTitle("");
        setImageFile(null);
        setShowModal(false);

        refetch();
      } catch (error) {
        toast.error(`${createError?.data.message}`, { position: "top-right" });
        // setError(error.data.message);
      }
    }
  };
  // handle delete
  const handleDelete = async (id) => {
    await deleteWelcomeScreenInfo(id).unwrap();
    toast.success(" Info Deleted!", { position: "top-right" });
    refetch();
  };

  //handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setTitle("");
    setImageFile(null);
  };
  // handle image change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center mx-auto">
        <button
          onClick={() => setShowModal(true)}
          className="text-xl  text-green-600 font-bold border border-green-600 rounded px-8 py-4 hover:bg-green-600 hover:text-white  transform hover:scale-105 transition duration-500"
        >
          <span>Create Welcome Screen Info</span> +
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {error && <p className="bg-red-500 text-white">{error}</p>}
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              Create info
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

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleCreate}
                className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-700"
              >
                create
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {welcomeScreenInfo.map((info, index) => (
              <tr key={info._id}>
                <td className="px-6 py-4 border-b border-gray-200">
                  <img
                    src={info.image_url}
                    alt="Prize"
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {info.title}
                </td>

                <td className="px-6 py-4 border-b border-gray-200">
                  <button
                    onClick={() => handleDelete(info._id)}
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
  );
}

export default WelcomeScreenInfo;
