import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewPrescription.css";
import axios from "axios";

interface Prescription {
  patient_name: string;
  doctor_name: string;
  medicines: string;
  instructions: string;
}

const ViewPrescription: React.FC = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  const handlePrescribeClick = () => {
  setShowPopup(true);

  setTimeout(() => {
    setShowPopup(false);
  }, 2000);
};

useEffect(() => {
  axios
    .get("http://localhost:5000/api/prescriptions/getallprescriptions")
    .then((response) => {
      setPrescriptions(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);
  

  return (
    <div className="view-prescription">

      <div className="prescription-header">
      <h2>Patient Prescriptions</h2>

      <button className="back-btn" onClick={() => navigate(-1)}>
      Back
    </button>
   </div>

      <div className="prescription-table">

        <div className="table-header">
          <span>Patient Name</span>
          <span>Doctor</span>
          <span>Medicines</span>
          <span>Notes</span>
          <span>Actions</span>
        </div>

        {prescriptions.map((p, index) => (
          <div className="table-row" key={index}>
            <span>{p.patient_name}</span>
            <span>{p.doctor_name}</span>
            <span>{p.medicines}</span>
            <span>{p.instructions}</span>
            <span>
              <button 
         className="prescribed-btn"
        onClick={handlePrescribeClick}
     >
      Prescribed
    </button>
      
       
            </span>
          </div>
        ))}

      </div>
     {showPopup && (
  <div className="popup">
    Prescription Prescribed Successfully ✅
  </div>
)}
    </div>
  );
};

export default ViewPrescription;