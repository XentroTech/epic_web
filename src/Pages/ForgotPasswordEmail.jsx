// ForgotPasswordEmail.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../features/user/userApi";
import loginImg from "../assets/login.avif";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setResetEmail } from "../features/user/userAuthSlice";

const ForgotPasswordEmail = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const dispatch = useDispatch();
  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      const result = await forgotPassword({ email }).unwrap();
      toast.success(`An OTP sent to your email address please check!`, {
        position: "top-right",
      });
      // Navigate to OTP page after email is sent
      navigate("/verifyOtp");

      // Store email in state for reset password usage
      dispatch(setResetEmail(email));
    } catch (err) {
      toast.error(err.data.message, {
        position: "top-right",
      });
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
          onSubmit={handleSendEmail}
          className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg"
        >
          {isLoading && (
            <p className="text-center text-green-500">sending otp...</p>
          )}
          <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
            Forgot Password
          </h2>
          <label className="block text-gray-700 mb-2">Enter Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordEmail;
