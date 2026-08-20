import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

const BookingPage = () => {
  const navigate = useNavigate();

  // Dynamic Doctors List fetched from API
  const [doctorsList, setDoctorsList] = useState([
    { _id: '1', name: 'Dr. Sarah Jenkins', specialisation: 'Cardiology', available: true },
    { _id: '2', name: 'Dr. Robert Chen', specialisation: 'Neurology', available: true },
    { _id: '3', name: 'Dr. Emily Taylor', specialisation: 'Pediatrics', available: false },
    { _id: '4', name: 'Dr. Michael Vance', specialisation: 'Orthopedics', available: true },
    { _id: '5', name: 'Dr. Aisha Patel', specialisation: 'Dermatology', available: true },
    { _id: '6', name: 'Dr. David Miller', specialisation: 'Ophthalmology', available: true },
    { _id: '7', name: 'Dr. Sophia Martinez', specialisation: 'Psychiatry', available: false },
    { _id: '8', name: 'Dr. James Wilson', specialisation: 'General Surgery', available: true },
    { _id: '9', name: 'Dr. Marcus Brody', specialisation: 'Pulmonology', available: true },
    { _id: '10', name: 'Dr. Olivia Vance', specialisation: 'Endocrinology', available: true },
  ]);

  // Task 2 & Task 5: State 1 - Form Data with Blood Group
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Not Known'];
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: 'O+',
    doctorName: 'Dr. Sarah Jenkins',
    date: '',
    timeSlot: '09:00 AM',
    reason: '',
  });

  // Task 2: State 2 - Selected Doctor / Preview State
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Sarah Jenkins');
  
  // Toast & Status message
  const [toastMessage, setToastMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch all doctors from API dynamically on mount
  useEffect(() => {
    fetch('/api/v1/doctors')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDoctorsList(data);
          if (data[0]?.name) {
            setFormData((prev) => ({ ...prev, doctorName: data[0].name }));
            setSelectedDoctor(data[0].name);
          }
        }
      })
      .catch((err) => {
        console.log('Using default doctors list for BookingPage:', err.message);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'reason' && value.length > 300) return;

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
          bloodGroup: formData.bloodGroup,
          doctorName: formData.doctorName,
          date: formData.date,
          timeSlot: formData.timeSlot,
          status: 'pending',
          reason: formData.reason,
        }),
      });

      if (response.ok) {
        setToastMessage('Appointment Successfully Booked!');
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

  const reasonCharCount = formData.reason.length;
  const maxReasonLength = 300;
  const isFormComplete = Boolean(formData.patientName && formData.date);

  return (
    <div className="container">
      {/* Animated Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}

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

            {/* Task 5: Patient Blood Group Enum Dropdown */}
            <div className="form-group">
              <label htmlFor="bloodGroup">Patient Blood Group * (Mongoose Enum)</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                className="form-control"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="A+">🩸 A+ (A Positive)</option>
                <option value="A-">🩸 A- (A Negative)</option>
                <option value="B+">🩸 B+ (B Positive)</option>
                <option value="B-">🩸 B- (B Negative)</option>
                <option value="AB+">🩸 AB+ (AB Positive)</option>
                <option value="AB-">🩸 AB- (AB Negative)</option>
                <option value="O+">🩸 O+ (O Positive)</option>
                <option value="O-">🩸 O- (O Negative)</option>
                <option value="Not Known">🩸 Not Known / Don't Know</option>
              </select>

            </div>

            {/* Doctor Name */}
            <div className="form-group">
              <label htmlFor="doctorName">Select Medical Specialist * ({doctorsList.length} Available)</label>
              <select
                id="doctorName"
                name="doctorName"
                className="form-control"
                value={formData.doctorName}
                onChange={handleChange}
              >
                {doctorsList.map((doc) => (
                  <option key={doc._id || doc.name} value={doc.name}>
                    {doc.name} ({doc.specialisation}) {doc.available === false ? '- Not Available' : ''}
                  </option>
                ))}
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

            {/* Reason for Visit */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="reason" style={{ marginBottom: '0.4rem' }}>
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
                id="reason"
                name="reason"
                className="form-control"
                rows="3"
                maxLength={maxReasonLength}
                placeholder="Brief description of symptoms or routine checkup reason (Max 300 characters)"
                value={formData.reason}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-primary">
              Confirm & Book Appointment
            </button>
          </form>
        </div>

        {/* Separated Live State Monitor Sidebar with Blood Group */}
        <div className="state-preview-card">
          <div className="state-preview-header">
            <span className="live-pulse-dot"></span> LIVE STATE MONITOR
          </div>

          {/* Patient Details & Blood Group */}
          <div className="monitor-section">
            <div className="monitor-section-title">👤 Patient & Blood Group</div>
            <div className="monitor-grid-row" style={{ marginBottom: '0.4rem' }}>
              <div className={formData.patientName ? 'monitor-box active' : 'monitor-box empty'} style={{ flex: 2 }}>
                {formData.patientName || 'Waiting for patient name...'}
              </div>
              <div className="monitor-chip active" style={{ flex: 1, backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                🩸 {formData.bloodGroup}
              </div>
            </div>
          </div>

          {/* Assigned Specialist */}
          <div className="monitor-section">
            <div className="monitor-section-title">🩺 Assigned Specialist</div>
            <div className="monitor-box highlight">
              {selectedDoctor}
            </div>
          </div>

          {/* Schedule & Time Slot */}
          <div className="monitor-section">
            <div className="monitor-section-title">📅 Schedule & Time Slot</div>
            <div className="monitor-grid-row">
              <div className={formData.date ? 'monitor-chip' : 'monitor-chip empty'}>
                🗓️ {formData.date || 'No Date'}
              </div>
              <div className="monitor-chip active">
                ⏰ {formData.timeSlot}
              </div>
            </div>
          </div>

          {/* Visit Reason */}
          <div className="monitor-section">
            <div className="monitor-section-title">
              <span>💬 Visit Reason</span>
              <span className="reason-counter-chip">{reasonCharCount}/300</span>
            </div>
            <div className={formData.reason ? 'monitor-box' : 'monitor-box empty'}>
              {formData.reason ? `"${formData.reason}"` : 'No reason specified'}
            </div>
          </div>

          {/* Form Status Badge */}
          <div className="monitor-footer-badge">
            <span className={`form-readiness-tag ${isFormComplete ? 'ready' : 'incomplete'}`}>
              {isFormComplete ? '🟢 Ready for Submission' : '🟡 Incomplete Form'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
