import React from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboard.css";
import ProfileDetails from "../Profile Card/ProfileDetails";

import userImg from "../../../src/assets/doctor.jpg";

const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();

 const doctor = JSON.parse(localStorage.getItem("user") || "{}")

  const handleLogout = (): void => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="doctor-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Doctor Dashboard</h2>

        <div className="header-right">
          <span className="name">{`${doctor["first_name"]} ${doctor["last_name"]}`}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">
        <div
          className="card"
          onClick={() => navigate("/scheduled-appointments")}
        >
          Scheduled Appointments
        </div>

        <div
          className="card"
          onClick={() => navigate("/patient-records")}
        >
          Medical Records of Patients
        </div>

        <div
          className="card"
          onClick={() => navigate("/provide-prescription")}
        >
          Provide Prescription
        </div>

        <div
          className="card"
          onClick={() => navigate("/update-profile")}
        >
          Update Profile
        </div>
      </div>
      <ProfileDetails userImg={userImg}></ProfileDetails>
    </div>
  );
};

export default DoctorDashboard;










