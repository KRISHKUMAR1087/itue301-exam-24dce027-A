import React from 'react';

const AppointmentCard = ({ patientName, doctorName, date, timeSlot, status, onEdit }) => {
  const statusClass = (status || 'pending').toLowerCase();

  return (
    <div className="appointment-card">
      <div>
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

        <div className="card-details-list">
          <div className="card-detail-item">
            📅 <strong>Date:</strong> {date}
          </div>
          <div className="card-detail-item">
            ⏰ <strong>Time Slot:</strong> {timeSlot}
          </div>
        </div>
      </div>

      {/* Edit Action Button */}
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="btn-edit-appointment"
        >
          ✏️ Edit Details & Status
        </button>
      )}
    </div>
  );
};

export default AppointmentCard;
