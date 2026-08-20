# MedCare Plus - Hospital Appointment System

MedCare Plus is a modern Hospital Appointment System developed for managing doctors, patients, and appointment scheduling.

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Environment Variables](#environment-variables)
3. [MongoDB Setup](#mongodb-setup)
4. [Backend Setup & Run Command](#backend-setup--run-command)
5. [Frontend Setup & Run Command](#frontend-setup--run-command)
6. [API Endpoints Reference](#api-endpoints-reference)

---

## 🏥 Project Overview
- **Tasks Implemented:**
  - **Task 1 — React Component Architecture:** Reusable `AppointmentCard` component in `/components` with prop rendering and dynamic CSS status badges (`confirmed`, `pending`, `cancelled`).
  - **Task 2 — React Routing & State Management:** Configured React Router DOM (`/`, `/doctors`, `/booking`) with non-reloading `Navbar` and stateful appointment form (`useState`) with live state previews.
  - **Task 3 — Express REST API + Middleware:** Built Express API (`GET /api/v1/doctors`, `GET /api/v1/appointments`, `POST /api/v1/appointments`), custom global `requestLogger` middleware (`[METHOD] [PATH] [TIMESTAMP]`), and structured JSON `errorHandler`.
  - **Task 4 — REST API Consumption in React:** `DoctorsPage` fetching data from backend using `fetch` inside `useEffect()`, handling `data`, `loading`, and `error` states.
  - **Task 5 — MongoDB + Mongoose Schema Design & Validation:** Mongoose schemas for `Patient`, `Doctor`, and `Appointment` with ObjectId references, enums, required validation rules, and custom error formatting.

---

## 🔑 Environment Variables
Create a `.env` file in the root and `backend/` directories based on `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/medcare_plus
```

> [!NOTE]
> `.env.example` is committed to the repository. The `.env` file containing sensitive environment configs is ignored by `.gitignore`.

---

## 🛢️ MongoDB Setup
1. Ensure MongoDB service is running locally on port `27017` or use MongoDB Atlas.
2. The backend automatically connects using `process.env.MONGO_URI`.
3. If MongoDB is connected, documents will be stored in the `medcare_plus` database.
4. To test MongoDB schema validation & CRUD operations, trigger:
   - `GET http://localhost:5000/api/v1/test/demo` (Runs Mongoose Patient/Doctor/Appointment creation & populated references).
   - `POST http://localhost:5000/api/v1/test/validate-patient` (Tests invalid blood groups or missing fields).

---

## ⚙️ Backend Setup & Run Command

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Run the Backend Server
```bash
node server.js
```
or
```bash
npm start
```
The server will start on `http://localhost:5000`.

---

## 💻 Frontend Setup & Run Command

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run the Frontend Development Server
```bash
npm run dev
```
The React frontend will be available at `http://localhost:3000`.

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/v1/doctors` | Retrieve all doctors list |
| **GET** | `/api/v1/appointments` | Retrieve all appointments |
| **POST** | `/api/v1/appointments` | Create a new appointment |
| **GET** | `/api/v1/test/demo` | Test Mongoose DB operations & references |
| **POST** | `/api/v1/test/validate-patient` | Test Patient schema validation failure |
| **POST** | `/api/v1/test/validate-appointment` | Test Appointment schema validation failure |
