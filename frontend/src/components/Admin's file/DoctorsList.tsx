import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorsList.css";
import axios from "axios";

interface Doctor {
  user_id:string;
  name: string;
  email:string;
  contact:string;
  specialization: string;
  shift_start:string;
  shift_end:string;
}


const DoctorsList: React.FC = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState<Doctor[]>([])

    useEffect(()=>{
     
        axios.get("http://localhost:5000/api/doctors/getdoctors")
        .then(response => {
              setDoctors(response.data)
          })
          .catch(error => {
            console.error(error);
            alert("Something went wrong, please try after sometime!!")
          });
      }
    )

  return (
    <div className="staff-container">
    <div className="staff-header">
  <h2>HOSPITAL STAFF SCHEDULE</h2>

  <button className="back-btn" onClick={() => navigate(-1)}>
    Back
  </button>
</div>

     

      <div className="staff-table">

        {/* Table Heading */}
        <div className="staff-row staff-header">
          <span>Doctor Name</span>
          <span>Email</span>
          <span>Contact</span>
          <span>Specialization</span>
          <span>Shift Timing</span>
        </div>

        {/* Data Rows */}
        {doctors.map((doc, index) => (
          <div className="staff-row" key={index}>
            <span>{doc.name}</span>
            <span>{doc.email}</span>
            <span>{doc.contact}</span>
            <span>{doc.specialization}</span>
            <span>{doc.shift_start ? (doc.shift_start + " - " + doc.shift_end) : ""}</span>
          </div>
        ))}

      </div>

    </div>
  );
};

export default DoctorsList;









































