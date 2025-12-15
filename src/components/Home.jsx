import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="p-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Welcome to Team Manager</h2>
        <p className="text-gray-600 mb-6">
          Manage team members and their tasks quickly. Use the Team Members page
          to add, edit, or remove members and tasks.
        </p>
        <Link
          to="/teamlist"
          className="inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Go to Team Members
        </Link>
      </div>
    </div>
  );
};

export default Home;
