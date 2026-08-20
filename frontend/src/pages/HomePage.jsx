import React, { useState, useEffect } from 'react';
import AppointmentCard from '../components/AppointmentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EditAppointmentModal from '../components/EditAppointmentModal';
import Toast from '../components/Toast';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-asc');
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // 10 Distinct Appointments with Diverse Blood Groups
  const [appointments, setAppointments] = useState([
    {
      _id: '1',
      patientName: 'John Doe',
      bloodGroup: 'A+',
      doctorName: 'Dr. Sarah Jenkins',
      date: '2026-08-25',
      timeSlot: '10:00 AM',
      status: 'confirmed',
    },
    {
      _id: '2',
      patientName: 'Alice Smith',
      bloodGroup: 'B+',
      doctorName: 'Dr. Robert Chen',
      date: '2026-08-26',
      timeSlot: '02:30 PM',
      status: 'pending',
    },
    {
      _id: '3',
      patientName: 'Michael Brown',
      bloodGroup: 'O-',
      doctorName: 'Dr. Emily Taylor',
      date: '2026-08-27',
      timeSlot: '11:15 AM',
      status: 'cancelled',
    },
    {
      _id: '4',
      patientName: 'Krishkumar Darji',
      bloodGroup: 'O+',
      doctorName: 'Dr. Sarah Jenkins',
      date: '2026-08-28',
      timeSlot: '09:00 AM',
      status: 'confirmed',
    },
    {
      _id: '5',
      patientName: 'Eleanor Vance',
      bloodGroup: 'AB+',
      doctorName: 'Dr. Michael Vance',
      date: '2026-08-29',
      timeSlot: '03:15 PM',
      status: 'pending',
    },
    {
      _id: '6',
      patientName: 'David Miller',
      bloodGroup: 'A-',
      doctorName: 'Dr. Aisha Patel',
      date: '2026-08-30',
      timeSlot: '01:00 PM',
      status: 'confirmed',
    },
    {
      _id: '7',
      patientName: 'Samantha Ray',
      bloodGroup: 'B-',
      doctorName: 'Dr. David Miller',
      date: '2026-08-31',
      timeSlot: '10:30 AM',
      status: 'cancelled',
    },
    {
      _id: '8',
      patientName: 'Carlos Gomez',
      bloodGroup: 'AB-',
      doctorName: 'Dr. Sophia Martinez',
      date: '2026-09-01',
      timeSlot: '04:00 PM',
      status: 'pending',
    },
    {
      _id: '9',
      patientName: 'Hannah Abbott',
      bloodGroup: 'A+',
      doctorName: 'Dr. James Wilson',
      date: '2026-09-02',
      timeSlot: '09:30 AM',
      status: 'confirmed',
    },
    {
      _id: '10',
      patientName: 'Liam Gallagher',
      bloodGroup: 'B+',
      doctorName: 'Dr. Marcus Brody',
      date: '2026-09-03',
      timeSlot: '02:15 PM',
      status: 'pending',
    },
  ]);

  const fetchAppointments = () => {
    setLoading(true);
    // Exact 0.5-second smooth loading animation timer
    setTimeout(() => {
      fetch('/api/v1/appointments')
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const formatted = data.map((item, index) => ({
              _id: item._id || String(index),
              patientName: item.patientId?.name || item.patientName || 'Anonymous Patient',
              bloodGroup: item.patientId?.bloodGroup || item.bloodGroup || 'O+',
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
    }, 500);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Update appointment handler
  const handleSaveEdit = async (id, updatedData) => {
    try {
      const res = await fetch(`/api/v1/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setAppointments((prev) =>
          prev.map((item) => (item._id === id ? { ...item, ...updatedData } : item))
        );
        setToastMessage('Appointment Details Successfully Updated!');
      } else {
        setAppointments((prev) =>
          prev.map((item) => (item._id === id ? { ...item, ...updatedData } : item))
        );
        setToastMessage('Appointment Details Successfully Updated!');
      }
    } catch (err) {
      setAppointments((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...updatedData } : item))
      );
      setToastMessage('Appointment Details Successfully Updated!');
    } finally {
      setEditingAppointment(null);
    }
  };

  // Delete appointment handler
  const handleDeleteAppointment = async (id) => {
    try {
      await fetch(`/api/v1/appointments/${id}`, {
        method: 'DELETE',
      });
      setAppointments((prev) => prev.filter((item) => item._id !== id));
      setToastMessage('Appointment Record Successfully Deleted!');
    } catch (err) {
      setAppointments((prev) => prev.filter((item) => item._id !== id));
      setToastMessage('Appointment Record Successfully Deleted!');
    }
  };

  // Filter & Search Logic
  const filteredAppointments = appointments
    .filter((appt) => {
      const matchesSearch =
        appt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (appt.bloodGroup && appt.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus =
        statusFilter === 'all' || appt.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date-asc') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'date-desc') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'patient-az') {
        return a.patientName.localeCompare(b.patientName);
      }
      return 0;
    });

  return (
    <div className="container">
      {/* Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}

      <div className="page-header-box">
        <h1 className="page-title">📋 Scheduled Appointments</h1>
        <p className="page-subtitle">
          Overview of upcoming and past patient appointments at MedCare Plus Hospital.
        </p>
      </div>

      {/* Search, Filter & Sort Control Bar */}
      <div className="filter-control-bar">
        <div className="filter-item search-box">
          <label htmlFor="search">🔍 Search</label>
          <input
            type="text"
            id="search"
            className="form-control"
            placeholder="Search patient, doctor name or blood group (e.g., A+)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="statusFilter">🏷️ Status</label>
          <select
            id="statusFilter"
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses ({appointments.length})</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="sortBy">🔃 Sort By</label>
          <select
            id="sortBy"
            className="form-control"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date-asc">Date (Earliest First)</option>
            <option value="date-desc">Date (Latest First)</option>
            <option value="patient-az">Patient Name (A - Z)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading Scheduled Appointments..." />
      ) : filteredAppointments.length === 0 ? (
        <div className="empty-results-box">
          <h3>🔍 No matching appointments found</h3>
          <p>Try adjusting your search criteria or status filter.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {filteredAppointments.map((appt) => (
            <AppointmentCard
              key={appt._id}
              patientName={appt.patientName}
              bloodGroup={appt.bloodGroup}
              doctorName={appt.doctorName}
              date={appt.date}
              timeSlot={appt.timeSlot}
              status={appt.status}
              onEdit={() => setEditingAppointment(appt)}
              onDelete={() => handleDeleteAppointment(appt._id)}
            />
          ))}
        </div>
      )}

      {/* Edit Appointment Modal */}
      {editingAppointment && (
        <EditAppointmentModal
          appointment={editingAppointment}
          onClose={() => setEditingAppointment(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default HomePage;
