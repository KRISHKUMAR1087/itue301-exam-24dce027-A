import React, { useState, useEffect } from 'react';

const EditAppointmentModal = ({ appointment, onClose, onSave }) => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [formData, setFormData] = useState({
    patientName: appointment.patientName || '',
    doctorName: appointment.doctorName || 'Dr. Sarah Jenkins',
    date: appointment.date || '',
    timeSlot: appointment.timeSlot || '10:00 AM',
    status: appointment.status || 'pending',
    reason: appointment.reason || '',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/v1/doctors')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDoctorsList(data);
        }
      })
      .catch((err) => {
        console.log('Error loading doctors list for modal:', err.message);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'reason' && value.length > 300) return; // Max 300 chars limit

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave(appointment._id, formData);
    setSaving(false);
  };

  const reasonCharCount = formData.reason.length;
  const maxReasonLength = 300;

  return (
    <div className="modal-backdrop">
      <div className="modal-content-box">
        <div className="modal-header">
          <h3>✏️ Edit Appointment Details</h3>
          <button type="button" onClick={onClose} className="modal-close-btn">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Patient Name (Read-only reference) */}
          <div className="form-group">
            <label>Patient Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.patientName}
              disabled
              style={{ backgroundColor: '#e2e8f0', color: '#475569' }}
            />
          </div>

          {/* Edit Status */}
          <div className="form-group">
            <label htmlFor="status">Appointment Status *</label>
            <select
              id="status"
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="confirmed">🟢 Confirmed</option>
              <option value="pending">🟡 Pending</option>
              <option value="cancelled">🔴 Cancelled</option>
            </select>
          </div>

          {/* Edit Doctor - Dynamically Populated */}
          <div className="form-group">
            <label htmlFor="doctorName">Assigned Doctor *</label>
            <select
              id="doctorName"
              name="doctorName"
              className="form-control"
              value={formData.doctorName}
              onChange={handleChange}
            >
              {doctorsList.length > 0 ? (
                doctorsList.map((doc) => (
                  <option key={doc._id || doc.name} value={doc.name}>
                    {doc.name} ({doc.specialisation})
                  </option>
                ))
              ) : (
                <option value={formData.doctorName}>{formData.doctorName}</option>
              )}
            </select>
          </div>

          {/* Edit Date */}
          <div className="form-group">
            <label htmlFor="date">Appointment Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Edit Time Slot */}
          <div className="form-group">
            <label htmlFor="timeSlot">Time Slot *</label>
            <select
              id="timeSlot"
              name="timeSlot"
              className="form-control"
              value={formData.timeSlot}
              onChange={handleChange}
            >
              <option value="09:00 AM">09:00 AM - 09:30 AM</option>
              <option value="09:30 AM">09:30 AM - 10:00 AM</option>
              <option value="10:00 AM">10:00 AM - 10:30 AM</option>
              <option value="10:30 AM">10:30 AM - 11:00 AM</option>
              <option value="11:15 AM">11:15 AM - 11:45 AM</option>
              <option value="01:00 PM">01:00 PM - 01:30 PM</option>
              <option value="02:00 PM">02:00 PM - 02:30 PM</option>
              <option value="02:30 PM">02:30 PM - 03:00 PM</option>
              <option value="03:15 PM">03:15 PM - 03:45 PM</option>
              <option value="04:00 PM">04:00 PM - 04:30 PM</option>
            </select>
          </div>

          {/* Edit Reason with Live Character Counter */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="reasonModal" style={{ marginBottom: '0.4rem' }}>
                Reason for Visit
              </label>
              <span
                style={{
                  fontSize: '0.825rem',
                  fontWeight: '700',
                  color: reasonCharCount > 280 ? '#ef4444' : '#64748b',
                }}
              >
                {reasonCharCount} / {maxReasonLength} characters
              </span>
            </div>
            <textarea
              id="reasonModal"
              name="reason"
              className="form-control"
              rows="3"
              maxLength={maxReasonLength}
              placeholder="Brief description of symptoms or checkup reason (Max 300 characters)"
              value={formData.reason}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="modal-action-buttons">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-save">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
