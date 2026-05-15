import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProvidePrescription.css";
import axios from "axios";
import { useLocation } from "react-router-dom";


const ProvidePrescription: React.FC = () => {

  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const [appointmentId, setAppointmentId] = useState(data?.appointmentId);
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [medicines, setMedicines] = useState("");
  const [instructions, setInstructions] = useState("");


  useEffect(()=>{
    getPatientDataByAppointmentId(appointmentId);
  })
  const getPatientDataByAppointmentId = (appointmentId:string)=>{
     axios.get(`http://localhost:5000/api/appointments/getpatientdatabyappointmentid/${appointmentId}`)
      .then(response => {
            setPatientName(response.data["patientName"]);
            setPatientId(response.data["patientId"])
      })
      .catch(error => {
          console.error(error);
          alert("Something went wrong, please try after sometime!!")
      });
  }


  const handleSubmit = (e:any) => {

     e.preventDefault();

    if (!appointmentId || !medicines || !instructions) {
      alert("Please fill all fields");
      return;
    }

    const doctor = JSON.parse(localStorage.getItem("user") || "");

    const doctorId = doctor["user_id"];

    axios.post("http://localhost:5000/api/prescriptions/saveprescription",{
      appointmentId,
      doctorId,
      patientId,
      medicines,
      instructions
    })
    .then(response => {
        if(response.data["response"]){
          alert("Prescription Saved Successfully!");
          setAppointmentId("");
          setPatientName("");
          setMedicines("");
          setInstructions("");
        }
        else{
          alert("Something went wrong, please try after sometime!!")
        }
      })
      .catch(error => {
        console.error(error);
        alert("Something went wrong, please try after sometime!!")
      });
  };

  return (
    <div className="provide-prescription">
      <div className="page-header">
        <h2>Provide Prescription</h2>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>

      <div className="prescription-card">
        <input
          type="text"
          placeholder="Enter Appointment ID"
          value={appointmentId}
        />
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          readOnly
        />

        <textarea
          placeholder="Medicines"
          value={medicines}
          onChange={(e) => setMedicines(e.target.value)}
        />

        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <button onClick={handleSubmit}>Save Prescription</button>
      </div>
    </div>
  );
};

export default ProvidePrescription;
