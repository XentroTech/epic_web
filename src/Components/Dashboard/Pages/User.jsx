import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useActivateOrDeactivateUserMutation,
  useAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} from "../../../features/user/userApi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Fetch users from API
  const { data, isLoading, isError, error } = useAllUsersQuery({
    searchQuery: searchTerm,
    currentPage,
  });

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  // Handle role update
  const [
    updateUserRole,
    { isLoading: roleIsLoading, isError: roleIsError, error: roleError },
  ] = useUpdateUserRoleMutation();

  //handle role change
  const handleRoleChange = (userId, newRole) => {
    updateUserRole({ id: userId, role: newRole })
      .unwrap()
      .then((data) => {
        if (data.success) {
          toast.success(`Role is Successfully updated as ${newRole}`, {
            position: "top-right",
          });
        }
      })
      .catch((error) =>
        toast.error(roleError.data.message, { position: "top-right" })
      );
  };
  //handle delete user
  const [deleteUser] = useDeleteUserMutation();
  const handleDeleteUser = (user, id) => {
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
  // handle activate or deactivate user
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
      .catch((error) => {
        console.log(error);
        if (activationIsError) {
          toast.error(activationError.data.message, { position: "top-right" });
        }
      });
  };

  //filter for search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobileNo.includes(searchTerm)
  );

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="py-2">
        <h2 className="text-2xl font-bold leading-tight pb-4 text-green-600">
          User Management
        </h2>
      </div>

      <div className="relative w-full mb-4">
        <input
          type="text"
          placeholder="Search users by name, email or mobile no..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && (
        <p className="text-center p-4 bg-red-500 text-white">
          {error.data.message}
        </p>
      )}

      {!isLoading && !isError && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Update Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="odd:bg-white even:bg-gray-50 border-b"
                >
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {user.mobileNo}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.isActive
                          ? "text-green-800 bg-green-100"
                          : "text-red-800 bg-red-100"
                      }`}
                    >
                      {user.isActive ? "Active" : "Deactivated"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="border rounded-md p-1 "
                    >
                      {currentUser.role === "superadmin" ? (
                        <>
                          <option value="superadmin">Super Admin</option>
                          <option value="admin">Admin</option>
                          <option value="moderator">Moderator</option>
                          <option value="user">User</option>
                        </>
                      ) : (
                        <>
                          <option value="moderator">Moderator</option>
                          <option value="user">User</option>
                        </>
                      )}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* Action buttons for Deactivate/Activate, Delete, and View */}
                    <div className="flex gap-3 ">
                      <button
                        className="bg-cyan-500 text-white rounded-lg px-5 py-2 transform hover:scale-105 transition duration-300"
                        onClick={() =>
                          handleActiveOrDeactivateUser(user, user._id)
                        }
                      >
                        {user.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2 transform hover:scale-105 transition duration-300"
                        onClick={() => handleDeleteUser(user, user._id)}
                      >
                        Delete
                      </button>
                      <Link to={`/dashboard/user/profile/${user._id}`}>
                        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2 transform hover:scale-105 transition duration-300">
                          View
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
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
      )}
    </div>
  );
};

export default User;
