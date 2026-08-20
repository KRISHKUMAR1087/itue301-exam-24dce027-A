import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const [reported, setReported] = useState(false);

  const handleReport = () => {
    setReported(true);
    setTimeout(() => setReported(false), 4000);
  };

  return (
    <div className="not-found-container">
      <div className="not-found-card-medical">
        {/* Dynamic Animated Medical Hospital Computer IV Drip SVG Scene */}
        <div className="animation-stage">
          <svg
            className="medical-404-svg"
            viewBox="0 0 500 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft Ambient Background Glow */}
            <circle cx="250" cy="160" r="140" fill="#f0fdf4" opacity="0.8" />

            {/* Floating Background Particles */}
            <g className="floating-particles">
              <circle cx="120" cy="60" r="4" fill="#10b981" className="particle-1" />
              <circle cx="380" cy="80" r="3" fill="#3b82f6" className="particle-2" />
              <circle cx="430" cy="190" r="5" fill="#f59e0b" className="particle-3" />
              <circle cx="80" cy="220" r="4" fill="#ec4899" className="particle-4" />
              
              {/* Medical Crosses */}
              <text x="100" y="120" fontSize="16" fill="#a7f3d0" className="particle-cross-1">+</text>
              <text x="390" y="140" fontSize="18" fill="#bae6fd" className="particle-cross-2">+</text>
              <text x="320" y="50" fontSize="14" fill="#fde68a" className="particle-cross-3">+</text>
            </g>

            {/* Hospital Table / Desk Base */}
            <rect x="100" y="250" width="300" height="10" rx="5" fill="#64748b" />
            <line x1="120" y1="260" x2="120" y2="290" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
            <line x1="380" y1="260" x2="380" y2="290" stroke="#475569" strokeWidth="6" strokeLinecap="round" />

            {/* IV Drip Stand */}
            <g className="iv-stand">
              {/* Vertical Metal Pole */}
              <line x1="180" y1="50" x2="180" y2="250" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
              {/* Top Hook Bracket */}
              <path d="M 165 60 L 180 50 L 195 60" stroke="#64748b" strokeWidth="4" fill="none" strokeLinecap="round" />
              
              {/* IV Fluid Bag */}
              <rect x="162" y="70" width="36" height="60" rx="10" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
              {/* Animated IV Liquid level inside bag */}
              <path
                d="M 164 90 Q 180 94 196 90 L 196 122 Q 180 128 164 122 Z"
                fill="#38bdf8"
                className="iv-liquid-bag"
              />
              {/* Measure Markings on IV Bag */}
              <line x1="168" y1="80" x2="174" y2="80" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="168" y1="88" x2="174" y2="88" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="168" y1="96" x2="174" y2="96" stroke="#cbd5e1" strokeWidth="2" />

              {/* Drip Chamber */}
              <rect x="174" y="130" width="12" height="18" rx="3" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />

              {/* Animated Liquid Drop inside Chamber */}
              <circle cx="180" cy="134" r="3" fill="#0284c7" className="anim-drip-drop" />
            </g>

            {/* Clear IV Tube running from IV Bag into Computer Monitor */}
            <path
              d="M 180 148 C 180 200, 210 210, 230 190"
              stroke="#38bdf8"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className="iv-tube-path"
            />
            {/* Animated Flowing Liquid Segment inside Tube */}
            <circle cx="180" cy="165" r="4" fill="#0284c7" className="anim-tube-flow-1" />
            <circle cx="205" cy="198" r="4" fill="#0284c7" className="anim-tube-flow-2" />

            {/* Sick Computer Monitor */}
            <g className="sick-computer">
              {/* Monitor Stand Base */}
              <ellipse cx="280" cy="248" rx="35" ry="6" fill="#cbd5e1" />
              <rect x="272" y="225" width="16" height="25" fill="#94a3b8" rx="2" />

              {/* Monitor Outer Casing */}
              <rect x="220" y="135" width="120" height="95" rx="12" fill="#0284c7" stroke="#0369a1" strokeWidth="4" />
              {/* Inner Screen Display */}
              <rect x="230" y="145" width="100" height="75" rx="6" fill="#ffffff" />

              {/* Bandage / Patch on Monitor Top Right Corner */}
              <g className="computer-bandage">
                <rect x="310" y="138" width="26" height="12" rx="3" fill="#fde047" stroke="#d97706" strokeWidth="2" transform="rotate(25 323 144)" />
                <circle cx="323" cy="144" r="2" fill="#d97706" />
              </g>

              {/* Animated Face on Screen */}
              <g className="computer-face">
                {/* Dead / Dizzy Eyes (X X) with pulse animation */}
                <g className="anim-dizzy-eyes">
                  {/* Left Eye X */}
                  <line x1="248" y1="162" x2="262" y2="176" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                  <line x1="262" y1="162" x2="248" y2="176" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                  {/* Right Eye X */}
                  <line x1="298" y1="162" x2="312" y2="176" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                  <line x1="312" y1="162" x2="298" y2="176" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                </g>

                {/* Sad / Trembling Mouth */}
                <path
                  d="M 268 198 Q 280 186 292 198"
                  stroke="#1e293b"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className="anim-sad-mouth"
                />

                {/* Animated Heartbeat Monitor Line on Screen Bottom */}
                <path
                  d="M 232 210 L 255 210 L 260 202 L 265 216 L 272 206 L 278 210 L 328 210"
                  stroke="#ef4444"
                  strokeWidth="2"
                  fill="none"
                  className="ecg-heartbeat-line"
                />
              </g>
            </g>

            {/* Grandpa Doctor Character Tending to Sick Computer */}
            <g className="grandpa-doctor-action">
              {/* Doctor Head */}
              <circle cx="365" cy="120" r="24" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
              {/* Doctor Glasses */}
              <rect x="350" y="112" width="13" height="10" rx="2" fill="none" stroke="#1e293b" strokeWidth="2" />
              <rect x="367" y="112" width="13" height="10" rx="2" fill="none" stroke="#1e293b" strokeWidth="2" />
              <line x1="363" y1="117" x2="367" y2="117" stroke="#1e293b" strokeWidth="2" />
              {/* Grandpa White Hair */}
              <path d="M 342 115 Q 338 102 348 98" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 388 115 Q 392 102 382 98" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Doctor Mask / Beard */}
              <path d="M 346 128 Q 365 145 384 128 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />

              {/* Doctor Body in White Lab Coat */}
              <path d="M 345 144 L 330 220 L 400 220 L 385 144 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
              {/* Stethoscope around neck */}
              <path d="M 352 144 C 352 165, 378 165, 378 144" stroke="#0f172a" strokeWidth="3" fill="none" />
              <circle cx="365" cy="166" r="4" fill="#0284c7" />

              {/* Animated Doctor Arm adjusting IV Drip Valve */}
              <g className="anim-doctor-arm">
                <path d="M 346 155 Q 300 150 230 188" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
                <path d="M 346 155 Q 300 150 230 188" stroke="#cbd5e1" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Hand Holding Cable / Tube */}
                <circle cx="230" cy="188" r="7" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
              </g>
            </g>

            {/* Chewed Severed Cable on Table with Sparks */}
            <g className="table-sparks">
              <path d="M 120 250 Q 140 235 155 248" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" fill="none" />
              {/* Sparkle effects */}
              <path d="M 158 244 L 164 235 L 170 246" stroke="#f59e0b" strokeWidth="3" fill="none" className="table-spark-1" />
              <circle cx="166" cy="240" r="3" fill="#ef4444" className="table-spark-2" />
            </g>
          </svg>
        </div>

        {/* Text Section matching reference image design */}
        <h1 className="medical-oops-title">Oops!</h1>
        <p className="medical-oops-text">
          Something went wrong at our end. Our specialist doctor is currently administering emergency IV treatment to the server. Don't worry, it's not you - it's us.
        </p>
        <p className="medical-sorry-text">Sorry about that.</p>

        {/* Action Buttons matching reference style with live interactions */}
        <div className="medical-btn-group">
          <Link to="/" className="btn-medical-green">
            Back Home
          </Link>
          <button
            type="button"
            onClick={handleReport}
            className="btn-medical-outline"
          >
            {reported ? '✓ Error Reported!' : 'Report Error'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
