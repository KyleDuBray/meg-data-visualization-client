import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setTokenFromLocal } from "../slices/authSlice";
import { useEffect } from "react";

import { useGetTokenAuthStatusMutation } from "../slices/authApi";

function App() {
  const dispatch = useDispatch();
  const [getTokenStatus, isLoading] = useGetTokenAuthStatusMutation();

  const token = useSelector((state) => state.auth.token);

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

        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
