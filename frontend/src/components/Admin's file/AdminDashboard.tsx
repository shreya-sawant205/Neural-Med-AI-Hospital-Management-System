import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import ProfileDetails from "../Profile Card/ProfileDetails";

import userImg from "../../../src/assets/admin.jpg";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("user") || "{}")

  const handleLogout = (): void => {
    localStorage.clear();   // remove login info
    navigate("/login");     // redirect to login
  };


  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
      <div className="header-right">
          <span className="name">{`${admin["first_name"]} ${admin["last_name"]}`}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>


      {/* Dashboard Cards */}
      <div className="dashboard-cards">
       


        <div
          className="card"
          onClick={() => navigate("/doctors-list")}
        >
          Doctors List
        </div>


       <div
  className="card"
  onClick={() => navigate("/reseptionist-list")}
>
  Receptionist List
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
















