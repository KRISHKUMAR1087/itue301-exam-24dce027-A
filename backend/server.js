const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const { connectDB } = require('./config/db');
const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser & CORS middleware
app.use(cors());
app.use(express.json());

// Global Request Logger Middleware (Task 3)
app.use(requestLogger);

// REST API Endpoints (Task 3 & Task 5)
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/test', testRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: 'MedCare Plus Hospital Appointment System API',
    version: 'v1',
    status: 'Running',
  });
});

// 404 Route Handler
app.use((req, res, next) => {
  const error = new Error(`Cannot find endpoint ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global Error Handling Middleware (Task 3 & Task 5) - MUST BE LAST
app.use(errorHandler);

// Connect Database and Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[Server Ready] MedCare Plus API running on http://localhost:${PORT}`);
  });
};

startServer();
