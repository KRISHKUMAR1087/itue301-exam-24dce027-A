import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="medical-footer">
      <div className="footer-content">
        <div className="footer-brand">
          🏥 MedCare Plus Hospital System
        </div>
        <div className="footer-links">
          <Link to="/">Appointments</Link>
          <Link to="/doctors">Our Doctors</Link>
          <Link to="/booking">Book Consultation</Link>
        </div>
        <div>
          © {new Date().getFullYear()} MedCare Plus. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
