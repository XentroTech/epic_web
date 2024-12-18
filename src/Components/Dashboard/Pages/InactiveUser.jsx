import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useActivateOrDeactivateUserMutation,
  useAllUsersQuery,
  useDeleteUserMutation,
  useGetInactiveUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../features/user/userApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const InactiveUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("BD");
  const { user: currentUser } = useSelector((state) => state.auth);

  const { data, isLoading, isError, error } = useAllUsersQuery({
    searchQuery: searchTerm,
    currentPage,
    role,
    country,
  });

  // const { data, isLoading, isError, error } = useGetInactiveUsersQuery();

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  const [
    activateOrDeactivateUser,
    { isError: activationIsError, error: activationError },
  ] = useActivateOrDeactivateUserMutation();

  const handleActiveOrDeactivateUser = (user, id) => {
    activateOrDeactivateUser(id)
      .unwrap()
      .then((data) => {
        if (data.success) {
          toast.success(
            `User ${user.isActive ? "deactivated" : "activated"} successfully!`,
            {
              position: "top-right",
            }
          );
        }
      })
      .catch(() => {
        if (activationIsError) {
          toast.error(activationError.data.message, { position: "top-right" });
        }
      });
  };

  // Handle user delete
  const [deleteUser] = useDeleteUserMutation();
  const handleDeleteUser = (id) => {
    deleteUser(id)
      .unwrap()
      .then((data) => {
        if (data.success) {
          toast.success(`User deleted successfully!`, {
            position: "top-right",
          });
        }
      })
      .catch((error) =>
        toast.error(error.data.message, { position: "top-right" })
      );
  };

  const filteredUsers = users
    .filter((user) => user.isActive === false)
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobileNo.includes(searchTerm)
    );

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="py-2">
        <h2 className="text-2xl font-bold leading-tight pb-4 text-red-600">
          Inactive Users
        </h2>
        <h2 className="text-sm font-bold leading-tight pb-4 text-gray-600">
          Total Inactive Users: <span>({filteredUsers.length})</span>
        </h2>
      </div>

      <div className="relative w-full mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search inactive users by name, email, or mobile no..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="lg:w-2/3 md:w-2/4 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-400"
        />
        {currentUser?.role === "superadmin" ? (
          <div className="div">
            <label htmlFor="country">Country: </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border rounded-md p-1 w-[300px] h-[50px] focus:outline-none focus:ring focus:border-green-400"
            >
              <option value="all">All</option>
              <option value="BD">Bangladesh</option>
              <option value="MY">Malaysia</option>
            </select>
          </div>
        ) : (
          ""
        )}
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && (
        <p className="text-center p-4 bg-red-500 text-white">
          {error?.data?.message}
        </p>
      )}

      {!isLoading && !isError && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3"></th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Mobile No</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="odd:bg-white even:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.profile_pic ? (
                        <img
                          src={user.profile_pic}
                          alt="avatar"
                          className="size-8 rounded-full shrink-0 bg-green-500 shadow"
                        />
                      ) : (
                        <img
                          src="https://api.dicebear.com/9.x/notionists/svg"
                          alt="avatar"
                          className="size-8 rounded-full shrink-0 bg-green-500 shadow"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.mobileNo}</td>
                  <td className="px-6 py-4">
                    {new Date(user.inActiveDate).toISOString().split("T")[0]}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      className="text-white bg-gradient-to-r from-cyan-500 via-blue-cyan to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2 transform hover:scale-105 transition duration-300"
                      onClick={() =>
                        handleActiveOrDeactivateUser(user, user._id)
                      }
                    >
                      Activate
                    </button>
                    <button
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2 transform hover:scale-105 transition duration-300"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-center mt-4 p-4">
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="p-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InactiveUsers;
