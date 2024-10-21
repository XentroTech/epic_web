import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AppInfo from "./AppInfo";
import Features from "./Features";
import Test from "./test";
import Banner from "./Banner";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Features />
      <AppInfo />
      <Footer />
    </div>
  );
}
