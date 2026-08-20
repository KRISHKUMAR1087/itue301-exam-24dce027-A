import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        {/* Animated Medical Computer on IV Drip Stage */}
        <div className="medical-action-stage">
          <svg
            className="medical-computer-svg"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* IV Drip Stand & Bag */}
            <path d="M40 30 V170 M40 30 H60 M60 30 V45" stroke="#007aff" strokeWidth="4" strokeLinecap="round" />
            <rect x="52" y="45" width="16" height="28" rx="4" fill="#007aff" fillOpacity="0.2" stroke="#007aff" strokeWidth="3" />
            <circle className="iv-drip-drop" cx="60" cy="80" r="3" fill="#007aff" />

            {/* Medical Computer Monitor */}
            <rect x="85" y="55" width="90" height="70" rx="10" fill="#ffffff" stroke="#1d1d1f" strokeWidth="5" />
            <rect x="93" y="63" width="74" height="54" rx="6" fill="#1c1c1e" />

            {/* Animated Heartbeat ECG Line on Monitor */}
            <path
              className="monitor-ecg-wave"
              d="M97 90 H115 L121 75 L128 105 L135 82 L141 93 L146 90 H163"
              stroke="#34c759"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Doctor Stethoscope Line Connecting IV to Monitor */}
            <path
              className="tubing-pulse"
              d="M60 73 C 60 120, 75 140, 95 125"
              stroke="#007aff"
              strokeWidth="3"
              strokeDasharray="6 4"
              fill="none"
            />

            {/* Computer Stand Base */}
            <path d="M130 125 V145 M110 145 H150" stroke="#1d1d1f" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>

        {/* 404 Heading & Action Message */}
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Emergency! Page Not Found</h2>
        <p className="not-found-text">
          Our medical computer checked all hospital records, but the page you are looking for has been moved or doesn't exist.
        </p>

        {/* Action Button */}
        <Link to="/" className="btn-primary-home">
          🏥 Return to Appointments Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
