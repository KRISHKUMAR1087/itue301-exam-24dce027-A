import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // Close floating menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Close floating menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="navbar-wrapper" ref={navRef}>
      <nav className="navbar">
        {/* Left: Brand Logo */}
        <NavLink to="/" className="navbar-brand">
          <span>🏥 MedCare</span>
          <span className="brand-badge">Plus</span>
        </NavLink>

        {/* Center: iOS Floating Menu Trigger Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className={`menu-trigger-btn ${menuOpen ? 'active' : ''}`}
          aria-expanded={menuOpen}
        >
          <span>☰</span> Menu {menuOpen ? '▲' : '▼'}
        </button>

        {/* Right: Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Floating iOS Dropdown Popover Menu */}
        {menuOpen && (
          <div className="floating-ios-menu">
            <ul className="ios-menu-list">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? 'ios-menu-item active' : 'ios-menu-item')}
                >
                  <span className="menu-icon">📋</span> Scheduled Appointments
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/doctors"
                  className={({ isActive }) => (isActive ? 'ios-menu-item active' : 'ios-menu-item')}
                >
                  <span className="menu-icon">👨‍⚕️</span> Medical Specialists
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/booking"
                  className={({ isActive }) => (isActive ? 'ios-menu-item active' : 'ios-menu-item')}
                >
                  <span className="menu-icon">📅</span> Book Consultation
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
