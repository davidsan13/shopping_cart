import React from "react";
import github from "../assets/github.svg";

const Footer = () => (
  <footer className="site-footer">
    <p>Demo store for a portfolio project. No orders are placed.</p>
    <p>
      <span>Copyright © 2023 David San</span>
      <a href="https://www.github.com/davidsan13" className="site-footer__link">
        <img src={github} alt="" />
        GitHub
      </a>
    </p>
  </footer>
);

export default Footer;
