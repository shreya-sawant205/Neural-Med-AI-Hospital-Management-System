import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css";
import axios from "axios";

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

  const [formData, setFormData] = useState<AppointmentForm>({
    doctor: "",
    date: "",
    hour: "",
    minute: "",
    period: "AM",
    reason: "",
  });

  interface User {
  user_id: number;
  first_name: string;
  last_name: string;
}

const [doctors, setDoctors] = useState<User[]>([]);
const patient = JSON.parse(localStorage.getItem("user") || "");

useEffect(() => {
      if(!doctors.length){
        axios.get("http://localhost:5000/api/registration/fetchdoctors")
        .then(response => {
          setDoctors(response.data);
        })
        .catch(error => {
          console.error(error);
          alert("Something went wrong, please try after sometime!!")
        });
      }
      

  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =  ( e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

      axios.post("http://localhost:5000/api/appointments/bookappointment",{
        patientId : patient["user_id"],
        doctorId : formData.doctor,
        appointmentDate:formData.date,
        appointmentTime:`${formData.hour}:${formData.minute} ${formData.period}`,
        visitReason:formData.reason
      })
      .then(response => {
        if(response.data["response"]){
          alert(`Appointment booked successfully, Your appointment id is ${response.data["appointmentId"]}`);

          setFormData({
            doctor: "",
            date: "",
            hour: "",
            minute: "",
            period: "AM",
            reason: "",
          })
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
    <div className="book-appointment">

  <div className="page-header">
    <h2>Book Appointment</h2>
    <button
      type="button"
      className="back-btn"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  </div>

      <form onSubmit={handleSubmit}>
        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.length > 0 && doctors.map((doc) => (
            <option key={doc.user_id} value={doc.user_id}>
              Dr. {doc.first_name} {doc.last_name}
            </option>
          ))}
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
      </div>
      </form>
    </div>
  );
};

export default BookAppointment;
