const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { getIsConnected } = require('../config/db');

// In-memory fallback appointments dataset
const initialAppointments = [
  {
    _id: '1',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Jenkins',
    date: '2026-08-25',
    timeSlot: '10:00 AM',
    status: 'confirmed',
    reason: 'Routine Cardiology Checkup',
  },
  {
    _id: '2',
    patientName: 'Alice Smith',
    doctorName: 'Dr. Robert Chen',
    date: '2026-08-26',
    timeSlot: '02:30 PM',
    status: 'pending',
    reason: 'Frequent Migraines',
  },
  {
    _id: '3',
    patientName: 'Michael Brown',
    doctorName: 'Dr. Emily Taylor',
    date: '2026-08-27',
    timeSlot: '11:15 AM',
    status: 'cancelled',
    reason: 'Child Fever',
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

module.exports = router;
