import React from 'react';

const AppointmentCard = ({ patientName, doctorName, date, timeSlot, status }) => {
  // Format or sanitize status class name for safety
  const statusClass = (status || 'pending').toLowerCase();

  return (
    <div className="appointment-card">
      <div className="card-header">
        <div>
          <div className="patient-name">👤 {patientName}</div>
        </div>
        <span className={`status-badge ${statusClass}`}>
          {status}
        </span>
      </div>
      <div className="doctor-name">
        🩺 {doctorName}
      </div>
      <div className="card-detail-item">
        📅 <strong>Date:</strong> {date}
      </div>
      <div className="card-detail-item">
        ⏰ <strong>Time Slot:</strong> {timeSlot}
      </div>
    </div>
  );
};

export default AppointmentCard;
