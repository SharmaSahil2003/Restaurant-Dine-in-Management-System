import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css';

const Navbar = () => {
  return (
    <>
      <header className="header_section" style={{ zIndex: 1000, top: 0, position: 'absolute', left: 0, backgroundColor: 'black', width: '100%' }}>
        <div className="container">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <NavLink to="/" className="navbar-brand">
              <span>Yummy Town</span>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className=""> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link" activeClassName="active-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/menu" className="nav-link" activeClassName="active-link">
                    Menu
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link" activeClassName="active-link">
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/contact" className="nav-link" activeClassName="active-link">
                    Contact
                  </NavLink>
                </li>
              </ul>
              <div className="user_option">
                <NavLink to="/login" className="user_link">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </NavLink>
                <NavLink to="/Cart" className="user_link">
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i> {/* Add the cart icon */}
                </NavLink>
                <NavLink to="/menu" className="order_online">
                  Order
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
