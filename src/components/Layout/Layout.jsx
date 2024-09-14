import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="Main">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
