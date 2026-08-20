const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { getIsConnected } = require('../config/db');

// In-memory initial fallback appointments dataset
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

// GET /api/v1/appointments - Return all appointments (DB or In-Memory)
router.get('/', async (req, res, next) => {
  try {
    if (getIsConnected()) {
      const dbAppointments = await Appointment.find()
        .populate('patientId', 'name email phone bloodGroup age')
        .populate('doctorId', 'name specialisation email available');

      if (dbAppointments.length > 0) {
        // Map populated MongoDB records + any in-memory additions
        const formattedDB = dbAppointments.map((item) => ({
          _id: item._id,
          patientName: item.patientId?.name || item.patientName || 'Patient',
          doctorName: item.doctorId?.name || item.doctorName || 'Doctor',
          date: item.date,
          timeSlot: item.timeSlot,
          status: item.status,
          reason: item.reason,
        }));
        
        // Merge DB appointments with any temporary in-memory appointments
        const combined = [...formattedDB, ...initialAppointments];
        // Deduplicate by patientName + date
        const unique = Array.from(new Set(combined.map(a => `${a.patientName}-${a.date}-${a.timeSlot}`)))
          .map(key => combined.find(a => `${a.patientName}-${a.date}-${a.timeSlot}` === key));
          
        return res.status(200).json(unique);
      }
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

    const nameToUse = patientName || 'New Patient';
    const docNameToUse = doctorName || 'Dr. Sarah Jenkins';
    const apptStatus = status || 'pending';
    const apptDate = date || new Date().toISOString().split('T')[0];
    const apptTime = timeSlot || '09:00 AM';

    if (getIsConnected()) {
      let finalPatientId = patientId;
      let finalDoctorId = doctorId;

      // Find or create Patient document
      if (!finalPatientId) {
        let patientDoc = await Patient.findOne({ name: nameToUse });
        if (!patientDoc) {
          const emailSlug = nameToUse.toLowerCase().replace(/[^a-z0-9]/g, '');
          patientDoc = await Patient.create({
            name: nameToUse,
            email: `${emailSlug}.${Date.now()}@patient.medcare.com`,
            phone: '+1-555-0100',
            bloodGroup: 'O+',
            age: 30,
          });
        }
        finalPatientId = patientDoc._id;
      }

      // Find or create Doctor document
      if (!finalDoctorId) {
        let doctorDoc = await Doctor.findOne({ name: docNameToUse });
        if (!doctorDoc) {
          doctorDoc = await Doctor.create({
            name: docNameToUse,
            email: `doctor.${Date.now()}@medcare.com`,
            specialisation: 'General Medicine',
            available: true,
          });
        }
        finalDoctorId = doctorDoc._id;
      }

      const appointment = new Appointment({
        patientId: finalPatientId,
        doctorId: finalDoctorId,
        date: apptDate,
        timeSlot: apptTime,
        status: apptStatus,
        reason: reason || '',
      });

      const saved = await appointment.save();
      const populatedSaved = await Appointment.findById(saved._id)
        .populate('patientId', 'name')
        .populate('doctorId', 'name');

      const responseObj = {
        _id: populatedSaved._id,
        patientName: populatedSaved.patientId?.name || nameToUse,
        doctorName: populatedSaved.doctorId?.name || docNameToUse,
        date: populatedSaved.date,
        timeSlot: populatedSaved.timeSlot,
        status: populatedSaved.status,
        reason: populatedSaved.reason,
      };

      // Also add to in-memory list so it's guaranteed returned immediately
      initialAppointments.unshift(responseObj);

      return res.status(201).json(responseObj);
    }

    // In-memory storage
    const newAppointment = {
      _id: String(Date.now()),
      patientName: nameToUse,
      doctorName: docNameToUse,
      date: apptDate,
      timeSlot: apptTime,
      status: apptStatus,
      reason: reason || '',
    };
    initialAppointments.unshift(newAppointment);
    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/appointments/:id - Update existing appointment
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, timeSlot, doctorName, date, reason } = req.body;

    if (getIsConnected()) {
      const updated = await Appointment.findByIdAndUpdate(
        id,
        {
          ...(status && { status }),
          ...(timeSlot && { timeSlot }),
          ...(date && { date }),
          ...(reason !== undefined && { reason }),
        },
        { new: true, runValidators: true }
      );
      if (updated) {
        return res.status(200).json(updated);
      }
    }

    // In-memory update fallback
    const index = initialAppointments.findIndex((item) => String(item._id) === String(id));
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
