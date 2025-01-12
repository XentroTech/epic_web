import React from "react";
import { Link } from "react-router-dom";
import logo1 from "../assets/logo1.png";
export default function Footer() {
  return (
    <footer className="px-6 sm:px-8 md:px-12 xl:px-24 bg-gray-100">
      <div className=" px-6 py-8 ">
        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 justify-center  mx-auto">
          <div className="w-full mb-6 md:mb-0">
            <div className="flex flex-col justify-center items-center">
              <img src={logo1} className="h-20" alt="Logo" />
              <h2 className="text-gray-700 text-lg font-bold mb-4 text-[#016655]">
                Epic
              </h2>
            </div>
            <p className="text-gray-600">
              Find and download free images for your projects.
            </p>
          </div>
          <div className="w-full  mb-6 md:mb-0">
            <h3 className="text-gray-700 font-bold mb-2 text-[#016655]">
              Quick Links
            </h3>
            <nav className="list-none mb-10">
              <li className="mt-3">
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Privacy and Policy
                </Link>
              </li>
              <li className="mt-3">
                <Link to="/terms" className="text-gray-600 hover:text-gray-800">
                  Terms Of Use
                </Link>
              </li>
              <li className="mt-3">
                <Link to="/epic" className="text-gray-600 hover:text-gray-800">
                  What is Epic
                </Link>
              </li>
              <li className="mt-3">
                <Link to="/faq" className="text-gray-600 hover:text-gray-800">
                  FAQ
                </Link>
              </li>
              <li className="mt-3">
                <Link to="/tips" className="text-gray-600 hover:text-gray-800">
                  Tips & Tricks
                </Link>
              </li>
            </nav>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-gray-700 font-bold mb-2 text-[#016655]">
              Quick Links
            </h3>
            <nav className="list-none mb-10">
              <li className="mt-3">
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Privacy and Policy
                </Link>
              </li>
              <li className="mt-3">
                <Link to="/terms" className="text-gray-600 hover:text-gray-800">
                  Terms Of Use
                </Link>
              </li>
              <li className="mt-3">
                <Link to="/epic" className="text-gray-600 hover:text-gray-800">
                  What is Epic
                </Link>
              </li>
              <li className="mt-3">
                <Link to="/faq" className="text-gray-600 hover:text-gray-800">
                  FAQ
                </Link>
              </li>
              <li className="mt-3">
                <Link to="/tips" className="text-gray-600 hover:text-gray-800">
                  Tips & Tricks
                </Link>
              </li>
            </nav>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-gray-700 font-bold mb-2 text-[#016655]">
              Follow Us
            </h3>
            <div className="flex mt-4">
              <a href="#" className="mr-6 text-gray-600">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="mr-6 text-gray-600">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a href="#" className="mr-6 text-gray-600">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 py-4 mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2023 Epic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
