import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <NavLink to="/" className="navbar-brand">
          <span>🏥 MedCare</span>
          <span className="brand-badge">Plus</span>
        </NavLink>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <span>📋</span> Appointments
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctors" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <span>👨‍⚕️</span> Doctors
            </NavLink>
          </li>
          <li>
            <NavLink to="/booking" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <span>📅</span> Book
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
