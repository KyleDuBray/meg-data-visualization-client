import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import setAuthToken from "../utilities/setAuthToken";

import Navbar from "./Navbar";

/*<div className="bg-gradient-to-r from-primary-1 to-primary-2 w-screen h-screen flex">
      <Navbar />
  </div>*/

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
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
