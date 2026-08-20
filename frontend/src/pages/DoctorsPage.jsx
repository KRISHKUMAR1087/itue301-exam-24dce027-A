import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const DoctorsPage = () => {
  // Task 4: Maintain three states - data, loading, and error
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter & Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [specialityFilter, setSpecialityFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-az');
  const [updatingId, setUpdatingId] = useState(null);

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

  // Toggle Doctor Availability Status Handler
  const handleToggleAvailability = async (doctor) => {
    const newStatus = !doctor.available;
    const docId = doctor._id;
    setUpdatingId(docId);

    try {
      const response = await fetch(`/api/v1/doctors/${docId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: newStatus }),
      });

      if (response.ok) {
        setData((prevData) =>
          prevData.map((doc) => (doc._id === docId ? { ...doc, available: newStatus } : doc))
        );
      } else {
        // Local state update fallback
        setData((prevData) =>
          prevData.map((doc) => (doc._id === docId ? { ...doc, available: newStatus } : doc))
        );
      }
    } catch (err) {
      setData((prevData) =>
        prevData.map((doc) => (doc._id === docId ? { ...doc, available: newStatus } : doc))
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Get unique list of specialties for filter dropdown
  const uniqueSpecialties = Array.from(new Set(data.map((d) => d.specialisation))).sort();

  // Filter & Sort Logic for Doctors
  const filteredDoctors = data
    .filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialisation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialty =
        specialityFilter === 'all' || doc.specialisation === specialityFilter;
      const matchesAvailability =
        availabilityFilter === 'all' ||
        (availabilityFilter === 'available' && doc.available) ||
        (availabilityFilter === 'unavailable' && !doc.available);

      return matchesSearch && matchesSpecialty && matchesAvailability;
    })
    .sort((a, b) => {
      if (sortBy === 'name-az') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'specialty') {
        return a.specialisation.localeCompare(b.specialisation);
      }
      return 0;
    });

  return (
    <div className="container">
      <div className="page-header-box">
        <h1 className="page-title">👨‍⚕️ Medical Specialists</h1>
        <p className="page-subtitle">
          Meet our qualified doctors and healthcare professionals at MedCare Plus. Toggle status to update live availability.
        </p>
      </div>

      {/* Doctor Search, Specialty Filter, Availability Filter & Sort Controls */}
      {!loading && !error && (
        <div className="filter-control-bar" style={{ marginBottom: '2rem' }}>
          {/* Search Input */}
          <div className="filter-item search-box">
            <label htmlFor="doctorSearch">🔍 Search Specialist</label>
            <input
              type="text"
              id="doctorSearch"
              className="form-control"
              placeholder="Search by doctor name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Specialty Filter Dropdown */}
          <div className="filter-item">
            <label htmlFor="specialtyFilter">🔬 Specialty</label>
            <select
              id="specialtyFilter"
              className="form-control"
              value={specialityFilter}
              onChange={(e) => setSpecialityFilter(e.target.value)}
            >
              <option value="all">All Specialties ({uniqueSpecialties.length})</option>
              {uniqueSpecialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Filter Dropdown */}
          <div className="filter-item">
            <label htmlFor="availabilityFilter">🟢 Status</label>
            <select
              id="availabilityFilter"
              className="form-control"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="all">All Statuses ({data.length})</option>
              <option value="available">Available Today Only</option>
              <option value="unavailable">Unavailable Only</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="filter-item">
            <label htmlFor="sortByDoc">🔃 Sort By</label>
            <select
              id="sortByDoc"
              className="form-control"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name-az">Doctor Name (A - Z)</option>
              <option value="specialty">Specialization</option>
            </select>
          </div>
        </div>
      )}

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

      {/* Empty Results Handling */}
      {!loading && !error && filteredDoctors.length === 0 && (
        <div className="empty-results-box">
          <h3>🔍 No medical specialists found</h3>
          <p>Try adjusting your specialty filter or search query.</p>
        </div>
      )}

      {/* 3. Display doctor data after successful request */}
      {!loading && !error && filteredDoctors.length > 0 && (
        <div className="cards-grid">
          {filteredDoctors.map((doctor) => (
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

              {/* 4. Display Doctor Name, Specialisation, and Interactive Availability Toggle */}
              <div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span
                    className={`availability-badge ${
                      doctor.available ? 'available' : 'unavailable'
                    }`}
                  >
                    {doctor.available ? '🟢 Available Today' : '🔴 Not Available'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleAvailability(doctor)}
                  disabled={updatingId === doctor._id}
                  className="btn-toggle-availability"
                >
                  {updatingId === doctor._id
                    ? 'Updating...'
                    : doctor.available
                    ? 'Mark as Not Available'
                    : 'Mark as Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
