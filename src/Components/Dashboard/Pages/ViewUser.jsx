import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../../features/user/userApi";
import coverPic from "../../../assets/two.png";

const ViewUser = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetUserQuery(id);
  const user = data?.user || null;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && (
        <p className="text-center p-4 bg-red-500 text-white">
          {error.data?.message || "Error fetching user data."}{" "}
          {/* Use optional chaining here too */}
        </p>
      )}

      {!isLoading && !isError && user && (
        <div className="flex flex-col items-center p-4 bg-gray-50 min-h-screen">
          <div className="relative w-full h-[400px]">
            {user.cover_pic ? (
              <img
                src={user.cover_pic}
                alt="Cover"
                className="object-cover w-full h-full rounded-lg shadow-md"
              />
            ) : (
              <img
                src={coverPic}
                alt="avatar"
                className="w-full h-full rounded-lg shadow-md"
              />
            )}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              {user.profile_pic ? (
                <img
                  src={user.profile_pic}
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <img
                  src="https://api.dicebear.com/9.x/notionists/svg"
                  alt="Profile"
                  className="w-24 h-24 object-cover bg-green-500 rounded-full border-4 border-white shadow-lg"
                />
              )}
            </div>
          </div>

          <div className="mt-16 text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500">Mobile: {user.mobileNo}</p>
          </div>

          <div className="mt-6 space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
              Edit Profile
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition">
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUser;
