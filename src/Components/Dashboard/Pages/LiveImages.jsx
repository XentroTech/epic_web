import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteImageMutation,
  useGetLiveImagesQuery,
} from "../../../features/images/imageApi";

const User = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Fetch users from API
  const { data, isLoading, isError, error, refetch } = useGetLiveImagesQuery({
    searchQuery: searchTerm,
    currentPage,
  });

  const images = data?.images || [];
  const totalPages = data?.totalPages || 1;

  //handle delete Image
  const [deleteUser] = useDeleteImageMutation();
  const handleDeleteUser = (id) => {
    deleteUser(id)
      .unwrap()
      .then((data) => {
        refetch();
        if (data.success) {
          toast.success(`Image deleted successfully!`, {
            position: "top-right",
          });
        }
      })
      .catch((error) =>
        toast.error(error.data.message, { position: "top-right" })
      );
  };

  //filter for search
  const filteredImages = images.filter(
    (image) =>
      image.owner &&
      ((image.ownerDetails.username &&
        image.ownerDetails.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
        (image.ownerDetails.email &&
          image.ownerDetails.email
            .toLowerCase()
            .includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="py-2">
        <h3 className="text-xl font-semibold leading-tight pb-4 text-slate-600 text-left">
          Live Images
        </h3>
      </div>

      <div className="relative w-full mb-4">
        <input
          type="text"
          placeholder="Search images by name, email "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sold
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Likes
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan="5" className="text-center py-4 ">
                  {error?.message}
                </td>
              </tr>
            ) : filteredImages.length == 0 ? (
              <p className="text-red-600 text-center">No Image Found</p>
            ) : filteredImages.length > 0 ? (
              filteredImages.map((image) => (
                <tr
                  key={image._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      <img
                        src={image.image_url}
                        alt="image"
                        width={50}
                        height={50}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {image.ownerDetails.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">
                      {image.ownerDetails.email}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1  inline-flex text-xs leading-5 font-semibold rounded-full  ${
                        image.isLive
                          ? "text-green-800 bg-green-100"
                          : "text-red-800 bg-red-100"
                      } `}
                    >
                      {image.isLive ? "Live" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">
                      {image.sold_count}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">
                      {image.likesCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-3">
                      <button
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2 transform hover:scale-105 transition duration-300"
                        onClick={() => handleDeleteUser(image._id)}
                      >
                        Delete
                      </button>
                      <Link to={`/dashboard/user/imageDetail/${image._id}`}>
                        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2 transform hover:scale-105 transition duration-300">
                          View
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No images available.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination controls */}
        <div className="flex justify-center mt-4 p-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50 cursor-pinter"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="p-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50 cursor-pointer"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
