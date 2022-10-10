import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";

/*<div className="bg-gradient-to-r from-primary-1 to-primary-2 w-screen h-screen flex">
      <Navbar />
  </div>*/
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
