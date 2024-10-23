import React, { useState } from "react";
import loginImg from "../assets/login.avif";
import { useLoginUserMutation } from "../features/user/userApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const result = await loginUser(userData).unwrap();
      console.log("Login successful", result);
      // Redirect to home page after login success
      navigate("/");
    } catch (err) {
      if (err.originalStatus === 429) {
        setError("Too many login request, please try again later.");
      }
      console.error("Failed to login", err);
      setError("Invalid email or password. Please try again.");
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
          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <p className="text-sm text-right">
            <a href="#" className="text-green-600 hover:underline">
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
