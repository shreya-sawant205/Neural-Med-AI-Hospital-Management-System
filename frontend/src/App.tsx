import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Home page files/Homepage";
import Login from "./components/Login page file/Login";
import Register from "./components/Registration page files/Register";
import PatientDashboard from "./components/Patient's files/PatientDashboard";
import DoctorDashboard from "./components/Doctor's files/DoctorDashboard";
import AdminDashboard from "./components/Admin's file/AdminDashboard";
import ReceptionistDashboard from "./components/Receptionist's file/ReceptionistDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import BookAppointment from "./components/Patient's files/BookAppointment";
import MyAppointments from "./components/Patient's files/MyAppointments";
import Prescriptions from "./components/Prescription's file/Prescriptions";
import MyProfile from "./components/Patient's files/MyProfile";
import ScheduledAppointments from "./components/Doctor's files/ScheduledAppointments";
import PatientRecords from "./components/Doctor's files/PatientRecords";
import ProvidePrescription from "./components/Doctor's files/ProvidePrescription";
import DoctorsList from "./components/Admin's file/DoctorsList";
import ReceptionistList from "./components/Admin's file/ReceptionistList";
import AdminProfile from "./components/Admin's file/AdminProfile";
import ViewPrescription from "./components/Receptionist's file/ViewPrescription";
import Billing from "./components/Receptionist's file/Billing";
import ReceptionistProfile from "./components/Receptionist's file/ReceptionistProfile";
import MedicalRecords from "./components/Patient's files/MedicalRecords";
import UpdateProfile from "./components/Profile Card/UpdateProfile";
import Help from "./components/Home page files/Help";
import AboutUs from "./components/Home page files/AboutUs";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/about" element={<AboutUs />} />
<Route path="/help" element={<Help />} />

<Route
  path="/patient-dashboard"
  element={
    <ProtectedRoute allowedRole="patient">
      <PatientDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/book-appointment"
  element={
    <ProtectedRoute>
      <BookAppointment />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-appointments"
  element={
    <ProtectedRoute>
      <MyAppointments />
    </ProtectedRoute>
  }
/>
<Route
  path="/Prescriptions"
  element={
    <ProtectedRoute allowedRole="patient">
      <Prescriptions />
    </ProtectedRoute>
  }
/>
<Route
path="/medical-records"
  element={
    <ProtectedRoute allowedRole="patient">
      <MedicalRecords />
    </ProtectedRoute>
  }
/>
<Route
path="/my-profile"
  element={
    <ProtectedRoute allowedRole="patient">
      <MyProfile />
    </ProtectedRoute>
  }
  />

<Route
  path="/doctor-dashboard"
  element={
    <ProtectedRoute allowedRole="doctor">
      <DoctorDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/scheduled-appointments"
  element={
    <ProtectedRoute allowedRole="doctor">
      <ScheduledAppointments />
    </ProtectedRoute>
  }
/>
<Route
  path="/patient-records"
  element={
    <ProtectedRoute allowedRole="doctor">
      <PatientRecords />
    </ProtectedRoute>
  }
/>
<Route
  path="/provide-prescription"
  element={
    <ProtectedRoute allowedRole="doctor">
      <ProvidePrescription />
    </ProtectedRoute>
  }
/>
<Route
  path="/update-profile"
  element={
    <ProtectedRoute allowedRole="">
      <UpdateProfile />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/doctors-list"
  element={
    <ProtectedRoute allowedRole="admin">
      <DoctorsList />
    </ProtectedRoute>
  }
/>
<Route
  path="/reseptionist-list"
  element={
    <ProtectedRoute allowedRole="admin">
      <ReceptionistList />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin-profile"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/receptionist-dashboard"
  element={
    <ProtectedRoute allowedRole="receptionist">
      <ReceptionistDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/View-Patients-Prescription"
  element={
    <ProtectedRoute allowedRole="receptionist">
      <ViewPrescription />
    </ProtectedRoute>
  }
/>
<Route
  path="/billing"
  element={
    <ProtectedRoute allowedRole="receptionist">
      <Billing />
    </ProtectedRoute>
  }
/>
<Route
  path="/receptionist-profile"
  element={
    <ProtectedRoute allowedRole="receptionist">
      <ReceptionistProfile />
    </ProtectedRoute>
  }
/>
      </Routes>    
    </BrowserRouter>
  );
}

export default App;















































