import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from './images/Icon.PNG';
const Header = () => (
  <header>
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">
      <img src={Icon} alt="Your Company Icon" width="50" height="50" className="d-inline-block align-top" />
        {' '}
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/listHus">
              List House
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/husTabell">
              Houses
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/kundeTabell">
              Customers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/eierTabell">
              Owners
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/ordreTabell">
              Orders
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/personTabell">
              Persons
            </NavLink>
          </li>
        </ul>
        <div className="d-flex">
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </div>
      </div>
    </div>
  </nav>
  </header>
);

export default Header;