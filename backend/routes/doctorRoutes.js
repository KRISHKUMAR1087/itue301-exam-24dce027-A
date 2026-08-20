const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const { getIsConnected } = require('../config/db');

// In-memory initial doctor dataset
const initialDoctors = [
  {
    _id: '1',
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@medcare.com',
    specialisation: 'Cardiology',
    available: true,
  },
  {
    _id: '2',
    name: 'Dr. Robert Chen',
    email: 'robert.chen@medcare.com',
    specialisation: 'Neurology',
    available: true,
  },
  {
    _id: '3',
    name: 'Dr. Emily Taylor',
    email: 'emily.taylor@medcare.com',
    specialisation: 'Pediatrics',
    available: false,
  },
  {
    _id: '4',
    name: 'Dr. Michael Vance',
    email: 'michael.vance@medcare.com',
    specialisation: 'Orthopedics',
    available: true,
  },
];

// GET /api/v1/doctors - Return all doctors
router.get('/', async (req, res, next) => {
  try {
    if (getIsConnected()) {
      let doctors = await Doctor.find();
      // If DB is empty, auto-seed initial doctors for convenience
      if (doctors.length === 0) {
        doctors = await Doctor.insertMany([
          { name: 'Dr. Sarah Jenkins', email: 'sarah.jenkins@medcare.com', specialisation: 'Cardiology', available: true },
          { name: 'Dr. Robert Chen', email: 'robert.chen@medcare.com', specialisation: 'Neurology', available: true },
          { name: 'Dr. Emily Taylor', email: 'emily.taylor@medcare.com', specialisation: 'Pediatrics', available: false },
          { name: 'Dr. Michael Vance', email: 'michael.vance@medcare.com', specialisation: 'Orthopedics', available: true },
        ]);
      }
      return res.status(200).json(doctors);
    }
    // Fallback in-memory
    res.status(200).json(initialDoctors);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/doctors - Create doctor (Mongoose model validation support)
router.post('/', async (req, res, next) => {
  try {
    if (getIsConnected()) {
      const doctor = new Doctor(req.body);
      const savedDoctor = await doctor.save();
      return res.status(201).json(savedDoctor);
    }
    const newDoc = { _id: String(Date.now()), ...req.body, available: req.body.available ?? true };
    initialDoctors.push(newDoc);
    res.status(201).json(newDoc);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
