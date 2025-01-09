import DashboardWelcome from "../Pages/DashboardWelcome";
import Finance from "../Pages/Finance";
import GameManagement from "../Pages/GameManagement";
import ImageDetail from "../Pages/ImageDetail";
import Images from "../Pages/Images";
import Notification from "../Pages/Notifications";
import SupportAndContact from "../Pages/SupportAndContact";
import User from "../Pages/User";
import UserManagement from "../Pages/UserManagement";
import ViewUser from "../Pages/ViewUser";
import Grid from "./Grid";
import TopBar from "./TopBar";
import { Route, Routes } from "react-router-dom";

function Main() {
  return (
    <div>
      <TopBar />
      <Routes>
        <Route path="/revenue" element={<Grid />} />
        <Route path="user" element={<UserManagement />} />
        <Route path="images" element={<Images />} />
        <Route path="games" element={<GameManagement />} />
        <Route path="user/profile/:id" element={<ViewUser />} />
        <Route path="user/imageDetail/:id" element={<ImageDetail />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/support" element={<SupportAndContact />} />
        <Route path="/" element={<DashboardWelcome />} />
      </Routes>
    </div>
  );
}

export default Main;
