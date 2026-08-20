import React, { useState, useEffect } from 'react';
import AppointmentCard from '../components/AppointmentCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([
    {
      _id: '1',
      patientName: 'John Doe',
      doctorName: 'Dr. Sarah Jenkins',
      date: '2026-08-25',
      timeSlot: '10:00 AM',
      status: 'confirmed',
    },
    {
      _id: '2',
      patientName: 'Alice Smith',
      doctorName: 'Dr. Robert Chen',
      date: '2026-08-26',
      timeSlot: '02:30 PM',
      status: 'pending',
    },
    {
      _id: '3',
      patientName: 'Michael Brown',
      doctorName: 'Dr. Emily Taylor',
      date: '2026-08-27',
      timeSlot: '11:15 AM',
      status: 'cancelled',
    },
  ]);

  useEffect(() => {
    // Fetch live appointments from backend API
    fetch('/api/v1/appointments')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item, index) => ({
            _id: item._id || String(index),
            patientName: item.patientId?.name || item.patientName || 'Anonymous Patient',
            doctorName: item.doctorId?.name || item.doctorName || 'Dr. Specialist',
            date: item.date || '2026-08-30',
            timeSlot: item.timeSlot || '10:00 AM',
            status: item.status || 'pending',
          }));
          setAppointments(formatted);
        }
      })
      .catch((err) => {
        console.log('Using default sample appointments for HomePage:', err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="page-header-box">
        <h1 className="page-title">📋 Scheduled Appointments</h1>
        <p className="page-subtitle">
          Overview of upcoming and past patient appointments at MedCare Plus Hospital.
        </p>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading Scheduled Appointments..." />
      ) : (
        <div className="cards-grid">
          {appointments.map((appt) => (
            <AppointmentCard
              key={appt._id}
              patientName={appt.patientName}
              doctorName={appt.doctorName}
              date={appt.date}
              timeSlot={appt.timeSlot}
              status={appt.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
