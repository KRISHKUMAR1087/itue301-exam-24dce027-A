const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const { getIsConnected } = require('../config/db');

// GET /api/v1/test/demo - Populate & Demonstrate full MongoDB Mongoose operations
router.get('/demo', async (req, res, next) => {
  try {
    if (!getIsConnected()) {
      return res.status(503).json({
        success: false,
        error: 'Database Connection Offline',
        message: 'MongoDB is not currently connected.',
      });
    }

    // 1. Create Patients
    const patients = await Patient.insertMany([
      {
        name: 'Jane Doe',
        email: `jane.doe.${Date.now()}@example.com`,
        phone: '+1-555-0199',
        bloodGroup: 'O+',
        age: 29,
      },
      {
        name: 'Robert Bruce',
        email: `robert.bruce.${Date.now()}@example.com`,
        phone: '+1-555-0244',
        bloodGroup: 'AB+',
        age: 45,
      },
      {
        name: 'Maria Garcia',
        email: `maria.garcia.${Date.now()}@example.com`,
        phone: '+1-555-0388',
        bloodGroup: 'B-',
        age: 34,
      },
    ]);

    // 2. Create Doctors
    const doctor = await Doctor.create({
      name: 'Dr. Gregory House',
      email: `house.${Date.now()}@medcare.com`,
      specialisation: 'Diagnostic Medicine',
      available: true,
    });

    // 3. Create Appointments with refs
    const appointments = await Appointment.insertMany([
      {
        patientId: patients[0]._id,
        doctorId: doctor._id,
        date: '2026-09-01',
        timeSlot: '10:30 AM',
        status: 'confirmed',
        reason: 'Specialist consultation for diagnostic evaluation.',
      },
      {
        patientId: patients[1]._id,
        doctorId: doctor._id,
        date: '2026-09-02',
        timeSlot: '02:00 PM',
        status: 'pending',
        reason: 'Follow-up laboratory test review.',
      },
      {
        patientId: patients[2]._id,
        doctorId: doctor._id,
        date: '2026-09-03',
        timeSlot: '11:00 AM',
        status: 'cancelled',
        reason: 'Routine health screening.',
      },
    ]);

    // 4. Query & Populate
    const populatedAppointments = await Appointment.find({ doctorId: doctor._id })
      .populate('patientId')
      .populate('doctorId');

    res.status(200).json({
      success: true,
      message: 'MongoDB Mongoose CRUD operations successfully executed & populated!',
      totalAppointmentsCreated: populatedAppointments.length,
      data: populatedAppointments,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/test/validate-patient - Helper endpoint to trigger & test patient validation failure
router.post('/validate-patient', async (req, res, next) => {
  try {
    const patient = new Patient(req.body);
    await patient.validate();
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
