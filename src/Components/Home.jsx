import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AppInfo from "./AppInfo";
import Features from "./Features";
import Banner from "./Banner";
import Sections from "./Sections";
import Contact from "./Contact";
// import Sections from "./Sections";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Sections />
      <Features />
      <AppInfo />
      <Contact />
      <Footer />
    </div>
  );
}
