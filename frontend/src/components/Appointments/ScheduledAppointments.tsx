import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ScheduledAppointments.css";

interface Appointment {
  appointmentId: string;
  patientName: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
}

const ScheduledAppointments: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

 useEffect(() => {
  const storedAppointments: Appointment[] =
    JSON.parse(localStorage.getItem("appointments") || "[]");

  const doctorName = localStorage.getItem("username");

  const doctorAppointments = storedAppointments.filter(
    (appt) => appt.doctor === doctorName
  );

  setAppointments(doctorAppointments);
}, []
);
return (
  <div className="scheduled-appointments">
    <div className="page-header">
      <h2>Scheduled Appointments</h2>

      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>

    {appointments.length === 0 ? (
      <p>No scheduled appointments.</p>
    ) : (
      appointments.map((appt, index) => (
        <div key={index} className="appointment-card">
          <p>
            <strong>Appointment ID:</strong> {appt.appointmentId}
          </p>
          <p>
            <strong>Patient Name:</strong> {appt.patientName}
          </p>
          <p>
            <strong>Date:</strong> {appt.date}
          </p>
          <p>
            <strong>Time:</strong> {appt.time}
          </p>
          <p>
            <strong>Reason:</strong> {appt.reason}
          </p>
        </div>
      ))
    )}
  </div>
);
}

export default ScheduledAppointments;