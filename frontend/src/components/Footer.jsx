import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        {/* Top Grid: Brand Mission, Quick Links, Specialties, Contact */}
        <div className="footer-grid">
          {/* Column 1: Hospital Brand & Emergency Hotline */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span>🏥 MedCare</span>
              <span className="brand-badge">Plus</span>
            </div>
            <p className="footer-description">
              Advanced Healthcare & Appointment Management Portal. Empowering patients with instant specialist booking, real-time status monitoring, and secure MongoDB data storage.
            </p>
            <div className="emergency-badge">
              <span>🚑 Emergency Hotline:</span> <strong>+1 (800) MED-CARE</strong>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">📍 Portal Navigation</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">📋 Scheduled Appointments</Link>
              </li>
              <li>
                <Link to="/doctors">👨‍⚕️ Medical Specialists</Link>
              </li>
              <li>
                <Link to="/booking">📅 Book New Appointment</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Medical Specialties */}
          <div className="footer-col">
            <h4 className="footer-col-title">🔬 Medical Specialties</h4>
            <ul className="footer-links">
              <li><span>🩺 Cardiology</span></li>
              <li><span>🧠 Neurology & Brain Care</span></li>
              <li><span>👶 Pediatrics & Child Health</span></li>
              <li><span>🧴 Dermatology & Skin</span></li>
              <li><span>🦴 Orthopedics & Joints</span></li>
            </ul>
          </div>

          {/* Column 4: System Specs & Blood Groups */}
          <div className="footer-col">
            <h4 className="footer-col-title">🩸 Mongoose Standards</h4>
            <p className="footer-spec-text">
              Supporting all 8 Mongoose Patient Blood Group Enums:
            </p>
            <div className="blood-group-pills">
              <span className="bg-pill">A+</span>
              <span className="bg-pill">A-</span>
              <span className="bg-pill">B+</span>
              <span className="bg-pill">B-</span>
              <span className="bg-pill">AB+</span>
              <span className="bg-pill">AB-</span>
              <span className="bg-pill">O+</span>
              <span className="bg-pill">O-</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Student Roll Attribution */}
        <div className="footer-bottom-bar">
          <p>© 2026 MedCare Plus Hospital Portal. All rights reserved.</p>
          <div className="footer-attribution">
            <span>ITUE301 Examination</span>
            <span className="roll-badge">Roll: 24dce027-A</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
