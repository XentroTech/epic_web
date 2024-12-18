import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetTransactionDetailsQuery,
  useGetUserQuery,
} from "../../../features/user/userApi";
import coverPic from "../../../assets/two.png";

const ViewUser = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetUserQuery(id);
  const user = data?.user || null;

  const { data: transactionData } = useGetTransactionDetailsQuery(id);
  const transaction = transactionData?.transactions || [];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {isLoading && <p>Loading...</p>}
      {isError && (
        <p className="text-center p-4 bg-red-500 text-white">
          {error?.data?.message || "Error fetching user data."}
        </p>
      )}

      {!isLoading && !isError && user && (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          {/* Cover Section */}
          <div className="relative w-full h-56">
            <img
              src={user.cover_pic || coverPic}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <img
                src={
                  user.profile_pic ||
                  "https://api.dicebear.com/9.x/notionists/svg"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="mt-16 px-6 pb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">@{user.username}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500">Mobile: {user.mobileNo}</p>
            <p className="text-gray-500">Address: {user.address || "N/A"}</p>
            <p className="text-gray-500">Country: {user.country || "N/A"}</p>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 pb-6">
            <StatCard
              title="Coins Purchased"
              value={transaction.coins.totalPrice || 0}
            />
            <StatCard
              title="Uploaded Images"
              value={user.uploaded_images.length || 0}
            />
            <StatCard
              title="Images Purchased"
              value={user.purchased_images.length || 0}
            />
            <StatCard
              title="Image revenue"
              value={transaction.images.totalPrice || 0}
            />
            <StatCard
              title="Image Space Purchased"
              value={transaction.space.totalPrice || 0}
            />
            <StatCard
              title="Total Withdrawn"
              value={`$${user.totalWithdraw || 0}`}
            />
          </div>

          {/* Admin Actions */}
          <div className="px-6 py-4 border-t">
            <h3 className="text-lg font-semibold text-gray-700">
              Admin Actions
            </h3>
            <div className="mt-4 flex justify-center space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                Edit User
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition">
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Stat Card Component for user stats
const StatCard = ({ title, value }) => {
  return (
    <div className="bg-gray-100 p-4 text-center rounded-lg shadow">
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-lg font-semibold text-gray-700">{value}</p>
    </div>
  );
};

export default ViewUser;
