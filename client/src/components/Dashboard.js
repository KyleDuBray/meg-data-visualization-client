import React from "react";
import RegistrationForm from "./forms/RegistrationForm";
import { useSelector } from "react-redux";

const Dashboard = () => {
  // Will come from authstate later to determine if user is currently logged in, and if so,
  // show user's dashboard. Otherwise, show login/register view.
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          {isAuthenticated ? (
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          ) : (
            <RegistrationForm />
          )}
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* renderExampleItems() */}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
