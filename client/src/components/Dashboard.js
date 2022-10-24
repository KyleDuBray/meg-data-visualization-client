import React, { useState } from "react";
import RegistrationForm from "./forms/RegistrationForm";
import LoginForm from "./forms/LoginForm";
import { useSelector } from "react-redux";

const Dashboard = () => {
  // Will come from authstate later to determine if user is currently logged in, and if so,
  // show user's dashboard. Otherwise, show login/register view.
  const user = useSelector((state) => state.auth.user);
  const [registerToggle, setRegisterToggle] = useState(false);

  return (
    <>
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          {user ? (
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          ) : registerToggle ? (
            <RegistrationForm />
          ) : (
            <LoginForm />
          )}
        </div>
        <div className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setRegisterToggle(!registerToggle)}
            type="button"
            className="text-black bg-white hover:bg-blue-200 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5"
          >
            {registerToggle ? "Already have an account?" : "Need to register?"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
