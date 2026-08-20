import React from 'react';

const AppointmentCard = ({ patientName, doctorName, date, timeSlot, status, bloodGroup = 'O+', onEdit, onDelete }) => {
  const statusClass = (status || 'pending').toLowerCase();
  const isCancelled = statusClass === 'cancelled';

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
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

      {/* Action Row: Edit button for all cards, Delete button ONLY when Cancelled */}
      <div className="card-action-row" style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="btn-edit-appointment"
            style={{ flex: 1 }}
          >
            ✏️ Edit Details & Status
          </button>
        )}

        {isCancelled && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="btn-delete-appointment"
            title="Delete Cancelled Appointment Record"
            style={{ flex: 1, padding: '0.65rem 0.9rem' }}
          >
            🗑️ Delete Record
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
