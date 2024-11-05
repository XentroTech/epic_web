import React, { useState, useEffect } from "react";
import coinImg from "../../../assets/epic_coin.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BiPlus } from "react-icons/bi";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../features/images/categoryApi";
function Category() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState("");

  const { data, refetch } = useGetCategoryQuery();
  const categories = data?.categories || [];
  const displayedCategories = showAll ? categories : categories.slice(0, 3);

  const [
    createCategory,
    { isError: createIsError, error: createError, isLoading: createIsLoading },
  ] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  //handle create
  const handleCreate = async () => {
    if (name && imageFile) {
      const newCategory = new FormData();
      newCategory.append("name", name);
      if (imageFile) {
        newCategory.append("image_url", imageFile);
      }
      try {
        if (editingIndex !== null) {
          await updateCategory({
            id: editingId,
            data: newCategory,
          }).unwrap();
          toast.success("Category Updated Successfully!", {
            position: "top-right",
          });
        } else {
          await createCategory(newCategory).unwrap();
          toast.success("Category Created!", { position: "top-right" });
        }

        setName("");
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
    await deleteCategory(id).unwrap();
    toast.success("Category Deleted!", { position: "top-right" });
    refetch();
  };
  //handle update
  const handleUpdate = (index, id) => {
    setEditingIndex(index);
    setEditingId(id);
    setName(categories[index].name);
    setImageFile(null);
    setShowModal(true);
  };
  //handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setName("");
    setImageFile(null);
  };
  // handle image change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="p-4 container mx-auto px-4 sm:px-8 py-8">
      <h1 className="text-xl font-bold text-slate-500 p-4">Categories</h1>
      <div className="flex justify-center items-center mx-auto py-2">
        <button
          onClick={() => setShowModal(true)}
          className="text-xl  text-green-600 font-bold border border-green-600 rounded px-8 py-4 hover:bg-green-600 hover:text-white  transform hover:scale-105 transition duration-500"
        >
          <span>Create Category</span> +
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {error && <p className="bg-red-500 text-white">{error}</p>}
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              {editingIndex !== null ? "Update" : "Create"} Category
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
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
      <div className=" overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                SL
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Image
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Name
              </th>

              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedCategories.map((category, index) => (
              <tr key={category._id}>
                <td className="px-6 py-4 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <img
                    src={category.image_url}
                    alt="Category"
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {category.name}
                </td>

                <td className="px-6 py-4 border-b border-gray-200">
                  <button
                    onClick={() => handleUpdate(index, category._id)}
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2 transform hover:scale-105 transition duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2 transform hover:scale-105 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {categories.length > 3 && !showAll && (
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

export default Category;
