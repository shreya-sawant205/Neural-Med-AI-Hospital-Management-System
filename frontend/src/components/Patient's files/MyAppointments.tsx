import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyAppointments.css";
import axios from "axios";

interface Appointment {
  appointmentId: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  status:string
}

const MyAppointments: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {

     if(!appointments.length){
      const patient = JSON.parse(localStorage.getItem("user") || "");

      const patientId = patient["user_id"];

      axios.get(`http://localhost:5000/api/appointments/getappointments/${patientId}`)
      .then(response => {
            setAppointments(response.data)
        })
        .catch(error => {
          console.error(error);
          alert("Something went wrong, please try after sometime!!")
        });
     }
     
  });

  return (
    <div className="medical-records-container">
      {/* HEADER WRAPPER - This is the key change */}
      <div className="medical-header">
        <h2>My Appointments</h2>
        <button
          className="medical-back-btn"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      {/* CONTENT SECTION */}
      <div className="records-section">
        {appointments.length === 0 ? (
          <p className="no-records">No appointments booked yet.</p>
        ) : (
          <div className="records-list">
            {appointments.map((appt, index) => (
              <div className="record-card" key={index}>
                <p><strong>Appointment ID:</strong> {appt.appointmentId}</p>
                <p><strong>Doctor:</strong> {appt.doctor}</p>
                <p><strong>Date:</strong> {formatDate(appt.date)}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <p><strong>Reason:</strong> {appt.reason}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;



























