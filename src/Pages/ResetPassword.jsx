import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../features/user/userApi";
import loginImg from "../assets/login.avif";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [restPassword, { error: resetError }] = useResetPasswordMutation();
  const { resetEmail } = useSelector((state) => state.auth);
  const [error, setError] = useState("");
  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Password Not Matched!");
        return;
      }
      const result = await restPassword({
        email: resetEmail,
        password,
      }).unwrap();
      toast.success(`Password Reset Successfully!`, { position: "top-right" });
      navigate("/login");
    } catch (err) {
      toast.error(err.data.message, { position: "top-right" });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left side image */}
      <div className="hidden lg:flex flex-1 bg-cover bg-center">
        <img src={loginImg} alt="Login" />
      </div>
      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <form
          onSubmit={handleResetPassword}
          className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
            Reset Password
          </h2>
          {error && (
            <div className="bg-red-100 text-red-500 p-3 rounded text-center">
              {error}
            </div>
          )}
          <label className="block text-gray-700 mb-2">New Password:</label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <label className="block text-gray-700 mb-2">Confirm Password:</label>
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
