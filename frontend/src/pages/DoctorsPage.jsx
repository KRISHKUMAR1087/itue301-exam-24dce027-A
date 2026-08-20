import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const DoctorsPage = () => {
  // Task 4: Maintain three states - data, loading, and error
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Task 4: Asynchronous pattern using fetch inside useEffect
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/v1/doctors');
        if (!response.ok) {
          throw new Error(`Failed to fetch doctors: HTTP status ${response.status}`);
        }

        const doctorsData = await response.json();
        setData(doctorsData);
      } catch (err) {
        setError(err.message || 'An error occurred while retrieving doctor data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="container">
      <div className="page-header-box">
        <h1 className="page-title">👨‍⚕️ Medical Specialists</h1>
        <p className="page-subtitle">
          Meet our qualified doctors and healthcare professionals at MedCare Plus.
        </p>
      </div>

      {/* 1. Display loading animation component */}
      {loading && (
        <LoadingSpinner message="Fetching Doctor Directory from Server..." />
      )}

      {/* 2. Display error message if request fails */}
      {error && !loading && (
        <div className="error-box">
          <h3>⚠️ Unable to Load Doctors</h3>
          <p>{error}</p>
        </div>
      )}

      {/* 3. Display doctor data after successful request */}
      {!loading && !error && (
        <div className="cards-grid">
          {data.map((doctor) => (
            <div className="doctor-card" key={doctor._id || doctor.name}>
              <div>
                <h3>{doctor.name}</h3>
                <div className="specialisation-tag">
                  🔬 {doctor.specialisation}
                </div>
                {doctor.email && (
                  <div className="card-detail-item" style={{ marginBottom: '0.75rem' }}>
                    📧 {doctor.email}
                  </div>
                )}
              </div>

              {/* 4. Display Doctor Name, Specialisation, and Availability */}
              <div>
                <span
                  className={`availability-badge ${
                    doctor.available ? 'available' : 'unavailable'
                  }`}
                >
                  {doctor.available ? '🟢 Available Today' : '🔴 Not Available'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
