import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="medical-footer">
      <div className="footer-container">
        {/* Brand & About */}
        <div className="footer-section brand-section">
          <div className="footer-brand-title">
            🏥 MedCare <span>Plus</span>
          </div>
          <p className="footer-description">
            Providing compassionate, world-class healthcare, specialist consultations, and emergency patient services.
          </p>
        </div>

        {/* Quick Navigation Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-menu">
            <li>
              <Link to="/">📋 Scheduled Appointments</Link>
            </li>
            <li>
              <Link to="/doctors">👨‍⚕️ Medical Specialists</Link>
            </li>
            <li>
              <Link to="/booking">📅 Book Consultation</Link>
            </li>
          </ul>
        </div>

        {/* Contact & Emergency Info */}
        <div className="footer-section">
          <h4 className="footer-heading">Emergency & OPD</h4>
          <div className="footer-info-item highlight">
            🚨 <strong>24/7 Helpline:</strong> +1 (800) 555-6332
          </div>
          <div className="footer-info-item">
            ⏰ <strong>OPD Hours:</strong> Mon - Sat: 8:00 AM - 8:00 PM
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div>
          © {new Date().getFullYear()} MedCare Plus Hospital System. All Rights Reserved.
        </div>
        <div className="footer-legal-links">
          <a href="#privacy">Privacy Policy</a>
          <span>•</span>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
