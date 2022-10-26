import React from "react";
import Dashboard from "./Dashboard";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Navbar from "./Navbar";
import Public from "./Public";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setTokenFromLocal } from "../slices/authSlice";
import { useEffect } from "react";

import { useGetTokenAuthStatusMutation } from "../slices/authApi";
import LoginForm from "./forms/LoginForm";
import RegistrationForm from "./forms/RegistrationForm";
import { AuthOutlet } from "../utilities/AuthOutlet";
import Layout from "./Layout";

function App() {
  const dispatch = useDispatch();
  const [getTokenStatus, isLoading] = useGetTokenAuthStatusMutation();

  useEffect(() => {
    dispatch(setTokenFromLocal());
    const getTokenStatusFunc = async () => {
      try {
        const res = await getTokenStatus();
        console.log(res);
        dispatch(setCredentials(res.data));
      } catch {
        console.log("Error validating token");
      }
    };
    getTokenStatusFunc();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <div className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route index element={<Public />} />
                <Route path="login" element={<LoginForm />}></Route>
                <Route path="register" element={<RegistrationForm />}></Route>

                {/* protected routes */}
                <Route element={<AuthOutlet />}>
                  <Route path="dashboard" element={<Dashboard />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;

/*

{user && <Navigate to="/dashboard" replace={true} />}
            {!user &&
              (registerToggle ? (
                <Navigate to="/register" replace={true} />
              ) : (
                <Navigate to="/login" replace={true} />
              )) && (
                <div className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8">
                  <button
                    onClick={() => setRegisterToggle(!registerToggle)}
                    type="button"
                    className="text-black bg-white hover:bg-blue-200 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5"
                  >
                    {registerToggle
                      ? "Already have an account?"
                      : "Need to register?"}
                  </button>
                </div>
              )}

*/
