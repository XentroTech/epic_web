// EnterOtp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../features/user/userApi";
import loginImg from "../assets/login.avif";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const [verifyOtp] = useVerifyOtpMutation();

  const handleVerifyOtp = async (e) => {
    try {
      e.preventDefault();
      const result = await verifyOtp({ otp }).unwrap();
      toast.success(`OTP Verified Successfully!`, {
        position: "top-right",
      });
      // Navigate to reset password page after OTP verification
      navigate("/resetPassword");
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
          onSubmit={handleVerifyOtp}
          className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
            Enter OTP
          </h2>
          <label className="block text-gray-700 mb-2">OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Verify
          </button>
          <div className="flex justify-end pt-1 text-green-600">
            <a href="/forgotPassword">resent OTP</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
