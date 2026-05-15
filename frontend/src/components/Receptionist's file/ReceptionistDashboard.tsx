import React from "react";
import { useNavigate } from "react-router-dom";
import "./ReceptionistDashboard.css";
import ProfileDetails from "../Profile Card/ProfileDetails";

import userImg from "../../../src/assets/receptionist.jpg";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const receptionist = JSON.parse(localStorage.getItem("user") || "{}")
  

  const handleLogout = (): void => {
    localStorage.clear();   // remove login info
    navigate("/login");     // redirect to login
  };

  return (
    <div className="receptionist-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Receptionist Dashboard</h2>
      <div className="header-right">
           <span className="name">{`${receptionist["first_name"]} ${receptionist["last_name"]}`}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>


      {/* Dashboard Cards */}
      <div className="dashboard-cards">
        <div
          className="card"
          onClick={() => navigate("/View-Patients-Prescription")}
        >
          View Patients Prescription
        </div>

        <div
          className="card"
          onClick={() => navigate("/billing")}
        >
          Billing
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

export default AdminDashboard;










































