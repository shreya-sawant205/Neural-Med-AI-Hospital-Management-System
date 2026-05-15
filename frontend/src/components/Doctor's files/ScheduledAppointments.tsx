import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ScheduledAppointments.css";
import axios from "axios";

interface Appointment {
  appointmentId: string;
  patientName: string;
  date: string;
  time: string;
  reason: string;
  status:string;
  appointmentType: string;
}

const ScheduledAppointments: React.FC = () => {
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
      const doctor = JSON.parse(localStorage.getItem("user") || "");

      const doctorId = doctor["user_id"];

      axios.get(`http://localhost:5000/api/appointments/getappointmentsbydoctorid/${doctorId}`)
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
  <div className="scheduled-page">

    {/* 🔵 HEADER */}
    <div className="scheduled-header">
      <h2>SCHEDULED APPOINTMENTS</h2>

      <button onClick={() => navigate(-1)}>
        Back
      </button>
    </div>

    {/* 📋 CONTENT */}
    <div className="scheduled-content">
      {appointments.length === 0 ? (
        <p className="no-data">No scheduled appointments.</p>
      ) : (
        appointments.map((appt, index) => (
          <div key={index} className="appointment-card">

            <p><strong>Appointment ID:</strong> {appt.appointmentId}</p>
            <p><strong>Patient Name:</strong> {appt.patientName}</p>
            <p><strong>Date:</strong> {formatDate(appt.date)}</p>
            <p><strong>Time:</strong> {appt.time}</p>
            <p><strong>Reason:</strong> {appt.reason}</p>
            <p><strong>Status:</strong> {appt.status}</p>
            <p><strong>Type:</strong> {appt.appointmentType}</p>

            <button
              className="prescription-btn"
              onClick={() =>
                navigate("/provide-prescription", {
                  state: { appointmentId: appt.appointmentId }
                })
              }
            >
              Provide Prescription
            </button>

          </div>
        ))
      )}
    </div>

  </div>
);

}

export default ScheduledAppointments;