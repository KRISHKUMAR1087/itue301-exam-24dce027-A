const mongoose = require('mongoose');

// Patient Schema Definition
const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Patient email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Not Known'],
        message: '{VALUE} is not a supported blood group',
      },
      default: 'O+',
    },
    age: {
      type: Number,
      min: [0, 'Age cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Patient', patientSchema);
