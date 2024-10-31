import GameManagement from "../Pages/GameManagement";
import ImageDetail from "../Pages/ImageDetail";
import Images from "../Pages/Images";
import User from "../Pages/User";
import ViewUser from "../Pages/ViewUser";
import Grid from "./Grid";
import TopBar from "./TopBar";
import { Route, Routes } from "react-router-dom";

function Main() {
  return (
    <div>
      <TopBar />

      <Routes>
        <Route path="/" element={<Grid />} />
        <Route path="user" element={<User />} />
        <Route path="images" element={<Images />} />
        <Route path="games" element={<GameManagement />} />
        <Route path="user/profile/:id" element={<ViewUser />} />
        <Route path="user/imageDetail/:id" element={<ImageDetail />} />
      </Routes>
    </div>
  );
}

export default Main;
