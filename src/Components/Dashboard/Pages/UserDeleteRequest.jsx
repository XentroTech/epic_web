import React from "react";
import {
  useApproveRequestMutation,
  useDeclineRequestMutation,
  useGetDeleteRequestsQuery,
} from "../../../features/user/userDeleteAccountRequestApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const { data, isLoading, isError, error, refetch } =
    useGetDeleteRequestsQuery();
  const requests = data?.requests || [];

  const [approveRequest] = useApproveRequestMutation();
  const [declineRequest] = useDeclineRequestMutation();

  // handle approve request
  const handleApproveRequest = async (id) => {
    try {
      await approveRequest(id).unwrap();
      toast.success(`Delete request has been approved`, {
        position: "top-right",
      });
      refetch();
    } catch (error) {
      toast.success(`${error.message}`, {
        position: "top-right",
      });
    }
  };

  // handle decline request
  const handleDeclineRequest = async (id) => {
    try {
      await declineRequest(id).unwrap();
      toast.success(`Request has been declined`, {
        position: "top-right",
      });
      refetch();
    } catch (error) {
      toast.success(`${error.message}`, {
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-8 py-8">
        <div className="py-2">
          <h2 className="text-2xl font-bold leading-tight pb-4 text-green-600">
            User Delete Requests
          </h2>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Date
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests?.map((user) => (
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
                        {user.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={
                          "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                        }
                      >
                        {
                          new Date(user.requested_at)
                            .toISOString()
                            .split("T")[0]
                        }
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {/* Action buttons for Deactivate/Activate, Delete, and View */}
                      <div className="flex gap-3 ">
                        <button
                          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2 transform hover:scale-105 transition duration-300"
                          onClick={() => handleApproveRequest(user._id)}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeclineRequest(user._id)}
                          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2 transform hover:scale-105 transition duration-300"
                        >
                          Decline
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
