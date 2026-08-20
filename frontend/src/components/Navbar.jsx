import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        {/* Left: Brand Logo */}
        <NavLink to="/" className="navbar-brand">
          <span>🏥 MedCare</span>
          <span className="brand-badge">Plus</span>
        </NavLink>

        {/* Center: 3 Page Navigation Buttons */}
        <ul className="navbar-links centered-links">
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

        {/* Right: Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
