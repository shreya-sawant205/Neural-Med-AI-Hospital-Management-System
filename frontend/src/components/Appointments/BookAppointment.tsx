import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css";

interface AppointmentForm {
  doctor: string;
  date: string;
  hour: string;
  minute: string;
  period: "AM" | "PM";
  reason: string;
}

const BookAppointment: React.FC = () => {
  const navigate = useNavigate();

  const [appointmentId, setAppointmentId] = useState<string>("");

  const [formData, setFormData] = useState<AppointmentForm>({
    doctor: "",
    date: "",
    hour: "",
    minute: "",
    period: "AM",
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const patientName =
      localStorage.getItem("username") || "Unknown Patient";

    const newAppointment = {
      patient_name: patientName,
      doctor: formData.doctor,
      appointment_date: formData.date,
      appointment_time: `${formData.hour}:${formData.minute} ${formData.period}`,
      reason: formData.reason,
    };

    try {
      const response = await fetch("http://localhost:5000/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAppointment),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Appointment booked successfully!");
        setAppointmentId(data.appointment_id);
        navigate("/dashboard");
      } else {
        alert("Error booking appointment");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="book-appointment">
      <h2>Book Appointment</h2>

      <form onSubmit={handleSubmit}>
        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          required
        >
          <option value="">Select Doctor</option>
          <option>Dr. Sharma</option>
          <option>Dr. Mehta</option>
          <option>Dr. Patil</option>
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <div className="time-group">
          <select
            name="hour"
            value={formData.hour}
            onChange={handleChange}
            required
          >
            <option value="">HH</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={String(i + 1).padStart(2, "0")}>
                {String(i + 1).padStart(2, "0")}
              </option>
            ))}
          </select>

          <select
            name="minute"
            value={formData.minute}
            onChange={handleChange}
            required
          >
            <option value="">MM</option>
            {[...Array(60)].map((_, i) => (
              <option key={i} value={String(i).padStart(2, "0")}>
                {String(i).padStart(2, "0")}
              </option>
            ))}
          </select>

          <select
            name="period"
            value={formData.period}
            onChange={handleChange}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <textarea
          name="reason"
          placeholder="Reason for appointment"
          value={formData.reason}
          onChange={handleChange}
          required
        />

        <div className="button-group">
          <button type="submit">Confirm Appointment</button>
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;
