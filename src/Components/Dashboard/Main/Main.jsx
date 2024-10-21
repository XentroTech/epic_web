import GameManagement from "../Pages/GameManagement";
import Images from "../Pages/Images";
import User from "../Pages/User";
import Grid from "./Grid";
import TopBar from "./TopBar";
import { Route, Routes } from "react-router-dom";

function Main() {
  return (
    <div className>
      <TopBar />

      <Routes>
        <Route path="main" element={<Grid />} />
        <Route path="user" element={<User />} />
        <Route path="images" element={<Images />} />
        <Route path="games" element={<GameManagement />} />
      </Routes>
    </div>
  );
}

export default Main;
