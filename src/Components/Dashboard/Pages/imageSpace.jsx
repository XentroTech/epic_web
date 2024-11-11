import React, { useState, useEffect } from "react";
import {
  useCreateImageSpaceInfoMutation,
  useGetImageSpacesInfoQuery,
  useDeleteImageSpacesInfoMutation,
  useUpdateImageSpacesInfoMutation,
} from "../../../features/finance/spaceApi";
import imgSpace from "../../../assets/image-space.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ImageSpace() {
  const [showModal, setShowModal] = useState(false);
  const [price, setPrice] = useState("");
  const [space, setSpace] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const { data, refetch } = useGetImageSpacesInfoQuery();
  const imageSpaces = data?.imageSpaceInfo;

  const [createImageSpaceInfo] = useCreateImageSpaceInfoMutation();
  const [deleteImageSpacesInfo] = useDeleteImageSpacesInfoMutation();
  const [updateImageSpacesInfo] = useUpdateImageSpacesInfoMutation();

  const handleCreate = async () => {
    console.log("Creating with:", { price, space });
    if (price && space) {
      const newImageSpace = {
        price,
        space,
        image_url: "https://via.placeholder.com/150",
      };

      try {
        if (editingIndex !== null) {
          // Update existing entry
          await updateImageSpacesInfo({
            id: editingId,
            data: newImageSpace,
          }).unwrap();
          toast.success(`Image Space Updated Successfully!`, {
            position: "top-right",
          });
        } else {
          // Add new entry
          try {
            await createImageSpaceInfo(newImageSpace).unwrap();
            toast.success(`Image Space Info Created!`, {
              position: "top-right",
            });
          } catch (err) {
            toast.success(`${err.message}`, {
              position: "top-right",
            });
          }
        }

        setPrice("");
        setSpace("");
        setShowModal(false);
        setEditingIndex(null);
        setEditingId(null);
        refetch();
      } catch (error) {
        console.error("Error in handleCreate:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    await deleteImageSpacesInfo(id).unwrap();
    toast.success(`Image Space Info Deleted!`, {
      position: "top-right",
    });
    refetch();
  };

  const handleUpdate = (index, id) => {
    setEditingIndex(index);
    setEditingId(id);
    setPrice(imageSpaces[index].price);
    setSpace(imageSpaces[index].space);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setPrice("");
    setSpace("");
  };

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-2xl font-bold text-green-600 p-4">
        Image Space Management
      </h1>
      <div className=" flex justify-center items-center mx-auto">
        <button
          onClick={() => setShowModal(true)}
          className="text-xl text-green-600 border-green-600 font-bold border rounded px-8 py-4 hover:bg-green-600 hover:text-white transform hover:scale-105 transition duration-500"
        >
          <span>Create Space</span> +
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl font-semibold mb-4">
              {editingIndex !== null ? "Update" : "Create"} Image Space
            </h2>

            <input
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <input
              type="text"
              placeholder="Enter space"
              value={space}
              onChange={(e) => setSpace(e.target.value)}
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
                className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-yellow-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table of Image Spaces */}
      <div className="mt-6 overflow-x-auto shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Image
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Price
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Space
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {imageSpaces?.map((space, index) => (
              <tr key={space._id}>
                <td className="px-6 py-4 border-b border-gray-200">
                  <img
                    src={imgSpace}
                    alt="Space"
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {space.price}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-500">
                  {space.space}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <button
                    onClick={() => handleUpdate(index, space._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-700 transform hover:scale-105 transition duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(space._id)}
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

export default ImageSpace;
