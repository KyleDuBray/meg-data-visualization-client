import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  return (
    <div className="h-screen mt-20 mx-auto max-w-2xl">
      <h1 className="text-5xl font-bold tracking-tight text-gray-900">
        Welcome to the MEG Data Visualization Client
      </h1>
      <div className="flex mt-5 space-x-10 justify-around w-6/12">
        <Link to="/login" className="hover:border-b-2 hover:border-gray-800">
          <h2 className="text-2xl">Login</h2>
        </Link>
        <Link to="/register" className="hover:border-b-2 hover:border-gray-800">
          <h2 className="text-2xl ">Register</h2>
        </Link>
      </div>
    </div>
  );
};

export default Public;
