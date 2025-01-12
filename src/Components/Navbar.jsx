import React, { useState } from "react";
import { FiBarChart, FiBookOpen, FiHome, FiLogOut, FiServer, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../features/user/userApi";
import { userLoggedOut } from "../features/user/userAuthSlice";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await logout().unwrap();
      dispatch(userLoggedOut());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/epic_coin.png"
            className="h-8"
            alt="Epic Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Epic
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded-full overflow-hidden focus:outline-none"
              >
                {user.profile_pic ? (
                  <img
                    src={user.profile_pic}
                    alt="User"
                    className="w-8 h-8 rounded-full shrink-0 bg-theme shadow"
                  />
                ) : (
                  <img
                    src="https://api.dicebear.com/9.x/notionists/svg"
                    alt="User"
                    className="w-8 h-8 rounded-full shrink-0 bg-theme shadow"
                  />
                )}
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
                  <ul className="py-2">
                    {user?.role &&
                      ["superadmin", "admin", "moderator"].includes(
                        user.role
                      ) && (
                        <li>
                          <Link
                            to="/dashboard"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            <FiBarChart className="inline mr-1" /> Dashboard
                          </Link>
                        </li>
                      )}
                    <li>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        <FiHome className="inline mr-1" /> Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        <FiBookOpen className="inline mr-1" /> About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/service"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        <FiServer className="inline mr-1" /> Service
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        <FiUser className="inline mr-1" /> Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                      >
                        <FiLogOut className="inline mr-1" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        ></div>
      </div>
    </nav>
  );
}

