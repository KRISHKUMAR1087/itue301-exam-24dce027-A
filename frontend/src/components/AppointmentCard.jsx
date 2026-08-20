import React from 'react';

const AppointmentCard = ({ patientName, doctorName, date, timeSlot, status, bloodGroup = 'O+', onEdit }) => {
  const statusClass = (status || 'pending').toLowerCase();

  return (
    <div className="appointment-card">
      <div className="card-top-content">
        {/* Card Header: Patient Icon, Name & Status Badge */}
        <div className="card-header">
          <div className="patient-name-box">
            <span className="patient-icon">👤</span>
            <span className="patient-name">{patientName}</span>
          </div>
          <span className={`status-badge ${statusClass}`}>
            {status}
          </span>
        </div>

        {/* Assigned Doctor & Patient Blood Group Tags Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div className="doctor-name" style={{ margin: 0 }}>
            <span>🩺</span> {doctorName}
          </div>
          {bloodGroup && (
            <span className="blood-group-badge">
              🩸 {bloodGroup}
            </span>
          )}
        </div>

        {/* Details List: Date & Time Slot */}
        <div className="card-details-list">
          <div className="card-detail-item">
            <span className="detail-icon">📅</span>
            <span><strong>Date:</strong> {date}</span>
          </div>
          <div className="card-detail-item">
            <span className="detail-icon">⏰</span>
            <span><strong>Time Slot:</strong> {timeSlot}</span>
          </div>
        </div>
      </div>

      {/* Edit Action Button pinned at bottom */}
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
