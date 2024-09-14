import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";

const Navbar = () => {
  return (
    <nav className="header__navbar">
      <div className="header__logo">
        <Link to="/">
          <img src="/public/logo.webp" alt="Hellstar" />
        </Link>
      </div>
      <ul className="header__navbar--items">
        <li className="nav__item">
          <Link to="/" className="nav__link">
            Home
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/category/tees" className="nav__link">
            Tees
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/category/hoodies" className="nav__link">
            Hoodies
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/category/accessories" className="nav__link">
            Accessories
          </Link>
        </li>
      </ul>
      <CartWidget />
    </nav>
  );
};

export default Navbar;
