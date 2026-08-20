const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const { getIsConnected } = require('../config/db');

// GET /api/v1/test/demo - Demonstrate successful Mongoose CRUD operations
router.get('/demo', async (req, res, next) => {
  try {
    if (!getIsConnected()) {
      return res.status(503).json({
        success: false,
        error: 'Database Connection Offline',
        message: 'MongoDB is not currently connected.',
      });
    }

    // 1. Create Patient
    const patient = await Patient.create({
      name: 'Jane Doe',
      email: `jane.doe.${Date.now()}@example.com`,
      phone: '+1-555-0199',
      bloodGroup: 'O+',
      age: 29,
    });

    // 2. Create Doctor
    const doctor = await Doctor.create({
      name: 'Dr. Gregory House',
      email: `house.${Date.now()}@medcare.com`,
      specialisation: 'Diagnostic Medicine',
      available: true,
    });

    // 3. Create Appointment with refs
    const appointment = await Appointment.create({
      patientId: patient._id,
      doctorId: doctor._id,
      date: '2026-09-01',
      timeSlot: '10:30 AM',
      status: 'confirmed',
      reason: 'Specialist consultation for diagnostic evaluation.',
    });

    // 4. Query & Populate
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('patientId')
      .populate('doctorId');

    res.status(200).json({
      success: true,
      message: 'MongoDB Mongoose operation successfully demonstrated!',
      data: populatedAppointment,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/test/validate-patient - Helper endpoint to trigger & test patient validation failure
router.post('/validate-patient', async (req, res, next) => {
  try {
    const patient = new Patient(req.body);
    await patient.validate(); // triggers schema validation
    if (getIsConnected()) {
      await patient.save();
    }
    res.status(201).json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/test/validate-appointment - Helper endpoint to trigger & test appointment validation failure
router.post('/validate-appointment', async (req, res, next) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.validate();
    if (getIsConnected()) {
      await appointment.save();
    }
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
