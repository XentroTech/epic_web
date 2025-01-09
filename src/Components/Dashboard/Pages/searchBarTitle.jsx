import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useCreateTitleMutation,
  useDeleteTitleMutation,
  useGetTitleQuery,
  useUpdateTitleMutation,
} from "../../../features/searchBarTitle/searchBarTitleApi";
function SearchBarTitle() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  //fetching title data
  const { data, refetch } = useGetTitleQuery();
  const titles = data?.titles || [];
  const [
    createTitle,
    { isError: createIsError, error: createError, isLoading: createIsLoading },
  ] = useCreateTitleMutation();
  const [deleteTitle] = useDeleteTitleMutation();
  const [updateTitle, { error: updateError }] = useUpdateTitleMutation();

  //handle create
  const handleCreate = async () => {
    if (!title) {
      setError("Title cannot be empty");
      toast.error("Title cannot be empty", { position: "top-right" });
      return;
    }
    if (title) {
      try {
        if (editingIndex !== null) {
          await updateTitle({
            id: editingId,
            data: title,
          }).unwrap();
          toast.success("Title Updated Successfully!", {
            position: "top-right",
          });
        } else {
          await createTitle(title).unwrap();
          toast.success("Title Created!", { position: "top-right" });
        }

        setTitle("");
        setShowModal(false);
        setEditingIndex(null);
        setEditingId(null);
        refetch();
      } catch (error) {
        if (createError) {
          toast.error(createError?.data.message || "An error occurred", {
            position: "top-right",
          });
        } else if (updateError) {
          toast.error(updateError?.data.message || "An error occurred", {
            position: "top-right",
          });
        } else {
          toast.error(error.message || "An error occurred", {
            position: "top-right",
          });
        }
      }
    }
  };

  // handle delete
  const handleDelete = async (id) => {
    await deleteTitle(id).unwrap();
    toast.success("Title has been Deleted!", { position: "top-right" });
    refetch();
  };
  //handle update
  const handleUpdate = (index, id) => {
    setEditingIndex(index);
    setEditingId(id);
    setTitle(titles[index].title);

    setShowModal(true);
  };
  //handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setTitle("");
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h1 className="text-2xl font-bold text-green-600 p-4 ">
        Search Bar Titles
      </h1>
      <div className="flex justify-center items-center mx-auto">
        <button
          onClick={() => setShowModal(true)}
          className="text-xl  text-green-600 font-bold border border-green-600 rounded px-8 py-4 hover:bg-green-600 hover:text-white  transform hover:scale-105 transition duration-500"
        >
          <span>Create Title</span> +
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              {editingIndex !== null ? "Update" : "Create"} Title
            </h2>

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
                Title
              </th>

              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {titles.map((title, index) => (
              <tr key={title._id}>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {title.title}
                </td>

                <td className="px-6 py-4 border-b border-gray-200">
                  <button
                    onClick={() => handleUpdate(index, title._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-700 transform hover:scale-105 transition duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(title._id)}
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

export default SearchBarTitle;
