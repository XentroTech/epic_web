import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from "../features/user/userApi";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { userLoggedIn } from "../features/user/userAuthSlice";

const UserProfile = () => {
  const { user: authUser } = useSelector((state) => state.auth);
  const {
    data,
    isLoading: isUserLoading,
    error: userError,
    refetch,
  } = useGetUserQuery(authUser?._id);
  const user = data?.user;
  const [updateUserProfile, { isLoading, error }] =
    useUpdateUserProfileMutation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    mobileNo: "",
    country: "",
    profile_pic: null,
    cover_pic: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        mobileNo: user.mobileNo || "",
        country: user.country || "",
        profile_pic: user.profile_pic || null,
        cover_pic: user.cover_pic || null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      console.log(`File selected for ${name}:`, files[0]);
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      console.log(`${name} input is empty.`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Append all form data, including files
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      updateUserProfile(data).unwrap();
      toast.success(`Profile Updated Successfully!`, {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(`${error.message}`, {
        position: "top-right",
      });
    }
  };
  {
    isUserLoading && <p>Loading...</p>;
  }
  {
    userError && <p>Error: {userError.message}</p>;
  }
  return (
    <div className="w-full max-w-4xl mx-auto p-4 mt-20">
      {/* Cover Picture */}
      <div className="relative w-full h-48 bg-gray-200 rounded-md overflow-hidden">
        <img
          src={user?.cover_pic || "/default-cover.jpg"}
          alt="Cover"
          className="object-cover w-full h-full"
        />
        <input
          type="file"
          name="cover_pic"
          onChange={handleFileChange}
          accept="image/*"
          className="absolute top-2 right-2 hidden"
          id="coverPicInput"
        />
        <label
          htmlFor="coverPicInput"
          className="absolute top-2 right-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-md cursor-pointer"
        >
          Update Cover
        </label>
      </div>

      {/* Profile Picture */}
      <div className="relative w-24 h-24 mx-auto -mt-12 border-4 border-white rounded-full overflow-hidden">
        <img
          src={user?.profile_pic || "/default-profile.jpg"}
          alt="Profile"
          className="object-cover w-full h-full"
        />
        <input
          type="file"
          name="profile_pic"
          onChange={handleFileChange}
          accept="image/*"
          className="absolute bottom-0 right-0 "
          id="profilePicInput"
        />
        <label
          htmlFor="profilePicInput"
          className="absolute bottom-0 right-0 px-2 py-1 text-xs bg-blue-500 text-white rounded-md cursor-pointer"
        >
          Update Profile
        </label>
      </div>

      {/* User Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData?.name || ""}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData?.username || ""}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData?.email || ""}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData?.password || ""}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600">
            Mobile No
          </label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600">Country</label>
          <input
            type="text"
            name="country"
            value={formData?.country || ""}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 text-white bg-blue-600 rounded-md"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
        {error && <p className="text-red-500 text-sm">{error.message}</p>}{" "}
        {/* Display error if any */}
      </form>
    </div>
  );
};

export default UserProfile;
