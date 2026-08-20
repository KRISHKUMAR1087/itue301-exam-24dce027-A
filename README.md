# 🏥 MedCare Plus — Hospital Appointment System

[![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-007aff?style=flat-square&logo=react)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Backend-Express.js-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%7C%20Mongoose-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/Exam-ITUE301--SetA-blueviolet?style=flat-square)]()

MedCare Plus is a modern, full-stack Hospital Appointment Management System developed for managing medical specialists, patients, and appointment scheduling.

---

## 📁 Repository Structure

```
itue301-exam-24dce027-A/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── AppointmentCard.jsx
│   │   │   ├── EditAppointmentModal.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── DoctorsPage.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── logger.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Patient.js
│   │   ├── Doctor.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── doctorRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── testRoutes.js
│   ├── server.js
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
```

---

## 🎯 Task Implementation Summary

| Task | Category | Description | Status |
| :--- | :--- | :--- | :---: |
| **Task 1** | **React Architecture** | Reusable `AppointmentCard` in `/components` with props (`patientName`, `doctorName`, `date`, `timeSlot`, `status`) and dynamic status badges (`confirmed`, `pending`, `cancelled`). | ✅ 100% Completed |
| **Task 2** | **React Routing & State** | React Router setup (`/`, `/doctors`, `/booking`), floating iOS `Navbar`, and stateful form in `BookingPage` (`useState`) with live state preview sidebar. | ✅ 100% Completed |
| **Task 3** | **Express REST API** | Express backend with `GET /api/v1/appointments`, `POST /api/v1/appointments`, `GET /api/v1/doctors`, custom `requestLogger` middleware (`[METHOD] [PATH] [TIMESTAMP]`), and global JSON `errorHandler`. | ✅ 100% Completed |
| **Task 4** | **REST API Consumption** | `DoctorsPage` fetching `GET /api/v1/doctors` asynchronously via `useEffect()`, maintaining `data`, `loading`, and `error` states, and rendering Doctor Name, Specialisation, and Availability. | ✅ 100% Completed |
| **Task 5** | **MongoDB & Mongoose** | Mongoose schemas for `Patient`, `Doctor`, and `Appointment` with ObjectId references, enums, required validation rules, `.env` URI connection, and structured error responses. | ✅ 100% Completed |

---

## 🔑 1. Required Environment Variables

Create a `.env` file in the root directory and in the `backend/` directory based on `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/medcare_plus
```

> [!IMPORTANT]
> The connection string is loaded from `.env` via `process.env.MONGO_URI` and is **never hardcoded**. `.env.example` is committed to the repository, while `.env` is ignored by `.gitignore`.

---

## 🛢️ 2. MongoDB Setup & Validation Testing

1. Ensure local MongoDB service is running on port `27017` (e.g. `mongodb://localhost:27017/medcare_plus`) or provide a MongoDB Atlas connection string in `.env`.
2. The backend automatically establishes a Mongoose connection upon startup.
3. **MongoDB Operation & Validation Test Endpoints**:
   - `GET http://localhost:5000/api/v1/test/demo`: Demonstrates Patient, Doctor, and Appointment creation, ObjectId referencing, and populated queries.
   - `POST http://localhost:5000/api/v1/test/validate-patient`: Demonstrates structured JSON error response when triggering schema validation failures (e.g., invalid blood group `Z+`).

---

## ⚙️ 3. Backend Setup & Run Command

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Run the Express Server
```bash
npm start
```
*Alternatively:*
```bash
node server.js
```
The backend API server will start on **`http://localhost:5000`**.

---

## 💻 4. Frontend Setup & Run Command

### Step 1: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 2: Start the Vite Development Server
```bash
npm run dev
```
The React frontend will be available at **`http://localhost:3000`**.

---

## 📡 REST API Endpoint Reference

| Method | Endpoint | Purpose | Response Code |
| :--- | :--- | :--- | :---: |
| **GET** | `/api/v1/doctors` | Retrieve list of medical specialists | `200 OK` |
| **PUT** | `/api/v1/doctors/:id` | Update doctor availability status | `200 OK` |
| **GET** | `/api/v1/appointments` | Retrieve all scheduled appointments | `200 OK` |
| **POST** | `/api/v1/appointments` | Book a new appointment | `201 Created` |
| **PUT** | `/api/v1/appointments/:id` | Update appointment details or status | `200 OK` |
| **GET** | `/api/v1/test/demo` | Demonstrate Mongoose CRUD & populated queries | `200 OK` |
| **POST** | `/api/v1/test/validate-patient` | Test schema validation failure (e.g., blood group) | `400 Bad Request` |

---

## 🌟 Additional Features

- **📱 Floating Centered iOS Navbar**: Frosted glass translucent header (`backdrop-filter: blur(25px)`) with segmented control tabs.
- **🔳 3x3 Responsive Grid Layout**: Equal-height cards with pixel-perfect alignment.
- **🔍 Search, Filter & Sort**: Real-time search by patient/doctor name, status filtering (`confirmed`, `pending`, `cancelled`), and date sorting.
- **✏️ Editable Appointments Modal**: Allows editing status, assigned doctor, date, and time slot.
- **🟢 Doctor Availability Toggle**: Live toggle on `DoctorsPage` sending `PUT` requests to update availability status.
- **✍️ Live 300-Char Reason Counter**: Character counter badge (`0 / 300 characters`) enforcing Mongoose schema constraints.
- **🏥 Animated Hospital 404 Page**: Custom SVG & CSS keyframe animation under route `path="*"`.
- **💫 Compact Loading Animation**: Compact iOS heartbeat ECG spinner component (`<LoadingSpinner />`).
