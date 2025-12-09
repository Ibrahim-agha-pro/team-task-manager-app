import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-extrabold tracking-wide">
          🚀 Team Manager
        </h1>
        <div className="flex gap-6 text-lg items-center">
          <Link
            to="/"
            className="hover:text-yellow-300 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/teamlist"
            className="hover:text-yellow-300 transition-colors font-medium"
          >
            Team Members
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
