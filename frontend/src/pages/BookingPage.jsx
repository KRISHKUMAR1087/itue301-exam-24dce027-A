import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const navigate = useNavigate();

  // Task 2: State 1 - Form Data
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: 'Dr. Sarah Jenkins',
    date: '',
    timeSlot: '09:00 AM',
    reason: '',
  });

  // Task 2: State 2 - Selected Doctor / Preview State
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Sarah Jenkins');
  
  // Status message
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'doctorName') {
      setSelectedDoctor(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.date) {
      setStatusMessage('Please fill in all required fields (Patient Name & Date).');
      return;
    }

    try {
      const response = await fetch('/api/v1/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: formData.patientName,
          doctorName: formData.doctorName,
          date: formData.date,
          timeSlot: formData.timeSlot,
          status: 'pending',
          reason: formData.reason,
        }),
      });

      if (response.ok) {
        setStatusMessage('✅ Appointment successfully booked!');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setStatusMessage('⚠️ Failed to book appointment. Please try again.');
      }
    } catch (err) {
      setStatusMessage(`⚠️ Server error: ${err.message}`);
    }
  };

  return (
    <div className="container">
      <div className="page-header-box">
        <h1 className="page-title">📅 Book an Appointment</h1>
        <p className="page-subtitle">
          Schedule your consultation with MedCare Plus medical specialists.
        </p>
      </div>

      <div className="booking-grid">
        {/* Form Section */}
        <div className="booking-form-container">
          {statusMessage && (
            <div
              style={{
                padding: '0.9rem 1.2rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                backgroundColor: statusMessage.startsWith('✅') ? '#dcfce7' : '#fef2f2',
                color: statusMessage.startsWith('✅') ? '#15803d' : '#991b1b',
                fontWeight: '700',
                border: statusMessage.startsWith('✅') ? '1px solid #86efac' : '1px solid #fecdd3',
              }}
            >
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Patient Name */}
            <div className="form-group">
              <label htmlFor="patientName">Patient Full Name *</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                className="form-control"
                placeholder="e.g., Alex Johnson"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Doctor Name */}
            <div className="form-group">
              <label htmlFor="doctorName">Select Medical Specialist *</label>
              <select
                id="doctorName"
                name="doctorName"
                className="form-control"
                value={formData.doctorName}
                onChange={handleChange}
              >
                <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins (Cardiology)</option>
                <option value="Dr. Robert Chen">Dr. Robert Chen (Neurology)</option>
                <option value="Dr. Emily Taylor">Dr. Emily Taylor (Pediatrics)</option>
                <option value="Dr. Michael Vance">Dr. Michael Vance (Orthopedics)</option>
              </select>
            </div>

            {/* Date */}
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

            {/* Time Slot */}
            <div className="form-group">
              <label htmlFor="timeSlot">Preferred Time Slot *</label>
              <select
                id="timeSlot"
                name="timeSlot"
                className="form-control"
                value={formData.timeSlot}
                onChange={handleChange}
              >
                <option value="09:00 AM">09:00 AM - 09:30 AM</option>
                <option value="10:30 AM">10:30 AM - 11:00 AM</option>
                <option value="02:00 PM">02:00 PM - 02:30 PM</option>
                <option value="04:15 PM">04:15 PM - 04:45 PM</option>
              </select>
            </div>

            {/* Reason */}
            <div className="form-group">
              <label htmlFor="reason">Reason for Visit</label>
              <textarea
                id="reason"
                name="reason"
                className="form-control"
                rows="3"
                placeholder="Brief description of symptoms or routine checkup reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-primary">
              Confirm & Book Appointment
            </button>
          </form>
        </div>

        {/* Task 2: Real-time Live State Preview Sidebar */}
        <div className="state-preview-card">
          <div className="state-preview-header">
            ⚡ Live State Monitor
          </div>

          <div className="preview-field">
            <div className="preview-label">Patient Name State</div>
            <div className={formData.patientName ? 'preview-value' : 'preview-value empty'}>
              {formData.patientName || 'Waiting for input...'}
            </div>
          </div>

          <div className="preview-field">
            <div className="preview-label">Selected Doctor State</div>
            <div className="preview-value">
              {selectedDoctor}
            </div>
          </div>

          <div className="preview-field">
            <div className="preview-label">Appointment Schedule</div>
            <div className={formData.date ? 'preview-value' : 'preview-value empty'}>
              {formData.date ? `${formData.date} at ${formData.timeSlot}` : 'Select date...'}
            </div>
          </div>

          {formData.reason && (
            <div className="preview-field">
              <div className="preview-label">Visit Reason</div>
              <div className="preview-value" style={{ fontSize: '0.95rem', fontWeight: '500' }}>
                "{formData.reason}"
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
