const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const { getIsConnected } = require('../config/db');

// Expanded demo doctor dataset (10 distinct medical specialists)
let initialDoctors = [
  {
    _id: '6a86c4dc6d4ccb0f3d7566a8',
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@medcare.com',
    specialisation: 'Cardiology',
    available: true,
  },
  {
    _id: '6a86c4dc6d4ccb0f3d7566a9',
    name: 'Dr. Robert Chen',
    email: 'robert.chen@medcare.com',
    specialisation: 'Neurology',
    available: true,
  },
  {
    _id: '6a86c4dc6d4ccb0f3d7566aa',
    name: 'Dr. Emily Taylor',
    email: 'emily.taylor@medcare.com',
    specialisation: 'Pediatrics',
    available: false,
  },
  {
    _id: '6a86c4dc6d4ccb0f3d7566ab',
    name: 'Dr. Michael Vance',
    email: 'michael.vance@medcare.com',
    specialisation: 'Orthopedics',
    available: true,
  },
  {
    _id: '6a86c4dc6d4ccb0f3d7566ac',
    name: 'Dr. Aisha Patel',
    email: 'aisha.patel@medcare.com',
    specialisation: 'Dermatology',
    available: true,
  },
  {
    _id: '6a86c4dc6d4ccb0f3d7566ad',
    name: 'Dr. David Miller',
    email: 'david.miller@medcare.com',
    specialisation: 'Ophthalmology',
    available: true,
  },
  {
    _id: '6a86c4dc6d4ccb0f3d7566ae',
    name: 'Dr. Sophia Martinez',
    email: 'sophia.martinez@medcare.com',
    specialisation: 'Psychiatry',
    available: false,
  },
  {
    _id: '6a86c4dc6d4ccb0f3d7566af',
    name: 'Dr. James Wilson',
    email: 'james.wilson@medcare.com',
    specialisation: 'General Surgery',
    available: true,
  },
  {
    _id: '6a86c4dc6d4ccb0f3d7566b0',
    name: 'Dr. Marcus Brody',
    email: 'marcus.brody@medcare.com',
    specialisation: 'Pulmonology',
    available: true,
  },
  {
    _id: '6a86c4dc6d4ccb0f3d7566b1',
    name: 'Dr. Olivia Vance',
    email: 'olivia.vance@medcare.com',
    specialisation: 'Endocrinology',
    available: true,
  },
];

// GET /api/v1/doctors - Return all doctors
router.get('/', async (req, res, next) => {
  try {
    if (getIsConnected()) {
      let doctors = await Doctor.find();
      if (doctors.length < initialDoctors.length) {
        await Doctor.deleteMany({});
        doctors = await Doctor.insertMany(
          initialDoctors.map(({ _id, ...doc }) => doc)
        );
      }
      return res.status(200).json(doctors);
    }
    // Fallback in-memory dataset
    res.status(200).json(initialDoctors);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/doctors - Create doctor
router.post('/', async (req, res, next) => {
  try {
    if (getIsConnected()) {
      const doctor = new Doctor(req.body);
      const savedDoctor = await doctor.save();
      return res.status(201).json(savedDoctor);
    }
    const newDoc = {
      _id: String(Date.now()),
      ...req.body,
      available: req.body.available ?? true,
    };
    initialDoctors.push(newDoc);
    res.status(201).json(newDoc);
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/doctors/:id - Update doctor availability status or details
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { available, specialisation, name, email } = req.body;

    if (getIsConnected()) {
      const updatedDoctor = await Doctor.findByIdAndUpdate(
        id,
        {
          ...(available !== undefined && { available }),
          ...(specialisation && { specialisation }),
          ...(name && { name }),
          ...(email && { email }),
        },
        { new: true, runValidators: true }
      );
      if (updatedDoctor) {
        return res.status(200).json(updatedDoctor);
      }
    }

    // In-memory update
    const index = initialDoctors.findIndex((doc) => doc._id === id);
    if (index !== -1) {
      initialDoctors[index] = {
        ...initialDoctors[index],
        ...(available !== undefined && { available }),
        ...(specialisation && { specialisation }),
        ...(name && { name }),
        ...(email && { email }),
      };
      return res.status(200).json(initialDoctors[index]);
    }

    res.status(404).json({ success: false, error: 'Doctor not found' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
