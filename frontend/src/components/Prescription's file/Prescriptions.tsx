import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Prescriptions.css";

interface Prescriptions {
  prescription_id: string;
  medicines: string;
  instructions: string;
  date: string;
  doctor_name: string;
}

const Prescriptions: React.FC = () => {
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions]= useState<Prescriptions[]>([]);
  const [loading, setLoading] = useState(true);
  const patient = JSON.parse(localStorage.getItem("user") || "");
  const patientId = patient["user_id"];

  useEffect(() => {
    if (!patientId) return;

    if(!prescriptions.length){
        axios.get(
                `http://localhost:5000/api/prescriptions/getprescriptions/${patientId}`
              )
              .then((response) => {
                setPrescriptions(response.data);
                setLoading(false);
              })
              .catch((error) => {
                console.error(error);
                setLoading(false);
              });  

    }

  })

  return (
    <div className="prescriptions-page">
      <div className="page-header">
        <h2>Prescriptions</h2>

        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

        {loading ? (
        <p>Loading...</p>
      ) : prescriptions.length === 0 ? (
        <p>No prescriptions available.</p>
      ) : (
         
        prescriptions.map((p) => (
          <div key={p.prescription_id} className="prescription-card">
            <p><strong>Date:</strong> {p.date}</p>
            <p><strong>Doctor:</strong> {p.doctor_name}</p>
            <p><strong>Medicines:</strong> {p.medicines}</p>
            <p><strong>Instructions:</strong> {p.instructions}</p>
      </div>
  ))
      )}
    </div>
  );
};

export default Prescriptions;






















