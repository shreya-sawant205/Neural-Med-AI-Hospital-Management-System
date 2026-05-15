import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReceptionistList.css";
import axios from "axios";

interface Receptionist {
  user_id:string;
  name: string;
  contact: string;
  shift_start: string;
  shift_end: string;
}

const ReceptionistList: React.FC = () => {

  const navigate = useNavigate();
  const [Receptionist, setReceptiont] = useState<Receptionist[]>([])

  useEffect(()=>{
      if(!Receptionist.length){
        axios.get("http://localhost:5000/api/receptionists/getreceptionists")
        .then(response => {
              setReceptiont(response.data)
          })
          .catch(error => {
            console.error(error);
            alert("Something went wrong, please try after sometime!!")
          });
      }
    })

  return (
    <div className="staff-container">

      <div className="staff-header-bar">

  <h2>RECEPTION STAFF SCHEDULE</h2>

  <button className="back-btn" onClick={() => navigate(-1)}>
    BACK
  </button>

</div>

      <div className="staff-table">

        {/* Header */}
        <div className="staff-row staff-header">
          <span>Staff Name</span>
          <span>Contact Number</span>
          <span>Shift Timing</span>
        </div>

        {/* Rows */}
        {Receptionist.map((receptionist, index) => (
          <div className="staff-row" key={index}>
            <span>{receptionist.name}</span>
            <span>{receptionist.contact}</span>
            <span>{receptionist.shift_start ? (receptionist.shift_start + " - " + receptionist.shift_end) : ""}</span>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ReceptionistList;

















































