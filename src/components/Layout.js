import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  // A plain href="#main" would change the URL hash, which the hash router treats as a route.
  const skipToContent = (event) => {
    event.preventDefault();
    document.getElementById("main")?.focus();
  };

  return (
    <div className="site">
      <a className="skip-link" href="#main" onClick={skipToContent}>
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
