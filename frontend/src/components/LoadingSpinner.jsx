import React from 'react';

const LoadingSpinner = ({ message = 'Loading Medical Records...' }) => {
  return (
    <div className="medical-loading-container">
      <div className="medical-loading-card">
        {/* Animated Medical ECG / Pulse Spinner SVG */}
        <div className="spinner-stage">
          <svg
            className="medical-spinner-svg"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Rotating Medical Ring */}
            <circle
              cx="80"
              cy="80"
              r="68"
              stroke="#e2e8f0"
              strokeWidth="8"
            />
            <circle
              cx="80"
              cy="80"
              r="68"
              stroke="url(#medicalGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="427"
              strokeDashoffset="280"
              className="rotating-ring"
            />

            {/* Pulsing Stethoscope / Medical Heart Icon Center */}
            <g className="pulsing-heart-icon">
              <path
                d="M 80 102 C 60 82, 48 70, 48 58 C 48 48, 56 40, 66 40 C 73 40, 78 44, 80 48 C 82 44, 87 40, 94 40 C 104 40, 112 48, 112 58 C 112 70, 100 82, 80 102 Z"
                fill="#ef4444"
              />
            </g>

            {/* Animated ECG Pulse Wave across Center */}
            <path
              d="M 40 80 L 62 80 L 68 65 L 74 95 L 82 72 L 88 80 L 120 80"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ecg-pulse-wave"
            />

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="medicalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Loading Message & Bouncing Dots */}
        <h3 className="loading-message">{message}</h3>
        <div className="bouncing-dots">
          <span className="dot dot-1">.</span>
          <span className="dot dot-2">.</span>
          <span className="dot dot-3">.</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
