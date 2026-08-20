const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// In-Memory Fallback Appointments Data with Distinct Blood Groups
let initialAppointments = [
  {
    _id: '1',
    patientName: 'John Doe',
    bloodGroup: 'A+',
    doctorName: 'Dr. Sarah Jenkins',
    date: '2026-08-25',
    timeSlot: '10:00 AM',
    status: 'confirmed',
    reason: 'Routine Cardiology Follow-up',
  },
  {
    _id: '2',
    patientName: 'Alice Smith',
    bloodGroup: 'B+',
    doctorName: 'Dr. Robert Chen',
    date: '2026-08-26',
    timeSlot: '02:30 PM',
    status: 'pending',
    reason: 'Frequent Migraine Headaches',
  },
  {
    _id: '3',
    patientName: 'Michael Brown',
    bloodGroup: 'O-',
    doctorName: 'Dr. Emily Taylor',
    date: '2026-08-27',
    timeSlot: '11:15 AM',
    status: 'cancelled',
    reason: 'Pediatric Vaccine Consultation',
  },
  {
    _id: '4',
    patientName: 'Krishkumar Darji',
    bloodGroup: 'O+',
    doctorName: 'Dr. Sarah Jenkins',
    date: '2026-08-28',
    timeSlot: '09:00 AM',
    status: 'confirmed',
    reason: 'General Physical Health Check',
  },
  {
    _id: '5',
    patientName: 'Eleanor Vance',
    bloodGroup: 'AB+',
    doctorName: 'Dr. Michael Vance',
    date: '2026-08-29',
    timeSlot: '03:15 PM',
    status: 'pending',
    reason: 'Knee Joint Pain Consultation',
  },
  {
    _id: '6',
    patientName: 'David Miller',
    bloodGroup: 'A-',
    doctorName: 'Dr. Aisha Patel',
    date: '2026-08-30',
    timeSlot: '01:00 PM',
    status: 'confirmed',
    reason: 'Skin Rash & Dermatology Screening',
  },
  {
    _id: '7',
    patientName: 'Samantha Ray',
    bloodGroup: 'B-',
    doctorName: 'Dr. David Miller',
    date: '2026-08-31',
    timeSlot: '10:30 AM',
    status: 'cancelled',
    reason: 'Eye Vision Checkup',
  },
  {
    _id: '8',
    patientName: 'Carlos Gomez',
    bloodGroup: 'AB-',
    doctorName: 'Dr. Sophia Martinez',
    date: '2026-09-01',
    timeSlot: '04:00 PM',
    status: 'pending',
    reason: 'Stress & Mental Health Evaluation',
  },
  {
    _id: '9',
    patientName: 'Hannah Abbott',
    bloodGroup: 'A+',
    doctorName: 'Dr. James Wilson',
    date: '2026-09-02',
    timeSlot: '09:30 AM',
    status: 'confirmed',
    reason: 'Abdominal Pain Evaluation',
  },
  {
    _id: '10',
    patientName: 'Liam Gallagher',
    bloodGroup: 'B+',
    doctorName: 'Dr. Marcus Brody',
    date: '2026-09-03',
    timeSlot: '02:15 PM',
    status: 'pending',
    reason: 'Shortness of Breath Checkup',
  },
];

// GET /api/v1/appointments - Fetch all appointments
router.get('/', async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId')
      .populate('doctorId');
    
    if (appointments.length > 0) {
      return res.status(200).json(appointments);
    }
    return res.status(200).json(initialAppointments);
  } catch (err) {
    return res.status(200).json(initialAppointments);
  }
});

// POST /api/v1/appointments - Create new appointment
router.post('/', async (req, res, next) => {
  try {
    const { patientName, bloodGroup, doctorName, date, timeSlot, status, reason } = req.body;

    if (!patientName || !date) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: ['patientName and date are required fields'],
      });
    }

    try {
      // Find or create patient
      let patient = await Patient.findOne({ name: patientName });
      if (!patient) {
        const cleanName = patientName.toLowerCase().replace(/\s+/g, '');
        patient = await Patient.create({
          name: patientName,
          email: `${cleanName}${Date.now()}@example.com`,
          bloodGroup: bloodGroup || 'O+',
        });
      }

      // Find doctor
      let doctor = await Doctor.findOne({ name: doctorName });
      if (!doctor) {
        doctor = await Doctor.create({
          name: doctorName || 'Dr. Specialist',
          specialisation: 'General Medicine',
        });
      }

      const newAppointment = await Appointment.create({
        patientId: patient._id,
        doctorId: doctor._id,
        date,
        timeSlot: timeSlot || '09:00 AM',
        status: status || 'pending',
        reason: reason || '',
      });

      const populated = await Appointment.findById(newAppointment._id)
        .populate('patientId')
        .populate('doctorId');

      return res.status(201).json(populated);
    } catch (dbErr) {
      // Fallback in-memory
      const fallbackAppt = {
        _id: String(Date.now()),
        patientName,
        bloodGroup: bloodGroup || 'O+',
        doctorName: doctorName || 'Dr. Specialist',
        date,
        timeSlot: timeSlot || '09:00 AM',
        status: status || 'pending',
        reason: reason || '',
      };
      initialAppointments.unshift(fallbackAppt);
      return res.status(201).json(fallbackAppt);
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/v1/appointments/:id - Update existing appointment
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, doctorName, date, timeSlot, reason } = req.body;

    try {
      const appt = await Appointment.findById(id);
      if (appt) {
        if (status) appt.status = status;
        if (date) appt.date = date;
        if (timeSlot) appt.timeSlot = timeSlot;
        if (reason !== undefined) appt.reason = reason;
        if (doctorName) {
          let doc = await Doctor.findOne({ name: doctorName });
          if (!doc) {
            doc = await Doctor.create({ name: doctorName, specialisation: 'General Medicine' });
          }
          appt.doctorId = doc._id;
        }
        await appt.save();
        const updated = await Appointment.findById(id).populate('patientId').populate('doctorId');
        return res.status(200).json(updated);
      }
    } catch (dbErr) {
      // Fallback
    }

    // In-memory update
    const index = initialAppointments.findIndex((a) => a._id === id);
    if (index !== -1) {
      initialAppointments[index] = {
        ...initialAppointments[index],
        ...(status && { status }),
        ...(doctorName && { doctorName }),
        ...(date && { date }),
        ...(timeSlot && { timeSlot }),
        ...(reason !== undefined && { reason }),
      };
      return res.status(200).json(initialAppointments[index]);
    }

    return res.status(404).json({ success: false, error: 'Appointment not found' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
