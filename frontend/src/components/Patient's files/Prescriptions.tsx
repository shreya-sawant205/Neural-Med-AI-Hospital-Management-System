import React from "react";
import { useNavigate } from "react-router-dom";
import "./Prescriptions.css";

const Prescriptions: React.FC = () => {
  const navigate = useNavigate();

  return (
  <div className="prescriptions-page">
    <div className="page-header">
      <h2>Prescriptions</h2>
      <h2>THIS IS PRESCRIPTION PAGE</h2>
      <button className="back-btn" onClick={() => navigate(-1)}>
        BACK
      </button>
    </div>

    <div className="prescriptions-content">
      <div style={{ color: "red" }}>TEST</div>   {/* 👈 ADD HERE */}
      <p className="no-records">No prescriptions available.</p>
    </div>
  </div>
);
};

export default Prescriptions;






















