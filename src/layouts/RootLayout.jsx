import React from "react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex flex-col h-screen ">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
