import React, { useState } from "react";
import signupImg from "../assets/register.avif";
import { useSignupMutation } from "../features/user/userApi";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    mobileNo: "",
  });
  const navigate = useNavigate();

  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(signupData)
        .unwrap()
        .then((data) => {
          if (data.success) {
            toast.success(`SignUp successful!`, {
              position: "top-right",
            });
            navigate("/login");
          }
        })
        .catch((error) =>
          toast.error(error?.data?.message, { position: "top-right" })
        );
    } catch (err) {
      console.error(err);
      toast.error(`${error?.data?.message || err.message}`, {
        position: top - right,
      });
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex flex-1 bg-cover bg-center">
        <img
          src={signupImg}
          alt="register"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center flex-1 p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg h-[680px] space-y-4 bg-white p-10 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-green-600 text-center">
            Signup
          </h2>
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={signupData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={signupData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={signupData.email}
              onChange={handleChange}
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
              name="password"
              id="password"
              value={signupData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="mobileNo"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobileNo"
              id="mobileNo"
              value={signupData.mobile}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded transition p-3 ${
              isLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } text-white`}
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Signup"}
          </button>
          {isError && (
            <p className="text-red-500 text-center">
              {error?.data?.message || "Signup failed"}
            </p>
          )}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
