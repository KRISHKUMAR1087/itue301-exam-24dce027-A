import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span>🏥 MedCare Plus</span>
        <span className="brand-badge">Portal</span>
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
            <span>📅</span> Book Visit
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
