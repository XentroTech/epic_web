import React, { useState } from "react";
import loginImg from "../assets/login.avif";
import { useLoginUserMutation } from "../features/user/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginUser, { isLoading, isError, error: loginError }] =
    useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const result = await loginUser(userData).unwrap();
      console.log("Login successful", result);
      // Redirect to home page after login success
      navigate("/");
      toast.success("Login Successfull!", { position: "top-right" });
    } catch (err) {
      const newError =
        err.data?.message || "Too many login request please try later";
      setError(newError);
      console.error("Failed to login", err);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex flex-1 bg-cover bg-center">
        <img src={loginImg} alt="Login" />
      </div>

      <div className="flex items-center justify-center flex-1 p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg h-[500px] space-y-4 bg-white p-10 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-green-600 text-center">
            Login
          </h2>
          {error && (
            <div className="bg-red-100 text-red-500 p-3 rounded text-center">
              {error}
            </div>
          )}
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
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
          <p className="text-sm text-right">
            <a
              href="/forgotPassword"
              className="text-green-600 hover:underline"
            >
              Forgot Password
            </a>
          </p>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-green-600 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
