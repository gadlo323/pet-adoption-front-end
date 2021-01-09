import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="logo">
          <h1 className="logo-name">Isayas Gadlo &copy; 2021</h1>
          <img src="./dog.png" alt="" />
        </div>
        <ul className="links">
          <li>
            <a href="https://github.com/gadlo323" target="_blank">
              <i className="fa fa-github "></i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/israelgadalo" target="_blank">
              <i className="fa fa-linkedin"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
