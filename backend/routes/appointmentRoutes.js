const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { getIsConnected } = require('../config/db');

// In-memory demo appointments dataset (10 distinct records)
let initialAppointments = [
  {
    _id: '1',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Jenkins',
    date: '2026-08-25',
    timeSlot: '10:00 AM',
    status: 'confirmed',
    reason: 'Routine Cardiology Checkup & ECG Test',
  },
  {
    _id: '2',
    patientName: 'Alice Smith',
    doctorName: 'Dr. Robert Chen',
    date: '2026-08-26',
    timeSlot: '02:30 PM',
    status: 'pending',
    reason: 'Frequent Migraines & Neurological Evaluation',
  },
  {
    _id: '3',
    patientName: 'Michael Brown',
    doctorName: 'Dr. Emily Taylor',
    date: '2026-08-27',
    timeSlot: '11:15 AM',
    status: 'cancelled',
    reason: 'Child Wellness Checkup & Vaccination',
  },
  {
    _id: '4',
    patientName: 'Eleanor Vance',
    doctorName: 'Dr. Michael Vance',
    date: '2026-08-28',
    timeSlot: '09:00 AM',
    status: 'confirmed',
    reason: 'Post-knee surgery rehabilitation follow-up',
  },
  {
    _id: '5',
    patientName: 'David Miller',
    doctorName: 'Dr. Aisha Patel',
    date: '2026-08-29',
    timeSlot: '03:15 PM',
    status: 'pending',
    reason: 'Skin allergy screening & mole inspection',
  },
  {
    _id: '6',
    patientName: 'Samantha Ray',
    doctorName: 'Dr. David Miller',
    date: '2026-08-30',
    timeSlot: '01:00 PM',
    status: 'confirmed',
    reason: 'Comprehensive Eye Exam & Vision Test',
  },
  {
    _id: '7',
    patientName: 'Carlos Gomez',
    doctorName: 'Dr. Sophia Martinez',
    date: '2026-08-31',
    timeSlot: '10:30 AM',
    status: 'cancelled',
    reason: 'Stress management & anxiety consultation',
  },
  {
    _id: '8',
    patientName: 'Hannah Abbott',
    doctorName: 'Dr. James Wilson',
    date: '2026-09-01',
    timeSlot: '04:00 PM',
    status: 'pending',
    reason: 'Pre-surgery evaluation for hernia repair',
  },
  {
    _id: '9',
    patientName: 'Liam Gallagher',
    doctorName: 'Dr. Marcus Brody',
    date: '2026-09-02',
    timeSlot: '09:30 AM',
    status: 'confirmed',
    reason: 'Asthma checkup & pulmonary function test',
  },
  {
    _id: '10',
    patientName: 'Chloe Bennett',
    doctorName: 'Dr. Olivia Vance',
    date: '2026-09-03',
    timeSlot: '02:15 PM',
    status: 'pending',
    reason: 'Thyroid screening & hormone consultation',
  },
];

// GET /api/v1/appointments - Return all appointments
router.get('/', async (req, res, next) => {
  try {
    if (getIsConnected()) {
      const appointments = await Appointment.find()
        .populate('patientId', 'name email phone bloodGroup age')
        .populate('doctorId', 'name specialisation email available');
      return res.status(200).json(appointments.length > 0 ? appointments : initialAppointments);
    }
    res.status(200).json(initialAppointments);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/appointments - Create a new appointment
router.post('/', async (req, res, next) => {
  try {
    const { patientName, doctorName, date, timeSlot, status, reason, patientId, doctorId } = req.body;

    if (getIsConnected() && (patientId || doctorId)) {
      const appointment = new Appointment({
        patientId,
        doctorId,
        date,
        timeSlot,
        status: status || 'pending',
        reason,
      });
      const saved = await appointment.save();
      return res.status(201).json(saved);
    }

    // In-memory or fallback format
    const newAppointment = {
      _id: String(Date.now()),
      patientName: patientName || 'Anonymous Patient',
      doctorName: doctorName || 'General Practitioner',
      date: date || new Date().toISOString().split('T')[0],
      timeSlot: timeSlot || '09:00 AM',
      status: status || 'pending',
      reason: reason || '',
    };
    initialAppointments.push(newAppointment);
    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/appointments/:id - Update existing appointment (Status, TimeSlot, Doctor, Date)
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, timeSlot, doctorName, date, reason } = req.body;

    if (getIsConnected()) {
      const updated = await Appointment.findByIdAndUpdate(
        id,
        { status, timeSlot, date, reason },
        { new: true, runValidators: true }
      );
      if (updated) {
        return res.status(200).json(updated);
      }
    }

    // In-memory fallback update
    const index = initialAppointments.findIndex((item) => item._id === id);
    if (index !== -1) {
      initialAppointments[index] = {
        ...initialAppointments[index],
        ...(status && { status }),
        ...(timeSlot && { timeSlot }),
        ...(doctorName && { doctorName }),
        ...(date && { date }),
        ...(reason !== undefined && { reason }),
      };
      return res.status(200).json(initialAppointments[index]);
    }

    res.status(404).json({ success: false, error: 'Appointment not found' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
