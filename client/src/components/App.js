import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { authenticate, setCredentials } from "../slices/authSlice";
import { useEffect } from "react";

import { useGetTokenAuthStatusQuery } from "../slices/authApi";

/*<div className="bg-gradient-to-r from-primary-1 to-primary-2 w-screen h-screen flex">
      <Navbar />
  </div>*/

function App() {
  const dispatch = useDispatch();
  const { data } = useGetTokenAuthStatusQuery();

  useEffect(() => {
    console.log(data);
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data]);

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
