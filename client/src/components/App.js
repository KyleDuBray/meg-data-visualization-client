import React from "react";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";
import Public from "./Public";
import { useDispatch } from "react-redux";
import { setCredentials, setTokenFromLocal } from "../slices/authSlice";
import { useEffect } from "react";

import { useGetTokenAuthStatusMutation } from "../slices/authApi";
import LoginForm from "./forms/LoginForm";
import RegistrationForm from "./forms/RegistrationForm";
import { AuthOutlet } from "../utilities/AuthOutlet";
import Layout from "./Layout";
import Project from "./projects";
import Data from "./data";

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
        <div className="bg-gray-200 h-screen flex justify-center">
          <div className="h-screen w-full flex justify-center">
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route index element={<Public />} />
                <Route path="login" element={<LoginForm />}></Route>
                <Route path="register" element={<RegistrationForm />}></Route>
              </Route>

              {/* protected routes */}
              <Route element={<AuthOutlet />}>
                <Route path="/dashboard/*" element={<Dashboard />}></Route>
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
