import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyAppointments.css";

interface Appointment {
  appointmentId: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
}

const MyAppointments: React.FC = () => {
    const navigate = useNavigate();

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const storedAppointments: Appointment[] = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    setAppointments(storedAppointments);
  }, []);

  return (
    <div className="my-appointments">
      <h2>My Appointments</h2>
      <button
    className="back-btn"
    onClick={() => navigate(-1)}
  >
    Back
  </button>

      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        appointments.map((appt, index) => (
          <div className="appointment-card" key={index}>
            <p><strong>Appointment ID:</strong> {appt.appointmentId}</p>
            <p><strong>Doctor:</strong> {appt.doctor}</p>
            <p><strong>Date:</strong> {appt.date}</p>
            <p><strong>Time:</strong> {appt.time}</p>
            <p><strong>Reason:</strong> {appt.reason}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAppointments;



























