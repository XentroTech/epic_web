import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Components/Home";
import Login from "./Pages/Login";
import DashboardMain from "./Components/DashboardMain/DashboardMain";
import User from "./Components/Dashboard/Pages/User";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/dashboard/*" element={<DashboardMain />}>
            <Route path="user" element={<User />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
