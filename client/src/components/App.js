import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { authenticate } from "../slices/authSlice";
import { useEffect } from "react";

/*<div className="bg-gradient-to-r from-primary-1 to-primary-2 w-screen h-screen flex">
      <Navbar />
  </div>*/

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate());
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
