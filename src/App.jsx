import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Pages/Login";
import DashboardMain from "./Components/DashboardMain/DashboardMain";
import SignUp from "./Pages/SignUp";
import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar";
import ForgotPasswordEmail from "./Pages/ForgotPasswordEmail";
import VerifyOtp from "./Pages/VerifyOtp";
import ResetPassword from "./Pages/ResetPassword";
import UserProfile from "./Pages/UserProfile";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsOfUse from "./Components/TermsOfUse";

function App() {
  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<DashboardMain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgotPasswordEmail />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
